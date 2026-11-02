---
aliases:
- /ko/cloudprem/ingest_logs/observability_pipelines/
- /ko/cloudprem/ingest/observability_pipelines/
description: 필요시 이중 전달을 사용하여 BYOC Logs로 로그를 전송하도록 Observability Pipelines 구성
further_reading:
- link: /byoc-logs/ingest_logs/datadog_agent/
  tag: 설명서
  text: Datadog Agent 통합
- link: /byoc-logs/ingest_logs/rest_api/
  tag: 설명서
  text: REST API 통합
- link: /observability_pipelines/
  tag: 설명서
  text: Observability Pipelines 개요
- link: /observability_pipelines/destinations/datadog_byoc_logs/
  tag: 설명서
  text: Observability Pipelines의 Datadog BYOC Logs 목적지
title: Observability Pipelines를 사용하여 BYOC Logs로 로그 전송
---
## 개요 {#overview}

Observability Pipelines는 Datadog Agent와 BYOC(Bring Your Own Cloud) Logs 사이에 유연한 중간 계층을 제공하여 로그가 BYOC Logs 배포 환경에 도달하기 전에 로그를 처리, 변환 및 라우팅할 수 있도록 합니다. Datadog Agent에서 로그를 수신하고 이를 BYOC Logs로 전달하도록 Observability Pipelines를 구성합니다.

온프레미스 데이터 센터와 클라우드에 로그가 분산된 하이브리드 환경에서는 온프레미스 데이터 센터에 Observability Pipelines Worker를 배포하고, 해당 로그를 BYOC Logs가 호스팅되는 AWS 데이터 센터로 라우팅하도록 구성합니다. 그러면 BYOC Logs가 표준 수집 경로를 통해 전달된 로그를 수집합니다. **참고**: 이 패턴을 사용하려면 기존 클라우드 환경이 필요하며, 온프레미스에서만 운영되는 환경은 지원하지 않습니다.

이 설정을 구성하려면 다음 단계를 따르세요.

1. [**파이프라인 생성 및 구성**](#create-and-configure-an-observability-pipeline) - Observability Pipelines UI에서 파이프라인 구성(소스, 프로세서, 목적지)을 정의합니다. 이렇게 하면 Worker가 사용할 파이프라인 정의가 생성됩니다.
## 2. [**Observability Pipelines Worker 배포**]( deploy-your-observability-pipelines) - 파이프라인 구성으로 Worker를 설치합니다. Agent가 Worker에 연결할 수 있으려면 Worker가 실행 중이며 로그를 수신할 준비가 되어 있어야 합니다.
3. [**Datadog Agent 구성**](#configure-the-datadog-agent) - Agent가 배포된 Worker로 로그를 전송하도록 설정합니다. Agent가 Worker의 주소를 사용할 수 있어야 하므로 이 단계는 마지막에 수행해야 합니다.

## Observability Pipeline 생성 및 구성 {#create-and-configure-an-observability-pipeline}

1. [Observability Pipelines][1]로 이동합니다.
1. [**Log Volume Control 템플릿**][2]을 선택합니다.
1. 파이프라인을 설정합니다.
    1. [**Datadog Agent** 소스][3]를 선택합니다.
    1. 파이프라인에서 기본 프로세서를 모두 제거합니다.
    1. 로그를 BYOC Logs 인스턴스로 전달하려면 [**Datadog BYOC Logs** 대상][4]을 선택합니다. 구성을 비워 두세요.

<!-- This image shows an example with dual shipping when the instructions say log volume control -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="패싯 패널에서 cloudprem 인덱스를 선택하여 로그를 필터링하는 방법을 보여주는 Logs Explorer 인터페이스 스크린샷" style="width:80%;" >}} -->


## Observability Pipelines 배포{#deploy-your-observability-pipelines}

UI에서 파이프라인을 생성한 후 Observability Pipelines Worker를 배포하세요. Worker는 파이프라인 구성을 실행하고 Datadog Agent에서 전송되는 로그를 수신합니다.

다음 Helm 명령은 Worker를 설치하거나 업그레이드하고 로그를 수신하도록 구성한 후 BYOC Logs 인덱서로 전달합니다.
<br>
**참고**: 이전 단계에서 생성한 파이프라인의 `pipelineId`가 필요합니다. 이 ID는 Worker를 파이프라인 구성에 연결합니다.

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

1분 후 로그가 파이프라인을 통해 흐르고 BYOC Logs 목적지에 도달하는지 검증하세요. 이는 Worker가 실행 중이고 로그를 수신할 준비가 되었음을 나타내며, 이제 Agent 구성을 진행할 수 있습니다.

## Datadog Agent 구성 {#configure-the-datadog-agent}

Observability Pipelines Worker가 배포되어 실행 중이면 Datadog Agent가 해당 Worker로 로그를 전송하도록 구성하세요. Agent는 Worker의 서비스 주소를 사용하여 Worker에 연결합니다. 자세한 내용은 [Observability Pipelines Worker에 Datadog Agent 연결][5]을 참조하세요.

Observability Pipelines Worker로 로그를 전송하도록 Datadog Agent 구성을 업데이트하세요.

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

## 검증 {#verification}

로그가 파이프라인을 통해 전달되고 있는지 확인하세요.

```shell
# Check Observability Pipelines worker status
kubectl get pods -l app=observability-pipelines-worker

# Check worker logs
kubectl logs -l app=observability-pipelines-worker

# Verify logs are reaching BYOC Logs
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /ko/observability_pipelines/sources/datadog_agent/
[4]: /ko/observability_pipelines/destinations/datadog_byoc_logs/
[5]: /ko/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker