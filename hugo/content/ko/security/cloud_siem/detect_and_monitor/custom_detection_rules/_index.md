---
aliases:
- /ko/security_platform/detection_rules/cloud_siem
- /ko/security_platform/detection_rules/security_monitoring
- /ko/security_platform/detection_rules/create_a_new_rule
- /ko/security_platform/cloud_siem/log_detection_rules/
- /ko/cloud_siem/detection_rules/security_monitoring/
- /ko/security/detection_rules/cloud_siem/
- /ko/security/detection_rules/security_monitoring
- /ko/security/detection_rules/create_a_new_rule
- /ko/security/cloud_siem/log_detection_rules/
- /ko/security/cloud_siem/detection_rules/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
  tag: 문서
  text: 사용자 지정 탐지 규칙 생성
- link: /cloud_siem/default_rules/
  tag: 문서
  text: 기본 Cloud SIEM 탐지 규칙 구성
- link: /cloud_siem/explorer/
  tag: 문서
  text: 보안 신호 탐색기 알아보기
- link: https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/
  tag: 블로그
  text: AWS 계정에서 승인되지 않은 제3자 탐지
- link: https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/
  tag: 블로그
  text: 이상 탐지 규칙으로 보안 위협 탐지
- link: /security/notifications/variables/
  tag: 문서
  text: 보안 알림 변수에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: 블로그
  text: Datadog Cloud SIEM으로 Cloudflare Zero Trust 모니터링
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM으로 1Password 모니터링
- link: https://www.datadoghq.com/blog/content-anomaly-detection-cloud-siem/
  tag: 블로그
  text: Cloud SIEM의 콘텐츠 이상 감지를 사용하여 급증 및 새로운 값 이외의 이상 탐지
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: 학습 센터
  text: 사용자 지정 Cloud SIEM 탐지 규칙 작성
title: 사용자 지정 탐지 규칙
type: documentation
---
## 개요 {#overview}

기본 제공 탐지 규칙은 대부분의 위협 시나리오를 다룰 수 있도록 지원할 뿐만 아니라 특정 사용 사례에 맞춰 사용자 지정 탐지 규칙을 생성할 수도 있습니다. 사용자 지정 규칙 생성 방법에 대한 지침은 [규칙 생성][1]을 참조하세요.

{{< img src="security/security_monitoring/detection_rules/custom_detection_rules_ui.png" alt="생성할 수 있는 탐지 유형 및 방법을 보여주는 규칙 생성 페이지" style="width:100%;" >}}

## 규칙 유형 {#rule-types}

다음 유형의 사용자 지정 탐지 규칙을 생성할 수 있습니다.

- 실시간 규칙: 들어오는 로그를 지속적으로 모니터링하고 분석합니다.
- 예약된 규칙: 로그 데이터를 분석하기 위해 미리 예약된 간격으로 실행됩니다.
- 과거 작업: 과거 로그에 대해 탐지를 실행하여 탐지를 백테스트합니다.

## 탐지 방법 {#detection-methods}

사용자 지정 탐지 규칙 또는 과거 작업을 생성할 때 다음 탐지 방법을 사용할 수 있습니다:

- 임계값: 임계값 초과(`a > N`) 또는 임계값 미만(`a < N` 또는 `a <= 0`) 케이스를 포함하여 쿼리 수가 지정된 케이스를 충족하는 경우를 탐지합니다.
- 새 값: 속성이 완전히 새로운 값으로 변경되는 경우를 탐지합니다.
- 이상: 동작이 과거 기준에서 벗어나는 경우를 탐지합니다.
- [콘텐츠 이상][6]: 이벤트의 콘텐츠가 과거 기준과 비교하여 이상인 경우를 탐지합니다.
- [불가능한 이동][7]: 사용자 활동 로그에서 불가능한 속도가 탐지되는 경우를 탐지합니다.
- 타사: 타사 보안 로그를 신호에 매핑하고 로그 속성을 기반으로 심각도를 설정합니다.
- 신호 상관관계: 여러 신호를 결합하여 새로운 신호를 생성함으로써 보다 복잡한 사용 사례에 대해 알리고 경보 피로를 줄일 수 있습니다.

## Reference Table을 기준으로 로그 필터링 {#filter-logs-based-on-reference-tables}

<div class="alert alert-warning">1,000,000행이 넘는 Reference Table은 이벤트 필터링에 사용할 수 없습니다. Reference Table 생성 및 관리 방법에 대한 자세한 내용은 <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Reference Table로 사용자 지정 메타데이터 추가</a>를 참조하세요. </div>

Reference Table을 사용하면 메타데이터를 로그와 결합하여 애플리케이션 문제를 해결하는 데 필요한 더 많은 정보를 제공할 수 있습니다. 규칙에 대한 쿼리를 정의할 때 Reference Table을 기반으로 하는 쿼리 필터를 추가하여 조회 쿼리를 수행할 수 있습니다. 이 기능을 생성하고 관리하는 방법에 대한 자세한 내용은 [Reference Tables][10] 가이드를 참조하세요.

다음 예제에서는 제품 정보가 포함된 Reference Table을 사용하여 로그를 필터링하고 보강합니다.

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="Reference Table 검색 옵션이 강조 표시된 로그 탐지 규칙 쿼리 편집기" style="width:100%;" >}}

## 단위 테스트 {#unit-testing}

단위 테스트를 사용하여 샘플 로그에 대해 규칙을 테스트하고 탐지 규칙이 예상대로 작동하는지 확인할 수 있습니다. 이는 아직 발생하지 않은 이벤트에 대한 탐지 규칙을 생성할 때 해당 이벤트에 대한 실제 로그가 없으므로 유용할 수 있습니다. 예: `login_attempt` 필드가 있는 로그가 있는데 이 중에서 `login_attempt:failed`인 로그를 탐지하려고 합니다. 하지만 `login_attempt:success`가 포함된 로그만 있는 상황입니다. 규칙을 테스트하려면 `login_attempt:success`인 로그를 복사하고 `login_attempt` 필드를 `failed`로 변경하여 샘플 로그를 만들 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
[2]: https://app.datadoghq.com/security/siem/rules
[3]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/threshold/
[4]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/new_value/
[5]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/anomaly/
[6]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/
[7]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/
[8]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/third_party/
[10]: /ko/integrations/guide/reference-tables/