export default function CallToAction() {
    return (
      <section className="w-full flex justify-center items-center bg-blue-500 text-white rounded-md py-6 px-4">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Want to contribute?</p>
          <p className="mb-6">Help us improve this project and make it better for everyone.</p>
          <a
            href="https://github.com/Mahdi-Hazrati/Emoji-Select-Panel"
            className="inline-block bg-white text-blue-500 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute on GitHub
          </a>
        </div>
      </section>
    );
  }
  