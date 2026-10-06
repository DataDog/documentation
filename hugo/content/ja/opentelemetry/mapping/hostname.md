---
aliases:
- /ja/opentelemetry/schema_semantics/hostname/
further_reading:
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry サポート
title: OpenTelemetry セマンティック規約をホスト名にマッピングする
---
## 概要 {#overview}

OpenTelemetry は、ホスト名に関連するリソース属性について特定のセマンティック規約を定義しています。任意のシグナルタイプの OpenTelemetry Protocol (OTLP) ペイロードに既知のホスト名リソース属性が含まれている場合、Datadog はこれらの規則に従い、その値をホスト名として使用しようとします。デフォルトのホスト名解決アルゴリズムは、他の Datadog 製品との互換性を考慮して構築されていますが、必要に応じてオーバーライドできます。

このアルゴリズムは、Datadog OTLP インテーク、[Datadog Exporter][3]、[Datadog Agent の OTLP インジェストパイプライン][2]、および [DDOT Collector][5] で使用されます。Collector を実行すると、[リソース検出プロセッサー][1]がアルゴリズムに必要なリソース属性を追加します。パスごとのガイダンスについては、[ホスト名とタグ付け][4]を参照してください。

## ホスト名を決定するために使用される規約 {#conventions-used-to-determine-the-hostname}

規約はリソース属性内で以下の順序でチェックされ、最初の有効なホスト名が使用されます。有効な規約が存在しない場合は、フォールバックホスト名ロジックが使用されます。このフォールバックロジックは製品によって異なります。

1. Datadog 固有の規約をチェックします。`host` および `datadog.host.name`。
1. AWS、Azure、GCP のクラウドプロバイダー固有の規約をチェックします。
1. Kubernetes 固有の規約をチェックします。
1. 特定の規約が見つからない場合は、`host.id` および `host.name` にフォールバックします。

以下のセクションでは、各規約セットについて詳しく説明します。

### 一般的なホスト名のセマンティック規約 {#general-hostname-semantic-conventions}

`host` および `datadog.host.name` の規約は、Datadog 固有の規約です。これらは最初に考慮され、通常の OpenTelemetry セマンティック規約を使用して検出されたホスト名を上書きするために使用できます。`host` を最初にチェックした後、`host` が設定されていない場合は `datadog.host.name` がチェックされます。

ネームスペースが指定されており、他のベンダー固有の動作と競合する可能性が低いため、`datadog.host.name` 規約を使用することをお勧めします。

OpenTelemetry Collector を使用する場合、`transform` プロセッサーを使用してパイプラインで `datadog.host.name` 規約を設定できます。たとえば、特定のパイプライン上のすべてのメトリクス、トレース、ログでホスト名を `my-custom-hostname` として設定するには、次の構成を使用します。

```yaml
transform:
  metric_statements: &statements
    - context: resource
      statements:
        - set(attributes["datadog.host.name"], "my-custom-hostname")
  trace_statements: *statements # Use the same statements as in metrics
  log_statements:   *statements # Use the same statements as in metrics
```

パイプラインに `transform` プロセッサーを追加することを忘れないでください。

バックエンドプロセスがホスト名を重複排除する方法により、ホストのエイリアスが時折表示されることがあります。これが問題を引き起こす場合は、サポートにお問い合わせください。

### クラウドプロバイダー固有の規約 {#cloud-provider-specific-conventions}

`cloud.provider` リソース属性は、クラウドプロバイダーを特定するために使用されます。その他のリソース属性は、各プラットフォームのホスト名を特定するために使用されます。`cloud.provider` または想定されるリソース属性のいずれかが欠落している場合は、次の規約セットがチェックされます。

#### Amazon Web Services {#amazon-web-services}

`cloud.provider` の値が `aws` である場合、次の規約がチェックされます。

1. ペイロードが ECS Fargate タスクによるものかどうかを判断するために `aws.ecs.launchtype` をチェックします。そうである場合は、`aws.ecs.task.arn` をタグ名 `task_arn` の識別子として使用します。
1. そうでない場合は、`host.id` をホスト名として使用します。これは EC2 インスタンス ID と一致します。

#### Google Cloud {#google-cloud}

`cloud.provider` の値が `gcp` である場合、次の規約がチェックされます。

1. `host.name` と `cloud.account.id` の両方が利用可能で想定されている形式であることをチェックし、`host.name` からプレフィックスを削除し、両方をホスト名にマージします。

#### Azure {#azure}

`cloud.provider` の値が `azure` である場合、次の規約がチェックされます。

1. `host.id` が利用可能で想定されている形式である場合は、ホスト名として使用します。
1. そうでない場合は、`host.name` にフォールバックします。

### Kubernetes 固有の規約 {#kubernetes-specific-conventions}

`k8s.node.name` とクラスター名が利用可能な場合、ホスト名は `<node name>-<cluster name>` に設定されます。`k8s.node.name` のみが利用可能な場合、ホスト名はノード名に設定されます。

クラスター名を取得するため、次の規約がチェックされます。

1. `k8s.cluster.name` をチェックし、存在する場合はそれを使用します。
2. `cloud.provider` が `azure` に設定されている場合、`azure.resourcegroup.name` からクラスター名を抽出します。
3. `cloud.provider` が `aws` に設定されている場合、`ec2.tag.kubernetes.io/cluster/` で始まる最初のリソース属性からクラスター名を抽出します。

### `host.id`および `host.name` {#hostid-and-hostname}

上記の規約がいずれも存在しない場合は、`host.id` および `host.name` リソース属性がそのまま使用されてホスト名が決定されます。`host.id` を最初にチェックした後、`host.id` が設定されていない場合は `host.name` がチェックされます。

**注:** OpenTelemetry 仕様では、`host.id` および `host.name` に、特定の環境で他の Datadog 製品が使用するものと一致しない可能性のある値を設定できます。複数の Datadog 製品を使用して同じホストを監視している場合は、一貫性を確保するために `datadog.host.name` を使用してホスト名をオーバーライドする必要がある場合があります。

## インフラ属性プロセッサー {#infra-attributes-processor}

[インフラ属性プロセッサー][6]は、ラベルやアノテーションに基づいて Kubernetes タグの抽出を自動化し、これらのタグをトレース、メトリクス、ログのリソース属性として割り当てます。インフラ属性プロセッサーが正しい属性とホスト名を抽出するには、以下の[属性][7] (`container.id` など) が設定されている必要があります。

インフラ属性プロセッサーは、属性から抽出されたホスト名を Agent ホスト名でオーバーライドするように構成することもできます。

```
processors:
 infraattributes:
   allow_hostname_override: true
```

**注**: この設定は DDOT Collector でのみ利用可能です。

## フォールバックホスト名のロジック {#fallback-hostname-logic}

リソース属性に有効なホスト名が見つからない場合、動作は取り込みパスによって異なります。

{{< tabs >}}
{{% tab "Datadog Exporter" %}}

フォールバックホスト名のロジックが使用されます。このロジックは、以下のソースをチェックすることで、 
Datadog Exporter が実行されているマシンのホスト名を生成します。これは、Datadog の他の製品と互換性があります。

1. Datadog Exporter の構成にある `hostname` フィールド。
1. クラウドプロバイダー API。
1. Kubernetes のホスト名。
1. 完全修飾ドメイン名。
1. オペレーティングシステムのホスト名。

これは、[ゲートウェイデプロイメント][1]において不正確なホスト名につながる可能性があります。これを回避するには、パイプラインで `resource detection` プロセッサーを使用して、正確なホスト名解決を確実に行ってください。

[1]: https://opentelemetry.io/docs/collector/deployment/gateway/
{{% /tab %}}
{{% tab "Datadog Agent の OTLP インジェストパイプライン" %}}

Datadog Agent のホスト名が使用されます。詳細については、[Datadog が Agent ホスト名を決定する方法][1]を参照してください。

[1]: /ja/agent/faq/how-datadog-agent-determines-the-hostname/
{{% /tab %}}
{{< /tabs >}}

## 無効なホスト名 {#invalid-hostnames}

以下のホスト名は無効とみなされ、破棄されます。
- `0.0.0.0`
- `127.0.0.1`
- `localhost`
- `localhost.localdomain`
- `localhost6.localdomain6`
- `ip6-localhost`

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent
[3]: /ja/opentelemetry/setup/collector_exporter/datadog_exporter/
[4]: /ja/opentelemetry/config/hostname_tagging/#hostname-recommendations
[5]: /ja/opentelemetry/migrate/ddot_collector/
[6]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#expected-attributes