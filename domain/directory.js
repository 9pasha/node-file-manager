import fs from 'node:fs/promises';
import path from 'node:path';
import {getHomeDirectory} from "./operatingSystem.js";

export const upDirectory = (currentWorkingDirectory) => {
    if (getHomeDirectory() === currentWorkingDirectory) {
        return currentWorkingDirectory;
    }

    const directoryArrayPath = currentWorkingDirectory.split(/[\\]/g);

    return directoryArrayPath.splice(0, (directoryArrayPath.length - 1)).join('\\');
};

export const getListOfDirectoryFiles = async (directory) => {
    const errorMessage = 'FS operation failed';

    try {
        await fs.stat(directory);
    } catch (error) {
        throw new Error(errorMessage);
    }

    return await fs.readdir(directory);
};

export const changeDirectory = async (currentDirectoryPath, newDirectoryPath) => {
    const errorMessage = 'FS operation failed';
    let changedPath = null;

    try {
        changedPath = path.resolve(currentDirectoryPath, newDirectoryPath);

        await fs.stat(changedPath);
    } catch (error) {
        throw new Error(errorMessage);
    }

    return changedPath;
};
