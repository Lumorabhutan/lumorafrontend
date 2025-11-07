import PlacesToTravelOptions from "@/component/places-to-tavel-card/places-to-travel-card";
import { placestotraveldetails } from "@/data/places-to-travels-details";

export default function TripsForFistTimer() {
  return (
    <section className="bg-white h-auto">
      <section className="bg-white py-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 lg:gap-8">
            {/* Left: Title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-lime-600 text-base md:text-2xl font-mono">
                MANY TOURISTS CHOOSE
              </h1>
              <h2 className="font-mono text-lg md:text-2xl">
                Top Bhutan Tours
              </h2>
            </div>

            {/* Right: Stats */}
            <div className="flex flex-row sm:flex-row items-center gap-2 text-center sm:text-left">
              <h1 className="font-mono text-xl md:text-2xl font-bold">+10k</h1>
              <p className="font-mono text-sm md:text-xl whitespace-nowrap">
                Tourists have chosen these tours
              </p>
            </div>
          </div>
        </div>
      </section>

      <PlacesToTravelOptions data={placestotraveldetails} />
    </section>
  );
}
