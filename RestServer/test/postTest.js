const request = require('sync-request');
const baseUrl = 'http://localhost:3000/';

console.log("Get request on posts")
var res1 = request('GET', baseUrl + 'posts');
console.log(JSON.parse(res1.getBody()));

/*
console.log("Adding a new post - should fail because of noo session from authController")
var res2 = request('Post', baseUrl + 'posts', {
    json: {
        title: "Test title",
        body: "Test body",
        tags: ["Tag1", "Tag2"],
        author: {}
    }
});
console.log(JSON.parse(res2.getBody()));

console.log("Adding a new post - should fail because of no session from postController")
var res3 = request('Post', baseUrl + 'posts', {
    json: {
        title: "Test title",
        body: "Test body",
        tags: ["Tag1", "Tag2"],
        author: {},
        bypassAuth: true
    }
});
console.log(JSON.parse(res3.getBody()));
*/