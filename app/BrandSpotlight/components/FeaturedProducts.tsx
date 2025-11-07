"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Item, Brand } from "../../lib/types";
import { trackEvent } from "../../lib/analytics";

interface Props {
  items: Item[];
  brand: Brand;
}

export default function FeaturedProducts({ items, brand }: Props) {
  return (
    <div className="space-y-40 mb-32">
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          className={`relative flex flex-col md:flex-row items-center gap-10 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url(${item.image?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <motion.div
            className="relative w-full md:w-1/2 h-[480px] overflow-hidden rounded-3xl shadow-2xl z-10"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <Image
              src={item.image?.url || "https://dummyimage.com/900x600"}
              alt={item.title}
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="md:w-1/2 z-10"
            initial={{ opacity: 0, x: index % 2 === 1 ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="uppercase text-sm tracking-widest text-gray-400 mb-3">
              {item.category}
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {item.long_description || item.short_description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <Link
                href={item.cta?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("product_click", {
                    brand: brand.name,
                    product_id: item.id,
                  })
                }
                className="inline-block bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Kupi kod {item.company.name}
              </Link>
            </div>
          </motion.div>
        </motion.article>
      ))}
    </div>
  );
}
