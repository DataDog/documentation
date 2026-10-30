---
aliases:
- /ja/security_platform/notification_profiles/
- /ja/security_platform/notification_rules/
- /ja/security_platform/notifications/rules/
- /ja/security/notification_profiles/
- /ja/security/notification_rules/
- /ja/security/upcoming_changes_notification_rules/
description: 通知ルールを作成し、セキュリティ検出ルールがトリガーされたときに、チームとインテグレーションに自動的に通知します。
further_reading:
- link: /security/detection_rules/
  tag: ドキュメント
  text: セキュリティ検出ルールについて
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: 通知ルール
---
{{< product-availability >}}

## 概要 {#overview}

通知ルールとは、セキュリティの問題についてチームに通知するプロセスを自動化するための、あらかじめ定義された条件セットのことです。通知ルールを活用すれば、個々の検出ルールごとに通知を手動で設定する必要はなくなります。通知ルールは、深刻度、ルールタイプ、ルールタグ、シグナル属性、シグナルタグなどのパラメーターを指定することで、幅広いシナリオをカバーするように構成できます。

{{< img src="security/notification-rules-overview-1.png" alt="通知ルールの概要ページ" style="width:100%;" >}}

## 通知ルールを作成する{#create-notification-rules}

通知ルールを作成するには、ルールがトリガーされる条件を指定します。これらの条件には、重大度、検出ルールのタイプ、タグ、属性などの基準を含めることができます。定義された基準に一致する問題が発生すると、ルールは指定された受信者に自動的に通知を送信します。

<div class="alert alert-info">ルールの設定中、[<strong>Preview of Matching Results</strong>] パネルに、通知ルールの条件に一致する問題のプレビューが表示されます。このプレビューを確認することで、通知ルールの条件が限定的すぎないか、あるいは広範すぎないかを判断し、適切な範囲をカバーできるように条件を調整できます。</div>

1. [**Notification Rules**][1] ページで、[{{< ui >}}New Notification Rule{{< /ui >}}] をクリックします。
1. 通知ルールの**名前**を入力します。
1. 通知ルールのソースタイプを選択します。
    - **Finding**: インフラストラクチャーにおける潜在的なセキュリティ上の欠陥。
    - **Signal**: インフラストラクチャーに対してアクティブな脅威となる不審なアクティビティ。
1. 1 つ以上の重大度レベルを選択します。
1. 通知ルールがトリガーされるために必要なタグと属性を指定します。
   <div class="alert alert-tip">ステップ 3 で [<strong>Signal</strong>] を選択した場合、<a href="/bits_ai/bits_security_analyst">Bits Security Analyst</a> の調査が完了した際の通知を受け取ることができます。そのためには、以下のタグを追加します: <code>@workflow.bits_investigator.state:*</code>。</div>
1. ステップ 3 で [**Finding**] を選択した場合は、通知の頻度を選択します。
   - **Aggregate results over** : このオプションを選択し、リストから期間を指定すると、その期間内に発生した検出について通知が 1 回だけ送信されます。
   - **Trigger immediately for each individual issue meeting the criteria (条件を満たす個々の問題題ごとに直ちにトリガーする)**: このオプションを選択すると、検出ごとに 1 件の通知が送信されます。<br />**注**: このオプションを選択すると、大量の通知が送信される可能性があります。
