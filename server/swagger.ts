import { getUsers } from './src/open-api/get-users';

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
            name: "Users",
        },
        {
            name: "Habits",
        },
        {
            name: "Tracks",
        },
    ],
    paths: {
        "/user": {
            get: getUsers,
            post: getUsers,
            put: getUsers,
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