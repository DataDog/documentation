---
aliases:
- /ja/service_management/incident_management/zoom_integration/
- /ja/incident_response/incident_management/zoom_integration
description: Datadog インシデントの Zoom ミーティングをワンクリックまたは自動で作成し、AI ミーティングの要約を生成します。
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: ドキュメント
  text: インシデント Integrations 設定
- link: /integrations/zoom-incident-management/
  tag: ドキュメント
  text: Zoom Incident Management インテグレーション
- link: /incident_response/incident_management/investigate/incident_ai/#meeting-summaries
  tag: ドキュメント
  text: Incident AI のミーティングの要約
title: Datadog Incident Management に Zoom を統合する
---
## 概要 {#overview}

Datadog Incident Management の Zoom インテグレーションにより、チームはインシデントの Zoom ミーティングを開始できます。定義した条件に基づいて、ワンクリックまたは自動でミーティングを作成できます。インシデントの Zoom ミーティングの AI 要約を生成することもできます。

## 前提条件 {#prerequisites}

Incident Management の Zoom 機能を使用するには、まず [Zoom Incident Management インテグレーションをインストール][1]する必要があります。

インストール後、**[[Incident Response] > [Incident Management] > [Settings] > [Integrations]][2]** に移動して、Incident Management の Zoom 機能を構成します。

## Zoom ミーティング {#zoom-meetings}

### ワンクリックでのミーティング作成{#one-click-meeting-creation}

インシデントの Zoom ミーティングをワンクリックで有効にするには、以下を行います。

1. [[**Settings] > [Integrations]**][2] に移動し、[**Zoom**] を選択します。
2. [**Enable Zoom meeting creation**] をオンにします。
3. 設定を保存します。

Zoom ミーティングをワンクリックで有効にした後、インシデントのヘッダーから [**Create Zoom Meeting**] をクリックしてミーティングを開始します。インシデントの Slack チャンネルで `/zoom` コマンドを実行することもできます。ブラウザまたは Zoom クライアントからミーティングに参加するようにリダイレクトされます。

Datadog は、ミーティングを作成したユーザーのメールアドレスをホストのメールアドレスとして使用します。このメールアドレスは、承認済みの Zoom アカウントに関連付けられている必要があります。関連付けられていない場合、Datadog は[フォールバック Zoom ユーザー](#fallback-zoom-user) (設定されている場合) を使用します。

### 自動ミーティング作成{#automatic-meeting-creation}

インシデントの条件に基づいた Zoom ミーティングを自動で有効にするには、以下を行います。

1. [[**Settings] > [Integrations]**][2] に移動し、[**Zoom**] を選択します。
2. [**Enable Zoom meeting creation**] をオンにします。
   1. [**Automatically create Zoom meetings**] をオンにします。
   2. (オプション) Zoom ミーティングを作成するインシデントの条件を指定します。条件を空白のままにすると、Zoom ミーティングが存在しないインシデントに変更が加えられた場合に、Zoom ミーティングが作成されます。
3. 設定を保存します。

インシデントが条件を満たすと、Datadog は Incident Commander のメールアドレスをホストのメールアドレスとして使用し、Zoom ミーティングを作成します。Incident Commander がいない場合、またはそのメールアドレスが承認済み Zoom アカウントに関連付けられていない場合、Datadog は[フォールバック Zoom ユーザー](#fallback-zoom-user)を使用します (設定されている場合)。

**注**: [テストインシデント][3]で Zoom ミーティングの自動作成を使用するには、テストインシデント作成モーダルで [**Execute integrations**] を選択します。そうでない場合、Datadog はミーティングを作成しません。

### フォールバック Zoom ユーザー {#fallback-zoom-user}

Datadog が承認済み Zoom アカウント内のホストメールアドレスを解決できない場合に、ミーティングをホストするフォールバック Zoom ユーザーを設定します。例:

- ミーティングを作成する Datadog ユーザーが、承認済み Zoom アカウントにアカウントを持っていない場合。
- Datadog が自動的にミーティングを作成する際に、インシデントに Incident Commander が割り当てられていない場合。
- Datadog が自動的にミーティングを作成する際に、Incident Commander が承認済み Zoom アカウントでアカウントを持っていない場合。

フォールバック Zoom ユーザーを設定するには、以下を行います。

1. [[**Settings] > [Integrations]**][2] に移動し、[**Zoom**] を選択します。
2. [**Enable Zoom meeting creation**] をオンにします。
3. [**Fallback user account**] で、承認済み Zoom アカウントに関連付けられたメールアドレスを入力します。従業員が退職した際の問題を回避するため、共有ユーザーを使用します。
4. (オプション) すべての Zoom ミーティングのホストとしてフォールバックユーザーを使用するには、[**Always use this account as the meeting host**] をオンにします。
5. 設定を保存します。

### Slack ブックマーク {#slack-bookmark}

インシデントの Zoom ミーティングをインシデントの Slack チャンネルのブックマークに追加するには、以下を行います。

1. [**[Settings] > [Integrations]**][2] に移動し、[**Slack**] を選択します。
2. [**Add important links to the incident channel's bookmarks**] をオンにします。
3. 設定を保存します。

インシデントに Slack チャンネルがある場合、Datadog はそのチャンネルに Zoom ミーティングのブックマークを追加します。

その他の Slack 機能については、「[Datadog Incident Management に Slack を統合する][4]」を参照してください。

### ミーティングの要約{#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">ミーティングの要約は、選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

AI 生成によるミーティングの要約を有効にして、インシデントの Zoom ミーティングを自動的に要約します。

<div class="alert alert-info">ミーティングの要約が有効になっている場合、Datadog の<a href="https://www.datadoghq.com/legal/subprocessors/">サブプロセッサー</a>がミーティングの音声を録音し、文字起こしします。7 日間の保持期間が経過すると、サブプロセッサーはすべてのデータを自動的に削除します。</div>

インシデントの Zoom ミーティングでミーティングの要約を有効にするには、以下を行います。

1. [[**Settings] > [Integrations]**][2] に移動し、[**Zoom**] を選択します。
2. [**Enable Zoom meeting creation**] をオンにします。
3. [**Generate AI meeting summaries**] をオンにします。
4. (オプション) 特定のインシデントの要約を防止するための条件を追加します。デフォルトでは、インシデント AI はプライベートインシデントのミーティングを要約しません。
5. 設定を保存します。

**注**: インシデント AI が要約を生成できるように、Zoom でミーティングのキャプションを有効にしてください。

前提条件、要約の投稿先、要約の確認、Transcriber の再招待については、[Incident AI のミーティングの要約][5]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/zoom-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /ja/incident_response/incident_management/guides/test_incidents
[4]: /ja/incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /ja/incident_response/incident_management/investigate/incident_ai/#meeting-summaries