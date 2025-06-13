"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Star, Heart, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Lenovo AirPods",
    brand: "Lenovo",
    price: 2500,
    originalPrice: 3000,
    image: "/Images/Air-pods/lenovo.png",
    rating: 4.5,
    category: "Audio",
  },
  {
    id: 2,
    name: "SMARTWATCH HAINO TEKO S1",
    brand: "Haino Teko",
    price: 3500,
    originalPrice: 4000,
    image: "/Images/Smart watch/SMARTWATCH HAINO TEKO S1.png",
    rating: 4.8,
    category: "Wearables",
  },
  {
    id: 3,
    name: "Smartwatch T20 Pro Max",
    brand: "T20",
    price: 2000,
    originalPrice: 2500,
    image: "/Images/Smart watch/Smartwatch T20 Pro Max.png",
    rating: 4.3,
    category: "Wearables",
  },
  {
    id: 4,
    name: "Powerbank HOCO 5000 MAH J106 IPHONE",
    brand: "HOCO",
    price: 2500,
    originalPrice: 3000,
    image: "/Images/Chargers/Powerbank HOCO 5000 MAH J106 IPHONE.png",
    rating: 4.6,
    category: "Accessories",
  },
  {
    id: 5,
    name: "RingLight MJ36 with Tripods",
    brand: "MJ36",
    price: 6000,
    originalPrice: 7000,
    image: "/Images/Lighting&photography/RingLight MJ36 with Tripods.png",
    rating: 4.7,
    category: "Photography",
  },
  {
    id: 6,
    name: "Headphones P9 PLUS MAX",
    brand: "P9",
    price: 3400,
    originalPrice: 4000,
    image: "/Images/Headphones/Headphones P9 PLUS MAX.png",
    rating: 4.4,
    category: "Audio",
  },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1)
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GZ</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Gears Zone
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Shop", "Blog", "About", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`text-slate-700 hover:text-emerald-600 font-medium transition-colors relative ${
                    item === "Home" ? "text-emerald-600" : ""
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 ${item === "Home" ? "w-full" : "w-0"}`}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input placeholder="Search products..." className="pl-10 w-64 hidden lg:block" />
              </div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartItems}
                    </motion.span>
                  )}
                </Button>
              </motion.div>

              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden bg-white border-t"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {["Home", "Shop", "Blog", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`block text-slate-700 hover:text-emerald-600 font-medium ${
                  item === "Home" ? "text-emerald-600" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Trade-in Offer</Badge>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-slate-800">Super value</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  deals
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                On tech products! Best trade-in deals are waiting for you don't miss out!
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 text-lg"
                >
                  Shop Now
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img src="/Images/Air-pods/lenovo.png" alt="Hero Product" className="w-full max-w-lg mx-auto" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Products</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium tech products at unbeatable prices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 text-white">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.preventDefault()
                          toggleFavorite(product.id)
                        }}
                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-slate-600"
                          }`}
                        />
                      </motion.button>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-600 ml-2">({product.rating})</span>
                      </div>

                      <p className="text-sm text-slate-500 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-slate-800 mb-3 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-emerald-600">{product.price} دج</span>
                          <span className="text-sm text-slate-500 line-through">{product.originalPrice} دج</span>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            addToCart(product.id)
                          }}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Banners */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "SmartWatches",
                subtitle: "Crazy deals",
                bg: "from-blue-500 to-purple-600",
                bgImage: "/Images/Smart watch/SMARTWATCH HAINO TEKO S1.png",
              },
              {
                title: "Headphones",
                subtitle: "Crazy deals",
                bg: "from-pink-500 to-rose-600",
                bgImage: "/Images/Headphones/Headphones P9 PLUS MAX.png",
              },
              {
                title: "Air-pods",
                subtitle: "Crazy deals",
                bg: "from-emerald-500 to-teal-600",
                bgImage: "/Images/Air-pods/lenovo.png",
              },
              {
                title: "Powerbank & charger",
                subtitle: "Crazy deals",
                bg: "from-orange-500 to-red-600",
                bgImage: "/Images/Chargers/Powerbank HOCO 5000 MAH J106 IPHONE.png",
              },
            ].map((banner, index) => (
              <motion.div
                key={banner.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl p-8 text-white min-h-[200px] flex flex-col justify-center"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />

                <div className="absolute inset-0 flex items-center justify-end overflow-hidden">
                  <img
                    src={banner.bgImage || "/placeholder.svg"}
                    alt={banner.title}
                    className="h-full w-auto object-contain object-right opacity-70"
                  />
                </div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="relative z-20"
                >
                  <h4 className="text-lg font-medium mb-2">{banner.subtitle}</h4>
                  <h2 className="text-3xl font-bold mb-4">{banner.title}</h2>
                  <p className="mb-6 opacity-90">Quality, Comfort & Best Price!</p>
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    Let's shop!
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GZ</span>
                </div>
                <span className="text-2xl font-bold">Gears Zone</span>
              </div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-slate-300 mb-2">
                <strong>Phone:</strong> (+213) 0779407234
              </p>
              <p className="text-slate-300 mb-6">
                <strong>Timing:</strong> 24/7
              </p>
              <div>
                <h4 className="font-semibold mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-slate-400 hover:text-white">
                    <i className="fab fa-facebook-f"></i>
                  </motion.a>
                  <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-slate-400 hover:text-white">
                    <i className="fab fa-instagram"></i>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4">About</h4>
              <div className="space-y-2">
                {["About us", "Delivery information", "Terms and conditions", "Contact us"].map((link) => (
                  <a key={link} href="#" className="block text-slate-300 hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4">My account</h4>
              <div className="space-y-2">
                {["Sign-in", "View Cart", "My wishlist", "Track my order", "Help"].map((link) => (
                  <a key={link} href="#" className="block text-slate-300 hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-slate-300 mb-4">Subscribe to get updates on new products and offers</p>
              <div className="flex">
                <Input placeholder="Your email" className="bg-slate-800 border-slate-700 text-white" />
                <Button className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-600">Subscribe</Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400"
          >
            <p>&copy; 2024 Gears Zone. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
