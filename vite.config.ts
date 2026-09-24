import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';

function getContextualDiagnosticReply(userMsg: string): string {
  const msg = (userMsg || '').toLowerCase();
  if (msg.includes('টিভি') || msg.includes('দাগ') || msg.includes('ডিসপ্লে') || msg.includes('স্ক্রিন') || msg.includes('প্যানেল') || msg.includes('tv') || msg.includes('display')) {
    return `ধন্যবাদ আপনার বার্তার জন্য! আপনার টিভির সমস্যাটি মূলত ডিসপ্লে প্যানেলের COF/TAB রিবন ড্রাইভার আইসির সংযোগ ত্রুটি বা অক্সিডেশনের কারণে হতে পারে। সম্পূর্ণ নতুন ডিসপ্লে না লাগিয়ে আমাদের ল্যাবের জাপানি পালস-হিটিং লেজার বন্ডিং মেশিনে এটি ৯৯% ক্ষেত্রে অরিজিনাল ফ্যাক্টরি কোয়ালিটিতে মেরামত সম্ভব।

• আনুমানিক খরচ: ৳১,৫০০ - ৳৪,৫০০
• ওয়ারেন্টি: ১৮০ দিনের লিখিত গ্যারান্টি
• সময়: মাত্র ২-৪ ঘণ্টা (সেম-ডে ডেলিভারি)

যদি মেরামত সফল না হয়, আমরা কোনো ডায়াগনোসিস ফি গ্রহণ করি না। বিস্তারিত জানতে সরাসরি কল করুন: 01760655650 অথবা সাইটে অনলাইন সার্ভিস বুকিং দিন।`;
  }

  if (msg.includes('ফ্রিজ') || msg.includes('রেফ্রিজারেটর') || msg.includes('এসি') || msg.includes('ঠান্ডা') || msg.includes('গ্যাস') || msg.includes('কম্প্রেসর') || msg.includes('fridge') || msg.includes('ac')) {
    return `ফ্রিজ বা এসিতে ঠান্ডা না হওয়া কিংবা কম্প্রেসর কিছু সময় চলে বন্ধ হয়ে যাওয়ার প্রধান কারণ হতে পারে গ্যাস লিকেজ (R600a/R32/R410a), ইনভার্টার IPM কন্ট্রোলার ফল্ট অথবা ডিফ্রোস্ট সেন্সর ত্রুটি।

• আনুমানিক খরচ: ৳১,২০০ - ৳৩,৫০০ (জেনুইন গ্যাস ও পার্টস সহ)
• আমাদের সুবিধা: সুন্দরগঞ্জ ও গাইবান্ধায় অন-সাইট হোম সার্ভিস ও ল্যাব ব্যাকআপ

সরাসরি কল করতে পারেন: 01760655650 অথবা ওয়েবসাইটে হোম সার্ভিস বুক করুন।`;
  }

  if (msg.includes('ফ্যান') || msg.includes('মোটর') || msg.includes('কয়েল') || msg.includes('ওয়াইন্ডিং') || msg.includes('motor') || msg.includes('fan')) {
    return `মোটর বা ফ্যান গরম হওয়া, শব্দ করা কিংবা গতি কমে যাওয়ার কারণ কয়েল বার্নআউট বা বিয়ারিং জ্যাম। MM ELECTROLAB-এ ১০০% খাঁটি সুপার এনামেল কপার ওয়্যার ও অরিজিনাল NSK/SKF বিয়ারিং দিয়ে নির্ভুল রি-ওয়াইন্ডিং করা হয়।

• সিলিং ফ্যান: ৳৪৫০ - ৳৭৫০
• পানির পাম্প ও সাবমার্সিবল মোটর: ৳১,২০০ - ৳৩,৫০০
• গ্যারান্টি: কয়েল ওয়ারেন্টি সহ

সুন্দরগঞ্জ উপজেলা রোড সিঙ্গার প্লাজা ল্যাবে নিয়ে আসুন বা কল করুন: 01760655650।`;
  }

  return `ধন্যবাদ MM ELECTROLAB (M M Electric & Electronics Servicing Center)-এ যোগাযোগ করার জন্য!
আমরা সুন্দরগঞ্জ উপজেলা রোডের সিঙ্গার প্লাজায় অবস্থিত গাইবান্ধার একমাত্র জাপানি লেজার পালস-হিটিং টিভি ডিসপ্লে বন্ডিং ও ইনভার্টার সার্কিট ল্যাব।

আমাদের প্রধান সেবা ও রেট:
১. এলইডি টিভি ডিসপ্লে সিওএফ বন্ডিং: ৳১,৫০০ - ৳৪,৫০০ (১৮০ দিন ওয়ারেন্টি)
২. ইনভার্টার এসি ও ফ্রিজ সার্ভিসিং: ৳১,২০০ - ৳৩,৫০০
৩. ১০০% খাঁটি তামা মোটর ও ফ্যান রি-ওয়াইন্ডিং: ৳৪৫০ - ৳১,৮০০
৪. ওভেন, ইন্ডাকশন, রাইস কুকার ও আইপিএস মেরামত: ৳৫০০ - ৳২,০০০

*বিশেষ দ্রষ্টব্য: যদি মেরামত সফল না হয়, কোনো ডায়াগনোসিস চার্জ নেওয়া হয় না।
জরুরি প্রয়োজনে সরাসরি হটলাইনে কল করুন: 01760655650, 01955242850।`;
}

