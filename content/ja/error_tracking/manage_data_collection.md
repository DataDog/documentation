---
description: Error Tracking でコストをコントロールする方法をご紹介します。
further_reading:
- link: /monitors/types/error_tracking
  tag: ドキュメント
  text: エラー追跡モニターについて
- link: /tracing/error_tracking
  tag: ドキュメント
  text: バックエンドサービスのエラー追跡について
title: データ収集の管理
---

## 概要

Error Tracking は、取り込むエラーを細かく制御することで、ノイズを減らし予期せぬコストを避けるのに役立ちます。

Error Tracking に含まれるデータは以下の 2 つの方法で定義できます。

- [ルール](#rules-inclusion)
- [レート制限](#rate-limits)

[**Error Tracking** > **Settings**][1] ページでは、ルールとレート制限の両方を設定できます。

## ルール

ルールでは、どのエラーを Error Tracking に取り込むかを選択できます。ルールは、課金対象と非課金対象のエラーの両方に適用されます。

各ルールは以下で構成されます。
- スコープ: 検索クエリ (例: `service:my-web-store`) を含む包含フィルター。
- 任意で、1 つ以上のネストされた除外フィルターを追加してルールをさらに絞り込み、一致したイベントの一部を無視できます。たとえば、除外フィルターで `env:staging` を使い、ステージング環境のエラーを除外できます。

各ルールは有効/無効を切り替えられます。エラー イベントは、アクティブな包含フィルターのいずれかのクエリに一致し、かつアクティブなネストされた除外クエリのどれにも一致しない場合に取り込まれます。

各エラー イベントは、ルールの順番どおりに照合されます。イベントは、一致した最初の有効なルールだけで処理され、それ以降のルールはすべて無視されます。一致したルールに除外フィルターがある場合、そのイベントは除外されます。除外フィルターがなければ、イベントは取り込まれます。

**注:** [必須属性][2]が欠けている場合、ルールによって受け入れられたエラーイベントは、Error Tracking から除外される可能性があります。

### 評価順序

ルールは順番に評価され、最初に一致したルールで評価が停止します。ルールとそのネストされたフィルターの優先順位は、リスト内の順序に依存します。

{{% collapse-content title="例" level="p" %}}
ルールの一覧が次のとおりの場合:
- ルール 1: `env:prod`
    - 除外フィルター 1-1: `service:api`
    - 除外フィルター 1-2: `status:warn`
- ルール 2: `service:web`
- ルール 3 (このルールは無効です): `team:security`
- ルール 4: `service:foo`


{{< img src="error_tracking/error-tracking-filters-example.png" alt="Error Tracking Filters の設定例" style="width:75%;" >}}

処理フローは次のとおりです:
{{< img src="error_tracking/error-tracking-filters-diagram-brand-design.png" alt="Error Tracking Filters" style="width:90%;" >}}


`env:prod service:my-service status:warn` のイベントは、
- ルール 1 に一致し、その除外フィルターへ進みます
- 除外フィルター 1-1 には一致しないため、除外フィルター 1-2 へ進みます
- 除外フィルター 1-2 で一致するので、このイベントは破棄されます

`env:staging service:web` のイベントは、
- ルール 1 には一致しないため、ルール 2 へ進みます
- ルール 2 で一致するので、このイベントは取り込まれます

{{% /collapse-content %}}

### デフォルトのルール

デフォルトでは、Error Tracking には `*` の包含フィルターがあり、除外フィルターはありません。つまり、フィンガープリント化の [要件][2] を満たすすべてのエラーが Error Tracking に取り込まれます。

### ルールの追加

ルール (包含フィルター) を追加するには
1. [Error Tracking Settings][1] に移動します。
2. **Add New Rule** をクリックします。
3. ルールを適用する **Error Tracking source** を選択します。
4. **Define scope** フィールドに検索クエリを入力します。
5. 必要に応じて、**Add Exclusion** フィルターと説明をルールに追加します。
6. **Save Changes** をクリックします。
7. オプションで、[評価順序](#evaluation-order)を変更するには、ルールを並べ替えます。指定したルールの 6 つの点のアイコンをクリックしてドラッグすると、そのルールがリスト内で上下に移動します。

{{< img src="error_tracking/reorder-filters.png" alt="各ルールの右側には 6 点のアイコンがあり、上下にドラッグしてルールの順序を変更できます。" style="width:80%;">}}


## レート制限

レート制限を使うと、1 日あたり Error Tracking に含める課金対象エラー数を制御できます。この上限は、[ルール](#rules) のフィルターに一致するすべてのエラーに適用されます。

1 日の上限に達すると、翌日まで取り込みが止まります。上限はいつでも変更・解除できます。

### レート制限の設定

レート制限を設定するには
1. [**Error Tracking** > **Settings**][1] に移動します。
1. **Rate Limits** をクリックします。
1. **errors/day** フィールドを編集します。
1. **Save Rate Limit** をクリックします。

{{< img src="error_tracking/rate-limit.png" alt="このページの左側にある 'Set your Rate Limit below' の下にはドロップダウン メニューがあり、そこでレート制限を設定できます。" style="width:70%;">}}

レート制限に到達すると、`Rate limit applied` イベントが生成されます。イベントの表示と活用方法の詳細は、[Event Management ドキュメント][4] を参照してください。

{{< img src="logs/error_tracking/rate_limit_reached_event.png" alt="イベントエクスプローラーの「Rate limit applied」イベントのスクリーンショット。イベントのステータスは INFO、ソースは Error Tracking、タイムスタンプは「6h ago」、タイトルは「Rate limit applied」です。イベントのタグは「source:error_tracking」です。メッセージは「Your rate limit has been applied as more than 60000000 logs error events were sent to Error Tracking. Rate limit can be changed from the ingestion control page.」(6000 万以上のログエラーイベントが Error Tracking に送信されたため、レート制限が適用されました。レート制限は、取り込みコントロールページから変更できます) です。" style="width:70%;">}}

## 使用量の監視

取り込まれたエラー ログ数を追跡するメトリクス `datadog.estimated_usage.error_tracking.logs.events` に対してモニターとアラートを設定すると、Logs 上の Error Tracking の使用量を監視できます。

このメトリクスは追加費用なしでデフォルトで利用でき、データは 15 か月間保持されます。

## 動的サンプリング

Error Tracking の課金はエラー数に基づいているため、単一の issue でエラーが大幅に増加すると、Error Tracking の予算が急速に消費される可能性があります。Dynamic Sampling は、日次レート制限と過去のエラー数に基づいて issue ごとのエラー レートのしきい値を設定し、そのしきい値に達した場合にエラーをサンプリングすることで、保護します。issue のエラー レートが指定のしきい値を下回ると、Dynamic Sampling は自動的に無効化されます。

### セットアップ

Dynamic Sampling は Error Tracking と共に自動的に有効化され、日次レート制限と過去のボリュームに基づくデフォルトの取り込みしきい値が設定されます。

より確実に運用するには、[Error Tracking Rate Limits ページ][5] で日次のレート制限を設定してください: **Edit Rate Limit** をクリックし、新しい値を入力します。

{{< img src="error_tracking/dynamic-sampling-rate-limit.png" alt="Error Tracking の Rate Limit" style="width:90%" >}}

### Dynamic Sampling の無効化

Dynamic Sampling は [Error Tracking の設定ページ][4] で無効化できます。

{{< img src="error_tracking/dynamic-sampling-settings.png" alt="Error Tracking の Dynamic Sampling 設定" style="width:90%" >}}

### Dynamic Sampling の監視

issue に Dynamic Sampling が適用されると、`Dynamic Sampling activated` イベントが生成されます。イベントの表示と活用方法の詳細は、[Event Management ドキュメント][4] を参照してください。

{{< img src="error_tracking/dynamic-sampling-event.png" alt="Error Tracking の Rate Limit" style="width:90%" >}}

#### 調査および緩和手順

Dynamic Sampling が適用された場合、次の手順を推奨します:

- どの issue がクォータを消費しているかを確認します。Dynamic Sampling が適用された issue へのリンクは、Event Management で生成されたイベント内に含まれています。
- この issue のサンプルを追加で収集したい場合は、[Error Tracking Rate Limits ページ][5] で日次クォータを増やしてください。
- 今後この issue のサンプル収集を避けたい場合は、除外フィルターを作成して、追加のイベントが Error Tracking に取り込まれないようにすることを検討してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/rules
[2]: /ja/error_tracking/troubleshooting/?tab=java#errors-are-not-found-in-error-tracking
[4]: /ja/events/
[5]: https://app.datadoghq.com/error-tracking/settings/rate-limits