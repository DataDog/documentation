---
aliases:
- /ja/serverless/datadog_lambda_library/java/
further_reading:
- link: /serverless/configuration
  tag: Documentation
  text: サーバーレスモニタリングの構成
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: サーバーレスモニタリングのトラブルシューティング
- link: serverless/custom_metrics/
  tag: Documentation
  text: サーバーレスアプリケーションからのカスタムメトリクスの送信
kind: ドキュメント
title: Java サーバーレスアプリケーションのインスツルメンテーション
---

<div class="alert alert-warning">分散型トレーシングでサーバーレスアプリケーションを完全にインスツルメントするには、Java Lambda 関数が Java 8 Corretto (<code>java8.al2</code>) または Java 11 (<code>java11</code>) ランタイムを使用している必要があります。</div>

<div class="alert alert-warning">Lambda 関数が公共のインターネットにアクセスできない VPC にデプロイされている場合、<code>datadoghq.com</code> <a href="/getting_started/site/">Datadog サイト</a>には <a href="/agent/guide/private-link/">AWS PrivateLink</a> を、それ以外のサイトには<a href="/agent/proxy/">プロキシを使用</a>してデータを送信することができます。</div>

<div class="alert alert-warning">以前に Datadog Forwarder を使用して Lambda 関数をセットアップした場合は、<a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_java">Datadog Forwarder を使用したインスツルメント</a>を参照してください。</div>

## インストール

Datadog は、サーバーレスアプリケーションのインスツルメンテーションを有効にするためのさまざまな方法を提供しています。以下からニーズに合った方法を選択してください。Datadog では、一般的に Datadog CLI の使用を推奨しています。

{{< tabs >}}
{{% tab "コンテナイメージ" %}}

1. Datadog Lambda 拡張機能のインストール

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

   `<TAG>` を特定のバージョン番号 (たとえば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えます。利用可能なタグのリストは、[Amazon ECR リポジトリ][1]で確認できます。

2. Datadog Java APM クライアントをインストールする

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget -O /opt/dd-java-agent.jar https://dtdg.co/latest-java-tracer
    ```

3. Datadog Lambda ライブラリのインストール

   Maven を使用している場合は、以下の依存関係を `pom.xml` に含め、`VERSION` を最新のリリースに置き換えます (前の `v` は省きます): ![Maven Cental][2]:

    ```xml
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>datadog-lambda-java</artifactId>
      <version>VERSION</version>
    </dependency>
    ```

   Gradle を使用している場合は、以下の依存関係を `build.gradle` に含め、`VERSION` を最新のリリースに置き換えます (前の `v` は省きます): ![Maven Cental][2]:

    ```groovy
    dependencies {
      implementation 'com.datadoghq:datadog-lambda-java:VERSION'
    }
    ```

4. 必要な環境変数を設定する

    - `JAVA_TOOL_OPTIONS` を `-javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1` に設定します
    - `DD_JMXFETCH_ENABLED` を `false` に設定します
    - `DD_TRACE_ENABLED` を `true` に設定します。
    - `DD_SITE` を、テレメトリーの送信先となる [Datadog サイト][3]に設定します。
    - `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN に設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

1. Datadog Lambda 拡張機能のインストール

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`

2. Datadog Java APM クライアントをインストールする

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}`

3. Datadog Lambda ライブラリのインストール

   Maven を使用している場合は、以下の依存関係を `pom.xml` に含め、`VERSION` を最新のリリースに置き換えます (前の `v` は省きます): ![Maven Cental][2]:

    ```xml
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>datadog-lambda-java</artifactId>
      <version>VERSION</version>
    </dependency>
    ```

   Gradle を使用している場合は、以下の依存関係を `build.gradle` に含め、`VERSION` を最新のリリースに置き換えます (前の `v` は省きます): ![Maven Cental][2]:

    ```groovy
    dependencies {
      implementation 'com.datadoghq:datadog-lambda-java:VERSION'
    }
    ```

4. 必要な環境変数を設定する

    - `JAVA_TOOL_OPTIONS` を `-javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1` に設定します
    - `DD_JMXFETCH_ENABLED` を `false` に設定します
    - `DD_TRACE_ENABLED` を `true` に設定します。
    - `DD_SITE` を、テレメトリーの送信先となる [Datadog サイト][3]に設定します。
    - `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN に設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

- [Serverless Homepage][1] でメトリクス、ログ、トレースを見ることができるようになりました。
- [カスタムメトリクス][2]または [APM スパン][3]を送信して、ビジネスロジックを監視します。
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][4]を参照してください
- [高度な構成][5]を参照して以下のことを行ってください。
    - タグを使ったテレメトリー接続
    - AWS API Gateway、SQS などのテレメトリーを収集する
    - Lambda のリクエストとレスポンスのペイロードを取得する
    - Lambda 関数のエラーをソースコードにリンクする
    - ログまたはトレースから機密情報をフィルタリングまたはスクラブする

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/ja/metrics/dogstatsd_metrics_submission/
[3]: /ja/tracing/custom_instrumentation/java/
[4]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[5]: /ja/serverless/configuration/