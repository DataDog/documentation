---
aliases:
- /ko/serverless/serverless_tagging/
- /ko/serverless/troubleshooting/serverless_tagging/
further_reading:
- link: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
  tag: 설명서
  text: 통합 서비스 태깅
title: 서버리스 태깅
---

{{< img src="serverless/serverless_tagging.mp4" video="true" alt="통합된 서버리스 태깅" >}}

## 개요

AWS Lambda 함수에 적용되는 태그는 자동으로 메트릭, 트레이스 및 로그를 필터링하고 그룹화할 수 있는 새로운 범위가 됩니다.

태그는 Datadog 플랫폼 전체에서 일관성을 유지할 때 특히 강력합니다. 다음 태그를 최우선으로 지원합니다: `env`,`service`,`version`.

이러한 태그를 사용하면 다음과 같이 할 수 있습니다:

- 일관된 태그를 사용하여 메트릭, 트레이스 및 로그를 원활하게 탐색
- 서버리스 홈페이지에서 함수 필터링
- Datadog 앱 내의 통합된 방식에서 환경 또는 버전에 따라 서비스 데이터 보기
- 서비스 및 환경별로 서비스 맵 구성

서버리스 애플리케이션에 `env`,`service`,`version` 태그를 지정하려면 [통합 서비스 태깅 설명서][1]를 참조하세요.

**참고**: Lambda 함수 이름은 [Datadog의 태깅 규칙][2]을 준수해야 합니다. 이렇게 하면 함수의 모든 트레이스, 로그, 메트릭을 원활하게 연결할 수 있습니다.

### env 태그

스테이징, 개발 및 프로덕션 환경을 분리하기 위해 `env`를 사용합니다. 이것은 서버리스 함수 뿐만 아니라 모든 종류의 인프라스트럭처에 적용됩니다. 예를 들어, 프로덕션 EU  Lambda 함수에 `env:prod-eu` 태그를 지정할 수 있습니다.

기본적으로 Datadog에서 AWS Lambda 함수는 `env:none` 태그로 지정됩니다. 이를 재정의하려면 사용자의 태그를 추가하세요.

### 서비스 태그

관련 Lambda 함수를 서비스로 그룹화하려면 `service` 태그를 추가합니다. 

신규 Datadog 고객이 기본적으로 해야 하는 것은 Lambda 함수를 `aws.lambda` 서비스 아래 그룹화하고 서비스 맵에 단일 노드로 표시하는 것입니다. 서비스별로 함수에 태그를 지정하여 이 함수를 재정의합니다.

**참고:** 일부 Datadog 고객에게는 각 Lambda 함수가 자체 서비스로 처리됩니다. 자체 태그를 추가하여 이를 재정의하거나, Datadog 지원팀에 문의하여 계정에 새 동작을 적용하세요.

### 버전 태그

`version` 태그를 추가하여 [디플로이먼트 추적][3]을 활성화합니다.

## 서비스 맵 구성

[서비스 맵][4]은 서비스를 `env` 태그별로 맵으로 그룹화하고 `service` 태그를 사용하여 서비스와 모니터 상태 간의 관계를 보여줍니다. 서비스는 서비스 맵에서 개별 노드로 표시됩니다. 노드의 색상은 연결된 모니터의 상태를 나타냅니다. 연결할 태그의 모니터에 동일하게 `service` 태그를 지정합니다.

{{< img src="serverless/serverless_service_map.png" alt="서비스 맵" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[2]: /ko/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[3]: /ko/tracing/deployment_tracking/
[4]: /ko/tracing/visualization/services_map/