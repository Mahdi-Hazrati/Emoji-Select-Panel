import { Github, Package, FileText, Link2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="text-center py-12 border-t mt-auto text-sm text-gray-500 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="mb-4">
          Another OSS project by{" "}
          <a
            href="https://mahdi.is-a.dev?utm_source=emoji-select-panel"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mahdi Hazrati
          </a>{" "}
          — 2025
        </p>
        <div className="flex justify-center flex-wrap gap-6 mb-8">
          <a
            href="/docs"
            className="flex items-center text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="mr-2" />
            Documentation
          </a>
          <a
            href="https://nextproduction.dev?utm_source=emoji-select-panel"
            className="flex items-center text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link2 className="mr-2" />
            Next Production
          </a>
          <a
            href="https://www.npmjs.com/package/emoji-select-panel"
            className="flex items-center text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Package className="mr-2" />
            NPM Package
          </a>
          <a
            href="https://github.com/Mahdi-Hazrati/Emoji-Select-Panel"
            className="flex items-center text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2" />
            GitHub Repository
          </a>
        </div>

      </div>
    </footer>
  )
}
