---
algolia:
  tags:
  - follow ups
  - follow-up
  - follow up
aliases:
- /ja/service_management/incident_management/follow-ups/
- /ja/incident_response/incident_management/follow-ups
description: インシデント対応プロセス中に定義されたフォローアップタスクを管理します。
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: ドキュメント
  text: インシデント設定
- link: /service_management/incident_management/integrations/slack/
  tag: ドキュメント
  text: Slack を Datadog Incident Management と統合する
title: インシデントフォローアップ
---
## 概要{#overview}

インシデントフォローアップとは、インシデントが解決した後に実施されるタスクのことです。インシデントの調査中、チームは直近の問題解決には直接関係しないものの、対処が必要な課題に気づくことがあります。サービス復旧を急ぐあまりこうした事項を見失うのではなく、インシデント解決後に対処すべきフォローアップとして記録しておくことができます。

フォローアップとして記録される一般的な例には、以下のようなものがあります。

- **インフラストラクチャーの改善**: インシデント中に発見された、ログの設定ミス、アラートの欠落、不十分な監視範囲
- **技術的負債**: リファクタリングが必要なコード、堅牢化が必要な脆弱なシステム、更新が必要なドキュメント
- **プロセスの改善**: ランブックの不備、不明確なエスカレーションパス、不足しているアクセス権限
- **根本原因の修正**: 一時的な緩和策よりも対処に時間を要する根本的な問題

これらの項目をフォローアップとして記録することで、チームはインシデントの解決に集中しつつ、重要な改善事項が忘れ去られるのを防ぐことができます。

## AI が提案するフォローアップタスク{#ai-suggested-follow-up-tasks}

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI が提案するフォローアップタスクは、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

インシデントの解決後、Incident AI はインシデントチャンネルをスキャンし、対応担当者がインシデント中に言及したフォローアップタスクを特定します。その後、ワンクリックでそれらを確認して作成するように促します。このようにして保存されたタスクは、Datadog Incident Management の [Incident Follow-ups] として表示されます。

AI が提案するフォローアップタスクを表示するには:
1. Datadog で関連するインシデントに移動します。
1. Slack から保存されたすべてのフォローアップタスクを一覧表示するには、[**Post-Incident**] タブを開きます。

## フォローアップを作成して管理する{#create-and-manage-follow-ups}

