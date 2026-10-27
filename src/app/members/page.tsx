
import { getCurrentUser } from "@/lib/auth";
import { Surface } from "@heroui/react";


export default async function MembersPage() {

  const user = await getCurrentUser()
  return (
    <>
      <h2>Members Page</h2>

      {user ? (
        <Surface className="p-4 rounded-2xl">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Surface>
      ) : (
        <div>Not Signed In</div>
      )}

    </>
  )
}