const users=[
    {
        id:"1",
        name:"Kaushik",
        email:"kela@example.com",
        age:23,
    },
    {
        id:"2",
        name:"Monkey",
        email:"monkey@banana.com",
        age:3
    },
    {
        id:"3",
        name:"Donkey",
        email:"donkey@shrek.com",
        age:15
    },
    {
        id:"4",
        name:"Bulma",
        email:"bulma@cafe.com",
        age:29
    },
    {
        id:"5",
        name:"Doley",
        email:"doley@pampos.com",
    },
]

const posts=[
    {
        id:"1",
        title:"Book Ate My ****",
        body:"Wow dude thats graphic!!!",
        published:true,
        author:"1"
    },
    {
        id:"2",
        title:"Nilophal Orga Captain",
        body:"Mordor needs saving!",
        published:false,
        author:"4"
    },
    {
        id:"3",
        title:"Horizon zero dawn",
        body:"Alloy is an awesome huntress",
        published:true,
        author:"1"
    },
]

const comments=[
    {
        id:"101",
        text:"Awesome but make some changes",
        author:"1",
        post:"1"
    },
    {
        id:"102",
        text:"Might be better",
        author:"1",
        post:"2"
    },
    {
        id:"103",
        text:"whats ur number babay[filterning]",
        author:"2",
        post:"2"
    },
    {
        id:"104",
        text:"Truly informative wowww!!!!",
        author:"3",
        post:"3"
    },
]

const db={
    users,
    posts,
    comments
}

export {db as default}