// カレンダーのシートから営業日を取得する関数
function getBusinessDays() {
  const sheet = SPREADSHEET.getSheetByName(SHEET_NAME_CALENDER);
  
  // 2行目のヘッダーから現在の月の列を取得
  const headerRow = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthString = `${currentMonth}月`;
  const columnIndex = headerRow.indexOf(currentMonthString);

  if (columnIndex === -1) {
    Logger.log("現在の月の列が見つかりませんでした。");
    return;
  }
  
  const targetColumn = columnIndex + 1; // 列インデックスを1ベースに調整
  const lastRow = sheet.getLastRow() - 1;
  
  // 現在月の列に対してデータ行(3行目以降)をループ
  for (let row = 3; row < lastRow; row++) {
    const cell = sheet.getRange(row, targetColumn);
    const cellBackground = cell.getBackground();

    // 背景色が白色(営業日)なら値を更新
    if (cellBackground === "#ffffff") {
      // グローバル配列にプッシュ
      bussinessDays.push(cell.getValue());
    }
  }

  Logger.log(`営業日: ${bussinessDays}`);

  // return (bussinessDays);
}
