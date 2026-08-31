---
aliases:
- /ja/cloudprem/ingest_logs/observability_pipelines/
description: Observability Pipelines を設定して、必要に応じて二重送信を行いながら CloudPrem にログを送信する
further_reading:
- link: /cloudprem/ingest_logs/datadog_agent/
  tag: ドキュメント
  text: Datadog Agent インテグレーション
- link: /cloudprem/ingest_logs/rest_api/
  tag: ドキュメント
  text: REST API インテグレーション
- link: /observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines の概要
- link: /observability_pipelines/destinations/cloudprem/
  tag: ドキュメント
  text: Observability Pipelines 用 CloudPrem 宛先
title: Observability Pipelines でログを CloudPrem に送信する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

Observability Pipelines は、Datadog Agent と CloudPrem の間に柔軟な中間レイヤーを提供します。これにより、ログが CloudPrem デプロイメントに届く前に、処理、変換、ルーティングを行えます。Datadog Agent から受け取ったログを CloudPrem に転送するよう、Observability Pipelines を次の手順で設定します。
1. [**パイプラインを作成して設定する**](#create-and-configure-an-observability-pipeline) - Observability Pipelines UI で、パイプラインの構成 (ソース、プロセッサー、宛先) を定義します。ここで作成した定義を、後で Worker が使用します。 
2. [**Observability Pipelines Worker をデプロイする**](##deploy-your-observability-pipelines) - パイプライン設定を使って Worker をインストールします。Agent が接続する前に、Worker が起動してログを待ち受けている必要があります。 
3. [**Datadog Agent を設定する**](#configure-the-datadog-agent) - デプロイ済みの Worker にログを送るよう、Agent の送信先を設定します。この手順は最後に行ってください。Agent が接続するには、先に Worker のアドレスが利用可能になっている必要があるためです。

## Observability Pipeline を作成して設定する

1. [Observability Pipelines][1] に移動します。
1. [**Log Volume Control** テンプレート][2] を選択します。 
1. 次のようにパイプラインを設定します。
    1. [**Datadog Agent** ソース][3] を選択します。 
    1. パイプラインに初期設定で含まれているプロセッサーはすべて削除します。 
    1. [**Datadog CloudPrem** 宛先][4] を選択し、CloudPrem インスタンスにログを転送するようにします。設定欄は空のままにします。

<!-- この画像は、手順ではログ量制御と説明している箇所で、二重送信の例を示しています -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="facets パネルで cloudprem インデックスを選択し、ログを絞り込む方法を示した Logs Explorer インターフェイスのスクリーンショット" style="width:80%;" >}} -->


## Observability Pipelines をデプロイする

UI でパイプラインを作成したら、Observability Pipelines Worker をデプロイします。Worker は作成したパイプライン設定に従って動作し、Datadog Agent から送られるログを待ち受けます。

次の Helm コマンドは、Worker をインストールまたはアップグレードし、ログを受信して CloudPrem の indexer に転送するように設定します。 
<br>
**注**: 前の手順で作成したパイプラインの `pipelineId` が必要です。この ID によって、Worker とパイプライン設定が関連付けられます。

```shell
helm upgrade --install opw \
    -f values.yaml \
    --set datadog.apiKey=XXXXXXX \
    --set datadog.pipelineId=XXXXXXX \
    --set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0:8282' \
    --set env[1].name=DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL,env[1].value='http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280' \
    --set service.ports[0].name=dd-op-source-datadog-agent-address-port,service.ports[0].protocol=TCP,service.ports[0].port=8282,service.ports[0].targetPort=8282 \
    datadog/observability-pipelines-worker
```

1 分ほど待ってから、ログがパイプラインを通り、CloudPrem 宛先に届いていることを確認します。これで Worker が稼働し、ログを受け取れる状態になっていることがわかるので、次に Agent の設定へ進めます。

## Datadog Agent の構成

Observability Pipelines Worker のデプロイと起動が完了したら、Datadog Agent がそこへログを送るように設定します。Agent は、Worker のサービス アドレスを使って接続します。詳しくは、[Datadog Agent を Observability Pipelines Worker に接続する][5] を参照してください。

Datadog Agent の設定を更新し、ログを Observability Pipelines Worker に送信するようにします。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: your-cluster
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
        value: "true"
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
        value: "http://observability-pipelines-worker:8282"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

## 確認

ログがパイプラインを通過していることを確認します。

```shell
# Observability Pipelines Worker の状態を確認する
kubectl get pods -l app=observability-pipelines-worker

# Worker のログを確認する
kubectl logs -l app=observability-pipelines-worker

# ログが CloudPrem に届いていることを確認する
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /ja/observability_pipelines/sources/datadog_agent/
[4]: /ja/observability_pipelines/destinations/cloudprem/
[5]: /ja/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker