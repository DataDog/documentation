---
aliases:
- /ja/monitors/create/types/error_tracking/
description: Error Tracking モニタータイプについて学習します。
further_reading:
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking の状態とそれがモニターに与える影響について学習します
- link: /error_tracking/
  tag: ドキュメント
  text: web、モバイル、バックエンドの Error Tracking について学習します
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスのチェック
title: Error Tracking モニター
---
## 概要 {#overview}

Datadog [Error Tracking][1] は、web、モバイル、バックエンドのアプリケーション全体で、自動的にすべてのエラーを問題ごとにグループ化します。問題にグループ化されたエラーを表示することで、最も影響の大きい問題を優先順位付けして特定できるため、サービスのダウンタイムを最小限に抑え、ユーザーの不満を軽減する上で役立ちます。

組織で Error Tracking を有効にすると、Error Tracking モニターを作成して、web やモバイルのアプリケーション、バックエンドサービス、ログで発生した問題が新規の場合、影響が大きい場合、または再び悪化し始めた場合にアラートを受け取ることができます。

## Error Tracking モニターを作成する{#create-an-error-tracking-monitor}

Datadog で Error Tracking モニターを作成するには、[[{{< ui >}}Monitors{{< /ui >}}] (モニター) > [{{< ui >}}New Monitor{{< /ui >}}] (新規モニター) > [{{< ui >}}Error Tracking{{< /ui >}}]][3] に移動します。

<div class="alert alert-info">アカウントごとに Error Tracking モニター 1000 個というデフォルトの上限があります。アカウントのこの上限を引き上げるには、<a href="/help/">サポートにお問い合わせ</a>ください。</div>

### アラート条件を選択する {#select-the-alerting-condition}

Error Tracking モニターに設定できるアラート条件には、次の 2 種類があります。

| アラート条件     | 説明    |
| ---  | ----------- |
|New Issue (新しい問題)| 問題が初めて発生したとき、または回帰が発生したときにアラートを送信します。たとえば、新しいエラーによって 2 人を超えるユーザーが影響を受けた場合に、サービスに対してアラートを送信します。|
|High Impact (大きい影響)| 影響を受けるエンドユーザー数が多い問題についてアラートを送信します。たとえば、このエラーによって 500 人を超えるユーザーが影響を受けた場合に、サービスに対してアラートを送信します。|

### アラート条件を定義する {#define-alert-conditions}

{{< tabs >}}

{{% tab "New Issue" %}}
#### アラート対象の問題 {#issues-to-alert-on}

New Issue モニターは、[{{< ui >}}For Review{{< /ui >}}] (レビュー待ち) 状態にあり、アラート条件を満たす問題についてアラートを送信します。回帰は自動的に [For Review] 状態に移行するため、デフォルトで New Issue モニターの監視対象となります。状態の詳細については、[問題の状態][1]を参照してください。

[{{< ui >}}All{{< /ui >}}] (すべて)、[{{< ui >}}Browser{{< /ui >}}] (ブラウザ)、[{{< ui >}}Mobile{{< /ui >}}] (モバイル)、または [{{< ui >}}Backend{{< /ui >}}] (バックエンド) の問題を選択し、問題のエラー発生について、[Error Tracking Explorer の検索][2]と同じロジックで検索クエリを作成します。

<div class="alert alert-info">New Issue モニターでは、モニターの作成後または最後の編集後に作成または回帰した問題のみが対象となります。これらのモニターには 24 時間のルックバック期間があります。</div>

#### アラートしきい値を定義する {#define-alert-threshold}

次のいずれかのオプションを選択します。

{{% collapse-content title="すべての新しい問題についてアラートを送信" level="p" %}}


新しい問題が検出されるとモニターがトリガーされます (過去 1 日間のエラー数が 0 より大きい場合)。

{{% /collapse-content %}}

{{% collapse-content title="アラートメトリクスを定義" level="p" %}}

1. 監視するメトリクスを選択します。最も頻繁に使用されるファセットにアクセスするための 3 つの推奨フィルターオプションがあります。

    - {{< ui >}}Error Occurrences{{< /ui >}} (エラー発生数): エラー数が `above` の場合にトリガーされます。
    - {{< ui >}}Impacted Users{{< /ui >}} (影響を受けたユーザー): 影響を受けたユーザーのメール数が `above` の場合にトリガーされます。
    - {{< ui >}}Impacted Sessions{{< /ui >}} (影響を受けたセッション): 影響を受けたセッション ID 数が `above` の場合にトリガーされます。

    [{{< ui >}}All{{< /ui >}}] または [{{< ui >}}Backend{{< /ui >}}] の問題を選択した場合は、[{{< ui >}}Error Occurrences{{< /ui >}}] オプションのみ利用可能です。

    監視に使用するカスタムメジャーを指定することもできます。カスタムメジャーを選択した場合、ファセットの一意の値の数が `above` になると、モニターがアラートを通知します。

