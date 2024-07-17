---
aliases:
- /ja/opentelemetry/guide/host_metadata/
further_reading:
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry サポート
title: OpenTelemetry セマンティック規約をインフラストラクチャーリストのホスト情報にマッピングする
---

<div class="alert alert-info">
この機能はベータ版です。フィードバックがあれば、<a href="/help/">Datadog サポート</a>までご連絡ください。
</div>

## Overview

Datadog エクスポーターは、ホストに関するシステム情報を Datadog に送信することをサポートしており、その情報は[インフラストラクチャーリスト][6]で確認できます。既存のシグナルの一部として、['Resource' フィールド][1]を通して OTLP でこの情報を送ることができます。これは、ゲートウェイデプロイを含むあらゆる[デプロイメントパターン][9]でサポートされています。

Datadog は、ホストに関するシステム情報を認識するために、[OpenTelemetry セマンティック規約][2]を使用します。[ホストメトリクスのセットアップ][3]の説明に従って、必要なメトリクスとリソース属性を Datadog に送信します。または、インフラストラクチャーに最適な方法で、この情報を手動で送信することもできます。

## 機能へのオプトイン

**公開ベータ版**にオプトインするには、ホストに関する情報を含むすべての OTLP ペイロードで、`datadog.host.use_as_metadata` リソース属性を `true` に設定します。

リソースは、[ホスト識別属性][10]と `datadog.host.use_as_metadata` 属性が `true` に設定されている場合、インフラストラクチャーリスト情報を入力します。

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

すべてのリソースに明示的にホスト識別属性をタグ付けする必要があります。これは、[ホストメトリクスの推奨セットアップ][3]によってデフォルトで行われます。

## サポートされる規約

Datadog エクスポーターは、リソース属性レベルのセマンティック規約とシステムメトリクスレベルのセマンティック規約の両方をサポートしています。サポートされるリソース属性セマンティック規約は、主に [`host.` ネームスペース][4]と [`os.` ネームスペース][8]の下にあります。サポートされるシステムメトリクスレベルのセマンティック規約はすべて [`system.` ネームスペース][5]の下にあります。

### 一般的なシステム規約

| セマンティック規約                         | Type               | アプリ内フィールド |
|---------------------------------------------|--------------------|--------------|
| [*さまざまなホスト識別属性*][10] | リソース属性 | Hostname     |
| `os.description`                            | リソース属性 | OS           |

### CPU 規約

| セマンティック規約         | Type               | アプリ内フィールド       |
|-----------------------------|--------------------|--------------------|
| `host.cpu.vendor.id`        | リソース属性 | ベンダー ID          |
| `host.cpu.model.name`       | リソース属性 | モデル名         |
| `host.cpu.cache.l2.size`    | リソース属性 | キャッシュサイズ         |
| `host.cpu.family`           | リソース属性 | Family             |
| `host.cpu.model.id`         | リソース属性 | Model              |
| `host.cpu.stepping`         | リソース属性 | ステップ           |
| `system.cpu.logical.count`  | システムメトリクス      | 論理プロセッサ |
| `system.cpu.physical.count` | システムメトリクス      | コア              |
| `system.cpu.frequency`      | システムメトリクス      | MHz                |

### ネットワーク規約

| セマンティック規約 | Type               | アプリ内フィールド              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | リソース属性 | IP アドレスと IPv6 アドレス |
| `host.mac`          | リソース属性 | Mac アドレス               |

### OpenTelemetry Collector でこれらの規約を収集する

OpenTelemetry Collector でこれらの規約を収集するには、[ホストメトリクスの推奨セットアップ][3]をセットアップします。ホストメトリクスレシーバは関連するすべてのメトリクスを収集し、リソース検出プロセッサは関連するすべてのリソース属性を収集します。

**注:** 監視するホスト上で実行されている Collector に、これらのプロセッサとレシーバを追加する必要があります。ゲートウェイホストはリモートホストからこの情報を収集しません。

## Further reading

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