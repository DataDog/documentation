---
app_id: google-cloud-security-command-center
app_uuid: 200f1a0b-a67f-4096-a322-91aaee4f0de5
assets:
  dashboards:
    google-cloud-security-command-center: assets/dashboards/google_cloud_security_command_center_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 371
    source_type_name: Google Cloud Security Command Center
  logs:
    source: google.security.command.center
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- Google Cloud
- ログの収集
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_security_command_center
integration_id: google-cloud-security-command-center
integration_title: Google Cloud Security Command Center
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_security_command_center
public_title: Google Cloud Security Command Center
short_description: Security Command Center は、脆弱性や脅威を一元的に報告するサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Google Cloud
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Security Command Center は、脆弱性や脅威を一元的に報告するサービスです。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-google-security-command-center/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  support: README.md#Support
  title: Google Cloud Security Command Center
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud Security Command Center は、以下の方法でセキュリティ態勢を強化するのに役立ちます。
   * セキュリティとデータの攻撃対象領域 (アタックサーフェス) を評価する
   * 資産 (アセット) のインベントリを提供し、検出を行う
   * 誤構成、脆弱性、脅威を識別する
   * リスクの軽減と対処を支援する

Security Command Center では、Event Threat Detection や Security Health Analytics のようなサービスを利用して、環境内のセキュリティ問題を検出します。これらのサービスは Google Cloud のログやリソースをスキャンし、脅威の兆候、ソフトウェアの脆弱性、誤構成を探します。サービスはソースとも呼ばれます。詳細については [Security sources][1] をご覧ください。

これらのサービスが脅威、脆弱性、または誤構成を検出すると、ファインディング (finding) を発行します。ファインディングは、Google Cloud 環境内で発見された個々の脅威、脆弱性、または誤構成を報告または記録するものです。ファインディングには検出された問題、問題の影響を受ける Google Cloud リソース、および問題への対処方法に関するガイダンスが示されます。

## セットアップ

### インストール

開始する前に、Google Cloud Security Command Center のファインディングを収集したいプロジェクトで以下の API が有効になっていることを確認してください。
  * [Cloud Resource Manager API][2]
  * [Google Cloud Billing API][3]
  * [Google Cloud Security Command Center API][4]

### サービスアカウントにロールを割り当てる
サービスアカウントが GCP Security Command Center からファインディングを取得するには、このロールが必要です。
このロールが有効になっていない場合、PermissionDenied エラーによりログが表示されないことがあります。

次のロールを割り当ててください。
   * ***Security Center Findings Viewer*** 

**注:**

同じプロジェクトが複数のサービスアカウントによって検出される場合は、すべてのサービスアカウントに
[Security Center Findings Viewer Role][5] を追加する必要があります。

この要件を満たさない場合、PermissionDenied エラーが発生し、このプロジェクトの Security Findings を収集できなくなります。サービスアカウントが関連するすべてのプロジェクトで、必要な権限が付与されていることを必ず確認してください。

### 構成

Google Cloud Security Command Center は、メインの [Google Cloud Platform integration][6] パッケージに含まれています。
まだ設定していない場合は、先に [Google Cloud Platform インテグレーション][7]をセットアップしてください。

メインの Google Cloud Platform Integration タイルで、
1.  Security Findings を取得したいプロジェクトに対応する Service Account と ProjectID を開きます。
2.  **Security Findings** タブのトグルを使ってセキュリティファインディングの収集を有効にします。

有効化後、セキュリティファインディングが収集されるまでに ***1 日*** ほどかかる場合があります。

## 収集データ

#### ログ収集

Google Cloud Security Command Center のファインディングは、[Google Cloud Security Command Center Client API][8] を使用してログとして収集されます。

Datadog の Log Explorer 内で Google Cloud Security Command Center のログを検索するには、以下のフィルタを使用してください。
   * **Service** に ```Findings``` を設定する
   * **Source** に ```google.security.command.center``` を設定する
   * ログのステータスは **Info** になります。

### メトリクス

Google Cloud Security Command Center にはメトリクスは含まれません。

### サービスチェック

Google Cloud Security Command Center にはサービスチェックは含まれません。

### イベント

Google Cloud Security Command Center にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Google Cloud のセキュリティファインディングを整理・分析する][10]
- [Datadog Security、Google Cloud におけるコンプライアンスと脅威防御の機能を拡張][11]

[1]: https://cloud.google.com/security-command-center/docs/concepts-security-sources
[2]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[3]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[4]: https://console.cloud.google.com/apis/library/securitycenter.googleapis.com
[5]: https://cloud.google.com/security-command-center/docs/access-control-org#securitycenter.findingsViewer
[6]: https://app.datadoghq.com/integrations/google-cloud-platform
[7]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[8]: https://cloud.google.com/security-command-center/docs
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[11]: https://www.datadoghq.com/blog/datadog-security-google-cloud/