function primeAiApiPlugin(): Plugin {
  const systemInstruction = `You are PRIME AI, the concise hardware & electronics technical assistant for "MM ELECTROLAB" (M M Electric & Electronics Servicing Center), Sundarganj, Gaibandha.
Proprietor: Md. Robiul Islam (BTEB Certified Master Technician).
Authorization: SINGER & BEKO Authorized Service Center.
Phone: 01760655650, 01955242850.

Guidelines:
1. STRICTLY Short, Smart & To-the-Point: Avoid long intros or conversational filler. Immediately state the technical cause and estimated cost.
2. Format cleanly with bullet points, numbered lists, bold text (**বোল্ড**), and code tags for models/error codes (e.g. \`E1\`, \`E6\`, \`COF\`, \`R600a\`).
3. Standard Rates & Turnaround:
   - LED TV COF Bonding: ৳১,৫০০ - ৳৪,৫০০ (১৮০ দিন গ্যারান্টি, ২-৪ ঘণ্টা)
   - Inverter Fridge & AC PCB/Gas: ৳১,২০০ - ৳৩,৫০০ (হোম সার্ভিস লভ্য)
   - Fan & Motor Rewinding (100% Copper): ৳৪৫০ - ৳১,৮০০
   - Other Appliances (Oven, IPS): ৳৫০০ - ৳২,০০০
4. Mention "মেরামত না হলে নো ডায়াগনোসিস চার্জ"। End with a 1-sentence prompt to book service or call 01760655650.`;

  return {
    name: 'prime-ai-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');

          let userMessage = '';
          try {
            const data = JSON.parse(body || '{}');
            userMessage = data.message || '';
          } catch {
            userMessage = '';
          }

          const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
          if (!apiKey) {
            res.end(JSON.stringify({ reply: getContextualDiagnosticReply(userMessage) }));
            return;
          }

          try {
            const ai = new GoogleGenAI({ apiKey });
            let generatedText = '';

            // Handle potential 503 high-demand spikes gracefully using model failover
            // Primary model: gemini-3.8-flash; Failover model: gemini-3.1-flash-lite
            const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

            for (const model of candidateModels) {
              try {
                const response = await ai.models.generateContent({
                  model,
                  contents: userMessage || 'হ্যালো, এম এম ইলেকট্রোল্যাবের সার্ভিস সম্পর্কে জানতে চাই',
                  config: { systemInstruction }
                });

                if (response && response.text) {
                  generatedText = response.text;
                  break;
                }
              } catch (modelErr: any) {
                const errString = String(modelErr?.message || modelErr);
                const isOverloadedOr503 =
                  errString.includes('503') ||
                  errString.includes('demand') ||
                  errString.includes('UNAVAILABLE') ||
                  errString.includes('429');

                if (isOverloadedOr503) {
                  // Wait briefly before attempting the next candidate model
                  await new Promise((resolve) => setTimeout(resolve, 350));
                  continue;
                }
                break;
              }
            }

            if (!generatedText) {
              generatedText = getContextualDiagnosticReply(userMessage);
            }

            res.end(JSON.stringify({ reply: generatedText }));
          } catch {
            // Graceful diagnostic fallback on any unexpected exception
            res.end(JSON.stringify({ reply: getContextualDiagnosticReply(userMessage) }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), primeAiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
