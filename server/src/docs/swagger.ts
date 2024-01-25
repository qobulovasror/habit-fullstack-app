import { authUsers } from './open-api/auth.docs';
import { getUsers, postUsers, putUsers } from './open-api/user.doc';

export const swaggerDocument = {
    openapi: "3.0.1",
    info: {
        version: "1.0.0",
        title: "APIs Document",
        description: "Habit tracker app",
        termsOfService: "",
        contact: {
            name: "Asror Qobulov",
            email: "qobulovasror0@gmail.com",
            url: "https://qobulov-portfolio.netlify.app/",
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    tags: [
        {
            name: "Auth",
        },
        {
            name: "User",
        },
        {
            name: "Habits",
        },
        {
            name: "Tracks",
        },
    ],
    paths: {
        "/auth": {
            post: authUsers,
        },
        "/user": {
            get: getUsers,
            post: postUsers,
            put: putUsers,
            // delete: deleteUsers,
        },
        "/habit": {
            // get: getUsers,
            // post: addUsers,
            // put: updateUsers,
            // delete: deleteUsers,
        },
        "/track": {
            // get: getUsers,
            // post: addUsers,
            // put: updateUsers,
            // delete: deleteUsers,
        },
    },
    servers: [
        {
            url: 'http://localhost:5000/api/',
            description: 'Local server',
        },
        {
            url: 'https://production_site/api/',
            description: 'Production Env',
        },
    ],
};