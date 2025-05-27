import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { roboto } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
<section
  className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center"
  style={{ backgroundImage: 'url(../home/hero_crafts.webp)' }}
>
  <div className="bg-black bg-opacity-50 p-8 rounded text-center">
    <h1 className={`text-5xl md:text-7xl font-extrabold ${roboto.className}`}>
      Team5 Handcraft Haven
    </h1>
    <p className="mt-4 text-lg md:text-xl">
      Preserving heritage through handmade art
    </p>
    <a
      href="#"
      className="inline-block mt-6 bg-secondary hover:bg-opacity-80 text-white font-semibold px-6 py-3 rounded transition"
    >
      Shop Now
    </a>
  </div>
</section>


      {/* About Us */}
      <section className="px-4 md:px-16 text-center">
        <h2 className={`text-3xl font-semibold mb-4 ${roboto.className}`}>About Us</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
        Handcraft Haven is more than a marketplace — it's a vibrant community where artisans, makers, and creators come together to share their stories through handcrafted work. Our platform empowers local and independent artisans to showcase their unique skills and offer their handmade treasures to the world.
        </p>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
        From delicately woven baskets to intricately sculpted ceramics, every product featured here is a testament to dedication, heritage, and passion. At Handcraft Haven, we believe in preserving cultural traditions while supporting creativity and innovation.
        </p>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
        Whether you're a craftsman, collector, or simply someone who values authenticity, you're welcome here. Join us in celebrating the artistry of human hands — where every item has a soul, and every purchase makes a difference.
        </p>
      </section>

      {/* Testimonies */}
      <section className="bg-gray-100 py-12 px-4 md:px-16 text-center">
        <h2 className={`text-3xl font-semibold mb-8 ${roboto.className}`}>What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <blockquote className="bg-white p-6 rounded shadow">
            <p className="text-lg italic">"This platform gave my craft the audience it deserves. Orders have doubled!"</p>
            <footer className="mt-4 font-semibold">— Amina, Basket Weaver</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded shadow">
            <p className="text-lg italic">"Selling on Handcraft Haven has been a game changer. I love the community here."</p>
            <footer className="mt-4 font-semibold">— Chuks, Wood Carver</footer>
          </blockquote>
        </div>
      </section>

      {/* Featured Products Teaser */}
      <section className="px-4 md:px-16 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Discover Our Special Pieces</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <img src="../home/baskets.webp" alt="Handwoven Basket" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Handwoven Heritage Basket</h3>
              <p className="text-gray-600">Crafted with love using ancestral techniques passed down through generations.</p>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <img src="../home/mask.webp" alt="Decorative Wooden Mask" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Decorative Wooden Mask</h3>
              <p className="text-gray-600">A striking expression of culture, history, and fine craftsmanship.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

