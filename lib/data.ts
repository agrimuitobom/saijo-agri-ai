export type ReportCategory = "実践レポート" | "栽培記録" | "お知らせ" | "質問";
export type AuthorRole = "生徒" | "先生" | "部活動" | "校外";

export type Report = {
  id: number;
  author: string;
  role: AuthorRole;
  category: ReportCategory;
  time: string;
  body: string;
  hasPhoto: boolean;
  likes: number;
  comments: number;
};

export const reports: Report[] = [
  {
    id: 1,
    author: "野菜班(2年)",
    role: "生徒",
    category: "実践レポート",
    time: "今日 10:24",
    body: "ラズパイの土壌水分センサーをトマトハウス3号に設置して1週間。データを見ながら潅水したら、水の量を約2割減らせました!センサーの作り方は「つくる」ページで公開しています。",
    hasPhoto: true,
    likes: 128,
    comments: 14,
  },
  {
    id: 2,
    author: "スマート農業研究部",
    role: "部活動",
    category: "お知らせ",
    time: "昨日",
    body: "【お知らせ】11月の西農祭で「スマート農業体験コーナー」を開きます。ラズパイセンサーの工作体験や、ハウス遠隔監視のデモを予定。地域の農家さん・小中学生も大歓迎です!",
    hasPhoto: false,
    likes: 96,
    comments: 8,
  },
  {
    id: 3,
    author: "岐阜県・農業高校2年",
    role: "校外",
    category: "質問",
    time: "2日前",
    body: "土壌水分センサーの教材を見て作ってみたのですが、値が0〜1023のまま変化しません。MCP3008の配線で気をつけるポイントはありますか?本校でも導入を検討しています。",
    hasPhoto: false,
    likes: 22,
    comments: 11,
  },
  {
    id: 4,
    author: "果樹班(3年)",
    role: "生徒",
    category: "栽培記録",
    time: "3日前",
    body: "温州ミカンの園地に温湿度ロガーを設置しました。今年は糖度と気温データの関係を1年かけて記録します。データは毎月このプラットフォームで公開予定です。",
    hasPhoto: true,
    likes: 74,
    comments: 6,
  },
  {
    id: 5,
    author: "農業科・山田先生",
    role: "先生",
    category: "お知らせ",
    time: "4日前",
    body: "AI病害虫診断アプリ「西農PLANTDOC」の使い方動画を公開しました。作物の写真を撮るだけでAIが診断の参考情報を返します。授業でも活用中です。",
    hasPhoto: false,
    likes: 88,
    comments: 5,
  },
];

export type SensorStatus = "適正" | "注意";

export type SensorReading = {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: SensorStatus;
  note: string;
};

/** トマトハウス3号のラズパイセンサー(モック値) */
export const sensorReadings: SensorReading[] = [
  { id: "temp", label: "気温", value: "28.4", unit: "°C", status: "適正", note: "換気中" },
  { id: "humidity", label: "湿度", value: "64", unit: "%", status: "適正", note: "結露なし" },
  { id: "soil", label: "土壌水分", value: "37", unit: "%", status: "注意", note: "やや乾燥" },
  { id: "co2", label: "CO₂", value: "410", unit: "ppm", status: "適正", note: "外気並み" },
];

export type TutorialLevel = "かんたん" | "ふつう" | "チャレンジ";

export type Tutorial = {
  id: string;
  title: string;
  summary: string;
  level: TutorialLevel;
  timeRequired: string;
  cost: string;
  tags: string[];
  parts: { name: string; qty: string; price: string }[];
  steps: { title: string; body: string }[];
  code?: { filename: string; content: string };
  cautions: string[];
};

