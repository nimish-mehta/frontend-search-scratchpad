var lunr = require('lunr');
// TinySegmenter = require('./node_modules/lunr-languages/tinyseg');
require('./node_modules/lunr-languages/lunr.stemmer.support')(lunr);
require('./node_modules/lunr-languages/lunr.jp')(lunr);

// This seems to be effectively limiting us to using one index per type of
// document
var idx = lunr(function() {
  this.use(lunr.jp);
  this.field('title', { boost: 10 });
  this.field('body');
  // Can Ignore keys and only index the required data.
  // Automatically deduces the ref
  // this.ref('id')
  // Document with same ref overwrites the previous version
  // Keys of different types seems to hang up the search process
});


// tokenization does not work here properly
var docs = [];
docs[0] = "蛶觢 岋巠帎 犌犐瑆 焟硱筎 潫 榓甂睮 轞騹鼚 駽髾 斠, 膣 摴撦 蔰蝯蝺 磩磟窱, 坽姎 溹溦滜 嬔嬚嬞 腠 儇 廑憀慡 鷃黫鼱 淠淉, 脀蚅 僣 痵痽筩 浶洯浽, 滍溾滘 瞵瞷矰 鱐鱍鱕 蒛 笢笣 鎛鎈 眊砎粁 忷扴汥 嗂, 撱 郙鬯 譖貚趪 喥喓堮 硻禂稢";

docs[1] = "蓏蒠 幋 鶟儹巏 刲匊呥 擙樲橚, 惝掭掝 嬔嬚嬞 嫷 蚙迻 禠 聧蔩 痵痽筩 鷕黰戄 畟痄笊, 刲匊呥 摬摙敳 蝪蝩覤 闒雗 摲, 詏貁 暲 槏殟殠 瞵瞷矰 濆澓澋 雥齆犪 絼 垼娕 輗 鸃鼞欘 汫汭沎 鍖鍹, 嵷幓 撖 槏殟殠 燚璒瘭, 躆轖轕 鞂駇僾 饡驦 劁 塝 欘臡 逯郹酟 蝑蝞蝢 緦 蜭蜸 鱙鷭黂 嶭嶴憝 垽娭屔, 憉 奿尕 岋巠帎 駍駔鳿 氃濈瀄 蛶觢";

docs[2] = "蕡蕇蕱 嗼嗹墋 蝢褗 褅, 漻漍犕 纑臞蘬 蕧螛 鳱 儇 鯦鯢鯡 濍燂犝 郰傃, 蠸衋醾 樏殣氀 蔊蓴蔖 緳 釂鱞, 訰貥郪 媶媐尳 觾韄鷡 寁崏 磑 暩樆 槶 鶭黮齥 鬋鯫鯚 酳 敔耜 輐銛靾 嶕憱撏, 暕 孻憵懥 儮嬼懫 鼥儴壛 頏飹, 湴涬 歾炂盵 鷃黫鼱 獫瘯皻 槶 鳭 滱漮 撖撱暲 貵趀跅, 酳 圛嬖 墐墆墏 鋱鋟鋈, 蜙 媔媝 馯骭僪 摨敹暯 毄滱漮";

docs[3] = "橀槶澉 薝薢蟌 踸躽輷 馺 吙仜, 濈瀄 廦廥彋 濆澓澋 珝砯砨 鋱 揳揓 滆 垥娀庣 瘑睯碫 翀胲胵, 鈊釿閍 輣鋄銶 羭聧蔩 觢 貆賌 螏螉褩 揯揳揓 榬榼榳 腏舿 毹, 釢髟偛 踥踕踛 鼀齕櫌 蓔蜳 撱 滆 嶭嶴憝 蹸蹪鏂 焟硱筎 鶆鵵 膣 紽翍 櫞氌瀙 鈖嗋圔 樧槧樈, 撖 廦廥彋 蒰裧頖 馻噈嫶 鶾鷃, 蛃袚觙 骹麇嚍 蒮 噦噞 踆跾踄 顲鱭鸋 魆 榳榓, 覮轀 壿 剆坲姏 珝砯砨";

docs[4] = "毹 艭蠸 駽髾髽 莔莋莥 藡覶譒, 脬舑莕 溗煂獂 跬 覿讄 硻禂稢 腷腯葹 氃濈瀄 梪涫 馺, 痯 鴙儤嬯 谾踘遳 郔镺陯 鏀顝 煔 潿熥獘 鍎鞚韕 蘠蠝, 蝺 郰傃 薝薢蟌 釸釪傛 鶷鷇鶾 鵳齖齘 鸙讟钃 靰僄 蝯, 撱 鵁麍儱 鶷鷇鶾 艎艑蔉 馻噈 杍肜阰 烍烚珜 蔪蓩蔮 浧浵 慛, 翬膞 燲獯璯 螾褾賹 毊灚襳 漊";

docs[5] = "笊罞 蜙 磝磢磭 玾珆玸 晛桼桾 嘕 殠漊 廦廥彋 焟硱筎 鯫鯚 嗢嗂塝 銌鞁鬿 澉, 籺籿 愄揎揇 梴棆棎 痽 蔍 誙賗跿 訬軗郲 狅妵妶 笓粊";

docs.map((doc, i) => {
  console.log("Adding ", doc);
  idx.add({
    title: `Doc${i}`,
    body: doc,
    id: i
  });
});

console.log(idx);

console.log("Searching for 湴");
// var searchResults = idx.search('food');
// console.log(searchResults);

console.log(idx.search('湴'));
console.log(idx.search('鋱'));
console.log(idx.search("蛶觢"));
console.log(idx.search("笊罞"));
