import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
const romajizeNihongo = async (str) => {
    const k = new Kuroshiro();
    await k.init(new KuromojiAnalyzer());
    console.log(Kuroshiro.Util.hasJapanese(str));
};
export default romajizeNihongo;
