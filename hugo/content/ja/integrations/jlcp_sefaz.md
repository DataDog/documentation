---
algolia:
  subcategory: Marketplace インテグレーション
app_id: jlcp-sefaz
app_uuid: fc85f52c-08c0-48bc-9617-6950707c8f91
assets:
  dashboards:
    JLCPSefaz_CompactView: assets/dashboards/JLCPSefaz_CompactView.json
    JLCPSefaz_DetailedView: assets/dashboards/JLCPSefaz_DetailedView.json
    JLCPSefaz_Overview: assets/dashboards/JLCPSefaz_Overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - sefaz.can_connect
      - sefaz.response_time
      metadata_path: metadata.csv
      prefix: sefaz.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15205183
    source_type_name: JLCP Sefaz
  monitors:
    Authorizer Service is down: assets/monitors/metric_monitor.json
author:
  homepage: https://www.jlcp.com.br/
  name: JLCP
  sales_email: contato@jlcp.com.br
  support_email: contato@jlcp.com.br
  vendor_id: jlcp
categories:
- alerting
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: jlcp_sefaz
integration_id: jlcp-sefaz
integration_title: Sefaz
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: jlcp_sefaz
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: jlcp-sefaz
  short_description: ブラジル全州を監視
  unit_price: 100.0
public_title: Sefaz
short_description: ブラジル各州の SEFAZ サービスを監視
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
  - Category::Alerting
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: ブラジル各州の SEFAZ サービスを監視
  media:
  - caption: 'JLCP: Sefaz 概要'
    image_url: images/JLCPSefaz_Overview.png
    media_type: image
  - caption: 'JLCP: Sefaz コンパクト ビュー'
    image_url: images/JLCPSefaz_CompactView.png
    media_type: image
  - caption: 'JLCP: Sefaz 詳細ビュー'
    image_url: images/JLCPSefaz_DetailedView.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sefaz
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

JLCP Sefaz インテグレーションは、ブラジル各州で電子インボイス (NF-e) 向けのサービスを提供する Secretaria de Estado da Fazenda (SEFAZ) を監視します。SEFAZ は税務管理と電子会計文書の発行を担っており、これらはブラジルにおける財務管理と商取引の適法性に不可欠です。

このインテグレーションは、NF-e サービスの可用性ステータス (OK、WARNING、CRITICAL など) と各サービスの応答時間に関するテレメトリー データを収集します。

監視対象サービスは次のとおりです:
- nfe_inutilizacao: NF-e 番号の無効化
- nfe_consulta_protocolo: NF-e プロトコルの照会
- nfe_status_servico: NF-e サービスステータスの照会
- nfe_consulta_cadastro: 納税者登録の照会
- nfe_recepcao_evento: NF-e イベントの受信
- nfe_autorizacao: NF-e 発行の承認
- nfe_ret_autorizacao: NF-e 承認結果の取得
- nfe_distribuicao_dfe: 電子会計文書の配布

##### お客様へのメリット

このインテグレーションにより、ブラジルで電子インボイス (NF-e) を発行するうえで不可欠な NF-e サービスの健全性を、包括的かつプロアクティブに可視化できます。可用性やパフォーマンスの問題を迅速に特定・解決し、商取引を継続しながら税務要件を確実に満たせます。詳細な可視化とパフォーマンス分析により、プロセス最適化、インフラ容量計画、ダウンタイム削減が可能となり、運用効率と顧客満足度が向上します。

## サポート

サポートや機能追加のご要望は [contato@jlcp.com.br][3] までご連絡ください。対応言語: 英語、スペイン語、ポルトガル語。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: mailto:contato@jlcp.com.br

---
本アプリケーションは Datadog Marketplace を通じて提供され、Datadog テクノロジーパートナーによってサポートされています。ご利用の際は、<a href="https://app.datadoghq.com/marketplace/app/jlcp-sefaz" target="_blank">Marketplace で本アプリケーションを購入</a>してください。