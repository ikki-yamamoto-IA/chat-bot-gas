function isValid(rowData) {
  const id = rowData[ITEM_INDEX.ID];
  const date = rowData[ITEM_INDEX.日にち];
  const week = rowData[ITEM_INDEX.曜日];
  const bussinessday = rowData[ITEM_INDEX.営業日];
  const msg = rowData[ITEM_INDEX.通知内容];
  const execTime = rowData[ITEM_INDEX.通知時間];
  const channel = rowData[ITEM_INDEX.通知チャンネル];

  try {
    // 頻度に基づいて判定
    switch (rowData[ITEM_INDEX.通知タイミング]) {
      case "毎日":
        if (date || week || bussinessday) {
          throw new CustomException(id, ERR_MESSAGE_ISVALID);
        }
        break;
    
      case "毎週":
        if (date || bussinessday || !week) {
          throw new CustomException(id, ERR_MESSAGE_ISVALID);
        }
        break;

      case "毎月":
        if (week || (!date && !bussinessday)) {
          throw new CustomException(id, ERR_MESSAGE_ISVALID);
        }
        break;

      default:
        throw new CustomException(id, `通知タイミングの入力値が不正です。通知タイミング：${rowData[ITEM_INDEX.通知タイミング]}`);
    }
    // 正規表現で hh:mm 形式をチェック
    const timePattern = /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timePattern.test(execTime)) {
      throw new CustomException(id, `通知時間の形式が不正です。通知時間：${execTime}`);
    }

    if (!msg || msg == "") {
      throw new CustomException(id, "通知内容が入力されていません。");
    }
    
    // チャンネル名とWebhookURLの存在をチェック
    const sheet = SPREADSHEET.getSheetByName(SHEET_NAME_WEBHOOK);
    // A列とB列のデータを取得（2行目から最終行まで）
    const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2); // A列からB列まで取得
    const data = dataRange.getValues(); // [[チャンネル名, WebhookURL], [チャンネル名, WebhookURL], ...]

    // チャンネル名とWebhookURLの存在をチェック
    let channelExists = false;

    for (let i = 0; i < data.length; i++) {
      const channelName = data[i][0]; // A列のチャンネル名
      const webhookURL = data[i][1];  // B列のWebhookURL
      if (channelName === channel) {
        channelExists = true; 
        if (!webhookURL || webhookURL.trim() === "") {
          throw new CustomException(id, `チャンネル名に対応するWebhookが未入力です。${SHEET_NAME_WEBHOOK}シートを確認してください`);
        }
        break;
      }
    }
    if (!channelExists) {
      throw new CustomException(id, `チャンネル名が${SHEET_NAME_WEBHOOK}シートに存在しません。`);
    }
    return true;

  } catch(e) {
    if (e instanceof CustomException) {
      // エラーログにIDとメッセージを渡す
      logError(e, e.id);
    } else {
      // 一般的なエラー処理
      logError(e, "Unknown ID");
    }
  }
}