// トリガー実行日時を返す関数
function getTriggerTime(inputTime) {
  // DateオブジェクトをHH:mm形式に変換
  const formattedDate = Utilities.formatDate(inputTime, SHEET_TIME_ZONE, "HH:mm");
  
  // ":"で分割
  const parts = formattedDate.split(':');
  
  // 時間と分を取得
  const hour = parts[0];    // 時間
  const minute = parts[1];  // 分

  // トリガー実行日の取得
  var triggerDate = getExecDate();
  triggerDate.setHours(hour);
  triggerDate.setMinutes(minute);
  triggerDate.setSeconds(0);
  return triggerDate;
}

// 今日が営業日なら今日を、休日なら翌営業日を返す関数
function getExecDate() {
  // 現在の日付（1～31の範囲の「日」）を取得
  const todayDate = new Date().getDate();

  // 今日以降の日付をフィルタ
  const filteredDays = bussinessDays.filter(num => num >= todayDate);
  
  if (filteredDays.length > 0) {
    // 現在の日付を取得
    const today = new Date();
    // 最も近い日付を取得
    const nearBussinessDay = Math.min(...filteredDays);
    // 差分を加算した日付を設定
    today.setDate(today.getDate() + (nearBussinessDay - todayDate));
    return today;
  } else {
    // 今日以降の日付が存在しない場合
    return null;
  }
}
