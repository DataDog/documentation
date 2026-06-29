---
aliases:
- /ko/logs/guide/docker-logs-collection-troubleshooting-guide/
description: 컨테이너화된 환경에서 로그 수집과 관련된 일반적인 문제 해결
further_reading:
- link: /containers/kubernetes/log
  tag: 설명서
  text: Kubernetes 로그 수집
- link: /containers/docker/log
  tag: 설명서
  text: Docker 로그 수집
title: 컨테이너 로그 수집 문제 해결
---
## 개요 {#overview}

컨테이너화된 애플리케이션은 표준 출력 및 표준 오류(`stdout` / `stderr`) 스트림에 로그를 기록하며, 컨테이너 런타임과 오케스트레이터는 이를 다양한 방식으로 캡처하고 처리합니다. Datadog Agent는 이러한 로그 파일을 관리하기 위해 Docker 및 Kubernetes의 기본 파일 기반 처리 방식을 사용합니다. Datadog Agent는 자신이 실행 중인 호스트의 컨테이너를 모니터링하면서 각 컨테이너의 로그를 검색하고, 테일링하고, 태그를 지정한 후 Datadog로 전송합니다.

이 문서는 **Docker** 및 **Kubernetes** 로그 수집의 문제 해결 절차를 다룹니다. 컨테이너 로그 수집에 대한 전체 개요와 일반적인 설정 절차는 [Docker][1] 및 [Kubernetes][2] 설명서를 참조하세요.

[**ECS Fargate**][3] 및 [**EKS Fargate**][4] 기반 로그 수집의 경우 전용 설정 및 문제 해결 설명서를 참조하세요. 

## Docker 및 Kubernetes에서의 로그 수집 이해 {#understanding-log-collection-in-docker-and-kubernetes}

컨테이너 환경에서 Datadog Agent는 주로 다음 두 가지 방식인 **파일 기반** 수집과 Docker API를 통한 **소켓 기반** 수집으로 로그를 수집합니다.

Docker 및 Kubernetes 문서에서는 성능과 안정성이 더 우수한 파일 기반 수집을 기본 방식으로 사용합니다. 소켓 기반 수집은 Docker 환경에서 대체 수단으로 사용할 수 있습니다. Kubernetes 클러스터에서 소켓 기반 수집을 사용하려면 Docker 런타임이 필요하지만, 현재 대부분의 Kubernetes 배포판에서는 Docker 런타임 사용이 사실상 중단되었습니다.

Datadog은 컨테이너 환경에서 애플리케이션 컨테이너 내부의 로그 파일에 직접 기록하는 대신 `stdout` / `stderr` 스트림으로 로그를 출력할 것을 권장합니다. 이러한 스트림을 사용하면 로그 수집을 더욱 자동화하고 안정적으로 수행할 수 있습니다.

### 로그 파일 {#log-files}

Docker의 기본 `json-file` 로그 드라이버를 사용하는 경우 `stdout`/`stderr` 로그는 `/var/lib/docker/containers`에 저장됩니다. 이 로그는 `/var/lib/docker/containers`(Windows의 경우 `c:/programdata/docker/containers`)를 Agent 컨테이너에 마운트하여 수집할 수 있습니다. 예를 들면 다음과 같습니다.

```bash
/var/lib/docker/containers/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d-json.log. 
```

이 마운트 지점이 존재하지 않으면 Agent는 소켓 기반 수집 방식으로 전환됩니다. 이 경우 `/var/run/docker.sock`에 있는 소켓을 통해 Docker API에 접근합니다.

Kubernetes에서는 기본적으로 `stdout`/`stderr` 로그가 `/var/log/pods`에 저장됩니다. 폴더 구조는 고유한 포드와 해당 포드 내 컨테이너별로 구성됩니다. 예를 들면 다음과 같습니다.

```bash
/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log
```

