---
app_id: cisco-duo
app_uuid: 8d3e0e2f-df52-4a12-a976-3ded71553a3a
assets:
  dashboards:
    Cisco Duo - Activity Logs: assets/dashboards/cisco_duo_activity_logs.json
    Cisco Duo - Administrator Logs: assets/dashboards/cisco_duo_administrator_logs.json
    Cisco Duo - Authentication Logs: assets/dashboards/cisco_duo_authentication_logs.json
    Cisco Duo - Offline Enrollment Logs: assets/dashboards/cisco_duo_offline_enrollment_logs.json
    Cisco Duo - Telephony Logs: assets/dashboards/cisco_duo_telephony_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6576439
    source_type_name: cisco-duo
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- セキュリティ
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_duo/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_duo
integration_id: cisco-duo
integration_title: Cisco Duo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_duo
public_title: Cisco Duo
short_description: Cisco Duo のログからインサイトを得る。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco Duo のログからインサイトを得る。
  media:
  - caption: Cisco Duo - 認証ログ
    image_url: images/cisco_duo_authentication_logs.png
    media_type: image
  - caption: Cisco Duo - アクティビティログ
    image_url: images/cisco_duo_activity_logs.png
    media_type: image
  - caption: Cisco Duo - 管理者ログ
    image_url: images/cisco_duo_administrator_logs.png
    media_type: image
  - caption: Cisco Duo - テレフォニーログ
    image_url: images/cisco_duo_telephony_logs.png
    media_type: image
  - caption: Cisco Duo - オフライン登録ログ
    image_url: images/cisco_duo_offline_enrollment_logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Duo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Cisco Duo][1] は多要素認証 (MFA) と安全なアクセスを提供するソリューションです。モバイルアプリなどの第二要素でユーザーが本人確認を行ってからアプリケーションやシステムへのアクセスを許可することで、追加のセキュリティ層を提供します。Duo はリモートアクセスのセキュリティを強化するためによく使用され、パスワードが漏洩した場合でも不正アクセスから保護するのに役立ちます。

このインテグレーションは次のログを取り込みます。
- 認証
- Activity
- 管理者
- テレフォニー
- オフライン登録

Cisco Duo インテグレーションは、多要素認証 (MFA) と安全なアクセスのログをシームレスに収集し、Datadog に取り込みます。組み込みのログパイプラインを活用してこれらのログを解析・強化し、簡単に検索や分析が可能です。このインテグレーションにより、不正認証イベント、認証アクティビティのタイムライン、アクセスされた場所、認証デバイスなど、多くの情報をあらかじめ用意されたダッシュボードを通じて可視化できます。

## セットアップ

### 構成

#### Cisco Duo の API クレデンシャルを取得する

1. [**Duo アカウント**][2]にサインアップしてください。
2. [**Duo 管理パネル**][3]にログインしてください。
3. **Applications** に移動します。
4. **Protect an Application** をクリックし、アプリケーション一覧から _Admin API_ を探します。
6. **Protect** をクリックしてアプリケーションを設定し、`integration key`、`secret key`、`API hostname` を取得します。これらの情報は Cisco Duo インテグレーションの設定時に使用します。
7. _Grant read log_ の権限が選択されていることを確認し、**Save Changes** をクリックします。

#### Cisco Duo DataDog インテグレーション設定

Cisco Duo ログを Datadog に転送するよう、Datadog のエンドポイントを設定します。

1. `Cisco Duo` に移動します。
2. Cisco Duo のクレデンシャルを追加します。

| Cisco Duo パラメーター | 説明  |
| -------------------- | ------------ |
| ホスト                 | Cisco Duo から取得した API Hostname。`https://api-XXXXXXXX.duosecurity.com` の `XXXXXXXX` の部分です。  |
| Integration Key      | Cisco Duo から取得した Integration Key です。    |
| Secret Key           | Cisco Duo から取得した Secret Key です。         |

## 収集データ

### Logs

Cisco Duo インテグレーションは、Cisco Duo の認証、アクティビティ、管理者、テレフォニー、オフライン登録の各ログを収集して Datadog に転送します。

### メトリクス

Cisco Duo インテグレーションにはメトリクスは含まれていません。

### イベント

Cisco Duo インテグレーションにはイベントは含まれていません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][4]にお問い合わせください。

[1]: https://duo.com/
[2]: https://signup.duo.com/
[3]: https://admin.duosecurity.com/
[4]: https://docs.datadoghq.com/ja/help/