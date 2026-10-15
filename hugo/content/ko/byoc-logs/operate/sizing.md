---
aliases:
- /ko/cloudprem/configure/cluster_sizing/
- /ko/cloudprem/operate/sizing/
description: BYOC Logs의 클러스터 크기 조정에 대해 알아보기
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: 설명서
  text: BYOC Logs 로그 수신 구성
- link: /byoc-logs/configure/pipelines/
  tag: 설명서
  text: BYOC Logs 처리 구성
- link: /byoc-logs/introduction/architecture/
  tag: 설명서
  text: BYOC Logs 아키텍처에 대해 자세히 알아보기
title: 클러스터 크기 조정
---
{{< jqmath-vanilla >}}

## 개요 {#overview}

BYOC (Bring Your Own Cloud) 로그 클러스터의 크기를 조정하려면 다음 세 단계를 따르세요.

1. 일일 수집 볼륨을 TB/일 단위로 추정합니다.
2. 해당 볼륨에 대한 [시작 구성](#starter-configurations)을 선택합니다.
3. 클러스터를 모니터링하고 복제본 수와 포드 크기를 조정합니다.

검색기 용량은 수집 볼륨뿐만 아니라 쿼리 동시성, 쿼리 복잡성 및 스캔되는 데이터 양에 따라 달라집니다.

이 권장 사항은 AWS M6 인스턴스 유형에 사용되는 것과 같은 최신 x86 CPU 또는 다른 클라우드 공급자의 동급 CPU를 가정합니다. AWS Graviton과 같은 ARM 기반 CPU는 비슷한 처리량에서 더 나은 비용 효율성을 제공할 수 있습니다.

## 시작 구성 {#starter-configurations}

다음 총합을 시작점으로 사용하세요.

- **인덱서:** 1TB/일당 vCPU 2개
- **컴팩터:** 2TB/일당 vCPU 1개
- **검색기:** 인덱서 vCPU 총개수의 약 2배 분석 작업이 많은 워크로드의 경우 표에 표시된 값의 최대 2배가 필요할 수 있습니다.

객체 스토리지 합계는 30일 보존 기간과 6배의 압축률을 가정합니다.

|   일일 볼륨 |  인덱서 | 컴팩터 |  검색기 | 객체 스토리지 |
|---------------:|----------:|-----------:|-----------:|---------------:|
|   **1TB/일** |   vCPU 2개 |   vCPU 0.5개 |    vCPU 4개 |          ~5TB |
|  **10TB/일** |  vCPU 20개 |     vCPU 5개 |   vCPU 40개 |         ~50TB |
| **100 TB/day** | 200 vCPUs |    50 vCPUs |  400 vCPUs |        ~500 TB |

각 포드의 권장 크기는 다음과 같습니다.

| 일일 볼륨        | 인덱서        | 컴팩터      | 검색기        |
|---------------------|----------------:|----------------:|-----------------:|
| **최대 30TB/일** |  vCPU 4개, 16GB |  vCPU 4개, 16GB |  vCPU 16개, 64GB |
| **30TB/일 초과** |  vCPU 8개, 32GB |  vCPU 8개, 32GB | vCPU 64개, 256GB |

<div class="alert alert-info">
<strong>청구와 프로비저닝의 차이:</strong> 프로비저닝된 vCPU와 요금이 청구되는 vCPU는 다릅니다. 프로덕션 클러스터는 수집 및 검색 급증에 대응할 수 있도록 의도적으로 필요한 용량을 초과하여 프로비저닝합니다. 요금 청구에 대한 안내는 Datadog 담당자에게 문의하세요.
</div>

## 각 구성 요소 크기 조정 {#size-each-component}

시작 구성을 구성 요소별로 조정하세요. 각 구성 요소의 역할은 [아키텍처][2]를 참조하세요.

### 인덱서 {#indexers}

- **성능:** 1TB/일당 vCPU 2개
- **메모리:** vCPU당 4GB RAM
- **스토리지 유형:** 선행 기록 로그(write-ahead log)용 네트워크 연결 블록 스토리지 [인덱서의 영구 스토리지 구성][3]을 참조하세요.

{{% collapse-content title="이벤트 수 기준 크기 조정" level="h4" expanded=false %}}
일일 이벤트 수는 알지만 바이트 볼륨은 모르는 경우, 다음 공식을 사용하여 추정하세요.

$$\text"일일 볼륨(TB)" = {\text"일일 이벤트 수" × \text"평균 이벤트 크기(바이트)"} / 10^{12}$$

예를 들어, 하루 10억 개의 이벤트가 발생하고 평균 크기가 1KB인 경우 다음과 같습니다.

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

일반적인 로그 이벤트 크기는 500바이트(짧은 syslog)부터 2~3KB(Kubernetes 태그가 포함된 JSON)까지 다양합니다. 정확한 평균을 얻으려면 로그의 대표 샘플을 측정하세요.
{{% /collapse-content %}}

### 컴팩터 {#compactors}

- **성능:** 2TB/일당 vCPU 1개
- **메모리:** vCPU당 4GB RAM
- **스토리지 유형:** 로컬 SSD AWS M8gd와 같이 로컬 SSD가 있는 인스턴스를 사용하세요.

### 검색기 {#searchers}

검색기 크기는 수집 볼륨만이 아니라 예상되는 검색 워크로드에 맞춰 조정하세요. 시작점은 인덱서 vCPU 총개수의 약 2배입니다.

- **성능:** 용어 쿼리(`status:error AND message:exception`)는 일반적으로 와일드카드나 전체 이벤트 검색보다 CPU를 적게 사용합니다. 집계 쿼리는 더 많은 CPU와 메모리가 필요합니다.
- **메모리:** 검색기 vCPU당 4GB RAM이 필요합니다. 동시 집계 요청이 많을 것으로 예상되면 RAM을 더 많이 할당하세요.

검색 지연 시간이 길면 검색기 복제본을 추가하거나 포드당 메모리를 늘리세요. [쿼리 패턴에 따라 검색기 확장][4]을 참조하세요.

### 기타 서비스 {#other-services}

다음과 같은 경량 구성 요소에는 아래 리소스를 할당하세요.

| 서비스 | vCPU | RAM | 복제본 수|
|---------|-------|-----|----------|
| **컨트롤 플레인** | 2 | 4GB | 1 |
| **메타스토어** | 2 | 4GB | 2 |
| **Janitor** | 2 | 4GB | 1 |

### PostgreSQL 데이터베이스 {#postgresql-database}

- **인스턴스 사이즈:** 대부분의 경우 vCPU 1개와 4GB RAM을 갖춘 PostgreSQL 인스턴스면 충분합니다.
- **Amazon RDS 권장 사항:** Amazon RDS에서는 `t4g.medium` 인스턴스 유형으로 시작하세요.
- **고가용성:** 대기 복제본 1개를 포함한 Multi-AZ 배포를 활성화하세요.

메타스토어 데이터베이스에서 자동 백업을 활성화하세요. [메타스토어 데이터베이스에서 자동 백업 활성화][5]를 참조하세요.

### 객체 스토리지 {#object-storage}

BYOC Logs는 로그 데이터를 압축하고 인덱싱한 후 객체 스토리지에 저장합니다. 압축률은 일반적으로 5~8배이며, 이는 하루에 수집되는 1TB당 약 125~200GB가 저장되는 것에 해당합니다.

$$\\text\"일일 저장 데이터\" = {\\text\"일일 볼륨\"} / {\\text\"압축률\"}$$

$$\\text\"총 스토리지\" = \\text\"일일 저장 데이터\" × \\text\"보존 기간(일)\"$$

<div class="alert alert-info">
활성 데이터에는 표준 계층 객체 스토리지(예: S3 Standard 또는 GCS Standard)를 사용하세요. S3 Infrequent Access나 GCS Nearline과 같은 저비용 계층은 BYOC Logs와 함께 사용하도록 검증되지 않았습니다.
</div>

PUT 요청 볼륨 및 비용을 추정하려면 [객체 스토리지 요청 추정][6]을 참조하세요.

## Helm 차트 크기 조정 계층 {#helm-chart-sizing-tiers}

[시작 구성](#starter-configurations)의 포드당 CPU 및 메모리와 일치하도록 `indexer.podSize` 및 `searcher.podSize`를 설정하세요. 기본값은 `xlarge`입니다. 각 프리셋은 수집 큐 및 검색 캐시 크기에도 적용됩니다.

| `podSize` | CPU | 메모리 |
|---|---:|---:|
| `large` | 2 | 8Gi |
| `xlarge` | 4 | 16Gi |
| `2xlarge` | 8 | 32Gi |
| `4xlarge` | 16 | 64Gi |
| `6xlarge` | 24 | 96Gi |
| `8xlarge` | 32 | 128Gi |

{{% collapse-content title="실제 Kubernetes 요청" level="h3" expanded=false %}}
각 `podSize`는 kube-system, DaemonSet 및 애드온을 위한 공간을 확보하기 위해 명목상 CPU 및 메모리보다 적게 요청합니다. 예약량은 [GKE 노드 예약 계산](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations)을 따르며, 여기에 DaemonSet 및 애드온을 위해 노드당 250m CPU와 512Mi 메모리가 추가됩니다.

| `podSize` | 실제 CPU 요청 | 실제 메모리 요청/제한 |
|---|---:|---:|
| `large` | 1600m | 5700Mi |
| `xlarge` | 3600m | 13100Mi |
| `2xlarge` | 7600m | 28500Mi |
| `4xlarge` | 15600m | 59300Mi |
| `6xlarge` | 23600m | 90100Mi |
| `8xlarge` | 31600m | 120900Mi |

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```
{{% /collapse-content %}}

전체 구성은 [Helm 차트 크기 조정 맵][1]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: /ko/byoc-logs/introduction/architecture/
[3]: /ko/byoc-logs/operate/best_practices/#configure-persistent-storage-for-indexers
[4]: /ko/byoc-logs/operate/best_practices/#scale-searchers-based-on-your-query-patterns
[5]: /ko/byoc-logs/operate/best_practices/#enable-automated-backups-on-your-metastore-database
[6]: /ko/byoc-logs/operate/object_storage_requests/