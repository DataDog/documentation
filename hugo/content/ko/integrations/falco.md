---
app_id: falco
categories:
- log collection
- security
custom_kind: integration
description: Falco 알림 로그 및 메트릭에 관한 인사이트 확보
integration_version: 2.0.0
media:
- caption: Falco - 알림
  image_url: images/falco_alerts.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Falco
---
## 개요

[Falco](https://falco.org/docs/getting-started/) 는 클라우드 네이티브 보안 도구입니다. 런타임 인사이트를 활용하여 클라우드, 컨테이너 및 Kubernetes 워크로드에 거의 실시간에 가까운 위협 탐지를 제공합니다. Falco는 Linux 커널을 포함한 다양한 소스에서 사용자 정의 가능한 규칙으로 정의된 이벤트를 모니터링하고, Kubernetes API 서버, 컨테이너 런타임 등의 메타데이터를 추가하여 이를 보강할 수 있습니다.
본 통합은 다음 로그를 수집합니다.

- 알림: 규칙 이름, 설명, 조건, 출력 메시지, 우선순위 수준, 태그 등의 세부 정보를 나타냅니다.

Falco 통합은 웹훅을 통해 Falco 로그 데이터를 원활하게 수집합니다. 데이터가 인입되기 전에 로그를 정규화하고 보강하여 일관된 데이터 형식을 유지하고, 이후 처리 및 분석을 위한 정보 품질을 향상시킵니다. 또한 기본 제공 대시보드를 통해 알림 로그에 대한 인사이트를 제공합니다.

## 설정

### 설정

#### 메트릭 수집

Falco는 런타임 동작, 이벤트 처리, 보안 상태에 가시성을 제공하는 Prometheus 형식의 메트릭을 노출합니다. Datadog Agent는 OpenMetrics 통합을 사용하여 이러한 메트릭을 수집할 수 있습니다. 아래 단계에 따라 Falco에서 메트릭 수집을 활성화하고 구성하세요.

##### 1. Falco에서 Prometheus 메트릭 활성화

`falco.yaml` 구성 파일을 편집하여 메트릭 엔드포인트를 활성화합니다.

```yaml
metrics:
  enabled: true
  listen_address: "<FALCO_HOST>"
  listen_port: 8765
```

Falco를 재시작해 변경 사항을 적용합니다.

```bash
systemctl restart falco
```

Falco가 Helm을 사용해 설치된 경우, 다음과 같이 메트릭을 활성화할 수 있습니다.

```bash
helm upgrade -i falco falcosecurity/falco \
  --set metrics.enabled=true \
  --set metrics.listen_address="<FALCO_HOST>" \
  --set metrics.listen_port=8765
```

##### 2. Datadog Agent 구성

Datadog Agent 설정을 업데이트하여 Falco의 Prometheus 메트릭 엔드포인트를 스크랩하도록 구성하세요. 예를 들어, 다음 내용을 `conf.d/prometheus.d/conf.yaml`에 추가합니다.

```yaml
instances:
  - openmetrics_endpoint: http://<FALCO_HOST>:8765/metrics
```

`<FALCO_HOST>`를 Falco가 실행 중인 호스트 이름 또는 IP 주소로 바꾸세요.

Kubernetes 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/containers/kubernetes/integrations/)을 사용하여 Agent를 구성하고 자동으로 Falco 메트릭 엔드포인트를 발견하고 스크래핑할 수 있습니다.

##### 3. 확인

구성 완료 후 Falco 메트릭이 Datadog로 정상적으로 수집되는지 확인하세요. Datadog Metrics Explorer에서 `falco.` 접두사가 붙은 메트릭이 표시되어야 합니다.

#### 로그 수집

{{< tabs >}}

{{% tab "API Forwarding" %}}

##### API 포워딩

- 아래와 같이 구성 파일(`falco.yaml`)의 설정을 업데이트하세요:

  ```yaml
  json_output: true
  http_output:
    enabled: true
    url: <DATADOG_WEBHOOK_URL> 
  ```

  **참고:** 사용 중인 [Datadog 사이트](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site)에 맞는 올바른 수집 URL로 `<DATADOG_WEBHOOK_URL>`를 교체하세요. 예를 들어, US3의 경우 `https://http-intake.logs.us3.datadoghq.com/api/v2/logs?dd-api-key=<dd-api-key>&ddsource=falco`입니다.

  - 아래 명령을 사용해 Falco를 재시작하세요.

    ```bash
    systemctl restart falco
    ```

