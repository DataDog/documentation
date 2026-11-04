---
description: ポストモーテムを生成および管理して、インシデントを記録し、継続的な改善を促進します。
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: ドキュメント
  text: ポストモーテムテンプレートの構成
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: ドキュメント
  text: インシデント変数リファレンス
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: ドキュメント
  text: インシデントのフォローアップタスクを管理
- link: /notebooks/
  tag: ドキュメント
  text: Datadog Notebooks
title: インシデントポストモーテム
---
## 概要 {#overview}

ポストモーテムは、インシデント中に何が起こったのか、なぜ起こったのか、そして再発を防ぐためにどのようなアクションを取るべきかを記録する構造化されたドキュメントです。インシデント後にポストモーテムを生成すると、チームは以下のことができます。

- 今後の参照に備えた根本原因と影響の記録
- 修正作業に対する責任の明確化
- 組織の知識の蓄積による、将来のインシデントの頻度と深刻度の軽減

Datadog は、定義したテンプレートを使用して、インシデントデータをポストモーテムに自動的に入力します。ポストモーテムを [Datadog Notebooks][1]、[Confluence][2]、または [Google Drive][3] に作成できます。Datadog Notebooks として生成されたポストモーテムは、[Post-Incident] (インシデント後) タブに直接埋め込まれます。インシデント画面を離れることなく、ポストモーテムのステータスと所有者を確認、編集、追跡できます。

## 権限 {#permissions}

- ポストモーテムを生成するには、**Incidents Write** 権限が必要です。
- Datadog Notebooks で生成されたポストモーテムを表示するには、**Notebooks Read** 権限が必要です。

<div class="alert alert-danger">プライベートインシデントの場合、Datadog Notebooks で生成されたポストモーテムは、プライベートインシデントへのアクセス権の有無にかかわらず、Notebooks Read 権限を持つすべてのユーザーがアクセスできます。機密データを含むインシデントのポストモーテムを生成する際は、この点に留意してください。</div>

## ポストモーテムの生成 {#generate-a-postmortem}

{{< img src="/incident_response/incident_management/post_incident/postmortems/post_incident_tab_generate_postmortem.png" alt="[Generate Postmortem] (ポストモーテムを生成) ボタン、テンプレートプレビュー、[Follow-Ups] (フォローアップ) サイドバーが表示されている [Post-Incident] タブ" style="width:100%;" >}}

インシデントが解決された後、インシデントの [**Post-Incident**] タブからポストモーテムを生成できます。

ポストモーテムを生成するには:

1. インシデントを開き、[**Post-Incident**] タブに移動します。
1. ポストモーテムテンプレートを選択します。
1. [**Generate Postmortem**] (ポストモーテムを生成) をクリックします。Datadog は、テンプレートで構成された保存先にポストモーテムを作成し、インシデントにリンクします。

### Workflow Automation でポストモーテムを生成 {#generate-a-postmortem-with-workflow-automation}

[**Generate postmortem**] アクションを使用して、[ワークフロー][5] からポストモーテムを生成することもできます。このアクションは、インシデントとポストモーテムテンプレートを受け取り、生成されたポストモーテムをそのインシデントに添付します。このパスを使用して、インシデントの解決後など、自動化されたインシデント後のプロセスの一部としてポストモーテムを作成します。

<div class="alert alert-warning">ポストモーテムテンプレートで使用できる AI 生成の変数 (例: <code>{{incident.ai_summary}}</code>) は、[<strong>Post-Incident</strong>] タブから生成されたポストモーテムでのみ値が設定されます。[<strong>Generate postmortem</strong>] ワークフローアクションで生成されたポストモーテムでは、これらの変数は空のまま表示されます。AI 生成コンテンツを含めるには、<strong>Post-Incident</strong> タブからポストモーテムを生成します。</div>

ポストモーテムテンプレートで使用可能な変数の全リストについては、[Templates][4] および [インシデント変数][6] を参照してください。

## ポストモーテムの表示と編集 {#view-and-edit-a-postmortem}

保存先に応じて、ポストモーテムを表示および編集します。

- **Datadog Notebooks**: [**Post-Incident**] タブに埋め込まれます。Datadog を離れることなく表示および編集できます。複数のユーザーが、カーソルマーカーを表示しながら同時に編集できます。インラインコメントを追加できます。変更内容は基にとなるノートブックに反映されます。
- **Confluence**: Confluence で編集します ([**Post-Incident**] タブのリンクをクリックして Confluence ワークスペースを開きます)。
- **Google Drive**: Google Docs で編集します ([**Post-Incident**] タブのリンクをクリックして Google Docs を開きます)。

## ポストモーテムのステータスと所有者 {#postmortem-status-and-owner}

ポストモーテムには、完了状況の追跡と責任の明確化に役立つ 2 つのフィールドがあります。

| フィールド | 説明 | デフォルト |
|---|---|---|
| **Status (ステータス)** | ポストモーテムの現在の完了状態です。| Draft (ドラフト) |
| **Owner (所有者)** | ポストモーテムの完了に責任を持つ担当者です。| ポストモーテムを作成したユーザー |

ポストモーテムのステータス値は以下のとおりです。

| ステータス | 説明 |
|---|---|
| **Draft (ドラフト)** | ポストモーテムは作成中です。|
| **In Review (レビュー中)** | ポストモーテムはレビューの準備ができています。|
| **Completed (完了)** | ポストモーテムは完了しています。|

ポストモーテムの所有者は、Datadog 組織内の任意のユーザーに再割り当てできます。所有者は、インシデントの対応チームにおいて、インシデントコマンダーや担当者と並んで表示されるシステムロールです。

## ポストモーテムテンプレートの構成{#configure-postmortem-templates}

保存先やテンプレート変数を含むポストモーテムテンプレートの作成または管理については、[Templates][4] を参照してください。

## 既存のポストモーテムを添付{#attach-an-existing-postmortem}

インシデントのポストモーテムが Datadog の外部にすでに存在する場合、またはインシデントが開始される前に作成された場合は、新しいものを作成せずに、[**Post-Incident**] タブから直接リンクできます。リンクするポストモーテムには、Datadog Notebook、Confluence ページ、Google ドキュメントのほか、任意の外部ドキュメントの URL を指定できます。

既存のポストモーテムを添付するには、[**Post-Incident**] タブを開き、[**Attach existing postmortem**] (既存のポストモーテムを添付) オプションを使用してリンクを追加します。

## ポストモーテムの削除 {#remove-a-postmortem}

インシデントからポストモーテムを削除するには、[**Post-Incident**] タブを開き、ポストモーテムのエントリーを見つけて、削除するオプションを選択します。リンクを削除しても、元のドキュメントは削除されません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/notebooks/
[2]: /ja/integrations/confluence/
[3]: /ja/integrations/google_drive/
[4]: /ja/incident_response/incident_management/setup_and_configuration/templates
[5]: /ja/actions/workflows/
[6]: /ja/incident_response/incident_management/setup_and_configuration/variables/#incident-variables