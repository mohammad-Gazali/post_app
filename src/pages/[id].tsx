import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Comment, Post, User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";

const DetailPost = () => {
	const [post, setPost] = useState<Post & { user: User; comment: Comment[] }>();
	const [isDisabled, setIsDisabled] = useState(false);
	const [comment, setComment] = useState("");
	const [comments, setCommments] = useState<Comment[]>([]);
	let toastId: string;

	useEffect(() => {
		const fetchPost = async () => {
			const { id } = Router.query;
			const response = await axios(`/api/posts/${id}`);
			setPost(response.data);
			setCommments(response.data?.comment);
		};

		fetchPost().catch((error) => {
			console.error(error);
		});
	}, []);

	const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsDisabled(true);

		toastId = toast.loading("Adding Comment.....", {
			id: toastId,
		});

		try {
			const response = await axios.post("/api/comments/addComment", {
				comment,
				postId: post?.id,
			});

			const newComment: Comment = response.data.result;

			setCommments((preComments) => {
				return [...preComments, newComment];
			});

			setComment("");
			setIsDisabled(false);

			toast.success("The Comment Has Created Successfully", {
				id: toastId,
			});
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong", {
				id: toastId,
			});
		}
	};

	return (
		<div className="lg:px-8 px-4">
			<Head>
				<title>Post Details</title>
			</Head>
			{post ? (
				<div className="w-full min-w-[290px] p-6 flex flex-col border rounded-lg shadow bg-gray-800 border-gray-700 relative my-16">
					<div className="flex items-center gap-3 border-b-2 border-gray-400/40 pb-3 mb-5">
						<img
							src="placeholder-avatar.png"
							alt={post.user.name as string}
							className="w-10 h-10 rounded-full"
						/>
						<div>
							<p className="font-semibold text-white cursor-pointer hover:underline">
								{post.user.name}
							</p>
							<p className="text-sm flex items-center gap-1 text-gray-300">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
									/>
								</svg>
								{post.createdAt.toString().split("T")[0]} &nbsp;
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								{post.createdAt.toString().split("T")[1].split(".")[0]}
							</p>
						</div>
					</div>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
						{post.title}
					</h5>
					<p className="font-normal h-full bg-gray-900 py-3 px-4 rounded-lg text-gray-300 mb-8">
						{post.content}
					</p>
					<div className="mt-auto bg-gray-900 p-2 rounded-lg">
						<div className="font-medium text-purple-500 text-xl pl-1">
							{comments.length ? comments.length : "No"} Comments
						</div>
						{comments.length !== 0 ? (
							<div className="flex flex-col gap-4 my-8">
								{comments.map((comment) => {
									return (
										<div
											className="p-4 bg-gray-500/40 border-gray-500 border-2 rounded-lg"
											key={comment.id}
										>
											<div className="flex items-center gap-3 pb-3 mb-5">
												<img
													className="w-10 h-10 rounded-full object-cover"
													src="placeholder-avatar.png"
													alt="placeholder"
												/>
												<div>
													<p className="font-semibold text-white cursor-pointer hover:underline">
														{post.user.name}
													</p>
													<p className="text-sm flex items-center gap-1 text-gray-300">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="w-4 h-4"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
															/>
														</svg>
														{comment.createdAt.toString().split("T")[0]} &nbsp;
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="w-4 h-4"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
															/>
														</svg>
														{
															comment.createdAt
																.toString()
																.split("T")[1]
																.split(".")[0]
														}
													</p>
												</div>
											</div>
											<div className="w-full bg-gray-500 p-2 rounded-lg text-white">
												{comment.content}
											</div>
										</div>
									);
								})}
							</div>
						) : null}
						<div className="bg-slate-800 rounded-lg p-3 mt-4">
							<form onSubmit={handleSubmitComment} className="w-full">
								<h3 className="text-lg text-cyan-400 font-bold mb-4">
									Add Comment
								</h3>
								<div className="mb-6">
									<label
										htmlFor="message"
										className="block mb-2 text-sm font-medium text-white"
									>
										Commment
									</label>
									<textarea
										id="message"
										rows={4}
										className="block p-2.5 w-full text-sm rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
										placeholder="It was a good post..."
										onChange={(e) => {
											setComment(e.target.value);
										}}
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
									Add Comment
								</button>
							</form>
						</div>
					</div>
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
		</div>
	);
};

export default DetailPost;
