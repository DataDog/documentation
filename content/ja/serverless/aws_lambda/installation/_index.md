---
aliases:
- /ja/serverless/installation/installing_the_library/
- /ja/serverless/installation
further_reading:
- link: /serverless/configuration/
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /integrations/amazon_lambda/
  tag: ドキュメント
  text: AWS Lambda インテグレーション
title: AWS Lambda のためのサーバーレスモニタリングのインストール
---

## クイックスタート

Datadog を初めて利用する場合は、[Datadog アカウントにサインアップ][1]して、[AWS Lambda][2] の Datadog Agent インストール手順に従って、Datadog を素早く始めるために Lambda 関数をインスツルメントします。手順を完了すると、Lambda 関数がリアルタイムのメトリクス、ログ、トレースを Datadog に送信するように構成されます。

{{< beta-callout-private url="https://docs.google.com/forms/d/e/1FAIpQLScw8XBxCyN_wjBVU2tWm-zX5oPIGF7BwUKcLSHY6MJsem259g/viewform?usp=sf_link" >}}
Datadog の UI から直接 AWS Lambda を一括インスツルメンテーションすることに興味はありますか？参加を希望する場合は、今後実施予定のリモート Lambda インスツルメンテーションの非公開ベータ版へのアクセスをリクエストしてください。
{{< /beta-callout-private >}}

クイックスタートプロセスでは、Lambda 関数をその場で構成します。Lambda 関数を恒久的にインスツルメントするには、次のセクションの詳細なインストール手順を参照してください。

## インストール手順

詳細なインストール方法については、以下の Lambda ランタイムを選択してください。

{{< partial name="serverless/getting-started-languages.html" >}}

## 高度な構成

インストールが終わり、テレメトリー収集の設定が済んだら、[高度な構成][3]を使って以下を行います。

- タグを使ってメトリクス、トレース、ログを接続する
- API Gateway、AppSync、Step Functions などの AWS リソースからテレメトリーを収集する
- 個々の Lambda 呼び出しのリクエストとレスポンスのペイロードを取得する
- Lambda 関数のエラーをソースコードにリンクする
- ログまたはトレースから機密情報をフィルタリングまたはスクラブする

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /ja/serverless/configuration/