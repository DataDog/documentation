---
aliases:
- /ko/cloudprem/configure/cluster_sizing/
description: CloudPrem의 클러스터 크기 조정에 대해 알아보세요.
further_reading:
- link: /cloudprem/configure/ingress/
  tag: 설명서
  text: CloudPrem Ingress 구성하기
- link: /cloudprem/configure/pipelines/
  tag: 설명서
  text: CloudPrem Log Processing 구성하기
- link: /cloudprem/introduction/architecture/
  tag: 설명서
  text: CloudPrem Architecture란?
title: 클러스터 크기 조정
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

적절한 클러스터 크기 조정은 CloudPrem 배포 환경에서 최적의 성능, 비용 효율성, 안정성을 보장합니다. 크기 조정 요구 사항은 로그 수집 볼륨, 쿼리 패턴, 로그 데이터의 복잡성 등 여러 요소에 따라 달라집니다.

이 가이드는 CloudPrem 클러스터 구성 요소(인덱서, 검색기, 지원 서비스 및 PostgreSQL 데이터베이스)의 크기를 조정하기 위한 기본 권장 사항을 제공합니다.

<div class="alert alert-tip">
예상되는 일일 로그 볼륨과 최대 데이터 수집 속도를 시작점으로 삼고, 클러스터 성능을 모니터링하면서 필요에 따라 크기를 조정하세요.
</div>

## 인덱서

인덱서는 Datadog Agents로부터 로그를 수신한 후 처리, 인덱싱하여 객체 스토리지에 인덱스 파일(_splits_라고 함)로 저장합니다. 적절한 크기 조정은 수집 처리량을 유지하고 클러스터가 로그 볼륨을 처리할 수 있도록 하는 데 매우 중요합니다.

| 사양 | 추천 | 참고 |
|---------------|----------------|-------|
| **Performance** | vCPU당 5MB/s | 초기 크기 결정을 위한 기준 처리량. 실제 성능은 로그 특성(크기, 속성 수, 중첩 수준)에 따라 달라집니다. |
| **메모리** | vCPU당 4GB RAM | |
| **최소 포드 크기** | vCPU 2개, 8GB RAM | 인덱서 포드 최소 권장 사양 |
| **저장 용량** | 최소 200GB | 인덱스 파일 생성 및 병합 중에 임시 데이터 저장에 필요 |
| **저장 유형** | 로컬 SSD(권장) | 로컬 HDD 또는 네트워크 연결 블록 스토리지(Amazon EBS, Azure Managed Disks)도 사용 가능 |
| **Disk I/O** | vCPU당 약 20MB/s | Amazon EBS의 경우 vCPU당 320 IOPS에 해당(64KB IOPS 가정). |


{{% collapse-content title="예시: 하루 1TB 로그 크기 조정" level="h4" expanded=false %}}
하루에 1TB(약 11.6MB/s)의 로그를 인덱싱하려면 다음 단계를 따르세요.

1. **vCPU 계산:** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **RAM 계산:** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **여유 공간 확보:** **3개의 vCPU, 12GB RAM, 200GB 디스크**로 구성된 인덱서 포드로 시작하세요. 성능 관찰 결과와 중복성 요구 사항에 따라 이 값을 조정하세요.
{{% /collapse-content %}}

## 검색자

검색기는 Datadog UI에서 검색 쿼리를 처리하며, Metastore에서 메타데이터를 읽고 객체 스토리지에서 데이터를 가져옵니다.

일반적인 시작점은 인덱서에 할당된 총 vCPU 수의 대략 두 배에 해당하는 리소스를 프로비저닝하는 것입니다.

- **성능:** 검색 성능은 작업 부하(쿼리 복잡성, 동시성, 스캔하는 데이터 양)에 크게 좌우됩니다. 예를 들어, 용어 쿼리(`status:error AND message:exception`)는 일반적으로 집계 쿼리보다 계산 비용이 적게 듭니다.
- **메모리:** 검색기 vCPU당 4GB의 RAM이 필요합니다. 동시 집계 요청이 많을 것으로 예상되면 더 많은 RAM을 할당하세요.

## 기타 서비스

이러한 경량 구성 요소에 다음 리소스를 할당하세요.

