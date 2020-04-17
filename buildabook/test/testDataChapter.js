const theDate = new Date();

module.exports = {
    testChapterCorrect: {
        _id: "5e97f48f97a32a1e68dfa6f2",
        title: 'test',
        text: 'test text',
        author: '1',
        expirationDate: theDate,
        startDate: theDate,
        comments: [],
        dateCreated: theDate,
        contenders: []
    },
    testChapterCorrect2: {
        _id: "5e97f48f97a32a1e68dfa6f3",
        title: 'test2',
        text: 'test text2',
        author: '2',
        expirationDate: theDate,
        startDate: theDate,
        comments: [],
        dateCreated: theDate,
        contenders: []
    },
    testChapterWrong: {
        _id: "5e97f48f97a32a1e68dfa6f4",
        title: '',
        text: '',
        author: '',
        expirationDate: theDate,
        startDate: theDate,
        comments: [],
        dateCreated: theDate,
        contenders: []
    },
}