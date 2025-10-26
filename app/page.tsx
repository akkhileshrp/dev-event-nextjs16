import EventCard from "@/components/eventcard";
import ExploreBtn from "@/components/explorebtn";
import { events } from "@/constants/events";

const Home = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev Event You Mustn't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events list-none">
          {events.map((event, index) => (
            <li key={index}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
