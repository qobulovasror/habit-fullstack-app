
export const getUsers = {
    tags: ['User'],
    descripti0on: 'get users',
    operationId: 'authUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: "x-auth-token",
            description: "authorization toke",
            required: true,
            paramType: "header"
        }
    ],
    responses: {
        '200': {
            description: 'Success',
            content: {
                'application/json': {
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            properties: {
                                "id": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
            },
        },
        '401': {
            description: 'Unauthorized response',
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            ok: { enum: ["false"], },
                            message: { type: "string" }
                        }
                    }
                },
            },
        },
    },
};

export const postUsers = {
    tags: ['User'],
    description: 'add user',
    parameters: [
        {
            name: "name",
            description: "name",
            required: true,
            paramType: "body"
        },
        {
            name: "email",
            description: "user email",
            required: true,
            paramType: "body"
        },
        {
            name: "password",
            description: "user password",
            required: true,
            paramType: "body"
        },
    ],
    responses: {
        '200': {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            ok: { enum: ["false"], },
                            message: { type: "string" }
                        }
                    }
                },
            },
            headers: {
                "x-auth-token": {
                    description: "auth token",
                    schema: {
                        type: "string"
                    }
                },
            }
        },
        '401': {
            description: 'Unauthorized response',
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            ok: { enum: ["false"], },
                            message: { type: "string" }
                        }
                    }
                },
            },
        },
    },
};

export const putUsers = {
    tags: ['User'],
    description: 'upadete user',
    parameters: [
        {
            name: "name",
            description: "name",
            required: true,
            paramType: "body"
        },
        {
            name: "email",
            description: "user email",
            required: true,
            paramType: "body"
        }
    ],
    responses: {
        '200': {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        "type": "object",
                        properties: {
                            "id": {
                                "type": "integer",
                                "format": "int64"
                            },
                            "name": {
                                "type": "string"
                            },
                            "email": {
                                "type": "string"
                            }
                        }
                    }
                },
            },
        },
        '401': {
            description: 'Unauthorized response',
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            ok: { enum: ["false"], },
                            message: { type: "string" }
                        }
                    }
                },
            },
        },
    },
};