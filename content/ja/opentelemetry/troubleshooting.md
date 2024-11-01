---
further_reading:
- link: https://opentelemetry.io/docs/collector/troubleshooting/
  tag: 外部サイト
  text: OpenTelemetry のトラブルシューティング
title: トラブルシューティング
---

OpenTelemetry と Datadog を使用して予期しない動作が発生した場合、このガイドが問題解決に役立つかもしれません。引き続き問題が発生する場合は、[Datadog サポート][1]にお問い合わせください。

## 異なる Kubernetes のホスト名とノード名

Kubernetes にデプロイする際、Datadog によって報告されるホスト名が期待されるノード名と一致しない場合、通常は `k8s.node.name` (およびオプションで `k8s.cluster.name`) タグが欠落していることが原因です。

トラブルシューティングするには、アプリケーションデプロイメントとコレクターが正しく構成されていることを確認してください。

アプリケーションデプロイメントに `k8s.pod.ip` 属性を構成します。

```yaml
env:
  - name: MY_POD_IP
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: status.podIP
  - name: OTEL_RESOURCE
    value: k8s.pod.ip=$(MY_POD_IP)
```

コレクターで `k8sattributes` プロセッサを有効にします。

```yaml
k8sattributes:
[...]
processors:
  - k8sattributes
```

ホストを識別する属性の詳細については、[OpenTelemetry のセマンティック規約をホスト名にマッピングする][2]を参照してください。

## AWS Fargate デプロイメントでの予期しないホスト名

AWS Fargate 環境では、トレースに対して誤ったホスト名が報告される場合があります。

トラブルシューティングするには、コレクター構成で `resourcedetection` プロセッサを使用し、`ecs` デテクターを有効にしてください。

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

## ゲートウェイコレクターがホストメタデータを転送しない

ゲートウェイデプロイメントでは、ホストメタデータの収集とエージェントコレクターから Datadog へのその転送に問題が発生する場合があります。

トラブルシューティングを行うには

1. エージェントコレクターを構成してホストメタデータを収集し、転送します。

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

2. ゲートウェイコレクターを構成して必要なメタデータを抽出し、転送します。

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.use_as_metadata"], true)

   exporters:
     datadog:
       hostname_source: resource_attribute

   ```

3. ホストメタデータがエージェントコレクターによって収集され、ゲートウェイを介して Datadog に適切に転送されていることを確認します。

詳細については、[OpenTelemetry のセマンティック規約をインフラストラクチャーリストのホスト情報にマッピングする][3]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/opentelemetry/schema_semantics/hostname/
[3]: /ja/opentelemetry/schema_semantics/host_metadata/