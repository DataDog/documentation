---
further_reading:
- link: /serverless/configuration/#migrate-to-the-datadog-lambda-extension
  tag: 설명서
  text: Datadog Lambda 확장으로 이전
title: Datadog Lambda 확장으로 이전 결정
---

## Datadog Lambda 확장으로 이전해야 하나요?

AWS Lambda 확장은 Lambda 함수 코드와 함께 Lambda 실행 환경 내에서 실행됩니다. Datadog은 커스텀 메트릭, 강화된 메트릭, 트레이스, 로그를 제출하는 Datadog 에이전트의  경량 버전인 [Datadog Lambda 확장][1]을 생성하기 위해 AWS와 제휴를 맺었습니다. 

Datadog Lambda 확장이 도입되기 전에 [Datadog 서버리스][2]를 구성한 경우 [Datadog 포워더][3]를 사용하여 커스텀 메트릭, 강화된 메트릭, 트레이스 및 로그를 제출할 수 있습니다.

Lambda 확장과 포워더 사이에는 몇 가지 중요한 차이점이 있습니다. 이 페이지에서는 포워더에서 Lambda 확장으로  이전을 선택하거나 선택하지 않을 수 있는 다양한 이유에 대해 설명합니다.

### 기능 차이

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="AWS 서버리스 애플리케이션 계측" style="width:100%;">}}

Lambda 함수에서 텔레메트리를 수집하는 권장 방법으로 Lambda 확장이 포워더를 대체하지만, 포워더는 메타데이터를 수집하여 다른 AWS 서비스 로그 (API Gateway, AppSync 및 Lambda@Edge의 로그 포함)에 추가하는 데 필요합니다.

### 장점

Datadog Lambda 확장은 Datadog 포워더와 달리 다음과 같은 장점을 제공합니다:

- **CloudWatch 로그 건너뛰기**: 포워더는 로그에서 텔레메트리를 추출한 다음 Datadog으로 전송합니다. Datadog Lambda 확장은 텔레메트리를 Datadog으로 직접 전송하므로 CloudWatch 로그 및 포워더 Lambda 함수 자체와 관련된 비용을 절감할 수 있습니다.
- **간편한 설정**: Datadog Lambda 확장을 Lambda 레이어로 추가하여 텔레메트리를 직접 Datadog으로 전송할 수 있으므로 모든 새로운 Lambda 함수의 CloudWatch 로그 그룹에 대해 구독 필터를 설정할 필요가 없습니다.

### 트레이드 오프

확장은 콜드 스타트시 확장을 로딩하고 Datadog에 텔레메트리를 플러시하기 때문에 [Lambda 함수에 오버헤드를 추가합니다][4]. 추가된 대부분의 기간은 함수의 성능에 영향을 주지 **않습니다**. Datadog의 최신 벤치마킹 결과에 따르면, 포워더에 비해 Lambda 확장을 사용할 때 비용 오버헤드가 항상 더 낮습니다.

### 결론

많은 Lambda 함수에서 로그만 수집하려는 경우에는 Datadog 포워더를 계속 사용하는 것이 좋습니다. Lambda 함수에서 메트릭과 트레이스도 수집하는 경우 Datadog Lambda 확장으로 이전하는 것을 권장합니다.

## Datadog Lambda 확장으로 이전

Datadog Forwarder에서 Datadog Lambda Extension으로 마이그레이션하려면 [서버리스 구성 문서][5]를 참조하세요.
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/libraries_integrations/extension/
[2]: /ko/serverless
[3]: /ko/logs/guide/forwarder/
[4]: /ko/serverless/libraries_integrations/extension/#overhead
[5]: /ko/serverless/configuration/#migrate-to-the-datadog-lambda-extension