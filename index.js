import process from 'node:process';
import { osController, getHomeDirectory } from './domain/operatingSystem.js';
import { hashController } from './domain/hash.js';
import { decompressorController } from './domain/decompressor.js';
import { compressorController } from './domain/compressor.js';
import { upDirectory, changeDirectory, getListOfDirectoryFiles } from './domain/directory.js';
import {
    readAndPrintFileContent,
    createFileInDirectory,
    deleteFile,
    renameFile, copyFile, moveFile
} from './domain/files.js';

let username = process.argv[2].split('=')[1];
let currentWorkingDirectory = getHomeDirectory();

const printStartMessage = () => {
    console.log(`Welcome to the File Manager, ${username}!`);
    printMessageOfCurrentDirectory();
};

const OperationTypes = {
    upDirectory: 'up',
    changeDirectory: 'cd',
    listOfDirectoryFiles: 'ls',
    os: 'os',
    hash: 'hash',
    compress: 'compress',
    decompress: 'decompress',
    readAndPrintFileContent: 'cat',
    createFileInCurrentDirectory: 'add',
    deleteFile: 'rm',
    renameFile: 'rn',
    copyFile: 'cp',
    moveFile: 'mv'
};

const cliController = async (message) => {
    message = message.slice(0, message.length - 2);
    message = message.split(' ');

    const operationType = message[0];
    const args = message.splice(1, message.length);

    switch (operationType) {
        case OperationTypes.os:
            osController(args[0]);
            break;
        case OperationTypes.hash:
            await hashController(args[0]);
            break;
        case OperationTypes.decompress:
            await decompressorController(args);
            break;
        case OperationTypes.compress:
            await compressorController(args);
            break;
        case OperationTypes.upDirectory:
            currentWorkingDirectory = await upDirectory(currentWorkingDirectory);
            break;
        case OperationTypes.changeDirectory:
            currentWorkingDirectory = await changeDirectory(currentWorkingDirectory, args[0]);
            break;
        case OperationTypes.listOfDirectoryFiles:
            const directoryFilesList = await getListOfDirectoryFiles(currentWorkingDirectory);
            console.log(directoryFilesList);
            break;
        case OperationTypes.readAndPrintFileContent:
            readAndPrintFileContent(args[0]);
            break;
        case OperationTypes.createFileInCurrentDirectory:
            await createFileInDirectory(currentWorkingDirectory, args[0]);
            break;
        case OperationTypes.deleteFile:
            await deleteFile(args[0]);
            break;
        case OperationTypes.renameFile:
            await renameFile(args[0], args[1]);
            break;
        case OperationTypes.copyFile:
            await copyFile(args[0], args[1]);
            break;
        case OperationTypes.moveFile:
            await moveFile(args[0], args[1]);
            break;
    }

    printMessageOfCurrentDirectory();
};

const printMessageOfCurrentDirectory = () => {
    console.log(`You are currently in ${currentWorkingDirectory}`);
};

const cliMessageListener = () => {
    process.stdin.on('data', (chunk) => {
        cliController(chunk.toString());
    });
};

const invalidCommand = () => {
    console.log('Invalid input');
};

const operationFailed = () => {
    console.log('Operation failed');
};

printStartMessage();

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}!`);

    process.exit();
});

cliMessageListener();
