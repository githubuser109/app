import React, { useCallback, useState } from 'react'
import { FC } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { ChainId } from '@sushiswap/sdk'
import Button from '../Button'
import { classNames } from '../../functions'
import { Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const images = [
  {
    image: `url('/images/miso/banner-gene.png')`,
    url: 'https://miso.sushi.com/auctions/0xA017E4Cf380c5FDc372463f3330853500b4B3Cb9',
  },
  {
    image: `url('/images/miso/banner-xdefi.jpg')`,
    url: 'https://miso.sushi.com/auctions/0xE7E8A485945339079ec5Ae72917369FE6661f15E',
  },
]

const Banner: FC = () => {
  const { chainId } = useActiveWeb3React()
  const [slide, setSlide] = useState<number>(Math.floor(Math.random() * images.length))

  const nextSlide = useCallback(() => {
    setSlide((prevState) => (prevState + 1) % images.length)
  }, [])

  const prevSlide = useCallback(() => {
    setSlide((prevState) => (prevState - 1 + images.length) % images.length)
  }, [])

  if (chainId !== ChainId.MAINNET) return <></>

  const slides = images.map(({ image, url }, index) => (
    <div
      key={index}
      className={classNames(
        'h-[96px] absolute inset-0 flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform slide'
      )}
    >
      <Transition
        as={React.Fragment}
        show={index === slide}
        enter="transform transition duration-[200ms]"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <a
          rel="noreferrer"
          href={url}
          target="_blank"
          className="hidden w-full py-12 rounded cursor-pointer sm:block"
          style={{
            backgroundImage: image,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex items-center justify-between gap-6 pl-5 pr-8" />
        </a>
      </Transition>
    </div>
  ))

  return (
    <div className="flex justify-center flex-col">
      <div className="relative h-[96px] mt-4">
        {slides}
        <div className="flex justify-between w-full h-full items-center">
          <Button onClick={prevSlide} className="flex items-center -ml-12">
            <ChevronLeftIcon width={24} className="hover:text-white text-low-emphesis" />
          </Button>
          <Button onClick={nextSlide} className="flex items-center -mr-12">
            <ChevronRightIcon width={24} className="hover:text-white text-low-emphesis" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Banner
