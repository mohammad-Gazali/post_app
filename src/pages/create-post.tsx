import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	let toastPostId: string;

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setTitle(() => {
			return e.target.value;
		});
	};

	const handleChangeContent = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		setContent(() => {
			return e.target.value;
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		toastPostId = toast.loading("Creating The Post", {
			id: toastPostId,
		});

		setIsDisabled(true);

		try {
			const response = await axios.post("/api/posts/addPost", {
				title,
				content,
			});

			setTitle("");
			setContent("");
			setIsDisabled(false);

			toast.success("The Post Has Created Successfully", {
				id: toastPostId,
			});
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong", {
				id: toastPostId,
			});
		}
	};

	return (
		<>
			<Head>
				<title>Create Post</title>
			</Head>
			<div className="bg-slate-900 flex flex-col gap-6 justify-center items-center md:w-1/2 md:px-0 md:mx-auto sm:px-8 sm:mx-8 px-4 mx-4 py-12 shadow-lg rounded-xl text-white my-16">
				<form onSubmit={handleSubmit} className="w-full px-6">
					<div className="mb-6">
						<label
							htmlFor="title"
							className="block mb-2 text-sm font-medium text-white"
						>
							Post Title
						</label>
						<input
							type="text"
							id="title"
							className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
							placeholder="nature, sky shining...."
							onChange={handleChangeTitle}
							value={title}
							required
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="message"
							className="block mb-2 text-sm font-medium text-white"
						>
							Post Content
						</label>
						<textarea
							id="message"
							rows={4}
							className="block p-2.5 w-full text-sm rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
							placeholder="It was an enjoy journey..."
							onChange={handleChangeContent}
							value={content}
						></textarea>
					</div>
					<button
						disabled={isDisabled}
						type="submit"
						className="flex justify-center items-center gap-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-800 disabled:bg-gray-400 transition-all"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
							/>
						</svg>
						Create
					</button>
				</form>
			</div>
		</>
	);
};

export default CreatePost;
