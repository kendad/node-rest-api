const expressJwt=require('express-jwt')

//this authenticated the JWT Token
function authJwt(){
    const secret=process.env.secret
    const routeURL=process.env.API_URL;

    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked
    }).unless({//excludes some routes
        path:[
            {url:/\api\/v1\/products(.*)/,methods:['GET','OPTIONS']},//using regular expressions for lesser code
            {url:/\api\/v1\/categories(.*)/,methods:['GET','OPTIONS']},
            `${routeURL}/users/login`,
            `${routeURL}/users/register`,
            `${routeURL}/users/register`,
        ]
    });
}

async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true);
    }
    done();
}

module.exports=authJwt;