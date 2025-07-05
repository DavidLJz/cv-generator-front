import { CVData } from "@/types";

export const importJsonData = async (file: File): Promise<CVData> => {
    if (file.type !== 'application/json') {
        throw new Error('Only JSON allowed');
    }

    const rawData = await file.text()

    return JSON.parse(rawData) as CVData
}