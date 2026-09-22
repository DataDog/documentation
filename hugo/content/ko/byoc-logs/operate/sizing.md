---
aliases:
- /ko/cloudprem/configure/cluster_sizing/
- /ko/cloudprem/operate/sizing/
description: BYOC 로그의 클러스터 크기 조정에 대해 알아보기
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: 설명서
  text: BYOC 로그 수신 구성
- link: /byoc-logs/configure/pipelines/
  tag: 설명서
  text: BYOC 로그 처리 구성
- link: /byoc-logs/introduction/architecture/
  tag: 설명서
  text: BYOC 로그 아키텍처에 대해 자세히 알아보기
title: 클러스터 크기 조정
---
{{< jqmath-vanilla >}}

## 개요 {#overview}

적절한 클러스터 크기 조정은 BYOC(Bring Your Own Cloud) 로그 배포의 최적 성능, 비용 효율성 및 안정성을 보장하는 데 도움이 됩니다. 크기 조정 요구 사항은 로그 수집 볼륨, 쿼리 패턴, 보존 기간 및 로그 데이터의 복잡성을 포함한 여러 요인에 따라 달라집니다.

아래의 [크기 조정 예시](#sizing-examples)는 일반적인 일일 로그 볼륨을 기준으로 한 초기 구성을 제공합니다. 각 구성 요소에 대한 자세한 지침은 다음 섹션을 참조하세요.

<div class="alert alert-tip">
예상 일일 로그 볼륨과 최대 수집 속도를 시작점으로 사용한 다음, 클러스터 성능을 모니터링하고 필요에 따라 크기를 조정하세요.
</div>

## 크기 조정 예시 {#sizing-examples}

다음 표는 일반적인 일일 로그 볼륨을 기준으로 한 초기 구성을 제시합니다. 이는 기본 권장 사항이므로 관찰된 성능에 따라 조정하시기 바랍니다.

혼합 워크로드의 경우 일반적으로 일일 수집된 TB당 약 12개의 vCPU(인덱서용 4개 vCPU, 검색기용 8개 vCPU)를 할당하세요. 헤비 분석 워크로드에는 2배 더 필요합니다.

이러한 vCPU 권장 사항은 AWS m6 인스턴스 유형(또는 다른 클라우드의 동급 제품)과 같은 최신 x86 CPU를 가정합니다. AWS Graviton과 같은 ARM 기반 CPU는 동일한 처리량에서 더 나은 비용 효율성을 제공할 수 있습니다.

| 일일 볼륨 | 인덱서 포드 | 인덱서 포드 크기 | 검색기 포드 | 검색기 포드 크기 | 객체 스토리지(30일 보존, 약 6배 압축) |
|-------------|-------------|-----------------|---------------|-------------------|-----------------------------------------------------|
| **1TB/일** | 2 | large | 2 | xlarge | 약 5TB |
| **5TB/일** | 5 | xlarge | 5 | 2xlarge | 약 25TB |
| **10TB/일** | 10 | xlarge | 5 | 4xlarge | 약 50TB |
| **50TB/일** | 25 | 2xlarge | 13 | 8xlarge | 약 250TB |
| **100TB/일** | 50 | 2xlarge | 25 | 8xlarge | 약 500TB |

<div class="alert alert-info">
<strong>청구와 프로비저닝의 차이:</strong> 프로비저닝된 vCPU와 요금이 청구되는 vCPU는 다릅니다. 프로덕션 클러스터는 수집 및 검색 급증에 대응할 수 있도록 의도적으로 필요한 용량을 초과하여 프로비저닝합니다. 요금 청구에 대한 안내는 Datadog 담당자에게 문의하세요.
</div>

## 인덱서 {#indexers}

인덱서는 Datadog Agent로부터 로그를 수신한 다음 이를 처리, 인덱싱하여 객체 스토리지에 인덱스 파일(_스플릿_이라고 함)로 저장합니다. 적절한 크기 조정은 수집 처리량을 유지하고 클러스터가 로그 볼륨을 처리할 수 있도록 하는 데 매우 중요합니다.

| 사양 | 권장 사항 | 참고 |
|---------------|----------------|-------|
| **성능** | vCPU당 5MB/s | 초기 크기 조정을 결정하기 위한 기준 처리량입니다. 실제 성능은 로그 특성(크기, 속성 수, 중첩 수준)에 따라 달라집니다. |
| **메모리** | vCPU당 4GB RAM | |
| **최소 포드 크기** | vCPU 2개, 8GB RAM | 인덱서 포드에 권장되는 최소 사양입니다. |
| **스토리지 용량** | 최소 250GB | 인덱스 파일을 생성하고 병합하는 동안 임시 데이터를 저장하는 데 필요합니다. |
| **스토리지 유형** | 네트워크 연결형 블록 스토리지 | 예: Amazon EBS gp3, Azure Managed Disks 또는 GCP Persistent Disk. 데이터는 객체 스토리지에 업로드되기 전에 WAL(Write-Ahead Log)에 임시로 저장됩니다. WAL은 복제되지 않으므로 로컬(임시) SSD를 사용하면 디스크 장애 시 몇 분 분량의 데이터가 손실될 위험이 커집니다. 네트워크 연결형 블록 스토리지는 기본적으로 중복성을 제공합니다. |
| **디스크 I/O** | vCPU당 약 20MB/s | Amazon EBS의 경우 vCPU당 320 IOPS와 동일합니다(64KB IOPS 가정). |


{{% collapse-content title="예: 일일 1TB 로그에 대한 크기 조정" level="h4" expanded=false %}}
일일 1TB의 로그(약 11.6 MB/s)를 인덱싱하려면 다음 단계를 따르세요.

1. **vCPU 계산:** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **RAM 계산:** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **여유 공간 추가:** 먼저 인덱서 포드 하나를 **vCPU 3개, 12GB RAM, 200GB 디스크**로 구성하세요. 관찰된 성능 및 중복성 요구 사항에 따라 이러한 값을 조정하세요.
{{% /collapse-content %}}

{{% collapse-content title="이벤트 수 기준 크기 조정" level="h4" expanded=false %}}
일일 이벤트 수는 알지만 바이트 볼륨은 모르는 경우, 다음 공식을 사용하여 추정하세요.

$$\text"일일 볼륨(TB)" = {\text"일일 이벤트 수" × \text"평균 이벤트 크기(바이트)"} / 10^{12}$$

예를 들어, 하루 10억 개의 이벤트가 발생하고 평균 크기가 1KB인 경우:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

일반적인 로그 이벤트 크기는 500바이트(짧은 syslog)부터 2~3KB(Kubernetes 태그가 포함된 JSON)까지 다양합니다. 정확한 평균을 얻으려면 로그의 대표 샘플을 측정하세요.
{{% /collapse-content %}}

## 검색기 {#searchers}

검색기는 Datadog UI의 검색 쿼리를 처리하며, 메타스토어에서 메타데이터를 읽고 객체 스토리지에서 데이터를 가져옵니다.

인덱서에 할당된 vCPU 수보다 두 배 정도를 초기 자원으로 잡는 것이 좋습니다. 크기 조정 예시를 참조하세요.

- **성능:** 검색 성능은 작업 부하(쿼리 복잡성, 동시성, 스캔된 데이터 양)에 따라 크게 달라집니다. 예를 들어, 용어 쿼리(`status:error AND message:exception`)는 일반적으로 와일드카드나 전체 이벤트 검색 쿼리보다 계산 비용이 적게 듭니다.
- **메모리:** 검색기 vCPU당 4GB RAM이 필요합니다. 동시 집계 요청이 많을 것으로 예상되면 RAM을 더 많이 할당하세요.


## 기타 서비스 {#other-services}

다음과 같은 경량 구성 요소에는 아래 리소스를 할당하세요.

| 서비스 | vCPU | RAM | 복제본 수|
|---------|-------|-----|----------|
| **컨트롤 플레인** | 2 | 4GB | 1 |
| **메타스토어** | 2 | 4GB | 2 |
| **Janitor** | 2 | 4GB | 1 |

## 객체 스토리지 용량 추정 {#object-storage-estimation}

BYOC 로그는 로그 데이터를 압축하고 인덱싱한 후 객체 스토리지에 저장합니다. 압축률은 데이터의 로그 형식, 구조 및 중복성에 따라 다릅니다.

| 메트릭 | 일반적인 범위 |
|--------|---------------|
| **압축률** | 5배~8배(원시 입력 데이터 대비 저장 크기) |
| **수집된 일일 TB당 스토리지 사용량** | 객체 스토리지에서 일일 125~200GB |

객체 스토리지 요구 사항을 추정하려면 다음과 같이 하세요.

$$\\text\"일일 저장 데이터\" = {\\text\"일일 볼륨\"} / {\\text\"압축률\"}$$

$$\\text\"총 스토리지\" = \\text\"일일 저장 데이터\" × \\text\"보존 기간(일)\"$$

{{% collapse-content title="예: 30일 보존 기간으로 일일 10TB 저장 시 스토리지" level="h4" expanded=false %}}
압축률을 6배로 가정할 경우:

1. **일일 저장량:** `10 TB / 6 ≈ 1.67 TB/day`
2. **30일 총합:** `1.67 TB × 30 ≈ 50 TB`

활성 데이터에는 표준 계층 객체 스토리지(예: S3 Standard, GCS Standard)를 사용하세요. S3 Infrequent Access나 GCS Nearline과 같은 저비용 계층은 BYOC Logs와 함께 사용하도록 검증되지 않았습니다.
{{% /collapse-content %}}

## PostgreSQL 데이터베이스 {#postgresql-database}

- **인스턴스 사이즈:** 대부분의 경우 vCPU 1개와 4GB RAM이 있는 PostgreSQL 인스턴스면 충분합니다.
- **AWS RDS 권장 사항:** AWS RDS를 사용하는 경우 `t4g.medium` 인스턴스 유형을 초기 구성으로 사용하는 것이 적절합니다.
- **고가용성:** 고가용성을 위해 대기 복제본 1개를 포함한 Multi-AZ 배포를 활성화하세요.

## Helm 차트 크기 조정 계층 {#helm-chart-sizing-tiers}

BYOC 로그 Helm 차트는 `indexer.podSize` 및 `searcher.podSize` 파라미터를 통해 사전 정의된 리소스 계층을 제공합니다. `podSize`는 포드의 리소스 요구 사항과 관련된 Quickwit 튜닝 파라미터를 선택합니다. 기본 `podSize`는 두 구성 요소 모두에 대해 `xlarge`입니다. 각 사전 설정은 일치하는 노드에 Kubernetes 시스템 구성 요소, DaemonSet 및 애드온을 위한 공간을 남겨두도록 설계되었습니다.

이러한 사전 설정에는 Kubernetes 시스템 구성 요소를 위해 예약된 리소스가 반영되어 있습니다. 예약량은 [GKE 노드 예약 계산](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations)을 기준으로 합니다. 또한 노드마다 DaemonSet 및 애드온을 위해 추가로 250m CPU 및 512Mi 메모리가 예약됩니다.

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```

| `podSize` | 명목상 CPU 요청량 | 실제 CPU 요청량 | 명목상 메모리 요청량/상한 | 실제 메모리 요청량/상한 |
|---|---:|---:|---:|---:|
| `large` | 2 | 1600m | 8Gi | 5700Mi |
| `xlarge` | 4 | 3600m | 16Gi | 13100Mi |
| `2xlarge` | 8 | 7600m | 32Gi | 28500Mi |
| `4xlarge` | 16 | 15600m | 64Gi | 59300Mi |
| `6xlarge` | 24 | 23600m | 96Gi | 90100Mi |
| `8xlarge` | 32 | 31600m | 128Gi | 120900Mi |

사전 설정은 CPU 상한을 지정하지 않으므로, 포드가 제한 없이 스로틀링 없이 노드의 유휴 CPU를 사용할 수 있습니다. 메모리 사용량이 노드의 할당 가능 용량을 초과하지 않도록 메모리 요청량과 상한을 동일하게 설정합니다.

선택한 등급에 맞는 수집 대기열 크기와 검색 캐시 크기 값이 자동으로 적용됩니다. 전체 구성은 [Helm 차트 크기 조정 맵][1]을 참조하세요. 각 파라미터에 대한 자세한 내용은 Quickwit 설명서의 [인덱서 파라미터][2], [수집 API 파라미터][3] 및 [검색기 파라미터][4]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[3]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[4]: https://quickwit.io/docs/configuration/node-config#searcher-configuration