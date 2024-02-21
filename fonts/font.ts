import {
  Big_Shoulders_Text,
  IBM_Plex_Sans,
  Inter,
  Poppins,
  Proza_Libre,
  Space_Grotesk,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });
const imbPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["500"] });
const prozaLibre = Proza_Libre({ subsets: ["latin"], weight: ["500"] });
const bigShouldersText = Big_Shoulders_Text({
  subsets: ["latin"],
  weight: ["800"],
});

export {
  inter,
  spaceGrotesk,
  poppins,
  prozaLibre,
  imbPlexSans,
  bigShouldersText,
};
