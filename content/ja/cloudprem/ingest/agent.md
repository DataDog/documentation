---
aliases:
- /ja/cloudprem/ingest_logs/datadog_agent/
description: Datadog Agent を設定して、CloudPrem デプロイメントにログを送信する
further_reading:
- link: /cloudprem/ingest_logs/observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines インテグレーション
- link: /cloudprem/ingest_logs/rest_api/
  tag: ドキュメント
  text: REST API インテグレーション
- link: /getting_started/containers/datadog_operator/
  tag: ドキュメント
  text: Datadog Operator ガイド
title: Datadog Agent でログを CloudPrem に送信する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要
このドキュメントでは、Datadog Agent を使って Datadog CloudPrem デプロイメントにログを送信するための設定手順を説明します。Datadog の SaaS プラットフォームとは異なり、CloudPrem では、必要なホスト レベルのタグをログに付与し、正しいエンドポイントに送信できるようにするため、Agent 側で特定の設定が必要です。このガイドでは、代表的なデプロイ方法ごとに、それらの設定方法を紹介します。

## 重要な要件
Datadog Agent から CloudPrem にログを送信するには、次の 2 つの環境変数を設定する必要があります:

`DD_LOGS_CONFIG_LOGS_DD_URL`
: これを CloudPrem の indexer エンドポイントに設定します。通常は `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280` です。これにより、Agent にログの送信先を知らせます。

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: (任意) 任意の設定ですが、強く推奨されます。"100000" (約 5 年) のような大きな値を設定してください。これにより、Agent は送信するすべてのログにホスト レベルのタグを付与します。Datadog の SaaS プラットフォームでは、これらのタグはログ取り込み後に自動で付与されますが、CloudPrem では Agent 側であらかじめ付与しておく必要があります。

### プロキシ

Datadog Agent がプロキシを利用するよう設定されていて、CloudPrem が内部ネットワーク上に配置されている場合は、Agent がプロキシを経由せずに CloudPrem へ直接ログを送信できるよう、`no_proxy` を設定する必要があります。

```yaml
# In the no_proxy section, add the CloudPrem DNS
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

加えて、`DD_NO_PROXY_NONEXACT_MATCH` を true に設定する必要があります。詳しくは、[Datadog Agent のプロキシ設定][2] を参照してください。

## Datadog Operator で Kubernetes のログを送信する

Datadog Operator を使って Kubernetes に Agent をデプロイする場合は、[Datadog Operator 入門][1] の手順に従ってください。手順 3 まで進んだら、ガイド内の例の代わりに次の `datadog-agent.yaml` 構成を使用します。

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

## 設定オプション

### エンドポイントの設定

Datadog Agent は、用途に応じて異なるエンドポイントを使って CloudPrem にログを送信するよう設定できます。

{{% collapse-content title="クラスター内部エンドポイント" level="h4" expanded=false %}}
クラスター内で動作する Agent に推奨されます:
```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="内部 Ingress エンドポイント" level="h4" expanded=false %}}
クラスター外で動作する Agent 向け:
```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### 追加の Agent 設定

必要に応じて、クラスターのメタ データを Datadog に送信するための追加機能も設定できます。

{{% collapse-content title="Prometheus メトリクス スクレイピング" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="OTLP ログ収集" level="h4" expanded=false %}}
Agent のログを Datadog に送信するには:
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

## 別のデプロイ方法
Datadog Operator を使わない場合でも、次の一般的な方法で Agent をデプロイできます。
### Helm チャートによるデプロイ

Helm チャートを使って Agent をデプロイするには、次のコマンドを実行します。ログ送信に必要な環境変数も、この場で直接設定します。

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### DaemonSet によるデプロイ

カスタム デプロイでは、DaemonSet に環境変数を設定します:

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

## 確認
Agent のデプロイ後、ログが正しく送信され、受信されていることを確認できます。

### Agent の状態を確認する

`kubectl exec` を使って Agent の状態を確認し、ログ送信の設定が正しく反映されていることを確かめます。

```shell
# Agent の状態とログ設定を確認する
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# CloudPrem への接続に関する Agent ログを確認する
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### ログが CloudPrem でインデックス化されていることを確認する

次のコマンドを実行して CloudPrem の searcher にクエリを送り、JSON ログがインデックス化されていることを確認します。

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## トラブルシューティング

**Agent がログを送信しない**:
- `DD_LOGS_CONFIG_LOGS_DD_URL` 環境変数が正しく設定されているか確認します
- Agent Pod のログを確認します: `kubectl logs <datadog-agent-pod>`
- ログ収集が有効になっていることを確認します: `DD_LOGS_ENABLED=true`

**CloudPrem がログを受信しない**:
- CloudPrem の indexer ログを確認します: `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Agent と CloudPrem indexer の間のネットワーク接続を確認します
- CloudPrem のサービスが稼働していることを確認します: `kubectl get pods -n <NAMESPACE_NAME>`

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /ja/agent/configuration/proxy/#proxy-server-setup-examples