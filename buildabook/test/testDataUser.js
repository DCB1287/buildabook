module.exports = {
    testUserCorrect: {
        username: "Test",
        email: "dcb1287@gmail.com",
        password: '123456',
    },
    testUserWrong: {
        username: "Test",
        email: "dcb1287@gm",
        password: '1',
    },
    testEmailValidation: {
        email: "dcb1287@gmail.com",
        code: ""
    },
    testNewPassword: {
        email: "dcb1287@gmail.com",
        password: "123dfgdsaaaB3#$"
    },
     testNewPassword1: {
        email: "dcb128 7@gmail.com@",
        password: "123dfgdsaaaB3#$"
    },
     testNewPassword2: {
        email: "dcb1287gmail.com",
        password: "123dfgdsaaaB3#$"
    },
     testNewPassword3: {
        email: "@gmail.com",
        password: "123dfgdsaaaB3#$"
    },
     testNewPassword4: {
        email: "d@.com",
        password: "123dfgdsaaaB3#$"
    },
}