---
aliases:
- /ja/serverless/installation/installing_the_library/
further_reading:
- link: serverless/installation/node
  tag: Documentation
  text: Node.js サーバーレスモニタリングのインストール
- link: serverless/installation/ruby
  tag: Documentation
  text: Ruby サーバーレスモニタリングのインストール
kind: ドキュメント
title: サーバーレスモニタリングのインストール
---

## クイックスタート

Datadog を初めて利用される方は、まず [Datadog のアカウントにサインアップ][5]し、それから [Datadog の Lambda 拡張機能をインストールする][6]手順を行ってください。これらのステップを完了すると、Lambda 関数がリアルタイムのメトリクス、ログ、トレースを Datadog に送信するように構成されます。

{{< img src="serverless/aws-fully-managed-services-serverless-monitoring-hero.png" alt="Datadog サーバーレスモニタリング"  style="width:100%;" >}}

## インストール手順

より詳細なインストール手順については、以下の Lambda ランタイムを選択し、サーバーレスアプリケーションをインスツルメントする手順をご覧ください。

{{< partial name="serverless/getting-started-languages.html" >}}

[5]: https://app.datadoghq.com/signup/
[6]: https://app.datadoghq.com/signup/agent#lambda