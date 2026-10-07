---
description: CloudPrem 배포 환경에서 특정 메트릭을 모니터링하는 방법을 알아보세요.
title: CloudPrem 모니터링
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## Dashboards

CloudPrem은 CloudPrem의 주요 메트릭을 모니터링하는 기본 대시보드를 제공합니다.

### 설정

이러한 메트릭은 [DogStatsD][1]에서 내보냅니다. 다음 두 가지 방법 중 하나를 사용할 수 있습니다.

- DogStatsD를 독립형 서비스로 실행하거나
- Datadog Agent를 실행합니다(기본적으로 DogStatsD가 포함되어 있습니다).

조직의 API 키를 사용하여 두 옵션 중 하나를 구성하면 이러한 메트릭을 내보낼 수 있습니다. CloudPrem 클러스터가 Datadog에 연결되면 기본 대시보드가 ​​자동으로 생성되며 [Dashboards 목록][2]에서 액세스할 수 있습니다.

<div class="alert alert-info">대시보드에 배포 메트릭을 표시하려면 <a href="/metrics/distributions/#enabling-advanced-query-functionality">고급 쿼리 기능을 활성화해야 합니다</a>.</div>

### 수집한 데이터

| 메트릭 | 설명 |
|---|---|
| **indexed_events.count**<br/>(Counter) | 인덱싱된 이벤트 수 |
| **indexed_events_bytes.count**<br/>(Counter) | 인덱싱된 바이트 수 |
| **ingest_requests.count**<br/>(Counter) | 수집 요청 수 |
| **ingest_requests.duration_seconds**<br/>(Histogram) | 수집 요청 지연 시간 |
| **object_storage_delete_requests.count**<br/>(Counter) | 객체 스토리지에서 발생한 DELETE 요청 수 |
| **object_storage_get_requests.count**<br/>(Counter) | 객체 스토리지에서 발생한 GET 요청 수 |
| **object_storage_get_requests_bytes.count**<br/>(Counter) | GET 요청을 사용하여 객체 스토리지에서 읽은 총 바이트 수 |
| **object_storage_put_requests.count**<br/>(Counter) | 객체 스토리지에서 발생한 PUT 요청 수 |
| **object_storage_put_requests_bytes.count**<br/>(Counter) | PUT 요청을 사용하여 객체 스토리지에 기록된 총 바이트 수 |
| **pending_merge_ops.gauge**<br/>(Gauge) | 대기 중인 병합 작업 수 |
| **search_requests.count**<br/>(Counter) | 검색 요청 수 |
| **search_requests.duration_seconds**<br/>(Histogram) | 검색 요청 지연 시간 |
| **metastore_requests.count**<br/>(Counter) | 메타스토어 요청 수 |
| **metastore_requests.duration_seconds**<br/>(Histogram) | 메타스토어 요청 지연 시간 |
| **cpu.usage.gauge**<br/>(Gauge) | CPU 사용률 |
| **uptime.gauge**<br/>(Gauge) | 서비스 가동 시간(초) |
| **memory.allocated_bytes.gauge**<br/>(Gauge) | 할당된 메모리(바이트) |
| **disk.bytes_read.counter**<br/>(Counter) | 디스크에서 읽은 총 바이트 수 |
| **disk.bytes_written.counter**<br/>(Counter) | 디스크에 기록된 총 바이트 수 |
| **disk.available_space.gauge**<br/>(Gauge) | 사용 가능한 디스크 공간(바이트) |
| **disk.total_space.gauge**<br/>(Gauge) | 총 디스크 용량(바이트) |
| **network.bytes_recv.counter**<br/>(Counter) | 네트워크를 통해 수신된 총 바이트 수 |
| **network.bytes_sent.counter**<br/>(Counter) | 네트워크를 통해 전송된 총 바이트 수 |

<!-- ## Alerts, autoscaling, upgrades

Coming soon. -->

[1]: https://docs.datadoghq.com/ko/extend/dogstatsd/?tab=hostagent
[2]: https://app.datadoghq.com/dashboard/lists?q=cloudprem&p=1