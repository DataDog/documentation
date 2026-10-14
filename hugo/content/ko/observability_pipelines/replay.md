---
aliases:
- /ko/observability_pipelines/rehydration/
description: Replay를 사용하여 아카이브된 로그를 가져오고 Observability Pipelines에서 처리하는 방법에 대해 알아보세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/
  tag: 설명서
  text: 프로세서에 대해 자세히 알아보기
- link: /observability_pipelines/packs/
  tag: 설명서
  text: Packs에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: 블로그
  text: Observability Pipelines를 사용하여 모든 SIEM 또는 로깅 공급업체에서 아카이브된 로그를 리하이드레이션하기
title: Replay
---
## 개요 {#overview}

Observability Pipelines용 Replay를 사용하면 객체 스토리지에서 아카이브된 로그를 가져와 [팩][1]을 포함한 Observability Pipelines에서 처리할 수 있습니다. 이를 통해 워크플로를 다시 빌드하거나 수집 파이프라인을 수정할 필요 없이 과거 컨텍스트에 일관되게 액세스할 수 있습니다.

조직은 비용을 관리하고 규정 준수 요구 사항을 충족하기 위해 대량의 로그를 비용 효율적인 장기 아카이브에 저장하는 경우가 많습니다. 그러나 보안 인시던트, 감사 요청 또는 운영 조사가 발생하면 과거 데이터에 액세스하기 어려운 경우가 많습니다. 콜드 스토리지에서 아카이브된 로그를 검색하는 작업은 느리고 수동적이며 번거로울 수 있으며, 임시 스크립트, 압축 해제 또는 전담 엔지니어링 노력이 필요합니다. Observability Pipelines용 Replay는 이러한 문제를 해결합니다.

{{< img src="observability_pipelines/replay_pipeline.png" alt="Amazon S3 Replay 소스가 포함된 파이프라인입니다." style="width:100%;" >}}

## Replay 작동 방식 {#how-replay-works}

Replay는 Amazon S3, Google Cloud Storage, Azure Blob Storage와 같은 객체 저장소에 저장된 아카이브된 로그를 검색하고 재처리하기 위한 자동화된 워크플로를 제공합니다. 이를 통해 스토리지 효율성과 과거 데이터에 대한 빠른 액세스 간의 균형을 유지할 수 있습니다.

Replay를 사용하면 다음을 수행할 수 있습니다.

### 요청 시 아카이브된 로그 검색 {#retrieve-archived-logs-on-demand}

조사, 감사, 문제 해결 또는 파이프라인 테스트에 필요한 데이터만 가져와 긴 검색 지연 시간과 수동 추출 단계를 제거하세요.

### 특정 시간 범위 또는 이벤트 슬라이스 지정 {#target-specific-time-ranges-or-event-slices}

데이터를 불필요하게 이동하거나 처리하지 않도록 필요한 정확한 시간 범위 또는 이벤트 하위 집합을 지정하세요.

### Observability Pipelines를 사용하여 과거 로그 처리 {#process-historical-logs-with-observability-pipelines}

재생된 로그는 실시간 로그 스트림에 적용되는 것과 동일한 구문 분석, 보강, 정규화 및 라우팅 로직을 거칩니다.

이를 통해 다음을 보장합니다.

- 일관된 형식 지정 및 필드 추출
- 안정적인 보강(예: 사용자, 지리적 IP 및 클라우드 메타데이터)
- 통일된 보안 및 규정 준수 제어
- 과거 데이터와 실시간 데이터 간의 동일한 동작

### 지원되는 모든 대상으로 재생된 데이터 라우팅 {#route-replayed-data-to-any-supported-destination}

처리된 과거 로그를 SIEM, 데이터 레이크, 분석 플랫폼 또는 모든 Observability Pipelines 대상으로 보낼 수 있습니다.

### 수동 처리 제거 {#eliminate-manual-handling}

Replay는 아카이브된 데이터를 관찰 가능성 플랫폼으로 다시 가져오는 구조적이고 예측 가능한 방법을 제공하므로, 사용자 지정 스크립트, 수동 압축 해제 또는 임시 검색 프로세스를 사용할 필요가 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/packs/