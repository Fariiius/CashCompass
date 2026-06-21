import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET() {
  const symbols = ["COMI.CA", "HRHO.CA", "ESRS.CA", "TMGH.CA", "SWDY.CA"];

  try {
    const quotes = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const result = await yahooFinance.quote(symbol);
          
          const price = result.regularMarketPrice?.toFixed(2) || "0.00";
          const changePercent = result.regularMarketChangePercent || 0;
          
          const formattedChange = changePercent > 0 
            ? `+${changePercent.toFixed(2)}%` 
            : `${changePercent.toFixed(2)}%`;
            
          let signal = "Hold";
          if (changePercent > 1.5) signal = "Buy";
          if (changePercent < -1.5) signal = "Sell";

          return {
            symbol,
            name: result.shortName || symbol,
            price,
            change: formattedChange,
            signal,
          };
        } catch (error) {
          console.error(`Error fetching ${symbol}:`, error);
          // Fallback if Yahoo Finance fails for a specific ticker
          return {
            symbol,
            name: symbol,
            price: "N/A",
            change: "0.00%",
            signal: "Hold",
          };
        }
      })
    );

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
