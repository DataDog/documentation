---
aliases:
- /ja/bits_ai/managing_incidents/
- /ja/bits_ai/bits_ai_sre/coordinate_incidents
- /ja/service_management/incident_management/incident_ai/
- /ja/incident_response/incident_management/incident_ai
description: インシデント AI を使用して、アクティブなインシデントの調査、プロアクティブなサマリーの受信、関連する問題の検出、AI を活用した根本原因分析のトリガーを行う方法を学びます。
further_reading:
- link: /bits_ai/bits_investigation/
  tag: ドキュメント
  text: Bits Investigation について
- link: /incident_response/incident_management/post_incident/postmortems
  tag: ドキュメント
  text: AI アシストによるポストモーテムを生成する
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: ドキュメント
  text: 通知およびポストモーテムテンプレートで AI 変数を構成する
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: ブログ
  text: Datadog Incident Response の AI で調査を加速する
title: インシデント AI
---
## 概要 {#overview}

インシデント AI は、情報収集を自動化して関連するコンテキストを提示することで、対応者がアクティブなインシデントをより迅速に調査できるよう支援します。Slack および Datadog プラットフォームで動作し、プロアクティブなサマリーの提供、関連インシデントの検出、インシデント履歴に対する会話型クエリを可能にすることで、チームが解決に集中できるようにします。

インシデント AI を有効にするには、Datadog を Slack に接続し、インシデント Slack チャンネルで Bits AI を有効にします。セットアップ手順については、[Incident Management 用の Slack インテグレーション][1]を参照してください。

調査フェーズ以外に適用される AI 機能については、以下を参照してください。
- [テンプレート][2]: 通知およびポストモーテムテンプレートに AI 変数を追加する
- [ポストモーテム][3]: AI 支援によるポストモーテムドラフトを生成する

## プロアクティブなインシデントサマリー {#proactive-incident-summaries}

Slack でインシデントチャンネル (Datadog Incident Management に接続済み) に参加すると、インシデント AI は、寄与要因、影響、問題、修復など、インシデントに関する主要な情報を含むサマリーを自動的に投稿します。これは、`/dd incident summary` を使用してアドホックにリクエストすることもできます。このサマリーは、自分にのみ表示されます。

インシデントが解決済みに変更されると、インシデント AI は最終的なサマリーを投稿します。これは、チャンネル内の全員に表示されます。

{{< img src="incident_response/incident_management/investigate/incident_ai/incident_summary.png" alt="Slack でのインシデントサマリーの例" style="width:100%;" >}}

## 関連インシデントの検出 {#related-incident-detection}

インシデント AI は、関連するインシデントが 20 分以内に宣言された場合に自動的にフラグを立てて、より広範なシステム上の問題を特定する上で役立ちます。

## インシデント AI とのチャット {#chat-with-incident-ai}

自然言語のプロンプトを使用して、Slack から情報をリクエストしたりアクションを実行したりできます。

| 機能                      | プロンプト例                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| インシデントを宣言する                | `@Datadog Declare an incident`                                                                                                                  |
| 重大度を変更する                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| ステータスを変更する                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| 新しいサマリーをリクエストする                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**注**: プライベートインシデントは要約されません。      |
| インシデント履歴を検索する            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| 特定のインシデントの詳細を確認する       | `@Datadog What was the root cause of incident-123?`<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| 関連するインシデントを検索する             | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDoS attacks from the past month`                       |
| 早期検出に関する問い合わせ            | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |

## Bits Investigation をトリガーする {#bits-ai-investigation}

インシデント対応ワークフローを離れることなく、インシデント Slack チャンネルまたは Datadog Incident Management ウェブ UI から直接 Bits Investigation を開始できます。これにより、インシデント発生中のコンテキストスイッチが減少し、AI エージェントがチームと同じ共有コンテキストを使用して、チームとともに調査できるようになります。

Bits Investigation は組織で有効にする必要があり、調査をトリガーできるのは**適切に構成された Datadog Incident Management Slack チャンネル**からのみです。インシデント調査フローは、システムが有効なインシデントチャンネルを検出したときにのみアクティブになります。

Slack から、インシデント発生中に以下のいずれかの方法で調査を開始します。

- インシデントアクションの **Bits AI で調査する**をクリックします。
- `/dd incident investigate` スラッシュコマンドを実行します。
- インシデントチャンネルで `@Datadog investigate` と入力します。

`@Datadog investigate` を使用すると、追加のコンテキストをインラインで含めることができ、最初からエージェントのスコープを絞り込む上で役立ちます。

| プロンプト                      | 動作                                    |
|-----------------------------|---------------------------------------------|
| `@Datadog investigate we're seeing high error rates in the payments service since the deploy at 2pm` | 対応者が提供したフォーカスエリアで調査をトリガーする |
| `@Datadog investigate, I think this is related to the redis cache` | 仮説シードで調査をトリガーする |

トリガーされると、エージェントはインシデントのタイムライン、リンクされたテレメトリ信号 (トレース、メトリクス、ログ)、およびプロンプトで提供したコンテキストを自動的に取り込みます。その後、更新をスレッドへの返信としてチャンネルに投稿し、調査が完了すると最終的な根本原因の要約と推奨される次のステップをチャンネル全体に表示します。

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_slack.png" alt="根本原因の検出結果および View Full Investigation ボタンと、完了済みの Bits Investigation が表示された Datadog インシデント Slack チャンネル。" >}}

**ウェブ UI から**、インシデント概要ページの調査セクションから調査を直接トリガーできます。

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_web.png" alt="調査セクションに完了済みの Bits Investigation と View Investigation ボタンが表示された Incident Management の概要ページ。" >}}

トリガーされると、調査はインシデントウェブ UI に埋め込まれ、Bits Investigation がページ内の担当者ロールセクションに対応者として表示されます。

調査ワークフローの完全なウォークスルーについては、[Bits Investigation][4] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /ja/incident_response/incident_management/setup_and_configuration/templates
[3]: /ja/incident_response/incident_management/post_incident/postmortems
[4]: /ja/bits_ai/bits_investigation