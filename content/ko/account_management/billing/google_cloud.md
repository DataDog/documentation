---
title: Google Cloud 통합 빌링
---

## 개요

Datadog에서는 Datadog 에이전트를 실행하는 호스트와 Google Cloud에서 가져온 모든 GCE 인스턴스 통합에 대해 청구합니다. [Dataflow][6]와 같은 GCE 외 서비스는 Datadog에서 청구 가능한 GCE 호스트를 생성할 수 있습니다. Google Cloud 통합에서 픽업한 GCE 인스턴스에서 에이전트를 실행하는 경우 이중 청구되지 않습니다.

기타 Google Cloud 리소스(CloudSQL, Google App Engine, Pub/Sub 등)는 월간 빌 에 포함되지 않습니다. 어떤 호스트가 청구되는지 확인하려면 Google Cloud 콘솔의 GCE 페이지로 이동하여 실행 중인 호스트의 목록을 확인합니다. 태그에서 [Google Cloud 메트릭 제외](#google-cloud-metric-exclusion)를 통해 제외하지 않는 한, 이 페이지에 나열된 호스트는 Datadog로 데이터를 전송하며 호스트로 청구됩니다.

## Google Cloud 메트릭 제외

[Google 클라우드 통합 타일][1]를 사용하여 메트릭 컬렉션을 제어합니다. **설정** 탭 으로 이동하여 프로젝트를 선택하거나 새 프로젝트를 추가합니다. 각 프로젝트는 [호스팅 태그][2]를 설정하여 **선택적으로 메트릭 컬렉션을 호스트로 제한하여 제어합니다**.

{{< img src="account_management/billing/google_cloud_metric_filter.png" alt="일반 탭에서 Datadog에 있는 Google Cloud 페이지와 강조 표시된 메트릭 수집 제한 옵션" >}}

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