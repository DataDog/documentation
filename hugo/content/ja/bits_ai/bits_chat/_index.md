---
aliases:
- /ja/bits_ai/getting_started/
- /ja/bits_ai/chat_with_bits_ai
- /ja/bits_ai/bits_assistant/
- /ja/tracing/guide/latency_investigator/
description: Datadog の Bits Chat を使用して、自然言語を使って監視可能性データを探索し、行動を起こします。
further_reading:
- link: bits_ai/
  tag: ドキュメント
  text: Bits AI 概要
- link: /incident_response/incident_management/investigate/incident_ai
  tag: ドキュメント
  text: インシデント AI を使用してインシデントを調整する
- link: /cloud_cost_management/cloud_cost_skill/
  tag: ドキュメント
  text: Bits Chat の Cloud Cost スキル
- link: /account_management/billing/ai_credits/
  tag: ドキュメント
  text: AI クレジット
- link: https://www.datadoghq.com/blog/datadog-mcp-apps/
  tag: ブログ
  text: 'Datadog MCP Apps: AI ワークフロー向けインタラクティブ体験'
- link: https://www.datadoghq.com/blog/introducing-bits-chat/
  tag: ブログ
  text: Bits Chat を使用して Datadog 全体で検索や操作を行い、より迅速に問題を解決
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: ブログ
  text: Bits Chat の Cloud Cost スキルを使用してコストに関するあらゆる質問により迅速に回答
- link: https://www.datadoghq.com/blog/bits-chat-slack-incident-response/
  tag: ブログ
  text: 'アラートから解決まで: Slack の Bits Chat でインシデントを管理'
title: Bits Chat
---
## 概要{#overview}

Bits Chat は、自然言語を使用して Datadog 全体で検索し、行動を起こすのに役立ちます。インシデントの調査、テレメトリの探索、ダッシュボードの構築、DDSQL を使用したデータのクエリを依頼すると、自分でクエリを作成しなくても会話形式のチャットで回答を得られます。

Bits Chat は、Datadog Web アプリケーション、モバイルアプリ、および Slack で利用できます。各サーフェスから開くには、[Bits Chat の使用][1]を参照してください。

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="提案されたタスクを含むフルページの Bits Chat インターフェイス" style="width:100%;">}}

Bits Chat には次のような質問ができます。
- `Why is the error rate spiking on the web-store service?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Investigate why EC2 costs changed between January and February`

## 権限 {#permissions}

### Bits Chat へのアクセス {#access-to-bits-chat}

Bits Chat を使用するには、**Bits Chat へのアクセス**権限を持つロールが必要です。この権限は、Datadog Admin、Datadog Standard、Datadog Read Only という 3 つの標準 Datadog ロールに対してデフォルトで有効になっています。

カスタムロールのこの権限を管理するには、[ロールを更新][2]して **Bits Chat Access** を有効にします。

### Bits Chat を介したデータアクセス {#data-access-through-bits-chat}

Bits Chat は、Datadog ロールを使用してデータを取得するため、表示または変更権限を持つリソースにのみアクセスできます。例えば、ロールが特定のログインデックスのセットへのアクセスを制限している場合、Bits Chat はそのインデックスからのみログをクエリできます。同様に、ダッシュボードを編集する権限がない場合、Bits Chat が代わりにそのダッシュボードを編集することはできません。

## チャット履歴 {#chat-history}

Bits Chat は会話を保存します。過去のチャットを表示するには、[Bits Chat][3] で {{< ui >}}History{{< /ui >}} を開くか、 {{< img src="bits_ai/icons/clock_historical.svg" inline="true" style="width:16px;" alt="Bits Chat パネル内の" >}} 履歴アイコンをクリックします。

### チャットの管理と共有 {#manage-and-share-chats}

{{< ui >}}History{{< /ui >}} 内のチャットの横、または開いているチャットのヘッダーにある {{< ui >}}...{{< /ui >}} をクリックして、{{< ui >}}Rename{{< /ui >}}、{{< ui >}}Share{{< /ui >}}、または {{< ui >}}Delete{{< /ui >}} を行います。チャットを削除すると元に戻すことはできません。

チャットはデフォルトで非公開です。チャットを共有するには、{{< ui >}}...{{< /ui >}} > {{< ui >}}Share{{< /ui >}} > {{< ui >}}Shared Chat{{< /ui >}} をクリックし、{{< ui >}}Copy Link{{< /ui >}} をクリックします。リンクを知っている人は誰でも、新しいメッセージを含めてチャットを閲覧できますが、返信できるのはあなただけです。

<div class="alert alert-warning">共有チャットには、お使いのアカウントの権限で取得されたデータが表示されます。共有する前にチャットを確認してください。</div>

共有リンクは自動的に失効します ({{< ui >}}Share Chat{{< /ui >}} ダイアログで有効期限を確認してください)。共有を停止するには、{{< ui >}}Share Chat{{< /ui >}} を開いて {{< ui >}}Private Chat{{< /ui >}} を選択します。

## レポート {#reports}

Bits Chat Reports ページは、組織が Bits Chat をどのように使用しているかを可視化します。[**Bits AI** > **Chat** > **Reports**][4] に移動して以下を確認します:

- **トップユーザー**: 会話数でランク付けされた、Bits Chat を最も多く使用しているチームメンバーを確認します。
- **使用量の傾向**: 時間の経過に伴う会話量を追跡し、採用状況を把握し、使用パターンを特定します。
- **会話インテント分布**: 問題の調査、テレメトリの探索、Datadog のコンセプトの学習、監視可能性の構成など、意図カテゴリーごとに会話がどのように分かれているかを確認します。

これらのインサイトを使用して、採用パターンを把握し、ベストプラクティスを共有するためのパワーユーザーを特定し、組織にとって最も価値を提供するユースケースを評価します。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_chat/usage/
[2]: /ja/account_management/rbac/?tab=datadogapplication#update-a-role
[3]: https://app.datadoghq.com/ask
[4]: https://app.datadoghq.com/ask/usage