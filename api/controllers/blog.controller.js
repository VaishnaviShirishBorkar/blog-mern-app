import Blog from "../model/BlogModel.js";

export const createBlog = async (req, res) => {
    // Access form data sent as text fields
    const { title, summary, content } = req.body;
    
    // Access file uploaded via multer
    const file = req.file ? req.file.filename : null; // Filename will be saved as part of the blog

    console.log('Title:', title);
    console.log('Summary:', summary);
    console.log('Content:', content);
    console.log('File:', file);

    const newBlog = new Blog({
        title,
        summary,
        content,
        file, // Save the filename to the database
    });

    try {
        await newBlog.save();
        res.status(201).json('Blog saved successfully!');
    } catch (error) {
        res.status(403).json({ error });
        console.log(error);
    }
};

export const getBlogs = async(req,res) => {
    try{
    const blogs = await Blog.find();
    res.status(201).json(blogs);
    }
    catch(error){
        res.json({message: 'Error fetching Blogs',error});
    }
}

export const getBlogById = async(req,res) => {
    const {id} = req.params;
    try {
        const blog = await Blog.findById(id);
        if(!blog)
            res.json('Blog Not found!');

        res.json(blog);
    } catch (error) {
        res.json(error);
    }
}