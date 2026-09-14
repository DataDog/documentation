---
aliases:
- /ja/service_management/incident_management/integrations/slack/
- /ja/incident_response/incident_management/integrations/slack/
description: Datadog のインシデントを Slack から直接管理します。
further_reading:
- link: integrations/slack/
  tag: ドキュメント
  text: Slack インテグレーションをインストールする
- link: https://www.datadoghq.com/blog/slack-incident-management/
  tag: ブログ
  text: Datadog の Slack インテグレーションでインシデントをシームレスに管理する
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: ブログ
  text: Datadog Incident Response の AI で調査を加速する
- link: https://app.datadoghq.com/integrations/slack
  tag: アプリ
  text: アプリ内の Slack インテグレーションタイル
title: Slack と Datadog Incident Management を統合する
---
## 概要 {#overview}

Slack は、チームがリアルタイムでコミュニケーションをとるために広く利用されているメッセージングおよびコラボレーションプラットフォームです。Datadog の Slack インテグレーションは、インシデント対応ワークフローを Slack に直接接続して、チームがチャット環境を離れることなくインシデントの宣言、管理、解決を行えるようにします。

このインテグレーションを使用すると、以下のことが可能になります。

- Datadog インシデントを Slack から直接宣言して対応を迅速化する。
- Datadog インシデントの宣言時にコラボレーション用の Slack チャンネルを自動的に作成する。
- Slack でインシデント対応を実行する。(オンコールチームへのページング、対応担当者ロールの割り当て、重大度の更新など)。

Slack インテグレーションのドキュメントは、Incident Management で Slack を使用する一般的なライフサイクルに基づいて構成されています。

1. [**Slack のインストールと接続**](#setup): Slack ワークスペースと Datadog の間のインテグレーションをセットアップします。
2. [**インシデントの宣言**](#declaring-incidents-from-slack): Slack のコマンドやメッセージアクションを使用してインシデントを開始する方法を学びます。
3. [**インシデントチャンネルからのインシデント管理**](#incident-channels): 専用の Slack チャンネルでコマンド、同期、自動化を使用します。
4. [**グローバル通知の設定**](#global-slack-notifications): 自動更新により、組織全体に情報を共有します。
5. **[Slack の設定オプション](#additional-slack-configurations)と [Slack コマンドのリファレンス](#slack-incident-commands)**: 詳細な設定オプションを確認し、利用可能な Slack コマンドの全リストを参照して、インシデント対応ワークフローを調整および効率化します。

## 前提条件{#prerequisites}

適切な [OAuth スコープ][6]を使用して、[Slack インテグレーションタイル][1]からインテグレーションをインストールします。詳細については、[Slack インテグレーション][2]のドキュメントを参照してください。

インテグレーションがインストールされたら、[[**Incidents**] (インシデント) > [**Settings**] (設定) > [**Integrations**] (インテグレーション)][3] に移動して、Incident Management の Slack 機能を有効にします。

## Slack からインシデントを宣言する{#declaring-incidents-from-slack}

Slack ワークスペースを Datadog 組織に接続すると、ワークスペース内のユーザーは、Incident Management に関連する Slack ショートカットを使用できるようになります。

インシデントは、以下のスラッシュコマンドで宣言できます。

```
/datadog incident
```

Slack メッセージからインシデントを宣言するには、メッセージにカーソルを合わせて [**More actions**] (3 つの縦のドット) をクリックし、[**Declare incident**] (インシデントを宣言) を選択します。Datadog はそのメッセージのスレッドに、インシデントが作成されたことを確認するメッセージを投稿します。

デフォルトでは、Datadog 組織に接続されている Slack ユーザーのみがインシデントを宣言できます。Slack ユーザーは、`/datadog connect` を実行することで Datadog 組織に接続できます。

ワークスペース内のすべての Slack ユーザーがインシデントを宣言できるようにするには、Incident Management の設定で [**Allow Slack users to declare incidents without a connected Datadog account**] (Datadog アカウントが接続されていない Slack ユーザーにインシデントの宣言を許可する) を有効にします。

## インシデントチャンネル {#incident-channels}

Incident Management を設定して、定義した基準を満たす各インシデントに対して専用の Slack チャンネルを自動的に作成することができます。対応担当者は、そのインシデントチャンネルから直接 Slack 上でインシデントを管理できます。

インシデントチャンネルを使用するには、**[[Incident Response] > [Incident Management] > [Settings] > [Integrations]][3]** に移動して、[**Create Slack channels for incidents**] (インシデント用の Slack チャンネルを作成する) を有効にします。

定義する**チャンネル名テンプレート**によって、Datadog が作成するインシデントチャンネルの命名規則が決まります。詳細な説明については、[チャンネル名テンプレートでのみ使用可能な変数][7]を参照してください。


### メッセージの同期 (Slack のミラーリング){#message-syncing-slack-mirroring}

自動チャンネル作成を有効にした後、Incident Management を設定して、インシデントの Slack チャンネルと Datadog のインシデントタイムラインの間でメッセージを同期できます。

同期を有効にするには、Incident Management の設定で [**Push Slack channel messages to the incident timeline**] (Slack チャンネルのメッセージをインシデントタイムラインにプッシュする) を有効にしてから、以下のいずれかのオプションを選択します。

* **Mirror all messages in real-time** (すべてのメッセージをリアルタイムでミラーリングする): Datadog は、Slack ユーザーがインシデントチャンネルに投稿したすべてのメッセージを同期します。
* **Push message when 📌 is added as a reaction** (リアクションとして 📌 が追加された場合にメッセージをプッシュする): Datadog は、Slack ユーザーがプッシュピン (📌) でリアクションしたメッセージのみを同期します。

どちらのオプションでも、Datadog がメッセージを同期するのに、メッセージの作成者が Datadog 組織に接続されている必要はありません。メッセージのピン留めについては、ピン留めしたユーザーが Datadog 組織に**接続されている**必要があります。

使用量ベースの Incident Management 課金を利用している組織の場合:

* Datadog に同期されるメッセージを作成しても、その月の課金対象ユーザーには**なりません**。
* メッセージをピン留めして同期された場合は、課金対象ユーザーに**なります**。

シートベースの Incident Management 課金を利用している組織の場合:

* 作成したメッセージを Datadog が Incident Management に同期するのにシートは**必要ありません**。
* メッセージをピン留めする場合、ピン留めしたメッセージを Datadog が同期するにはシートが**必要です**。

### インシデントチャンネルの Slack コマンド {#slack-commands-in-the-incident-channel}

インシデントの Slack チャンネルで Slack コマンドを実行して、インシデントのステータスや重大度の変更、対応担当者ロールの割り当て、オンコールチームへのページングなどを行うことができます。

Slack コマンドの全リストについては、[Slack コマンド](#slack-commands)を参照してください。

### その他のインシデントチャンネル設定オプション {#other-incident-channel-configuration-options}

Incident Management のすべての Slack 設定オプションには、[[**Incidents**] > [**Settings**] > [**Integrations**]][3] ページからアクセスできます。

| 機能                                                   | 説明と備考                                                                                                                             |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Push incident timeline messages to Slack (インシデントタイムラインのメッセージを Slack にプッシュする)**              | インシデントタイムラインの更新情報を Datadog から Slack チャンネルへ自動的に送信します。<br><br>チャンネル参加者が Datadog の更新情報を常に把握できるようになります。|
| **Add important links to channel bookmarks (重要なリンクをチャンネルブックマークに追加する)**              | インシデントに関連するリンクを Slack のチャンネルブックマークに投稿します。<br><br>リソースに手軽にアクセスできるようになります。                                    |
| **Add team members automatically (チームメンバーを自動的に追加する)**                        | Datadog チームがインシデントに追加されると、そのメンバーが Slack チャンネルに追加されます。                                                      |
| **Send incident updates to the Slack channel (インシデントの更新情報を Slack チャンネルに送信する)**            | インシデントのステータス、重大度、インシデントコマンダーでチャンネルトピックを更新します。                                                               |
| **Send a Slack notification when a meeting starts (会議開始時に Slack 通知を送信する)**       | 会議が開始されるときに、参加者と参加リンクを含む通知を Slack チャンネルに送信します。<br><br>インシデント通話に手軽にアクセスできるようになります。    |
| **Activate Bits AI in incident Slack channels (インシデントの Slack チャンネルで Bits AI を有効にする)**           | Datadog のインシデントコンテキストを使用する AI 機能を有効にします。<br><br>選択した Slack ワークスペース内のすべてのインシデントタイプに適用されます。               |
| **Automatically archive Slack channels after resolution (解決後に Slack チャンネルを自動的にアーカイブする)** | インシデントが解決されたらインシデントの Slack チャンネルをアーカイブします。<br><br>チャンネルの整理に役立ちます。                                            |
| **Customize incident Slack actions (インシデントの Slack アクションをカスタマイズする)**                       | インシデントアクショントレイに表示されるアクションをステータスごとにカスタマイズします。<br><br>一般的なアクションが見やすくなります。                     |

## インシデント更新用のグローバルチャンネル {#global-channel-for-incident-updates}

Incident Management を設定して、選択した Slack チャンネルにインシデントに関する更新情報を自動的に投稿することができます。これを有効にするには:

1. Datadog で、**[[Incident Response] > [Incident Management] > [Settings] > [Integrations]][3]** に移動します。
1. [Slack] セクションで、[**Send all incident updates to a global channel**] (すべてのインシデント更新情報をグローバルチャンネルに送信する) を有効にします。
1. インシデントの更新情報を投稿したい Slack ワークスペースと Slack チャンネルを選択します。

Datadog は、新しく宣言されたインシデントや、インシデントのステータス、重大度、インシデントコマンダーの変更について、選択されたチャンネルに自動的に通知します。

この機能は、内部的には組み込みの非表示の[インシデント通知ルール][5]です。メッセージやそのトリガーをカスタマイズしたい場合は、この機能を無効にして、独自の通知ルールを定義してください。

## Slack コマンド {#slack-commands}

利用可能な Slack コマンドの全リストをいつでも確認できます。Slack で `/datadog` (または `/dd`) と入力すると、コマンドモーダルが開き、Datadog のアクションを閲覧、実行できます。また、`/dd help` と入力してそれらのオプションを一覧表示することもできます。一般的なインシデント管理アクションのアクショントレイを開くには、`/dd shortcuts` と入力します。

### グローバルコマンド (どこからでも実行可能) {#global-commands-run-anywhere}

| コマンド | 説明 |
| ------- | ----------- |
| `/datadog incident` | 新しいインシデントを宣言します。|
| `/datadog incident test` | 新しいテストインシデントを宣言します (インシデントタイプでテストインシデントが有効な場合)。|
| `/datadog incident list` | すべてのオープンな (Active および Stable の) インシデントを一覧表示します。|

### インシデントチャンネルコマンド {#incident-channel-commands}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
| コマンド | 説明 |
| ------- | ----------- |
| `/datadog` | コマンドモーダルを開いて、利用可能なすべての Datadog アクションを表示します。|
| `/datadog shortcuts` | インシデントアクショントレイを開いて、一般的なアクションを実行します。|
| `/datadog help` | 利用可能なすべての Slack コマンドを一覧表示する一時的なメッセージを表示します。|
| `/datadog incident update` | インシデントの属性 (ステータスや重大度など) を更新します。|
| `/datadog incident notify` | インシデントについて `@` ハンドルに通知します。|
| `/datadog incident private` | インシデントを非公開にします (非公開インシデントが有効な場合)。|
| `/datadog incident public` | インシデントを公開にします。|
| `/datadog incident responders` | インシデントの対応チームを管理します (対応担当者の追加や対応ロールの割り当てを行います)。|
| `/datadog task` | インシデントタスクを作成します。|
| `/datadog task list` | 既存のインシデントタスクを一覧表示します。|
| `/datadog followup` | インシデントのフォローアップを作成します。|
| `/datadog followup list` | インシデントの既存のフォローアップを表示および管理します。|
| `/datadog incident summary` | 自分のみが閲覧可能な、AI が生成したインシデントの要約を取得します。|
{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
| コマンド | 説明 |
| ------- | ----------- |
| `/datadog` | コマンドモーダルを開いて、利用可能なすべての Datadog アクションを表示します。|
| `/datadog shortcuts` | インシデントアクショントレイを開いて、一般的なアクションを実行します。|
| `/datadog help` | 利用可能なすべての Slack コマンドを一覧表示する一時的なメッセージを表示します。|
| `/datadog incident update` | インシデントの属性 (ステータスや重大度など) を更新します。|
| `/datadog incident notify` | インシデントについて `@` ハンドルに通知します。|
| `/datadog incident private` | インシデントを非公開にします (非公開インシデントが有効な場合)。|
| `/datadog incident public` | インシデントを公開にします。|
| `/datadog incident responders` | インシデントの対応チームを管理します (対応担当者の追加や対応ロールの割り当てを行います)。|
| `/datadog task` | インシデントタスクを作成します。|
| `/datadog task list` | 既存のインシデントタスクを一覧表示します。|
| `/datadog followup` | インシデントのフォローアップを作成します。|
| `/datadog followup list` | インシデントの既存のフォローアップを表示および管理します。|
{{< /site-region >}}

### アクショントレイボタン {#action-tray-buttons}

Datadog は、ステータスが変更されるとインシデントの Slack チャンネルに直接アクショントレイを投稿するため、対応担当者は、重大度やステータスの更新などの一般的なアクションを、コマンドを入力することなく実行できます。Slack で `/dd shortcuts` と入力してアクショントレイを開くこともできます。

アクショントレイでは、以下のボタンを利用できます。インシデントタイプは、これらのデフォルトボタンで初期化されます。各インシデントステータスに対して表示されるボタンとその順序をカスタマイズするには、[**Incidents**] > [**Settings**] > [[**Integrations**]][3] > [**Slack Settings**] (Slack 設定) に移動し、[**Incident Slack Actions**] (インシデントの Slack アクション) を設定します。

| ボタン                              | 説明                                                             | Active のデフォルト | Stable のデフォルト | Resolved のデフォルト |
|--------------------------------------|---------------------------------------------------------------------------|:---:|:---:|:---:|
| ⚙️ **Edit Incident (インシデントを編集)**                | ステータス、重大度、影響、およびその他すべての属性を更新します。                 | {{< X >}} | {{< X >}} |   |
| 🧑‍🚒 **Edit Responders (対応担当者を編集)**             | インシデントにロールを割り当ててチームメンバーを追加します。                            | {{< X >}} |   |   |
| 🔍 **View All Actions (すべてのアクションを表示)**             | このインシデントで利用可能な Slack アクションの全リストを開きます。           | {{< X >}} | {{< X >}} | {{< X >}} |
| 🏠 **View Web App (Web アプリを表示)**                 | Datadog Incident Management でインシデントを開きます。                          | {{< X >}} | {{< X >}} | {{< X >}} |
| ☎️ **Page On-Call (オンコールチームにページ送信)**                 | 優先サービスを使用して、進行中のインシデントについてチームにページ送信します。       | {{< X >}} |   |   |
| 🔔 **Notify (通知)**                       | メール、プッシュ通知、またはサービスを通じて関係者にインシデントについて通知します。    |   | {{< X >}} | {{< X >}} |
| ▶️ **Create/Join Zoom (Zoom を作成/参加)**             | 新しい会議を開始するか、すでに会議が存在する場合は参加します。                        | {{< X >}} |   |   |
| ▶️ **Create/Join Google Meet (Google Meet を作成/参加)**      | 新しい会議を開始するか、すでに会議が存在する場合は参加します。                        | {{< X >}} |   |   |
| ▶️ **Run Workflow (ワークフローを実行)**                 | インシデント用に定義済みのワークフローを選択して実行します。                     | {{< X >}} |   |   |
| 🟨 **Set to Stable (Stable に設定)**                | 影響を軽減した後、インシデントを Stable としてマークします。                   | {{< X >}} |   |   |
| ✅ **Resolve Incident (インシデントを解決)**             | インシデントを Resolved としてマークします。                                              |   | {{< X >}} |   |
| ✨ **Investigate with Bits AI (Bits AI で調査)**     | Bits AI を使用してインシデントを調査します。                                   | {{< X >}} |   |   |
| 📋 **Create Follow-Up (フォローアップを作成)**             | インシデント対応中に特定されたフォローアップタスクを作成します。            |   | {{< X >}} | {{< X >}} |
| 📋 **List Follow-Ups (フォローアップを一覧表示)**              | インシデントのフォローアップタスクを表示および追跡します。                           |   |   | {{< X >}} |
| 📝 **Create/View Postmortem (ポストモーテムを作成/表示)**       | インシデントのポストモーテムを作成または表示します。                            |   |   | {{< X >}} |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[2]: /ja/integrations/slack/?tab=datadogforslack
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
[4]: /ja/integrations/jira/
[5]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules/
[6]: /ja/integrations/slack/?tab=datadogforslack#permissions
[7]: /ja/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates