---
further_reading:
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: GitHub
  text: Container Apps サービスからのトレース、ログ、カスタムメトリクスの収集
kind: documentation
title: Azure Container Apps
---

## 概要
Azure Container Apps は、コンテナベースのアプリケーションをデプロイし、スケーリングするためのフルマネージドサーバーレスプラットフォームです。Datadog は、[Azure インテグレーション][1]を通して Container Apps のモニタリングとログ収集を提供しています。また、Datadog は現在ベータ版として、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で Container Apps アプリケーションをインスツルメントするソリューションも提供しています。

  <div class="alert alert-warning">この機能はベータ版です。標準的なサポートチャンネルを通じてフィードバックを提供することができます。ベータ期間中は、Container Apps モニタリングと APM トレースは直接費用なしで利用できます。既存の APM のお客様は、スパンの取り込みとボリュームのコストが増加する可能性があります。</div>

## トレースとカスタムメトリクス
### コンテナの構築

Dockerfile を使用してアプリケーションを構築する場合は、以下を完了してください。

1. [サポートされている Datadog トレーシングライブラリ][2]を使用して、アプリケーションをインスツルメントします。

2. [Datadog `serverless-init` バイナリ][3] を `COPY` 命令を使用して、Docker イメージにコピーします。

3. `ENTRYPOINT` 命令を使用して、Docker コンテナが開始されるときに `serverless-init` バイナリを実行します。

4. `CMD` 命令を使用して、既存のアプリケーションやその他の必要なコマンドを引数として実行します。

以下は、これらの 3 つのステップを完了する方法の例です。これらの例は、既存の Dockerfile のセットアップに応じて調整する必要があるかもしれません。


{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}
```
COPY --from=datadog/serverless-init:latest /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/path/to/your-go-binary"] (adapt this line to your needs)
```
詳しくは [Go アプリケーションのトレース][1]を参照してください。[簡単な Go アプリケーションのサンプルコード][2]をご覧ください。


[1]: /ja/tracing/setup_overview/setup/go/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/go
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```
COPY --from=datadog/serverless-init:latest /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["ddtrace-run", "python", "app.py"] (adapt this line to your needs)
```

詳しくは [Python アプリケーションのトレース][1]を参照してください。[簡単な Python アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/setup_overview/setup/python/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/python
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```
COPY --from=datadog/serverless-init:latest /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"] (adapt this line to your needs)

```

詳しくは [NodeJS アプリケーションのトレース][1]を参照してください。[簡単な NodeJS アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/setup_overview/setup/nodejs/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/js
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
```
COPY --from=datadog/serverless-init:latest /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"] (adapt this line to your needs)

```

詳しくは [Java アプリケーションのトレース][1]を参照してください。[簡単な Java アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/setup_overview/setup/java/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"] (この行はあなたのニーズに合わせてください)

```

詳細な手順については、[.NET アプリケーションのトレース][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"] (この行はあなたのニーズに合わせてください)

```

詳しくは [Ruby アプリケーションのトレース][1]を参照してください。[簡単な Ruby アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby/
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### カスタムメトリクス
[DogStatsd クライアント][4]を使って、カスタムメトリクスの送信を行うことができます。

**注**: `DISTRIBUTION` メトリクスのみを使用してください。

### 高度なオプションと構成

#### 環境変数

| 変数 | 説明 |
| -------- | ----------- |
| `DD_SITE` | [Datadog サイト][5]。 |
| `DD_LOGS_ENABLED` | true の場合、ログ (stdout と stderr) を Datadog に送信します。デフォルトは false です。 |
| `DD_SERVICE` | [統合サービスタグ付け][6]を参照してください。 |
| `DD_VERSION` | [統合サービスタグ付け][6]を参照してください。 |
| `DD_ENV` | [統合サービスタグ付け][6]を参照してください。 |
| `DD_SOURCE` | [統合サービスタグ付け][6]を参照してください。 |
| `DD_TAGS` | [統合サービスタグ付け][6]を参照してください。 |

## ログの収集

[Azure インテグレーション][1]を使用してログを収集することができます。また、環境変数 `DD_LOGS_ENABLED` を true に設定することで、Agent を通じてアプリケーションログをキャプチャすることも可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/azure/#log-collection
[2]: /ja/tracing/trace_collection/dd_libraries/
[3]: https://registry.hub.docker.com/r/datadog/serverless-init
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /ja/getting_started/site/
[6]: /ja/getting_started/tagging/unified_service_tagging/