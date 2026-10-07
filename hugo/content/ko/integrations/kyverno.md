---
app_id: kyverno
categories:
- 메트릭
- kubernetes
- security
custom_kind: 통합
description: Kyverno 상태와 성능을 모니터링하세요
integration_version: 3.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Kyverno
---
## 개요

이 점검은 Datadog Agent를 통해 [Kyverno](https://kyverno.io/docs/introduction/)를 모니터링합니다.

## 설정

아래 지침을 따라 Kubernetes 환경에서 실행 중인 Agent에 이 점검을 설치하고 구성하세요. 컨테이너 환경에서 구성하려면 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참고하세요.

### 설치

Datadog Agent 7.56.0 버전부터 Kyverno 점검 기능이 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있어 별도의 설치가 필요하지 않습니다.

이 점검은 Kyverno가 제공하는 OpenMetrics 엔드포인트에서 메트릭을 수집하기 위해 [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/)를 사용하며, 이를 위해 Python 3이 필요합니다.

### 설정

Kyverno는 Backup, Admissions, Cleanup, Reports 등 여러 컨트롤러로 구성됩니다. 각 컨트롤러는 모니터링할 수 있으며, 각 Kyverno 컨트롤러는 `8000` 포트의 `/metrics`에서 Prometheus 형식의 메트릭을 즉시 사용할 수 있습니다.  Agent가 메트릭 수집을 시작하려면 Kyverno 컨트롤러 포드에 어노테이션을 추가해야 합니다. 어노테이션에 관한 자세한 내용은 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참고하세요. 추가 구성 옵션은 [샘플  kyverno.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kyverno/datadog_checks/kyverno/data/conf.yaml.example)을 참고하세요.

**참고**: 안내된 메트릭은 사용 가능한 경우에만 수집됩니다. 일부 메트릭은 특정 작업이 실행될 때만 생성됩니다. 예를 들어, `kyverno.controller.drop.count` 메트릭은 컨트롤러에서 객체가 삭제된 후에만 표시됩니다.

Kyverno 점검을 구성하는 데 필요한 유일한 파라미터는 다음과 같습니다.

- `openmetrics_endpoint`: 이 파라미터는 Prometheus 형식의 메트릭이 노출되는 위치로 설정해야 합니다. 기본 포트는 `8000`입니다. 컨테이너 환경에서는 [호스트 자동 감지](https://docs.datadoghq.com/agent/kubernetes/integrations/)를 위해 `%%host%%`를 사용해야 합니다.

```yamlapiVersion: v1kind: Pod# (...)metadata:  name: '<POD_NAME>'  annotations:    ad.datadoghq.com/<CONTAINER_NAME>.checks: |      {        "kyverno": {          "init_config": {},          "instances": [            {              "openmetrics_endpoint": "http://%%host%%:8000/metrics"            }          ]        }      }    # (...)spec:  containers:    - name: <CONTAINER_NAME> # e.g. 'kyverno' in the Admission controller# (...)```

각 Kyverno 컨트롤러에서 메트릭을 수집하려면 위의 포드 어노테이션을 각 Kyverno 컨트롤러 포드에 적용할 수 있습니다. Reports 컨트롤러에 관한 포드 어노테이션 예시는 다음과 같습니다.

```yaml# 기본 Helm 차트 배포에서 생성된 Pod 매니페스트apiVersion: v1kind: Pod# (...)metadata:  name: 'controller'  annotations:    ad.datadoghq.com/<CONTAINER_NAME>.checks: |      {        "kyverno": {          "init_config": {},          "instances": [            {              "openmetrics_endpoint": "http://%%host%%:8000/metrics"            }          ]        }      }    # (...)spec:  containers:    - name: controller# (...)```

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Kyverno 로그는 Kubernetes를 통해 다양한 Kyverno 포드에서 수집할 수 있습니다. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

아래 매개변수 적용에 대한 지침은 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참조하세요.

| 파라미터      | 값                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kyverno", "service": "<SERVICE_NAME>"}`  |

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `kyverno`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kyverno.admission.requests.count** <br>(count) | Kyverno 일부로 발생한 어드미션 요청 건수|
| **kyverno.admission.review.duration.seconds.bucket** <br>(count) | bucket 집계는 어드미션 리뷰 지연 시간 히스토그램의 각 분포 버킷 내에서 관찰된 수를 보여줍니다.|
| **kyverno.admission.review.duration.seconds.count** <br>(count) | count 집계는 어드미션 리뷰 지연 시간 히스토그램에서 관찰된 수를 보여줍니다.|
| **kyverno.admission.review.duration.seconds.sum** <br>(count) | 어드미션 리뷰 지연 시간의 sum 집계는 정책과 규칙을 트리거하는, 들어오는 리소스 요청에 대응하여 실행된 개별 어드미션 리뷰들이 소요한 총 시간(초)을 나타냅니다.<br>_second로 표시됨_ |
| **kyverno.cleanup.controller.deletedobjects.count** <br>(count) | Cleanup 컨트롤러에 의해 삭제된 객체 수|
| **kyverno.cleanup.controller.errors.count** <br>(count) | Cleanup 컨트롤러가 객체를 삭제하려고 시도하는 동안 발생한 오류 수|
| **kyverno.client.queries.count** <br>(count) | Kyverno의 초당 쿼리 수(QPS)|
| **kyverno.controller.clientset.k8s.request.count** <br>(count) | 애플리케이션 조정 중에 실행된 Kubernetes 요청의 총 개수|
| **kyverno.controller.drop.count** <br>(count) | 컨트롤러가 요소를 삭제한 횟수. 요소 삭제는 일반적으로 복구할 수 없는 오류를 나타냅니다. 컨트롤러가 항목 처리를 여러 번 재시도했지만 매번 실패한 후 항목을 삭제했습니다.|
| **kyverno.controller.reconcile.count** <br>(count) | Kyverno의 여러 컨트롤러가 실행한 조정 횟수|
| **kyverno.controller.requeue.count** <br>(count) | 컨트롤러가 처리할 요소를 다시 큐에 넣은 횟수를 의미합니다. 다시 큐에 넣는 것은 일반적으로 오류가 발생했음을 나타내며, 컨트롤러가 조금 뒤에 다시 처리하기 위해 동일한 항목을 큐에 넣었음을 뜻합니다.|
| **kyverno.go.gc.duration.seconds.count** <br>(count) | Kyverno 인스턴스의 GC 지속 시간 요약에 있는 관측치 수|
| **kyverno.go.gc.duration.seconds.quantile** <br>(gauge) | Kyverno 인스턴스의 GC 지속 시간 요약에 있는 관측치 수(분위수별)|
| **kyverno.go.gc.duration.seconds.sum** <br>(count) | Kyverno 인스턴스의 가비지 컬렉션 주기 일시 중지 시간 합계<br>_second로 표시됨_ |
| **kyverno.go.goroutines** <br>(gauge) | 현재 Kyverno 인스턴스에 존재하는 고루틴 수|
| **kyverno.go.info** <br>(gauge) | Go 버전을 태그로 포함하는 메트릭|
| **kyverno.go.memstats.alloc_bytes** <br>(gauge) | Kyverno 인스턴스에서 할당됐고, 현재도 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.alloc_bytes.count** <br>(count) | Kyverno 인스턴스에서 할당됐고, 현재도 사용 중인 바이트 수의 단조 증가 카운트<br>_byte로 표시됨_ |
| **kyverno.go.memstats.buck_hash.sys_bytes** <br>(gauge) | Kyverno 인스턴스의 프로파일링 버킷 해시 테이블에서 사용되는 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.frees.count** <br>(count) | Kyverno 인스턴스에서 메모리 해제(free)가 발생한 총 횟수|
| **kyverno.go.memstats.gc.cpu_fraction** <br>(gauge) | 프로그램 시작 이후 Kyverno 인스턴스에서 GC가 사용한 가용 CPU 시간의 비율<br>_fraction으로 표시됨_ |
| **kyverno.go.memstats.gc.sys_bytes** <br>(gauge) | Kyverno 인스턴스에서 가비지 컬렉션 시스템 메타데이터에 사용되는 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.heap.alloc_bytes** <br>(gauge) | Kyverno 인스턴스에서 할당되어 현재 사용 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.heap.idle_bytes** <br>(gauge) | Kyverno 인스턴스에서 사용 대기 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.heap.inuse_bytes** <br>(gauge) | Kyverno 인스턴스에서 사용 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.heap.objects** <br>(gauge) | Kyverno 인스턴스에 할당된 객체 수<br>_object로 표시됨_ |
| **kyverno.go.memstats.heap.released_bytes** <br>(gauge) | Kyverno 인스턴스에서 OS로 반환된 힙 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.heap.sys_bytes** <br>(gauge) | Kyverno 인스턴스의 시스템에서 얻은 힙 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.lookups.count** <br>(count) | 포인터 조회 횟수|
| **kyverno.go.memstats.mallocs.count** <br>(count) | 메모리 할당(malloc) 횟수|
| **kyverno.go.memstats.mcache.inuse_bytes** <br>(gauge) | Kyverno 인스턴스에서 mcache 구조체가 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.mcache.sys_bytes** <br>(gauge) | Kyverno 인스턴스의 시스템에서 가져온 mcache 구조체에 사용된 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.mspan.inuse_bytes** <br>(gauge) | Kyverno 인스턴스에서 mspan 구조체가 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.mspan.sys_bytes** <br>(gauge) | Kyverno 인스턴스의 시스템에서 가져온 mspan 구조체에 사용된 바이트 수<br>_byte로 표시됨 |
| **kyverno.go.memstats.next.gc_bytes** <br>(gauge) | Kyverno 인스턴스에서 다음 가비지 컬렉션이 발생할 때의 힙 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.other.sys_bytes** <br>(gauge) | Kyverno 인스턴스에서 다른 시스템 할당에 사용된 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.stack.inuse_bytes** <br>(gauge) | Kyverno 인스턴스에서 스택 할당자가 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.stack.sys_bytes** <br>(gauge) | Kyverno 인스턴스의 스택 할당자를 위해 시스템에서 가져온 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.memstats.sys_bytes** <br>(gauge) | Kyverno 인스턴스의 시스템에서 가져온 바이트 수<br>_byte로 표시됨_ |
| **kyverno.go.threads** <br>(gauge) | Kyverno 인스턴스에서 생성된 OS 스레드 수<br>_thread로 표시됨_ |
| **kyverno.http.requests.count** <br>(count) | Kyverno의 일부로 발생한 HTTP 요청 수|
| **kyverno.http.requests.duration.seconds.bucket** <br>(count) | bucket 집계는 HTTP 요청 지연 시간 히스토그램에서 각 분포 버킷 내의 관측치 수를 보여줍니다.|
| **kyverno.http.requests.duration.seconds.count** <br>(count) | count 집계는 HTTP 요청 지연 시간 히스토그램에 나타난 관측치 수를 보여줍니다.|
| **kyverno.http.requests.duration.seconds.sum** <br>(count) | HTTP 요청의 sum 집계는 HTTP 요청으로 소요한 총 시간(초)을 나타냅니다.<br>_second로 표시됨_ |
| **kyverno.policy.changes.count** <br>(count) | 정책 생성, 업데이트, 삭제와 같은 모든 Kyverno 정책 관련 변경 사항 이력 추적에 사용되는 메트릭|
| **kyverno.policy.execution.duration.seconds.bucket** <br>(count) | bucket 집계는 정책 규칙 실행 지연 시간 히스토그램에서 각 분포 버킷 내의 관측치 수를 보여줍니다.|
| **kyverno.policy.execution.duration.seconds.count** <br>(count) | count 집계는 정책 규칙 실행 지연 시간 히스토그램에 나타난 관측치 수를 보여줍니다.|
| **kyverno.policy.execution.duration.seconds.sum** <br>(count) | 정책 규칙 실행의 sum 집계는 들어오는 리소스 요청을 평가하거나 백그라운드 스캔을 실행할 때, 각 개별 규칙의 실행 및 처리에 소요된 총 시간(초)을 나타냅니다.<br>_second로 표시됨_ |
| **kyverno.policy.results.count** <br>(count) | 들어오는 리소스 요청 및 백그라운드 스캔의 일부로 실행되는 규칙 관련 결과 추적에 사용되는 메트릭. 이 메트릭은 정책 수준의 결과를 추적하기 위해 추가로 집계할 수 있습니다.|
| **kyverno.policy.rule.info** <br>(gauge) | 클러스터에 존재하는 정책 및 규칙의 총 개수. 활성 및 비활성 정책과 규칙이 모두 포함됩니다.|
| **kyverno.process.cpu.seconds.count** <br>(count) | Kyverno 인스턴스에서 사용자 및 시스템이 사용한 총 CPU 시간(초)<br>_second로 표시됨_ |
| **kyverno.process.max_fds** <br>(gauge) | Kyverno 인스턴스에 열려 있는 파일 디스크립터의 최대 개수|
| **kyverno.process.open_fds** <br>(gauge) | Kyverno 인스턴스에 열려 있는 파일 디스크립터 수|
| **kyverno.process.resident_memory.bytes** <br>(gauge) | Kyverno 인스턴스의 상주 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **kyverno.process.start_time.seconds** <br>(gauge) | Kyverno 인스턴스에서 Unix Epoch 이후 프로세스 시작 시간(초)<br>_second로 표시됨_ |
| **kyverno.process.virtual_memory.bytes** <br>(gauge) | Kyverno 인스턴스의 가상 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **kyverno.process.virtual_memory.max_bytes** <br>(gauge) | Kyverno 인스턴스에서 사용 가능한 최대 가상 메모리 용량(바이트)<br>_byte로 표시됨_ |
| **kyverno.ttl.controller.deletedobjects.count** <br>(count) | Cleanup TTL 컨트롤러에 의해 삭제된 객체 수|
| **kyverno.ttl.controller.errors.count** <br>(count) | Cleanup TTL 컨트롤러가 객체를 삭제하려고 시도하는 동안 발생한 오류 수|

### 이벤트

Kyverno 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**kyverno.openmetrics.health**

Agent가 Kyverno OpenMetrics 엔드포인트에 연결할 수 없는 경우 `CRITICAL`를 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.