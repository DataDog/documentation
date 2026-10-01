---
aliases:
- /ja/service_management/incident_management/integrations/microsoft_teams/
- /ja/incident_response/incident_management/integrations/microsoft_teams/
description: Microsoft Teams を Datadog Incident Management と統合して、インシデントチャンネルの作成を自動化し、メッセージを同期して、Microsoft
  Teams 内でチームと直接共同作業できます。
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: ドキュメント
  text: インシデント Integrations 設定
- link: /integrations/microsoft-teams
  tag: ドキュメント
  text: Microsoft Teams インテグレーション
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: ブログ
  text: Datadog Incident Response の AI で調査を加速する
title: Microsoft Teams を Datadog Incident Management と統合する
---
## 概要 {#overview}

Datadog Incident Management 用の Microsoft Teams インテグレーションにより、Microsoft Teams 内から直接、インシデントの宣言と管理、インシデントチャンネルの自動作成、タイムラインへのメッセージの同期、チームへの情報共有を行うことができます。

## 前提条件 {#prerequisites}

Incident Management の Microsoft Teams 機能を使用するには、まず [Datadog 用 Microsoft Teams インテグレーションをインストール][1]し、Microsoft Teams アカウントを Datadog アカウントに接続する必要があります。

インストール後、**[Incident Response > Incident Management > Settings > Integrations][2]** に移動して、Incident Management の Microsoft Teams 機能を構成します。

## インシデントチャンネル{#incident-channels}

### チャンネルの自動作成{#automatic-channel-creation}

Incident Management を構成することで、各インシデント、または定義した条件に該当するインシデントについて、Microsoft Teams 上にインシデントチャンネルを自動的に作成できます。インシデントチャンネルの自動作成をセットアップするには、

1. [**Settings > Integrations**][2] に移動し、**Microsoft Teams** を選択します。
2. **Tenant** ドロップダウンから、接続済みの Microsoft Teams テナントを選択します。
3. **Automatically create a Microsoft Teams channel for every incident** をオンにします。
4. 新しいチャンネルを自動的に作成する Teams を選択します。
5. 設定を保存します。

この自動化を有効にした後、Datadog がチャンネルを作成する際に使用する**チャンネル名テンプレート**を定義できます。詳細な説明については、[チャンネル名テンプレートのみで使用可能な変数][6]を参照してください。

### チャンネルメッセージの同期{#channel-message-syncing}

Incident Management を構成して、インシデントの Microsoft Teams チャンネルのすべてのメッセージをインシデントタイムラインに送信できます。有効にするには、**Automatically push Microsoft Teams channel messages to the incident timeline** をオンにします。

同期されたメッセージの作成者は、メッセージを記録するために Incident Management または Incident Response のシートを必要としません。Incident Management の従量課金制を採用している組織では、作成者は月間アクティブユーザーとしてカウントされません。

### チャンネルの自動アーカイブ {#automatic-channel-archiving}

Incident Management を構成して、インシデントの解決後にインシデントチャンネルを自動的にアーカイブできます。

## インシデント更新用のグローバルチャンネル{#global-channel-for-incident-updates}

インシデント更新チャンネルを使用して、Microsoft Teams から直接、すべてのインシデントのステータスを組織全体で把握できるようにし、関係者に共有します。
1. [**Settings > Integrations**][2] に移動し、**Microsoft Teams** を選択します。
1. Microsoft Teams インテグレーションで、**Send all incident updates to a global channel** を有効にします。
1. インシデントの更新を投稿する Teams とチャンネルを選択します。

Datadog は、新しく宣言されたインシデントや、インシデントの状態、重大度、インシデントコマンダーの変更について、選択したチャンネルに自動的に通知します。

この動作をカスタマイズするには、この設定を無効にして、代わりに[通知ルールを定義][4]します。

## Microsoft Teams 通知ターゲット {#microsoft-teams-notification-targets}

[通知ルール][4]は、`@teams-<channel>` ハンドルを使用して Microsoft Teams チャンネルをターゲットにします。このハンドルに指定された特定のチャンネルに通知が送信されます。これを使用して、グローバルなインシデント更新チャンネルなどの常設チャンネルに通知します。

Incident Management では、インシデント用に自動作成されたチャンネルを解決先とするハンドルは提供されません。Slack 通知ルールでは `@incident-slack-channel` を使用してインシデントの Slack チャンネルに通知できますが、Microsoft Teams には同等のハンドルはありません。その結果、`@-mentions` を含む通知ルールは、インシデントごとのチャンネルではなく、`@teams-` ハンドルで指定されたチャンネルに通知を配信します。

