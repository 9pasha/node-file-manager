import os from 'node:os';

export const OperatingSystemInfo = {
    architecture: '--architecture',
    username: '--username',
    homeDirectory: '--homedir',
    cpuInfo: '--cpus',
    endOfLine: '--EOL'
};

export const osController = (command) => {
    switch (command) {
        case OperatingSystemInfo.architecture:
            console.log(getOSArchitecture());
            break;
        case OperatingSystemInfo.username:
            console.log(getOSUsername());
            break;
        case OperatingSystemInfo.cpuInfo:
            logCpuInfo();
            break;
        case OperatingSystemInfo.endOfLine:
            console.log(getEndOfLine());
            break;
        case OperatingSystemInfo.homeDirectory:
            console.log(getHomeDirectory());
            break;
    }
};

export const logCpuInfo = () => {
    const cpusArray = getCpuOS();

    console.log('Total amount =', cpusArray.length);

    cpusArray.forEach(({ speed }, id) => {
        console.log(`Speed ${id + 1} =`, speed/1000, 'GHz;');
    });
};

export const getOSArchitecture = () => os.arch();

export const getHomeDirectory = () => os.homedir();

export const getEndOfLine = () => {
    const endOfLine = os.EOL;

    return (endOfLine === '\n') ? 'POSIX' : 'Windows';
};

export const getCpuOS = () => os.cpus();

export const getOSUsername = () => os.userInfo().username;
