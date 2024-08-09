---
app_id: sofy
app_uuid: eea6fdbc-2f8d-4483-bbd3-767818b1c25a
assets:
  dashboards:
    Sofy Overview: assets/dashboards/sofy_sofy_overview.json
  integration:
    metrics:
      check: sofy.step.cpu_utilization
      metadata_path: metadata.csv
      prefix: sofy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Sofy
author:
  homepage: https://sofy.ai
  name: Sofy
  sales_email: devops@sofy.ai
  support_email: devops@sofy.ai
  vendor_id: sofy
categories:
- テスト
- モバイル
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/README.md
display_on_public_website: true
draft: false
git_integration_title: sofy_sofy
integration_id: sofy
integration_title: Sofy
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sofy_sofy
pricing: []
public_title: Sofy
short_description: 自動テストケースの実行中にデバイスのメトリクスを監視する
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
  - Category::Testing
  - Category::Mobile
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: 自動テストケースの実行中にデバイスのメトリクスを監視する
  media:
  - caption: Sofy と Datadog を連携させる
    image_url: images/datadog_connect.png
    media_type: image
  - caption: アプリケーションからメトリクスを送信できるようにする
    image_url: images/datadog_monitoring.png
    media_type: image
  - caption: Sofy デバイスメトリクス
    image_url: images/datadog_metrics.png
    media_type: image
  - caption: コードなし自動テストケーステスト実行
    image_url: images/datadog_testperform.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sofy
---



## 概要

Sofy は、モバイルアプリの自動テストを作成するためのノーコードプラットフォームです。ユーザーは CI/CD パイプラインとインテグレーションすることで、実際のデバイス上でテストを実行し、パフォーマンスメトリクスとともに機能テストの結果を確認することができます。

このインテグレーションは、ロードタイム、ネットワーク、メモリ使用率、CPU などのキーとなるメトリクスとトレンドを可視化することで、テストプロセスに対するより深い洞察を提供します。すぐに使えるダッシュボードは、Sofy のテスト結果をリアルタイムで可視化し、長期的なパフォーマンスの監視と分析を可能にし、ソフトウェア全体の品質を向上させるためのデータ駆動型の意思決定を行うことができます。

## 収集データ
### メトリクス

このチェックによって提供されるメトリクスの完全なリストについては、[metadata.csv][1] を参照してください。


## セットアップ
Sofy インテグレーションを設定するには

1. [Datadog インテグレーションページ][2]に移動し、Sofy タイルをクリックします。

2. **Configuration** タブを開き、一番下の **Install Integration** をクリックします。

3. **Connect Accounts** をクリックすると、Sofy の Account Settings の [Integration タブ][3]にリダイレクトします。

4. [Sofy][4] にログインし、Datadog タイルの **Connect** ボタンをクリックし、インテグレーションを開始します。

5. Datadog とのインテグレーションを認可するために、一連の OAuth ステップに従うよう Sofy から指示があります。Sofy が Datadog にデータを送信できるようにするために必要な権限を付与することを確認しながら、このステップに注意深く従ってください。

6. インテグレーションが完了したら、左側のメニューからアプリマネージャーのページを選択し、アプリマネージャーのページに移動します。そこから、ページの右側にあるモニタリングタブをクリックします。適切なスイッチを切り替えて、選択したアプリの Datadog モニタリングを有効にします。

7. これで Sofy は、選択したアプリで実行するたびに Datadog へのデータ送信を開始し、リアルタイムで結果を監視・分析できるようになります。


## アンインストール
* Datadog の [API キー管理ページ][5]で Sofy を検索し、このインテグレーションに関連するすべての API キーが無効化されていることを確認します。

## サポート
ご不明な点は、[Sofy サポート][6]までお問い合わせください。

## その他の参考資料
お役に立つドキュメント、リンクや記事:
* [ブログ記事][7]
* [ドキュメント][8]


[1]: https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/metadata.csv
[2]: https://app.datadoghq.com/integrations
[3]: https://portal.sofy.ai/app/user-settings?selectedTab=integration
[4]: https://portal.sofy.ai
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Sofy
[6]: https://support.sofy.ai/support/tickets/new
[7]: https://sofy.ai/blog/
[8]: https://docs.sofy.ai