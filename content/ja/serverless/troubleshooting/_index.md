---
aliases:
- /ja/serverless/guide/troubleshoot_serverless_monitoring
further_reading:
- link: /serverless/installation/
  tag: Documentation
  text: サーバーレスモニタリングのインストール
- link: /serverless/guide/#troubleshoot-your-installation
  tag: Documentation
  text: よくある問題のトラブルシューティング
kind: ドキュメント
title: サーバーレスモニタリングのトラブルシューティング
---

<div class="alert alert-info">関数コードのサイズが大きすぎる、または webpack の互換性などの一般的な問題については、追加の<a href="/serverless/guide/#troubleshoot-your-installation">トラブルシューティングガイド</a>を確認してください。このガイドは、一般的なテレメトリー収集の問題のトラブルシューティングを支援します。</div>

## 基本を理解する

このガイドの説明をよりよく理解するために、まず[キーコンセプト][1]をよく理解してください。物事の仕組みをより深く理解することで、不足している部分を特定し、考えられる原因を絞り込むことができます。

## Forwarder の代わりに Datadog Lambda 拡張機能を使用する

現在もデータ収集に [Datadog Forwarder Lambda 関数][2]を使用している場合は、代わりに [Datadog Lambda 拡張機能][3]の導入をご検討ください。Forwarder Lambda の技術的な制限により、多くの既知の問題が発生するため、Lambda 拡張機能に移行することで自動的に問題を解決することができます。

* Lambda が拡張機能を使用しているかどうかわからない場合は、Lambda 関数の[レイヤー構成][4]を確認し、Lambda レイヤーに `Datadog-Extension` という名前があるかどうかを確認します。

* Lambda が Forwarder を使用しているかどうかわからない場合は、Lambda 関数のロググループの[サブスクリプションフィルター][5]を確認し、そのロググループが `Datadog Forwarder` などの名前の Lambda によってサブスクライブされているかどうか確認してください。

拡張機能を使用する利点については、こちらの[比較ガイド][6]を、一般的な移行手順については、こちらの[移行ガイド][7]をご覧ください。まずは開発環境またはステージング環境で変更をテストしてください。

Forwarder を引き続き使用する場合は、こちらの [Forwarder トラブルシューティングガイド][8]を参照してください。

## 構成が最新で期待通りのものであることを確認する

過去に Datadog のモニタリング用に構成したことのあるアプリケーションに関する最新の説明については、[インストールガイド][9]を確認してください。

Lambda 関数に加えられた実際の変更が予想通りであることを確認するには、別のテスト関数を設定し、_Datadog CLI_ または _Custom_ の説明に従って構成してみてください。実際の Lambda 関数で行われた変更点 (ハンドラー、レイヤー、環境変数、タグなど) を、テスト用関数と比較してみてください。

## デバッグログの収集

Lambda 関数で環境変数 `DD_LOG_LEVEL` を `debug` に設定し、冗長なデバッグログを有効にしてください。ログからのデータ転送に [Datadog Forwarder Lambda 関数][2]を使用している場合は、Forwarder Lambda 関数上でも `DD_LOG_LEVEL` を `debug` に設定します。

トレースに問題がある場合、環境変数 `DD_TRACE_DEBUG` を `true` に設定すると、Datadog Tracer から追加のデバッグログが出力されます。

不必要なコストを避けるため、十分なデータを収集した後にデバッグログを無効にしてください。

## AWS インテグレーションの確認

Datadog は、[AWS とのインテグレーション][10] (オプション) を通じて、AWS からメトリクスとリソースタグを収集することができます。CloudWatch や Lambda のリソースタグから特定のメトリクスが欠落している場合は、AWS とのインテグレーションが適切に構成されていることを確認します。

## タグが構成されていることを確認する

Datadog 標準の `service`、`env`、`version` タグを収集したデータに適用できない場合は、Lambda 関数に環境変数 `DD_SERVICE`、`DD_ENV`、`DD_VERSION` が構成されているかを確認してください。カスタムタグの場合は、`DD_TAGS` が構成されていることを確認します。

AWS Lambda のリソースタグで収集したデータをリッチ化したい場合は、[AWS 向け Datadog インテグレーション][10]が適切に構成されていることを確認します。

## ヘルプ

簡単な質問は、[Datadog Slack コミュニティ][11]の _#serverless_ チャンネルに投稿してください。

上記のトラブルシューティングの手順をすべて実行し、[Datadog サポート][12]からの支援を希望する場合は、チケットに次の情報を含めてください。

1. Lambda 関数の基本情報: ARN、ランタイム、ハンドラー、レイヤー、環境変数、タグ。多くの関数で同じ問題がある場合は、まず 1 つの関数に焦点を当てます。
1. Lambda 関数が Datadog Forwarder Lambda 関数を使用してログを介してデータを送信するように構成されている場合、Forwarder Lambda 関数に関する基本情報、および Lambda 関数のロググループに構成されたサブスクリプションフィルターを含めます。
2. _Serverless Framework_ や _AWS CDK_ など、行ったインストール方法。
3. _Datadog CLI_ や _Custom_ など、試行した代替インストール方法。
4. 自作の Lambda 関数からのデバッグログ。
5. Datadog Forwarder Lambda 関数からのデバッグログ (使用されている場合)。
6. プロジェクトのコンフィギュレーションファイル (**編集されたシークレット**を含む): `serverless.yaml`、`package.json`、`package-lock.json`、`yarn.lock`、 `tsconfig.json`、`webpack.config.json` など。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/glossary/#datadog-serverless-for-aws-lambda-concepts
[2]: /ja/logs/guide/forwarder/
[3]: /ja/serverless/libraries_integrations/extension/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[6]: /ja/serverless/guide/extension_motivation/
[7]: /ja/serverless/configuration/#migrate-to-the-datadog-lambda-extension
[8]: /ja/logs/guide/lambda-logs-collection-troubleshooting-guide/
[9]: /ja/serverless/installation/
[10]: /ja/integrations/amazon_web_services/
[11]: https://chat.datadoghq.com/
[12]: https://www.datadoghq.com/support/