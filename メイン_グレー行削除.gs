/**
* 対応通知一覧のグレー行(実行済み行)を削除する
*/
function deleteRowsWithBackgroundColor() {
  const sheetName = SHEET_NAME_TODAY_TARGET; // 対象シートの名前
  const sheet = SPREADSHEET.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("対象シートが存在しません。");
    return;
  }

  const range = sheet.getDataRange(); // シートのすべてのデータ範囲を取得
  const bgColors = range.getBackgrounds(); // 背景色を取得
  const numRows = bgColors.length; // 行数を取得

  // 背景色が #d3d3d3 の行を特定して、下から順に削除
  for (let i = numRows - 1; i >= 0; i--) {
    const rowBgColors = bgColors[i]; // 各行の背景色
    const allColumnsGray = rowBgColors.every(color => color === "#d3d3d3"); // 行内のすべてのセルが #d3d3d3 か確認

    if (allColumnsGray) {
      sheet.deleteRow(i + 1); // 行を削除（i+1 は行番号）
    }
  }

  Logger.log("背景色が #d3d3d3 の行を削除しました。");
}
