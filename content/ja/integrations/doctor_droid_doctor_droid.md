---
algolia:
  subcategory: Marketplace インテグレーション
app_id: doctor-droid-doctor-droid
app_uuid: 21cab2f6-0f10-4302-9b61-7d99433a9294
assets: {}
author:
  homepage: https://drdroid.io/
  name: Doctor Droid
  sales_email: sales@drdroid.io
  support_email: support@drdroid.io
  vendor_id: doctor-droid
categories:
- ai/ml
- 自動化
- logs-restriction-queries-update-a-restriction-query
- アラート
- マーケットプレイス
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: doctor_droid_doctor_droid
integration_id: doctor-droid-doctor-droid
integration_title: Doctor Droid
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: doctor_droid_doctor_droid
pricing:
- billing_type: tag_count
  includes_assets: false
  metric: ''
  product_id: doctor-droid
  short_description: 100 クエリあたり 10 ドル (最初の 100 クエリは無料)
  tag: ''
  unit_label: クエリ
  unit_price: 10.0
public_title: Doctor Droid
short_description: 本番環境の問題に対するアラートの強化と自動調査
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Automation
  - Category::Incidents
  - Category::Alerting
  - Category::Marketplace
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Software License
  configuration: README.md#Setup
  description: 本番環境の問題に対するアラートの強化と自動調査
  media:
  - caption: Doctor Droid の Slack インテグレーションをワークスペースに追加します
    image_url: images/1.png
    media_type: image
  - caption: モニター設定に移動し、宛先として Doctor Droid の Web フックを追加します。
    image_url: images/2.png
    media_type: image
  - caption: Doctor Droid に既存のプレイブックを接続します。
    image_url: images/3.png
    media_type: image
  - caption: プレイブック分析の結果を、直接受信トレイで受け取れます。
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Doctor Droid
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Doctor Droid では、チームがモニタリングと可観測性における課題を解決するためのツールを提供しています。Doctor Droid Playbooks は、反復的で手動の作業を効率化し、エンジニアの負担を軽減するために設計された自動化ツールです。

Doctor Droid は、多数のデータソースとシームレスに統合し、強力なユーザー定義のプレイブックを作成できるプラットフォームを提供します。ログ検索、データベースクエリ、モニタリングメトリクス、または運用メトリクスの統合ビューが必要な場合にも、Doctor Droid が対応します。

Doctor Droid は、アラートを強化し、Datadog アカウントを自動分析して、システム全体の他の異常を検出します。

**仕組み**

1.  [Doctor Droid インテグレーション](https://app.datadoghq.com/integrations/doctordroid)をインストールします
2.  Doctor Droid で調査手順をプレイブックとして定義します (例: 下流のメトリクス確認、最近のデプロイ確認、エラーログ確認などの手順の定義)。
3.  Doctor Droid の Web フックをモニターに追加します。
4.  モニターがトリガーされた際に、調査の概要と洞察を自動的に取得します。

## Agent

サポートに関するお問い合わせは、support@drdroid.io までご連絡ください。


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/doctor-droid-doctor-droid" target="_blank">こちらをクリック</a>してください。