---
app_id: silverstripe-cms
app_uuid: acd6d383-dfe8-4e70-8c68-e5f3b6da84af
assets:
  dashboards:
    Silverstripe CMS - Overview: assets/dashboards/silverstripe_cms_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - silverstripe_cms.files.count
      metadata_path: metadata.csv
      prefix: silverstripe_cms.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35271991
    source_type_name: Silverstripe CMS
  monitors:
    Pages with broken files are higher: assets/monitors/pages_with_broken_files_are_higher.json
    Pages with broken links are higher: assets/monitors/pages_with_broken_links_are_higher.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- モニター
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/silverstripe_cms/README.md
display_on_public_website: true
draft: false
git_integration_title: silverstripe_cms
integration_id: silverstripe-cms
integration_title: Silverstripe CMS
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: silverstripe_cms
public_title: Silverstripe CMS
short_description: Silverstripe CMS のコンテンツとユーザー アクティビティを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Silverstripe CMS のコンテンツとユーザー アクティビティを監視します。
  media:
  - caption: Silverstripe CMS - Overview
    image_url: images/silverstripe_cms_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Silverstripe CMS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Silverstripe CMS は、Web サイトと Web アプリケーションを作成・管理するためのオープン ソース プラットフォームです。コーディングなしで簡単にコンテンツの編集やカスタマイズが行える直感的な管理パネルを備えています。柔軟なフレームワークにより、シンプルなサイトから複雑なプロジェクトまで幅広く適しています。

SilverStripe CMS インテグレーションでは、ファイル、ページ、失敗したログイン試行に関するメトリクスを収集し、Datadog での分析と監視のために送信します。

## セットアップ

### インストール

Silverstripe CMS インテグレーションは [Datadog Agent パッケージ][1] に同梱されています。追加のインストールは不要です。

### Silverstripe CMS からデータベース認証情報を取得
| **パラメーター**        | **説明**                                            |
|----------------------|------------------------------------------------------------|
| Database Type        | データベース サーバーの種類です。MySQL または PostgreSQL のいずれかです。   |
| Database Name        | 設定済みデータベースの名前です。                       |
| Database Username    | データベースに接続するためのユーザー名です。              |
| Database Password    | そのデータベース ユーザーに関連付けられたパスワードです。            |
| Database Server IP   | データベース サーバーの IP アドレスです。                     |
| Database Port        | データベース サーバーのポート番号です。                    |

### Silverstripe CMS アカウントを Agent に接続

1. `conf.yaml.example` ファイルをコピーします。
   ```sh
   cp /etc/datadog-agent/conf.d/silverstripe_cms.d/conf.yaml.example /etc/datadog-agent/conf.d/silverstripe_cms.d/conf.yaml
   ```

2. メトリクスの収集を開始するには、この設定ブロックを `silverstripe_cms.d/conf.yaml` ファイルに追加します。
   - 利用可能な設定オプションは、サンプルの [silverstripe_cms.d/conf.yaml][2] を参照してください。
   - `conf.yaml` ファイル内で Silverstripe CMS の複数インスタンスを設定する必要がある場合は、次の例を参照してください:
     ```yaml
       init_config:
       instances:
         - SILVERSTRIPE_DATABASE_TYPE: PostgreSQL
           SILVERSTRIPE_DATABASE_NAME: <DATABASE_NAME_1>
           SILVERSTRIPE_DATABASE_SERVER_IP: <IPV4>
           SILVERSTRIPE_DATABASE_PORT: <PORT_NUMBER>
           SILVERSTRIPE_DATABASE_USERNAME: <USERNAME_1>
           SILVERSTRIPE_DATABASE_PASSWORD: <PASSWORD_1>
           min_collection_interval: 300
         - SILVERSTRIPE_DATABASE_TYPE: MySQL
           SILVERSTRIPE_DATABASE_NAME: <DATABASE_NAME_2>
           SILVERSTRIPE_DATABASE_SERVER_IP: <IPV4>
           SILVERSTRIPE_DATABASE_PORT: <PORT_NUMBER>
           SILVERSTRIPE_DATABASE_USERNAME: <USERNAME_2>
           SILVERSTRIPE_DATABASE_PASSWORD: <PASSWORD_2>
           min_collection_interval: 300
     ```

3. [Agent を再起動します][3]。

### 検証

- [Agent の status サブコマンドを実行][4] し、**Checks** セクションの `silverstripe_cms` を探します。

- または、次のコマンドでインテグレーションの詳細情報を取得します:
    ```sh
    sudo datadog-agent check silverstripe_cms
    ```

   すべての設定が正しく、Agent が Silverstripe CMS と通信できる場合、チェックは OK を返します。

## 収集データ

### ログ

Silverstripe CMS インテグレーションにはログは含まれません。

### メトリクス

Silverstripe CMS インテグレーションは、次のメトリクスを収集し、Datadog に転送します。

{{< get-metrics-from-git "silverstripe_cms" >}}

### サービスチェック

Silverstripe CMS には、[service_checks.json][5] ファイルに列挙されている Service Check が含まれます。

### イベント

- 提供されたパラメーターの認証のために `Silverstripe.CMS.silverstripe_cms_authentication` がトリガーされます。

## アンインストール

Agent 上で動作するインテグレーションの場合:

- `datadog-agent integration remove` コマンドを使用してインテグレーションを完全に削除します。詳細は [インテグレーション管理][6] を参照してください。

## サポート

For further assistance, contact [Datadog support][7].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/silverstripe_cms/datadog_checks/silverstripe_cms/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/silverstripe_cms/assets/service_checks.json
[6]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#remove
[7]: https://docs.datadoghq.com/ja/help