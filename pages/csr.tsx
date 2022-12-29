import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { buildAPIUrl } from "../lib/utils";

/* 
 ** TODO:
 ** Refactor this code as much as you can
 ** Style the form (tailwindcss is preferable)
 ** 
 ** PS. If you wanna extract some functionality to another file then
 ** just create it in this file and write a comment above with file name that you would give
 */

export async function createUser(data: any) {
  await fetch(buildAPIUrl("user"), {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export default function CSRPage() {
  const [name, setName] = useState(""); // Required, Max length 100
  const [lastName, setLastName] = useState(""); // Required, Max length 100
  const [email, setEmail] = useState(""); // Required
  const [age, setAge] = useState(""); // Required, min age 18, max age 150

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createUser({ name, lastName, email, age: Number(age) });

    setName("");
    setLastName("");
    setEmail("");
    setAge("");
  };

  return (
    <MainLayout>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Add user page</h1>
        <h1>Create a new user to see its profile in users list</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block">Name</label>
            <input
              className="w-full p-1 rounded-md"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="space-y-2">
            <label className="block">Last Name</label>
            <input
              className="w-full p-1 rounded-md"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="space-y-2">
            <label className="block">Email</label>
            <input
              className="w-full p-1 rounded-md"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="space-y-2">
            <label className="block">Age</label>
            <input
              className="w-full p-1 rounded-md"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-500"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
