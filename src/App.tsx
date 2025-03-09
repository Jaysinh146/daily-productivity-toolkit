import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Menu, X, ExternalLink, Clock, ListTodo, Link as LinkIcon, Instagram, Youtube } from 'lucide-react';
import { gsap } from 'gsap';
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PomodoroTimer';
import LinkHub from './components/LinkHub';
import TipOfTheDay from './components/TipOfTheDay';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.from('.hero-content', {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D3436] to-[#0084FF]">
      {/* Mobile Menu */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
        isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed right-0 top-0 h-full w-64 bg-[#2D3436] transform transition-transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="p-6 space-y-4">
            <a href="#todo" className="block text-white hover:text-[#00F5D4] transition-colors">Todo List</a>
            <a href="#pomodoro" className="block text-white hover:text-[#00F5D4] transition-colors">Pomodoro Timer</a>
            <a href="#links" className="block text-white hover:text-[#00F5D4] transition-colors">Link Hub</a>
            <a href="#contact" className="block text-white hover:text-[#00F5D4] transition-colors">Contact</a>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 px-6 text-center hero-content">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-poppins">
          Daily Productivity Toolkit
        </h1>
        <p className="text-xl md:text-2xl text-white mb-6">
          Transform Your Workflow, One Task at a Time
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section id="todo" className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <ListTodo className="text-[#00F5D4]" />
            <h2 className="text-2xl font-bold text-white">Todo List</h2>
          </div>
          <TodoList />
        </section>

        <section id="pomodoro" className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-[#00F5D4]" />
            <h2 className="text-2xl font-bold text-white">Pomodoro Timer</h2>
          </div>
          <PomodoroTimer />
        </section>

        <section id="links" className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="text-[#00F5D4]" />
            <h2 className="text-2xl font-bold text-white">Link Hub</h2>
          </div>
          <LinkHub />
        </section>
      </main>

      {/* Tip of the Day Widget */}
      <TipOfTheDay />

      {/* Footer */}
      <footer className="bg-[#2D3436] text-white py-12 px-6 mt-12">
        <div className="container mx-auto">
          <div className="text-center space-y-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Hi, I'm Jaysinh</h2>
              <p className="text-lg text-white/90 mb-8">
                I am a developer passionate about creating beautiful and functional applications.
                Let's connect and build something amazing together!
              </p>
            </div>
            
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/jaysinh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#00F5D4] transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/jaysinh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#00F5D4] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/jaysinh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#00F5D4] transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com/jaysinh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#00F5D4] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://youtube.com/@jaysinh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#00F5D4] transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;