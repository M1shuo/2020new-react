import Mock from 'mockjs';

Mock.mock("/api/test", 'get', () => {

    return Mock.mock({
        test: "test"
    })
});

Mock.mock("/api/login", 'post', () => {
    return Mock.mock({
        token: "test"
    })
});