export const tutorials: Tutorial[] = [
  {
    id: "soil-moisture-sensor",
    title: "ラズパイで土壌水分センサーをつくる",
    summary:
      "静電容量式センサーとRaspberry Piで、畑やハウスの土の乾き具合を数値で見える化。西農のトマトハウスで実際に使っている構成です。",
    level: "かんたん",
    timeRequired: "約90分",
    cost: "約4,000円",
    tags: ["Raspberry Pi", "Python", "潅水管理"],
    parts: [
      { name: "Raspberry Pi Zero 2 W", qty: "1台", price: "約2,400円" },
      { name: "静電容量式土壌水分センサー", qty: "1本", price: "約500円" },
      { name: "MCP3008(ADコンバーター)", qty: "1個", price: "約400円" },
      { name: "ブレッドボード・ジャンパー線", qty: "1式", price: "約700円" },
    ],
    steps: [
      {
        title: "ラズパイの準備",
        body: "Raspberry Pi OS Lite を microSD に書き込み、SSH と SPI を有効にします。学校の Wi-Fi に接続できることを確認しましょう。",
      },
      {
        title: "配線する",
        body: "MCP3008 をブレッドボードに挿し、電源(3.3V)・GND・SPI の4本をラズパイへ、センサーの信号線を CH0 へつなぎます。電源を入れる前に配線を2回見直すこと!",
      },
      {
        title: "プログラムを動かす",
        body: "下のサンプルコードを保存して実行すると、1分ごとに土壌水分(%)が表示されます。乾いた土と水に浸けた状態の値を測って、自分の畑用に調整しましょう。",
      },
      {
        title: "畑に設置する",
        body: "センサーの基板部分は防水が必須。タッパーと自己融着テープで保護し、株元から10cmほど離して差し込みます。",
      },
    ],
    code: {
      filename: "soil_moisture.py",
      content: `# 土壌水分センサーの値を1分ごとに表示する
import time
import spidev

spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 1_350_000

def read_ch0():
    adc = spi.xfer2([1, 128, 0])        # MCP3008 の CH0 を読む
    return ((adc[1] & 3) << 8) | adc[2]  # 0〜1023

DRY = 850   # 乾いた土での実測値(要調整)
WET = 400   # 水に浸けたときの実測値(要調整)

while True:
    raw = read_ch0()
    percent = round((DRY - raw) / (DRY - WET) * 100)
    percent = max(0, min(100, percent))
    print(f"土壌水分: {percent}% (raw={raw})")
    time.sleep(60)`,
    },
    cautions: [
      "配線はかならず電源を切った状態で行うこと。",
      "屋外設置時は基板の防水を徹底する(故障原因の第1位です)。",
      "安価なセンサーは個体差が大きいので、DRY/WET の値は必ず自分で実測して調整する。",
    ],
  },
  {
    id: "dht22-monitor",
    title: "DHT22でハウスの温湿度モニター",
    summary:
      "定番の温湿度センサーDHT22で、ハウス内の環境をスマホから確認。はんだ付け不要で、初めてのラズパイ工作にぴったりです。",
    level: "かんたん",
    timeRequired: "約60分",
    cost: "約3,500円",
    tags: ["Raspberry Pi", "温湿度", "入門"],
    parts: [
      { name: "Raspberry Pi Zero 2 W", qty: "1台", price: "約2,400円" },
      { name: "DHT22 温湿度センサー", qty: "1個", price: "約800円" },
      { name: "ジャンパー線(メス-メス)", qty: "3本", price: "約300円" },
    ],
    steps: [
      { title: "配線する", body: "DHT22 の VCC・GND・DATA をラズパイの 3.3V・GND・GPIO4 に接続します。3本だけなのでブレッドボードも不要です。" },
      { title: "ライブラリを入れる", body: "adafruit-circuitpython-dht をインストールし、サンプルを動かして温度・湿度が読めることを確認します。" },
      { title: "記録して公開する", body: "測定値をCSVに追記するようにして、cron で自動実行。西農ではこのデータをダッシュボードに表示しています。" },
    ],
    cautions: ["直射日光が当たると気温が正しく測れません。通風筒(自作でOK)の中に設置しましょう。"],
  },
  {
    id: "auto-watering",
    title: "自動潅水システムに挑戦",
    summary:
      "土壌水分センサーの値に応じて電磁弁を開閉し、自動で水やり。リレー制御と安全設計を学べる、西農スマート農業の集大成教材です。",
    level: "チャレンジ",
    timeRequired: "半日〜1日",
    cost: "約12,000円",
    tags: ["Raspberry Pi", "リレー制御", "潅水"],
    parts: [
      { name: "Raspberry Pi 4", qty: "1台", price: "約8,000円" },
      { name: "リレーモジュール", qty: "1個", price: "約600円" },
      { name: "電磁弁(DC12V)", qty: "1個", price: "約2,500円" },
      { name: "土壌水分センサー一式", qty: "1式", price: "約900円" },
    ],
    steps: [
      { title: "センサー部を組む", body: "「土壌水分センサーをつくる」教材の構成をそのまま使います。まずはそちらを完成させてください。" },
      { title: "リレーと電磁弁をつなぐ", body: "GPIO からリレーを介して電磁弁を制御します。AC100Vは扱わず、必ずDC12Vの電磁弁を使うこと。" },
      { title: "制御ロジックを書く", body: "「水分30%未満が10分続いたら3分間だけ開く」のように、開きっぱなしを防ぐ安全条件を必ず入れます。" },
      { title: "フェイルセーフを確認", body: "ラズパイがフリーズしても弁が閉じることを確認してから、実際の畑に導入します。" },
    ],
    cautions: [
      "電磁弁は必ずDC(直流)電源のものを使用。AC100Vの配線は行わないでください。",
      "無人運転の前に、タイマーによる最大開時間の制限を必ず実装すること。",
    ],
  },
  {
    id: "remote-camera",
    title: "ハウス遠隔監視カメラ",
    summary:
      "ラズパイカメラで、家からスマホでハウスの様子を確認。夜間の見回り負担を減らします。生育記録の定点撮影にも使えます。",
    level: "ふつう",
    timeRequired: "約2時間",
    cost: "約6,000円",
    tags: ["Raspberry Pi", "カメラ", "遠隔監視"],
    parts: [
      { name: "Raspberry Pi Zero 2 W", qty: "1台", price: "約2,400円" },
      { name: "カメラモジュール", qty: "1個", price: "約2,800円" },
      { name: "防水ケース", qty: "1個", price: "約800円" },
    ],
    steps: [
      { title: "カメラを接続する", body: "カメラモジュールをリボンケーブルで接続し、テスト撮影して向きを調整します。" },
      { title: "定点撮影を設定する", body: "cron で1時間ごとに撮影し、日付入りファイル名で保存します。" },
      { title: "スマホから見られるようにする", body: "撮影画像を共有フォルダやチャットに自動送信します。校内ネットワークの利用ルールは先生に確認しましょう。" },
    ],
    cautions: ["カメラの設置場所や画像の共有範囲は、写り込みに配慮して必ず先生と相談してから決めること。"],
  },
];
