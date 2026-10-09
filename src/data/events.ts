export interface Event {
  name: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  dressCode: string;
  quote: string;
  gcalStart: string;
  gcalEnd: string;
  mapsUrl: string;
  color: string;
}

export const events: Event[] = [
  {
    name: "Ring Ceremony",
    dateLabel: "Wednesday, 18 November 2026",
    timeLabel: "3:00 PM onwards",
    venue: "Gulab Vihar",
    address: "Sheopur Rd, Sanganer, Pratap Nagar, Jaipur, Rajasthan 302033",
    dressCode: "",
    quote: "Two families, one promise, sealed with a ring.",
    gcalStart: "20261118T093000Z",
    gcalEnd: "20261118T143000Z",
    mapsUrl: "https://maps.google.com/?q=Gulab+Vihar+Sheopur+Rd+Sanganer+Pratap+Nagar+Jaipur+Rajasthan+302033",
    color: "#C9A84C",
  },
  {
    name: "Haldi Carnival",
    dateLabel: "Thursday, 19 November 2026",
    timeLabel: "10:00 AM onwards",
    venue: "Residence",
    address: "62/72, RHB Pratap Nagar, Sanganer, Jaipur, Rajasthan 302033",
    dressCode: "",
    quote: "Bathed in golden blessings, the journey begins.",
    gcalStart: "20261119T043000Z",
    gcalEnd: "20261119T073000Z",
    mapsUrl: "https://maps.google.com/?q=62/72+RHB+Pratap+Nagar+Sanganer+Jaipur+Rajasthan+302033",
    color: "#F5C842",
  },
  {
    name: "Mehendi",
    dateLabel: "Thursday, 19 November 2026",
    timeLabel: "2:00 PM onwards",
    venue: "Residence",
    address: "62/72, RHB Pratap Nagar, Sanganer, Jaipur, Rajasthan 302033",
    dressCode: "",
    quote: "Adorned in henna, hearts painted with love.",
    gcalStart: "20261119T083000Z",
    gcalEnd: "20261119T123000Z",
    mapsUrl: "https://maps.google.com/?q=62/72+RHB+Pratap+Nagar+Sanganer+Jaipur+Rajasthan+302033",
    color: "#C4795A",
  },
  {
    name: "Sangeet",
    dateLabel: "Thursday, 19 November 2026",
    timeLabel: "6:00 PM onwards",
    venue: "Residence",
    address: "62/72, RHB Pratap Nagar, Sanganer, Jaipur, Rajasthan 302033",
    dressCode: "",
    quote: "Dance, sing, celebrate — love is in the air.",
    gcalStart: "20261119T123000Z",
    gcalEnd: "20261119T173000Z",
    mapsUrl: "https://maps.google.com/?q=62/72+RHB+Pratap+Nagar+Sanganer+Jaipur+Rajasthan+302033",
    color: "#D4748C",
  },
  {
    name: "The Wedding",
    dateLabel: "Friday, 20 November 2026",
    timeLabel: "8:00 PM (Muhurtham)",
    venue: "Mukund Gardens",
    address: "Nasirabad Rd, Adarsh Nagar, Ajmer, Rajasthan 305002",
    dressCode: "",
    quote: "The sacred vows — with your blessings.",
    gcalStart: "20261120T143000Z",
    gcalEnd: "20261121T003000Z",
    mapsUrl: "https://maps.google.com/?q=Mukund+Gardens+Ajmer+Rajasthan",
    color: "#8A5C6E",
  },
  {
    name: "Reception",
    dateLabel: "Sunday, 22 November 2026",
    timeLabel: "7:00 PM onwards",
    venue: "Chandani Garden",
    address: "Sheopur Road, Sector 6, Sanganer, Pratap Nagar, Jaipur, Rajasthan 302033",
    dressCode: "",
    quote: "The celebration continues — join us one last time.",
    gcalStart: "20261122T133000Z",
    gcalEnd: "20261122T183000Z",
    mapsUrl: "https://maps.google.com/?q=Chandani+Garden+Sheopur+Road+Sector+6+Sanganer+Pratap+Nagar+Jaipur+Rajasthan",
    color: "#7B6FA0",
  },
];
