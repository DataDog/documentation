---
app_id: komodor-komodor
app_uuid: d62310ba-c7a8-4c5b-ab9f-60bb46527f1b
assets: {}
author:
  homepage: https://komodor.com
  name: Komodor
  sales_email: datadogsales@komodor.com
  support_email: support@komodor.com
  vendor_id: komodor
categories:
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: komodor_komodor
integration_id: komodor-komodor
integration_title: Komodor
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/Terms of Use.pdf
manifest_version: 2.0.0
name: komodor_komodor
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.komodor.komodor
  product_id: komodor
  short_description: ノードのボリュームに応じた価格帯の設定
  tag: ノード
  unit_label: 監視されるノード
  unit_price: 15.0
public_title: Komodor
short_description: Kubernetes トラブルシューティングプラットフォーム
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Kubernetes トラブルシューティングプラットフォーム
  media:
  - caption: Komodor のメインサービスビューと全ワークロードの可視化
    image_url: images/Komodor_screen_01.png
    media_type: image
  - caption: 複数のサービス間の関連付けを行い、1 つのタイムライン上でイベントの連鎖をつなぎ合わせることができる
    image_url: images/Komodor_screen_02.png
    media_type: image
  - caption: Kubernetes マニフェストの変更と Komodor による構成変更を簡単に比較できる
    image_url: images/Komodor_screen_03.png
    media_type: image
  - caption: ポッドの状態やログを kubectl コマンド一つで深堀りできる
    image_url: images/Komodor_screen_04.png
    media_type: image
  - caption: Datadog のアラート、Kubernetes のイベント、可用性の問題を 1 つのシンプルなビューで接続できる
    image_url: images/Komodor_screen_06.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Komodor
---



## 概要

Komodor は、K8s スタック全体の変更を追跡し、その波及効果を分析し、効率的かつ独立したトラブルシューティングに必要なコンテキストを提供します。Komodor は、Kubernetes のデプロイメントを、何が変更され、どのコードがプッシュされ、誰がプッシュしたかといった関連情報とともに、タイムライン上で把握することが可能です。また、Git、構成マップ、インフラストラクチャー、アラート、Datadog などの他のツールからのデータを一元化して分かりやすく表示することができます。

Datadog マーケットプレイスでのご提供には、Komodor プラットフォームへのアクセスが含まれています。すでに Komodor をご利用で、インスタンスを Datadog に接続する必要があるお客様は、[インテグレーションをセットアップ][1]してください。

## サポート
Komodor では、お客様の成功に必要なツールと情報の提供をお約束します。そのため、必要なときに必要なサポートを受けられるよう、以下のとおり複数の方法をご用意しています。Komodor アプリケーション内（右下のお問い合わせボタン）からメッセージを送信、ドキュメントで必要な情報を見つける、あるいは [support@komodor.com](mailto:support@komodor.com) までメールを送信しサポートチケットを作成してください。


[1]: https://app.datadoghq.com/account/settings#integrations/komodor
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/komodor-komodor" target="_blank">こちらをクリック</a>してください。