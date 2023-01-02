import type { NextApiRequest, NextApiResponse } from "next"
import { Error } from "../../../types"
import { User } from "@prisma/client"
import prisma from "../../../lib/prisma"

/*
 ** Implement logic to 'get all users' and 'create a user' using "prisma"
 ** 1. GET: return all users
 ** 2. POST: create a user (NOT for Web3 developer)
 */

async function getAllUsers() {
	return await prisma.user.findMany()
}

async function createUser(user: User) {
	return await prisma.user.create({
		data: {
			...user,
		},
	})
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User | User[] | Error>
) {
	if (req.method === "GET") {
		try {
			const users = await getAllUsers()
			res.status(200).json(users)
		} catch (e) {
			console.log("Request error")
			res.status(500).end()
		}
	}

	if (req.method === "POST") {
		try {
			const { name, surname, email, age } = JSON.parse(req.body)

			const userExists = await prisma.user.findFirst({
				where: {
					email: {
						equals: email,
					},
				},
			})

			if (userExists) throw Error("user already exists")

			const user = await createUser({
				name,
				surname,
				email,
				age: Number(age),
			} as User)

			res.status(201).json(user)
		} catch (e) {
			console.log(e)
			res.status(400).json({ error: "User already exists" })
		}
	}
}
