const DICT = {
    RVRE: /^(.*?[аеиоуыэюя])(.*)$/i,
    PERFECTIVEGROUND_1: /((ив|ивши|ившись|ыв|ывши|ывшись)|((?<=[ая])(в|вши|вшись)))$/gi,
    REFLEXIVE: /(с[яь])$/i,
    ADJECTIVE: /(ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею)$/i,
    PARTICIPLE_1: /((ивш|ывш|ующ)|((?<=[ая])(ем|нн|вш|ющ|щ)))$/gi,
    VERB_2: /((ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю)|((?<=[ая])(ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)))$/i,
    NOUN: /(а|ев|ева|ова|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/i,
    DERIVATIONAL: /.*[^аеиоуыэюя]+[аеиоуыэюя].*ость?$/i,
    DER: /ость?$/i,
    SUPERLATIVE: /(ейше|ейш)$/i,
    I: /и$/i,
    P: /ь$/i,
    NN: /нн$/i
};

export function stemmer(word) {
    word = word.replace(/ё/gi, 'e');
    var wParts = word.match(DICT.RVRE);
    if (!wParts) {
        return word;
    }
    var start = wParts[1];
    var rv = wParts[2];
    var temp = rv.replace(DICT.PERFECTIVEGROUND_1, '');
    if (temp == rv) {
        rv = rv.replace(DICT.REFLEXIVE, '');
        temp = rv.replace(DICT.ADJECTIVE, '');
        if (temp != rv) {
            rv = temp;
            rv = rv.replace(DICT.PARTICIPLE_1, '');
            
        } else {
            temp = rv.replace(DICT.VERB_2, '');
            
            if (temp == rv) {
                rv = temp.replace(DICT.NOUN, '');
            } else {
                rv = temp;
            }
        }
    } else {
        rv = temp;
    }
    rv = rv.replace(DICT.I, '');
    if (rv.match(DICT.DERIVATIONAL)) {
        rv = rv.replace(DICT.DER, '');
    }
    temp = rv.replace(DICT.P, '');
    if (temp == rv) {
        rv = rv.replace(DICT.SUPERLATIVE, '');
        rv = rv.replace(DICT.NN, 'н');
    } else {
        rv = temp;
    }
    return start + rv;
}
