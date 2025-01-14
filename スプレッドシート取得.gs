function getSpreadsheet() {
  const FILE_ID = "136O3V2Osy_KonvtqEe97eu-JmsUfl3xJaONW1zi7rcM";  // スプレッドシートのID

  try {
    // IDでスプレッドシートを開く
    const spreadsheet = SpreadsheetApp.openById(FILE_ID);
    return spreadsheet;

  } catch (e) {
    if (e instanceof CustomException) {
      // エラーログにIDとメッセージを渡す
      logError(e, FILE_ID);
    } else {
      // 一般的なエラー処理
      logError(e, "Unknown ID");
    }
  }
}
