import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-10">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
        <div className="flex justify-center space-x-6">
          {/* Instagram Link */}
          <Link
            href="https://www.instagram.com/yourusername"
            className="text-xl hover:text-primary transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> Instagram
          </Link>

          {/* LinkedIn Link */}
          <Link
            href="https://www.linkedin.com/in/yourusername"
            className="text-xl hover:text-primary transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </Link>

          {/* Twitter Link */}
          <Link
            href="https://twitter.com/yourusername"
            className="text-xl hover:text-primary transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i> Twitter
          </Link>

          {/* Email Link */}
          <Link
            href="mailto:youremail@example.com"
            className="text-xl hover:text-primary transition-colors duration-200"
          >
            <i className="fas fa-envelope"></i> Email
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ayesha Muttalib. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
