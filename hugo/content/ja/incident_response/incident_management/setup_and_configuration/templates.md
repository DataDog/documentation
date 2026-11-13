---
aliases:
- /ja/service_management/incident_management/incident_settings/templates/
- /ja/incident_response/incident_management/incident_settings/templates
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: ドキュメント
  text: インシデント変数リファレンス
- link: /incident_response/incident_management/notification
  tag: ドキュメント
  text: Incident Management Notifications について
- link: /incident_response/incident_management/post_incident/postmortems
  tag: ドキュメント
  text: インシデントポストモーテム
title: テンプレート
---
## 概要 {#overview}

動的テンプレートは、インシデント対応と運用効率を向上させるための包括的なフレームワークを提供します。アドホック通知と自動通知の両方にカスタムメッセージテンプレートを使用することで、緊迫したインシデント発生時に時間を節約できます。これにより、メッセージの正確性が一貫して保たれ、関連するコンテキストが含まれるようになるため、受信者はより迅速に状況を理解して行動を起こすことができます。

ポストモーテム分析用のカスタマイズ可能な設定は、貴重な情報提供と長期的な最適化に役立ちます。レポートやダッシュボードを組織固有のコンテキストに合わせて調整することで、繰り返し発生する問題を特定し、予防措置をより効果的に実施できます。

## メッセージ {#messages}

メッセージテンプレートは、[手動インシデント通知][1]や自動通知ルールで使用できる、動的で再利用可能なメッセージです。メッセージテンプレートでは、[テンプレート変数][4] (`{{incident.severity}}` など) を使用して、通知対象のインシデントから対応する値を動的に挿入します。メッセージテンプレートは Markdown に対応しているため、テキストの書式設定、表、インデント付きリスト、ハイパーリンクをインシデント通知に含めることができます。多数のメッセージテンプレートを整理しやすくするため、各テンプレートの作成時にはカテゴリーの指定が必須となります。

メッセージテンプレートを作成するには、以下の手順を実行します。

1. **+ New Message Template** ボタンをクリックします。
2. テンプレートに名前を付けます。
3. 新規または既存のカテゴリーに割り当てます。
4. テンプレートに件名を付けます (メールの場合)。
5. テンプレートのメッセージを書き込みます。
6. [**Save**] をクリックします。

**注:** メッセージのタイトルと本文の両方でテンプレート変数がサポートされています。

### 通知用 AI 変数 {#ai-variables-for-notifications}

インシデント AI は、AI が生成したコンテンツで通知内の主要な詳細情報を動的に入力できます。メッセージの本文に以下のいずれかの変数を挿入します。

| フィールド | 変数 |
|---|---|
| AI Contributing Factors | `{{incident.ai_contributing_factors}}` |
| AI Impact | `{{incident.ai_impact}}` |
| AI Issue | `{{incident.ai_issue}}` |
| AI Remediation | `{{incident.ai_remediation}}` |

{{< img src="incident_response/incident_management/investigate/incident_ai/message_template_variables.png" alt="AI 変数を含む新しいメッセージテンプレート" style="width:80%;" >}}

## ポストモーテム {#postmortems}

ポストモーテムテンプレートは、ポストモーテムの構造と内容を定義します。ポストモーテムを生成すると、Datadog はインシデントからのデータでテンプレートへの入力を自動的に行います。[テンプレート変数][4] (例: `{{incident.severity}}`) を使用して、含まれるインシデントデータを制御します。

ポストモーテムテンプレートを作成するには、以下の手順を実行します。

