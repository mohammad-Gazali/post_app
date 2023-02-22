import React, { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);

	const handleOpen = (): void => {
		setOpen((prestate) => {
			return !prestate;
		});
	};

	return (
		<nav className="w-full lg:px-8 px-4 py-5 bg-slate-900 shadow-lg flex justify-between md:flex-row flex-row-reverse items-center relative">
			<button className="md:hidden text-white" onClick={handleOpen}>
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
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
			<ul
				className={`md:hidden z-10 ${
					open ? "scale-y-100 visible" : "scale-y-0 invisible"
				} flex flex-col gap-2 absolute bg-slate-600 p-4 -bottom-32 right-2 rounded-lg shadow-lg origin-top transition-all`}
			>
				<Link
					className="text-white/70 hover:text-white md:hidden block transition-all"
					href={"/"}
				>
					Home
				</Link>
				<hr className="border-[1px] border-slate-500" />
				{session?.user ? (
					<>
						<button
							className="text-white/70 hover:text-white md:hidden block transition-all text-left"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
            <hr className="border-[1px] border-slate-500" />
						<Link
							href={"/create-post"}
							className="text-white/70 hover:text-white md:hidden block transition-all"
						>
							Create Post
						</Link>
					</>
				) : (
					<button
						className="text-white/70 hover:text-white md:hidden block transition-all"
						onClick={() => signIn()}
					>
						Sign In
					</button>
				)}
			</ul>
			<Link href={"/"}>
				<h1 className="font-bold md:text-2xl text-lg text-white">
					Light Post App
				</h1>
			</Link>
			<Link
				href={"profile/"}
				className="text-white/70 hover:text-white transition-all peer"
			>
				<img
					src={"./placeholder-avatar.png"}
					alt={"avatar"}
					height={36}
					width={36}
					className="rounded-full bg-slate-400 md:hidden block"
				/>
			</Link>
			<ul className="items-center gap-5 relative md:flex hidden">
				<Link
					className="text-white/70 hover:text-white md:block hidden transition-all"
					href={"/"}
				>
					Home
				</Link>
				{session?.user ? (
					<>
						<button
							className="text-white/70 hover:text-white md:block hidden transition-all"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
						<Link
							href={"/create-post"}
							className="text-white/70 hover:text-white md:block hidden transition-all"
						>
							Create Post
						</Link>
						<Link
							href={"profile/"}
							className="text-white/70 hover:text-white transition-all peer"
						>
							<img
								src={"./placeholder-avatar.png"}
								alt={"avatar"}
								height={36}
								width={36}
								className="rounded-full bg-slate-400"
							/>
						</Link>
						<div className="md:block hidden transitiona-all invisible duration-300 absolute text-white bg-zinc-800 rounded-lg p-2 -right-4 top-10 opacity-0 peer-hover:opacity-100 peer-hover:visible">
							profile
						</div>
					</>
				) : (
					<button
						className="text-white/70 hover:text-white md:block hidden transition-all"
						onClick={() => signIn()}
					>
						Sign In
					</button>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
