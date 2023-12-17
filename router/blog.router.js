/** create blogs router */
const blogRouter = require('express').Router();
/** import blog controller functions */
const {
    createNewBlog, getAllBlogs, removeBlog,
    updateBlogWithIndex, updateBlogWithUpdate,
    searchByTitle, searchByMultiField, searchByRegexp,
    findBlogByMultiField
} = require("../controllers/blog.controller");

/** new blog creation route */
blogRouter.post('/new', createNewBlog);

/** retrieve all blogs process route */
blogRouter.get("/list/:value?", getAllBlogs);

/** blog removal process route */
blogRouter.delete("/remove/:id", removeBlog);

/** blog update process using index method */
blogRouter.put("/update/:id", updateBlogWithIndex);

/** blog update process using update method */
blogRouter.patch("/update/:id", updateBlogWithUpdate);

/** find post by title */
blogRouter.get("/findByTitle", searchByTitle);

/** find post by multiply fields */
blogRouter.get("/multi-fields", searchByMultiField);

/** find post by regexp */
blogRouter.get("/regexp-search", searchByRegexp);

/** find post by multiply fields and regexp */
blogRouter.get("/findBlogByMultiField", findBlogByMultiField);

module.exports = {
    blogRouter
}