import { Router } from 'express';
import lodash from 'lodash';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import { Low, JSONFile } from 'lowdb';
import { generateDirname } from '../utils/generateDirname.js';
const adapter = new JSONFile('./db.json');
class LowWithLodash extends Low {
    c = lodash.chain(this).get('data');
}
const db = new LowWithLodash(adapter);
const router = Router();
const jsonParser = bodyParser.json();
/* GET home page. */
router.get('/', (req, res) => {
    res.json({ ok: true });
});
router.post('/addSong', jsonParser, async (req, res) => {
    try {
        await db.read();
        db.data ||= { songs: [] };
        const { name, artist, album, duration, romajiName, romajiArtist, romajiAlbum } = req.body;
        db.data.songs.push({
            id: db.data.songs.length ? db.data.songs[db.data.songs.length - 1].id + 1 : 1,
            name: name,
            artist: artist,
            album: album,
            dirname: generateDirname(romajiName || name, romajiArtist || artist),
            romajiName: romajiName || name,
            romajiArtist: romajiArtist || artist,
            romajiAlbum: romajiAlbum || album,
            duration: duration,
            previewStart: 0,
        });
        db.write();
        res.json(db.data.songs);
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.post('/testGenDirname', jsonParser, async (req, res) => {
    try {
        await db.read();
        db.data ||= { songs: [] };
        const { name, artist, album, dirname, duration } = req.body;
        const val = generateDirname(name, artist);
        res.json({ value: val });
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.delete('/removeSong/:songId', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs && db.data.songs.length) {
            db.data.songs = db.data.songs.filter((song) => song.id !== parseInt(req.params.songId));
            db.write();
            res.json(db.data.songs);
        }
        else
            res.json({ ok: false });
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
// router.post('/updateSongsRomaji', async (req: Request, res: Response) => {
//   try {
//     await db.read();
//     if (db.data && db.data.songs && db.data.songs.length) {
//       db.data.songs = db.data.songs.map((song) => {
//         const newSong = song;
//         if (!song.romajiName) newSong.romajiName = song.name;
//         if (!song.romajiArtist) newSong.romajiArtist = song.artist;
//         if (!song.romajiAlbum) newSong.romajiAlbum = song.album;
//         return newSong;
//       });
//     }
//     db.write();
//   } catch (error) {
//     console.error(error);
//     res.json({ ok: false });
//   }
// });
router.get('/getSong/:songId', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs && db.data.songs.length) {
            const foundSong = db.data.songs.find((song) => song.id === parseInt(req.params.songId));
            if (!foundSong)
                throw new Error('Song not found');
            res.json(foundSong);
        }
        else
            throw new Error('Database not defined');
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/getTrack/:songId', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs && db.data.songs.length) {
            const foundSong = db.data.songs.find((song) => song.id === parseInt(req.params.songId));
            if (!foundSong)
                throw new Error('Song not found');
            const filePath = `./songs/${foundSong.dirname}/song.ogg`;
            if (!fs.existsSync(filePath))
                throw new Error('File not found');
            res.download(filePath, 'track.ogg');
        }
        else
            throw new Error('Database not defined');
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/getKaraokeTrack/:songId', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs && db.data.songs.length) {
            const foundSong = db.data.songs.find((song) => song.id === parseInt(req.params.songId));
            if (!foundSong)
                throw new Error('Song not found');
            const filePath = `./songs/${foundSong.dirname}/karaoke.ogg`;
            if (!fs.existsSync(filePath))
                throw new Error('File not found');
            res.download(filePath, 'track.ogg');
        }
        else
            throw new Error('Database not defined');
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/getCoverImage/:songId', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs && db.data.songs.length) {
            const foundSong = db.data.songs.find((song) => song.id === parseInt(req.params.songId));
            if (!foundSong)
                throw new Error('Song not found');
            const filePath = `./songs/${foundSong.dirname}/cover.jpg`;
            if (!fs.existsSync(filePath))
                throw new Error('File not found');
            res.download(filePath, 'cover.jpg');
        }
        else
            throw new Error('Database not defined');
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/getVideo/:songId', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs && db.data.songs.length) {
            const foundSong = db.data.songs.find((song) => song.id === parseInt(req.params.songId));
            if (!foundSong)
                throw new Error('Song not found');
            const filePath = `./songs/${foundSong.dirname}/video.webm`;
            if (!fs.existsSync(filePath))
                throw new Error('File not found');
            res.download(filePath, 'video.webm');
        }
        else
            throw new Error('Database not defined');
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/getSongData/:songId', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs && db.data.songs.length) {
            const foundSong = db.data.songs.find((song) => song.id === parseInt(req.params.songId));
            if (!foundSong)
                throw new Error('Song not found');
            const filePath = `./songs/${foundSong.dirname}/data.json`;
            if (!fs.existsSync(filePath))
                throw new Error('File not found');
            const rawData = fs.readFileSync(filePath);
            const jsonData = JSON.parse(rawData);
            res.json(jsonData);
        }
        else
            throw new Error('Database not defined');
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/listSongs', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs)
            res.json(db.c.get('songs').sortBy([(e) => e.name.toLowerCase(), (e) => e.artist.toLowerCase()]));
        else
            res.json({ ok: false });
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/listSongsByRomaji', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs)
            res.json(db.c.get('songs').sortBy([(e) => e.romajiName.toLowerCase(), (e) => e.romajiArtist.toLowerCase()]));
        else
            res.json({ ok: false });
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
router.get('/listSongsUnsorted', async (req, res) => {
    try {
        await db.read();
        if (db.data && db.data.songs)
            res.json(db.data.songs);
        else
            res.json({ ok: false });
    }
    catch (error) {
        console.log(error);
        res.json({ ok: false });
    }
});
// module.exports = app;
export default router;