- Falco가 Helm으로 설치된 경우, 다음 명령을 사용하여 HTTP URL을 추가하거나 업데이트할 수 있습니다.

  ```bash
  helm upgrade -i falco falcosecurity/falco \
  --set falco.http_output.enabled=true \
  --set falco.http_output.url="<DATADOG_WEBHOOK_URL>" \
  --set falco.json_output=true \
  --set json_include_output_property=true
  ```

  **참고:** 사용 중인 [Datadog 사이트](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site)에 맞는 올바른 수집 URL로 `<DATADOG_WEBHOOK_URL>`를 교체하세요. 예를 들어, US3의 경우 `https://http-intake.logs.us3.datadoghq.com/api/v2/logs?dd-api-key=<dd-api-key>&ddsource=falco`입니다.

{{% /tab %}}

{{% tab "Agent" %}}

##### Agent

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. Falco 로그 수집을 시작하려면 이 구성 블록을 `falco.d/conf.yaml` 파일에 추가하세요.

   ```yaml
   logs:
     - type: file
       path: <PATH TO LOGS>
       service: myservice
       source: falco
   ```

   `path` 및 `service` 파라미터 값을 변경하여 사용자 환경에 맞게 구성하세요. 사용 가능한 모든 설정 옵션은 [샘플 falco.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/falco/datadog_checks/falco/data/conf.yaml.example)을 참고하세요.

