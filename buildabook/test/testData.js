module.exports = {
    id: 1,
    testBook: {
        _id: 1,
        title: "Test Title",
        writingPrompt: "Test Prompt",
        image: "https://d2ph5fj80uercy.cloudfront.net/06/cat1996.jpg",
        numberOfChapters: 4,
        duration: 7
    },
    testChapter: {
        title: 'test',
        text: 'test text',
        author: '1',
        expirationDate: new Date() + 10 * 1000,
        startDate: new Date(),
        comments: [],
        dateCreated: new Date(),
        contenders: []
    }

}