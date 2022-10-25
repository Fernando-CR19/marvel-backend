import fs from "fs";
import path from "path";

//ler no DB
export const readDBAsync = async () => {
    const file = await fs.promises.readFile(
        path.resolve(process.cwd(), "src/db/db.json"),
        "utf-8"
    );
    return JSON.parse(file);
}

 //escrever no DB
export const writeDBAsync = async (data = {}) => {
    await fs.promises.writeFile(
        path.resolve(process.cwd(), "src/db/db.json"),
        JSON.stringify(data),
        "utf-8"
    );
}