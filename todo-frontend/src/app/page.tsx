export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Todo App</h1>
        <div className="space-y-4">
          <a 
            href="/login"
            className="block w-48 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </a>
          <a
            href="/register"
            className="block w-48 mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  )
}
