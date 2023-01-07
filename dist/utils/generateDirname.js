import fs from 'fs-extra';
const checkDuplicates = (dirname, lv) => {
    let path = `./songs/${dirname}`;
    if (lv > 0)
        path = path.concat(`_${lv}`);
    if (!fs.existsSync(path))
        return lv;
    return checkDuplicates(dirname, lv + 1);
};
export const generateDirname = (name, artist) => {
    const modName = name
        .trim()
        .toLowerCase()
        .replace(/[^A-Za-z0-9]+/g, '_');
    const modArtist = artist
        .trim()
        .toLowerCase()
        .replace(/[^A-Za-z0-9]+/g, '_');
    const dirname = `${modArtist}_${modName}`.replace(/^_+/, '').replace(/_+$/, '');
    const duplicates = checkDuplicates(dirname, 0);
    if (duplicates > 0)
        return dirname + `_${duplicates}`;
    return dirname;
};
