const init = (files) => {
    const header = `To be processed (${files.length} file[s]):`;
    const fileList = files.map((x, i) => `${i + 1}. ${x}`).join('\n');
    console.log(`${header}\n\n${fileList}`);
}

const process = (file) => {
    console.log(`\nProcessing\n${file}`);
}

const finish = () => {
    console.log(`\nDone.`);
}

module.exports = {
    init,
    process,
    finish
};
