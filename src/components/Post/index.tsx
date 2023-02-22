import { Comment, Post, User } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Post = ({ post }: { post: Post & { user: User; comment: Comment[] } }) => {
	return (
		<div className="w-full min-w-[290px] p-6 flex flex-col border rounded-lg shadow bg-gray-800 border-gray-700 relative">
			<div className="flex items-center gap-3 border-b-2 border-gray-400/40 pb-3 mb-5">
				<img
					src="placeholder-avatar.png"
					alt={post.user.name as string}
					className="w-10 h-10 rounded-full"
				/>
				<div>
					<p className="font-semibold text-white cursor-pointer hover:underline">{post.user.name}</p>
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
			<p className="font-normal h-full bg-gray-900 py-3 px-4 rounded-lg text-gray-300 mb-8">{post.content}</p>
			<div className="mt-auto">
				<Link href={`/${post.id}`} className="font-medium text-cyan-400 cursor-pointer hover:text-cyan-600 transition-all bg-gray-900 p-2 rounded-lg">
					{post.comment.length ? post.comment.length : "No" } Comments
				</Link>
			</div>
		</div>
	);
};

export default Post;
