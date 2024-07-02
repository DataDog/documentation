---
further_reading:
- link: "https://docs.datadoghq.com/monitors/configuration/"
  tag: Documentation
  text: Configure Monitors
title: Create an Integration-Recommended Monitor
description: Learn how to create a monitor for your integration.
---
## 概要

[Datadog モニター][1]は、キーとなるメトリクスを追跡するので、インフラストラクチャーやインテグレーションを効率的に監視することができます。Datadog は、多くの機能やインテグレーションに対して、すぐに使えるモニターを提供しています。これらのモニターは、[Monitors Template リスト][2]で表示できます。

すぐに使えるモニターを作成して、ユーザーが Datadog インテグレーションに価値を見出せるようにしましょう。このガイドでは、インテグレーション推奨モニターを作成する手順と、作成プロセスで従うべきベストプラクティスを説明します。

Datadog インテグレーションを作成するには、[新しいインテグレーションの設定][3]を参照してください。

## 推奨モニターの作成手順
### モニターのための JSON スキーマの構築

1. [Create a monitor][4].

2. このガイドに記載されている[ベストプラクティス](#configuration-best-practices)に従ってモニターを構成します。

3. **Export Monitor** をクリックします。

4. **Select to export as a recommended monitor** (推奨モニターとしてエクスポートすることを選択) にチェックを入れます。
    {{< img src="developers/integrations/monitor_json.png" alt="推奨モニターとしてエクスポートするモニターの JSON モーダル" style="width:100%;" >}}

5. 構成したモニターの JSON スキーマを使用するには、**Copy** をクリックします。

6. コピーしたスキーマを JSON ファイルに保存し、モニターのタイトルに従って名前を付けます。例えば、`your_integration_name_alert.json` とします。

7. モニターの JSON ファイルに、タイトル、説明、タグを記入します。詳細については、[構成のベストプラクティス](#configuration-best-practices)を参照してください。

### プルリクエストを開く

1. Save the monitor JSON file to your integration's `assets/monitors` folder. Add the asset to your `manifest.json` file. See [Integrations Assets Reference][5] for more information about your integration's file structure and manifest file.

2. Open a pull request (PR) to add your recommended monitor JSON file and updated manifest file to the corresponding integration folder either in the [`integrations-extras` GitHub repository][6] or [`Marketplace` GitHub repository][9]. 

3. 承認後、Datadog は PR をマージし、インテグレーション推奨モニターが本番環境にプッシュされます。

## モニターを本番環境で検証する

すぐに使えるモニターを見るには、関連するインテグレーションタイルが Datadog に `Installed` (インストール) されている必要があります。

[Monitors Template リスト][2]でモニターを検索します。Monitors Template リストページでロゴが正しく表示されることを確認します。

## 構成のベストプラクティス

In addition to the monitor definition, the [Title](#title), [Description](#description), and Tags fields are required for recommended monitors. Set tags to "integration:<app_id>", see other available monitor tags [here][8]. For more information, see the documentation on [configuring a monitor][7].

### タイトル

The title allows users to quickly understand the underlying failure mode the alert is covering.
- Use the active voice and start with an object followed by a verb. 
- Do not use template variables.

| Needs revision                                       | Better                                 | Best                                        |
| -----------                                          | -----------                            | -----------                                 |
|High Unacknowledged Messages reported on {{host.name}}| High Unacknowledged Messages reported  |Unacknowledged Messages are higher than usual|

### 説明

Provides extra context around the failure mode and also about the impact this mode can have on the system. It should allow users to understand at a glance whether it is relevant or not for them to create a monitor out of it.

- This is not a copy of the title. 
- Define the problem stated by the title.
- Answer why this is an issue worth alerting on.
- Describe the impact of the problem.

| Needs revision                                         | Better                                       | Best                                    |
| -----------                                          | -----------                                  | -----------                             |
|未確認メッセージが多い場合は、チームに通知してください。 | Unacked messages are those that have been delivered to a consumer but have not been acknowledged as processed or handled. This monitor tracks the ratio of unacked messages.|Unacked messages are those that have been delivered to a consumer but have not been acknowledged as processed or handled. This monitor tracks the ratio of unacked messages to avoid potential bottlenecks which could lead to delays in message processing.| 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/monitors/
[2]: https://app.datadoghq.com/monitors/recommended
[3]: https://docs.datadoghq.com/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/monitors/create
[5]: https://docs.datadoghq.com/developers/integrations/check_references/#manifest-file
[6]: https://github.com/DataDog/integrations-extras
[7]: https://docs.datadoghq.com/monitors/configuration/
[8]: https://docs.datadoghq.com/monitors/manage/#monitor-tags
[9]: https://github.com/DataDog/marketplace
