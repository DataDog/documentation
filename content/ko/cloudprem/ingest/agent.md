---
aliases:
- /ko/cloudprem/ingest_logs/datadog_agent/
description: Datadog Agent를 구성하여 CloudPrem 배포 환경으로 로그를 전송하도록 설정하세요.
further_reading:
- link: /cloudprem/ingest_logs/observability_pipelines/
  tag: 설명서
  text: Observability Pipelines 통합
- link: /cloudprem/ingest_logs/rest_api/
  tag: 설명서
  text: REST API 통합
- link: /getting_started/containers/datadog_operator/
  tag: 설명서
  text: Datadog Operator 가이드
title: Datadog Agent를 사용하여 CloudPrem으로 로그 전송
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem를 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요
이 문서에서는 Datadog Agent를 사용하여 Datadog CloudPrem 배포 환경으로 로그를 전송하는 구성 단계를 설명합니다. Datadog SaaS 플랫폼과 달리 CloudPrem에서는 로그에 필요한 호스트 수준 태그가 추가되고 올바른 엔드포인트로 전송되도록 특정 Agent 구성이 필요합니다. 이 가이드에서는 가장 일반적인 배포 방식에 대한 구성 방법을 다룹니다.

## 주요 요구 사항
Datadog Agent를 사용하여 CloudPrem으로 로그를 전송하려면 두 가지 환경 변수를 구성해야 합니다.

`DD_LOGS_CONFIG_LOGS_DD_URL`
: 이 값을 CloudPrem 인덱서 엔드포인트(일반적으로`http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`)로 설정합니다. 이렇게 하면 Agent가 로그를 어디로 보낼지 알 수 있습니다.

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: (선택 사항) 이 변수는 선택 사항이지만 강력히 권장됩니다. "100000"(약 5년)과 같이 큰 값으로 설정하세요. 이렇게 하면 Agent가 전송하는 모든 로그에 호스트 수준 태그를 추가합니다. Datadog SaaS 플랫폼은 수집 후 로그에 이러한 태그를 자동으로 추가하지만, CloudPrem에서는 Agent가 사전에 태그를 추가해야 합니다.

### 프록시

Datadog Agent가 프록시를 사용하도록 구성했고 CloudPrem이 내부 네트워크에 호스팅되어 있는 경우, Agent가 프록시를 거치지 않고 로그를 CloudPrem으로 직접 전송할 수 있도록 `no_proxy` 설정을 구성해야 합니다.

```yaml
# no_proxy 섹션에 해당 CloudPrem DNS를 추가하세요.
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

또한, `DD_NO_PROXY_NONEXACT_MATCH`를 true로 설정해야 합니다. 자세한 내용은 [Datadog Agent 프록시 구성][2]을 참고하세요.

## Datadog Operator를 사용하여 Kubernetes 로그 전송

Datadog Operator를 사용하여 Kubernetes에 Agent를 배포하려면 [Datadog Operator 시작하기][1] 가이드를 따르세요. 3단계에 도달하면 가이드에 제공된 예제 대신 다음 `datadog-agent.yaml` 구성을 사용하세요.

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

## 설정 옵션

### 엔드포인트 구성

Datadog Agent는 다양한 엔드포인트를 사용하여 CloudPrem으로 로그를 전송하도록 구성할 수 있습니다.

{{% collapse-content title="내부 클러스터 엔드포인트" level="h4" expanded=false %}}
클러스터 내부 Agent에 권장됨:
```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="내부 수신 엔드포인트" level="h4" expanded=false %}}
클러스터 외부 Agent의 경우:
```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### 추가 Agent 구성

또한 클러스터 메타데이터를 Datadog으로 전송하도록 추가 기능을 구성할 수 있습니다.

{{% collapse-content title="Prometheus 메트릭 스크래핑" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="OTLP 로그 수집" level="h4" expanded=false %}}
Agent 로그를 Datadog에 전송하려면:
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

## 다른 배포 방법
Datadog Operator를 사용하지 않는 경우, 다음과 같은 일반적인 방법으로 Agent를 배포할 수 있습니다.
### Helm 차트 배포

다음 명령을 실행하여 Helm 차트를 사용해 Agent를 배포하고 로그 관련 환경 변수를 직접 설정합니다.

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### DaemonSet 배포

사용자 지정 배포라면 DaemonSet에서 환경 변수를 설정합니다.

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

## 확인
Agent를 배포한 후에는 로그가 올바르게 전송되고 수신되는지 확인할 수 있습니다.

### Agent 상태 확인

`kubectl exec`를 사용하여 Agent의 상태를 확인하고 로그를 전송하도록 구성되었는지 확인합니다.

```shell
# Check Agent 상태와 로그 구성을 확인합니다.
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# CloudPrem 연결용 Agent 로그를 확인합니다.
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### CloudPrem에서 로그가 인덱싱되었는지 확인

다음 명령을 실행하여 CloudPrem 검색기를 쿼리하고 JSON 로그가 인덱싱되는지 확인합니다.

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## 트러블슈팅

**Agent가 로그를 전송하지 않음**
- `DD_LOGS_CONFIG_LOGS_DD_URL` 환경 변수가 올바르게 설정되었는지 확인하세요.
- Agent 포드 로그를 확인하세요. `kubectl logs <datadog-agent-pod>`
- 로그 수집이 활성화되었는지 확인하세요. `DD_LOGS_ENABLED=true`

**CloudPrem에서 로그를 수신하지 못함**:
- CloudPrem 인덱서 로그를 확인하세요. `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Agent와 CloudPrem 인덱서 간의 네트워크 연결을 확인하세요.
- CloudPrem 서비스가 실행 중인지 확인하세요. `kubectl get pods -n <NAMESPACE_NAME>`

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /ko/agent/configuration/proxy/#proxy-server-setup-examples