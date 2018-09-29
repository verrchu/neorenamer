const init = (files, mode) => {
    if (!files.length) {
        console.log('No files to process.');
    } else {
        const modeHeader = `Starting in ${mode.toUpperCase()} mode`;
        const processHeader = `To be processed (${files.length} file[s]):`;
        const fileList = listFiles(files);
        console.log(`${modeHeader}\n\n${processHeader}\n\n${fileList}\n`);
    }
}

const report = ({ success, failure }) => {
    const successReport = `${success.length} files process successfully`;
    const failureReport = `${failure.length} files failed while processing`;

    const failedHeader = 'Failed files:';

    const failedFileList = listFiles(failure);

    console.log(`\n${successReport}\n${failureReport}\n\n${failedHeader}\n\n${failedFileList}`);
}

const listFiles = (files) => {
    return files.map((x, i) => `${i + 1}. ${x}`).join('\n');
}

const process = (file, cur, max) => {
    console.log(`\nProcessing (${cur}/${max})\n${file}`);
}

const finish = () => {
    console.log(`\nDone.`);
}

module.exports = {
    init,
    process,
    finish,
    report
};
