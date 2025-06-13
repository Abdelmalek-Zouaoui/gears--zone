"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
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
  // Duplicate products to fill the page
  {
    id: 7,
    name: "Lenovo AirPods Pro",
    brand: "Lenovo",
    price: 3200,
    originalPrice: 3800,
    image: "/Images/Air-pods/lenovo.png",
    rating: 4.7,
    category: "Audio",
  },
  {
    id: 8,
    name: "SMARTWATCH HAINO TEKO S2",
    brand: "Haino Teko",
    price: 4000,
    originalPrice: 4500,
    image: "/Images/Smart watch/SMARTWATCH HAINO TEKO S1.png",
    rating: 4.6,
    category: "Wearables",
  },
]

const categories = [
  { id: "audio", name: "Audio", count: 3 },
  { id: "wearables", name: "Wearables", count: 2 },
  { id: "accessories", name: "Accessories", count: 1 },
  { id: "photography", name: "Photography", count: 1 },
]

const brands = [
  { id: "lenovo", name: "Lenovo", count: 2 },
  { id: "haino-teko", name: "Haino Teko", count: 2 },
  { id: "hoco", name: "HOCO", count: 1 },
  { id: "mj36", name: "MJ36", count: 1 },
  { id: "p9", name: "P9", count: 1 },
  { id: "t20", name: "T20", count: 1 },
]

export default function ShopPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])

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
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GZ</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Gears Zone
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Shop", "Blog", "About", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`text-slate-700 hover:text-emerald-600 font-medium transition-colors relative ${
                    item === "Shop" ? "text-emerald-600" : ""
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 ${
                      item === "Shop" ? "w-full" : "w-0"
                    }`}
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
                  item === "Shop" ? "text-emerald-600" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.header>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Shop All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
          >
            Discover our wide range of premium tech products at unbeatable prices
          </motion.p>
        </div>
      </section>

      {/* Shop Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-64 hidden lg:block"
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox id={`category-${category.id}`} />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name} ({category.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-medium mb-2">Brands</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center">
                        <Checkbox id={`brand-${brand.id}`} />
                        <label
                          htmlFor={`brand-${brand.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {brand.name} ({brand.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-4">Price Range</h4>
                  <Slider
                    defaultValue={[0, 10000]}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{priceRange[0]} دج</span>
                    <span className="\
