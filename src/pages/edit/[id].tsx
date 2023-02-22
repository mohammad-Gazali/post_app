import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Comment, Post, User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";



const EditPost = () => {
	const [post, setPost] = useState<Post & { user: User; comment: Comment }>();
	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.content);
	const [isDisabled, setIsDisabled] = useState(false);
	let toastPostId: string;

	useEffect(() => {
		const fetchPost = async () => {
			const { id } = Router.query;
			const response = await axios(`/api/posts/${id}`);
			setPost(response.data);
		};

		fetchPost().catch((error) => {
			console.error(error);
		});
	}, []);

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

		toastPostId = toast.loading("Editing The Post", {
			id: toastPostId,
		});

		setIsDisabled(true);

		try {
			const response = await axios.post("/api/posts/editPost",{ 
                    id: post?.id,
                    title,
				    content
			    });

			setIsDisabled(false);

			toast.success("The Post Has Updated Successfully", {
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
				<title>Edit Post</title>
			</Head>
			{post ? (
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
								value={content!}
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
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
							Edit
						</button>
					</form>
				</div>
			) : (
				<div
					className="w-full h-screen flex justify-center items-center"
					role="status"
				>
					<svg
						aria-hidden="true"
						className="w-14 h-14 mr-2 animate-spin text-gray-600 fill-cyan-400"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</div>
			)}
		</>
	);
};

export default EditPost;
