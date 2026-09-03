---
app_id: cisco-secure-endpoint
app_uuid: 9636c2eb-34f6-4aa4-a236-c39e47b21c79
assets:
  dashboards:
    Cisco Secure Endpoint - Audit: assets/dashboards/cisco_secure_endpoint_audit.json
    Cisco Secure Endpoint - Event: assets/dashboards/cisco_secure_endpoint_event.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18601889
    source_type_name: Cisco Secure Endpoint
  logs:
    source: cisco-secure-endpoint
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
- クラウド
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_endpoint/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_endpoint
integration_id: cisco-secure-endpoint
integration_title: Cisco Secure Endpoint
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_secure_endpoint
public_title: Cisco Secure Endpoint
short_description: Cisco Secure Endpoint の監査ログとイベントログからインサイトを得る。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Category::Cloud
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco Secure Endpoint の監査ログとイベントログからインサイトを取得。
  media:
  - caption: Cisco Secure Endpoint - Audit
    image_url: images/cisco_secure_endpoint_audit.png
    media_type: image
  - caption: Cisco Secure Endpoint - Event
    image_url: images/cisco_secure_endpoint_event.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Endpoint
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Cisco Secure Endpoint][1] は、エンドポイントに対する脅威から防御するため、保護・検出・対応に加えてユーザーアクセスまでを単一のエージェントで包括的にカバーするソリューションです。Cisco Secure Endpoint は、悪意のあるアクティビティをリアルタイムで検出して無効化し、デジタル資産を強固に保護します。

This integration ingests the following logs:
- 監査: 監査ログには、ユーザーが Cisco Secure Endpoint コンソールで実行した操作が記録されます。
- イベント: イベントログは、セキュリティイベントの追跡に不可欠であり、潜在的な脅威の迅速な検出、対応、分析を可能にします。

Cisco Secure Endpoint インテグレーションでは、すぐに使えるダッシュボードが提供されるため、Cisco Secure Endpoint の監査ログとイベントログに関するインサイトを得て、必要な対応をすばやく取ることができます。また、すぐに使える検出ルールも用意されており、潜在的なセキュリティ脅威を効果的に監視し、対応できます。

**免責事項**: 本インテグレーションは、個人情報を含むデータを収集する可能性があり、Datadog との契約に従って使用されるものとします。Cisco は、インテグレーションを使用することで送信される、エンドユーザー情報 (個人データを含む) のプライバシー、セキュリティ、または完全性について責任を負いません。

## セットアップ

### Cisco Secure Endpoint で API 認証情報を生成する

1. Cisco Secure Endpoint Console にログインし、左側の Menu Panel に移動します。
2. `Administration` を選択し、次に `Organization Settings` を選択します。
3. `Features` セクションの `Configure API Credentials` をクリックし、新しい API 認証情報を生成します。
4. `Legacy API Credentials (version 0 and 1)` セクションの右側にある `New API Credentials` ボタンをクリックします。
5. ポップアップモーダルに次の情報を入力します。
    - Application Name: 任意の名前。
    - Scope: `Read-only` を選択します。
    - `Create` をクリックします。
    - **Create** をクリックすると、リダイレクトされたページにクライアント ID (サードパーティ API のクライアント ID のようなもの) と API キーの値が表示されます。

### Cisco Secure Endpoint アカウントを Datadog に接続する

1. Cisco Secure Endpoint の認証情報を追加します。

    | パラメーター | 説明  |
    | ---------- | ------------ |
    | API Domain Name | Cisco Secure Endpoint Cloud の API ドメイン名は "api.<region>.amp.cisco.com" です。"region" の部分は、Cisco Secure Endpoint サーバーのリージョンに応じて調整してください。Cisco Secure Endpoint が VPC (仮想プライベートクラウド) 上でホストされている場合は、API ドメイン名を直接指定してください。 |
    | Client ID | Cisco Secure Endpoint のクライアント ID。 |
    | API Key | Cisco Secure Endpoint の API キー。 |
    | Get Endpoint Details | Cisco Secure Endpoint のイベントログでエンドポイントのメタデータを収集する場合は、デフォルト値 "true" のままにします。不要な場合は "false" に設定します。 |

2. Save ボタンをクリックして設定を保存します。

## 収集データ

### ログ

Cisco Secure Endpoint インテグレーションは、Cisco Secure Endpoint の監査ログおよびイベントログを収集し、Datadog に転送します。

### メトリクス

Cisco Secure Endpoint インテグレーションにはメトリクスは含まれていません。

### イベント

Cisco Secure Endpoint インテグレーションにはイベントは含まれていません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

[1]: https://www.cisco.com/site/in/en/products/security/endpoint-security/secure-endpoint/index.html
[2]: https://docs.datadoghq.com/ja/help/