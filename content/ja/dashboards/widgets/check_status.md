---
title: チェックステータスウィジェット
kind: documentation
description: 実行されたチェックの現在のステータスまたは結果の数をグラフ化する
aliases:
  - /ja/graphing/widgets/check_status/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
チェックステータスは、実行されたチェックの現在のステータスまたは結果の数を表示します。

{{< img src="dashboards/widgets/check_status/check_status.png" alt="チェックステータスウィジェット" >}}

## セットアップ

{{< img src="dashboards/widgets/check_status/check_status_setup.png" alt="チェックステータスウィジェットのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. これまでに作成したサービスチェックの 1 つを選択します。
2. 報告対象のタイムフレームを選択します。
  * グローバルタイム
  * 過去 10 分間
  * 過去 30 分間
  * 過去 1 時間
  * 過去 4 時間
  * 過去 1 日
3. スコープを選択します。
    * **A single check**: チェックステータスウィジェットが特定の要素 (1 つの `host:<HOSTNAME>`、1 つの `service:<SERVICE_NAME>` など) のみを対象とする場合は、このオプションを選択します。
    * **A cluster of checks**: チェックステータスウィジェットが一定の範囲の要素 (すべての `host`、すべての `service` など) を対象とする場合は、このオプションを選択します。

4. スコープを選択したら、**Reported by** フィールドで、チェックステータスウィジェットのコンテキストを定義します。
5. オプション: チェック結果をカスタムタグキーによってグループ化します。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

チェックステータスウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/