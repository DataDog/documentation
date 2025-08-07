---
app_id: gatekeeper
categories:
- 클라우드
- compliance
- 설정 및 배포
- 컨테이너
- security
custom_kind: 통합
description: Gatekeeper 통합
integration_version: 1.0.0
media: []
supported_os:
- linux
title: Gatekeeper
---
## 개요

This check collects metrics from [OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper).

![Gatekeeper Overview Dashboard](https://raw.githubusercontent.com/DataDog/integrations-extras/master/gatekeeper/images/gatekeeper_dashboard.png)

## 설정

Follow the instructions below to install and configure this check for an Agent running on a Kubernetes cluster. See also the [Autodiscovery Integration Templates](https://docs.datadoghq.com/agent/kubernetes/integrations/) for guidance on applying these instructions.

### 설치

#### 에이전트 버전 >=7.26.0 또는 >=6.26.0

Docker 에이전트를 사용하는 `integrations-extra`에서 통합을 사용하려면 통합을 설치한 상태에서 에이전트를 구축하기를 권고합니다. 다음 Dockerfile을 사용해 `integrations-extras`에서 `gatekeeper` 통합을 포함하고 업데이트된 에이전트를 구축하세요.

```
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-gatekeeper==<INTEGRATION_VERSION>
```

#### Agent versions \<7.26.0 or \<6.26.0

쿠버네티스 클러스터에서 gatekeeper 점검 설치하는 방법:

1. Install the [developer toolkit](https://docs.datadoghq.com/developers/integrations/python/).

1. `integrations-extras` 리포지토리를 복제합니다.

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

1. `integrations-extras/` 경로로 `ddev` config을 업데이트합니다.

   ```shell
   ddev config set repos.extras ./integrations-extras
   ```

1. `gatekeeper` 패키지를 구축하려면 다음을 실행하세요.

   ```shell
   ddev -e release build gatekeeper
   ```

1. [Download the Agent manifest to install the Datadog Agent as a DaemonSet](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile).

1. `PersistentVolumeClaim`을 두 개 생성합니다. 하나는 점검 코드용, 다른 하나는 구성용입니다.

1. 생성한 두 파일을 에이전트 포드 템플릿에 볼륨으로 추가하고 내 점검과 구성에 사용하세요.

   ```yaml
        env:
          - name: DD_CONFD_PATH
            value: "/confd"
          - name: DD_ADDITIONAL_CHECKSD
            value: "/checksd"
      [...]
        volumeMounts:
          - name: agent-code-storage
            mountPath: /checksd
          - name: agent-conf-storage
            mountPath: /confd
      [...]
      volumes:
        - name: agent-code-storage
          persistentVolumeClaim:
            claimName: agent-code-claim
        - name: agent-conf-storage
          persistentVolumeClaim:
            claimName: agent-conf-claim
   ```

1. Datadog 에이전트를 쿠버네티스(Kubernetes) 클러스터에 배포합니다.

   ```shell
   kubectl apply -f agent.yaml
   ```

1. 통합 아티팩트 .whl 파일을 내 쿠버네티스 노드에 복사하거나 공용 URL에 업로드합니다.

1. 다음 명령을 실행해 통합 에이전트와 통합 휠을 설치하세요.

   ```shell
   kubectl exec ds/datadog -- agent integration install -w <PATH_OF_GATEKEEPER_ARTIFACT_>/<GATEKEEPER_ARTIFACT_NAME>.whl
   ```

1. 다음 명령을 실행해 점검과 구성을 복사해 해당 PVC로 붙여넣으세요.

   ```shell
   kubectl exec ds/datadog -- sh
   # cp -R /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/* /checksd
   # cp -R /etc/datadog-agent/conf.d/* /confd
   ```

1. Datadog 에이전트 포드를 재시작하세요.

### 설정

1. Edit the `gatekeeper/conf.yaml` file, in the `/confd` folder that you added to the Agent pod to start collecting your gatekeeper performance data. See the [sample gatekeeper/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/datadog_checks/gatekeeper/data/conf.yaml.example) for all available configuration options.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `gatekeeper` under the Checks section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gatekeeper.audit.duration.seconds.sum** <br>(count) | Latency of audit operation in seconds<br>_Shown as second_ |
| **gatekeeper.audit.duration.seconds.count** <br>(count) | Latency of audit operation in seconds<br>_Shown as second_ |
| **gatekeeper.audit.last_run_time** <br>(gauge) | Timestamp of last audit operation|
| **gatekeeper.constraint_template_ingestion.duration.seconds.sum** <br>(count) | Distribution of how long it took to ingest a constraint template in seconds<br>_Shown as second_ |
| **gatekeeper.constraint_template_ingestion.duration.seconds.count** <br>(count) | Distribution of how long it took to ingest a constraint template in seconds<br>_Shown as second_ |
| **gatekeeper.constraint_template_ingestion.count** <br>(count) | Total number of constraint template ingestion actions|
| **gatekeeper.violations** <br>(gauge) | Total number of violations per constraint|
| **gatekeeper.constraints** <br>(gauge) | Current number of known constraints|
| **gatekeeper.constraint_templates** <br>(gauge) | Number of observed constraint templates|
| **gatekeeper.request.duration.seconds.sum** <br>(count) | \[Deprecated since Gatekeeper v3.4.0\] The response time in seconds<br>_Shown as second_ |
| **gatekeeper.request.duration.seconds.count** <br>(count) | \[Deprecated since Gatekeeper v3.4.0\] The response time in seconds<br>_Shown as second_ |
| **gatekeeper.request.count** <br>(count) | \[Deprecated since Gatekeeper v3.4.0\] Total number of requests that are routed to webhook|
| **gatekeeper.sync** <br>(gauge) | Total number of resources of each kind being cached|
| **gatekeeper.sync.duration.seconds.sum** <br>(count) | Latency of sync operation in seconds<br>_Shown as second_ |
| **gatekeeper.sync.duration.seconds.count** <br>(count) | Latency of sync operation in seconds<br>_Shown as second_ |
| **gatekeeper.sync.last_run_time** <br>(gauge) | Timestamp of last sync operation|
| **gatekeeper.watch.intended** <br>(gauge) | The total number of Group/Version/Kinds that the watch manager has instructions to watch|
| **gatekeeper.watch.watched** <br>(gauge) | The total number of Group/Version/Kinds currently watched by the watch manager|
| **gatekeeper.validation.request.count** <br>(count) | The number of requests that are routed to validation webhook|
| **gatekeeper.validation.request.duration.seconds.sum** <br>(count) | The response time in second<br>_Shown as second_ |
| **gatekeeper.validation.request.duration.seconds.count** <br>(count) | The response time in second<br>_Shown as second_ |
| **gatekeeper.mutator.ingestion.count** <br>(count) | Total number of Mutator ingestion actions|
| **gatekeeper.mutator.ingestion.duration.seconds.sum** <br>(count) | The distribution of Mutator ingestion durations<br>_Shown as second_ |
| **gatekeeper.mutator.ingestion.duration.seconds.count** <br>(count) | The distribution of Mutator ingestion durations<br>_Shown as second_ |
| **gatekeeper.mutators** <br>(gauge) | The current number of Mutator objects|
| **gatekeeper.mutator.conflicting.count** <br>(gauge) | The current number of conflicting Mutator objects|

### 이벤트

Gatekeeper에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

**gatekeeper.prometheus.health**

Returns `CRITICAL` if the agent fails to connect to the Prometheus metrics endpoint, otherwise `OK`.

_상태: ok, critical_

**gatekeeper.health**

Returns `CRITICAL` if the agent fails to connect to the gatekeeper health endpoint, `OK` if it returns 200, `WARNING` otherwise.

_Statuses: ok, warning, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.