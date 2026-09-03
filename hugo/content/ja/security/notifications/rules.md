---
aliases:
- /ja/security_platform/notification_profiles/
- /ja/security_platform/notification_rules/
- /ja/security_platform/notifications/rules/
- /ja/security/notification_profiles/
- /ja/security/notification_rules/
description: 通知ルールを作成し、セキュリティ検出ルールがトリガーされたときに、チームとインテグレーションに自動的に通知します。
further_reading:
- link: /security/detection_rules/
  tag: ドキュメント
  text: セキュリティ検出ルールについて
products:
- icon: cloud-security-management
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: 通知ルール
---

{{< product-availability >}}

## 概要

通知ルールは、セキュリティ問題に関するチームへの通知プロセスを自動化するための、事前に定義された条件のセットです。通知ルールを使用することで、各検出ルールごとに通知を手動でセットアップする必要がなくなります。通知ルールは、深刻度、ルールのタイプ、ルールタグ、シグナル属性、シグナルタグなどのパラメーターを指定することで、さまざまなシナリオに対応できるように構成できます。

{{< img src="security/notification-rules-overview.png" alt="通知ルール概要ページ" style="width:100%;" >}}

## 通知ルールの作成

通知ルールを作成するには、そのルールがトリガーされる条件を指定します。これらの条件には、深刻度、検出ルールのタイプ、タグ、属性などの基準が含まれます。問題が定義された条件に一致すると、そのルールによって指定された受信者に通知が自動的に送信されます。

<div class="alert alert-info">ルールの構成中、通知ルールの条件に一致する問題のプレビューが <strong>Preview of Matching Results</strong> パネルに表示されます。このプレビューは、通知ルールが特定しすぎているか、あるいは広範すぎるかを判断するのに役立ち、条件を調整して最適なカバー範囲を設定できます。</div>

1. [**Notification Rules**][1] ページで、**New Notification Rule** をクリックします。
1. 通知ルールの **Name** (名前) を入力します。
1. 通知ルールのソースタイプを選択します。
    - **Vulnerability** : インフラストラクチャーにおける潜在的なセキュリティの欠陥。
    - **Signal** : インフラストラクチャーに対してアクティブな脅威をもたらす疑わしい活動。
1. 1 つ以上の深刻度レベルを選択します。
1. 通知ルールがトリガーされるために必要なタグと属性を指定します。
1. **Add Recipient** をクリックします。
1. 通知ルールがトリガーされた際に通知を行う受信者を指定します。個人やチーム、Jira 課題の作成など、さまざまな通知が可能です。詳細は[通知チャネル][2]を参照してください。
1. **Save** をクリックします。

{{< img src="security/notification-rules-setup.png" alt="通知ルールを作成するためのセットアップページ" style="width:100%;" >}}

## 通知ルールの管理

### 通知ルールの有効化または無効化

通知ルールの有効化または無効化を行うには、通知ルールカード上のスイッチを切り替えます。

### 通知ルールの編集

通知ルールを編集するには、通知ルールカードをクリックし、変更が完了したら **Save** をクリックします。

### 通知ルールの複製

通知ルールを複製するには、通知ルールカードの縦に並んだ 3 つのドットメニューをクリックし、**Clone** を選択します。

### 通知ルールの削除

通知ルールを削除するには、通知ルールカードの縦に並んだ 3 つのドットメニューをクリックし、**Delete** を選択します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules
[2]: /ja/security/notifications/#notification-channels