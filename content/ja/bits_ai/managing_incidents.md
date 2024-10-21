---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-for-incident-management/
  tag: ブログ
  text: Bits AI で最新のインシデント情報を常に把握
- link: bits_ai/
  tag: ドキュメント
  text: Bits AI 概要
- link: bits_ai/getting_started
  tag: ドキュメント
  text: はじめに
- link: bits_ai/query_examples
  tag: ドキュメント
  text: 自然言語クエリの例
title: インシデントの管理
---

## 概要

<div class="alert alert-warning">以下の機能は <a href="https://www.datadoghq.com/product/incident-management/">Datadog Incident Management</a> 製品の一部です。</div>

Bits AI は、インシデント管理プロセスを簡素化し、コラボレーションを改善し、インシデント対応者に貴重なサポートを提供することで、効率的なインシデント解決に有益なツールとなります。

## 前提条件

- お使いの Datadog アカウントが Slack に接続されている必要があります。`/dd` connect コマンドを実行すると、このプロセスが自動的に開始され、プロンプトに従って完了できます。
- **[Incident > Settings > Integrations][3] > Slack** で、**Push Slack channel messages to the incident timeline** (Slack チャンネルのメッセージをインシデントタイムラインにプッシュする) と **Activate Bits AI features in incident Slack channels for your organization** (組織のインシデント Slack チャンネルで Bits AI 機能を有効にする) のトグルを有効にします。これにより、Datadog は Slack の会話をインシデントタイムラインに取り込み、要約やポストモーテムを生成できます。**注**: Bits AI のインシデント管理機能は、単一の Slack ワークスペース内の 1 つの Datadog 組織にのみ有効化できます。
- 任意の Slack チャンネルから Bits AI にインシデントについて質問するには、そのチャンネルに Bits AI を招待する必要があります。`@Datadog` コマンドを実行し、画面上の指示に従ってください。

{{< img src="bits_ai/managing_incidents/bitsai_slack_prerequisites.png" alt="Datadog における Slack インテグレーションの設定" style="width:90%;">}}

## インシデントの要約を表示する

Slack でインシデントチャンネルに参加すると、自動的にインシデントの要約を受け取ります。チャンネルが Incident Management に接続されており、**少なくとも 10 件のメッセージ**がある必要があります。この要約はあなただけに見え、リロードやデスクトップとモバイルアプリ間、セッション間では持続しません。

いつでも、インシデントチャンネル内で `@Datadog Give me a summary of this incident` と尋ねることで、新しい要約を要求できます。他のチャンネルからも、インシデント番号を参照して要約を求めることができます (例: `@Datadog Give me a summary of incident-262`)。

## 全インシデント履歴を検索して質問する

Bits AI に探しているインシデントを見つけるよう依頼できます。例えば、
- `@Datadog How many incidents are currently ongoing?` (@Datadog 現在進行中のインシデントは何件ありますか？)
- `@Datadog Show me all Sev-1 incidents that occurred in the past week` (@Datadog 過去 1 週間に発生した Sev-1 インシデントをすべて表示してください)

その後、さらなる調査を行い、`@Datadog What was the root cause of incident-123?` (@Datadog incident-123 の根本原因は何ですか？) や `@Datadog What remediation actions did the responders take in incident-123?` (@Datadog インシデント123において、対応者はどのような修正アクションを行いましたか？) のように、これらのインシデントについて質問できます。

Bits AI は関連するインシデントのセマンティック検索も行えます。インシデントに対応している場合、現在のインシデントに類似した他のアクティブなインシデントを見つけるように Bits AI に依頼できます (`@Datadog Are there any related incidents?` (@Datadog 関連するインシデントはありますか？))。Bits AI は過去 2 時間以内にアクティブだったインシデントを探します。また、Bits AI に検索する期間を指定することもできます。`@Datadog Find me incidents related to DDOS attacks from the past month` (@Datadog 過去 1 か月間の DDOS 攻撃に関連するインシデントを見つけてください) と言えば、Bits AI は過去 1 か月のアクティブおよび解決済みの DDOS インシデントを返します。

また、インシデントが宣言される前に問題があると疑われる場合、`@Datadog A customer is unable to check out. Is there an incident?` (@Datadog お客様がチェックアウトできません。インシデントが発生しているのでしょうか？) や `@Datadog Are there any incidents now impacting the payments service?` (@Datadog 現在、決済サービスに影響を与えているインシデントはありますか？) のような質問を Bits AI にすることができます。

## インシデントを管理する

Datadog の Web アプリにアクセスせずに、Slack で Bits AI に以下を依頼できます。
- インシデントを開く: `@Datadog Declare an incident` (@Datadog インシデントを宣言してください)
- インシデントの重大度レベルを変更する: `@Datadog Update this incident to SEV-3` (@Datadog このインシデントを SEV-3 に更新してください)
- インシデントのステータスを変更する: `@Datadog Mark this incident as stable` (@Datadog このインシデントを「安定」とマークしてください)

## ポストモーテムの初稿を生成する

AI 支援によるポストモーテムのドラフトを生成するには

1. Datadog でポストモーテムを生成したいインシデントに移動します。
2. インシデントが解決済みであり、そのタイムラインに 10 件以上のメッセージがあることを確認します。
3. **Generate Postmortem** ボタンをクリックします。
4. 標準の **General incident with AI content** テンプレートまたは作成した[カスタムテンプレート](#customize-postmortem-templates-with-ai-incident-variables)を選択します。
6. ポストモーテムが生成されるまで最大 1 分かかります。この間、タブを閉じないでください。
7. 生成されたポストモーテムを確認します。AI が生成したポストモーテムは、インシデント対応者が作業を開始するための初稿として使用されるもので、人間による修正が必要です。

## AI インシデント変数を使用してポストモーテムテンプレートをカスタマイズする

1. [**Service Mgmt > Incidents > Settings > Postmortems**][1] に移動します。
2. **New Postmortem Template** をクリックし、提供されたインシデント変数を使用してテンプレートをカスタマイズします。
   - `ai` で始まる変数は固定値ではなく AI 生成のコンテンツを生成します。6 つの `ai` 変数があります: `{{incident.ai_action_items}}`、`{{incident.ai_customer_impact}}`、`{{incident.ai_key_timeline}}`、`{{incident.ai_lessons_learned}}`、`{{incident.ai_summary}}`、`{{incident.ai_system_overview}}`。
    - 各変数の前には見出しをつける必要があります。
3. テンプレートを保存し、ポストモーテム生成時のテンプレートオプションとして利用できるようにします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/incidents/settings#Postmortems
[2]: https://app.datadoghq.com/incidents
[3]: https://app.datadoghq.com/incidents/settings#Integrations