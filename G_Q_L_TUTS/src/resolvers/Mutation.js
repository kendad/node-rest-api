import {v4} from "uuid";

const Mutation={
    createUser(parent,args,{db},info){

        const emailTaken=db.users.some((user)=>user.email===args.data.email);
        if(emailTaken){
            throw new Error('Email Taken');
        }

        const newUser={
            id:v4(),
            ...args.data
        }
        db.users.push(newUser);
        return newUser
    },
    updateUser(parent,args,{db},info){
        const user=db.users.find((user)=>user.id===args.id)
        if(!user){
            throw new Error("User not found");
        }
        if(typeof args.data.email === 'string'){
            const emailTaken=db.users.some((user)=>user.email===args.data.email);
            if(emailTaken){
                throw new Error("Email Taken")
            }
            user.email=args.data.email;
        }
        if(typeof args.data.name==='string'){
            user.name=args.data.name;
        }
        if(typeof args.data.age!=='undefined'){
            user.age=args.data.age;
        }
        return user;
    },
    deleteUser(parent,args,{db},info){
        const userIndex=db.users.findIndex((user)=>user.id===args.id);
        if(userIndex===-1){
            throw new Error("User does not exists");
        }

        //delete post related to the author
        db.posts=db.posts.filter((post)=>{
            const match = post.author===args.id
            
            //delete all comments related to the post
            if(match){
                db.comments=db.comments.filter((comment)=>comment.post===post.id);
            }

            return !match;
        });

        //delete all comments related to the user
        db.comments=db.comments.filter((comment)=>comment.author!==args.id)

        const deletedUser=db.users.splice(userIndex,1);
        return deletedUser[0];
    },
    createPost(parent,args,{db,pubsub},info){
        const userExists=db.users.some((user)=>user.id===args.data.author);
        if(!userExists){
            throw new Error("User Does Not Exists")
        }
        const newPost={
            id:v4(),
            ...args.data
        }
        db.posts.push(newPost);
        if(args.data.published){
            pubsub.publish('post',{
                post:{
                    mutation:'CREATED',
                    data:newPost
                }
            });
        }
        return newPost;
    },
    updatePost(parent,args,{db,pubsub},info){
        const post=db.posts.find((post)=>post.id===args.id);
        const originalPost={...post};
        if(!post){
            throw new Error('Post Not Found')
        }
        if(typeof args.data.title==='string'){
            post.title=args.data.title;
        }
        if(typeof args.data.body==='string'){
            post.body=args.data.body;
        }
        if(typeof args.data.published==='boolean'){
            post.published=args.data.published;
            if(originalPost.published && !post.published){
                //deleted
                pubsub.publish('post',{
                    post:{
                        mutation:'DELETED',
                        data:originalPost
                    }
                });
            }else if(!originalPost.published && post.published){
                //created
                pubsub.publish('post',{
                    post:{
                        mutation:'CREATED',
                        data:post
                    }
                });
            }
        }else if(post.published){
            pubsub.publish('post',{
                post:{
                    mutation:'UPDATED',
                    data:post
                }
            });
        }
        return post;
    },
    deletePost(parent,args,{db,pubsub},info){
        const postIndex=db.posts.findIndex((post)=>post.id===args.id);
        if(postIndex===-1){
            throw new Error("Post doesn't exists")
        }
        //delete all comments related to the post
        db.comments=db.comments.filter((comment)=>comment.post!==args.id);

        const [post]=db.posts.splice(postIndex,1)

        if(post.published){
            pubsub.publish('post',{
                post:{
                    mutation:'DELETED',
                    data:post
                }
            })
        }

        return post;
    },
    createComment(parent,args,{db,pubsub},info){
        const isPossible=db.users.some((user)=>user.id===args.data.author) && db.posts.some((post)=>post.id===args.data.post);
        if(!isPossible){
            throw new Error("User or Post Doesnt exists");
        }
        const newComment={
            id:v4(),
            ...args.data
        }
        db.comments.push(newComment);
        pubsub.publish(`comment`,{
            comment:{
                mutation:"CREATED",
                data:newComment
            }
        });
        return newComment;
    },
    deleteComment(parent,args,{db,pubsub},info){
        const commentIndex=db.comments.findIndex((comment)=>comment.id===args.id);
        if(commentIndex===-1){
            throw new Error("Comment not found");
        }
        const deletedComment=db.comments.splice(commentIndex,1);
        pubsub.publish(`comment`,{
            comment:{
                mutation:"DELETED",
                data:deletedComment[0]
            }
        });
        return deletedComment[0];
    },
    updateComment(parent,args,{db,pubsub},info){
        const comment=db.comments.find((comment)=>comment.id===args.id);
        if(!comment){
            throw new Error("Comment Not Found")
        }
        if(typeof args.text==='string'){
            comment.text=args.text
        }
        pubsub.publish(`comment`,{
            comment:{
                mutation:"UPDATED",
                data:comment
            }
        });
        return comment;
    }
}

export {Mutation as default}