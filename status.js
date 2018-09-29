const init = (files, mode) => {
    if (!files.length) {
        console.log('No files to process.');
    } else {
        const modeHeader = `Starting in ${mode.toUpperCase()} mode`;
        const processHeader = `To be processed (${files.length} file[s]):`;
        const fileList = files.map((x, i) => `${i + 1}. ${x}`).join('\n');
        console.log(`${modeHeader}\n\n${processHeader}\n\n${fileList}`);
    }
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
    finish
};
