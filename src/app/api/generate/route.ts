import { NextRequest } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: "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",
});

export async function POST(req: NextRequest) {
    const { imagePrompt } = await req.json();

    if (!imagePrompt) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const prompt = `${imagePrompt}`;

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        });

        if (!response.data) {
            throw new Error("Failed to generate image");
        }

        console.log("Generated image: " + JSON.stringify(response, null, 2));
        console.log("Generated image: " + response.data[0].url);
        console.log("b64Json: " + response.data[0].b64_json);
        return new Response(JSON.stringify({ data: response.data}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to generate image due to internal server error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
