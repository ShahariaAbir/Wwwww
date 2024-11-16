'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FaSun, FaCloudRain, FaWind, FaThermometerHalf, FaUmbrella, FaCloud } from 'react-icons/fa'

// Placeholder weather data
const weatherData = {
  temperature: 22,
  condition: 'Partly Cloudy',
  humidity: 60,
  windSpeed: 10,
}

export default function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(weatherData)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { register, handleSubmit } = useForm()

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    // Simulating weather data fetch
    const fetchWeather = () => {
      setTimeout(() => {
        setCurrentWeather({
          ...weatherData,
          temperature: Math.floor(Math.random() * 30) + 10,
        })
      }, 3000)
    }
    fetchWeather()
  }, [])

  const onSubmit = (data) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-500`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              WeatherNow
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex space-x-4"
            >
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 transition-all"
                >
                  {isDarkMode ? '🌞' : '🌙'}
                </button>
              </motion.li>
            </motion.ul>
          </div>
        </nav>
      </header>

      {/* Hero Banner */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Weather background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-4 text-white drop-shadow-lg"
          >
            Your Weather, Your Way
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-white drop-shadow-md"
          >
            Stay informed with real-time weather updates
          </motion.p>
        </div>
      </motion.section>

      {/* Current Weather */}
      <section className="py-16 bg-gradient-to-b from-blue-500 to-purple-600">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Current Weather</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <FaSun className="text-9xl text-yellow-300" />
              </div>
              <div className="space-y-4">
                <p className="text-6xl font-bold">{currentWeather.temperature}°C</p>
                <p className="text-2xl">{currentWeather.condition}</p>
                <div className="flex items-center space-x-4">
                  <FaThermometerHalf className="text-2xl" />
                  <span>Humidity: {currentWeather.humidity}%</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaWind className="text-2xl" />
                  <span>Wind: {currentWeather.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-gradient-to-b from-purple-600 to-indigo-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaCloudRain, title: 'Precipitation Forecast' },
              { icon: FaUmbrella, title: 'Severe Weather Alerts' },
              { icon: FaCloud, title: 'Air Quality Index' },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <service.icon className="text-5xl mb-4 text-blue-300" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 bg-gradient-to-b from-indigo-800 to-blue-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">About WeatherNow</h2>
              <p className="text-gray-300 mb-4">
                WeatherNow is your go-to source for accurate and up-to-date weather information. Our team of
                meteorologists and data scientists work tirelessly to provide you with the most reliable forecasts.
              </p>
              <p className="text-gray-300">
                With cutting-edge technology and a passion for weather, we're committed to keeping you informed and
                prepared for whatever Mother Nature has in store.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="About WeatherNow"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'John Doe', text: 'WeatherNow has been a game-changer for my outdoor activities!' },
              { name: 'Jane Smith', text: 'I love the accuracy and reliability of WeatherNow\'s forecasts.' },
              { name: 'Mike Johnson', text: 'The severe weather alerts have kept me and my family safe.' },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-blue-300">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: 'Free', features: ['7-day forecast', 'Basic alerts', 'Standard updates'] },
              { name: 'Pro', price: '$4.99/mo', features: ['14-day forecast', 'Advanced alerts', 'Hourly updates', 'Ad-free experience'] },
              { name: 'Premium', price: '$9.99/mo', features: ['30-day forecast', 'Severe weather warnings', 'Real-time updates', 'Personal weather assistant'] },
            ].map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-300">{pkg.name}</h3>
                <p className="text-3xl font-bold mb-6 text-white">{pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <FaSun className="text-yellow-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Parallax background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white text-center drop-shadow-lg"
          >
            Experience Weather Like Never Before
          </motion.h2>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-gradient-to-b from-indigo-900 to-blue-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: true })}
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: true })}
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message', { required: true })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Subscribe to Our Newsletter</h2>
            <p className="text-gray-300 mb-8">
              Stay up-to-date with the latest weather news and exclusive forecasts.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WeatherNow</h3>
              <p className="text-gray-400">Your trusted source for accurate weather forecasts.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaSun className="text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaCloudRain className="text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaWind className="text-2xl" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">1234 Weather Lane</p>
              <p className="text-gray-400">Forecast City, FC 12345</p>
              <p className="text-gray-400">contact@weathernow.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 WeatherNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}