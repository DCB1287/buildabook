module.exports = {
    testChapterCorrect: {
        _id: 1,
        title: 'test',
        text: 'test text',
        author: '1',
        expirationDate: new Date() + 10 * 1000,
        startDate: new Date(),
        comments: [],
        dateCreated: new Date(),
        contenders: []
    },
    testChapterWrong: {
        _id: "",
        title: '',
        text: '',
        author: '',
        expirationDate: new Date() + 10 * 1000,
        startDate: new Date(),
        comments: [],
        dateCreated: new Date(),
        contenders: []
    },
}