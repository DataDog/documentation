---
aliases:
- /ja/service_management/incident_management/zoom_integration/
- /ja/incident_response/incident_management/zoom_integration
description: Datadog インシデントの Zoom ミーティングをワンクリックまたは自動で作成し、AI ミーティングのサマリーとライブトランスクリプトのノートブックを生成します。
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: ドキュメント
  text: インシデント Integrations 設定
- link: /integrations/zoom-incident-management/
  tag: ドキュメント
  text: Zoom Incident Management インテグレーション
- link: /incident_response/incident_management/investigate/meeting_summaries_and_transcripts
  tag: ドキュメント
  text: ミーティングのサマリーとトランスクリプト
title: Datadog Incident Management に Zoom を統合する
---
## 概要 {#overview}

Datadog Incident Management の Zoom インテグレーションにより、チームはインシデントの Zoom ミーティングを開始できます。定義した条件に基づいて、ワンクリックまたは自動でミーティングを作成できます。インシデント Zoom ミーティングのライブトランスクリプトノートブックと AI サマリーを生成することもできます。

## 前提条件 {#prerequisites}

Incident Management の Zoom 機能を使用するには、まず [Zoom Incident Management インテグレーションをインストール][1]する必要があります。

インストール後、**[[Incident Response] > [Incident Management] > [Settings] > [Integrations]][2]** に移動して、Incident Management の Zoom 機能を構成します。

## Zoom ミーティング {#zoom-meetings}

### ワンクリックでのミーティング作成{#one-click-meeting-creation}

インシデントの Zoom ミーティングをワンクリックで有効にするには、以下を行います。

1. [**Settings] > [Integrations]**[2] に移動し、[**Zoom**] を選択します。
2. [**Enable Zoom meeting creation**] をオンにします。
3. 設定を保存します。

Zoom ミーティングをワンクリックで有効にした後、インシデントのヘッダーから [**Create Zoom Meeting**] をクリックしてミーティングを開始します。インシデントの Slack チャンネルで `/zoom` コマンドを実行することもできます。ブラウザまたは Zoom クライアントからミーティングに参加するようにリダイレクトされます。

Datadog は、ミーティングを作成したユーザーのメールアドレスをホストのメールアドレスとして使用します。このメールアドレスは、承認済みの Zoom アカウントに関連付けられている必要があります。関連付けられていない場合、Datadog は[フォールバック Zoom ユーザー](#fallback-zoom-user) (設定されている場合) を使用します。

### 自動ミーティング作成{#automatic-meeting-creation}

インシデントの条件に基づいた Zoom ミーティングを自動で有効にするには、以下を行います。

1. [**Settings] > [Integrations]**[2] に移動し、[**Zoom**] を選択します。
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

1. [**Settings] > [Integrations]**[2] に移動し、[**Zoom**] を選択します。
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

### ミーティングのサマリーとトランスクリプト {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">ミーティングのサマリーとミーティングのライブトランスクリプトは、選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

インシデント AI は、インシデント Zoom ミーティングのサマリーを生成し、オプションでライブミーティングトランスクリプトを Datadog ノートブックに保存できます。

<div class="alert alert-info">ミーティングのサマリーが有効になっている場合、Datadog の<a href="https://www.datadoghq.com/legal/subprocessors/">サブプロセッサー</a>がミーティングの音声を録音し、文字起こしします。保持の詳細については、「ミーティングのサマリーとトランスクリプト」の<a href="/incident_response/incident_management/investigate/meeting_summaries_and_transcripts/#retention-and-deletion">保持と削除</a>を参照してください。</div>

#### 前提条件 {#prerequisites-1}

- 組織で AI 機能が有効になっていること。
- インシデント設定を編集する権限を持つアカウントを使用していること。
- ミーティングのライブトランスクリプトを保存するには、組織がミーティングのライブトランスクリプトに対するアクセス権限を持っていること。**ミーティングトランスクリプトの生成** 設定が利用できない場合は、[Datadog サポート][5] にお問い合わせください。
- インシデント AI がサマリーを生成できるように、Zoom でミーティングのキャプションを有効にする必要があります。

#### ミーティングのサマリーとトランスクリプトを有効にする {#enable-meeting-summaries-and-transcripts}

インシデントの Zoom ミーティングでミーティングのサマリーとトランスクリプトを有効にするには、以下を行います。

1. [**Settings] > [Integrations]**[2] に移動し、[**Zoom**] を選択します。
2. [**Enable Zoom meeting creation**] をオンにします。
3. [**Generate AI meeting summaries**] をオンにします。
4. (オプション) ミーティングのライブトランスクリプトを保存するには、**ミーティングトランスクリプトを生成** (**AI ミーティングサマリーの生成** の下に表示されます) をオンにしてください。
5. (オプション) 特定のインシデントのサマリーを防止するための条件を追加します。
6. 設定を保存します。

サマリーの確認、トランスクリプトの表示、トランスクリプトノートブックへのアクセス権限の管理、およびトランスクリプト担当者の再招待については、[ミーティングのサマリーとトランスクリプト][6] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/zoom-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /ja/incident_response/incident_management/guides/test_incidents
[4]: /ja/incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /ja/help/
[6]: /ja/incident_response/incident_management/investigate/meeting_summaries_and_transcripts