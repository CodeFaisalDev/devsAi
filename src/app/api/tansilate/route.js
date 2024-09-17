import { NextResponse } from "next/server";
import fetch from "node-fetch";
// const configuration = new Configuration({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// })

// const openai = new OpenAI({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//     organization: "org-NltN395oeFEdbHyykyPfpy7b",
//     project: "proj_yzDLT31XPuAjdAnOkhACwu4k"
// });

// const transilateCode = async(code, sourceLang, targetLang) => {
//     try {
//         const prompt = `Translate the following code from ${sourceLang} to ${targetLang}:\n\n${code}`;

//         const response = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo',
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0.2,
//             maxTokens: 500,
//         });

//         const transilatedCode = response.data.choices[0].text.trim()

//         return transilatedCode;
//     } catch (error) {
//         console.error('Error translating code:', error);
//     throw new Error('Code translation failed.');
//     }
// }

// const HUGGINGFACE_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY
// const HUGGINGFACE_MODEL = "google/mt5-base";

// const transilateCode = async (code, sourceLang, targetLang) => {
//     try {
//       const prompt = `Translate the following code from ${sourceLang} to ${targetLang}:\n\n${code}`;
//       const response = await fetch(`https://api-inference.huggingface.co/models/facebook/mbart-large-50`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ inputs: prompt }),
//       });
  
//       const data = await response.json();
  
//       if (data.error && data.error.includes("currently loading")) {
       
//         const estimatedTime = data.estimated_time * 1000; 
//         console.log(`Model is loading. Retrying in ${data.estimated_time} seconds...`);
//         await new Promise((resolve) => setTimeout(resolve, estimatedTime));
//         return await transilateCode(code, sourceLang, targetLang);
//       }
  
//       const translatedCode = data[0]?.generated_text?.trim() || "Translation failed.";
//       return translatedCode;
//     } catch (error) {
//       console.error('Error translating code:', error);
//       throw new Error('Code translation failed.');
//     }
//   };


// export async function POST(req){
//     try {
//         const body = await req.json();

//         const { sourceLanguage, targetLanguage, code } = body

//         if(!sourceLanguage || !targetLanguage || !code){
//             return new NextResponse("[ERROR_INVALID_REQUEST]", {status: 400});
//         }

//         const transilatedCode = await translateCode(code, sourceLanguage, targetLanguage)

//         console.log(transilatedCode);
        
//         return NextResponse.json({ transilatedCode })

//     } catch (error) {
//         return new NextResponse("[ERROR_API_ROUTE]", {status: 500});
//     }
// }




const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, 
});

// Working Code
// const transilateCode = async (code, sourceLang, targetLang) => {
//   try {
//     const prompt = `Translate the following code from ${sourceLang} to ${targetLang}:\n\n${code}`;

//     const response = await cohere.chat({
//       message: prompt,
//     });

//     if (!response.text || response.text.length === 0) {
//       throw new Error('No translation returned from the model.');
//     }

//     console.log(response.text);
    

//     const translatedCode = response.text.trim();
//     return translatedCode;
//   } catch (error) {
//     console.error('Error translating code with Cohere:', error);
//     throw new Error('Code translation failed.');
//   }
// };

const info = "```javascript```";

// const transilateCode = async (code, sourceLang, targetLang) => {
//     try {
//       const prompt = `Translate the following code from ${sourceLang} to ${targetLang}:\n\n${code} only and only tansilate the code I don't need any extra information or name or anything before or after the code`;
  
//       const response = await cohere.chat({
//         message: prompt,
//       });
  
//       // Log the response to ensure it's correct
//       console.log('Full response:', response);
  
//       // Extract the translated code directly from `response.text`
//       const translatedCode = response.text?.trim();
  
//       if (!translatedCode) {
//         throw new Error('No translation returned from the model.');
//       }
  
//       return translatedCode;
//     } catch (error) {
//       console.error('Error translating code with Cohere:', error);
//       throw new Error('Code translation failed.');
//     }
//   };
  
const transilateCode = async (code, sourceLang, targetLang) => {
  try {
    const prompt = `Translate the following code from ${sourceLang} to ${targetLang}:\n\n${code}\n\nI only need the translated code. Do not include any extra information like "Here is the code" or the language name. Just output the code.`;

    const response = await cohere.chat({
      message: prompt,
    });

    // Log the full response for debugging purposes
    console.log('Full response:', response);

    // Extract and clean up the translated code
    let translatedCode = response.text?.trim();

    // Remove code block markers (e.g., ```swift```)
    if (translatedCode.startsWith('```')) {
      translatedCode = translatedCode.replace(/```[\w]*\n?/g, '').trim();
    }

    if (!translatedCode) {
      throw new Error('No translation returned from the model.');
    }

    return translatedCode;
  } catch (error) {
    console.error('Error translating code with Cohere:', error);
    throw new Error('Code translation failed.');
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { sourceLanguage, targetLanguage, code } = body;

    if (!sourceLanguage || !targetLanguage || !code) {
      return new NextResponse('[ERROR_INVALID_REQUEST]', { status: 400 });
    }

    const translatedCode = await transilateCode(code, sourceLanguage, targetLanguage);
    return NextResponse.json({ translatedCode });
  } catch (error) {
    return new NextResponse('[ERROR_API_ROUTE]', { status: 500 });
  }
}
