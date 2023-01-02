import Link from "next/link"
import MainLayout from "../layouts/MainLayout"
import { buildAPIUrl } from "../lib/utils"
import { User, Post } from "@prisma/client"

/*
 ** TODO:
 ** Refactor "getServerSideProps" method only as much as you can
 */

type UserWithTotalPosts = User & {
	totalPosts?: number
}

export async function fetchUsers(): Promise<User[]> {
	return await (await fetch(buildAPIUrl("user"))).json()
}

export async function fetchPosts(): Promise<Post[]> {
	return await (await fetch(buildAPIUrl("post"))).json()
}

export const getServerSideProps = async () => {
	const posts: Post[] = await fetchPosts()
	const users: UserWithTotalPosts[] = (await (
		await fetchUsers()
	).map((user) => ({
		...user,
		totalPosts: posts.filter(({ userId }) => userId === user.id).length,
	}))) as UserWithTotalPosts[]

	return {
		props: { users },
	}
}

export default function SSRPage(
	{ users }: { users: UserWithTotalPosts[] } = { users: [] }
) {
	return (
		<MainLayout>
			<section className="h-full space-y-2">
				<h1 className="text-3xl font-bold">Users page</h1>
				<ul className="space-y-4 overflow-auto max-h-[390px]">
					{users.map((user) => (
						<li
							key={user.id}
							className="transition-colors duration-100 rounded-md hover:bg-slate-300"
						>
							<Link className="" href={`/ssg/${user.id}`} passHref>
								<div className="p-2">
									<h2 className="font-medium">{`${user.name} ${user.surname}`}</h2>
									<p>Email: {user.email}</p>
									<p>Total posts: {user.totalPosts}</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</MainLayout>
	)
}
