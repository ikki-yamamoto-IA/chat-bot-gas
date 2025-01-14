/**
* 引数で受け取った行のメアド列以降のデータを配列にして返す
*/
function getEmailList(rowData) {
// メアド列のインデックス
  const startColumn = ITEM_INDEX.メアド列; 
  // メアド列以降のデータを取得
  const emailData = rowData.slice(startColumn);

  Logger.log("取得したデータ範囲:");
  Logger.log(emailData);

  // 空でないセルのみを抽出
  const nonEmptyCells = emailData.filter(cell => cell !== null && cell !== "");

  Logger.log("空でないセル:");
  Logger.log(nonEmptyCells);

  return nonEmptyCells;
}
