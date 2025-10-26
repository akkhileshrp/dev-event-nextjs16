interface Event {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    image: "/images/event1.png",
    title: "Event 1",
    slug: "event-1",
    location: "New York",
    date: "2024-09-15",
    time: "10:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "Event 2",
    slug: "event-2",
    location: "Los Angeles",
    date: "2024-10-20",
    time: "2:00 PM",
  },
  {
    image: "/images/event3.png",
    title: "Event 3",
    slug: "event-3",
    location: "Chicago",
    date: "2024-11-05",
    time: "4:30 PM",
  },
  {
    image: "/images/event4.png",
    title: "Event 4",
    slug: "event-4",
    location: "Miami",
    date: "2024-12-01",
    time: "1:00 PM",
  },
  {
    image: "/images/event5.png",
    title: "Event 5",
    slug: "event-5",
    location: "Seattle",
    date: "2025-01-15",
    time: "11:30 AM",
  },
  {
    image: "/images/event6.png",
    title: "Event 6",
    slug: "event-6",
    location: "Boston",
    date: "2025-02-28",
    time: "3:00 PM",
  }
];