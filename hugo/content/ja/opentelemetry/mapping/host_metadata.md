---
aliases:
- /ja/opentelemetry/guide/host_metadata/
- /ja/opentelemetry/schema_semantics/host_metadata/
further_reading:
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry サポート
title: インフラストラクチャー一覧表示のホスト情報
---
<div class="alert alert-info">
この機能はプレビュー中です。フィードバックがある場合は、<a href="/help/">Datadog サポート</a>までご連絡ください。
</div>

## 概要 {#overview}

推奨される OpenTelemetry Collector の構成では、ホストメトリクスレシーバーとリソース検出プロセッサを使用してホストメタデータを収集し、Datadog Extension を介して Collector をレポートします。これらのホストは [インフラストラクチャーリスト][6] で表示できます。各ホストで Collector を agent として実行するようなほとんどのデプロイメントでは、ホスト情報は自動的に入力されるため、このページの手動構成に従う必要はありません。

<div class="alert alert-info">このページで説明されている手動構成は、主に <a href="https://opentelemetry.io/docs/collector/deployment/gateway/">ゲートウェイデプロイメント</a>を対象としています。これは、Datadog にエクスポートする Collector が、レポート対象のホストとは別に実行される構成です。このようなセットアップでは、正しいホストメタデータが Datadog に届くように、リソースに明示的にタグ付けします。各ホストで Collector を agent として実行している場合、ホストメタデータはデフォルトで収集されるため、この構成をスキップできます。</div>

[`Resource` フィールド][1] を通じて、あらゆるシグナルの一部としてホストに関するシステム情報を OTLP で送信します。Datadog は、ゲートウェイデプロイメントを含むあらゆる [デプロイメントパターン][9] でこの情報をサポートしています。

Datadog は、[OpenTelemetry セマンティック規約][2] を使用してホストに関するシステム情報を認識します。[ホストメトリクスの設定][3] の手順に従って、必要なメトリクスとリソース属性を Datadog に送信します。あるいは、インフラストラクチャーに最適な方法でこの情報を手動で送信することもできます。

## 機能へのオプトイン{#opting-in-to-the-feature}

ゲートウェイデプロイメントの場合、またはホストメタデータに使用するリソースを手動で制御する場合は、ホストに関する情報を含むすべての OTLP ペイロードで `datadog.host.use_as_metadata` リソース属性を `true` に設定します。

リソースは、[ホスト識別属性][10]と `datadog.host.use_as_metadata` 属性が `true` に設定されている場合、インフラストラクチャーリスト情報に一覧表示されます。

メタデータに使用するリソースを明示的に宣言するには、関連するホスト情報を持つすべてのリソースにブール値リソース属性 `datadog.host.use_as_metadata` を追加します。

