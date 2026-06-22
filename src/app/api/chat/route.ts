import { streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import yahooFinanceModule from 'yahoo-finance2';
const yahooFinance = new (yahooFinanceModule as any)();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-pro'),
      messages,
      system: `You are Cash Compass AI, an advanced bilingual (Arabic/English) financial advisor chatbot for the Egyptian market. 
      You help users with EGX stocks analysis, banking options, and precious metals.
      When asked about stock prices or analysis, use the 'getStockPrice' tool to fetch live data from Yahoo Finance.
      Always format your responses cleanly using markdown. If the user asks in Arabic, reply in Arabic. If English, reply in English.
      If you cannot fetch a stock price, inform the user politely.`,
      tools: {
        getStockPrice: tool({
          description: 'Fetch the real-time stock price and daily change percentage for a given stock symbol on the Egyptian Exchange (EGX). Use the EGX suffix (.CA) for symbols, e.g., COMI.CA',
          parameters: z.object({
            symbol: z.string().describe('The stock ticker symbol (e.g., COMI.CA for Commercial International Bank)'),
          }),
          execute: async ({ symbol }): Promise<any> => {
            try {
              const quote: any = await yahooFinance.quote(symbol);
              return {
                symbol,
                price: quote.regularMarketPrice || null,
                currency: quote.currency || null,
                changePercent: quote.regularMarketChangePercent || null,
                longName: quote.longName || null,
                error: null
              };
            } catch (error) {
              return {
                symbol,
                price: null,
                currency: null,
                changePercent: null,
                longName: null,
                error: `Failed to fetch data for ${symbol}`
              };
            }
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate AI response" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
