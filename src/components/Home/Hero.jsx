import bike from "../../assets/dapper-white.avif";
import bike2 from "../../assets/BMW.png";
import bike3 from "../../assets/scooty.png";



const Hero = () => {
  return (
    <section className="bg-black text-white py-16 px-6 sm:px-12 lg:px-20">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-10 z-10 mb-10">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Unlock Endless Driving <br className="hidden md:block" />
            With Drivee
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-md mx-auto md:mx-0">
            To contribute to positive change and achieve our sustainability goals with many extraordinary
          </p>
          <button
            onClick={() => {
              window.location.href = "/bikes";
            }}
            className="border border-white  text-white font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition">
            Rent Bike
          </button>

        </div>

       {/* Image Section */}
<div className="w-full md:w-1/2 relative flex justify-center items-center right-5 bottom-10">

  {/* Car Image */}
  <img
    src={bike}
    alt="Hero Car"
    className="max-w-[90vw] md:max-w-[600px] xl:max-w-[650px] object-contain z-10 relative bottom-5"
  />

  {/* Bike Image */}
  {/* <img
    src={bike2}
    alt="Hero Bike"
    className="absolute right-10 md:right-40 top-5 bottom-5 w-[60vw] sm:w-[400px] md:w-[600px] object-contain z-20"
  /> */}
  
  <img
    src={bike3}
    alt="Hero Bike"
    loading="lazy"
    className="absolute right-5 md:right-20 top-20 bottom-5 w-[50vw] sm:w-[350px] md:w-[500px] object-contain z-20"
  />
  
</div>


      </div>
    </section>
  );
};

export default Hero;
