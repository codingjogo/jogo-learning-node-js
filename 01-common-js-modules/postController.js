// assuming a program of BLOG posts
// in order to work with this method
// go to package.json and add "type": "module"
const posts = [
    {id: 1, title: 'Post One',},
    {id: 2, title: 'Post Two',},
]

// method 1 of exporting
// export const getPosts = () => posts;
// method 2 of exporting
const getPosts = () => posts;
export const getPostsLength = () => posts.length;
// method 2
export default getPosts;