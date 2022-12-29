import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import { buildAPIUrl } from "../lib/utils";
import { User } from "@prisma/client";

/*
 ** TODO:
 ** Refactor "getServerSideProps" method only as much as you can
 */

type UserWithTotalPosts = User & {
  totalPosts?: number;
};

export async function fetchUsers() {
  return await (await fetch(buildAPIUrl("user"))).json();
}

export async function fetchPosts() {
  return await (await fetch(buildAPIUrl("post"))).json();
}

export const getServerSideProps = async () => {
  const data1 = (await fetchUsers()) as UserWithTotalPosts[];
  const data2 = await fetchPosts();

  // Count and set totals posts for each user
  for (let i = 0; i < data1.length; i++) {
    for (let j = 0; j < data2.length; j++) {
      if (data1[i].id === data2[j].userId) {
        if (data1[i].totalPosts !== undefined) {
          data1[i].totalPosts!++;
        } else {
          data1[i].totalPosts = 1;
        }
      }
    }
  }

  return {
    props: { users: data1 },
  };
};

export default function SSRPage({ users }: { users: UserWithTotalPosts[] } = { users: [] }) {
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
                  <h2 className="font-medium">{`${user.name} ${user.lastName}`}</h2>
                  <p>Email: {user.email}</p>
                  <p>Total posts: {user.totalPosts}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </MainLayout>
  );
}
