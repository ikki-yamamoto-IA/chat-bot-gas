// 通知一覧から当日通知する行のみ別のシートへコピーする関数
function copyMatchingRows() {
  const sourceSheetName = SHEET_NAME_ORIGINAL; // コピー元のシート名
  const targetSheetName = SHEET_NAME_TODAY_TARGET; // コピー先のシート名

  const sourceSheet = SPREADSHEET.getSheetByName(sourceSheetName);
  let targetSheet = SPREADSHEET.getSheetByName(targetSheetName);

  // コピー元シートのデータを取得
  const sourceData = sourceSheet.getDataRange().getValues();
  const rowsToCopy = [];
  Logger.log("本日実行対象の通知をコピー中...");

  // 各行をループして当日実行する通知だけ別シートへコピー
  for (let i = 0; i < sourceData.length; i++) {
    if (sourceData[i][ITEM_INDEX.対応方針] === "一括対応" && checkIfToday(sourceData[i])) {
      rowsToCopy.push(sourceData[i]); // 条件に一致する行を配列に追加
    }
  }

  // ターゲットシートの存在確認
  if (!targetSheet) {
    // シートが存在しない場合は新規作成
    targetSheet = SPREADSHEET.insertSheet(targetSheetName);
  } else {
    // シートが存在する場合は内容をクリア
    targetSheet.clear(); // 既存のデータと書式をクリア
  }

  // 一致する行があればコピー先のシートに追加
  if (rowsToCopy.length > 0) {
    const lastRow = targetSheet.getLastRow(); // 最下行を取得
    const startRow = lastRow === 0 ? 1 : lastRow + 1; // データがない場合は1行目に、ある場合は最下行の次から
    targetSheet
      .getRange(startRow, 1, rowsToCopy.length, rowsToCopy[0].length)
      .setValues(rowsToCopy);
  }
  // 通知時間（13列目）を基にして行を昇順でソート
  targetSheet.sort(ITEM_INDEX.通知時間 + 1);
}


