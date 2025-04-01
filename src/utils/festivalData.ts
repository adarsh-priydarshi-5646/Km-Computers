import { FestivalOffer, FESTIVAL_ICONS } from './types';

const FESTIVALS_2025 = {
  EID: new Date('2025-03-31'), // Eid ul-Fitr 2025
  DIWALI: new Date('2025-11-12'), // Diwali 2025
  CHRISTMAS: new Date('2025-12-25'), // Christmas 2025
  HOLI: new Date('2025-03-14'), // Holi 2025
  NEW_YEAR: new Date('2025-01-01'), // New Year 2025
} as const;

export const generateFestivalOffer = (
  festivalName: keyof typeof FESTIVAL_ICONS,
  durationInDays: number = 7,
  discountPercentage: number = 35
): FestivalOffer => {
  // Calculate start date (7 days before the festival)
  const festivalDate = FESTIVALS_2025[festivalName];
  const startDate = new Date(festivalDate);
  startDate.setDate(startDate.getDate() - 7);
  
  // End date is the festival date itself
  const endDate = new Date(festivalDate);

  const festivalData: Record<keyof typeof FESTIVAL_ICONS, { 
    greeting: string;
    discountCode: string;
    defaultDiscount: number;
  }> = {
    EID: {
      greeting: "Eid Mubarak! Special Offer 🌙",
      discountCode: "EID2025",
      defaultDiscount: 35
    },
    DIWALI: {
      greeting: "Diwali Dhamaka Offer! ✨",
      discountCode: "DIWALI2025",
      defaultDiscount: 40
    },
    CHRISTMAS: {
      greeting: "Christmas Special Offer! 🎄",
      discountCode: "XMAS2025",
      defaultDiscount: 30
    },
    HOLI: {
      greeting: "Holi Celebration Offer! 🎨",
      discountCode: "HOLI2025",
      defaultDiscount: 25
    },
    NEW_YEAR: {
      greeting: "New Year Special Offer! 🎉",
      discountCode: "NEWYEAR2025",
      defaultDiscount: 45
    },
  };

  const festInfo = festivalData[festivalName];

  return {
    id: `${festivalName.toLowerCase()}-${startDate.getTime()}`,
    name: festivalName,
    greeting: festInfo.greeting,
    discountCode: festInfo.discountCode,
    discountPercentage: discountPercentage || festInfo.defaultDiscount,
    startDate,
    endDate,
    icon: FESTIVAL_ICONS[festivalName],
    backgroundColor: '#0D0D0D',
    textColor: '#ffffff',
  };
}; 