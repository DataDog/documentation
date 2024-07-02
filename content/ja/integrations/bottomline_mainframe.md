---
algolia:
  subcategory: Marketplace インテグレーション
app_id: bottomline-mainframe
app_uuid: 249f45de-03cc-45f3-8a57-c40ce33e62a3
assets: {}
author:
  homepage: https://www.bottomline.com/
  name: Bottomline Technologies
  sales_email: partner.cfrm@bottomline.com
  support_email: partner.cfrm@bottomline.com
  vendor_id: bottomline
categories:
- mainframes
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bottomline_mainframe
integration_id: bottomline-mainframe
integration_title: Bottomline Record and Replay
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: bottomline_mainframe
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.bottomline.mainframe.activity.usr.id.count
  product_id: mainframe
  short_description: モニターユーザー 1 人あたりの単価
  tag: mainframe_user
  unit_label: Mainframe 登録ユーザー
  unit_price: 4.68
public_title: Bottomline Record and Replay
short_description: ネットワークトラフィックを利用して 3270/5250 Mainframe のユーザーとリソースを監視する
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframes
  - Category::Marketplace
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: ネットワークトラフィックを利用して 3270/5250 Mainframe のユーザーとリソースを監視する
  media:
  - caption: Bottomline の Record and Replay 概要
    image_url: images/video.png
    media_type: ビデオ
    vimeo_id: 779688046
  - caption: Mainframe Record and Replay ユーザーセッション
    image_url: images/mainframe_replay.png
    media_type: image
  - caption: Record and Replay 詳細
    image_url: images/bt_replay.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Bottomline Record and Replay
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Bottomline の Mainframe Record and Replay は、ネットワークトラフィックを介して 3270/5250 ユーザーを監視することができる非侵襲的なソリューションです。Bottomline は、業界をリードする詐欺や金融犯罪のソリューションで、高度な方法でユーザーやシステムの監視を支援します。

Datadog Marketplace から Bottomline のライセンスを購入すると、すぐに使える[インテグレーション][3]で以下の情報を監視することが可能です。

### モニタリング機能

- Mainframe ユーザー: ユーザーセッションを記録、再生し、ユーザーがセッションで何を行ったかについての情報をログに記録します。
- Mainframe: ユーザーのレスポンスタイム、リソースのレスポンスタイム。

## Agent
サポートや機能のリクエストは、[Bottomline](mailto:partner.cfrm@bottomline.com) にお問い合わせください。

[1]: https://www.bottomline.com/
[2]: https://www.bottomline.com/us
[3]: https://app.datadoghq.com/integrations/bottomline-recordandreplay


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/bottomline-mainframe" target="_blank">こちらをクリック</a>してください。