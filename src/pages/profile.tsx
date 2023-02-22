import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { getServerSession, Session } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Comment, Post, User } from "@prisma/client";
import Link from "next/link";
import toast from "react-hot-toast";



const Profile = ({ mySession }: { mySession: Session }) => {

	const [user, setUser] = useState<
		(User & { Comment: Comment; Post: Post[] }) | undefined
	>(undefined);
	const [posts, setPosts] = useState<Post[]>([]);
	const [deleteId, setDeleteId] = useState("");
	const [deleteActiveState, setDeleteActiveState] = useState(false);
	const modalBody = useRef<HTMLDivElement>(null);
	let toastId: string;

	const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const left = modalBody.current?.offsetLeft!;
		const right =
			modalBody.current?.offsetLeft! + modalBody.current?.offsetWidth!;
		const top = modalBody.current?.offsetTop!;
		const bottom =
			modalBody.current?.offsetTop! + modalBody.current?.offsetHeight!;

		const firstCon = left <= e.clientX && e.clientX <= right;
		const secondCon = top <= e.clientY && e.clientY <= bottom;

		if (firstCon && secondCon) return;

		setDeleteActiveState(false);
	};

	const handleDelete =  async (e: any) => {
		
		e.target.disabled = true

		toastId = toast.loading("Deleting The Post", {
			id: toastId
		})

		const response = await fetch("/api/posts/deletePost", {
			method: "POST",
			body: JSON.stringify({
				id: deleteId
			})
		});

		const data = await response.json();

		if (response.status === 400) {
			toast.error(data.message, {
				id: toastId
			})
		} else {
			setPosts((prePosts) => {
				return prePosts.filter(post => post.id !== deleteId)
			})

			setDeleteActiveState(false)
			
			e.target.disabled = false

			toast.success(data.message, {
				id: toastId
			})
		}
	}

	useEffect(() => {
		fetch("/api/posts/authPosts")
			.then((res) => res.json())
			.then((user) => {
				setUser(user);
				setPosts(user.Post)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<div className="flex lg:flex-row flex-col lg:mb-0 mb-16 mt-16 lg:px-8 px-4 gap-6 lg:h-[60vh] h-full">
				<div className="lg:w-1/2 h-full flex flex-col gap-6">
					<ul className="bg-slate-900 h-fit flex flex-col gap-6 justify-center items-center p-8 shadow-lg rounded-xl text-white">
						<li className="flex items-center gap-6 w-full rounded-r-lg rounded-l-2xl shadow-lg bg-slate-500">
							<div className="flex justify-center items-center gap-2 rounded-l-lg bg-gray-800 lg:w-24 p-2 text-cyan-400">
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
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>
								<span className="md:block hidden">Email</span>
							</div>
							<span className="text-lg">{mySession?.user?.email}</span>
						</li>
						<li className="flex items-center gap-6 w-full shadow-lg rounded-r-lg rounded-l-2xl bg-slate-500">
							<div className="flex justify-center items-center gap-2 rounded-l-lg bg-gray-800 p-2 md:w-24 text-cyan-400">
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
										d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span className="md:block hidden">Name</span>
							</div>
							<span className="text-lg">{mySession?.user?.name}</span>
						</li>
					</ul>
					<div className="bg-slate-900 h-full w-full shadow-lg rounded-xl px-8 lg:py-0 py-8 gap-8 flex items-center">
						<img
							src="placeholder-avatar.png"
							className="w-24 h-24 rounded-full object-cover"
							alt="placeholder"
						/>
						<div role="status" className="flex-1 animate-pulse">
							<div className="h-2.5 rounded-full bg-gray-700 max-w-[192px] mb-4"></div>
							<div className="h-2 rounded-full bg-gray-700 w-full max-w-[360px] mb-2.5"></div>
							<div className="h-2 rounded-full bg-gray-700 w-full max-w-[550px] mb-2.5"></div>
							<div className="h-2 rounded-full bg-gray-700 w-full max-w-[260px] mb-2.5"></div>
							<div className="h-2 rounded-full bg-gray-700 w-full max-w-[300px] mb-2.5"></div>
							<div className="h-2 rounded-full bg-gray-700 w-full max-w-[360px]"></div>
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				</div>
				<div className="bg-slate-900 shadow-lg px-8 py-4 rounded-xl flex-1 flex flex-col items-center">
					<h3 className="text-4xl text-center font-medium text-cyan-400 mb-4">
						My Posts
					</h3>
					{user !== undefined ? (
						posts.length !== 0 
						?
						<div className="h-full w-full flex flex-col p-3 bg-slate-800 rounded-lg overflow-y-scroll gap-3 custom_scrollbar">
							{posts.map((post) => {
								return (
									<div
										className="text-white pt-4 pb-2 px-2 bg-gray-700 rounded-lg w-full"
										key={post.id}
									>
										<h3 className="font-medium text-gray-200">{post.title}</h3>
										<p className="truncate text-sm text-gray-300 mt-1">
											{post.content}
										</p>
										<div className="text-sm flex flex-wrap justify-between items-end gap-2 text-cyan-400 mt-2">
											<div className="flex gap-2">
												<div className="flex flex-wrap items-center gap-1">
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
												</div>
												<div className="flex items-center gap-1">
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
												</div>
											</div>
											<div className="flex gap-2">
												<Link
													href={`/${post.id}`}
													className="bg-slate-900 rounded-lg p-2"
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
															d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
														/>
													</svg>
												</Link>
												<Link
													href={`/edit/${post.id}`}
													className="bg-slate-900 rounded-lg p-2"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-5 h-5 text-yellow-400"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
														/>
													</svg>
												</Link>
												<button
													onClick={() => {
														setDeleteActiveState(true);
														setDeleteId(post.id);
													}}
													className="bg-slate-900 rounded-lg p-2"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-5 h-5 text-purple-500"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
														/>
													</svg>
												</button>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						:
						<div className="text-2xl font-semibold text-white">
							There Is No Posts 🥲
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
			</div>

			<section
				onClick={handleClick}
				className={`fixed ${
					deleteActiveState ? "flex" : "hidden"
				} justify-center items-center inset-0 bg-black/70 z-20 cursor-pointer`}
			>
				<div
					ref={modalBody}
					className="bg-gray-800 w-[480px] pb-4 mx-4 shadow-lg rounded-xl cursor-default"
				>
					<h3 className="text-white font-semibold text-xl text-center px-3 py-5">
						Are You Sure About Deleting This Post ? ⚠️
					</h3>
					<div className="w-full flex flex-wrap justify-center items-center gap-4">
						<button onClick={handleDelete} className="bg-slate-900 text-purple-500 w-1/3 py-2 rounded-lg transition-all disabled:bg-gray-400 disabled:text-gray-800">
							Yes, continue
						</button>
						<button
							onClick={() => {
								setDeleteActiveState(false);
							}}
							className="bg-slate-900 text-cyan-400 w-1/3 py-2 rounded-xl"
						>
							No, stop
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			mySession: session,
		},
	};
};
