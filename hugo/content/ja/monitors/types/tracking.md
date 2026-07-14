---
aliases:
- /ja/monitors/create/types/error_tracking/
description: Error Tracking モニター タイプについて学習します。
further_reading:
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking の状態とこれがモニターに与える影響について学習します
- link: /error_tracking/
  tag: ドキュメント
  text: Web、Mobile、Backend における Error Tracking について学習します
- link: /monitors/notify/
  tag: ドキュメント
  text: モニターの通知を設定します
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムをスケジュールする
- link: /monitors/status/
  tag: ドキュメント
  text: モニターのステータスを確認する
title: Error Tracking モニター
---

## 概要

Datadog [Error Tracking][1] は、Web、Mobile、Backend アプリケーション全体で発生するすべてのエラーを Issue に自動でグループ化します。Issue ごとにエラーを確認することで、影響が大きい問題を優先的に特定でき、サービス ダウンタイムの最小化とユーザー フラストレーションの低減が容易になります。

組織で Error Tracking を有効にすると、Web または Mobile アプリケーション、Backend サービス、ログで新規・高インパクト・リグレッション状態になった Issue を検知した際に通知する Error Tracking モニターを作成できます。

## Error Tracking モニターを作成する

Datadog で Error Tracking モニターを作成するには、[**Monitors** > **New Monitor** > **Error Tracking**][3] に移動します。

<div class="alert alert-info"><strong>注:</strong> アカウントごとに Error Tracking モニターはデフォルトで 1,000 件までという上限があります。<a href="/help/">サポートに連絡</a> してこの上限を増やしてください。</div>

### アラート条件を選択する

Error Tracking モニターで設定できるアラート条件は 2 種類あります:

| アラート条件     | 説明    |
| ---  | ----------- |
|New Issue| Issue が初めて発生したとき、またはリグレッションが発生したときにアラートを送信します。例: 新しいエラーで 2 人を超えるユーザーに影響が及んだ場合にサービス向けにアラートを送信します。 |
|High Impact| 影響を受けたエンド ユーザーが多い Issue に対してアラートを送信します。例: このエラーで 500 人を超えるユーザーが影響を受けた場合にサービス向けにアラートを送信します。 |

### アラート条件を定義する

{{< tabs >}}

{{% tab "New Issue" %}}
#### アラート対象の Issue

New Issue モニターは、状態が **For Review** でアラート条件を満たす Issue に対してアラートを送信します。リグレッションは自動的に For Review 状態に移行するため、New Issue モニターで既定で監視されます。状態の詳細については [Issue States][1] を参照してください。

Issue のエラー発生を検索する際は、**All**、**Browser**、**Mobile**、**Backend** のいずれかを選択し、[Error Tracking Explorer 検索][2] と同じロジックで検索クエリを作成します。

<div class="alert alert-info">New Issue モニターは、モニター作成または最終編集後に作成またはリグレッションした Issue のみを対象とします。これらのモニターのルックバック期間は 24 時間です。</div>

#### アラートしきい値を定義する

次のいずれかのオプションを選択します:

{{% collapse-content title="すべての新規 Issue に対してアラート" level="p" %}}


新規 Issue が検出されるとモニターがトリガーします (過去 1 日間でエラー数が 0 より大きい場合)。

{{% /collapse-content %}}

{{% collapse-content title="アラート メトリクスを定義" level="p" %}}

1. 監視したいメトリクスを選択します。最も頻繁に使用されるファセットにアクセスできる 3 つの推奨フィルター オプションがあります:

    - **Error Occurrences**: エラー カウントが `above` の場合にトリガーします。
    - **Impacted Users**: 影響を受けたユーザー メール数が `above` の場合にトリガーします。
    - **Impacted Sessions**: 影響を受けたセッション ID 数が `above` の場合にトリガーします。

    **All** または **Backend** Issue を選択した場合、利用できるオプションは **Error Occurrences** のみです。

    監視に使用するカスタム メジャーを指定することもできます。カスタム メジャーを選択した場合、ファセットの一意の値数が `above` のときにモニターがアラートを送信します。

2. クエリに一致する各 Issue ごとに通知を受け取り、必要に応じて他の属性で結果をグループ化できます (例: クエリに一致する各 Issue を環境ごとに通知)。

3. 各評価ごとに、デフォルトで直近 1 日間 (または任意の時間範囲) のデータをクエリします。

4. モニターがトリガーするしきい値を選択します (デフォルト 0 で初回発生時にトリガー)。

{{% /collapse-content %}}


#### プログラムによる管理

Terraform や当社の Public API を使用したカスタム スクリプトでモニターを管理する場合、モニター クエリにいくつかの句を指定する必要があります:
* **All**、**Browser**、**Mobile**、**Backend** の各 Issue のうち対象とするソースを追加します。フィルターの直後に `.source()` 句を付け、`"all"`、`"browser"`、`"mobile"`、`"backend"` のいずれかを指定してください。**Note**: 一度に指定できるソースは 1 つだけです。
* 新規 Issue モニターでは必ず `.new()` 句を使用してください。

例:
```yaml
error-tracking("{filter}").source("backend").new().rollup("count").by("@issue.id").last("1d") > 0
```

[1]: /ja/error_tracking/issue_states
[2]: /ja/error_tracking/explorer
[3]: /ja/monitors/configuration/#alert-grouping/
{{% /tab %}}

{{% tab "High Impact" %}}
#### アラート対象の Issue

High Impact モニターは、状態が **For Review** または **Reviewed** で、設定したアラート条件を満たす Issue に対してアラートを送信します。詳細は [Issue States][1] を参照してください。

