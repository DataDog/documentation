---
title: Google Cloud 통합 빌링
---

## 개요

Datadog은 Agent를 실행하는 호스트와 Google Cloud 통합에서 선택한 모든 GCE 인스턴스에 대해 요금을 청구합니다. [Dataflow][6]와 같은 GCE 외부 서비스는 Datadog에서 청구 가능한 GCE 호스트를 생성할 수 있습니다. Google Cloud 통합으로 선택한 GCE 인스턴스에서 Agent를 실행하는 경우 요금이 두 번 청구되지 않습니다.

기타 Google Cloud 리소스(CloudSQL, Google App Engine, Pub/Sub 등)는 월별 결제에 포함되지 않습니다. 요금이 청구되는 호스트를 확인하려면 Google Cloud 콘솔의 GCE 페이지로 이동하여 실행 중인 호스트 목록을 확인하세요. [Google Cloud 메트릭 제외](#google-cloud-metric-exclusion) 태그를 포함하여 제외되지 않는 한 이 페이지에 나열된 호스트는 Datadog에 데이터를 전송하며 호스트로 요금이 청구됩니다.

## Google Cloud 메트릭 제외

[Google Cloud 통합 타일][1]을 사용해 메트릭 수집을 관리할 수 있습니다. Configuration 탭으로 이동하여 프로젝트를 선택하거나 새 프로젝트를 추가하세요. 각 프로젝트는 Optionally Limit Metrics Collection to hosts with tag 설정을 기반으로 관리됩니다. [호스트 태그][2]로 메트릭을 제한하는 예시는 다음과 같습니다.

{{< img src="account_management/billing/google_cloud_metric_filter.png" alt="메트릭 수집을 제한하는 옵션이 강조 표시된 Datadog의 General 탭에 있는 Google Cloud 페이지" >}}

통합 타일에서 기존 Google Cloud에 제한을 추가할 때 이전에 탐지된 인스턴스는 [인프라스트럭처 목록][3]에 최대 2시간 동안 표시됩니다. 이전(트랜지션) 동안에는 인스턴스의 상태가 `???`로 표시됩니다. 이는 요금 청구 대상으로 간주되지 않습니다.

Agent가 실행되는 호스트는 계속 표시되며 요금 청구 대상에 포함됩니다. 한도 옵션은 Agent가 실행되지 않는 GCE 인스턴스에만 적용됩니다.

## 트러블슈팅

기술적 지원이 필요하신 경우 [Datadog 지원팀][4]에 문의해주세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][5] 매니저와 상의하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[2]: /ko/getting_started/tagging/using_tags/#integrations
[3]: /ko/infrastructure/
[4]: /ko/help/
[5]: mailto:success@datadoghq.com
[6]: https://cloud.google.com/dataflow