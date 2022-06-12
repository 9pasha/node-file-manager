import fs from 'node:fs/promises';
import crypto from 'node:crypto';

export const hashController = async (command) => {
    console.log(await calculateHashForFile(command));
};

export const calculateHashForFile = async (filePath) => {
    const fileContent = await fs.readFile(filePath, 'utf8');

    return crypto.createHash('sha256')
        .update(fileContent)
        .digest('hex');
};
