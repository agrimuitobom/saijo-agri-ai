export type Category = "ノウハウ" | "病害虫" | "質問" | "市況";

export type Post = {
  id: number;
  author: string;
  region: string;
  crop: string;
  category: Category;
  time: string;
  body: string;
  hasPhoto: boolean;
  likes: number;
  comments: number;
};

export const posts: Post[] = [
  {
    id: 1,
    author: "田中 健一",
    region: "西条市",
    crop: "トマト",
    category: "病害虫",
    time: "15分前",
    body: "ハウスのトマトに葉かび病らしき斑点が出始めました。写真を載せます。今週の雨続きで湿度が上がったのが原因かもしれません。皆さんの圃場は大丈夫ですか?換気を強めにして様子を見ています。",
    hasPhoto: true,
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    author: "佐藤 みどり",
    region: "今治市",
    crop: "キュウリ",
    category: "ノウハウ",
    time: "1時間前",
    body: "キュウリの誘引は朝イチではなく午後にやると茎が折れにくいです。午前中は水分でパリパリなので…。父から教わったコツですが、折損がほぼゼロになりました。",
    hasPhoto: false,
    likes: 34,
    comments: 8,
  },
  {
    id: 3,
    author: "山本 一郎",
    region: "新居浜市",
    crop: "水稲",
    category: "質問",
    time: "3時間前",
    body: "中干しのタイミングについて質問です。今年は梅雨明けが早そうですが、例年どおり7月中旬でいいでしょうか?茎数はだいたい目標に達しています。",
    hasPhoto: false,
    likes: 6,
    comments: 11,
  },
  {
    id: 4,
    author: "JA周桑 営農課",
    region: "西条市",
    crop: "全般",
    category: "市況",
    time: "5時間前",
    body: "【週間市況】ナスは県外出荷が好調で前週比+8%。トマトは全国的に出回りが増え弱含み。キュウリは横ばいです。詳細は市況ページをご覧ください。",
    hasPhoto: false,
    likes: 21,
    comments: 2,
  },
  {
    id: 5,
    author: "近藤 早苗",
    region: "西条市",
    crop: "イチゴ",
    category: "ノウハウ",
    time: "昨日",
    body: "育苗中のイチゴのランナー切り、ハサミをこまめにアルコール消毒するだけで炭疽病の広がりが全然違います。面倒でもポットごとに拭くのがおすすめ。",
    hasPhoto: true,
    likes: 45,
    comments: 13,
  },
];

export const marketPrices = [
  { crop: "トマト", unit: "kg", price: 412, diff: -3.2 },
  { crop: "キュウリ", unit: "kg", price: 358, diff: 0.4 },
  { crop: "ナス", unit: "kg", price: 486, diff: 8.1 },
  { crop: "ピーマン", unit: "kg", price: 521, diff: 2.6 },
];

export const hourlyWeather = [
  { time: "9時", icon: "sun", temp: 26 },
  { time: "12時", icon: "sun", temp: 30 },
  { time: "15時", icon: "cloud", temp: 31 },
  { time: "18時", icon: "cloud", temp: 28 },
];
