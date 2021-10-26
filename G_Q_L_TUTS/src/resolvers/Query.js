const Query={
    me(){
        return {
            id:"12309",
            name:"Kaushik",
            email:"kela@exmple.com",
            age:23
        };
    },
    post(){
        return {
            id:"092",
            title:"Book Eating Monster",
            body:"ThisISBODY!!!",
            published:true
        }
    },
    users(parent,args,{db},info){
        if(!args.query){
            return db.users;
        }
        return db.users.filter((user)=>{
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent,args,{db},info){
        if(!args.query){
            return db.posts;
        }
        return db.posts.filter((post)=>{
            if(post.title.toLowerCase().includes(args.query.toLowerCase())||post.body.toLowerCase().includes(args.query.toLowerCase())){
                return true;
            }else{
                return false;
            }
        })
    },
    comments(parent,args,{db},info){
        return db.comments;
    }
}

export {Query as default}