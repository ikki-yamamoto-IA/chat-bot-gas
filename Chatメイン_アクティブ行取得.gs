// 「登録中通知一覧」シートの未実行の行を取得する関数
function getActiveRowData() {
  const sourceSheetName = SHEET_NAME_TODAY_TARGET; // コピー先のシート名
  const sheet = SPREADSHEET.getSheetByName(sourceSheetName);


  // シート全体の範囲を取得
  const range = sheet.getDataRange();

  // データと背景色を取得
  const data = range.getValues();            // 全データ
  const backgrounds = range.getBackgrounds(); // 全セルの背景色

  for (let i = 0; i < data.length; i++) {
    // 行の背景色がすべて灰色 (#d3d3d3) ではないかチェック
    const isGray = backgrounds[i].every(color => color === '#d3d3d3');

    if (!isGray) {
      const rowNumber = i + 1; // スプレッドシートの行番号は1始まり

      // 該当行をグレーアウト
      const rowRange = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn());
      rowRange.setBackground('#d3d3d3'); // 灰色

      Logger.log(`通知ID: ${data[i][ITEM_INDEX.ID]} をグレーアウトしました。`);
      nextExecRow = rowNumber;
      return data[i]; // 処理終了
    }
  }

  Logger.log('全ての行が既にグレーアウトされています。');
}
