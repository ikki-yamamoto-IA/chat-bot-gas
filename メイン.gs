// 毎日実行するメインの関数
function main() {
  try {
    // 当月の営業日取得
    getBusinessDays();
    // 通知一覧から当日通知対象の行のみを別シートへコピー
    copyMatchingRows();
    // すでに実行済みの行のみ削除
    deleteRowsWithBackgroundColor();
    // ソート
    sortSheet();
    // 当日の通知をトリガーに登録
    roopTodaySheet();
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
