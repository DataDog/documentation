---
aliases:
- /ja/service_management/incident_management/integrations/slack/
- /ja/incident_response/incident_management/integrations/slack/
description: Datadog インシデントを Slack から直接管理します。
further_reading:
- link: integrations/slack/
  tag: ドキュメント
  text: Slack インテグレーションをインストールする
- link: https://www.datadoghq.com/blog/slack-incident-management/
  tag: ブログ
  text: Slack 用の Datadog インテグレーションでインシデントをシームレスに管理する
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: ブログ
  text: Datadog Incident Response の AI で調査を加速する
- link: https://app.datadoghq.com/integrations/slack
  tag: アプリ
  text: アプリ内の Slack インテグレーションタイル
title: Datadog Incident Management に Slack を統合する
---
## 概要{#overview}

Slack は、チームがリアルタイムでコミュニケーションをとるために広く利用されているメッセージングおよびコラボレーションプラットフォームです。Datadog Slack インテグレーションは Incident Response ワークフローを Slack に直接接続するので、チームはチャット環境を離れることなくインシデントを宣言、管理、解決できます。

このインテグレーションで以下が可能になります。

- Datadog インシデントを Slack から直接宣言することで、より迅速に対応できます。
- Datadog インシデントが宣言された際に、コラボレーション用の Slack チャンネルを自動的に作成できます。
- Slack で Incident Response を実行できます。たとえば、オンコールチームへのページング、対応担当者の割り当て、重大度の更新などを行えます。

Slack インテグレーションのドキュメントは、Incident Management で Slack を使用する一般的なライフサイクルに基づいて構成されています。

