interface Listing {
  _id:          string;
  address:      string;
  category:     string;
  city:         string;
  description:  string;
  host:         string;
  hostImgURL:   string;
  imageURL:     string;
  price:        number;
}
interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  token: string | null;
  updateToken: (newToken: string | null) => void;
}
interface Booking {
  _id: string;
  dates: [string];
  listing: Listing;
}