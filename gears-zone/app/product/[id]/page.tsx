"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Share2, Star, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// This would typically come from an API or database
const products = [
  {
    id: 1,
    name: "Lenovo AirPods",
    brand: "Lenovo",
    price: 2500,
    originalPrice: 3000,
    images: [
      "/Images/Air-pods/lenovo.png",
      "/Images/Air-pods/lenovo.png",
      "/Images/Air-pods/lenovo.png",
      "/Images/Air-pods/lenovo.png",
    ],
    rating: 4.5,
    category: "Audio",
    description: "Premium wireless earbuds with exceptional sound quality",
    specifications: {
      audio: {
        driver: "10mm dynamic",
        frequency: "20Hz - 20kHz",
        impedance: "32Ω",
        sensitivity: "98dB",
      },
      battery: {
        earbuds: "6 hours",
        withCase: "24 hours",
        charging: "USB-C",
        quickCharge: "15min = 3hrs",
      },
    },
  },
]

const relatedProducts = [
  {
    id: 2,
    name: "SMARTWATCH HAINO TEKO S1",
    brand: "Haino Teko",
    price: 3500,
    originalPrice: 4000,
    image: "/Images/Smart watch/SMARTWATCH HAINO TEKO S1.png",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Smartwatch T20 Pro Max",
    brand: "T20",
    price: 2000,
    originalPrice: 2500,
    image: "/Images/Smart watch/Smartwatch T20 Pro Max.png",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Powerbank HOCO 5000 MAH J106 IPHONE",
    brand: "HOCO",
    price: 2500,
    originalPrice: 3000,
    image: "/Images/Chargers/Powerbank HOCO 5000 MAH J106 IPHONE.png",
    rating: 4.6,
  },
  {
    id: 5,
    name: "RingLight MJ36 with Tripods",
    brand: "MJ36",
    price: 6000,
    originalPrice: 7000,
    image: "/Images/Lighting&photography/RingLight MJ36 with Tripods.png",
    rating: 4.7,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0] // Fallback to first product if not found

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

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

            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Shop", "Blog", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`text-slate-700 hover:text-emerald-600 font-medium transition-colors ${
                    item === "Shop" ? "text-emerald-600" : ""
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 text-sm text-slate-600"
        >
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-emerald-600">
            Shop
          </Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </motion.div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
              </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg bg-white p-2 shadow-md ${
                    selectedImage === index ? "ring-2 ring-emerald-500" : ""
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-contain"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <Badge className="mb-2 bg-emerald-100 text-emerald-700">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
              <p className="text-slate-600">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-600">({product.rating}) 128 reviews</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-emerald-600">{product.price} دج</span>
              <span className="text-xl text-slate-500 line-through">{product.originalPrice} دج</span>
              <Badge className="bg-red-500 text-white">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-slate-700 font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-slate-600">Orders over 5000 دج</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-sm">Warranty</p>
                  <p className="text-xs text-slate-600">1 Year</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-slate-600">30 Days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Product Description</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Experience premium audio quality with the {product.name}. These wireless earbuds deliver exceptional
                    sound clarity, deep bass, and crystal-clear highs. With advanced noise cancellation technology and
                    up to 24 hours of battery life, they're perfect for music lovers and professionals alike.
                  </p>
                  <ul className="mt-6 space-y-2 text-slate-600">
                    <li>• Premium sound quality with deep bass</li>
                    <li>• Active noise cancellation</li>
                    <li>• 24-hour battery life with charging case</li>
                    <li>• IPX4 water resistance</li>
                    <li>• Touch controls for easy operation</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Audio</h4>
                      <ul className="space-y-1 text-slate-600">
                        <li>Driver: {product.specifications.audio.driver}</li>
                        <li>Frequency: {product.specifications.audio.frequency}</li>
                        <li>Impedance: {product.specifications.audio.impedance}</li>
                        <li>Sensitivity: {product.specifications.audio.sensitivity}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Battery</h4>
                      <ul className="space-y-1 text-slate-600">
                        <li>Earbuds: {product.specifications.battery.earbuds}</li>
                        <li>With case: {product.specifications.battery.withCase}</li>
                        <li>Charging: {product.specifications.battery.charging}</li>
                        <li>Quick charge: {product.specifications.battery.quickCharge}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-emerald-700">A</span>
                          </div>
                          <div>
                            <p className="font-semibold">Ahmed K.</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600">
                          Excellent sound quality and comfortable fit. Battery life is impressive and the noise
                          cancellation works great. Highly recommended!
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-contain"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-slate-500 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-emerald-600">{product.price} دج</span>
                          <span className="text-sm text-slate-500 line-through ml-2">{product.originalPrice} دج</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