1. [**Incident Management 設定 > ポストモーテムテンプレート**][8]に移動し、[**+ New Postmortem Template**] をクリックします。
2. テンプレートに名前を付けます。
3. [場所を保存する] を選択します ([場所を保存する](#save-location)を参照)。
4. テンプレートの内容を書き込みます (利用可能なテンプレート変数はテキストボックスの右側に一覧表示されます)。
5. (オプション) テンプレートをデフォルトとして設定します。
6. [**Save**] をクリックします。

### 場所を保存する {#save-location}

生成されたポストモーテムドキュメントの保存先を選択します。

| オプション | 要件 |
|---|---|
| **Datadog Notebooks** | 追加のセットアップは不要です。|
| **Confluence** | [Confluence インテグレーション][3]が必要です。送信先として選択する前に、インテグレーション設定で Confluence アカウントを構成してください。|
| **Google Drive** | [Google Drive インテグレーション][6]が必要です。送信先として選択する前に、インテグレーション設定で Google アカウントを構成してください。|

### ポストモーテム用テンプレート変数 {#template-variables-for-postmortems}

テンプレートは、ポストモーテムが生成される際にインシデントデータが入力される変数をサポートしています。利用可能な変数の全リストについては、[インシデント変数][4]リファレンスを参照してください。

{{% collapse-content title="標準変数" level="h4" %}}
標準変数はインシデントフィールドから直接取得され、定義済みの[カスタムプロパティフィールド][7]も含みます。

| 変数 | 説明 |
|---|---|
| `{{incident.title}}` | The incident title |
| `{{incident.state}}` | The current incident state (for example: `active`, `stable`, `resolved`) |
| `{{incident.severity}}` | The incident severity level |
| `{{incident.commander}}` | インシデントコマンダーの名前、または名前が設定されていない場合はメールアドレスかハンドル名 |

{{% /collapse-content %}}

{{% collapse-content title="期間変数" level="h4" %}}
インシデントの応答時間を含め、過去の平均値と比較します。

```text
Time to Detect: {{incident.time_to_detect}}
Time to Internal Response: {{incident.time_to_internal_response}}
Time to Repair: {{incident.time_to_repair}}
Time to Resolve: {{incident.time_to_resolve}}
Time from Detect to Resolve: {{incident.time_from_detect_to_resolve}}
Mean Time to Resolve (past 30 days): {{incident.mean_time_to_resolve_30_days}}
```

個別の所要時間は、計算できない場合、またはゼロや負の値である場合に `N/A` として表示されます。平均所要時間は、対象となるインシデントに正の値がない場合に `N/A` として表示されます。すべての変数と平均化期間については、[インシデント変数リファレンス][9]を参照してください。
{{% /collapse-content %}}

{{% collapse-content title="インシデントカード変数" level="h4" %}}
インシデントカード変数 (`{{incident.card}}`) は、インシデントフィールドをリアルタイムで反映するサマリーカードを埋め込みます。インシデントフィールドが変更されると、ポストモーテム内のカードが自動的に更新されます。カードには、ポストモーテムステータスとオーナーフィールドが含まれます。

**注**: インシデントカードは、Datadog Notebooks でのみサポートされています。
{{% /collapse-content %}}

{{% collapse-content title="フォローアップ変数" level="h4" %}}
フォローアップ変数 (`{{incident.follow-ups}}`) は、ポストモーテムノートブックにインシデントフォローアップのリストを埋め込みます。ノートブックのリストビューから、期限の設定、項目の割り当て、または新しいフォローアップ項目の作成を行うことができます。変更はインシデントのフォローアップリストに反映されます。

**注**: フォローアップ変数は、Datadog Notebooks でのみサポートされています。
{{% /collapse-content %}}

{{% collapse-content title="AI 変数" level="h4" %}}
AI 変数は Bits AI を使用して、インシデントデータに基づいた推奨コンテンツを生成します。AI 変数を含むポストモーテムを生成すると、Datadog は保存前に承認、編集、または拒否できる推奨値を提示します。

{{% incident-ai-postmortem-variables %}}

これらの変数を使用するには、以下を実行します。
1. テンプレートの本文に変数を追加します。
1. ポストモーテムを生成する際に、**AI コンテンツを使用した一般的なインシデント**のすぐに使えるテンプレート、または AI 変数を含むカスタムテンプレートを選択します。
1. AI 生成コンテンツが反映されるまで最大 1 分待ちます。Datadog では、ポストモーテムを共有する前に、AI が生成したコンテンツを確認および修正することを推奨しています。

**注**:
- AI 変数の前にはセクションヘッダーが必要です。
- AI 変数がコンテンツを生成するには、インシデントタイムラインに少なくとも 10 件のメッセージが含まれている必要があります。

{{% /collapse-content %}}

これらのテンプレートを使用したポストモーテムの生成に関する詳細については、[インシデントポストモーテム][5]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/incident_management/notifications
[2]: /ja/notebooks/
[3]: /ja/integrations/confluence/
[4]: /ja/incident_response/incident_management/setup_and_configuration/variables
[5]: /ja/incident_response/incident_management/post_incident/postmortems
[6]: /ja/integrations/google_drive/
[7]: /ja/incident_response/incident_management/setup_and_configuration/property_fields
[8]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[9]: /ja/incident_response/incident_management/setup_and_configuration/variables/#incident-variables