Issue のエラー発生を検索する際は、**All**、**Browser**、**Mobile**、**Backend** のいずれかを選択し、[Error Tracking Explorer 検索][2] と同じロジックで検索クエリを作成します。

#### アラートしきい値を定義します
1. 監視したいメトリクスを選択します。最も頻繁に使用されるファセットにアクセスできる 3 つの推奨フィルター オプションがあります:

    - **Error Occurrences**: エラー カウントが `above` の場合にトリガーします。
    - **Impacted Users**: 影響を受けたユーザー メール数が `above` の場合にトリガーします。
    - **Impacted Sessions**: 影響を受けたセッション ID 数が `above` の場合にトリガーします。

    **All** または **Backend** Issue を選択した場合、利用できるオプションは **Error Occurrences** のみです。

    監視に使用するカスタム メジャーを指定することもできます。カスタム メジャーを選択した場合、ファセットの一意の値数が `above` のときにモニターがアラートを送信します。

2. クエリに一致する各 Issue ごとに通知を受け取り、必要に応じて他の属性で結果をグループ化できます (例: クエリに一致する各 Issue を環境ごとに通知)。

3. 各評価ごとに、デフォルトで直近 1 日間 (または任意の時間範囲) のデータをクエリします。

4. モニターがトリガーするしきい値を選択します (デフォルト 0 で初回発生時にトリガー)。

#### プログラムによる管理

Terraform や当社の Public API を使用したカスタム スクリプトでモニターを管理する場合、モニター クエリにいくつかの句を指定する必要があります:
* **All**、**Browser**、**Mobile**、**Backend** の各 Issue のうち対象とするソースを追加します。フィルターの直後に `.source()` 句を付け、`"all"`、`"browser"`、`"mobile"`、`"backend"` のいずれかを指定してください。**Note**: 一度に指定できるソースは 1 つだけです。
* 高インパクト モニターでは必ず `.impact()` 句を使用してください。

例:
```yaml
error-tracking("{filter}").source("browser").impact().rollup("count").by("@issue.id").last("1d") > 0
```

[1]: /ja/error_tracking/issue_states
[2]: /ja/error_tracking/explorer
{{% /tab %}}
{{< /tabs >}}

### 通知

通知タイトルにトリガーしたタグを表示するには、**Include triggering tags in notification title** をクリックします。

「[一致する属性変数][7]」に加えて、アラート メッセージ通知で使用できる Error Tracking 固有の変数は次のとおりです:

* `{{issue.attributes.error.type}}`
* `{{issue.attributes.error.message}}`
* `{{issue.attributes.error.stack}}`
* `{{issue.attributes.error.file}}`
* `{{issue.attributes.error.is_crash}}`
* `{{issue.attributes.error.category}}`
* `{{issue.attributes.error.handling}}`

**Configure notifications and automations** セクションの詳細については、[通知][5] を参照してください。

**multi alert** を選択すると、Issue ごとに個別の通知を受信できます。これが Error Tracking モニターの推奨エクスペリエンスです。

### モニターのミュート
Error Tracking モニターは [Issue States][2] を利用し、重要度の高い事項にフォーカスしたアラートを維持して、重要でない Issue に起因する雑音を減らします。

**Ignored** Issue は追加の調査や対応が不要なエラーです。Issue を **Ignored** に設定すると、その Issue はモニター通知から自動的にミュートされます。

## トラブルシューティング

### New Issue モニターが Issue の age を考慮しない
`issue.age` と `issue.regression.age` はデフォルトで追加されません。これらを使用するとアラートを見逃す可能性があるためです。たとえば、`env:staging` で最初に Issue が発生し、その 1 週間後に `env:prod` で初めて発生した場合、その Issue は 1 週間前のものと見なされ、`env:prod` での初回発生時にアラートがトリガーされません。

そのため、Datadog では `issue.age` と `issue.regression.age` の使用を推奨していません。ただし、状態ベースのモニター動作が適さない場合は、手動で指定すれば使用できます。

**注**: モニターで `issue.age` と `issue.regression.age` を使用する場合、このフィルター キーは製品間で一貫していません (例: `@issue.age` または `issue.age`)。

### New Issue モニターがノイズを発生しすぎる
New Issue モニターは、状態が **For Review** でアラート条件を満たす Issue に対してアラートを発信します。Issue が適切にトリアージされていない (**Reviewed**、**Ignored**、**Resolved** に設定されていない) 場合、Issue が OK と ALERT を行き来すると同じ Issue でモニターが複数回トリガーされることがあります。

ノイズが多すぎる場合、次の調整を検討してください:
- **アラートをトリアージする**: 適切な場合は Issue を **Reviewed**、**Ignored**、**Resolved** に設定します。
- **評価ウィンドウを拡大する**: デフォルトの評価ウィンドウは 1 日です。エラーがまれ (例: 隔日) に発生する場合、モニターが OK と ALERT を切り替えることがあります。ウィンドウを拡大すると再トリガーを防ぎ、モニターを ALERT 状態に保ちます。
- **アラートしきい値を上げる**: デフォルトのしきい値は `0` で、新規 Issue の初回発生時にアラートが発火します。単発または散発的なエラーによるノイズを減らすには、エラーが複数回発生した後にのみアラートが発火するようにしきい値を上げてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking/issue_states
[2]: /ja/error_tracking/explorer
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /ja/monitors/configuration/#advanced-alert-conditions
[5]: /ja/monitors/notify/
[6]: /ja/logs/
[7]: /ja/monitors/notify/variables/#matching-attributetag-variables