1. [**Destination**] で、ルーティングモードを選択します。
    - **手動ルーティング**: [{{< ui >}}Add Recipient{{< /ui >}}] をクリックし、通知先を指定します。個人やチームへの通知、Jira Issues の作成などを行うことができます。詳しくは、「[通知チャネル][2]」を参照してください。
    - **動的ルーティング** (プレビュー): 検出結果の `team` タグに基づいて、担当チームに通知を自動的にルーティングします。動的にルーティングできない検出結果のために、**フォールバックチャネル**を指定します。要件については、「[動的ルーティング](#dynamic-routing)」を参照してください。<br />**注**: 動的ルーティングは、ステップ 6 で [**Trigger immediately for each individual issue meeting the criteria**] が選択されている場合にのみ利用可能です。
1. このルールのテスト通知を送信するには、[{{< ui >}}Test Notifications{{< /ui >}}] をクリックします。
  1. モーダルで、テストするセキュリティ製品を選択します。
  1. [{{< ui >}}Run Test{{< /ui >}}] をクリックします。
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。

## 通知ルールを管理する {#manage-notification-rules}

### 通知ルールの有効化または無効化する{#enable-or-disable-a-notification-rule}

通知ルールの有効化または無効化を行うには、通知ルールカード上のスイッチを切り替えます。

### 通知ルールを編集する{#edit-a-notification-rule}

通知ルールを編集するには、通知ルールカードをクリックします。変更が完了したら、[{{< ui >}}Save{{< /ui >}}] をクリックします。

### 通知ルールを複製する{#clone-a-notification-rule}

通知ルールを複製するには、通知ルールカードの上の縦に並んだ 3 つのドットメニューをクリックし、[{{< ui >}}Clone{{< /ui >}}] を選択します。

### 通知ルールを削除する{#delete-a-notification-rule}

通知ルールを削除するには、通知ルールカードの上の縦に並んだ 3 つのドットメニューをクリックし、[{{< ui >}}Delete{{< /ui >}}] を選択します。

## 動的ルーティング {#dynamic-routing}

{{< callout url="https://www.datadoghq.com/product-preview/dynamic-routing-for-security-notifications/" >}}
通知ルールの動的ルーティング機能は現在プレビュー版として提供されており、集約されていない検出結果の通知でのみ利用可能です。
{{< /callout >}}

動的ルーティングは、検出結果に付与された `team` タグに基づいて、その修正を担当するチームに検出結果の通知を自動的に配信します。これにより、ルールごとに通知先を手動で設定する必要がなくなり、すべての通知を一か所で受け取るようなキャッチオール型の通知チャネルを避けることができます。

動的ルーティングは、通知頻度として [**Trigger immediately for each individual issue meeting the criteria**] が選択されている場合にのみ利用可能であり、シグナル通知では利用できません。

### ルーティングの仕組み {#how-routing-works}

検出結果が通知をトリガーすると、システムは以下のすべての条件を確認します。すべての条件が満たされると、通知はチームの Slack または Microsoft Teams チャネルに配信されます。いずれかの条件が満たされない場合、通知は設定したフォールバックチャネルに送信されます。

| 条件                                         | 説明                                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **チームが設定されている**                               | 検出結果の `team` タグで参照されるチームが、[Datadog Teams][3] に存在する必要があります。                                       |
| **チームの Slack または Microsoft Teams チャネルが定義されている** | チームに対して、Datadog Teams で Slack または Microsoft Teams の [通知チャネル][4] が設定されている必要があります。動的ルーティングには、その他の通知先は使用されません。|
| **検出結果の team タグ**                           | : セキュリティの検出結果には、`team` タグが 1 つのみ付与されている必要があります。                                                         |

チームに Slack または Microsoft Teams チャネルとその他の通知ターゲットの両方が設定されている場合、通知は Slack または Microsoft Teams チャネルにのみ配信されます。

### フォールバックチャネル {#fallback-channel}

動的ルーティングを有効にする場合は、フォールバックチャネルを指定する必要があります。フォールバックチャネルは、以下のいずれかの場合に通知を受け取ります。

- 検出結果に `team` タグがない、または `team` タグが複数付与されている場合。
- 該当するチームが Datadog Teams に存在しない場合。
- 該当チームに Slack または Microsoft Teams の通知チャネルが設定されていない場合。

フォールバックチャネルは、テスト通知にも使用されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules
[2]: /ja/security/notifications/#notification-channels
[3]: /ja/account_management/teams/
[4]: /ja/account_management/teams/#send-notifications-to-a-specific-communication-channel