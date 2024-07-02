---
description: Error Tracking でコストをコントロールする方法をご紹介します。
further_reading:
- link: /monitors/types/error_tracking
  tag: ドキュメント
  text: エラー追跡モニターについて
- link: /tracing/error_tracking
  tag: ドキュメント
  text: バックエンドサービスのエラー追跡について
is_beta: true
kind: ドキュメント
private: true
title: Manage Data Collection
---

## 概要

Error Tracking は、取り込むエラーを細かく制御することで、ノイズを減らし予期せぬコストを避けるのに役立ちます。

Error Tracking に含まれるデータは以下の 2 つの方法で定義できます。

1. [ルール](#rules-inclusion)
2. [レート制限](#rate-limits)

ルールとレート制限は、どちらも [**Logs** > **Error Tracking** > **Settings**][1] ページで構成できます。

## ルール

ルールでは、Error Tracking に取り込むエラーを選択できます。

各ルールは以下で構成されます。
- `service:my-web-store` のような[ログ検索クエリ][3]を含む包含フィルター。
- ルールをさらに絞り込むための、1 つ以上のネストされた除外フィルター (オプション)。例えば、除外フィルターは `env:staging` クエリを使用してステージングログを除外する場合があります。

特定のルールはオンまたはオフに切り替えることができます。アクティブな包含フィルターのいずれかのクエリに一致し、アクティブなネストされた除外クエリに一致しない場合、エラーイベントが含まれます。

**注:** [必須属性][2]が欠けている場合、ルールによって受け入れられたエラーイベントは、Error Tracking から除外される可能性があります。

### 評価順序

ルールは順番に評価され、最初に一致したルールで評価が停止します。ルールとそのネストされたフィルターの優先順位は、リスト内の順序に依存します。

### デフォルトのルール

デフォルトでは、Error Tracking には `*` 包含フィルターがあり、除外フィルターはありません。これは、フィンガープリントされる[要件][2]を持つすべてのエラーログが Error Tracking に取り込まれることを意味します。

### ルールの追加

ルール (包含フィルター) を追加するには
1. [Error Tracking Settings][1] に移動します。
1. **Add New Rule** をクリックします。
1. **Name** フィールドに名前を入力します。
1. **Define rule query** フィールドに[ログ検索クエリ][3]を入力します。
1. **Add new rule** をクリックします。
1. オプションで、[評価順序](#evaluation-order)を変更するには、ルールを並べ替えます。指定したルールの 6 つの点のアイコンをクリックしてドラッグすると、そのルールがリスト内で上下に移動します。

{{< img src="logs/error_tracking/reorder_filters.png" alt="各ルールの右側には 6 つの点のアイコンがあり、これを垂直にドラッグしてルールを並べ替えることができます。" style="width:80%;">}}

### ルールにネストされた除外フィルターを追加する

1. 除外フィルターを追加するルールを展開します。
1. **Add Exclusion Filter** をクリックします。
    {{< img src="logs/error_tracking/filters.png" alt="ルールを展開すると、Add Exclusion Filter オプションが表示されます。" style="width:70%;">}}
1. **Name** フィールドに名前を入力します。
1. **Define exclusion filter query** フィールドに[ログ検索クエリ][3]を入力します。
1. **Save Exclusion Filter** をクリックします。

## レート制限

レート制限により、1 日に Error Tracking に含まれるインデックス化されたエラーログの数を制御できます。この上限は、[ルール](#rules)の包含フィルターに一致するすべてのインデックス化されたエラーログに適用されます。

1 日の上限に達すると、翌日まで取り込みが止まります。上限はいつでも変更・解除できます。

### レート制限の設定

レート制限を設定するには
1. [**Logs** > **Error Tracking** > **Settings**][1] に移動します。
1. **Rate Limits** をクリックします。
1. **errors/month** フィールドを編集します。
1. **Save Rate Limit** をクリックします。

{{< img src="logs/error_tracking/rate_limit.png" alt="このページの左側、「Set your Rate Limit below」の下にあるドロップダウンメニューで、レート制限を設定することができます。" style="width:70%;">}}

レート制限に達すると `Rate limit applied` イベントが生成されます。イベントの表示と使用の詳細については、[Event Management のドキュメント][4]を参照してください。

{{< img src="logs/error_tracking/rate_limit_reached_event.png" alt="イベントエクスプローラーの「Rate limit applied」イベントのスクリーンショット。イベントのステータスは INFO、ソースは Error Tracking、タイムスタンプは「6h ago」、タイトルは「Rate limit applied」です。イベントのタグは「source:error_tracking」です。メッセージは「Your rate limit has been applied as more than 60000000 logs error events were sent to Error Tracking. Rate limit can be changed from the ingestion control page.」(6000 万以上のログエラーイベントが Error Tracking に送信されたため、レート制限が適用されました。レート制限は、取り込みコントロールページから変更できます) です。" style="width:70%;">}}

## 使用量の監視

`datadog.estimated_usage.error_tracking.logs.events` メトリクスのモニターとアラートをセットアップすることで、Error Tracking の使用量を監視することができます。これは、取り込まれたエラーログの数を追跡するものです。

このメトリクスは追加費用なしでデフォルトで利用でき、データは 15 か月間保持されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/rules
[2]: /ja/logs/error_tracking/#setup
[3]: /ja/logs/explorer/search_syntax/
[4]: /ja/service_management/events/