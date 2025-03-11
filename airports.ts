export interface Airport {
  code: string
  name: string
  country: string
}

export const airports: Airport[] = [
  // United States
  { code: "JFK", name: "John F. Kennedy International Airport", country: "United States" },
  { code: "LAX", name: "Los Angeles International Airport", country: "United States" },
  { code: "ORD", name: "O'Hare International Airport", country: "United States" },
  { code: "MIA", name: "Miami International Airport", country: "United States" },
  { code: "DFW", name: "Dallas/Fort Worth International Airport", country: "United States" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", country: "United States" },
  { code: "IAH", name: "George Bush Intercontinental Airport", country: "United States" },
  { code: "SFO", name: "San Francisco International Airport", country: "United States" },
  { code: "SEA", name: "Seattle-Tacoma International Airport", country: "United States" },
  { code: "MCO", name: "Orlando International Airport", country: "United States" },
  { code: "BOS", name: "Boston Logan International Airport", country: "United States" },
  { code: "LAS", name: "Harry Reid International Airport", country: "United States" },
  { code: "PHX", name: "Phoenix Sky Harbor International Airport", country: "United States" },
  { code: "DEN", name: "Denver International Airport", country: "United States" },
  { code: "DTW", name: "Detroit Metropolitan Airport", country: "United States" },

  // United Kingdom
  { code: "LHR", name: "London Heathrow Airport", country: "United Kingdom" },
  { code: "LGW", name: "London Gatwick Airport", country: "United Kingdom" },
  { code: "MAN", name: "Manchester Airport", country: "United Kingdom" },
  { code: "STN", name: "London Stansted Airport", country: "United Kingdom" },
  { code: "EDI", name: "Edinburgh Airport", country: "United Kingdom" },
  { code: "BHX", name: "Birmingham Airport", country: "United Kingdom" },
  { code: "GLA", name: "Glasgow Airport", country: "United Kingdom" },
  { code: "BRS", name: "Bristol Airport", country: "United Kingdom" },

  // Germany
  { code: "FRA", name: "Frankfurt Airport", country: "Germany" },
  { code: "MUC", name: "Munich Airport", country: "Germany" },
  { code: "DUS", name: "Düsseldorf Airport", country: "Germany" },
  { code: "TXL", name: "Berlin Brandenburg Airport", country: "Germany" },
  { code: "HAM", name: "Hamburg Airport", country: "Germany" },
  { code: "CGN", name: "Cologne Bonn Airport", country: "Germany" },
  { code: "STR", name: "Stuttgart Airport", country: "Germany" },

  // France
  { code: "CDG", name: "Charles de Gaulle Airport", country: "France" },
  { code: "ORY", name: "Paris Orly Airport", country: "France" },
  { code: "LYS", name: "Lyon Saint-Exupéry Airport", country: "France" },
  { code: "MRS", name: "Marseille Provence Airport", country: "France" },
  { code: "NCE", name: "Nice Côte d'Azur Airport", country: "France" },
  { code: "TLS", name: "Toulouse-Blagnac Airport", country: "France" },

  // Spain
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", country: "Spain" },
  { code: "BCN", name: "Barcelona–El Prat Airport", country: "Spain" },
  { code: "PMI", name: "Palma de Mallorca Airport", country: "Spain" },
  { code: "AGP", name: "Málaga Airport", country: "Spain" },
  { code: "ALC", name: "Alicante Airport", country: "Spain" },
  { code: "VLC", name: "Valencia Airport", country: "Spain" },

  // Italy
  { code: "FCO", name: "Leonardo da Vinci International Airport", country: "Italy" },
  { code: "MXP", name: "Milan Malpensa Airport", country: "Italy" },
  { code: "LIN", name: "Milan Linate Airport", country: "Italy" },
  { code: "VCE", name: "Venice Marco Polo Airport", country: "Italy" },
  { code: "NAP", name: "Naples International Airport", country: "Italy" },
  { code: "BLQ", name: "Bologna Guglielmo Marconi Airport", country: "Italy" },

  // Netherlands
  { code: "AMS", name: "Amsterdam Airport Schiphol", country: "Netherlands" },
  { code: "RTM", name: "Rotterdam The Hague Airport", country: "Netherlands" },
  { code: "EIN", name: "Eindhoven Airport", country: "Netherlands" },

  // Belgium
  { code: "BRU", name: "Brussels Airport", country: "Belgium" },
  { code: "CRL", name: "Brussels South Charleroi Airport", country: "Belgium" },
  { code: "ANR", name: "Antwerp International Airport", country: "Belgium" },

  // Switzerland
  { code: "ZRH", name: "Zurich Airport", country: "Switzerland" },
  { code: "GVA", name: "Geneva Airport", country: "Switzerland" },
  { code: "BSL", name: "EuroAirport Basel Mulhouse Freiburg", country: "Switzerland" },

  // Austria
  { code: "VIE", name: "Vienna International Airport", country: "Austria" },
  { code: "SZG", name: "Salzburg Airport", country: "Austria" },
  { code: "INN", name: "Innsbruck Airport", country: "Austria" },

  // Ireland
  { code: "DUB", name: "Dublin Airport", country: "Ireland" },
  { code: "SNN", name: "Shannon Airport", country: "Ireland" },
  { code: "ORK", name: "Cork Airport", country: "Ireland" },

  // Poland
  { code: "WAW", name: "Warsaw Chopin Airport", country: "Poland" },
  { code: "KRK", name: "John Paul II International Airport Kraków–Balice", country: "Poland" },
  { code: "GDN", name: "Gdańsk Lech Wałęsa Airport", country: "Poland" },

  // Sweden
  { code: "ARN", name: "Stockholm Arlanda Airport", country: "Sweden" },
  { code: "GOT", name: "Gothenburg-Landvetter Airport", country: "Sweden" },
  { code: "MMX", name: "Malmö Airport", country: "Sweden" },

  // Norway
  { code: "OSL", name: "Oslo Airport, Gardermoen", country: "Norway" },
  { code: "BGO", name: "Bergen Airport, Flesland", country: "Norway" },
  { code: "TRD", name: "Trondheim Airport, Værnes", country: "Norway" },

  // Denmark
  { code: "CPH", name: "Copenhagen Airport", country: "Denmark" },
  { code: "BLL", name: "Billund Airport", country: "Denmark" },
  { code: "AAL", name: "Aalborg Airport", country: "Denmark" },

  // Finland
  { code: "HEL", name: "Helsinki-Vantaa Airport", country: "Finland" },
  { code: "TMP", name: "Tampere-Pirkkala Airport", country: "Finland" },
  { code: "TKU", name: "Turku Airport", country: "Finland" },

  // Russia
  { code: "SVO", name: "Sheremetyevo International Airport", country: "Russia" },
  { code: "DME", name: "Moscow Domodedovo Airport", country: "Russia" },
  { code: "LED", name: "Pulkovo Airport", country: "Russia" },
  { code: "VKO", name: "Vnukovo International Airport", country: "Russia" },

  // Turkey
  { code: "IST", name: "Istanbul Airport", country: "Turkey" },
  { code: "SAW", name: "Istanbul Sabiha Gökçen International Airport", country: "Turkey" },
  { code: "AYT", name: "Antalya Airport", country: "Turkey" },
  { code: "ESB", name: "Ankara Esenboğa International Airport", country: "Turkey" },

  // Greece
  { code: "ATH", name: "Athens International Airport", country: "Greece" },
  { code: "SKG", name: "Thessaloniki Airport", country: "Greece" },
  { code: "HER", name: "Heraklion International Airport", country: "Greece" },

  // Portugal
  { code: "LIS", name: "Lisbon Airport", country: "Portugal" },
  { code: "OPO", name: "Porto Airport", country: "Portugal" },
  { code: "FAO", name: "Faro Airport", country: "Portugal" },

  // Canada
  { code: "YYZ", name: "Toronto Pearson International Airport", country: "Canada" },
  { code: "YVR", name: "Vancouver International Airport", country: "Canada" },
  { code: "YUL", name: "Montréal-Pierre Elliott Trudeau International Airport", country: "Canada" },
  { code: "YYC", name: "Calgary International Airport", country: "Canada" },
  { code: "YEG", name: "Edmonton International Airport", country: "Canada" },
  { code: "YOW", name: "Ottawa Macdonald-Cartier International Airport", country: "Canada" },
  { code: "YHZ", name: "Halifax Stanfield International Airport", country: "Canada" },

  // Mexico
  { code: "MEX", name: "Benito Juárez International Airport", country: "Mexico" },
  { code: "CUN", name: "Cancún International Airport", country: "Mexico" },
  { code: "GDL", name: "Guadalajara International Airport", country: "Mexico" },
  { code: "MTY", name: "Monterrey International Airport", country: "Mexico" },
  { code: "TIJ", name: "Tijuana International Airport", country: "Mexico" },

  // Brazil
  { code: "GRU", name: "São Paulo/Guarulhos International Airport", country: "Brazil" },
  { code: "GIG", name: "Rio de Janeiro/Galeão International Airport", country: "Brazil" },
  { code: "BSB", name: "Presidente Juscelino Kubitschek International Airport", country: "Brazil" },
  { code: "CGH", name: "São Paulo/Congonhas Airport", country: "Brazil" },
  { code: "CNF", name: "Belo Horizonte International Airport", country: "Brazil" },

  // Argentina
  { code: "EZE", name: "Ministro Pistarini International Airport", country: "Argentina" },
  { code: "AEP", name: "Jorge Newbery Airpark", country: "Argentina" },
  { code: "COR", name: "Ingeniero Aeronáutico Ambrosio L.V. Taravella International Airport", country: "Argentina" },

  // Chile
  { code: "SCL", name: "Arturo Merino Benítez International Airport", country: "Chile" },
  { code: "CCP", name: "Carriel Sur International Airport", country: "Chile" },
  { code: "IQQ", name: "Diego Aracena International Airport", country: "Chile" },

  // Australia
  { code: "SYD", name: "Sydney Airport", country: "Australia" },
  { code: "MEL", name: "Melbourne Airport", country: "Australia" },
  { code: "BNE", name: "Brisbane Airport", country: "Australia" },
  { code: "PER", name: "Perth Airport", country: "Australia" },
  { code: "ADL", name: "Adelaide Airport", country: "Australia" },
  { code: "CBR", name: "Canberra Airport", country: "Australia" },
  { code: "OOL", name: "Gold Coast Airport", country: "Australia" },

  // New Zealand
  { code: "AKL", name: "Auckland Airport", country: "New Zealand" },
  { code: "CHC", name: "Christchurch Airport", country: "New Zealand" },
  { code: "WLG", name: "Wellington International Airport", country: "New Zealand" },
  { code: "ZQN", name: "Queenstown Airport", country: "New Zealand" },

  // Japan
  { code: "HND", name: "Tokyo Haneda Airport", country: "Japan" },
  { code: "NRT", name: "Narita International Airport", country: "Japan" },
  { code: "KIX", name: "Kansai International Airport", country: "Japan" },
  { code: "CTS", name: "New Chitose Airport", country: "Japan" },
  { code: "FUK", name: "Fukuoka Airport", country: "Japan" },
  { code: "NGO", name: "Chubu Centrair International Airport", country: "Japan" },

  // South Korea
  { code: "ICN", name: "Incheon International Airport", country: "South Korea" },
  { code: "GMP", name: "Gimpo International Airport", country: "South Korea" },
  { code: "PUS", name: "Gimhae International Airport", country: "South Korea" },
  { code: "CJU", name: "Jeju International Airport", country: "South Korea" },

  // China
  { code: "PEK", name: "Beijing Capital International Airport", country: "China" },
  { code: "PKX", name: "Beijing Daxing International Airport", country: "China" },
  { code: "PVG", name: "Shanghai Pudong International Airport", country: "China" },
  { code: "SHA", name: "Shanghai Hongqiao International Airport", country: "China" },
  { code: "CAN", name: "Guangzhou Baiyun International Airport", country: "China" },
  { code: "SZX", name: "Shenzhen Bao'an International Airport", country: "China" },
  { code: "CTU", name: "Chengdu Shuangliu International Airport", country: "China" },
  { code: "HGH", name: "Hangzhou Xiaoshan International Airport", country: "China" },

  // Hong Kong
  { code: "HKG", name: "Hong Kong International Airport", country: "Hong Kong" },

  // Taiwan
  { code: "TPE", name: "Taiwan Taoyuan International Airport", country: "Taiwan" },
  { code: "TSA", name: "Taipei Songshan Airport", country: "Taiwan" },
  { code: "KHH", name: "Kaohsiung International Airport", country: "Taiwan" },

  // Singapore
  { code: "SIN", name: "Singapore Changi Airport", country: "Singapore" },

  // Malaysia
  { code: "KUL", name: "Kuala Lumpur International Airport", country: "Malaysia" },
  { code: "PEN", name: "Penang International Airport", country: "Malaysia" },
  { code: "BKI", name: "Kota Kinabalu International Airport", country: "Malaysia" },
  { code: "JHB", name: "Senai International Airport", country: "Malaysia" },

  // Thailand
  { code: "BKK", name: "Suvarnabhumi Airport", country: "Thailand" },
  { code: "DMK", name: "Don Mueang International Airport", country: "Thailand" },
  { code: "HKT", name: "Phuket International Airport", country: "Thailand" },
  { code: "CNX", name: "Chiang Mai International Airport", country: "Thailand" },

  // Vietnam
  { code: "SGN", name: "Tan Son Nhat International Airport", country: "Vietnam" },
  { code: "HAN", name: "Noi Bai International Airport", country: "Vietnam" },
  { code: "DAD", name: "Da Nang International Airport", country: "Vietnam" },

  // Indonesia
  { code: "CGK", name: "Soekarno-Hatta International Airport", country: "Indonesia" },
  { code: "DPS", name: "Ngurah Rai International Airport", country: "Indonesia" },
  { code: "SUB", name: "Juanda International Airport", country: "Indonesia" },
  { code: "MES", name: "Kualanamu International Airport", country: "Indonesia" },

  // Philippines
  { code: "MNL", name: "Ninoy Aquino International Airport", country: "Philippines" },
  { code: "CEB", name: "Mactan-Cebu International Airport", country: "Philippines" },
  { code: "DVO", name: "Francisco Bangoy International Airport", country: "Philippines" },

  // India
  { code: "DEL", name: "Indira Gandhi International Airport", country: "India" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", country: "India" },
  { code: "MAA", name: "Chennai International Airport", country: "India" },
  { code: "BLR", name: "Kempegowda International Airport", country: "India" },
  { code: "HYD", name: "Rajiv Gandhi International Airport", country: "India" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport", country: "India" },

  // United Arab Emirates
  { code: "DXB", name: "Dubai International Airport", country: "United Arab Emirates" },
  { code: "AUH", name: "Abu Dhabi International Airport", country: "United Arab Emirates" },
  { code: "SHJ", name: "Sharjah International Airport", country: "United Arab Emirates" },
  { code: "DWC", name: "Al Maktoum International Airport", country: "United Arab Emirates" },

  // Qatar
  { code: "DOH", name: "Hamad International Airport", country: "Qatar" },

  // Saudi Arabia
  { code: "JED", name: "King Abdulaziz International Airport", country: "Saudi Arabia" },
  { code: "RUH", name: "King Khalid International Airport", country: "Saudi Arabia" },
  { code: "DMM", name: "King Fahd International Airport", country: "Saudi Arabia" },
  { code: "MED", name: "Prince Mohammad bin Abdulaziz International Airport", country: "Saudi Arabia" },

  // Israel
  { code: "TLV", name: "Ben Gurion Airport", country: "Israel" },
  { code: "ETH", name: "Ramon Airport", country: "Israel" },
  { code: "HFA", name: "Haifa Airport", country: "Israel" },

  // Egypt
  { code: "CAI", name: "Cairo International Airport", country: "Egypt" },
  { code: "HRG", name: "Hurghada International Airport", country: "Egypt" },
  { code: "SSH", name: "Sharm El Sheikh International Airport", country: "Egypt" },
  { code: "LXR", name: "Luxor International Airport", country: "Egypt" },

  // South Africa
  { code: "JNB", name: "O.R. Tambo International Airport", country: "South Africa" },
  { code: "CPT", name: "Cape Town International Airport", country: "South Africa" },
  { code: "DUR", name: "King Shaka International Airport", country: "South Africa" },
  { code: "PLZ", name: "Chief Dawid Stuurman International Airport", country: "South Africa" },
]

export const countries = Array.from(new Set(airports.map((airport) => airport.country))).sort()