Kubernetes에서 포드 내 컨테이너가 재시작되면 파일명이 자동으로 증가합니다(`0.log` -> `1.log`). Agent는 이러한 변경을 자동으로 처리합니다. 자세한 정보는 [Kubernetes 로그 수집][2]을 참조하세요.

Agent는 호스트에서 해당 컨테이너를 검색한 후 환경별 예상 디렉터리 구조와 파일 구조를 기준으로 로그 파일을 찾습니다.

### Agent Autodiscovery {#agent-autodiscovery}

기본적으로 Agent는 로그 수집이 활성화되어 있고 다음 조건 중 하나를 만족할 때만 컨테이너 로그를 수집합니다.

- `logs_config.container_collect_all`가 활성화되어 검색된 모든 컨테이너의 로그를 수집하는 경우
- 컨테이너가 Autodiscovery 기반 통합을 통해 로그 수집 대상으로 구성된 경우

또한 Agent는 [컨테이너 탐지 관리][5]에서 설정한 컨테이너 포함/제외 규칙도 적용합니다. 

마지막으로 Agent는 자신과 동일한 호스트에서 실행 중인 컨테이너의 로그를 수집합니다. 

로그 수집이 컨테이너에 대해 어떻게 설정되어 있는지 이해하기 위해 이러한 규칙을 고려하는 것이 중요합니다. 따라서 특정 컨테이너의 로그가 보이지 않는 경우 다음 사항을 확인해야 합니다.

- Agent에서 로그 수집이 활성화되어 있는가?
- 탐지 규칙 기준으로 해당 컨테이너가 로그 수집 대상으로 설정되어 있는가?
- Agent가 대상 컨테이너와 동일한 호스트에서 실행되고 있는가?

#### 모든 컨테이너 로그 수집 구성 {#container-collect-all-configuration}

로그 수집을 활성화하는 전체 절차는 [Docker][1] 및 [Kubernetes][2] 로그 수집 설명서를 참조하세요. 빠른 참조를 위해 Agent에서 로그 수집을 활성화하고 기본값이 false인 `container_collect_all` 기능을 활성화하는 구성 예제를 확인할 수 있습니다. 

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  #(...)
spec:
  #(...)
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

{{% k8s-operator-redeploy %}}
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  #(...)
  logs:
    enabled: true
    containerCollectAll: true
```

{{% k8s-helm-redeploy %}}
{{% /tab %}}

{{% tab "컨테이너화된 Agent" %}}

```bash
DD_LOGS_ENABLED=true
DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

{{% /tab %}}
{{< /tabs >}}

`container_collect_all`을 사용하는 경우 Agent는 검색된 모든 컨테이너의 로그를 수집하고, 검색된 컨테이너의 `short_image` 태그와 일치하는 `source` 및 `service` 태그를 로그에 추가합니다. 

`container_collect_all`이 활성화되어 있지 않은 경우에는 Autodiscovery 기반 구성을 사용하여 컨테이너별로 로그 수집을 개별적으로 활성화해야 합니다.

#### Autodiscovery 구성 {#autodiscovery-configuration}

Autodiscovery를 사용하면 Agent가 어떤 컨테이너의 로그를 수집할지 구성할 수 있습니다. Datadog은 [Docker의 컨테이너 레이블][6] 또는 [Kubernetes의 포드 주석][7] 사용을 권장합니다. 이들은 로그를 생성하는 해당 컨테이너 또는 포드에 설정하는 JSON 기반 로그 구성입니다. 다음은 최소 구성 예시입니다.

{{< tabs >}}
{{% tab "Kubernetes" %}}

Kubernetes 주석은 포드를 생성하는 상위 워크로드가 아니라 포드 자체에 설정해야 합니다. 또한 주석은 실제 컨테이너 이름에 맞게 수정해야 합니다.

