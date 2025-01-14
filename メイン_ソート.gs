function sortSheet() {
  const sheet = SPREADSHEET.getSheetByName(SHEET_NAME_TODAY_TARGET);
  
  // 通知時間列の値を時刻形式に変換（必要に応じて）
  const range = sheet.getRange(1, ITEM_INDEX.通知時間 + 1, sheet.getLastRow(), 1);
  const values = range.getValues();
  
  // 通知時間列のデータを時刻に変換
  for (let i = 0; i < values.length; i++) {
    if (values[i][0]) {
      values[i][0] = new Date("1970-01-01T" + values[i][0] + ":00Z");  // 時刻形式に変換
    }
  }
  
  // 変換後の値でソート
  sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
       .sort({column: 13, ascending: true});
}