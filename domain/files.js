import fs from 'node:fs/promises';
import process from 'node:process';
import path from 'node:path';
import { getNewPathForRenamedFile } from '../helpers/pathResolverForRenamedFile.js';

export const readAndPrintFileContent = (filePath) => {
    const readableStream = fs.createReadStream(filePath);

    readableStream.on('data', (data) => {
        process.stdout.write(data.toString());
    });
};

export const createFileInDirectory = async (directory, fileName) => {
    const errorMessage = 'FS operation failed';
    const filePath = path.join(directory, fileName);

    let fileStat = null;

    try {
        fileStat = await fs.stat(filePath);

        if (fileStat)
            throw new Error(errorMessage);
    } catch (error) {
        if (error && fileStat) {
            throw new Error(errorMessage);
        } else {
            await fs.appendFile(filePath, '');
        }
    }
};

export const deleteFile = async (filePath) => {
    const errorMessage = 'FS operation failed';

    try {
        await fs.stat(filePath);
    } catch (error) {
        throw new Error(errorMessage);
    }

    await fs.rm(filePath);
};

export const renameFile = async (filePath, newName) => {
    const oldFilePath = filePath;
    const newFilePath = getNewPathForRenamedFile(filePath, newName);

    const errorMessage = 'FS operation failed';

    let oldFileStat = null;
    let newFileStat = null;

    try {
        oldFileStat = await fs.stat(oldFilePath);

        try {
            newFileStat = await fs.stat(newFilePath);
        } catch (error) {
            await fs.rename(oldFilePath, newFilePath);
        }
    } catch (error) {
        throw new Error(errorMessage);
    }

    if (newFileStat) {
        throw new Error(errorMessage);
    }
};

export const copyFile = async (oldFilePath, newFilePath) => {
    const cloneFolder = async (oldFilePath, newFilePath) => {
        await fs.mkdir(newFilePath);

        const files = await fs.readdir(oldFilePath);

        for (const file of files) {
            const filePath = path.join(oldFilePath, file);
            const newFilePath = path.join(newFilePath, file);

            await fs.copyFile(filePath, newFilePath);
        }
    };

    let folderWithFilesStat = null;
    let copyFolderWithFilesStat = null;

    try {
        folderWithFilesStat = await fs.stat(oldFilePath);

        try {
            copyFolderWithFilesStat = await fs.stat(newFilePath);
        } catch (error) {
            await cloneFolder(oldFilePath, newFilePath);
        }

        if (folderWithFilesStat && copyFolderWithFilesStat) {
            await cloneFolder(oldFilePath, newFilePath);
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

export const moveFile = async () => {

};
