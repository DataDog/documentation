---
title: インシデント管理
kind: ドキュメント
disable_sidebar: true
description: インシデントの作成と管理
---
{{< img src="monitors/incidents/incidents-top-1.png" alt="インシデント管理"  style="width:80%;">}}

## 概要

組織のサービスの中断につながる可能性のあるイベントはすべてインシデントと見なすことができます。多くの場合、こうしたイベントを処理するためのフレームワークを用意する必要があります。Datadog のインシデント管理機能は、組織がインシデントを効果的に識別して軽減できるシステムを提供します。

インシデントは、収集しているメトリクス、トレース、ログとともに Datadog に存在します。自分に関連するインシデントを表示してフィルタリングできます。

Datadog パラダイムでは、次のいずれかがインシデントを宣言するための適切な状況です。

* 問題が顧客またはサービスに影響を及ぼしている、またはその可能性があります。
* あなたは、インシデントを呼び出す必要があるかどうかがわかりません。他の人に通知し、重大度を適切に上げます。

<div class="alert alert-warning">
<a href="https://app.datadoghq.com/incidents">インシデント管理</a>は現在ベータ版で、すべてのお客様にご利用いただけます。詳細については、sales@datadoghq.com にお問い合わせください。
</div>

## 使用方法

インシデント管理にはインストールは必要ありません。インシデントを表示するには、[Incidents][1] ページに移動して、進行中のすべてのインシデントのフィードを確認します。[Incident Settings][2] で、すべてのインシデントに表示される追加のフィールドを構成できます。

### インシデントの作成

インシデントはグラフから直接宣言できます。Incidents ページの右上に移動して、“New Incident” をクリックすることもできます。次のダイアログボックスが表示されます。

{{< img src="monitors/incidents/create-1-1.png" alt="New Incident"  style="width:80%;">}}

**Severity**: インシデントの重大度を、SEV-1 (最も重大) から SEV-5 (最も重大ではない) までで示します。インシデントが初期調査中で、重大度がまだわからない場合は、UNKNOWN を選択します。

* SEV-1: 重大な影響
* SEV-2: 大きな影響
* SEV-3: 中程度の影響
* SEV-4: 小さい影響
* SEV-5: 軽微な問題
* UNKNOWN: 初期調査

**Title**: インシデントにわかりやすいタイトルを付けます。

**Signals**: インシデントを宣言している理由。これは、グラフやログなどの視覚情報にすることができます。

**Incident commander**: この人物はインシデント調査のリーダーとして割り当てられます。

**Additional notifications**: 他のチームまたは人々に通知します。

“Declare Incident” をクリックして、インシデントの作成を完了します。

### ワークフローの例

#### 1. 問題を発見する

ダッシュボードを確認しているシナリオを考えてみます。ある特定のサービスが特に高いエラー数を示していることに気づきました。ウィジェットの右上にある Export ボタンを使用して、インシデントを宣言できます。

{{< img src="monitors/incidents/workflow-1-graph-1.png" alt="グラフから"  style="width:80%;">}}

#### 2. インシデントを宣言してチームを編成する

New Incident モーダルを使用してチームを編成し、通知します。インシデント作成元のグラフは、自動的にシグナルとしてアタッチされます。この問題の解決を開始するために必要なコンテキストをチームに与える他のシグナルをアタッチします。Slack と PagerDuty のインテグレーションにより、これらのサービスを通じて通知を送信できます。

{{< img src="monitors/incidents/workflow-2-modal-1.png" alt="New Incident"  style="width:60%;">}}

#### 3. コミュニケーションを取り、トラブルシューティングを開始する

[Datadog Slack アプリ][3]がインストールされている場合、Slack インテグレーションによりインシデント専用の新しいチャネルが自動的に作成されるため、チームとのコミュニケーションを統合してトラブルシューティングを開始できます。

Slack をご利用の EU 外のお客様は、Datadog Slack アプリに[ベータアクセスでサインアップ][4]してください。Slack をご利用の EU 内のお客様は、support@datadoghq.com にメールを送信して、Slack アプリに関する最新情報を入手してください。

{{< img src="monitors/incidents/workflow-3-slack-1.png" alt="コミュニケーション"  style="width:80%;">}}

#### 4. インシデントを更新する

状況の変化に応じてインシデントを更新します。問題が軽減されたことを示す場合はステータスを `Stable` に設定します。この問題が顧客にどのように影響したかを組織に知らせたい場合は、顧客影響フィールドを設定します。次に、インシデントが完全に修正されたら、ステータスを `Resolved` に設定します。オプションの 4 番目のステータスとして `Completed` があります。これは、すべての修正手順が完了したかどうかを追跡するために使用できます。このステータスは、[Incident Settings][2] で有効にできます。

{{< img src="monitors/incidents/workflow-4-update-2.png" alt="インシデントを更新"  style="width:60%;">}}

各インシデントの `Properties` セクションでステータスと重大度を更新できます。

インシデントのステータスが変化すると、Datadog は次のように解決までの時間を追跡します。

| ステータスの遷移 | 解決されたタイムスタンプ |
| ------------------ | -----------|
| `Active` から `Resolved`、`Active` から `Completed` | 現在の時刻 |
| `Active` から `Resolved` から `Completed`、`Active` から `Completed` から `Resolved` | 変更なし |
| `Active` から `Completed` から `Active` から `Resolved` | 最後の遷移にオーバーライド |

#### 5. インシデントをフォローアップして学ぶ

事後分析文書にリンクし、問題点を正確に振り返り、フォローアップタスクを追加します。Datadog [Notebooks][5] で作成された事後分析は、ライブコラボレーションをサポートします。既存のノートブックにリンクするには、`Other Docs` の下のプラスをクリックします。リンクされたノートブックをクリックして、チームメイトとリアルタイムで編集します。

{{< img src="monitors/incidents/workflow-5-postmortem-1.png" alt="事後分析"  style="width:60%;">}}



[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /ja/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: https://app.datadoghq.com/incidents/ddslackapp
[5]: https://app.datadoghq.com/notebook/list
