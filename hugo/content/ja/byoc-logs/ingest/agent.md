---
aliases:
- /ja/cloudprem/ingest_logs/datadog_agent/
- /ja/cloudprem/ingest/agent/
description: BYOC Logs デプロイメントにログを送信するために Datadog Agent を構成する
further_reading:
- link: /byoc-logs/ingest/observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines インテグレーション
- link: /byoc-logs/ingest/api/
  tag: ドキュメント
  text: REST API インテグレーション
- link: /getting_started/containers/datadog_operator/
  tag: ドキュメント
  text: Datadog Operator ガイド
private: true
title: Datadog Agent を使用して BYOC Logs にログを送信します。
---
## 概要 {#overview}
このドキュメントでは、Datadog Agent を使用して Datadog BYOC (Bring Your Own Cloud) Logs デプロイメントにログを送信するための設定手順を説明します。Datadog SaaS プラットフォームとは異なり、BYOC Logs では、ログに必要なホストレベルのタグが付与され、正しいエンドポイントに送信されるように、特定の Agent の設定が必要です。このガイドでは、最も一般的なデプロイメント方法についてこれらの設定を行う方法を説明します。

## 主な要件 {#key-requirements}
Datadog Agent を使用して BYOC Logs にログを送信するには、2 つの環境変数を設定する必要があります。

`DD_LOGS_CONFIG_LOGS_DD_URL`
: これを BYOC Logs インデクサーエンドポイント (通常は `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`) に設定します。これはログの送信先を Agent に指示するものです

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: (オプション) これはオプションですが、強く推奨される変数です。「100000」(約 5 年) のような大きな値を設定します。これにより、Agent が送信するすべてのログにホストレベルのタグが確実に追加されます。Datadog SaaS プラットフォームはこれらのタグをインジェスト後に自動的にログに付与しますが、BYOC Logs では Agent が事前に追加する必要があります。

### プロキシ {#proxy}

Datadog Agent がプロキシを使用するように設定されており、BYOC Logs が内部ネットワークでホストされている場合は、`no_proxy` 設定を構成して、Agent がプロキシを経由せずに BYOC Logs に直接ログを送信できるようにする必要があります。

```yaml
# In the no_proxy section, add the BYOC Logs DNS
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

さらに、`DD_NO_PROXY_NONEXACT_MATCH` を true に設定する必要があります。詳細については、[Datadog Agent プロキシの構成][2] を参照してください。

## Datadog Operator を使用して Kubernetes ログを送信する {#send-kubernetes-logs-with-the-datadog-operator}

Datadog Operator を使用して Kubernetes 上に Agent をデプロイするには、[Datadog Operator の使用を開始する][1] ガイドに従ってください。ステップ 3 に到達したら、ガイドで提供されている例の代わりに以下の `datadog-agent.yaml` 構成を使用してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "100000"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    otlp:
      receiver:
        protocols:
          grpc:
            enabled: true
            endpoint: 0.0.0.0:4417

    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true

```

## 構成オプション {#configuration-options}

### エンドポイントの構成 {#endpoint-configuration}

Datadog Agent は、異なるエンドポイントを使用して BYOC Logs にログを送信するように構成できます。

{{% collapse-content title="内部クラスターエンドポイント" level="h4" expanded=false %}}
クラスター内 Agent に推奨:

```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="内部入力エンドポイント" level="h4" expanded=false %}}
クラスター外の Agent の場合:

```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### その他の Agent 構成 {#additional-agent-configuration}

クラスターメタデータを Datadog に送信するための追加機能を構成することもできます。

{{% collapse-content title="Prometheus メトリクスのスクレイピング" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="OTLP ログの収集" level="h4" expanded=false %}}
Agent ログを Datadog に送信するには、以下の手順を実行します。

```yaml
features:
  otlp:
    receiver:
      protocols:
        grpc:
          enabled: true
          endpoint: 0.0.0.0:4417
```
{{% /collapse-content %}}

## その他のデプロイメント方法 {#alternative-deployment-methods}
Datadog Operator を使用していない場合は、以下の一般的な方法のいずれかを使用して Agent をデプロイできます。
### Helm チャートのデプロイメント {#helm-chart-deployment}

ログ固有の環境変数を直接設定し、Helm チャートを使用して Agent をデプロイするには、次のコマンドを実行します。

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### DaemonSet のデプロイメント {#daemonset-deployment}

カスタムデプロイメントの場合は、DaemonSet に環境変数を設定します。

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
      - name: agent
        image: registry.datadoghq.com/agent:latest
        env:
        - name: DD_API_KEY
          value: <YOUR_API_KEY>
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_LOGS_CONFIG_LOGS_DD_URL
          value: "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280"
```

## 検証 {#verification}
Agent のデプロイ後、ログが正しく送受信されていることを検証できます。

### Agent のステータスをチェックする {#check-agent-status}

`kubectl exec` を使用して Agent のステータスをチェックし、ログを送信するように構成されていることを確認します。

```shell
# Check Agent status and logs configuration
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# Check Agent logs for BYOC Logs connection
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### ログが BYOC Logs にインデックスされていることをチェックする {#check-logs-are-indexed-in-byoc-logs}

このコマンドを実行して BYOC Logs サーチャーにクエリを送信し、JSON ログがインデックスされていることを確認します。

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## トラブルシューティング{#troubleshooting}

**Agent がログを送信していない場合**:
- `DD_LOGS_CONFIG_LOGS_DD_URL` 環境変数が正しく設定されていることを確認する
- Agent Pod のログをチェックする: `kubectl logs <datadog-agent-pod>`
- ログ収集が有効になっていることを確認する: `DD_LOGS_ENABLED=true`

**BYOC Logs がログを受信していない場合**:
- BYOC Logs インデクサーのログをチェックする: `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Agent と BYOC Logs インデクサー間のネットワーク接続を確認する
- BYOC Logs サービスが実行中であることを確認する: `kubectl get pods -n <NAMESPACE_NAME>`

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /ja/agent/configuration/proxy/#proxy-server-setup-examples