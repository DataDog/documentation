---
app_id: ping-one
app_uuid: 5fce4e84-ab6e-4ba6-b996-ac85e134642e
assets:
  dashboards:
    PingOne: assets/dashboards/ping_one.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18081106
    source_type_name: PingOne
  logs:
    source: ping-one
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ping_one/README.md
display_on_public_website: true
draft: false
git_integration_title: ping_one
integration_id: ping-one
integration_title: PingOne
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ping_one
public_title: PingOne
short_description: PingOne ログから有用なインサイトを得られます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: PingOne ログから有用なインサイトを得られます。
  media:
  - caption: PingOne
    image_url: images/ping_one.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: PingOne
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[PingOne][1] は Ping Identity 社が提供する identity-as-a-service (IDaaS) 形式のクラウド ベースのアイデンティティ プラットフォームです。シングル サインオン (SSO)、マルチ ファクター 認証 (MFA)、ユーザー 管理など、アイデンティティ管理およびアクセス管理 (IAM) に関する幅広いサービスを提供します。

このインテグレーションは、次のログを取り込みます:

- Audit: PingOne 管理コンソールおよび PingDirectory 上で実行されたすべての操作を表します。コンプライアンス対応やその他のビジネス ポリシーの適用のために、アクティビティの履歴を記録しておく用途に利用できます。

PingOne インテグレーションは、REST API を使用して PingOne 監査ログのデータをシームレスに収集します。あらかじめ用意されたログ パイプラインによってログはパースおよびエンリッチされ、検索や分析を容易に行えます。このインテグレーションには、Audit イベントの総数、ログイン 成功 / 失敗回数、Kerberos ログイン 成功 / 失敗回数などを可視化する複数のダッシュボードが含まれます。

## セットアップ

### PingOne で API クレデンシャルを作成する

1. [PingOne アカウント][2] にログインします。
2. ナビゲーション サイドバーで **Applications** セクションを展開し、**Applications** を選択します。
3. **+** (プラス) をクリックして、新しいアプリケーションの作成を開始します。
4. **Application Name** を入力します。
5. アプリケーション タイプとして **Worker** を選択します。
6. アプリケーションのフライアウトで、ヘッダーのトグル スイッチが有効になっていることを確認し、アプリケーションを有効化します。
7. アプリケーション フライアウトの **Roles** タブを選択します。
8. **Grant Roles** ボタンをクリックします。
9. **Available responsibilities** 内の **Environment Admin** セクションで、アクセス権を付与する環境を選択し、**Save** をクリックします。
10. **Configuration** タブを選択して **Edit** をクリックし、**Token Endpoint Authentication Method** を **Client Secret Post** に変更してから、**Save** をクリックします。
11. アプリケーション フライアウトの **Configuration** タブを開き、**Client ID**、**Client Secret**、**Environment ID** を取得します。

### PingOne アカウントを Datadog に接続する

1. PingOne のクレデンシャルを Datadog に追加します。

    | PingOne パラメーター | 説明                                                                |
    | ----------------------------- | ----------------------------------------------------------------|
    | Domain                        | PingOne のトップレベル ドメインです。                              |
    | Environment ID                | PingOne の Environment ID です。                                |
    | Client ID                     | PingOne の Client ID です。                                     |
    | Client Secret                 | PingOne の Client Secret です。                                 |

2. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### ログ

このインテグレーションは PingOne の監査ログを収集し、Datadog に転送します。

### メトリクス

PingOne インテグレーションにはメトリクスは含まれません。

### イベント

PingOne インテグレーションにはイベントは含まれません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][3]にお問い合わせください。

[1]: https://www.pingidentity.com/en.html
[2]: https://www.pingidentity.com/bin/ping/signOnLink
[3]: https://docs.datadoghq.com/ja/help/