2. クエリに一致する問題ごとに通知を受け取り、必要に応じて他の属性で結果をグループ化できます (例: クエリに一致する各問題について環境ごとに通知を受け取るなど)。

3. 各評価時に、過去 1 日間 (デフォルト) または任意の期間のデータをクエリします。

4. モニターをトリガーするしきい値を選択します (デフォルトは 0 で、初回発生時にトリガーされます)。

{{% /collapse-content %}}


#### プログラムによる管理 {#programmatic-management}

Terraform または公開 API を使用するカスタムスクリプトでモニターを管理している場合は、モニタークエリにいくつかの句を指定する必要があります。
* [{{< ui >}}All{{< /ui >}}]、[{{< ui >}}Browser{{< /ui >}}]、[{{< ui >}}Mobile{{< /ui >}}]、および [{{< ui >}}Backend{{< /ui >}}] のいずれかの問題を対象ソースとして追加します。フィルターの直後に `.source()` 句を追加し、`"all"`、`"browser"`、`"mobile"`、または `"backend"` を指定します。**注**: 一度に 1 つのみ使用できます。
* New Issue モニターには必ず `.new()` 句を使用してください。

例:

```yaml
error-tracking("{filter}").source("backend").new().rollup("count").by("issue.id").last("1d") > 0
```

[1]: /ja/error_tracking/issue_states
[2]: /ja/error_tracking/explorer
[3]: /ja/monitors/configuration/#alert-grouping/
{{% /tab %}}

{{% tab "High Impact" %}}
#### アラート対象の問題 {#issues-to-alert-on-1}

High Impact モニターは、[{{< ui >}}For Review{{< /ui >}}] または [{{< ui >}}Reviewed{{< /ui >}}] (レビュー済み) であり、アラート条件を満たす問題についてアラートを送信します。[問題の状態][1]についての詳細をご覧ください。

[{{< ui >}}All{{< /ui >}}]、[{{< ui >}}Browser{{< /ui >}}]、[{{< ui >}}Mobile{{< /ui >}}]、または [{{< ui >}}Backend{{< /ui >}}] の問題を選択し、問題のエラー発生について、[Error Tracking Explorer の検索][2]と同じロジックで検索クエリを作成します。

#### アラートしきい値を定義する {#define-alert-threshold-1}
1. 監視するメトリクスを選択します。最も頻繁に使用されるファセットにアクセスするための 3 つの推奨フィルターオプションがあります。

    - {{< ui >}}Error Occurrences{{< /ui >}}: エラー数が `above` の場合にトリガーされます。
    - {{< ui >}}Impacted Users{{< /ui >}} (影響を受けたユーザー): 影響を受けたユーザーのメール数が `above` の場合にトリガーされます。
    - {{< ui >}}Impacted Sessions{{< /ui >}} (影響を受けたセッション): 影響を受けたセッション ID 数が `above` の場合にトリガーされます。

    [{{< ui >}}All{{< /ui >}}] または [{{< ui >}}Backend{{< /ui >}}] の問題を選択した場合は、[{{< ui >}}Error Occurrences{{< /ui >}}] オプションのみ利用可能です。

    監視に使用するカスタムメジャーを指定することもできます。カスタムメジャーを選択した場合、ファセットの一意の値の数が `above` になると、モニターがアラートを通知します。

2. クエリに一致する問題ごとに通知を受け取り、必要に応じて他の属性で結果をグループ化できます (例: クエリに一致する各問題について環境ごとに通知を受け取るなど)。

3. 各評価時に、過去 1 日間 (デフォルト) または任意の期間のデータをクエリします。

4. モニターをトリガーするしきい値を選択します (デフォルトは 0 で、初回発生時にトリガーされます)。

#### プログラムによる管理 {#programmatic-management-1}

Terraform または公開 API を使用するカスタムスクリプトでモニターを管理している場合は、モニタークエリにいくつかの句を指定する必要があります。
* [{{< ui >}}All{{< /ui >}}]、[{{< ui >}}Browser{{< /ui >}}]、[{{< ui >}}Mobile{{< /ui >}}]、および [{{< ui >}}Backend{{< /ui >}}] のいずれかの問題を対象ソースとして追加します。フィルターの直後に `.source()` 句を追加し、`"all"`、`"browser"`、`"mobile"`、または `"backend"` を指定します。**注**: 一度に 1 つのみ使用できます。
* High Impact モニターでは必ず `.impact()` 句を使用してください。