例えば、メトリクス、トレース、ログのすべてのリソースに対してこれを設定するには、以下の構成で[変換プロセッサ][7]を使用します。

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
```

このプロセッサをすべてのパイプラインの `processors` リストに追加します。

すべてのリソースにホスト識別属性を明示的にタグ付けする必要があります。これは、[ホストメトリクスの推奨セットアップ][3]によってデフォルトで行われます。

## サポートされる規約 {#supported-conventions}

Datadog は、リソース属性レベルのセマンティック規約とシステムメトリクスレベルのセマンティック規約の両方をサポートしています。サポートされているリソース属性のセマンティック規約は、主に [`host.` 名前空間][4] および [`os.` 名前空間][8] の下にあります。サポートされているすべてのシステムメトリクスレベルのセマンティック規約は、[`system.` 名前空間][5] の下にあります。

### 一般的なシステム規約 {#general-system-conventions}

| セマンティック規約                         | タイプ               | アプリ内フィールド |
|---------------------------------------------|--------------------|--------------|
| [*さまざまなホスト識別属性*][10] | リソース属性 | ホスト名     |
| `os.description`                            | リソース属性 | OS           |

### CPU 規約 {#cpu-conventions}

| セマンティック規約         | タイプ               | アプリ内フィールド       |
|-----------------------------|--------------------|--------------------|
| `host.cpu.vendor.id`        | リソース属性 | ベンダー ID          |
| `host.cpu.model.name`       | リソース属性 | モデル名         |
| `host.cpu.cache.l2.size`    | リソース属性 | キャッシュサイズ         |
| `host.cpu.family`           | リソース属性 | ファミリー             |
| `host.cpu.model.id`         | リソース属性 | モデル              |
| `host.cpu.stepping`         | リソース属性 | ステッピング           |
| `system.cpu.logical.count`  | システムメトリクス      | 論理プロセッサ |
| `system.cpu.physical.count` | システムメトリクス      | コア              |
| `system.cpu.frequency`      | システムメトリクス      | MHz                |

### ネットワーク規約 {#network-conventions}

| セマンティック規約 | タイプ               | アプリ内フィールド              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | リソース属性 | IP アドレスおよび IPv6 アドレス |
| `host.mac`          | リソース属性 | MAC アドレス               |

### OpenTelemetry Collector でこれらの規約を収集する {#collecting-these-conventions-with-the-opentelemetry-collector}

OpenTelemetry Collector でこれらの規約を収集するには、[ホストメトリクスの推奨設定][3]をセットアップしてください。ホストメトリクスレシーバーは関連するすべてのメトリクスを収集し、リソース検出プロセッサは関連するすべてのリソース属性を収集します。

**注:** 監視対象のホストで実行されている Collector に、これらのプロセッサとレシーバーを追加する必要があります。ゲートウェイ ホストは、リモート ホストからこの情報を収集しません。


## 正規クラウド リソース ID {#canonical-cloud-resource-ids}

正規クラウド リソース ID (CCRID) は、クラウド リソースを一意に識別するためにクラウド プロバイダーが割り当てるリソース ID です。さまざまなオブザーバビリティ タイプ全体に CCRID を追加すると、それらを使用して、特定のクラウド リソースの異なるタイプのデータを一貫してリンクできます。すべてのクラウド リソース タイプで同じ形式の CCRID を追加できます。CCRID の広範な追加と採用により、顧客や社内チーム全体でさまざまなユース ケースを利用できるようになります。

CCRID を有効にすると、すべてのリソース タイプについて、リソースとその関連メトリクス、トレース、ログの間を移動できるようになり、コンテキストの切り替えが不要になり、同じワークフロー内でリソースのエンドツーエンドのビューが得られます。

この機能を使用するには、すべての OTLP ペイロードで `datadog.ccrid` リソース属性を CCRID の値に設定します。

クラウドごとの識別子形式のリストについては、以下を参照してください。
| クラウド   | 識別子のタイプ    | 例                                                                                                                                      |
|---------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| AWS     | ARN                | `arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi`                                                                                    |
| Azure   | リソース ID        | `/subscriptions/12345678-1234-5678-1234-567891234567/resourcegroups/exampleResourceGroup/Microsoft.Compute/virtualMachines/exampleVM`        |
| GCP     | CAI リソース名  | `//compute.googleapis.com/projects/example-project/locations/us-central1/instances/my-instance`                                              |
| OCI     | OCID               | `ocid1.instance.oc1.eu-frankfurt-1.exampleuniqueid`                                                                                          |

CCRIDの構成方法:
 * [AWS (EC2 Instance)][13]: `arn:aws:ec2:{region}:{accountId}:instance/{instanceId}`。
    `instanceId`を取得するには、このコマンドを使用します:
    ```shell
    ec2metadata --instance-id
    ```
 * [Azure][11]: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}`
 * GCP: `//compute.googleapis.com/projects/{projectID}/zones/{zoneName}/instances/{instanceName}"`
 * OCI/Oracle: CCRIDは、[リクエストを送信][12]することで取得できます: `http://169.254.169.254/opc/v2/instance/id`


例えば、メトリクス、トレース、ログのすべてのリソースに対してAWS CCRIDを設定するには、以下の構成で[transform processor][2]を使用します。

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
```

OpenTelemetryのセマンティック規約では[cloud.resource_id][14]属性も定義されており、これは[属性プロセッサ][15]を使用して構成内でマッピングできます。

例:

```yaml
processors:
  attributes/example:
    actions:
      - key: datadog.ccrid
        from_attribute: cloud.resource_id
        action: upsert
```


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/glossary/#resource
[2]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[3]: /ja/opentelemetry/collector_exporter/host_metrics
[4]: https://opentelemetry.io/docs/specs/semconv/resource/host/
[5]: https://opentelemetry.io/docs/specs/semconv/system/system-metrics/
[6]: /ja/infrastructure/list/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor
[8]: https://opentelemetry.io/docs/specs/semconv/resource/os/
[9]: https://opentelemetry.io/docs/collector/deployment/
[10]: /ja/opentelemetry/schema_semantics/hostname/
[11]: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription?tabs=azure-cli
[12]: https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/gettingmetadata.htm
[13]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-for-amazon-ec2.html#policy-syntax
[14]: https://opentelemetry.io/docs/specs/semconv/registry/attributes/cloud/#cloud-resource-id
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor