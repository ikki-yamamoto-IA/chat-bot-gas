// 引数で受け取った内容をGoogleChatで送信する関数
function sendChat(rowData) {
  const id = rowData[ITEM_INDEX.ID];
  const channel = rowData[ITEM_INDEX.通知チャンネル];
  const mentionType = rowData[ITEM_INDEX.メンション先];
  let msg = rowData[ITEM_INDEX.通知内容];
  
  try {
    //GoogleChatで設定したWebhookのURLを設定
    let webhook = "";
    // チャンネル名とWebhookURLの存在をチェック
      const sheet = SPREADSHEET.getSheetByName(SHEET_NAME_WEBHOOK);
      // A列とB列のデータを取得（2行目から最終行まで）
      const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2); // A列からB列まで取得
      const data = dataRange.getValues(); // [[チャンネル名, WebhookURL], [チャンネル名, WebhookURL], ...]

      for (let i = 0; i < data.length; i++) {
        const channelName = data[i][0]; // A列のチャンネル名
        if (channelName === channel) {
          webhook = data[i][1];  // B列のWebhookURL
          break;
        }
      }

    const emailList = getEmailList(rowData); // 存在する値を配列で返す
    let mention = "";

    // 空欄の場合
    if (mentionType === undefined || mentionType === null || mentionType.toString().trim() === "") {
      if (emailList.length > 0) {
        logWaring(id, "メールアドレス列に不要なデータが入力されています。");
      }
    }

    // "全員" の場合
    if (mentionType.toString().trim() === "全員") {
      mention = "<users/all>";
      if (emailList.length > 0) {
        logWaring(id, "メールアドレス列に不要なデータが入力されています。");
      }
    }

    // "個別" の場合
    if (mentionType.toString().trim() === "個別") {
      if (emailList.length > 0) {
        for (let i = 0; i < emailList.length; i++) {
          const userId = (function(email){
            // シートの取得
            const sheet = SPREADSHEET.getSheetByName(SHEET_NAME_USER_ID);
      
            // データの範囲を取得（A列とB列のデータ）
            const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
      
            // メールアドレスを検索し、対応するIDを返す
            for (let i = 0; i < data.length; i++) {
              if (data[i][0] === email) {
                return data[i][1]; // メールアドレスが一致する行のIDを返す
              }
            }

            // メールアドレスが見つからなかった場合
            return null; // メールアドレスが見つからなかった場合はnullを返す
          }(emailList[i]))
          mention += `<users/${userId}> `;
        };
      }
    }
    msg = msg ? msg : `通知ID: ${id}の通知内容が設定されていません`;
    const message = {
      text: `${mention}\n${msg}`
    };

    //HTTPリクエストのパラメータを設定
    var options = {
      'payload' : JSON.stringify(message),
      'myamethod' : 'POST',
      'contentType' : 'application/json'
    };

    //Google Chatへ投稿（WebhookURLへHTTP POSTを実行）
    var response = UrlFetchApp.fetch(webhook,options);

  } catch(e) {
    if (e instanceof CustomException) {
      // 警告ログにIDとメッセージを渡す
      logError(e, e.id);
    } else {
      logError(e, "Unknown ID");
    }
  }
}