例:

```yaml
error-tracking("{filter}").source("browser").impact().rollup("count").by("issue.id").last("1d") > 0
```

[1]: /ja/error_tracking/issue_states
[2]: /ja/error_tracking/explorer
{{% /tab %}}
{{< /tabs >}}

### 通知 {#notifications}

通知タイトルにトリガーとなったタグを表示するには、[{{< ui >}}Include triggering tags in notification title{{< /ui >}}] (通知タイトルにトリガーとなったタグを含める) をクリックします。

[一致する属性変数][7]に加えて、アラートメッセージの通知では、次の Error Tracking 固有の変数を
使用できます。

* `{{issue.attributes.error.type}}`
* `{{issue.attributes.error.message}}`
* `{{issue.attributes.error.stack}}`
* `{{issue.attributes.error.file}}`
* `{{issue.attributes.error.is_crash}}`
* `{{issue.attributes.error.category}}`
* `{{issue.attributes.error.handling}}`

[{{< ui >}}Configure notifications and automations{{< /ui >}}] (通知と自動化を設定) セクションの詳細については、[通知][5]を参照してください。

問題ごとに通知を受け取るには、マルチアラートを選択します。Error Tracking モニターでは、これが想定される動作です。

### モニターをミュートする {#muting-monitors}
Error Tracking モニターは[問題の状態][2]を利用して、アラートを優先度の高い事項に集中させ、重要でない問題によって注意がそらされないようにします。

[{{< ui >}}Ignored{{< /ui >}}] (無視) 状態の問題は、追加の調査や対応が不要なエラーです。問題を [{{< ui >}}Ignored{{< /ui >}}] としてマークすると、これらの問題はモニターの通知から自動的にミュートされます。

## トラブルシューティング {#troubleshooting}

### New Issue モニターが問題の経過時間を考慮しない {#new-issue-monitors-do-not-take-into-account-issue-age}
`issue.age` および `issue.regression.age` は、アラートの見逃しにつながる可能性があるため、デフォルトでは追加されません。たとえば、問題が最初に `env:staging` で発生し、その 1 週間後に `env:prod` で初めて発生した場合、その問題は 1 週間経過したものと見なされ、`env:prod` で初めて発生した際にアラートがトリガーされません。

そのため、Datadog では `issue.age` および `issue.regression.age` の使用を推奨していません。ただし、状態に基づくモニターの動作が適していない場合は、これらのフィルターを手動で指定して使用できます。

**注**: モニターで `issue.age` および `issue.regression.age` を使用する予定の場合、このフィルターキーは製品間で一貫していません。たとえば、`@issue.age` や `issue.age` になる可能性があります。

### New Issue モニターでノイズが発生しすぎる {#new-issue-monitors-are-generating-too-much-noise}
New Issue モニターは、アラート基準を満たし、[{{< ui >}}For Review{{< /ui >}}] とマークされた問題についてアラートを送信します。問題が適切にトリアージされていない ([{{< ui >}}Reviewed{{< /ui >}}]、[{{< ui >}}Ignored{{< /ui >}}]、または [{{< ui >}}Resolved{{< /ui >}}] (解決済み) とマークされていない) 場合、問題が OK 状態と ALERT 状態の間で変動すると、同じ問題に対して New Issue モニターが複数回トリガーされることがあります。

モニターで発生するノイズが多すぎる場合、次の調整を検討してください。
- **アラートをトリアージする**: 適切なタイミングで問題を [{{< ui >}}Reviewed{{< /ui >}}]、[{{< ui >}}Ignored{{< /ui >}}]、または [{{< ui >}}Resolved{{< /ui >}}] に設定します。
- **評価時間枠を拡大する**: デフォルトの評価期間は 1 日です。エラーが頻繁に発生しない場合 (たとえば、1 日おきなど)、モニターが OK 状態と ALERT 状態の間で切り替わることがあります。評価期間を拡大すると、再度トリガーされるのを防ぎ、モニターを ALERT 状態に維持するのに役立ちます。
- **アラートのしきい値を引き上げる**: デフォルトのしきい値は `0` に設定されており、新しい問題が最初に発生した時点でアラートが出ます。単発または散発的なエラーによるノイズを減らすには、しきい値を引き上げ、エラーが複数回発生した場合にのみアラートを送信するようにしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking/issue_states
[2]: /ja/error_tracking/explorer
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /ja/monitors/configuration/#advanced-alert-conditions
[5]: /ja/monitors/notify/
[6]: /ja/logs/
[7]: /ja/monitors/notify/variables/#matching-attributetag-variables