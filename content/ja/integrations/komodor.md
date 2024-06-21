---
app_id: komodor
app_uuid: 995fe904-e761-4f2f-8dbf-148baf3f080a
assets: {}
author:
  homepage: https://komodor.com/
  name: Komodor
  sales_email: sales@komodor.com
  support_email: support@komodor.com
categories:
- コンテナ
- kubernetes
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/komodor/README.md
display_on_public_website: true
draft: false
git_integration_title: komodor
integration_id: komodor
integration_title: Komodor Automation
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: komodor
public_title: Komodor Automation
short_description: K8s のランドスケープとスタック全体の変更点を追跡する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: K8s のランドスケープとスタック全体の変更点を追跡する
  media:
  - caption: メインサービス画面。
    image_url: images/Komodor_screen_01.png
    media_type: image
  - caption: サービスビューのイベントタイムラインと関連サービス。
    image_url: images/Komodor_screen_02.png
    media_type: image
  - caption: デプロイメントとその変更を確認するサービスビュー。
    image_url: images/Komodor_screen_03.png
    media_type: image
  - caption: デプロイのレプリカセットとそのポッドとログを確認する
    image_url: images/Komodor_screen_04.png
    media_type: image
  - caption: 複数のクラスターとデプロイメントのイベントタイムライン。
    image_url: images/Komodor_screen_05.png
    media_type: image
  - caption: Datadog モニタリングアラートを表示したサービスビュー。
    image_url: images/Komodor_screen_06.png
    media_type: image
  - caption: Komodor に戻るリンクが表示された Datadog メトリクスビュー。
    image_url: images/Komodor_screen_07.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Komodor Automation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Komodor は、K8s スタック全体の変更を追跡し、その波及効果を分析し、効率的かつ独立したトラブルシューティングに必要なコンテキストを提供します。Komodor は、Kubernetes のデプロイメントを、何が変更され、どのコードがプッシュされ、誰がプッシュしたかといった関連情報とともに、タイムライン上で把握することが可能です。また、Git、構成マップ、インフラストラクチャー、アラート、Datadog などの他のツールからのデータを一元化して分かりやすく表示することができます。

このインテグレーションを使用すると、必要なダッシュボードに直接アクセスできる動的なデプロイメントリンクを使用して、Datadog メトリクスにリンクすることができます。これにより、Datadog で検出された最も関連性の高いコンテキスト、接続、サービスの依存関係に基づいて、マイクロサービスのトラブルシューティングを行うことができます。

## 計画と使用

1. [Komodor プラットフォーム][1]にログインします。
2. Helm チャートまたは Kustomize を使用して、各 Kubernetes クラスターに Komodor ポッドベース Agent をインストールします。詳しくは [Komodor のドキュメント][2]を参照して、Agent をインストールしてください。

3. Agent のインストールが完了したら、以下の手順で Datadog インテグレーションを設定します。
    - [Komodor プラットフォームインテグレーション][3]のインストール - この最初のインテグレーションステップでは、Komodor が API キーと Token キーを介して Datadog アカウントにアクセスし、Datadog で検出されたサービスの依存関係に基づいて関連サービスを提案することができるようにします。
    - [Datadog Webhook インテグレーション][4]のインストールし - これにより、Komodor は Datadog モニターからアラートを受信することができます。Komodor サービスビューですべてのアラートを確認することができます。
    - Datadog モニター通知の構成 - Datadog [モニター通知][6]に Komodor [ダイナミックリンク][5]を追加すると、Komodor の関連サービスへの直接リンクが生成されます。Datadog に接続されているアラートプロバイダーのアラートリンクを参照してください。

4. Kubernetes [アノテーション][7]を使用して、Datadog APM ダッシュボードへの関連リンクや、Datadog 内の特定のサービスメトリクスや時間範囲への動的リンクで Komodor サービスやデプロイ画面をリッチ化することができます。

## Agent

詳しくは、[Web サイトをご覧いただく][8]か、または[お問い合わせ][9]ください。

[1]: https://app.komodor.com/
[2]: https://docs.komodor.com/Learn/Komodor-Agent.html
[3]: https://docs.komodor.com/Integrations/Datadog.html
[4]: https://docs.komodor.com/Integrations/datadog-webhook.html
[5]: https://docs.komodor.com/Integrations/Datadog-Monitor-Notification.html
[6]: https://docs.datadoghq.com/ja/monitors/notify/
[7]: https://docs.komodor.com/Learn/Annotations.html
[8]: https://komodor.com/sign-up/
[9]: https://komodor.com/contact-us/