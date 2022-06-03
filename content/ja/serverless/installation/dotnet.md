---
further_reading:
- link: /serverless/configuration
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: ドキュメント
  text: サーバーレスモニタリングのトラブルシューティング
- link: serverless/custom_metrics/
  tag: ドキュメント
  text: サーバーレスアプリケーションからのカスタムメトリクスの送信
kind: ドキュメント
title: .NET サーバーレスアプリケーションのインスツルメンテーション
---

<div class="alert alert-warning">Datadog Lambda 拡張機能は、.NET Lambda 関数の `x86_64` アーキテクチャのみをサポートしています。.NET Lambda 関数が `arm64` アーキテクチャを使用している場合、代わりに <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_dotnet">Datadog Forwarder を使用してインスツルメントする</a>必要があります。</div>

<div class="alert alert-warning">Lambda 関数が公共のインターネットにアクセスできない VPC にデプロイされている場合、<code>datadoghq.com</code> <a href="/getting_started/site/">Datadog サイト</a>には <a href="/agent/guide/private-link/">AWS PrivateLink</a> を、それ以外のサイトには<a href="/agent/proxy/">プロキシを使用</a>してデータを送信することができます。</div>

## インストール

Datadog は、サーバーレスアプリケーションのインスツルメンテーションを有効にするためのさまざまな方法を提供しています。以下からニーズに合った方法を選択してください。Datadog では、一般的に Datadog CLI の使用を推奨しています。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

1. Datadog CLI クライアントをインストールする

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog サーバーレスモニタリングに慣れていない場合は、クイックスタートとして最初のインストールを導くためにインタラクティブモードで Datadog CLI を起動し、残りのステップを無視することができます。本番アプリケーションに Datadog を恒久的にインストールするには、このステップをスキップし、残りのステップに従って通常のデプロイの_後に_ CI/CD パイプラインで Datadog CLI コマンドを実行します。

    ```sh
    datadog-ci lambda instrument -i
    ```

3. AWS の認証情報を構成する

   Datadog CLI は、AWS Lambda サービスへのアクセスを必要とし、AWS JavaScript SDK に依存して[資格情報を解決][1]します。AWS CLI を呼び出すときに使用するのと同じ方法を使用して、AWS の資格情報が構成されていることを確認します。

4. Datadog のサイトを構成する

   &nbsp;テレメトリーの送信先である [Datadog サイト][2]を指定します。デフォルトは `datadoghq.com` です。

    ```sh
    export DATADOG_SITE="<DD_SITE>" # such as datadoghq.com, datadoghq.eu or ddog-gov.com
    ```

5. Datadog API キーを構成する

   Datadog は、セキュリティと簡単なローテーションのために、AWS Secrets Manager に Datadog API キーを保存することを推奨します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。Lambda 関数に必要な `secretsmanager:GetSecretValue` IAM 権限があることを確認します。

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

   &nbsp;迅速なテスト目的のために、Datadog API キーをプレーンテキストで設定することも可能です。

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 関数をインスツルメントする

   **注**: Lambda 関数は、まず開発環境またはステージング環境でインスツルメントしてください。インスツルメンテーションの結果が思わしくない場合は、同じ引数で `uninstrument` を実行し、変更を元に戻してください。

   Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-dotnet" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   プレースホルダーを埋めるには
    - `<functionname>` と `<another_functionname>` は Lambda 関数の名前に置き換えます。また、`--functions-regex` を使用すると、指定した正規表現にマッチする名前を持つ複数の関数を自動的にインスツルメントすることができます。
    - `<aws_region>` を AWS リージョン名に置き換えます。

    その他のパラメーターは、[CLI ドキュメント][3]に記載されています。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/getting_started/site/
[3]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を自動的に構成します。

Datadog サーバーレスプラグインをインストールして構成するには、次の手順に従います。

1. Datadog サーバーレスプラグインをインストールします。

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. `serverless.yml` を更新します:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

   プレースホルダーを埋めるには
    - `<DATADOG_SITE>` を、テレメトリーの送信先となる [Datadog サイト][3]に置き換えます。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

    詳細および追加設定については、[プラグインドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "コンテナイメージ" %}}

1. Datadog Lambda 拡張機能のインストール

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

   `<TAG>` を特定のバージョン番号 (たとえば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えます。利用可能なタグのリストは、[Amazon ECR リポジトリ][1]で確認できます。

2. Datadog .NET APM クライアントをインストールする

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    RUN mkdir /opt/datadog
    RUN tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    ENV CORECLR_ENABLE_PROFILING=1
    ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    ENV DD_DOTNET_TRACER_HOME=/opt/datadog
    ```

   `<TRACER_VERSION>` を使用したい `dd-trace-dotnet` のバージョン番号に置き換えてください (例: `2.3.0`)。サポートされる最小バージョンは `2.3.0` です。最新の `dd-trace-dotnet` のバージョンは [GitHub][2] で確認することができます。

3. 必要な環境変数を設定する

    - 環境変数 `DD_SITE` に、テレメトリー送信先の [Datadog サイト][3]を設定します。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN で設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

1. Datadog Lambda 拡張機能のインストール

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`

2. Datadog .NET APM クライアントをインストールする

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}`

3. 必要な環境変数を設定する

    - `CORECLR_ENABLE_PROFILING` を `1` に設定します。
    - `CORECLR_PROFILER` を `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` に設定します。
    - `CORECLR_PROFILER_PATH` を `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so` に設定します。
    - `DD_DOTNET_TRACER_HOME` を `/opt/datadog` に設定します。
    - `DD_SITE` を、テレメトリーの送信先となる [Datadog サイト][2]に設定します。
    - `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN に設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/ja/getting_started/site/
[3]: https://app.datadoghq.com/organization-settings/api-keys
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
[3]: /ja/tracing/custom_instrumentation/dotnet/
[4]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[5]: /ja/serverless/configuration/