// 引数で受け取った値からその行が当日実行するものか判定する関数
function checkIfToday(rowData) {
  const today = new Date();
  const todayDate = today.getDate(); // 今日の日付
  const weekday = today.getDay(); // 今日の曜日 (0: 日曜日, 1: 月曜日, ..., 6: 土曜日)

  try {
    // 不正なデータがないかチェック
    if (!isValid(rowData)) {
      return false;
    }

    // 頻度に基づいて判定
    switch (rowData[ITEM_INDEX.通知タイミング]) {
      case "毎日":
        return true; // 毎日なので、常に今日
    
      case "毎週":
        const targetWeekday = getWeekdayNumber(rowData[ITEM_INDEX.曜日]);
        return targetWeekday === weekday; // 曜日が一致するか判定

      case "毎月":
        if (rowData[ITEM_INDEX.日にち]) {
          const targetDate = parseInt(rowData[ITEM_INDEX.日にち], 10);
          return targetDate === todayDate; // 日付が一致するか判定
        } else if (rowData[ITEM_INDEX.営業日]) {
          if (rowData[ITEM_INDEX.営業日] === "最終営業日") {
            return todayDate === bussinessDays[bussinessDays.length-1]; // 最終営業日の場合
          }
          const char = rowData[ITEM_INDEX.営業日].charAt(1);
          // 数値に変換
          const num = parseInt(char, 10);
          // 数値に変換できたか確認
          if (!isNaN(num)) {
            Logger.log("2文字目は数値です: " + num);
          } else {
            Logger.log("2文字目は数値ではありません: " + char);
          }
          return todayDate === bussinessDays[num - 1]; // 営業日の判定
        }
      break;
    }
  } catch(e) {
    if (e instanceof CustomException) {;
      throw e; // 例外を再スローすることも可能
    }
  }

  return false; // どれにも該当しない場合
}

// 曜日の文字列を数値に変換するヘルパー関数
function getWeekdayNumber(dayString) {
  const weekdays = ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"];
  return weekdays.indexOf(dayString);
}


