---
app_id: steadybit
app_uuid: b1194c36-afd0-47dc-9c0a-11f3ab82f387
assets:
  dashboards:
    Steadybit Chaos Engineering Activity: assets/dashboards/steadybit.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: steadybit.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10321
    source_type_name: Steadybit
author:
  homepage: https://steadybit.com/
  name: Steadybit
  sales_email: sales@steadybit.com
  support_email: support@steadybit.com
categories:
- インシデント
- テスト
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/steadybit/README.md
display_on_public_website: true
draft: false
git_integration_title: steadybit
integration_id: steadybit
integration_title: Steadybit
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: steadybit
public_title: Steadybit
short_description: カオスエンジニアリングでシステムの信頼性を即座に向上させる
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: カオスエンジニアリングでシステムの信頼性を即座に向上させる
  media:
  - caption: Datadog API と Steadybit のインテグレーションを実際に動かしているビデオです。
    image_url: images/steadybit_experiment_editor.png
    media_type: ビデオ
    vimeo_id: 782622274
  - caption: Datadog のモニターステータスは、一度実行されると、実験の動作を制御するために使用されます。
    image_url: images/steadybit_experiment_execution_run_log.png
    media_type: image
  - caption: Datadog の関連するモニターのステータスは、Steadybit 内で時系列に表示されます。
    image_url: images/steadybit_experiment_execution_monitor_status_over_time.png
    media_type: image
  - caption: Steadybit は、Datadog にイベントを報告し、組織全体の認識を高めます。
    image_url: images/steadybit_events_in_datadog.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Steadybit
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Steadybit][1] は、制御された方法で乱流状態をシミュレートし、システムの信頼性を向上させ、組織をより良いインシデント管理へと導くことができるカオスエンジニアリングプラットフォームです。

Steadybit インテグレーションは、カオスエンジニアリングの実験内で Datadog モニターのステータスを使用します。このインテグレーションは、実験の環境、開始・終了時間、実験の結果など、カオスエンジニアリングのアクティビティを Datadog のイベントを通じてチームに洞察させるものです。

## 計画と使用

Datadog と Steadybit のインテグレーションは、[Steadybit Datadog 拡張機能][2]を介して行われます。この拡張機能は、Datadog の API と対話し、モニターに関する情報を収集し、Datadog にイベントを報告します。

### 前提条件

Steadybit の[無償または有償ライセンス][3]が必要です。インテグレーションは、Steadybit の SAAS とオンプレミスの提供をサポートしています。

### インフラストラクチャーリスト

いくつかの[インストール方法がサポートされています][4]。最高の体験を得るためには、以下のように専用の Helm チャートを介して Steadybit Datadog 拡張機能をインストールしてください。`datadog.siteParameter` と `datadog.siteUrl` にサポートされている値については、[Datadog サイト][5]のページを参照してください。

```
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update

helm upgrade steadybit-extension-datadog \
  --install \
  --wait \
  --timeout 5m0s \
  --create-namespace \
  --namespace steadybit-extension \
  --set datadog.apiKey="{{API_KEY}}" \
  --set datadog.applicationKey="{{APPLICATION_KEY}}" \
  --set datadog.siteParameter="{{SITE_PARAMETER}}" \
  --set datadog.siteUrl="{{SITE_URL}}" \
  steadybit/steadybit-extension-datadog
```

### 検証

Steadybit Datadog 拡張機能を実行すると、Steadybit の *Landscape* タブ内に Datadog モニターのリストが表示されます。

## リアルユーザーモニタリング

### データセキュリティ

Steadybit には、メトリクスは含まれません。

### ヘルプ

Steadybit には、サービスのチェック機能は含まれません。

### ヘルプ

Steadybit は、カオスエンジニアリングのアクティビティを示すイベントを Datadog に報告します。そのようなイベントにはすべて `source:steadybit` タグが付きます。

## ヘルプ

ご不明な点は、[Steadybit のサポートチーム][6]までお問い合わせください。

[1]: https://steadybit.com/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[2]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[3]: https://signup.steadybit.io/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[4]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme#content-installation
[5]: https://docs.datadoghq.com/ja/getting_started/site/#access-the-datadog-site
[6]: mailto:support@steadybit.com