---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: 설명서
  text: 파이프라인 설정
- link: /observability_pipelines/processors/
  tag: 설명서
  text: Observability Pipelines 프로세서
title: 로그 볼륨 감소 전략
---

## 개요

Observability Pipelines으로 데이터를 온프레미스 또는 클라우드 환경에서 내보내기 전에 로그를 수집 및 처리하고 라우팅할 위치를 결정할 수 있습니다.

로그의 가치는 전부 동일하지 않습니다. 예를 들어, 실시간 작업 문제를 해결할 때는 정보 로그보다 오류 로그가 더 유용한 경우가 많습니다. 아울러, 프로덕션 환경의 로그는 비프로덕션 환경의 로그보다 더 중요합니다. 따라서, 모든 로그를 인덱싱 솔루션으로 라우팅하면 데이터의 전체 가치가 감소하고 예산을 초과할 수 있습니다.

다음과 같은 상황에서도 로그 볼륨과 비용이 불필요하게 증가할 수 있습니다.

- 애플리케이션 팀이 실수로 디버그 로깅을 활성화한 경우.
- 오류 루프 조건이 포함된 새 빌드를 배포하여 오류가 대량으로 트리거된 경우.
- 다른 텔레메트리 솔루션을 구현하는 것보다 쉬워 보이기 때문에 팀이 최대한 성능 및 메트릭 데이터를 많이 로그에 추가하려고 시도한 경우.
- 로그에 사용되지 않는 추가 필드와 값이 포함되어 있는 경우.

본 지침에서는 Observability Pipelines 프로세서를 활용하여 로그 볼륨을 줄이는 방법을 알아봅니다. 비용을 준수하고 저장된 데이터의 가치를 높일 수 있는 전략을 안내합니다.

## 로그 볼륨 감소 전략

다음 전략에 따라 로그 볼륨을 줄입니다.

### 로그 샘플링

반복적이거나 노이즈가 많거나 중요도가 낮은 대용량 로그의 일정 비율을 삭제하여 전체 로그의 볼륨을 줄입니다. [Sample processor][1]를 활용하여 필터 쿼리를 기준으로 로그 하위 집합을 매칭하고 지정한 로그의 비율만 유지합니다. 이렇게 하면 가시성과 분석 기능을 유지하면서 대량의 로그 스트림을 전반적으로 확인할 수 있습니다.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/sample_example.png" alt="필터 쿼리 http.status_code:200 및 http.method:GET과 매칭되는 로그의 50%를 유지하는 샘플링 프로세서" style="width:100%;" >}}

### 로그 필터링

모든 로그가 중요하며 보관해야 하는 것은 아닙니다. 예를 들어, 조직에게 비프로덕션 시스템의 디버그 로그를 보관하는 것은 크게 중요하지 않을 수 있습니다. 그러므로 [Filter processor][2]를 활용하여 이러한 로그를 삭제해 관리 솔루션으로 전송되지 않도록 하세요.

### 로그의 속성 삭제

로그에는 수백 개의 속성이 포함될 수 있으며, 조사 및 분석에 사용되는 속성은 소수에 불과한 경우가 많습니다. [Edit fields][3] 프로세서를 활용하여 사용하지 않거나 쓸모없는 속성을 삭제해 로그의 전체 크기를 줄이면 로그 수집 비용을 줄일 수 있습니다.

### 로그 줄이기

시스템은 초당 수백 개, 많게는 초당 추천 개의 로그를 생성할 수 있습니다. 연결, 합산, 값 어레이 생성하기 등의 다양한 전략을 활용하여 필드를 병합해 해당 로그를 단일 이벤트로 축소합니다. [축소 프로세서][4]를 활용하여 선택한 병합 전략에 따라 여러 개의 로그 이벤트를 하나의 이벤트로 축소하세요. 이렇게 하면 대상에게 전송되는 총 이벤트 수가 줄어듭니다.

### 로그 중복 제거

로그 중복을 제거하면 데이터의 정확성과 일관성을 유지하면서도 로그가 중복되는 업스트림 실수를 방지할 수 있습니다. [Deduplication processor][5]를 사용하여 필드를 비교하고 동일한 콘텐츠가 있는지 확인한 후, 중복된 항목을 삭제해 총 로그 볼륨을 줄이세요.

### 쿼터 구현

쿼터로 다양한 수준에서 로그를 관리 및 제어할 수 있습니다. 예를 들어, 세분화 수준에서 특정 애플리케이션 로그(`app:xyz`)에 쿼터 제한을 적용하거나, 더 상위 수준에서 정보 로그(`status:info`)에 제한을 적용할 수 있습니다. 이렇게 하면 예산 및 사용량 요건을 충족하는 데 도움이 됩니다.

[쿼터 프로세서][6]로 다음 작업을 할 수 있습니다.
1. 관심이 있는 로그의 필터를 정의합니다. 환경 등의 상위 수준이나 특정 팀 등 보다 세분화된 수준에서 로그를 필터링할 수 있습니다. 로그 속성을 조합하여 필터링할 수도 있습니다.
1. 바이트 수나 이벤트 수를 기준으로 쿼터를 정의합니다. 쿼터가 초과된 후 수신한 로그를 삭제하거나, 이를 조사하고 문제를 해결할 수 있도록 한도에 도달했다는 알림만을 받을 수도 있습니다.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/quota_example.png" alt="http.status_code:200 필터 쿼리가 적용되고 일당 1 TB 한도가 설정된 쿼터 프로세서" style="width:100%;" >}}

### 로그를 아카이브로 직접 라우팅하기

로그를 Datadog-rehydratable 형식으로 자체 클라우드 스토리지(Amazon S3, Google Cloud Storage 또는 Azure Storage)로 직접 라우팅합니다. 그런 다음 필요 시마다 아카이브를 Datadog으로 리하이드레이션할 수 있습니다. 자세한 내용은 [아카이브 로그][7]를 참조하세요.

## 로그 볼륨 감소 전략에 적합한 대상

사용자는 위의 전략을 구현하여 전체 로그 볼륨을 줄였습니다. 다음은 로그 감소 전략을 적용하기에 적합한 로그 소스 예시 목록입니다.

- CDN
- VPC 및 네트워크 플로
- 웹 서버 활동
- 로드 밸런서
- CI/CD 서비스
- 컨트롤 플레인
- 서비스 메시
- 방화벽
- 네트워크 어플라이언스
- DNS
- Debug 로그
- 감사 로그
- 비프로덕션 환경 로그

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/processors/sample
[2]: /ko/observability_pipelines/processors/filter
[3]: /ko/observability_pipelines/processors/edit_fields
[4]: /ko/observability_pipelines/processors/reduce
[5]: /ko/observability_pipelines/processors/dedupe
[6]: /ko/observability_pipelines/processors/quota
[7]:  /ko/observability_pipelines/set_up_pipelines/archive_logs