1. [Agent를 재시작](https://docs.datadoghq.com/agent/configuration/agent-commands/#start-stop-and-restart-the-agent)합니다.

참고: 로그를 수집하려는 파일을 추적할 수 있도록 `datadog-agent` 사용자에게 읽기 및 실행 권한이 있는지 확인하세요.

{{% /tab %}}

{{< /tabs >}}

> > > > > > > master

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **falco.container.memory.used** <br>(gauge) | 컨테이너 환경에서 Falco 프로세스의 메모리 사용량(container_memory_working_set_bytes와 유사함)<br>_byte로 표시_ |
| **falco.cpu.usage.ratio** <br>(gauge) | Falco 프로세스의 CPU 사용률(ps 출력과 동일한 기준)|
| **falco.duration.seconds.count** <br>(count) | Falco가 실행 중인 총 누적 시간<br>_second로 표시_ |
| **falco.evt.hostname** <br>(gauge) | 호스트 이름 정보|
| **falco.evt.source** <br>(gauge) | 이벤트 소스 정보(예: syscall 또는 플러그인 기반 소스)|
| **falco.host.cpu.usage.ratio** <br>(gauge) | 호스트 시스템에서 실행 중인 모든 프로세스의 전체 CPU 사용률|
| **falco.host.memory.used** <br>(gauge) | 호스트 시스템에서 실행 중인 모든 프로세스의 전체 메모리 사용량<br>_byte로 표시_ |
| **falco.host.num.cpus** <br>(gauge) | 호스트 시스템의 전체 CPU 개수<br>_CPU로 표시_ |
| **falco.host.open.fds** <br>(gauge) | 호스트 시스템에서 열린 파일 디스크립터의 총 개수<br>_file로 표시_ |
| **falco.host.procs.running** <br>(gauge) | 호스트 시스템에서 현재 실행 중인 프로세스 수(/proc/stat 기준)<br>_process로 표시_ |
| **falco.jemalloc.active.count** <br>(count) | jemalloc 메모리 할당자가 사용 중인 활성 메모리 할당량<br>_byte로 표시_ |
| **falco.jemalloc.allocated.count** <br>(count) | jemalloc 메모리 할당자가 할당한 총 메모리<br>_byte로 표시_ |
| **falco.jemalloc.mapped.count** <br>(count) | jemalloc 메모리 할당자가 매핑한 메모리 용량<br>_byte로 표시_ |
| **falco.jemalloc.metadata.count** <br>(count) | jemalloc 메타데이터에 사용한 메모리<br>_byte로 표시_ |
| **falco.jemalloc.metadata.thp.count** <br>(count) | jemalloc 메타데이터에 사용되는 투명 대형 페이지(THP) 메모리 사용량<br>_byte로 표시_ |
| **falco.jemalloc.resident.count** <br>(count) | jemalloc 메모리 할당자가 점유 중인 상주 메모리 용량<br>_byte로 표시_ |
| **falco.jemalloc.retained.count** <br>(count) | jemalloc 메모리 할당자가 향후 할당을 위해 유지 중인 메모리 용량<br>_byte로 표시_ |
| **falco.jemalloc.zero.reallocs.count** <br>(count) | jemalloc에서 크기 제로 재할당으로 인해 발생한 메모리 사용량<br>_byte로 표시_ |
| **falco.kernel.release** <br>(gauge) | 커널 릴리스 버전 정보|
| **falco.memory.pss** <br>(gauge) | Falco 프로세스의 PSS(Proportional Set Size) 메모리 사용량<br>_byte로 표시_ |
| **falco.memory.rss** <br>(gauge) | Falco 프로세스의 RSS(Resident Set Size) 메모리 사용량<br>_byte로 표시_ |
| **falco.memory.vsz** <br>(gauge) | Falco 프로세스의 VSS(Virtual Set Size) 메모리 사용량<br>_byte로 표시_ |
| **falco.outputs.queue.num.drops.count** <br>(count) | 출력 대기열에서 드롭된 이벤트의 총 개수|
| **falco.rules.matches.count** <br>(count) | Falco 보안 규칙에 의해 감지된 규칙 매칭의 총 개수|
| **falco.scap.engine.name** <br>(gauge) | SCAP 엔진 정보(예: bpf, modern_bpf 또는 kmod)|
| **falco.scap.n.added.fds.count** <br>(count) | 내부 추적 테이블에 추가된 파일 디스크립터의 총 개수<br>_file로 표시_ |
| **falco.scap.n.added.threads.count** <br>(count) | 내부 추적 테이블에 추가된 스레드의 총 개수<br>_thread로 표시_ |
| **falco.scap.n.cached.fd.lookups.count** <br>(count) | 캐시에서 성공적으로 조회된 파일 디스크립터의 총 개수|
| **falco.scap.n.cached.thread.lookups.count** <br>(count) | 캐시에서 성공적으로 조회된 스레드의 총 개수|
| **falco.scap.n.containers** <br>(gauge) | 현재 추적 중인 컨테이너 수|
| **falco.scap.n.drops.buffer.count** <br>(count) | 버퍼 문제로 인해 드롭된 이벤트의 총 개수|
| **falco.scap.n.drops.count** <br>(count) | 커널 측에서 드롭된 이벤트의 총 개수|
| **falco.scap.n.drops.full.threadtable.count** <br>(count) | 스레드 테이블이 가득 차서 드롭된 이벤트의 총 개수|
| **falco.scap.n.drops.scratch.map.count** <br>(count) | 스크래치 맵 문제로 인해 드롭된 이벤트의 총 개수|
| **falco.scap.n.evts.count** <br>(count) | 시스템 호출 캡처 엔진에 의해 수집된 이벤트의 총 개수|
| **falco.scap.n.failed.fd.lookups.count** <br>(count) | 실패한 파일 디스크립터 조회의 총 개수<br>_file로 표시_ |
| **falco.scap.n.failed.thread.lookups.count** <br>(count) | 실패한 스레드 조회의 총 개수|
| **falco.scap.n.fds** <br>(gauge) | 내부 테이블에 저장된 현재 파일 디스크립터 수<br>_file로 표시_ |
| **falco.scap.n.missing.container.images** <br>(gauge) | 컨테이너 이미지가 누락되었거나 알 수 없는 컨테이너의 수|
| **falco.scap.n.noncached.fd.lookups.count** <br>(count) | 캐시를 사용하지 않고 수행된 파일 디스크립터 조회의 총 개수<br>_file로 표시_ |
| **falco.scap.n.noncached.thread.lookups.count** <br>(count) | 캐시를 사용하지 않고 수행된 스레드 조회의 총 개수|
| **falco.scap.n.removed.fds.count** <br>(count) | 내부 추적 테이블에서 제거된 파일 디스크립터의 총 개수<br>_file로 표시_ |
| **falco.scap.n.removed.threads.count** <br>(count) | 내부 추적 테이블에서 제거된 스레드의 총 개수<br>_thread로 표시_ |
| **falco.scap.n.retrieve.evts.drops.count** <br>(count) | 이벤트를 가져오는 과정에서 드롭된 이벤트의 총 개수|
| **falco.scap.n.retrieved.evts.count** <br>(count) | 커널로부터 성공적으로 수집된 이벤트의 총 개수|
| **falco.scap.n.store.evts.drops.count** <br>(count) | 이벤트 저장 과정에서 드롭된 이벤트의 총 개수|
| **falco.scap.n.stored.evts.count** <br>(count) | 저장이 완료된 이벤트 수|
| **falco.scap.n.threads** <br>(gauge) | 내부 추적 테이블에 저장된 현재 스레드 수<br>_thread로 표시_ |
| **falco.sha256.config.files** <br>(gauge) | Falco 구성 파일의 SHA256 해시 정보|
| **falco.sha256.rules.files** <br>(gauge) | Falco 규칙 파일의 SHA256 해시 정보|

### 로그

Falco 통합은 Falco 경고 로그를 수집하여 Datadog로 전달합니다.

### 이벤트

Falco 통합은 이벤트를 포함하지 않습니다.

## 지원

추가 지원을 받으려면  [Datadog 지원팀](https://docs.datadoghq.com/help/)에 문의하세요.