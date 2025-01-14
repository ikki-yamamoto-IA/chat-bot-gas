function logError(error, id) {
  const sheetName = SHEET_NAME_ERROR;
  let sheet = SPREADSHEET.getSheetByName(sheetName);

  // シートが存在しない場合は作成
  if (!sheet) {
    sheet = SPREADSHEET.insertSheet(sheetName);
    sheet.appendRow(["メッセージタイプ", "通知ID", "発生時刻", "メッセージ", "Stack Trace"]); // ヘッダーを設定
  }

  // 現在時刻をシートのタイムゾーンでフォーマット
  const timestamp = Utilities.formatDate(new Date(), SHEET_TIME_ZONE, "yyyy/MM/dd HH:mm:ss");
  const errorMessage = error.message || "Unknown Error";
  const stackTrace = error.stack || "No stack trace available";

  sheet.appendRow(["error", id, timestamp, errorMessage, stackTrace]);
}

function logWaring(id, msg) {
  const sheetName = SHEET_NAME_ERROR;
  let sheet = SPREADSHEET.getSheetByName(sheetName);

  // シートが存在しない場合は作成
  if (!sheet) {
    sheet = SPREADSHEET.insertSheet(sheetName);
    sheet.appendRow(["メッセージタイプ", "通知ID", "発生時刻", "メッセージ", "Stack Trace"]); // ヘッダーを設定
  }

  // 現在時刻をシートのタイムゾーンでフォーマット
  const timestamp = Utilities.formatDate(new Date(), SHEET_TIME_ZONE, "yyyy/MM/dd HH:mm:ss");

  sheet.appendRow(["warning", id, timestamp, msg, "No stack trace available"]);
}