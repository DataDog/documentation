---
aliases:
- /ja/serverless/datadog_lambda_library/extension
dependencies:
- https://github.com/DataDog/datadog-lambda-extension/blob/main/README.md
title: Datadog Lambda 拡張機能
---
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-agent/blob/master/LICENSE)

**注:** このリポジトリには、Datadog Lambda 拡張機能に関連するリリースノート、問題、説明、スクリプトが含まれています。この拡張機能は、Datadog Agent の特別なビルドです。ソースコードは[ここ](https://github.com/DataDog/datadog-agent/tree/main/cmd/serverless)にあります。

Datadog Lambda 拡張機能は、AWS Lambda 関数の実行中に非同期にカスタムメトリクス、トレース、ログを送信することをサポートする AWS Lambda 拡張機能です。

## インストール

[インストール手順](https://docs.datadoghq.com/serverless/installation)に従って、Datadog で関数の拡張メトリクス、トレース、ログを表示します。

## アップグレード
アップグレードするには、Lambda 層の構成または Dockerfile (コンテナイメージとしてデプロイされた Lambda 関数の場合) の Datadog 拡張機能のバージョンを更新してください。アップグレードする前に、最新の[リリース](https://github.com/DataDog/datadog-lambda-extension/releases)と対応する変更ログをご覧ください。

## 構成

[構成手順](https://docs.datadoghq.com/serverless/configuration)に従って、テレメトリーにタグを付け、リクエスト/レスポンスペイロードをキャプチャし、ログやトレースから機密情報をフィルタリングまたはスクラブする、などの操作を行います。

## オーバーヘッド

Datadog Lambda 拡張機能を初期化する際には、Lambda 関数のコールドスタート (init の実行時間が増加) に多少のオーバーヘッドが発生します。Datadog は Lambda 拡張機能のパフォーマンスを継続的に最適化しているため、常に最新のリリースを使用することをお勧めします。

Lambda 関数の報告期間 (`aws.lambda.duration` または `aws.lambda.enhanced.duration`) が長くなっていることに気づくかもしれません。これは、Datadog Lambda 拡張機能が Datadog API にデータをフラッシュバックする必要があるためです。拡張機能がデータをフラッシュするのに費やした時間は、期間の一部として報告されますが、それは AWS が関数の応答をクライアントに返した*後*に行われます。言い換えれば、追加された期間は、Lambda 関数を*遅くすることはありません*。技術的な情報については、こちらの [AWS ブログポスト](https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/)を参照してください。Datadog 拡張機能によって追加された期間を除外して関数の実際のパフォーマンスを監視するには、 `aws.lambda.enhanced.runtime_duration` というメトリクスを使用します。

デフォルトでは、拡張機能は各呼び出しの最後にデータを Datadog にフラッシュします (例えば、コールドスタートは常にフラッシュをトリガーします)。これにより、トラフィックの少ないアプリケーション、cron ジョブ、および手動テストからの散発的な呼び出しに対するデータ到着の遅延を回避できます。拡張機能が安定した頻繁な呼び出しパターン (1 分に 1 回以上) を検出すると、複数の呼び出しからデータをバッチ処理し、期限が来た呼び出しの最初に定期的にフラッシュを行います。これは、*関数が頻繁に呼び出されるようになるほど、呼び出しごとの平均実行時間のオーバーヘッドが低くなる*ことを意味します。言い換えれば、低トラフィックのアプリケーションでは、持続時間のオーバーヘッドが顕著になる一方で、関連するコストのオーバーヘッドは通常無視できます。高トラフィックのアプリケーションでは、持続時間のオーバーヘッドはほとんど気にならないでしょう。Datadog 拡張機能がデータをフラッシュするために使用する持続期間のオーバーヘッドを理解するには、メトリクス `aws.lambda.post_runtime_extensions_duration` または `aws.lambda.enhanced.post_runtime_duration` を使用します。

Datadog サイトから遠く離れた地域にデプロイされた Lambda 関数の場合、例えば US1 の Datadog サイトにデータを報告する eu-west-1 にデプロイされた Lambda 関数は、ネットワークのレイテンシーに起因する高い持続期間 (したがってコスト) のオーバーヘッドを観測することができます。オーバーヘッドを減らすには、拡張機能を構成して、データをフラッシュする頻度を少なく (例えば毎分: `DD_SERVERLESS_FLUSH_STRATEGY=periodically,60000`) します。

非常に短いタイムアウトが構成されている場合 (_短い_の定義はランタイムに依存します)、まれに Lambda ハンドラーコードが次の呼び出しで実行されないことがあります。これは、最初の呼び出しがタイムアウトし、次の呼び出しで `INIT` [フェーズ](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html#runtimes-extensions-api-lifecycle)を再度開始する必要がある場合に発生します。次の呼び出しで `INIT` フェーズが完了する前に関数がタイムアウトした場合、関数は Lambda によって終了され、ハンドラーコードは実行されません。このような失敗は `INIT_REPORT` [ログ](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html#runtimes-lifecycle-init-errors)を使って特定できます。Datadog では、このような現象が確認された Lambda 関数のタイムアウトを増やすことを推奨しています。

## 問題を開く

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、拡張機能のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](https://github.com/DataDog/datadog-agent/blob/master/docs/dev/contributing.md)に従ってプルリクエストを開いてください。

## テスト

Google Cloud Run で Datadog Serverless-Init の変更をテストするには

1. このリポジトリと [Datadog Agent リポジトリ](https://github.com/DataDog/datadog-agent)を同じ親ディレクトリに複製します。
2. このリポジトリで `VERSION=0 SERVERLESS_INIT=true ./scripts/build_binary_and_layer_dockerized.sh` を実行して、serverless-init バイナリをビルドします。
3. [ここに説明されているように](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/go) "Hello World" サーバーレスアプリケーションを作成します。
4. [公開されている手順](https://docs.datadoghq.com/serverless/google_cloud_run)に従って、サーバーレスアプリケーションに Serverless-Init を追加します。
5. ビルドしたバイナリファイルを Dockerfile と同じ場所にコピーします。
```
cp datadog-lambda-extension/.layers/datadog_extension-amd64/extensions/datadog-agent ~/hello-world-app/datadog-init
```
6. Dockerfile で、
```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
```
を以下に置き換えます。
```
COPY datadog-init /app/datadog-init
```

サーバーレスアプリケーションをデプロイすると、コードへの変更を含むバージョンの Serverless-Init で実行されます。

## ヘルプ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2021 Datadog, Inc.