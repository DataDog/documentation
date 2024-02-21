---
aliases:
- /ja/graphing/widgets/check_status/
description: 実行されたチェックの現在のステータスまたは結果の数をグラフ化する
further_reading:
- link: /developers/service_checks
  tag: ドキュメント
  text: サービスチェックについて
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: チェックステータスウィジェット
widget_type: check_status
---

チェックステータスは、実行されたチェックの現在のステータスまたは結果の数を表示します。

{{< img src="dashboards/widgets/check_status/check_status.png" alt="チェックステータスウィジェット" >}}

## セットアップ

### 構成

1. 以前に作成した[サービスチェック][1]を選択します。
2. レポートの時間枠を選択します。この時間枠には常に現在までが含まれるため、`The past 10 minutes` (過去 10 分) や `The past 1 day` (過去 1 日) などのオプションを選択すると、現在までの時間枠を含むステータスが報告されます。`Global Time` を選択すると、ダッシュボードを使用する人は右上の時間枠セレクターを使用して範囲を選択できますが、_現在の瞬間を含むものを選択する必要があります_。つまり `past X` (過去X) の時間枠です。それ以外の場合、ウィジェットは空白になります。
3. スコープを選択します。
    * **A single check**: チェックステータスウィジェットが特定の要素 (例: 1 つの `host:<HOSTNAME>`、1 つの `service:<SERVICE_NAME>`) のみを対象とする場合は、このオプションを選択します。
    * **A cluster of checks**: チェックステータスウィジェットが一定の範囲の要素 (すべての `host`、すべての `service`) を対象とする場合は、このオプションを選択します。

4. スコープを選択したら、**Reported by** フィールドで、チェックステータスウィジェットのコンテキストを定義します。

## API

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェット JSON スキーマ定義][3]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/service_checks
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/