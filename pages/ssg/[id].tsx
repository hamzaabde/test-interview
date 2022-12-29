import MainLayout from "../../layouts/MainLayout";
import { User } from "@prisma/client";
import { buildAPIUrl } from "../../lib/utils";

export async function fetchUsers() {
  return await (await fetch(buildAPIUrl("user"))).json();
}

export async function fetchUser(id: string) {
  return await (await fetch(buildAPIUrl(`user/${id}`))).json();
}

export const getStaticPaths = async () => {
  // TODO: Fetch all users with "fetchUsers" and create paths for them
  const paths: [string?] = [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO: Fetch user information with "fetchUser"
  const user = {};

  return {
    props: {
      user,
    },
  };
};

export default function SSGPage({ user }: { user: User }) {
  return (
    <MainLayout>
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">User page</h1>
        <div className="space-y-2">
          <h1 className="font-medium">{`${user?.name} ${user?.lastName}`}</h1>
          <p>Email: {user?.email}</p>
          <p>Age: {user?.age}</p>
        </div>
      </section>
    </MainLayout>
  );
}
