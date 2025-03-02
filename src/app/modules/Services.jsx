import services from "@/app/utils/constant/services.js"

const Service = () => {
  return (
    <div className="py-20" id="service">
      <div className="container mx-auto px-5 md:px-10 lg:px-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          My Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative p-4 rounded-lg shadow-md
              border transition-all duration-300 
              transform hover:scale-105"
            >
              <h3 className="mt-2 text-2xl font-bold h-[50px] flex items-center">
                {service.title}
              </h3>
              <p className="mt-3 max-[330px]:mt-[22px] leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;