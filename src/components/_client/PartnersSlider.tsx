'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import React from 'react'
import Image from 'next/image'
import { Autoplay, Grid } from 'swiper/modules'

const partners = [
  { name: 'Watu', image: '/images/clients/Watu-Logo.svg' },
  { name: 'Afrinet', image: '/images/clients/afrinet-logo.svg' },
  { name: 'Aventus', image: '/images/clients/aventus.svg' },
  { name: 'Bamba', image: '/images/clients/bamba-logo.webp' },
  { name: 'eCitizen', image: '/images/clients/ecitizen-logo.png' },
  { name: 'Fincorp', image: '/images/clients/fincorp-logo.png' },
  { name: 'Ikerin', image: '/images/clients/ikerin.png' },
  { name: 'Liaison', image: '/images/clients/liaison.png' },
  { name: 'MKA', image: '/images/clients/mka.png' },
  { name: 'MUST', image: '/images/clients/must.png' },
  { name: 'Pesaflow', image: '/images/clients/pesaflow.svg' },
  { name: 'SHA', image: '/images/clients/sha_logo.svg' },
  { name: 'Watu Credit', image: '/images/clients/watu-logo.png' },
  { name: 'Zaoshinani', image: '/images/clients/zaoshinani.svg' },
]

export const PartnersSlider = () => {
  return (
    <Swiper
      modules={[Grid, Autoplay]}
      loop={true}
      autoplay={true}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {partners.map((partner, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center justify-center h-24 p-2 bg-gray-100 dark:bg-gray-100/20 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <Image
              src={partner.image}
              alt={partner.name}
              width={200}
              height={200}
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
