import { NextResponse } from "next/server";

// Comprehensive EGX Tickers List
const BASE_STOCKS = [
  // EGX 30
  { symbol: "COMI.CA", name: "Commercial International Bank", basePrice: 79.50 },
  { symbol: "HRHO.CA", name: "EFG Hermes", basePrice: 20.15 },
  { symbol: "ESRS.CA", name: "Ezz Steel", basePrice: 88.30 },
  { symbol: "TMGH.CA", name: "Talaat Moustafa Group", basePrice: 64.00 },
  { symbol: "EAST.CA", name: "Eastern Company", basePrice: 32.40 },
  { symbol: "FWRY.CA", name: "Fawry", basePrice: 8.50 },
  { symbol: "SWDY.CA", name: "Elsewedy Electric", basePrice: 45.20 },
  { symbol: "EKHO.CA", name: "Egypt Kuwait Holding", basePrice: 35.10 },
  { symbol: "HELI.CA", name: "Heliopolis Housing", basePrice: 12.80 },
  { symbol: "ISPH.CA", name: "Ibnsina Pharma", basePrice: 3.40 },
  { symbol: "ORHD.CA", name: "Orascom Development", basePrice: 14.20 },
  { symbol: "OCDI.CA", name: "SODIC", basePrice: 48.00 },
  { symbol: "MASR.CA", name: "Madinet Masr", basePrice: 4.10 },
  { symbol: "JUFO.CA", name: "Juhayna", basePrice: 19.30 },
  { symbol: "MTIE.CA", name: "MM Group", basePrice: 9.60 },
  { symbol: "AMOC.CA", name: "Alexandria Mineral Oils", basePrice: 10.40 },
  { symbol: "CLHO.CA", name: "Cleopatra Hospitals", basePrice: 6.80 },
  { symbol: "ADIB.CA", name: "Abu Dhabi Islamic Bank", basePrice: 42.00 },
  { symbol: "ORAS.CA", name: "Orascom Construction", basePrice: 240.00 },
  { symbol: "CCAP.CA", name: "Qalaa Holdings", basePrice: 3.10 },
  { symbol: "QNBA.CA", name: "QNB Egypt", basePrice: 38.00 },
  { symbol: "CIEB.CA", name: "Credit Agricole", basePrice: 22.50 },
  { symbol: "EXPA.CA", name: "Export Development Bank", basePrice: 28.30 },
  { symbol: "CERA.CA", name: "Ceramica Cleopatra", basePrice: 8.70 },
  { symbol: "SUZE.CA", name: "Suez Cement", basePrice: 45.00 },
  { symbol: "ETEL.CA", name: "Telecom Egypt", basePrice: 40.50 },
  { symbol: "ABUK.CA", name: "Abu Qir Fertilizers", basePrice: 90.00 },
  { symbol: "SKPC.CA", name: "Sidi Kerir Petrochemicals", basePrice: 32.10 },
  { symbol: "RACT.CA", name: "Rakta Paper", basePrice: 16.50 },
  // EGX 70 (Sample of Top Movers)
  { symbol: "DSCW.CA", name: "Dice Sport", basePrice: 1.45 },
  { symbol: "ARAB.CA", name: "Arab Developers", basePrice: 2.15 },
  { symbol: "MOIL.CA", name: "Maridive", basePrice: 0.18 },
  { symbol: "LEEG.CA", name: "Lecico", basePrice: 26.50 },
  { symbol: "ACGC.CA", name: "Arab Cotton Ginning", basePrice: 7.20 },
  { symbol: "ASCM.CA", name: "ASCOM", basePrice: 48.50 },
  { symbol: "AUTO.CA", name: "GB Auto", basePrice: 14.10 },
  { symbol: "BINV.CA", name: "B Investments", basePrice: 22.40 },
  { symbol: "CICH.CA", name: "CI Capital", basePrice: 6.20 },
  { symbol: "DOMT.CA", name: "Domty", basePrice: 14.80 },
  { symbol: "EALR.CA", name: "EgyptALum", basePrice: 110.00 },
  { symbol: "EFID.CA", name: "Edita", basePrice: 35.60 },
  { symbol: "EMFD.CA", name: "Emaar Misr", basePrice: 6.90 },
  { symbol: "IDHC.CA", name: "IDH", basePrice: 21.00 },
  { symbol: "MNHD.CA", name: "Nasr City Housing", basePrice: 4.80 },
];

import yahooFinance from 'yahoo-finance2';

export async function GET() {
  try {
    const symbols = BASE_STOCKS.map(s => s.symbol);
    const quotes: any[] = await yahooFinance.quote(symbols);
    
    const liveQuotes = BASE_STOCKS.map((stock) => {
      const quote = quotes.find(q => q.symbol === stock.symbol);
      
      let price = stock.basePrice;
      let changePercent = 0;
      
      if (quote) {
        price = quote.regularMarketPrice ?? stock.basePrice;
        changePercent = quote.regularMarketChangePercent ?? 0;
      }
      
      const formattedChange = changePercent > 0 
        ? `+${changePercent.toFixed(2)}%` 
        : `${changePercent.toFixed(2)}%`;
        
      let signal = "Hold";
      if (changePercent > 1.5) signal = "Buy";
      if (changePercent < -1.5) signal = "Sell";

      return {
        symbol: stock.symbol,
        name: stock.name,
        price: price.toFixed(2),
        change: formattedChange,
        signal,
      };
    });

    return NextResponse.json(liveQuotes);
  } catch (error) {
    console.error("Error fetching stocks from Yahoo Finance:", error);
    return NextResponse.json(
      { error: "Failed to fetch real stock data" },
      { status: 500 }
    );
  }
}
