---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/vercel/README.md'
display_name: Vercel
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-vercel-serverless-functions-with-datadog/'
    tag: ブログ
    text: Datadog で Vercel のサーバーレス関数を監視する
git_integration_title: vercel
guid: cf0daf64-9c85-43b1-8b6b-7d08f8d31b0f
integration_id: vercel
integration_title: Vercel
is_public: true
kind: integration
maintainer: 'https://docs.datadoghq.com/help/'
manifest_version: 1.0.0
metric_prefix: vercel.
metric_to_check: ''
name: vercel
public_title: Vercel
short_description: Vercel で実行中のサーバーレスアプリケーションを監視する
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
![Datadog インテグレーション][1]

## 概要

[Vercel][2] は、フロントエンド開発者が高性能のウェブサイトやアプリケーションを構築するためのデプロイおよびコラボレーションプラットフォームです。Vercel は 2016 年に Google や Facebook のエンジニアと共同開発した React フレームワーク「Next.js」の生みの親でもあります。Vercel のユーザーはビルドやレンダリングのプロセスを管理する内蔵のデプロイツールや、サイトをキャッシュして高速検索できる独自の [Edge Network][3] を活用できます。さらに、Vercel は[サーバーレス関数][4]に対応しており、ユーザー認証、フォーム送信、データベースクエリなどバックエンドで不可欠な処理を実現するサーバーレスコードをデプロイすることもできます。

Vercel を Datadog と統合すると、以下のことができます。

* [Datadog のログ管理機能][5]を使用してアプリケーションのログを表示・解析
* Vercel 上で動作しているサーバーレスアプリケーションや API へのリクエスト数および 4xx/5xx  HTTPエラー数の確認
* [Datadog Synthetics][6] によるフロントエンドのパフォーマンス監視

## セットアップ


* [Datadog API キー][7]の生成
* [Vercel Marketplace][8]を通じたログインテグレーションの構成

## 収集データ

### メトリクス

Vercel インテグレーションには、メトリクスは含まれません。

### サービスのチェック

Vercel インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Vercel インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png
[2]: https://vercel.com/
[3]: https://vercel.com/docs/edge-network/overview
[4]: https://vercel.com/docs/serverless-functions/introduction
[5]: /ja/logs/
[6]: /ja/synthetics/
[7]: https://app.datadoghq.com/account/settings#api
[8]: https://vercel.com/integrations/datadog-logs