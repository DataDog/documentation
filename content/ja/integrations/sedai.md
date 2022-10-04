---
assets:
  dashboards:
    Sedai Overview: assets/dashboards/sedai_overview.json
  logs: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- 自動化
- cloud
- cost-management
- notification
- orchestration
- プロビジョニング
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sedai/README.md
description: SRE のためのインテリジェントな オートパイロットとして機能する、エージェントレスでしきい値なしのクラウド管理プラットフォームです。Sedai
  は、お客様の本番環境をプロアクティブに管理し、可用性の問題の防止、パフォーマンスの向上、クラウドコストの最適化、コードリリースに関する深い洞察を提供します。
display_name: Sedai
draft: false
git_integration_title: sedai
guid: 147edbf7-176f-49de-af58-ed5f64336e07
integration_id: sedai
integration_title: Sedai
integration_version: ''
is_public: true
kind: integration
maintainer: praveen.prakash@sedai.io
manifest_version: 1.0.0
metric_prefix: sedai.
metric_to_check: ''
name: sedai
public_title: Datadog-Sedai インテグレーション
short_description: クラウドアプリケーションをインテリジェントに管理する自律的なプラットフォーム
support: contrib
supported_os:
- linux
- mac_os
- windows
---

## 概要

Sedai は、本番環境をプロアクティブに管理し、問題を防止して可用性、パフォーマンス、およびクラウドコストを改善する自律型クラウドプラットフォームです。SRE のためのインテリジェントな オートパイロットとして、Sedai は監視データを独自に検出、優先順位付け、分析し、しきい値なしに本番環境で安全かつ自律的に行動します。

このインテグレーションを有効にすると、Sedai が本番環境で自律的に実行するアクションについて、Datadog で通知を受け取ることができます。

### オートディスカバリーの動作

* **エージェントレス:** クラウドアカウントにシームレスに接続し、本番環境を自動的に検知・把握します。

* **構成不要:** Datadog API に簡単に接続し、メトリクス動作をインテリジェントに識別し、優先順位をつけて学習します。

* **プロアクティブアクション:** お客様に代わって本番稼動を安全に行い、リソースの可用性問題を回避し、常に最適な状態で稼動することを保証します。

## セットアップ

Sedai で、

1. Settings > Notifications > Add Integration > Datadog アイコンに移動します

   ![Datadog インテグレーションの追加][1]

2. Datadog アカウントのニックネームと API キーを入力します。インテグレーションを有効化し、テストします。

   ![Datadog API キーの設定][2]

3. テストが正常に行われたことを確認したら、Save をクリックします。

   ![動作中の Datadog インテグレーションの保存][3]

4. Settings > Notifications で、Datadog に送信する[通知を選択][4]します。

   ![Datadog 通知の有効化][5]

## 収集データ

このインテグレーションは、Datadog にイベントを送信します。

## サポート

このインテグレーションに関するサポートは、[Datadog サポート][6]にお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/DataDog_Notification_Integration.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel-Working_REC.png
[4]: https://sedai.gitbook.io/sedai/sedai-user-guide/controls/notifications
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Enable_Notifications.png
[6]: https://docs.datadoghq.com/ja/help/