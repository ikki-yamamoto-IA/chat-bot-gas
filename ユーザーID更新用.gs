// // シートにあるメアドからユーザーIDを取得し「ユーザーID」シートに記載する関数
// function updateUserIdSheet() {
//   // email配列を取得
//   const emailList = getAllEmailList();
//   // スプレッドシートを取得
//   const sheet = SPREADSHEET.getSheetByName("ユーザーID");
  
//   if (!sheet) {
//     throw new Error('「ユーザーID」シートが見つかりません。');
//   }
  
//   // シートの既存データをクリア（2行目以降の列A）
//   const lastRow = sheet.getLastRow();
//   if (lastRow > 1) {
//     sheet.getRange(2, 1, lastRow - 1, 2).clearContent();
//   }
  
//   // 配列の各要素を列Aに書き込む
//   const emailValues = emailList.map(email => [email]);
//   const userIdValues = emailList.map(email => [getUserId(email)]);
//   sheet.getRange(2, 1, emailValues.length, 1).setValues(emailValues);
//   sheet.getRange(2, 2, userIdValues.length, 1).setValues(userIdValues);
  
// }

// /**
// * emailアドレスからメンションに必要なユーザーIDを取得する
// */
// function getUserId(email) {
//   const userId = AdminDirectory.Users.get(email);
//   Logger.log('User data:\n %s', JSON.stringify(userId, null, 2));
//   return userId;
// }

// /**
// * シートに存在するメールアドレスを配列で取得する
// */
// function getAllEmailList() {
//   const sourceSheetName = SHEETNAME_ORIGINAL; // コピー先のシート名
//   const sheet = SPREADSHEET.getSheetByName(sourceSheetName);
  
//   // メアド列（19列目）より右のデータ範囲を取得
//   const startRow = DATA_START_ROW; // データ開始行
//   const startColumn = ITEM_INDEX.メアド列 + 1; // メアド列より右の開始列（19列目）
//   const numRows = sheet.getLastRow(); // データがある最終行
//   const numCols = sheet.getLastColumn() - startColumn + 1; // メアド列以降の列数

//   if (numCols <= 0) {
//     Logger.log("メアド列より右に列がありません。");
//     return [];
//   }

//   const dataRange = sheet.getRange(startRow, startColumn, numRows, numCols);
//   const data = dataRange.getValues(); // データを2次元配列で取得

//   // 空でないセルのみを抽出
//   const nonEmptyCells = [];
//   data.forEach(row => {
//     row.forEach(cell => {
//       if (cell !== null && cell !== "") { // 空判定
//         nonEmptyCells.push(cell);
//       }
//     });
//   });

//   Logger.log("空でないセル:");
//   Logger.log(nonEmptyCells);

//   return nonEmptyCells;
// }
