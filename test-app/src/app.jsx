import { Link } from "@mejor/router";

export function Metadata () {
  return {
    title: "Testing"
  };
}

export default function () {
  return (
    <ul key="HomeComponent" class="border rounded-lg divide-y divide-gray-300 mx-1 mt-3 p-4">
      <li class="py-2">
        <Link to="/page-with-signal" class="block hover:bg-gray-100 rounded-lg p-3">
          Pagination using signals
        </Link>
      </li>
      
      <li class="py-2">
        <Link to="/page-with-reactive" class="block hover:bg-gray-100 rounded-lg p-3">
          Pagination using <code class="p-1 rounded text-sm text-red-500 bg-gray-50">reactive()</code>
        </Link>
      </li>

      <li class="py-2">
        <Link to="/page-without-signal" class="block hover:bg-gray-100 rounded-lg p-3">
          Pagination using <code class="p-1 rounded text-sm text-red-500 bg-gray-50">useData()</code>
        </Link>
      </li>
      
      <li class="py-2">
        <Link to="/client-actions" class="block hover:bg-gray-100 rounded-lg p-3">
          Handle Forms Without using a Server
        </Link>
      </li>
      
      <li class="py-2">
        <Link to="/todo" class="block hover:bg-gray-100 rounded-lg p-3">
          Simple Todo App
        </Link>
      </li>
    </ul>
  )
}