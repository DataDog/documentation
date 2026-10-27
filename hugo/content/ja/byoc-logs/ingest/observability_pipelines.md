---
aliases:
- /ja/cloudprem/ingest_logs/observability_pipelines/
- /ja/cloudprem/ingest/observability_pipelines/
description: Observability Pipelines を構成し、オプションのデュアルシッピングを使用して BYOC Logs にログを送信してください。
further_reading:
- link: /byoc-logs/ingest_logs/datadog_agent/
  tag: ドキュメント
  text: Datadog Agent インテグレーション
- link: /byoc-logs/ingest_logs/rest_api/
  tag: ドキュメント
  text: REST API インテグレーション
- link: /observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines の概要
- link: /observability_pipelines/destinations/datadog_byoc_logs/
  tag: ドキュメント
  text: Observability Pipelines 用 Datadog BYOC Logs 送信先
title: Observability Pipelines を使用して BYOC Logs にログを送信してください。
---
## 概要{#overview}

Observability Pipelines は、Datadog Agent と BYOC (Bring Your Own Cloud) Logs の間に柔軟な中間層を提供し、ログが BYOC Logs デプロイメントに到達する前に処理、変換、ルーティングできるようにします。Datadog Agent からログを受信し、BYOC Logs に転送するように Observability Pipelines を構成します。

オンプレミスのデータセンターとクラウド間でログが分割されているハイブリッド環境の場合は、オンプレミスのデータセンターに Observability Pipelines Worker をデプロイし、BYOC Logs をホストする AWS データセンターにそれらのログをルーティングするように構成します。その後、BYOC Logs は標準のインジェストパスを通じて転送されたログを収集します。**注**: このパターンには既存のクラウドフットプリントが必要であり、完全にオンプレミスで実行される環境はサポートされていません。

このセットアップを構成するには、次のようにします。

1. [**パイプラインの作成と構成**](#create-and-configure-an-observability-pipeline) - Observability Pipelines UI でパイプライン構成（収集する、プロセッサ、送信先）を定義します。これにより、Worker が使用するパイプライン定義が作成されます。
## 2. [**Observability Pipelines Worker のデプロイ**]( deploy-your-observability-pipelines) - パイプライン構成を使用して Worker をインストールします。Agent が接続する前に、Worker が実行され、ログをリッスンしている必要があります。
3. [**Datadog Agent の構成**](#configure-the-datadog-agent) - デプロイされた Worker にログを送信するように Agent を設定します。Agent が Worker のアドレスを利用できる必要があるため、このステップを最後に行う必要があります。

## Observability Pipeline の作成と構成 {#create-and-configure-an-observability-pipeline}

1. [Observability Pipelines][1] に移動します。
1. [**Log Volume Control テンプレート**][2] を選択します。
1. パイプラインをセットアップします。
    1. [**Datadog Agent ソース**][3] を選択します。
    1. パイプラインからデフォルトのプロセッサをすべて削除します。
    1. [**Datadog BYOC Logs 送信先**][4]を選択して、BYOC Logs インスタンスにログを転送します。設定は空のままにします。

<!-- This image shows an example with dual shipping when the instructions say log volume control -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="ファセットパネルでcloudpremインデックスを選択してログをフィルタリングする方法を示す、Logs エクスプローラーインターフェースのスクリーンショット" style="width:80%;" >}} -->


## Observability Pipelines をデプロイします{#deploy-your-observability-pipelines}

UIでパイプラインを作成した後、Observability Pipelines Workerをデプロイします。Observability Pipelines Workerはパイプライン設定を実行し、Datadog Agentからのログをリッスンします。

以下のHelmコマンドはObservability Pipelines Workerをインストールまたはアップグレードし、ログをリッスンしてBYOC Logsインデクサーに転送するように設定します。
<br>
**注**: 前のステップで作成したパイプラインの `pipelineId` が必要です。このIDは、Observability Pipelines Workerとパイプライン設定をリンクさせるものです。

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

1分ほど経過したら、ログがパイプラインを通過し、BYOC Logs の送信先に到達していることを確認します。これは、Observability Pipelines Workerが実行中でログを受信する準備が整っていることを示しており、Agentの設定に進むことができます。

## Datadog Agent を構成する {#configure-the-datadog-agent}

Observability Pipelines Workerのデプロイと実行が完了したら、Datadog Agentがログを送信するように設定します。Agentは、Observability Pipelines Workerのサービスアドレスを使用してObservability Pipelines Workerに接続します。詳細については、[Connect the Datadog Agent to the Observability Pipelines Worker][5]を参照してください。

Datadog Agentの設定を更新して、Observability Pipelines Workerにログを送信するようにします。

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

## 検証{#verification}

ログがパイプラインを通過していることをチェックしてください。

```shell
# Check Observability Pipelines worker status
kubectl get pods -l app=observability-pipelines-worker

# Check worker logs
kubectl logs -l app=observability-pipelines-worker

# Verify logs are reaching BYOC Logs
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /ja/observability_pipelines/sources/datadog_agent/
[4]: /ja/observability_pipelines/destinations/datadog_byoc_logs/
[5]: /ja/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker