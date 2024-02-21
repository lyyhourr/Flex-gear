import QuantityBuyNow from "@/components/product-details/Quantity-BuyNow";
import ProductsLayout from "@/components/products-layout/Products-Layout";
import { productsData } from "@/data/products";
import { inter, spaceGrotesk } from "@/fonts/font";
import { StarIcon } from "lucide-react";
import Image from "next/image";

const delivery = [
  {
    img: "delivery",
    title: "Free Delivery",
    text: "Enter you postal code for Delivery Availability",
    underlineText: "  ",
  },
  {
    img: "return",
    title: "Return Delivery",
    text: "Free 30 days Delivery Return.",
    underlineText: "Details",
  }
]
const Delivery = ({ img, title, text, underlineText }: { img: string, title: string, text: string, underlineText: string }) => (
  <div className="flex items-center gap-3 p-3 lg:p-5 border-b border-black">
    <Image
      src={`/icon-${img}.png`}
      width={50}
      height={50}
      alt={title}
      className="w-[40px] lg:w-[50px]"
      unoptimized
    />
    <div className="flex flex-col gap-2 text-sm lg:text-base">
      <p className="text-lg lg:text-xl ">{title}</p>
      <p>
        {text && text}
        <span className=" underline">
          {underlineText}
        </span>
      </p>
    </div>
  </div>
)

export default function page({ params }: { params: { data: string } }) {
  const paramData = params.data.split("-");
  const categoryProducts = productsData.filter(
    (item) => item.category == paramData[0]
  );
  const localProduct = categoryProducts.filter(
    (item) => item.id === Number(paramData[1])
  );
  const relatedItem = productsData.filter(item => item.id !== Number(paramData[1]) && item.productType.includes(localProduct[0].productType.slice(0, localProduct[0].productType.indexOf(" "))))

  const priceAfterDiscount =
    localProduct.length ?
      localProduct[0].discountPercentage &&
      localProduct[0].price -
      (localProduct[0].price * localProduct[0].discountPercentage) / 100 : 0;


  return (
    <main className={` container ${inter.className}`}>
      <section className="flex md:flex-row flex-col gap-4 w-full py-5">
        <div className="w-full flex items-center justify-center p-0 sm:p-3 lg:p-5 bg-gray-100">
          <Image
            src={`/categories${localProduct[0].image}`}
            width={500}
            height={500}
            alt={localProduct[0].productName}
            className="w-[200px] sm:w-[300px] lg:w-auto"
            unoptimized
          />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-3  py-5 border-b border-black">
            <p
              className={`${spaceGrotesk.className} text-3xl first-letter:uppercase`}
            >
              {localProduct[0].productName}
            </p>
            <div className="flex items-center">
              {Array.from({ length: localProduct[0].rating }).map(
                (item: any, i: number) => (
                  <StarIcon
                    key={i}
                    className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4 lg:h-5 lg:w-5 fill-yellow-500 "
                  />
                )
              )}
              {Array.from({ length: 5 - localProduct[0].rating }).map(
                (item: any, i: number) => (
                  <StarIcon
                    key={i}
                    className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4 lg:h-5 lg:w-5 fill-gray-300 "
                  />
                )
              )}
              <span className="text-gray-500">({localProduct[0].rating})</span>
              &#160;&#160;|&#160;&#160;
              <span className="text-green-500">In Stock</span>
            </div>
            {localProduct[0].isDiscount ? (
              <div className="flex items-center gap-2">
                <p className="text-3xl text-red-500">$ {priceAfterDiscount}</p>
                <p className="text-3xl line-through text-gray-400">
                  $ {localProduct[0].price}
                </p>
              </div>
            ) : (
              <p className="text-3xl text-red-500">$ {localProduct[0].price}</p>
            )}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
              illum quas odio quia ipsam autem atque aperiam corrupti dicta,
              quidem, quos ipsa recusandae minus deleniti in adipisci ut nam
              fuga!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <QuantityBuyNow product={localProduct[0]} />
          </div>
          <div className="border border-gray-500 rounded-sm">
            {
              delivery.map((item, i) => (
                <Delivery img={item.img} text={item.text} title={item.title} underlineText={item.underlineText} key={i} />
              ))
            }

          </div>
        </div>
      </section>
      {
        relatedItem.length > 0 &&
        <ProductsLayout
          header="Related Item"
          productsData={relatedItem.slice(0, 4)}
        />
      }
    </main>
  );
}
