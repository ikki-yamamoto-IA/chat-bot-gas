// スクリプトプロパティにコードから参照できるようにする
const scriptProperties = PropertiesService.getScriptProperties();

// 実行スプレッドシート名
const SPREADSHEET = getSpreadsheet();

// シート名
// const SHEET_NAME_ORIGINAL = "通知一覧";
const SHEET_NAME_ORIGINAL = "テスト用通知一覧";
const SHEET_NAME_TODAY_TARGET = "本日対応通知一覧";
const SHEET_NAME_WEBHOOK = "webhook一覧";
const SHEET_NAME_USER_ID = "ユーザーID";
const SHEET_NAME_CALENDER = "カレンダー";
const SHEET_NAME_ERROR = "エラーログ";


// シートのタイムゾーンを取得
const SHEET_TIME_ZONE = SPREADSHEET.getSpreadsheetTimeZone();

// データ開始行
const DATA_START_ROW = 2;

// 各項目の配列用対応インデックス(列)
const ITEM_INDEX = {
  "ID": 0,
  "対応方針": 1,
  "優先度": 2,
  "担当部署": 3,
  "記載者": 4,
  "送信者": 5,
  "通知の概要": 6,
  "通知チャンネル": 7,
  "通知タイミング": 8,
  "日にち": 9,
  "曜日": 10,
  "営業日": 11,
  "通知時間": 12,
  "通知内容": 13,
  "補足等": 14,
  "自動通知設定": 15,
  "フィードバック": 16,
  "メンション先": 17,
  "メアド列": 18,
}

// グローバル変数
let bussinessDays = [];

let nextExecRow = 0;