| 서비스 | vCPUs | RAM | 복제본 |
|---------|-------|-----|----------|
| **Control Plane** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4GB | 2 |
| **Janitor** | 2 | 4GB | 1 |

## PostgreSQL 데이터베이스

- **인스턴스 사이즈:** 대부분의 경우 vCPU 1개와 RAM 4GB가 있는 PostgreSQL 인스턴스면 충분합니다.
- **AWS RDS 권장 사항:** AWS RDS를 사용하는 경우 `t4g.medium` 인스턴스 유형이 시작하기에 좋습니다.
- **고가용성:** 고가용성을 위해 대기 복제본 1개를 포함한 Multi-AZ 배포를 활성화하세요.

## Helm 차트 사이즈 티어

CloudPrem Helm 차트는 `indexer.podSize` 및 `searcher.podSize` 파라미터를 통해 미리 정의된 크기 조정 티어를 제공합니다. 각 티어는 포드의 vCPU 및 메모리 리소스 제한을 설정하고 구성 요소별 설정을 자동으로 구성합니다.

| 크기 | vCPUs | 메모리 |
|------|-------|--------|
| medium | 1 | 4GB |
| large | 2 | 8GB |
| xlarge | 4 | 16GB |
| 2xlarge | 8 | 32GB |
| 4xlarge | 16 | 64GB |
| 6xlarge | 24 | 96GB |
| 8xlarge | 32 | 128GB |

{{% collapse-content title="티어별 인덱서 구성" level="h4" expanded=false %}}

Helm 차트에서 `indexer.podSize`를 설정할 때 다음 값이 자동으로 적용됩니다. 각 파라미터에 대한 자세한 내용은 [Quickwit Indexer 구성][1]을 참고하세요.

| 크기 | split_store_max_num_bytes | split_store_max_num_splits |
|------|---------------------------|----------------------------|
| medium | 200G | 10000 |
| large | 200G | 10000 |
| xlarge | 200G | 10000 |
| 2xlarge | 200G | 10000 |
| 4xlarge | 200G | 10000 |
| 6xlarge | 200G | 10000 |
| 8xlarge | 200G | 10000 |

{{% /collapse-content %}}

{{% collapse-content title="티어별 수집 API 구성" level="h4" expanded=false %}}

Helm 차트에서 `indexer.podSize`를 설정할 때 다음 값이 자동으로 적용됩니다. 각 파라미터에 대한 자세한 내용은 [Quickwit Ingest API 구성][2]을 참고하세요.

| 크기 | max_queue_memory_usage | max_queue_disk_usage |
|------|------------------------|----------------------|
| medium | 2GiB | 4GiB |
| large | 4GiB | 8GiB |
| xlarge | 8GiB | 16GiB |
| 2xlarge | 16GiB | 32GiB |
| 4xlarge | 32GiB | 64GiB |
| 6xlarge | 48GiB | 96GiB |
| 8xlarge | 64GiB | 128GiB |

{{% /collapse-content %}}

{{% collapse-content title="티어별 검색기 구성" level="h4" expanded=false %}}

Helm 차트에서 `searcher.podSize`를 설정할 때 다음 값이 검색기 구성에 자동으로 적용됩니다. 각 파라미터에 대한 자세한 내용은 [Quickwit Searcher 구성][3]을 참고하세요.

| 크기 | fast_field_cache_capacity | split_footer_cache_capacity | partial_request_cache_capacity | max_num_concurrent_split_searches | aggregation_memory_limit |
|------|---------------------------|-----------------------------|-------------------------------|-----------------------------------|--------------------------|
| medium | 1GiB | 500MiB | 64MiB | 2 | 500MiB |
| large | 2GiB | 1GiB | 128MiB | 4 | 1GiB |
| xlarge | 4GiB | 2GiB | 256MiB | 8 | 2GiB |
| 2xlarge | 8GiB | 4GiB | 512MiB | 16 | 4GiB |
| 4xlarge | 16GiB | 8GiB | 1GiB | 32 | 8GiB |
| 6xlarge | 24GiB | 12GiB | 1536MiB | 48 | 12GiB |
| 8xlarge | 32GiB | 16GiB | 2GiB | 64 | 16GiB |

{{% /collapse-content %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[2]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[3]: https://quickwit.io/docs/configuration/node-config#searcher-configuration