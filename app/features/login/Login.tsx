import { auth, signIn, signOut } from "@/auth";

export default async function Login() {
  const session = await auth();

  return (
    <form
      action={async () => {
        "use server";
        if (session) {
          await signOut();
        } else {
          await signIn("github");
        }
      }}
    >
      <button
        type="submit"
        className="bg-gray-800 text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.201 2.393.099 2.646.64.698 1.028 1.591 1.028 2.682 0 3.842-2.337 4.687-4.565 4.936.36.31.682.92.682 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.579.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            clipRule="evenodd"
          />
        </svg>
        {session ? "Sign out" : "Sign in with GitHub"}
      </button>
    </form>
  );
}
