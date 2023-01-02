import React, { useCallback, useId, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import { buildAPIUrl } from "../lib/utils"
import { User } from "@prisma/client"

/*
 ** TODO:
 ** Refactor this code as much as you can
 ** Style the form (tailwindcss is preferable)
 **
 ** PS. If you wanna extract some functionality to another file then
 ** just create it in this file and write a comment above with file name that you would give
 */

interface TextFieldProps {
	value: string
	label: string
	name: string
	placeholder: string
	error: string | null
	type: "text" | "email" | "number"
	hasError: boolean
	changeHandler: React.ChangeEventHandler
}

function TextField(props: TextFieldProps) {
	const id = useId()

	const INPUT_CLASSES = props.hasError
		? "border-red-400 focus:ring-2 ring-offset-1 focus:ring-red-500"
		: "border-gray-500 focus:border-blue-400 focus:ring-2 ring-offset-1 focus:ring-blue-500"

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-baseline justify-between">
				<label
					className={`font-semibold capitalize ${
						props.hasError ? "text-red-600" : "text-gray-600"
					}`}
					htmlFor={id}
				>
					{props.label}
				</label>
				{props.hasError && (
					<p className="text-sm text-red-600">{props.error}</p>
				)}
			</div>

			<input
				id={id}
				type={props.type}
				name={props.name}
				placeholder={props.placeholder}
				className={`w-full text-sm rounded  border focus:outline-none p-1 ${INPUT_CLASSES}`}
				value={props.value}
				onChange={props.changeHandler}
			/>
		</div>
	)
}

export async function createUser(data: User) {
	await fetch("/api/user", {
		method: "POST",
		body: JSON.stringify(data),
	})
}

function useUserForm<T extends { [index: string]: any }>(initState: T) {
	const [formError, setFormError] = useState<string | null>(null)
	const [fields, setFields] = useState(initState)

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setFormError(null)

		setFields((prevFields) => ({
			...prevFields,
			[name]: {
				value: value,
				hasError: false,
				error: null,
			},
		}))
	}

	const setError = (fieldKey: string, msg: string | null) => {
		setFields((fields) => ({
			...fields,
			[fieldKey]: {
				...fields[fieldKey],
				hasError: true,
				error: msg,
			},
		}))
	}

	const validate = (): boolean => {
		let isValid = true

		for (const fieldKey in fields) {
			const fieldValue = fields[fieldKey].value

			const emailRegex =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			const emptinessCheck = fieldValue.length > 0
			const lengthCheck = fieldValue.length <= 100

			switch (fieldKey) {
				case "name":
				case "surname":
					isValid = isValid && emptinessCheck && lengthCheck
					if (!isValid) {
						setError(
							fieldKey,
							emptinessCheck
								? "it should be less than 100 characters"
								: "this is required"
						)
					}

					break
				case "email":
					isValid = isValid && emptinessCheck && emailRegex.test(fieldValue)
					if (!isValid) {
						setError(
							fieldKey,
							emptinessCheck ? "it should be a valid email" : "this is required"
						)
					}

					break
				case "age":
					const age = Number(fieldValue)
					isValid = isValid && emptinessCheck && age >= 18 && age <= 150
					if (!isValid) {
						setError(
							fieldKey,
							emptinessCheck
								? "it should be between 18 and 150"
								: "this is required"
						)
					}

					break
			}
		}

		return isValid
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const { name, surname, email, age } = fields

		if (validate()) {
			try {
				const created = await createUser({
					name: name.value,
					surname: surname.value,
					email: email.value,
					age: Number(age.value),
				} as User)

				setFields(initState)
			} catch (e) {
				setFormError("something went wront")
			}
		}
	}

	return {
		fields,
		formError,
		handleSubmit,
		changeHandler,
	}
}

const initState: Record<string, any> = {
	name: {
		value: "",
		hasError: false,
		error: null,
	},
	surname: {
		value: "",
		hasError: false,
		error: null,
	},
	email: {
		value: "",
		hasError: false,
		error: null,
	},
	age: {
		value: "",
		hasError: false,
		error: null,
	},
}

export default function CSRPage() {
	const { fields, formError, handleSubmit, changeHandler } =
		useUserForm(initState)

	return (
		<MainLayout>
			<div className="space-y-2">
				<div className="py-2">
					<h1 className="text-xl text-gray-500 font-bold">Add user page</h1>
					<p className="text-gray-500">
						Create a new user to see its profile in users list
					</p>
				</div>

				<form className="space-y-4" noValidate onSubmit={handleSubmit}>
					<div>{formError && <p>{formError}</p>}</div>

					<TextField
						label="name"
						type="text"
						name="name"
						placeholder="Enter user name"
						changeHandler={changeHandler}
						{...fields.name}
					/>
					<TextField
						label="surname"
						type="text"
						name="surname"
						placeholder="Enter user surname"
						changeHandler={changeHandler}
						{...fields.surname}
					/>
					<TextField
						label="email"
						type="email"
						name="email"
						placeholder="Enter user email"
						changeHandler={changeHandler}
						{...fields.email}
					/>
					<TextField
						label="name"
						type="number"
						name="age"
						placeholder="Enter user age"
						changeHandler={changeHandler}
						{...fields.age}
					/>
					<button
						className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-500"
						type="submit"
					>
						Create
					</button>
				</form>
			</div>
		</MainLayout>
	)
}