フォローアップはインシデント発生中のいつでも (解決前であっても) 作成できるため、対応担当者は必要な作業に気づいた時点でそれを記録できます。解決後、Jira または Work Management に[フォローアップをエクスポート](#export-follow-ups)して、チームの既存のワークフローに組み込むことが可能です。

**Datadog から**: インシデントの [**Post-Incident**] タブに移動すると、そのインシデントに関連付けられたすべてのフォローアップを表示、作成、編集、追跡が行えます。

**Slack から**: インシデントチャンネルで `/datadog followup` を実行して新しいフォローアップを作成するか、`/datadog followup list` を実行して既存のフォローアップを表示および管理します。その他の Slack コマンドについては、「[Slack と Datadog Incident Management の統合][5]」を参照してください。

## ポストモーテムノートブックでのフォローアップ{#follow-ups-in-postmortem-notebooks}

テンプレート変数 `{{incident.follow-ups}}` を使用すると、ポストモーテムノートブックにフォローアップを直接表示できます。Datadog Notebooks のポストモーテムテンプレートにこの変数を追加すると、この変数はフォローアップ項目のリストの展開と表示を行います。ノートブック上のリスト表示から、期限の設定、担当者の割り当て、または新しいフォローアップ項目の作成などを行うことができます。詳細については、「[インシデントのポストモーテム][6]」を参照してください。

## フォローアップをエクスポートする{#export-follow-ups}

Incident Management から Work Management または Jira にフォローアップをエクスポートできるため、チームの既存のワークフロー内でそれらを追跡および管理できます。フォローアップを手動でエクスポートすることも、選択した Work Management または Jira プロジェクトにすべてのフォローアップを自動的にエクスポートするように Incident Management を設定することもできます。

フォローアップをエクスポートするには:
1. [**Incident Management 設定 > Follow-Ups**][1] に移動します。
1. **エクスポートテンプレート**を追加または定義します。エクスポートテンプレートは、Datadog がフォローアップをエクスポートおよび同期する方法を記述します。
1. 以下のエクスポートテンプレートタイプがサポートされています。
   1. [Work Management](#work-management-exports)
   1. [Jira](#jira-exports)
1. テンプレートを定義する際、フォローアップとそのインシデントによって提供される変数を使用して、Datadog が結果の Datadog 作業項目または Jira Issue のフィールドをどのように設定するかを構成できます。例:
   * `{{ title }}` はインシデントのタイトル
   * `{{ severity }}` はインシデントの重大度
   * `{{ follow_up_description }}` はフォローアップの説明
   * `{{ follow_up_due_date }}` はフォローアップの期限
1. (オプション) プラットフォーム間でステータスがどのようにマッピングされるかを定義して、両方のプラットフォーム間でステータスの変更が同期されるようにすることができます。フォローアップには、**Open** と **Done** の 2 つのステータスがあります。

### 手動エクスポートと自動エクスポート{#manual-and-automatic-exports}

エクスポートテンプレートを定義した後、以下の 2 つのオプションから選択できます。

| エクスポートオプション      | 説明                                                                                      | 使用場面                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **手動エクスポート**  | インシデントの [Post-Incident] タブから、個々のフォローアップをオンデマンドでエクスポートします。                     | 特定のフォローアップのみを選択的にエクスポートしたい場合に使用します。                           |
| **自動エクスポート** | フォローアップが作成されるたびに、テンプレートを使用してすべてのフォローアップを自動的にエクスポートするように Incident Management を設定します。| デフォルトですべてのフォローアップを外部システムで追跡したい場合に選択します。        |

### Work Management へのエクスポート{#work-management-exports}

フォローアップ項目を [Work Management][2] にエクスポートすると、Datadog 内で直接フォローアップの管理、追跡、分析を行うことができます。たとえば、以下のことが可能です。

* 特定のユーザーに割り当てられた未解決のフォローアップ作業項目をすべて Datadog で表示する
* チーム別のフォローアップ作業項目を表示する Datadog ダッシュボードを作成する
* Jira や ServiceNow など、Work Management と統合されている外部アプリケーションに、これらの作業項目を自動的に同期する

Datadog がインシデントのフォローアップを Work Management にエクスポートすると、エクスポートテンプレートで選択したプロジェクト内に、そのフォローアップ用の作業項目が作成されます。

**ステータスの同期:** Datadog は、エクスポートテンプレートで定義したマッピングに従い、フォローアップと作業項目の間でステータスを**双方向に**同期します。

**担当者の同期:** Datadog は、フォローアップと作業項目の間で担当者を**双方向に**同期します。作業項目に設定できる担当者は 1 名のみであるため、フォローアップの担当者のうち、最初の 1 名のみが作業項目に割り当てられます。


### Jira へのエクスポート{#jira-exports}

フォローアップを Jira にエクスポートするには、まず Jira 統合をインストールする必要があります。詳細については、「[Datadog Incident Management と Jira の統合][4]」を参照してください。

Datadog がインシデントのフォローアップを Jira にエクスポートすると、エクスポートテンプレートで選択したプロジェクト内に、そのフォローアップ用の Jira Issue が作成されます。

**ステータスの同期:** インシデントのフォローアップをクローズまたはオープンすると、Datadog はエクスポートテンプレートで定義したマッピングに基づいて、接続されている Jira Issue のステータスを自動的に同期します。**これは一方向の同期です。**

双方向の同期が必要な組織は、Jira プロジェクトとの双方向同期が設定された Work Management プロジェクトに対してエクスポートを行う必要があります。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=follow-ups
[2]: /ja/service_management/case_management
[4]: /ja/integrations/jira/
[5]: /ja/service_management/incident_management/integrations/slack/#slack-commands
[6]: /ja/incident_response/incident_management/post_incident/postmortems