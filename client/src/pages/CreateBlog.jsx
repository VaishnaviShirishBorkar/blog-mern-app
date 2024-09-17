import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);  // Use single file instead of array

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        if (file) {
            formData.append('file', file); // Append the file only if it's present
        }

        // Debugging: Log FormData entries
        for (const [key, value] of formData.entries()) {
            console.log(key, value); // This will show the key and value pairs in the form data
        }

        try {
            const res = await fetch('http://localhost:3000/api/blog/create-blog', {
                method: 'POST',
                body: formData,  // No need for JSON.stringify
            });

            const data = await res.json();  // Check response from the server
            if (data.success) {
                alert('Blog created successfully!');
                setTitle('');
                setSummary('');
                setContent('');
                setFile(null);
            } else {
                alert('Blog creation unsuccessful!');
            }
        } catch (error) {
            console.log(error);
            alert('Cannot create Blog!');
        }
    };

    return (
        <div className="flex max-w-3xl items-center justify-center shadow-md">
            <div className="flex flex-col items-center justify-center w-full p-9 gap-5">
                <h1 className="font-semibold text-2xl items-center justify-center">Write your Blog....</h1>
                <input
                    className="border border-slate-400 rounded-sm w-full p-.5 focus:outline-none focus:border-blue-500 text-xl"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    className="border border-slate-400 rounded-sm w-full p-.5 focus:outline-none focus:border-blue-500 text-xl"
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />

                <ReactQuill
                    className="w-full"
                    value={content}
                    onChange={setContent}
                    placeholder="Write your content here..."
                />

                <input
                    className="border border-slate-400 rounded-sm w-full p-.5 focus:outline-none focus:border-blue-500 text-xl"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}  // Single file handling
                />

                <button onClick={handleSubmit} className="text-white bg-blue-500 px-4 py-2">
                    Create Blog
                </button>
            </div>
        </div>
    );
};

export default CreateBlog;
