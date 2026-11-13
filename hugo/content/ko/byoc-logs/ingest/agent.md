---
aliases:
- /ko/cloudprem/ingest_logs/datadog_agent/
- /ko/cloudprem/ingest/agent/
description: Datadog Agent를 구성하여 BYOC Logs 배포로 로그 전송
further_reading:
- link: /byoc-logs/ingest/observability_pipelines/
  tag: 설명서
  text: Observability Pipelines 통합
- link: /byoc-logs/ingest/api/
  tag: 설명서
  text: REST API 통합
- link: /getting_started/containers/datadog_operator/
  tag: 설명서
  text: Datadog Operator 가이드
private: true
title: Datadog Agent를 사용하여 BYOC Logs로 로그 전송
---
## 개요 {#overview}
이 문서에서는 Datadog Agent를 사용하여 Datadog BYOC(Bring Your Own Cloud) Logs 배포로 로그를 전송하기 위한 구성 단계를 설명합니다. BYOC Logs는 Datadog SaaS 플랫폼과 달리 특정 Agent 구성이 필요합니다. 그래야 로그가 필수 호스트 수준 태그로 보강되고 올바른 엔드포인트로 발송되도록 보장할 수 있습니다. 이 가이드에서는 가장 일반적인 배포 방법에 따라 이러한 구성을 설정하는 방법을 설명합니다.

## 주요 요구 사항 {#key-requirements}
Datadog Agent를 사용하여 BYOC Logs로 로그를 전송하려면 두 가지 환경 변수를 구성해야 합니다:

`DD_LOGS_CONFIG_LOGS_DD_URL`
: 이것을 BYOC Logs 인덱서 엔드포인트로 설정합니다. 일반적으로 `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`입니다. 이것이 Agent에 로그를 어디로 보낼지 지시합니다.

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: (선택 사항) 선택 사항이지만 강력히 권장되는 변수입니다. "100,000"(약 5년)과 같이 큰 값으로 설정하세요. 이렇게 하면 Agent가 전송하는 모든 로그에 호스트 수준 태그를 추가할 수 있습니다. Datadog SaaS 플랫폼은 수집 후 이러한 태그를 사용해 자동으로 로그를 보강하지만, BYOC Logs의 경우 Agent가 사전에 태그를 추가해야 합니다.

### 프록시 {#proxy}

Datadog Agent가 프록시를 사용하도록 구성했고 BYOC Logs가 내부 네트워크에서 호스팅되는 경우 Agent가 프록시를 거치지 않고 BYOC Logs로 직접 로그를 전송할 수 있도록 `no_proxy` 설정을 구성해야 합니다.

```yaml
# In the no_proxy section, add the BYOC Logs DNS
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

또한 `DD_NO_PROXY_NONEXACT_MATCH`를 true로 설정해야 합니다. 자세한 정보는 [Datadog Agent 프록시 구성][2]을 참조하세요.

## Datadog Operator를 사용하여 Kubernetes 로그 전송 {#send-kubernetes-logs-with-the-datadog-operator}

Datadog Operator를 사용하여 Kubernetes에 Agent를 배포하려면 [Datadog Operator 시작하기][1] 가이드를 따르세요. 3단계에 도달하면 가이드에 제공된 예시 대신 다음 `datadog-agent.yaml` 구성을 사용합니다.

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

## 구성 옵션 {#configuration-options}

### 엔드포인트 구성 {#endpoint-configuration}

Datadog Agent는 다양한 엔드포인트를 사용하여 BYOC Logs로 로그를 전송하도록 구성할 수 있습니다.

{{% collapse-content title="내부 클러스터 엔드포인트" level="h4" expanded=false %}}
클러스터 내 에이전트에 권장:

```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="내부 ingress 엔드포인트" level="h4" expanded=false %}}
클러스터 외부 Agent의 경우:

```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### 추가 Agent 구성 {#additional-agent-configuration}

클러스터 메타데이터를 Datadog으로 전송하기 위한 추가 기능도 구성할 수 있습니다.

{{% collapse-content title="Prometheus 메트릭 스크래핑" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="OTLP 로그 수집" level="h4" expanded=false %}}
Agent 로그를 Datadog으로 전송하는 방법:

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

## 대체 배포 방법{#alternative-deployment-methods}
Datadog Operator를 사용하지 않는 경우 다음과 같은 일반적인 방법 중 하나를 사용하여 Agent를 배포할 수 있습니다.
### Helm 차트 배포{#helm-chart-deployment}

다음 명령을 실행하여 Helm 차트를 사용해 Agent를 배포하면서 로그 관련 환경 변수를 직접 설정하세요.

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### DaemonSet 배포{#daemonset-deployment}

사용자 지정 배포의 경우 DaemonSet에서 환경 변수를 설정하세요.

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

## 확인 {#verification}
Agent를 배포한 후 로그가 올바르게 전송 및 수신되고 있는지 확인할 수 있습니다.

### Agent 상태 확인 {#check-agent-status}

`kubectl exec`을 사용하여 Agent의 상태를 확인하고 로그를 전송하도록 올바르게 구성되어 있는지 확인하세요.

```shell
# Check Agent status and logs configuration
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# Check Agent logs for BYOC Logs connection
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### 로그가 BYOC Logs에 인덱싱되는지 확인 {#check-logs-are-indexed-in-byoc-logs}

다음 명령을 실행하여 BYOC Logs 검색기를 쿼리하고 JSON 로그가 인덱싱되고 있는지 확인하세요.

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## 문제 해결 {#troubleshooting}

**Agent가 로그를 전송하지 않음**:
- `DD_LOGS_CONFIG_LOGS_DD_URL` 환경 변수가 올바르게 설정되어 있는지 확인
- Agent 포드 로그 확인: `kubectl logs <datadog-agent-pod>`
- 로그 수집이 활성화되어 있는지 확인: `DD_LOGS_ENABLED=true`

**BYOC Logs가 로그를 수신하지 않음**:
- BYOC Logs 인덱서 로그 확인: `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Agent와 BYOC Logs 인덱서 간의 네트워크 연결 확인
- BYOC Logs 서비스가 실행 중인지 확인: `kubectl get pods -n <NAMESPACE_NAME>`

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /ko/agent/configuration/proxy/#proxy-server-setup-examples