1. [**Slack のインストールと接続**](#setup): Slack ワークスペースと Datadog 間のインテグレーションをセットアップします。
2. [**インシデントの宣言**](#declaring-incidents-from-slack): Slack コマンドやメッセージアクションを使用してインシデントを開始する方法を学びます。
3. [**インシデントチャンネルからのインシデント管理**](#incident-channels): コマンド、同期、自動化機能を備えた専用の Slack チャンネルを使用します。
4. [**グローバル通知の構成**](#global-slack-notifications): 自動更新によって組織全体に情報を共有します。
5. **[Slack 構成オプション](#additional-slack-configurations)および[Slack コマンド](#slack-incident-commands)**の参照: 詳細な構成オプションを確認し、利用可能な Slack コマンドの全リストを参照して、Incident Response ワークフローを調整および効率化します。

## 前提条件{#prerequisites}

適切な [OAuth スコープ][6] を指定して、[Slack インテグレーションタイル][1] からインテグレーションをインストールしてください。詳しくは、[Slack インテグレーション][2] ドキュメントを参照してください。

インテグレーションがインストールされたら、[[**Incidents**] (インシデント) > [**Settings**] (設定) > [**Integrations**]][3] (インテグレーション) に移動して、Incident Management の Slack 機能を有効にしてください。

## Slack からのインシデント宣言{#declaring-incidents-from-slack}

Slack ワークスペースを Datadog 組織に接続すると、ワークスペース内のユーザーは Incident Management に関連する Slack ショートカットを使用できるようになります。

以下のスラッシュコマンドを使用してインシデントを宣言できます。

```
/datadog incident
```

Slack メッセージからインシデントを宣言するには、メッセージにカーソルを合わせ、[**More actions**] (その他のアクション) (3 つの縦ドット) をクリックして、[**Declare incident**] (インシデントの宣言) を選択します。Datadog は、インシデントが作成されたことを確認するメッセージをそのメッセージのスレッドに投稿します。

デフォルトでは、Datadog 組織に接続されている Slack ユーザーのみがインシデントを宣言できます。Slack ユーザーは `/datadog connect` を実行することで Datadog 組織に接続できます。

ワークスペース内のすべての Slack ユーザーがインシデントを宣言できるようにするには、Incident Management 設定で [**Allow Slack users to declare incidents without a connected Datadog account**] (Slack ユーザーが Datadog アカウントに接続せずにインシデントを宣言できるようにする) を有効にしてください。

## インシデントチャンネル{#incident-channels}

Incident Management を構成して、定義した基準を満たす各インシデントに対して専用の Slack チャンネルを自動的に作成するようにできます。これにより、対応担当者はインシデントチャンネルから直接 Slack 上でインシデントを管理できるようになります。

インシデントチャンネルを使用するには、**[[Incident Response] > [Incident Management] > [Settings] > [Integrations]][3]** に移動し、[**Create Slack channels for incidents**] (インシデント用の Slack チャンネルを作成する) を有効にしてください。

定義する**チャンネル名のテンプレート**によって、Datadog が作成するインシデントチャンネルの命名方法が決まります。詳細な説明については、[チャンネル名テンプレートのみで使用可能な変数][7] を参照してください。


### メッセージの同期 (Slack ミラーリング){#message-syncing-slack-mirroring}

自動チャンネル作成を有効にした後、Incident Management を構成して、インシデントの Slack チャンネルと Datadog のインシデントタイムライン間でメッセージを同期することができます。

同期を有効にするには、Incident Management 設定で [**Push Slack channel messages to the incident timeline**] (Slack チャンネルメッセージをインシデントタイムラインにプッシュする) を有効にしてから、以下のいずれかのオプションを選択します。

* **Mirror all messages in real-time (すべてのメッセージをリアルタイムでミラーリング)**: Datadog は Slack ユーザーが投稿したすべてのメッセージをインシデントチャンネルに同期します。
* **Push message when 📌 is added as a reaction (📌がリアクションとして追加されたときにメッセージをプッシュする)**: Slack ユーザーがプッシュピン (📌) でリアクションした場合だけ、Datadog はそのメッセージを同期します。

どちらのオプションでも、Datadog がメッセージを同期するために、メッセージ作成者が Datadog 組織に接続されている必要はありません。メッセージのピン留めについては、ピン留めされたメッセージを同期するために、ピン留めを行うユーザーは Datadog 組織に**接続されている**必要があります。

使用量ベースの Incident Management 課金を採用している組織の場合:

* Datadog に同期されるメッセージを作成しても、当月の課金対象ユーザーには**なりません**。
* 同期されるメッセージをピン留めすると、課金対象ユーザーに**なります**。

シートベースの Incident Management 課金を採用している組織の場合:

* Datadog がメッセージを Incident Management に同期するために、シートは**必要ありません**。
* メッセージをピン留めする場合、ピン留めしたメッセージを Datadog が同期するには、シートが**必要です**。

### インシデントチャンネルでの Slack コマンド{#slack-commands-in-the-incident-channel}

インシデントの Slack チャンネルで、Slack コマンドを実行して、インシデントのステータスや重大度の変更、対応者の割り当て、オンコールチームのページングなどを行うことができます。

Slack コマンドの全リストについては、[Slack コマンド](#slack-commands)を参照してください。

### その他のインシデントチャンネル構成オプション{#other-incident-channel-configuration-options}

Incident Management における Slack のすべての構成オプションには、[[**Incidents**] > [**Settings**] > [**Integrations**]][3] ページからアクセスしてください。

| 機能                                                   | 説明と注記                                                                                                                             |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **インシデントタイムラインのメッセージを Slack にプッシュする**              | インシデントタイムラインの更新を Datadog から Slack チャンネルに自動的に送信します。<br><br>チャンネル参加者が Datadog の更新情報を常に把握できるようにします。|
| **重要なリンクをチャンネルのブックマークに追加する**              | インシデント関連のリンクを Slack チャンネルのブックマークに投稿します。<br><br>リソースへの便利なアクセスを提供します。                                    |
| **チームメンバーを自動的に追加する**                        | Datadog チームがインシデントに追加されると、そのメンバーは Slack チャンネルに追加されます。                                                      |
| **インシデントの更新を Slack チャンネルに送信する**            | インシデントのステータス、重大度、インシデントコマンダーでチャンネルトピックを更新します。                                                               |
| **会議開始時に Slack 通知を送信する**       | 会議が開始されるときに、参加者と参加リンクを含めて Slack チャンネルに通知します。<br><br>インシデント通話への便利なアクセスを提供します。    |
| **インシデント Slack チャンネルで Bits AI を有効にする**           | Datadog のインシデントコンテキストを使用する AI 機能を有効にします。<br><br>選択した Slack ワークスペース内のすべてのインシデントタイプに適用されます。               |
| **解決後に Slack チャンネルを自動的にアーカイブする** | インシデントが解決されたら、インシデント Slack チャンネルをアーカイブします。<br><br>チャンネルの乱雑さを軽減するのに役立ちます。                                            |
| **インシデント Slack アクションをカスタマイズする**                       | 各ステータスのインシデントアクショントレイに表示されるアクションをカスタマイズします。<br><br>一般的なアクションの可視性を高めます。                     |

## インシデント更新用のグローバルチャンネル{#global-channel-for-incident-updates}

Incident Management がインシデントに関する更新を特定の Slack チャンネルに自動的に投稿するように構成できます。これを有効にするには、以下の手順に従います。

1. Datadog で、**[[Incident Response] > [Incident Management] > [Settings] > [Integrations]][3]** に移動します。
1. Slack セクションで、[**Send all incident updates to a global channel**] (すべてのインシデント更新をグローバルチャンネルに送信) をオンにします。
1. インシデント更新を投稿する Slack ワークスペースと Slack チャンネルを選択します。

Datadog は、新しく宣言されたインシデントや、インシデントのステータス、重大度、インシデントコマンダーの変更について、選択されたチャンネルに自動的に通知します。

この機能は、内部的には組み込みの非表示の [インシデント通知ルール][5] です。メッセージやそのトリガーをカスタマイズする場合は、この機能を無効にして、独自の通知ルールを定義してください。

## Slack コマンド{#slack-commands}

Slack で `/datadog` (または `/dd`) と入力してコマンドモーダルを開き、Datadog のアクションを閲覧・実行するか、`/dd help` と入力してそれらのオプションを一覧表示することで、利用可能な Slack コマンドの全リストをいつでも確認できます。一般的な Incident Management アクションのアクショントレイを開くには、`/dd shortcuts` と入力します。

以下のコマンド全体で、`incident` の省略形として `inc` を使用できます。

### グローバルコマンド (どこからでも実行可能){#global-commands-run-anywhere}

| コマンド | 説明 |
| ------- | ----------- |
| `/datadog incident` | 新しいインシデントを宣言します。|
| `/datadog incident test` | 新しいテストインシデントを宣言します (インシデントタイプとしてテストインシデントが有効になっている場合)。|
| `/datadog incident list` | すべてのオープン (アクティブで安定している) インシデントを一覧表示します。|

### インシデントチャンネルコマンド{#incident-channel-commands}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
| コマンド | 説明 |
| ------- | ----------- |
| `/datadog` | コマンドモーダルを開いて、利用可能なすべての Datadog アクションを表示します。|
| `/datadog shortcuts` | インシデントアクショントレイを開いて、一般的なアクションを実行します。|
| `/datadog help` | 利用可能なすべての Slack コマンドを一覧表示する一時的なメッセージを表示します。|
| `/datadog incident update` | ステータスや重大度など、インシデントの属性を更新します。|
| `/datadog incident notify` | インシデントについて `@`-ハンドルに通知します。|
| `/datadog incident private` | インシデントを非公開にします (非公開インシデントが有効な場合)。|
| `/datadog incident public` | インシデントを公開します。|
| `/datadog incident responders` | インシデントの対応チームを管理します (対応者の追加や対応ロールの割り当てを行います)。|
| `/datadog followup` | インシデントのフォローアップを作成します。|
| `/datadog followup list` | インシデントの既存のフォローアップを表示および管理します。|
| `/datadog incident summary` | 自分のみが閲覧可能な、AI が生成したインシデントの概要を取得します。|
{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
| コマンド | 説明 |
| ------- | ----------- |
| `/datadog` | コマンドモーダルを開いて、利用可能なすべての Datadog アクションを表示します。|
| `/datadog shortcuts` | インシデントアクショントレイを開いて、一般的なアクションを実行します。|
| `/datadog help` | 利用可能なすべての Slack コマンドを一覧表示する一時的なメッセージを表示します。|
| `/datadog incident update` | ステータスや重大度など、インシデントの属性を更新します。|
| `/datadog incident notify` | インシデントについて `@`-ハンドルに通知します。|
| `/datadog incident private` | インシデントを非公開にします (非公開インシデントが有効な場合)。|
| `/datadog incident public` | インシデントを公開します。|
| `/datadog incident responders` | インシデントの対応チームを管理します (対応者の追加や対応ロールの割り当てを行います)。|
| `/datadog followup` | インシデントのフォローアップを作成します。|
| `/datadog followup list` | インシデントの既存のフォローアップを表示および管理します。|
{{< /site-region >}}

### アクショントレイボタン{#action-tray-buttons}

Datadog は、ステータスが変更されるとインシデントの Slack チャンネルに直接アクショントレイを投稿します。これにより、対応者はコマンドを入力することなく、重大度やステータスの更新といった一般的なアクションを実行できます。Slack で `/dd shortcuts` と入力して、アクショントレイを開くこともできます。

アクショントレイでは、以下のボタンを利用できます。インシデントタイプは、これらのデフォルトボタンで初期化されます。各インシデントステータスに対して表示されるボタンとその順序をカスタマイズするには、[**Incidents**] > [**Settings**] > [[**Integrations**][3]] > [**Slack Settings**] (Slack 設定) に移動し、[**Incident Slack Actions**] (インシデントの Slack アクション) を構成してください。

| ボタン                              | 説明                                                             | アクティブ時のデフォルト | 安定時のデフォルト | 解決時のデフォルト |
|--------------------------------------|---------------------------------------------------------------------------|:---:|:---:|:---:|
| ⚙️ **インシデントを編集**                | ステータス、重大度、影響、およびその他の属性を更新                 | {{< X >}} | {{< X >}} |   |
| 🧑‍🚒 **対応者を編集**             | 役割を割り当て、インシデントにチームメイトを追加                            | {{< X >}} |   |   |
| 🔍 **すべてのアクションを表示**             | このインシデントの利用可能な Slack アクションの全リストを開く           | {{< X >}} | {{< X >}} | {{< X >}} |
| 🏠 **Web アプリを表示**                 | Datadog Incident Management でインシデントを開く                         | {{< X >}} | {{< X >}} | {{< X >}} |
| ☎️ **オンコールのページング**                 | お好みのサービスを使用して進行中のインシデントについてチームに連絡       | {{< X >}} |   |   |
| 🔔 **通知**                       | インシデントについて利害関係者にメール、プッシュ、またはサービスを通じて通知    |   | {{< X >}} | {{< X >}} |
| ▶️ **Zoom を作成/参加**             | 新しい会議を開始するか、既存の会議があれば参加する                        | {{< X >}} |   |   |
| ▶️ **Google Meet を作成/参加**      | 新しい会議を開始するか、既存の会議があれば参加する                        | {{< X >}} |   |   |
| ▶️ **ワークフローを実行**                 | インシデントのために事前定義されたワークフローを選択して実行                     | {{< X >}} |   |   |
| 🟨 **安定に設定**                | 影響を軽減した後、インシデントを安定としてマーク                   | {{< X >}} |   |   |
| ✅ **インシデントを解決**             | インシデントを解決済みとしてマーク                                              |   | {{< X >}} |   |
| ✨ **Bits AI で調査**     | インシデントを調査するために Bits AI を使用                                   | {{< X >}} |   |   |
| 📋 **フォローアップを作成**             | インシデント対応中に特定されたフォローアップタスクを作成            |   | {{< X >}} | {{< X >}} |
| 📋 **フォローアップを一覧表示する**              | インシデントのフォローアップタスクを表示するおよび追跡                           |   |   | {{< X >}} |
| 📝 **ポストモーテムを作成/表示**       | インシデントのポストモーテムを作成または表示                            |   |   | {{< X >}} |

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[2]: /ja/integrations/slack/?tab=datadogforslack
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
[4]: /ja/integrations/jira/
[5]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules/
[6]: /ja/integrations/slack/?tab=datadogforslack#permissions
[7]: /ja/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates