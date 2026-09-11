---
aliases:
- /ko/cloudprem/ingest_logs/observability_pipelines/
description: Observability Pipelines를 구성하여 CloudPrem으로 로그 전송(필요시 이중 전송(dual shipping)
  설정)
further_reading:
- link: /cloudprem/ingest_logs/datadog_agent/
  tag: 설명서
  text: Datadog Agent 통합
- link: /cloudprem/ingest_logs/rest_api/
  tag: 설명서
  text: REST API 통합
- link: /observability_pipelines/
  tag: 설명서
  text: Observability Pipelines 개요
- link: /observability_pipelines/destinations/cloudprem/
  tag: 설명서
  text: Observability Pipelines용 CloudPrem 대상
title: Observability Pipelines를 사용하여 CloudPrem으로 로그 전송
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem를 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

Observability Pipelines는 Datadog Agent와 CloudPrem 사이에 유연한 중간 계층을 제공하여 로그가 CloudPrem 배포에 도달하기 전에 처리, 변환 및 라우팅할 수 있도록 합니다. Datadog Agent에서 로그를 수신하고 CloudPrem으로 전달하도록 Observability Pipelines를 구성하세요.
1. [**파이프라인을 생성 및 구성**](#create-and-configure-an-observability-pipeline) - Observability Pipelines UI에서 파이프라인 구성(소스, 프로세서, 대상)을 정의하세요. Worker가 사용할 파이프라인 정의가 생성됩니다.
2. [**Observability Pipelines Worker 배포**](##deploy-your-observability-pipelines) - 파이프라인 구성을 사용하여 Worker를 설치하세요. Agent가 연결하기 전 Worker가 실행 중이고 로그 수신 대기 상태여야 합니다.
3. [**Datadog Agent 구성**](#configure-the-datadog-agent) - Agent가 배포된 Worker로 로그를 전송하도록 지정합니다. Agent가 Worker의 주소를 사용해야 하므로 이 단계는 마지막으로 실행합니다.

## Observability Pipeline 생성 및 구성

1. [Observability Pipelines][1]로 이동합니다.
1. [**Log Volume Control 템플릿**][2]을 선택합니다.
1. 파이프라인을 설정합니다.
    1. [**Datadog Agent** 소스][3]를 선택합니다.
    1. 파이프라인에서 기본 프로세서를 모두 제거합니다.
    1. CloudPrem 인스턴스로 로그를 전달하려면 [**Datadog CloudPrem** 대상][4]을 선택하고 구성은 비워둡니다.

<!-- 이 이미지는 지침에 log volume control이라고 명시되어 있을 때 이중 전송이 적용된 예를 보여줍니다. -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Logs Explorer 인터페이스 스크린샷으로 패싯 패널에서 cloudprem 인덱스를 선택하여 로그를 필터링하는 방법을 보여줍니다." style="width:80%;" >}} -->


## Observability Pipelines 배포

UI에서 파이프라인을 생성한 후, Observability Pipelines Worker를 배포합니다. Worker는 파이프라인 구성을 실행하고 Datadog Agent에서 로그를 수신합니다.

다음 Helm 명령은 Worker를 설치 또는 업그레이드하고, 로그를 수신하여 CloudPrem 인덱서로 전달하도록 구성합니다.
<br>
**참고**: 이전 단계에서 생성한 파이프라인의 `pipelineId`가 필요합니다. 이 ID는 Worker를 파이프라인 구성에 연결하는 데 사용됩니다.

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

1분 후, 로그가 파이프라인을 통해 CloudPrem 대상에 도달하는지 확인합니다. 이는 Worker가 실행 중이고 로그를 수신할 준비가 되었음을 나타내며, 이제 Agent를 구성할 수 있습니다.

## Datadog 에이전트 구성

Observability Pipelines Worker가 배포되고 실행되면 Datadog Agent가 해당 Worker로 로그를 전송하도록 구성합니다. Agent는 Worker의 서비스 주소를 사용하여 Worker에 연결합니다. 자세한 내용은 [Datadog Agent를 Observability Pipelines Worker에 연결][5]을 참고하세요.

Datadog Agent 구성을 업데이트하여 로그를 Observability Pipelines Worker로 전송하도록 설정합니다.

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

## 확인

로그가 파이프라인을 통해 정상적으로 전달되는지 확인합니다.

```shell
# Observability Pipelines Worker 상태 확인
kubectl get pods -l app=observability-pipelines-worker

# Worker 로그 확인
kubectl logs -l app=observability-pipelines-worker

# 로그가 CloudPrem에 도달하고 있는지 확인
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /ko/observability_pipelines/sources/datadog_agent/
[4]: /ko/observability_pipelines/destinations/cloudprem/
[5]: /ko/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker