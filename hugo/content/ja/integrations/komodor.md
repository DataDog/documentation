---
app_id: komodor
categories:
- incident-teams
- kubernetes
- notifications
custom_kind: integration
description: K8s のランドスケープとスタック全体の変更点を追跡する
integration_version: 1.0.0
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
supported_os:
- linux
- windows
- macos
title: Komodor Automation
---
## 概要

Komodor は、K8s スタック全体の変更を追跡し、その波及効果を分析し、効率的かつ独立したトラブルシューティングに必要なコンテキストを提供します。Komodor は、Kubernetes のデプロイメントを、何が変更され、どのコードがプッシュされ、誰がプッシュしたかといった関連情報とともに、タイムライン上で把握することが可能です。また、Git、構成マップ、インフラストラクチャー、アラート、Datadog などの他のツールからのデータを一元化して分かりやすく表示することができます。

このインテグレーションを使用すると、必要なダッシュボードに直接アクセスできる動的なデプロイメントリンクを使用して、Datadog メトリクスにリンクすることができます。これにより、Datadog で検出された最も関連性の高いコンテキスト、接続、サービスの依存関係に基づいて、マイクロサービスのトラブルシューティングを行うことができます。

## セットアップ

1. [Komodor プラットフォーム](https://app.komodor.com/)にログインします。

1. Helm チャートまたは Kustomize を使用して、各 Kubernetes クラスターに Komodor ポッドベース Agent をインストールします。詳しくは [Komodor のドキュメント](https://help.komodor.com/hc/en-us/sections/17579101174674-Komodor-Agent)を参照して、Agent をインストールしてください。

1. Agent のインストールが完了したら、以下の手順で Datadog インテグレーションを設定します。

   - [Komodor プラットフォームインテグレーション](https://help.komodor.com/hc/en-us/articles/16241138371858-Datadog-Integration)のインストール - この最初のインテグレーションステップでは、Komodor が API キーと Token キーを介して Datadog アカウントにアクセスし、Datadog で検出されたサービスの依存関係に基づいて関連サービスを提案することができるようにします。
   - [Datadog Webhook インテグレーション](https://help.komodor.com/hc/en-us/articles/16241177474578-Datadog-Webhook-Integration)のインストールし - これにより、Komodor は Datadog モニターからアラートを受信することができます。Komodor サービスビューですべてのアラートを確認することができます。
   - Datadog モニター通知の構成 - Datadog [モニター通知](https://docs.datadoghq.com/monitors/notify/)に Komodor [ダイナミックリンク](https://help.komodor.com/hc/en-us/articles/16241181517714-Datadog-Monitor-Notifications)を追加すると、Komodor の関連サービスへの直接リンクが生成されます。Datadog に接続されているアラートプロバイダーのアラートリンクを参照してください。

1. Komodor [アノテーション](https://help.komodor.com/hc/en-us/articles/16240380547730-Komodor-Custom-3rd-Party-Links)を使用して、Datadog APM ダッシュボードへの関連リンクや、Datadog 内の特定のサービスメトリクスや時間範囲への動的リンクで Komodor サービスやデプロイ画面をリッチ化することができます。

## サポート

詳しくは、[Web サイトをご覧いただく](https://komodor.com/sign-up/)か、または[お問い合わせ](https://komodor.com/contact-us/)ください。