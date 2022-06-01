---
aliases:
- /ja/serverless/datadog_lambda_library/extension
- /ja/serverless/libraries_integrations/extension
dependencies:
- https://github.com/DataDog/datadog-lambda-extension/blob/main/README.md
kind: documentation
title: Datadog Lambda 拡張機能
---
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-agent/blob/master/LICENSE)

**注:** このリポジトリには、Datadog Lambda 拡張機能に関連するリリースノート、問題、説明、スクリプトが含まれています。この拡張機能は、Datadog Agent の特別なビルドです。ソースコードは[ここ](https://github.com/DataDog/datadog-agent/tree/main/cmd/serverless)にあります。

Datadog Lambda 拡張機能は、AWS Lambda 関数の実行中に非同期にカスタムメトリクス、トレース、ログを送信することをサポートする AWS Lambda 拡張機能です。

## インストール

[インストール手順](https://docs.datadoghq.com/serverless/installation)に従って、Datadog で関数の拡張メトリクス、トレース、ログを表示します。

## 構成

[構成手順](https://docs.datadoghq.com/serverless/configuration)に従って、テレメトリーにタグを付け、リクエスト/レスポンスペイロードをキャプチャし、ログやトレースから機密情報をフィルタリングまたはスクラブする、などの操作を行います。

## オーバーヘッド

Datadog Lambda 拡張機能を初期化する際には、Lambda 関数のコールドスタート (init の実行時間が増加) に多少のオーバーヘッドが発生します。Datadog は Lambda 拡張機能のパフォーマンスを継続的に最適化しているため、常に最新のリリースを使用することをお勧めします。

Lambda 関数の報告期間が長くなっていることに気づくかもしれません。これは、Datadog Lambda 拡張機能が Datadog API にデータをフラッシュバックする必要があるためです。拡張機能がデータをフラッシュするのに費やした時間は、期間の一部として報告されますが、それは AWS が関数の応答をクライアントに返した*後*に行われます。言い換えれば、追加された期間は、Lambda 関数を遅くすることはありません。技術的な情報については、こちらの [AWS ブログポスト](https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/)を参照してください。Datadog 拡張機能によって追加された期間を除外して関数の実際のパフォーマンスを監視するには、 `aws.lambda.enhanced.runtime_duration` というメトリクスを使用します。

デフォルトでは、拡張機能は各呼び出しの最後にデータを Datadog に送り返します。これにより、トラフィックの少ないアプリケーション、cron ジョブ、および手動テストからの散発的な呼び出しに対するデータ到着の遅延を回避できます。拡張機能が安定した頻繁な呼び出しパターン (1 分に 1 回以上) を検出すると、複数の呼び出しからデータをバッチ処理し、期限が来た呼び出しの最初に定期的にフラッシュを行います。これは、*関数が頻繁に呼び出されるようになるほど、呼び出しごとの平均実行時間のオーバーヘッドが低くなる*ことを意味します。

Datadog サイトから遠い地域にデプロイされた Lambda 関数では、例えば、US1 Datadog サイトにデータを報告する eu-west-1 にデプロイされた Lambda 関数は、ネットワークのレイテンシーにより高い期間のオーバーヘッドが見られる場合があります。

## 問題を開く

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、拡張機能のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。


## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](https://github.com/DataDog/datadog-agent/blob/master/docs/dev/contributing.md)に従ってプルリクエストを開いてください。

## コミュニティ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2021 Datadog, Inc.