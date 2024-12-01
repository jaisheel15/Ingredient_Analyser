import {GoogleGenerativeAI} from "@google/generative-ai";
import * as FileSystem from "expo-file-system";

const genAi = new GoogleGenerativeAI('AIzaSyC5j1v6SkxcXCIQqbmrM1P7czyo47PArI0')


const convtob64 = async (uri: string) => {
    try {
        // Read the file as base64
        const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        return null;
    }
}

const analyze = async (uri: string , setLoading , setData) => {
        if(!uri){
            alert('Please select an image')
            return;
        }
        setLoading(true)
        try{
            const base64image = await convtob64(uri)

            const model = genAi.getGenerativeModel({model:'gemini-1.5-flash'})
            
            const prompt = `
            Analyze the health profile of the ingredients in the image.

            Provide a comprehensive report including:

            1. Overall Nutritional Rating (1-10 scale)
            2. Detailed Health Impact:
                - Positive health aspects
                - Potential health concerns
            3. Recommended Daily Consumption:
                - Ideal portion size
                - Frequency of consumption
            4. Ingredient Breakdown:
                - Nutritional value of key ingredients
                - Potential allergens or sensitivities
            5. Dietary Recommendations:
                - Suitable for specific diets (vegan, gluten-free, etc.)
                - Potential dietary restrictions
            `
        const imagePart = {
        inlineData: {
            mimeType: "image/jpeg",
            data: base64image
        }
        };

      // Generate content
        const result = await model.generateContent({
        contents: [{ role: "user", parts: [imagePart, { text: prompt }] }],
        });

      // Get the response
        const response = await result.response; 
        const text = await response.text();

        setData(text);
    } catch (error) {
        console.error('Error analyzing image:', error);
        alert('Failed to analyze image');
    } finally {
        setLoading(false);
    }

}

export default analyze