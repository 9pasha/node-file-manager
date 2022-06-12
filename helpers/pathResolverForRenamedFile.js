export const getNewPathForRenamedFile = (oldFilePath, newFileName) => {
    let splitedOldFilePath = oldFilePath.split(/[\\]/g);

    splitedOldFilePath = splitedOldFilePath
        .slice(0, splitedOldFilePath.length - 1)
        .push(newFileName);

    return splitedOldFilePath
        .join('\\');
};
