---
description: 'Observability Pipelines 프로세서를 사용하여 로그 볼륨을 줄이기 위한 전략(예: 샘플링 및 로그 필터링)을
  알아보세요.'
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: 설명서
  text: 파이프라인 설정
- link: /observability_pipelines/processors/
  tag: 설명서
  text: Observability Pipelines 프로세서
title: 로그 볼륨 축소 전략
---
## 개요 {#overview}

Observability Pipelines를 사용하면 데이터가 온프레미스 또는 클라우드 환경을 떠나기 전에 로그를 수집 및 처리하고 라우팅할 위치를 결정할 수 있습니다.

모든 로그가 동일한 가치를 지니는 것은 아닙니다. 예를 들어, 운영 중인 시스템의 문제를 해결할 때는 정보 로그보다 오류 로그가 더 유용한 경우가 많습니다. 프로덕션 환경의 로그는 비프로덕션 환경의 로그보다 더 중요합니다. 따라서 모든 로그를 인덱싱된 솔루션으로 라우팅하면 데이터의 전반적인 가치가 희석되고 예산을 초과할 수 있습니다.

다음 상황에서도 불필요하게 로그 볼륨과 비용이 증가할 수 있습니다.

- 애플리케이션 팀이 실수로 디버그 로깅을 활성화합니다.
- 오류를 대량으로 트리거하는 오류 루프 조건이 포함된 새 빌드를 배포합니다.
- 팀에서 다른 텔레메트리 솔루션을 구현하는 것보다 쉬워 보인다는 이유로 로그에 최대한 많은 성능 및 메트릭 데이터를 추가하려고 합니다.
- 로그에 사용되지 않는 불필요한 필드와 값이 포함되어 있습니다.

이 가이드는 Observability Pipelines 프로세서를 사용하여 로그 볼륨을 줄이는 전략을 안내하며, 이를 통해 비용 관련 규정을 준수하고 저장된 데이터의 가치를 높일 수 있습니다.

## 로그 볼륨 축소 전략 {#strategies-for-reducing-your-log-volume}

다음 전략에 따라 로그 볼륨을 줄이세요.

### 로그 샘플링 {#sample-your-logs}

반복적이거나 노이즈가 많거나 가치가 낮은 것으로 알려진 대량의 로그 중 일부를 제외하여 전체 로그 볼륨을 줄이세요. [sample 프로세서][1]를 사용하여 필터 쿼리를 기준으로 로그의 하위 집합을 일치시키고 지정한 비율의 로그만 유지하세요. 이를 통해 가시성과 분석 기능을 유지하면서 대량 로그 스트림의 전반적인 특성을 파악할 수 있습니다.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/sample_example.png" alt="http.status_code:200 및 http.method:GET 필터 쿼리와 일치하는 로그의 50%를 유지하는 샘플 프로세서" style="width:100%;" >}}

### 로그 필터링 {#filter-your-logs}

모든 로그가 가치 있거나 저장할 필요가 있는 것은 아닙니다. 예를 들어, 비프로덕션 시스템의 디버그 로그를 보관하는 것은 조직에 그다지 중요하지 않을 수 있습니다. 따라서 [filter 프로세서][2]를 사용하여 해당 로그를 제외함으로써 로그 관리 솔루션으로 전송되지 않도록 하세요.

### 로그에서 속성 삭제 {#drop-attributes-in-your-logs}

로그에는 수백 개의 속성이 포함될 수 있으며, 조사 및 분석에는 소수의 속성만 사용되는 경우가 많습니다. [edit fields][3] 프로세서를 사용하여 사용하지 않거나 유용하지 않은 속성을 삭제함으로써 로그의 전체 크기를 줄이고 로그 수집 비용을 절감하세요.

### 로그 축소 {#reduce-your-logs}

시스템은 초당 수백 개에서 수천 개의 로그를 생성할 수 있습니다. 연결, 합산, 값 배열 생성 등의 다양한 전략을 사용하여 필드를 병합함으로써 이러한 로그를 단일 이벤트로 축소하세요. [reduce processor][4]를 사용하여 선택한 병합 전략에 따라 여러 로그 이벤트를 하나의 이벤트로 축소하세요. 이를 통해 대상 시스템으로 전송되는 총 이벤트 수를 줄일 수 있습니다.

### 로그 중복 제거 {#deduplicate-your-logs}

로그 중복을 제거하면 데이터의 정확성과 일관성을 유지하고 로그가 실수로 중복되는 업스트림 오류를 방지하는 데 도움이 됩니다. [deduplication processor][5]를 사용하여 필드를 비교하고 동일한 콘텐츠가 있는지 확인한 후 중복 항목을 제거하여 전체 로그 볼륨을 줄이세요.

### 할당량 구현 {#implement-quotas}

할당량을 사용하여 다양한 수준에서 로그를 관리하고 제어하세요. 예를 들어, 세부적인 수준에서 특정 애플리케이션 로그(`app:xyz`)에 할당량 제한을 적용하거나, 상위 수준에서 정보 로그(`status:info`)에 제한을 적용할 수 있습니다. 이를 통해 예산 및 사용량 요구 사항을 충족할 수 있습니다.

[quota processor][6]를 사용하여 다음 작업을 수행하세요.
1. 관심 있는 로그에 대한 필터를 정의합니다. 환경과 같은 상위 수준이나 특정 팀과 같은 세부적인 수준에서 로그를 필터링할 수 있습니다. 로그 속성을 조합하여 필터링할 수도 있습니다.
1. 바이트 수 또는 이벤트 수를 기준으로 할당량을 정의합니다. 할당량에 도달한 후 수신된 로그를 삭제하거나, 한도에 도달했다는 경보만 받아 문제를 조사하고 해결하도록 선택할 수 있습니다.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/quota_example.png" alt="http.status_code:200 필터 쿼리와 일일 1TB 제한이 설정된 할당량 프로세서" style="width:100%;" >}}

### 로그를 아카이브로 직접 라우팅 {#route-your-logs-directly-to-an-archive}

Datadog에서 재수화할 수 있는 형식으로 로그를 자체 클라우드 스토리지(Amazon S3, Google Cloud Storage 또는 Azure Storage)에 직접 라우팅하세요. 그런 다음 필요에 따라 아카이브를 Datadog으로 재수화할 수 있습니다. 자세한 내용은 [로그 아카이브][7]를 참조하세요.

## 로그 볼륨 축소 전략에 적합한 주요 대상{#strong-candidates-for-log-volume-reduction-strategies}

사용자들은 전체 로그 볼륨을 줄이기 위해 위의 전략을 구현했습니다. 다음 목록은 로그 볼륨 축소 전략을 적용하기에 적합한 로그 소스의 예시입니다.

- CDN
- VPC 및 네트워크 흐름
- 웹 서버 활동
- 로드 밸런서
- CI/CD 서비스
- 컨트롤 플레인
- 서비스 메시
- 방화벽
- 네트워크 어플라이언스
- DNS
- 디버그 로그
- 감사 로그
- 비운영 환경 로그

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/processors/sample
[2]: /ko/observability_pipelines/processors/filter
[3]: /ko/observability_pipelines/processors/edit_fields
[4]: /ko/observability_pipelines/processors/reduce
[5]: /ko/observability_pipelines/processors/dedupe
[6]: /ko/observability_pipelines/processors/quota
[7]: /ko/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs