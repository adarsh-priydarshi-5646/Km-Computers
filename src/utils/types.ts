export interface FestivalOffer {
  id: string;
  name: string;
  greeting: string;
  discountCode: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  icon: string;
  backgroundColor: string;
  textColor: string;
}

export const FESTIVAL_ICONS = {
  EID: '🌙',
  DIWALI: '🪔',
  CHRISTMAS: '🎄',
  HOLI: '🎨',
  NEW_YEAR: '✨',
} as const; 