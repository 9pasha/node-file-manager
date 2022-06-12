import zlib from 'node:zlib';
import fs from 'node:fs';

export const compressorController = async (command) => {
    await compress(command[0], command[1]);
};

export const compress = async (inputFilePath, destinationFilePath) => {
    const gzip = zlib.createGzip();

    const fsReadStream = fs.createReadStream(inputFilePath);
    const fsWriteStream = fs.createWriteStream(destinationFilePath);

    fsReadStream
        .pipe(gzip)
        .pipe(fsWriteStream);
};
