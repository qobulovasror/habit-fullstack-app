export const authUsers = {
    tags: ['Auth'],
    descripti0on: 'Sing in',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: "email",
            description: "user email",
            required: true,
            paramType: "body"
        },
        {
            name: "password",
            description: "user password minumum 6 characters",
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
                        type: "object",
                        properties: {
                            ok: {type: "boolean", value: true},
                            message: {type: "string"}
                        }
                    },
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
        '400': {
            description: 'Bad Request',
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            ok: {enum: [false, true],defaultValue: "false" },
                            message: {type: "string"}
                        }
                    }
                },
            },
        },
    },
};