```yaml
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: |
          [{
            "source": "example-source",
            "service": "example-service"
          }]
    spec:
      containers:
      - name: <CONTAINER_NAME>
        image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 레이블은 docker run 명령, Docker Compose 파일, 컨테이너 이미지 내부 중 하나에 설정할 수 있습니다.

예를 들어 run 명령에서는 다음과 같이 설정합니다.

```
-l com.datadoghq.ad.logs='[{"source":"example-source","service":"example-service"}]'
```

추가 예시는 [Docker 로그 수집](/containers/docker/log/?tab=dockerfile#log-integrations) 설명서를 참조하세요.

{{% /tab %}}
{{< /tabs >}}

두 환경 모두에서 다음 사항을 확인해야 합니다.
- source 및 service 값이 최소한 설정되어 있어야 함 
- 유효한 JSON이어야 합니다.
- 해당 Kubernetes 포드 또는 Docker 컨테이너에 설정되어 있어야 합니다.
- 로그 구성을 활성화하는 올바른 키 이름을 사용해야 함. [Datadog 사이트][8]에 따라 키 이름을 변경할 필요는 없습니다. 

로그 구성 설정에 대한 추가 예시는 [고급 로그 수집 구성][9]을 참조하세요.

### 태깅 {#tagging}

Agent는 각 환경에 대해 [태그 카디널리티][10]의 “높음” 수준으로 로그에 태그를 자동 할당합니다. 기본 제공되는 [Docker 태그는 여기][11]에서 확인할 수 있으며, [Kubernetes 태그는 여기][12]에서 확인할 수 있습니다. 여기에는 [Unified Service Tagging][13]에 의해 수집된 태그나 컨테이너 메타데이터에서의 다양한 태그 추출 규칙도 포함됩니다.

이러한 태그를 사용자 지정하거나 로그 수집 규칙을 변경하거나 로그 수집 자체를 활성화하려면 해당 컨테이너에 Autodiscovery 레이블 또는 주석을 적용하면 됩니다.

로그의 태그는 [호스트 태그 상속][14]을 통해서도 추가될 수 있습니다. 로그를 포함하여 Datadog로 수집되는 모든 데이터는 이 과정을 거칩니다. Datadog 수집 단계에서 로그는 해당 호스트에 연결된 모든 호스트 수준 태그를 상속받습니다. 이러한 태그는 호스트의 Infrastructure List에서 확인할 수 있습니다. 일반적으로 다음 소스에서 설정됩니다.

- Datadog Agent의 자동 감지 또는 수동으로 지정한 `DD_TAGS`
- 클라우드 제공자 통합이 수집하여 설정한 호스트 태그

예를 들어 `pod_name` 및 `short_image` 태그는 Agent가 데이터 전송 시 설정한 태그입니다. 반면 `region` 및 `kube_cluster_name`과 같은 태그는 Intake 단계에서 수행되는 호스트 태그 상속을 통해 추가됩니다.

## Agent 명령을 사용한 컨테이너 로그 수집 문제 해결 {#troubleshooting-container-log-collection-with-agent-commands}

애플리케이션 컨테이너와 동일한 노드에서 실행 중인 Datadog Agent는 해당 컨테이너의 로그를 수집합니다. 특히 Kubernetes 환경에서 아래 명령을 실행할 때는 원하는 애플리케이션 컨테이너와 동일한 노드에 있는 올바른 Agent 포드를 대상으로 작업하고 있는지 확인해야 합니다.

유용한 문제 해결 명령 목록은 [Agent 명령][15]을 참조하세요.

### Agent 상태 {#agent-status}

Agent 상태 명령을 실행하여 로깅 Agent에 문제가 있는지 확인할 수 있습니다.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent status
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

이 명령은 일반적으로 Logs Agent의 상태와 Agent가 모니터링 중인 각 컨테이너의 로그 수집기를 보여줍니다.

```text
==========
Logs Agent
==========
    Reliable: Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 8.60922316e+08
    EncodedBytesSent: 3.9744538e+07
    LogsProcessed: 604328
    LogsSent: 60431
  
  ============
  Integrations
  ============
  
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    - Type: file
      Identifier: ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
      Path: /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/*.log
      Service: example-service
      Source: example-source
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log  
      Bytes Read: 5075   
      Pipeline Latency:
        Average Latency (ms): 0
        24h Average Latency (ms): 0
        Peak Latency (ms): 0
        24h Peak Latency (ms): 0
```

Logs Agent Status가 예상과 다르다면 다음 섹션의 문제 해결 팁을 참조하세요.

각 개별 로그 수집기는 특정 컨테이너의 로그를 Agent가 어떻게 수집하고 있는지에 대한 상세 정보를 제공합니다. Kubernetes 예시 출력은 다음을 의미합니다.

- **수집기 이름**(`default/my-deployment-55d847444b-2fkch/my-container`)는 네임스페이스, 포드 및 컨테이너를 식별합니다.
- **식별자**(`ba778eaff...`)는 모니터링 중인 개별 컨테이너 ID입니다.
- **경로** 및 **입력**은 Agent가 컨테이너 로그 파일을 검색하고 식별한 위치를 나타냅니다.
- **서비스** 및 **소스**는 사용된 태그를 요약합니다.

Docker 환경에서도 출력 내용은 거의 동일하며, 개별 로그 수집기 이름만 다르게 표시됩니다.

Agent 상태 명령 실행 시 다음과 같은 메시지가 표시되는 경우:

```
==========
Logs Agent
==========

  Logs Agent is not running
```
이는 Agent에서 로그 수집을 활성화하지 않았음을 의미합니다.

또한 Logs Agent Status에 Integration 항목이 없고 `LogsProcessed: 0` 및 `LogsSent: 0`가 표시된다면:

```
==========
Logs Agent
==========

    LogsProcessed: 0
    LogsSent: 0
```
이는 로그 수집 기능은 활성화되었지만 Agent가 어떤 컨테이너의 로그를 수집해야 하는지 지정되지 않았음을 의미합니다.

### Agent configcheck {#agent-configcheck}

실행 중인 Agent에 로드되어 해석된 모든 구성을 출력하려면 `agent configcheck` 명령을 실행할 수 있습니다.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent configcheck
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent configcheck
```

{{% /tab %}}
{{< /tabs >}}

이 명령은 컨테이너 ID를 참조하는 `Configuration source` 정보를 사용하여 로그 수집기 구성을 표시합니다. 이를 통해 `agent status` 출력과 연결하여 확인할 수 있습니다.

```
===  check ===
Configuration provider: kubernetes-container-allinone
Configuration source: container:containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
Log Config:
[{"service":"example-service","source":"example-source"}]
Autodiscovery IDs:
* containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
```

Autodiscovery를 통해 적용된 `Log Config`은 사용자 지정 `service` 및 `source` 태그를 `[{"service":"example-service","source":"example-source"}]` 형태로 보여줍니다. `configcheck` 출력은 특정 컨테이너 ID에 대해 Agent가 로그 수집을 어떻게 구성했는지 검증하는 데 유용합니다.

`logs_config.container_collect_all`을 사용하는 경우 별도의 고유 구성이 제공되지 않았다면 해당 컨테이너는 기본적으로 `[{}]`로 표시됩니다.


### Agent stream-logs {#agent-stream-logs}

Agent가 실시간으로 확인하는 로그와 관련 메타데이터 및 로그 내용을 콘솔에 스트리밍하려면 `agent stream-logs` 명령을 사용할 수 있습니다.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent stream-logs

# Stream logs relative to "Namespace/Pod Name/Container Name" based name
kubectl exec -it <Agent Pod> -- agent stream-logs --name <NAME>
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent stream-logs
```

{{% /tab %}}
{{< /tabs >}}

이 출력을 `--name` 플래그로 필터링할 수 있으며, 이는 Kubernetes 명명 형식(네임스페이스/포드 이름/컨테이너)과 일치합니다. 아니면 `--service` 또는 `--source` 플래그로 적용된 태그를 기준으로 필터링할 수 있습니다. 

`<NAME>` 값을 확인하려면 `agent status` 명령을 사용할 수 있습니다. 예를 들어, `default/my-deployment-55d847444b-2fkch/my-container`입니다.

```
==========
Logs Agent
==========
    ...  
  ============
  Integrations
  ============
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    ...
```
이 명령은 Agent가 보고하는 로그를 지속적으로 출력합니다.

```text
$ agent stream-logs --name default/my-deployment-55d847444b-2fkch/my-container
...
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016005644 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 INFO Sample Info Log
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016049347 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 ERROR Sample Error Log
```

각 줄에는 통합 이름, 유형, 상태, 타임스탬프, 호스트 이름, 서비스, 소스, 컨테이너 태그, 메시지가 포함됩니다. 이를 통해 Agent가 어떤 로그를 수집하고 있는지, 어떤 메타데이터가 연결되어 있는지, Datadog로 어떤 메시지가 전송되는지 확인할 수 있습니다.

스트리밍을 종료하려면 `Ctrl + C`를 누르세요.

### 원본 로그 파일 확인 {#capturing-the-raw-log-file}

Agent가 로그를 올바르게 테일링하고 있는지 확인하려면 로그 파일을 복사한 후 [`agent status` 명령](#agent-status)으로 직접 확인할 수 있습니다.

먼저 `agent status` 명령을 실행한 후 “Logs Agent” 섹션에서 해당 컨테이너를 찾습니다. 예를 들어 포드 이름이 `my-deployment-98878c5d8-mc2sk`이고 컨테이너 이름이 `my-container`인 경우 다음과 같이 표시될 수 있습니다.

```text
  default/my-deployment-98878c5d8-mc2sk/my-container
  --------------------------------------------------
    - Type: file
      Identifier: fa54113fffebc83ffef4bd863c8c1012bd5cfb19311a4dcd7d8e9b5271dc29fe
      Path: /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/*.log
      Service: busybox
      Source: busybox
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log  
```

여기에서 `Path`(Agent가 로그를 찾고 있는 경로), `Inputs`(발견된 로그 파일), `/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log`(실제 로그 파일 경로)를 확인할 수 있습니다. 

해당 파일은 Agent 포드 내부에서 열려 있으므로 `kubectl cp` 명령을 사용해 로컬 시스템으로 복사할 수 있습니다. 

```
kubectl cp <Agent Pod>:<Log Input Path> <Desired Filename>
```

예를 들어 Agent 포드 이름이 `datadog-agent-xxxxx`이라면 다음과 같이 실행합니다.

```text
kubectl cp datadog-agent-xxxxx:/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log my-container.log
```
복사한 파일을 검토하면 Agent가 실제로 확인하는 로그 내용을 그대로 볼 수 있으며, Kubernetes가 필요한 로그를 정상적으로 기록하고 있는지 확인할 수 있습니다. Docker 환경에서도 동일한 방식으로 `/var/lib/docker/containers` 경로의 로그 파일을 확인하고 docker cp 명령을 사용할 수 있습니다.

## 일반적인 문제 {#common-issues}

컨테이너 환경에서 Datadog로 로그를 전송할 때 자주 발생하는 문제가 있습니다. Datadog에 로그를 전송하는 데 문제가 발생하면 아래 항목을 먼저 확인해 보세요. 문제가 계속되면 Datadog 지원팀에 추가 지원을 문의하세요.

### 호스트 이름 전처리 {#hostname-preprocessing}

원본 로그에 `host`, `hostname` 또는 `syslog.hostname` JSON 속성이 포함되어 있으면 문제가 발생할 수 있습니다. 예를 들면 다음과 같습니다.

{{< img src="logs/troubleshooting/hostname_preprocessing.png" alt="호스트 전처리 예시" >}}

JSON 형식 로그는 공식 타임스탬프나 로그 레벨을 결정하기 위해 `timestamp`, `level` 등의 예약 속성을 사용하는 전처리 과정을 거칩니다. 이 예약 속성 중 하나가 [호스트 전처리][16] 기능입니다. 로그에 `host`, `hostname`, 또는 `syslog.hostname`라는 JSON 속성이 존재하면 해당 값이 로그의 공식 `host` 값으로 사용됩니다. 그 결과 로그가 실제 호스트가 아닌 다른 호스트에 귀속될 수 있으며, 원래 기대했던 호스트 수준 태그를 상속받지 못할 수 있습니다.

이 전처리가 적용되는 로그는 JSON 속성 `@host:* OR @hostname:* OR @syslog.hostname:*`을 기준으로 검색하여 확인할 수 있습니다.

이 문제를 해결하기 위한 몇 가지 옵션이 있습니다.
- 가능하다면, `host` 또는 `hostname` JSON 속성을 기록하지 않도록 애플리케이션을 업데이트하여 이를 제거하거나 다른 키로 변경하세요.
- [전역 전처리 규칙][17]을 업데이트하여 이 동작을 건너뛰세요. 단, 이 기능에 의존하는 로그는 관련 기능을 사용할 수 없게 됩니다.
- Autodiscovery 구성을 사용하여 [호스트 키워드를 마스킹하는 사용자 지정 로그 구성][18]을 추가합니다.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: |-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
spec:
  containers:
    - name: <CONTAINER_NAME>
      image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

```yaml
  labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
```

{{% /tab %}}
{{< /tabs >}}

위 규칙은 `"host"` 문자열(따옴표 포함)을 찾아 JSON 구조를 유지한 상태로 `"app_host"`로 변경합니다. 로그 형식에 따라 필요한 경우 패턴을 `hostname`으로 변경하세요.

또한 Agent가 모든 로그에서 키워드를 마스킹하기 위해 전체에 적용되는 [전역 처리 규칙][19]을 환경 변수 `DD_LOGS_CONFIG_PROCESSING_RULES`를 사용하여 구성할 수도 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}

{{% tab "환경 변수" %}}

```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```
{{% /tab %}}
{{< /tabs >}}


### 신규 호스트 또는 노드에서 호스트 수준 태그 누락 {#missing-host-level-tags-on-new-hosts-or-nodes}

새로 생성된 호스트 또는 노드에서 Datadog로 로그를 전송할 때 호스트 수준 태그가 [상속][20]되기까지 몇 분이 소요될 수 있습니다. 그 결과 이 로그에서 호스트 수준 태그가 누락될 수 있습니다. 

이 문제를 해결하려면 환경 변수 `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`을 사용하여 기간(분 단위)을 설정할 수 있습니다. Datadog Agent는 설정된 기간 동안 알고 있는 호스트 수준 태그를 각 로그에 직접 추가합니다. 이 기간이 지나면 Agent는 다시 Datadog Intake의 태그 상속 메커니즘에 의존하게 됩니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```

{{% /tab %}}

{{% tab "환경 변수" %}}

```
DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION='10m'
```
{{% /tab %}}
{{< /tabs >}}

### 신규 컨테이너 또는 포드에서 태그 누락 {#missing-tags-on-new-containers-or-pods}

새로 생성된 컨테이너 또는 포드에서 Datadog로 로그를 전송하는 경우, Datadog Agent의 내부 Tagger가 아직 해당 컨테이너/포드 태그를 수집하지 못했을 수 있습니다. 그 결과, 로그에 일부 태그가 누락될 수 있습니다.

이 문제를 해결하려면 환경 변수 `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION`를 사용하여 새 컨테이너 또는 포드에서 로그를 전송하기 전에 Datadog Agent가 대기할 시간(초 단위)을 설정할 수 있습니다. 기본값은 `0`입니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```

{{% /tab %}}

{{% tab "환경 변수" %}}

```
DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION='5'
```
{{% /tab %}}
{{< /tabs >}}

### 수명이 짧은 포드 {#short-lived-pods}

기본적으로 Agent는 5초마다 새 컨테이너를 찾습니다. Agent v6.12 이상에서는 파일 기반 로그 수집을 사용하는 경우 종료되거나 비정상 종료된 짧은 수명의 컨테이너 로그도 자동으로 수집됩니다. 여기에는 Init Container 로그도 포함됩니다. 단, 해당 로그 파일이 여전히 존재해야 합니다.

Kubernetes에서는 대부분의 포드와 컨테이너 로그가 Agent가 보고할 수 있을 만큼 충분히 오래 유지됩니다. 따라서 매우 짧게 실행되는 프로세스의 로그도 수집 가능합니다. Kubernetes CronJob 및 Job은 기본적으로 Agent가 완료된 컨테이너의 로그를 보고할 수 있을 만큼 포드를 유지합니다. 하지만 [작업 정리 규칙][21] `ttlSecondsAfterFinished`을 지정하는 경우 Datadog은 Agent가 로그를 처리할 수 있도록 최소 15초 이상의 시간을 권장합니다.

### 파일에서 Docker 로그 수집 문제 {#docker-log-collection-from-file-issues}

Agent 6.33.0/7.33.0 이상에서는 Docker 로그 파일이 Agent에서 접근 가능한 경우 기본적으로 디스크의 로그 파일에서 Docker 로그를 수집합니다. `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE`을 `false`로 설정하면 이 동작을 비활성화할 수 있습니다.

파일 기반 Docker 컨테이너 로그 수집 시 Agent는 Docker 컨테이너 로그가 저장되는 디렉터리(Linux의 경우 `/var/lib/docker/containers`)를 읽을 수 없으면 Docker 소켓 기반 수집으로 자동 전환됩니다. 문제 진단을 위해 Logs Agent Status를 확인하고 다음과 유사한 오류가 포함된 파일 유형 항목이 있는지 확인합니다.

```
- Type: docker
    Service: stable
    Source: stable
    Status: OK
    The log file tailer could not be made, falling back to socket
    Inputs:
    68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d  
    Bytes Read: 160973 
```

이 상태는 Agent가 특정 컨테이너의 로그 파일을 찾을 수 없음을 의미합니다. 이 문제를 해결하기 위해 Docker 컨테이너 로그가 들어 있는 폴더가 Datadog Agent 컨테이너에 올바르게 노출되어 있는지 확인합니다. 이는 Linux에서는 Agent 컨테이너를 시작하는 명령줄의 `-v /var/lib/docker/containers:/var/lib/docker/containers:ro`에 해당하며, Windows에서는 `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`에 해당합니다. 

기본 호스트를 기준으로 한 디렉터리 경로는 Docker 데몬의 특정 구성에 따라 달라질 수 있습니다. 그러나 Docker 볼륨 매핑이 올바르게 구성되어 있다면 이는 문제가 되지 않습니다. 예를 들어, 기본 호스트에서 Docker 데이터 디렉터리가 `/data/docker`로 이동된 경우에는 `-v /data/docker/containers:/var/lib/docker/containers:ro`를 사용합니다.

로그가 수집되지만 한 줄의 로그가 여러 줄로 분리되어 보이는 경우, Docker 데몬이 [JSON 로깅 드라이버](#different-docker-log-driver)를 사용하고 있는지 확인하세요.

### 호스트 기반 Agent {#host-based-agent}

Docker 컨테이너에서 실행하는 대신 호스트에 Agent를 설치하는 경우, Docker 소켓을 읽을 수 있는 권한을 부여하기 위해 사용자 `dd-agent`를 Docker 그룹에 추가해야 합니다. Agent 로그에 다음과 같은 오류가 표시된다면:

```text
<TIMESTAMP> UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
<TIMESTAMP> UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

다음 명령으로 Agent를 Docker 사용자 그룹에 추가하세요.

```
usermod -a -G docker dd-agent
```
**참고:** 호스트에 Agent를 설치하는 경우 Agent는 루트 권한이 필요한 ` /var/lib/docker/containers`에 접근할 수 없습니다. 따라서 Docker 소켓에서 로그를 수집하게 됩니다.


### 다른 Docker 로그 드라이버 사용 {#different-docker-log-driver}

Docker의 기본값은 [json-file logging driver][23]이므로 Agent는 먼저 해당 구조에서 로그를 읽으려고 시도합니다. 컨테이너가 다른 로그 드라이버를 사용하도록 구성된 경우, Logs Agent는 컨테이너를 정상적으로 발견하더라도 파일에서 로그를 수집하지 못한다고 표시합니다. Docker 환경에서는 최적의 Agent 사용 경험을 위해 Datadog에서 `json-file` 로그 드라이버 사용을 권장합니다. 하지만 Agent는 `journald` 로그 드라이버에서 로그를 읽도록 구성할 수도 있습니다.

1. 사용 중인 로그 드라이버를 모르는 경우 `docker inspect <CONTAINER_NAME>`를 사용하여 현재 설정된 로그 드라이버를 확인할 수 있습니다. 컨테이너가 JSON 로그 드라이버를 사용하는 경우 Docker Inspect에 다음과 같은 블록이 표시됩니다.

   ```
   "LogConfig": {
       "Type": "json-file",
       "Config": {}
   },
   ```

2. 컨테이너가 journald 로그 드라이버를 사용하는 경우 Docker Inspect에는 다음과 같은 블록이 표시됩니다.
   ```
   "LogConfig": {
       "Type": "journald",
       "Config": {}
   },
   ```

3. journald 로그 드라이버의 로그를 수집하려면 [Datadog-Journald 설명서][24]에 따라 journald 통합을 구성하세요.
4. [Docker Agent 설명서][25]의 지침에 따라 YAML 파일을 컨테이너에 마운트하세요. Docker 컨테이너의 로그 드라이버 설정에 대한 자세한 내용은 [이 문서][26]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/docker/log/
[2]: /ko/containers/kubernetes/log/
[3]: /ko/integrations/aws-fargate/?tab=webui#log-collection
[4]: /ko/integrations/eks_fargate/?tab=admissioncontrollerdatadogoperator#log-collection
[5]: /ko/containers/guide/container-discovery-management
[6]: /ko/containers/docker/log/?tab=dockerfile#log-integrations
[7]: /ko/containers/kubernetes/log/?tab=datadogoperator#autodiscovery-annotations
[8]: /ko/getting_started/site/
[9]: /ko/agent/logs/advanced_log_collection/?tab=configurationfile
[10]: /ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[11]: /ko/containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[12]: /ko/containers/kubernetes/tag/?tab=datadogoperator
[13]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[14]: /ko/getting_started/tagging/#tag-inheritance
[15]: /ko/agent/configuration/agent-commands/
[16]: /ko/logs/log_configuration/pipelines/?tab=host#preprocessing
[17]: https://app.datadoghq.com/logs/pipelines
[18]: /ko/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[19]: /ko/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[20]: /ko/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#integration-inheritance
[21]: https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/#cleanup-for-finished-jobs
[22]: /ko/logs/guide/docker-logs-collection-troubleshooting-guide/#your-containers-are-not-using-the-json-logging-driver
[23]: https://docs.docker.com/engine/logging/drivers/json-file/
[24]: /ko/integrations/journald/?tab=host#setup
[25]: /ko/containers/docker/#mounting-conf-d
[26]: https://docs.docker.com/engine/logging/drivers/journald/