import zlib from 'node:zlib';
import fs from 'node:fs';

export const decompressorController = async (command) => {
    await decompress(command[0], command[1]);
};

export const decompress = async (inputFilePath, destinationFilePath) => {
    const gzip = zlib.createUnzip();

    const fsReadStream = fs.createReadStream(inputFilePath);
    const fsWriteStream = fs.createWriteStream(destinationFilePath);

    fsReadStream
        .pipe(gzip)
        .pipe(fsWriteStream);
};