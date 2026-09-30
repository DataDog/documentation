---
title: Java Lambda 関数のインスツルメンテーションのアップグレード
---

このドキュメントには、Datadog for Java Lambda のインスツルメンテーションをアップグレードするための手順が記載されています。初めてインスツルメンテーションを設定する場合は、代わりに [Java Lambda のインストール手順][1]に従ってください。

Datadog Lambda レイヤーの `dd-trace-java:5` と `Datadog-Extension:25` は、Java Lambda 関数のインスツルメンテーションを設定するプロセスに以下の変更を導入しています。

1. [datadog-lambda-java][2] ライブラリは、非推奨で必要ありません。
2. カスタムインスツルメンテーションを除いて、コードの変更 (`DDLambda` ラッパーなど) は必要ありません。
3. Datadog の設定は、[Datadog CI][3] と [Datadog Serverless Plugin][4] で行うことができます。

### アップグレード

1. `build.gradle` または `pom.xml` から `datadog-lambda-java` が不要になったので削除します。
2. 関数コードから `DDLambda` と import ステートメントを削除します。
3. 環境変数 `AWS_LAMBDA_EXEC_WRAPPER` を `/opt/datadog_wrapper` に設定します。
4. `dd-trace-java` のバージョンを `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` に、`Datadog-Extension` を `{{< latest-lambda-layer-version layer="extension" >}}` に増やします。
5. `DDLambda.metric()` ヘルパー関数を使ってカスタムメトリクスを送信する場合は、標準の [Java 用 DogStatsD クライアント][5]を使い、[サンプルコード][6]に従ってメトリクスの配布を送信してください。なお、[Lambda ではディストリビューションしか使えない][7]ことに注意してください。

[1]: /ja/serverless/installation/java/
[2]: https://github.com/DataDog/datadog-lambda-java
[3]: /ja/serverless/installation/java/?tab=datadogcli
[4]: /ja/serverless/installation/java/?tab=serverlessframework
[5]: /ja/developers/dogstatsd/?tab=hostagent&code-lang=java
[6]: /ja/serverless/custom_metrics/?code-lang=java#with-the-datadog-lambda-extension
[7]: /ja/serverless/custom_metrics#understanding-distribution-metrics