対応者にインシデント専用チャンネルで最新の情報を提供するには、そのチャンネル内で Datadog タブと `@Datadog` コマンドを使用します。インシデントタイムラインに更新を投稿することもできます。[チャンネルメッセージの同期](#channel-message-syncing)が有効になっている場合、更新はチャンネルと同期されます。

## Microsoft Teams ミーティング {#microsoft-teams-meetings}

### ワンクリックでのミーティング作成{#one-click-meeting-creation}

ワンクリックで Microsoft Teams ミーティングを使用するには、委任された権限が必要です。インシデントでワンクリックの Microsoft Teams ミーティングを有効にするには、

1. [**Settings > Integrations**][2] に移動し、**Microsoft Teams** を選択します。
2. Microsoft Teams で、接続している Microsoft Teams テナントを選択します。
3. **Enable meeting creation** をオンにします。
4. 設定を保存します。

ワンクリックで Microsoft Teams ミーティングを有効にした後、インシデントヘッダーから **Start Teams Meeting** をクリックしてミーティングを開始します。ブラウザからミーティングにすぐ参加するようにリダイレクトされます。

### 自動ミーティング作成{#automatic-meeting-creation}

条件に基づく自動 Microsoft Teams ミーティングには、委任された権限が必要です。インシデントで条件に基づく自動 Microsoft Teams ミーティングを有効にするには、

1. [**Settings > Integrations**][2] に移動し、**Microsoft Teams** を選択します。
2. Microsoft Teams で、接続している Microsoft Teams テナントを選択します。
3. **Enable meeting creation** をオンにします。
   1. **Automatically create Microsoft Teams meetings** をオンにします。
   2. (オプション) Microsoft Teams ミーティングを作成するインシデント条件を指定します。空白のままにすると、既存の Microsoft Teams ミーティングがないインシデントに変更が加えられた場合、Microsoft Teams ミーティングが作成されます。
4. 設定を保存します。

### ミーティングメッセージの同期{#meeting-message-sync}
Incident Management を構成して、すべてのインシデントの Microsoft Teams ミーティングメッセージをインシデントタイムラインに送信できます。有効にするには、**Sync meeting chat to incident timeline** をオンにします。

同期されたメッセージの作成者は、メッセージを記録するために Incident Management または Incident Response のシートを必要としません。Incident Management の従量課金制を採用している組織では、作成者は月間アクティブユーザーとしてカウントされません。

### ミーティングの要約{#meeting-summaries}

AI 生成によるミーティングの要約を有効にして、インシデントの Microsoft Teams ミーティングを自動的に要約します。ミーティング中、ライブ要約がインシデントタイムラインおよびインシデントチャットチャンネルに定期的に投稿されます。ミーティングが終了すると、最終的なミーティング後の要約が投稿されます。

<div class="alert alert-info">ミーティングの要約が有効になっている場合、ミーティングの音声は Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">サブプロセッサー</a>によって録音および文字起こしされます。7 日間の保持期間が経過すると、すべてのデータは自動的に削除されます。</div>

インシデントの Microsoft Teams ミーティングでミーティングの要約を有効にするには、

1. [**Settings > Integrations**][2] に移動し、**Microsoft Teams** を選択します。
2. Microsoft Teams で、接続している Microsoft Teams テナントを選択します。
3. **Enable meeting creation** をオンにします。
4. **Generate AI meeting summaries** をオンにします。
5. (オプション) 特定のインシデントの要約を防止するための条件を追加します。デフォルトでは、プライベートインシデントのミーティングは要約されません。
6. 設定を保存します。

ミーティングの要約は、インシデントに添付された Microsoft Teams ミーティングに対して生成されます。ミーティングが開始されると、Datadog Transcriber が Microsoft Teams ミーティングへの参加を試みます。これには 10 ～ 30 秒かかる場合があります。文字起こしを開始するには、ミーティングの参加者がミーティングロビーから Datadog Transcriber の参加を許可する必要があります。Datadog Transcriber の参加が許可されると、ミーティング中、以下の場所にライブ要約が定期的に投稿されます。

- **インシデントタイムライン**の**ミーティングの要約**エントリーの下。
- **インシデントチャットチャンネル** (ミーティングカードのスレッド内、およびチャンネルへのメッセージの両方)。

ミーティングが終了すると、最終的なミーティング後の要約が同じ場所に投稿されます。

## Microsoft Teams で Datadog タブを使用する {#using-the-datadog-tab-in-microsoft-teams}

インシデントチャンネル (インシデント専用に作成されたチャンネル) では、Datadog タブにその特定のインシデントの情報が表示され、管理できます。インシデント以外のチャンネルでは、新しいインシデントの宣言のみが可能です。

### インシデントの宣言と管理 {#declaring-and-managing-incidents}

特定のチームからインシデントを宣言するには、
1. [Add the Datadog application][3] をチームに追加します。
1. **インシデント以外**のチャンネルで、**Datadog** タブをクリックします。
1. インシデントの詳細を入力し、**Declare Incident** をクリックします。

特定のチームからインシデントを管理するには、
1. **インシデントチャンネル**で、**Datadog** タブをクリックします。
1. インシデントの詳細と属性を編集します。

### タイムラインへのメッセージの送信{#sending-messages-to-the-timeline}

インシデントチーム内の任意のメッセージの右端にある [More actions] メニューを使用して、そのメッセージをインシデントタイムラインに送信できます。

## Microsoft Teams コマンド{#microsoft-teams-commands}

利用可能な `@Datadog`コマンドの全リストについては、[Microsoft Teams integration documentation][5] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/microsoft-teams/?tab=datadogapprecommended
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /ja/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[4]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules
[5]: /ja/integrations/microsoft-teams/#datadog-incident-management-in-microsoft-teams
[6]: /ja/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates