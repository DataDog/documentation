---
aliases:
- /ko/security_monitoring/guide/monitor-authentication-logs-for-security-threats/
- /ko/security_platform/guide/monitor-authentication-logs-for-security-threats/
- /ko/security/guide/monitor-authentication-logs-for-security-threats/
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: 블로그
  text: 인증 로그 모니터링에 대해 자세히 알아보기
title: 보안 위협에 대한 인증 로그 모니터링
---

## 개요

모든 인증 이벤트를 기록, 모니터링 및 분석할 수 있는 능력은 보안 위협을 식별하고 컴플라이언스를 위한 고객 기록을 관리하는 데 중요합니다. 환경의 다양한 소스와 부분에서 생성된 인증 로그는 형식이 다를 수 있으며 다양한 팀에서 관리하거나 여러 타사 서비스를 사용하여 구현될 수 있습니다.

이 가이드는 인증 로그 관리 및 형식 지정에 대한 모범 사례와 팁을 안내합니다. 이를 통해 인증 로그 데이터를 사용하여 [Datadog 보안 및 컴플라이언스 모니터링][1]으로 보안 위협을 모니터링하고 감지할 있습니다.

## 사전 필수 요건

보안 및 컴플라이언스 모니터링을 사용하려면 로그 수집을 활성화해야 합니다. 이 가이드에서는 [애플리케이션 수준][2]에서 로그 수집을 활성화할 것을 권장합니다.

## 인증 로그 관리 및 형식 지정

보안 위협 모니터링을 시작하기 전에 아래 모범 사례에 따라 Datadog에 충분한 로그 데이터가 유입되는지 확인하세요.

### 모든 로그인 플로우에서의 로그 이벤트

모든 인증 활동에 대한 가시성을 얻기 위해 모든 로그인 플로우에 대한 로그 이벤트가 애플리케이션 수준에 있는지 확인합니다. 이는 모니터링 범위의 공백을 제거합니다. 또한 인증 이벤트를 기록하는 방법과 수집하는 데이터를 더 효과적으로 제어할 수 있습니다.

### 로그에 유용한 데이터가 포함되어 있는지 확인

애플리케이션 수준에서 모든 인증 이벤트를 기록하면 로그에 [보안 위협 모니터링 및 탐지](#monitor-and-detect-security-threats)에 가장 유용한 데이터가 포함되도록 할 수 있습니다.

{{< code-block lang="bash" >}}
2020-01-01 12:00:01 google oauth login success by John Doe from 1.2.3.4
{{< /code-block >}}

이벤트의 "누가"(John Doe), "무엇"(로그인 성공) 및 언제(2020-01-01 12:00:01)를 포함하는 로그는 Datadog에서 복잡한 분석을 수행할 수 있는 최고 수준의 세부 정보를 제공합니다. 

### 파싱 가능한 표준 형식으로 로그인

애플리케이션이 `=` 구분 기호를 사용하여 키-값 형식으로 로그를 작성하도록 합니다. 이 형식을 사용한다는 것은 Datadog의 [Grok Parser][3]와 같은 키-값 파서가 이를 처리할 수 있다는 것을 의미합니다. 예를 들어 로그가 다음 형식인 경우:

{{< code-block lang="bash" >}}
INFO 2020-01-01 12:00:01 usr.id="John Doe" evt.category=authentication evt.name="google oauth" evt.outcome=success network.client.ip=1.2.3.4
{{< /code-block >}}

Datadog은 이를 다음 JSON으로 파싱할 수 있습니다.

{{< code-block lang="json" >}}
{
  "usr": {
    "id": "John Doe"
  },
  "evt": {
    "category": "authentication",
    "name": "google oauth",
    "outcome": "success",
  },
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  }
}
{{< /code-block >}}

출처에 관계없이 모든 속성에서 데이터를 검색하고 집계할 수 있도록 하려면 로그의 속성에 대해 [표준 명명 규칙][4]을 사용하는 것이 중요합니다. 인증 로그에 다음 [표준 속성][5]을 포함하는 것이 좋습니다.

- [`usr.id`][6]
- [`evt.category`][7]
- [`evt.name`][7]
- [`evt.outcome`][7]
- [`network.client.ip`][8]

모든 인증 로그에서 동일한 형식을 사용하면 로그 속성을 적절하게 사용하여 Datadog에서 로그 데이터를 필터링하고 구성할 수 있습니다. 예를 들어, 표준 속성을 사용하면 로그인 실패 횟수(`evt.outcome:failure`)가 가장 많은 사용자(`usr.id`)를 찾을 수 있습니다.

키-값 형식은 로그에 커스텀 속성을 추가하는 프로세스도 단순화합니다. 예를 들어 [reCAPTCHA v3][9] 점수를 추가하여 가능한 봇 활동을 식별할 수 있습니다. 공백이 포함될 수 있는 속성 값을 묶으려면 따옴표를 사용합니다. 이렇게 하면 파싱이 가능한 방식으로 전체 값을 캡처할 수 있습니다.

## 보안 위협 모니터링 및 탐지

보안 위협을 적절하게 모니터링하고 탐지하려면 주목해야 할 주요 패턴이 있습니다. 예를 들어, 짧은 기간 내에 단일 사용자의 로그인 시도 실패 횟수가 많다면 [**무차별 대입 공격**][10]일 수 있습니다. 로그인 시도가 실패한 후 다시 로그인에 성공하면 즉시 조사해야 할 성공적인 계정 탈취일 수 있습니다.

또 다른 일반적인 인증 공격 기법은 [**크리덴셜 스터핑**][11]입니다. 크리덴셜 스터핑은 공격자가 실제 사용자 계정과 일치시키기 위해 위반된 로그인 크리덴셜을 혼합하고 일치시키는 것입니다. 이러한 유형의 공격을 탐지하려면 동일한 `network.client.ip`에서 여러 `usr.id` 값을 사용하는 로그인을 찾습니다.

Datadog은 위의 일반적인 공격 기술에 대해 수집된 로그를 실시간으로 스캔하는 사전 구성된 [탐지 규칙][12]을 제공합니다. 로그가 이러한 규칙 중 하나를 트리거하면 Datadog은 자동으로 [보안 신호][13]를 생성합니다. 이 신호에는 감지된 공격 유형, 상황에 대응하고 해결하는 방법에 대한 제안 등 이벤트에 대한 주요 데이터가 포함됩니다. 탐색기에서 모든 보안 신호를 보고, 필터링하고, 정렬하여 보안 신호를 분류함으로써 가장 집중해야 할 영역을 확인할 수 있습니다.

`Credential Stuffing Attack` 탐지 규칙에서 트리거된 신호의 경우 대응 및 해결에 도움이 되는 [기본 제공 런북][14]이 있습니다. 이 런북은 잠재적인 크리덴셜 스터핑 공격을 조사하는 과정을 안내하고 관련 로그 그래프를 포함합니다. 이 런북을 사용하려면 사본을 저장하고 기간을 설정한 다음, 조사 내용을 마크다운으로 문서화하고 팀원들과 공유하여 [코멘트를 남길 수 있도록][15] 합니다.

### 대시보드를 사용하여 조사

Datadog은 [IP 조사 대시보드][16] 및 [사용자 조사 대시보드][17]와 같은 즉시 사용 가능한 대시보드를 제공합니다. 이는 인증 로그의 주요 데이터를 나머지 환경의 관련 데이터와 연관시켜 조사를 지원합니다.

예를 들어 특정 IP 주소나 사용자가 여러 보안 신호를 트리거하는 경우 대시보드 목록이나 그래프에서 해당 IP 주소나 사용자를 클릭하고 **View related Security Signals**를 선택합니다. 그러면 보안 신호 탐색기에서 해당 IP 주소 또는 사용자에 대해 트리거된 모든 보안 신호가 채워집니다. 데이터가 허용하는 경우 이 보기는 IP 주소를 특정 사용자와 연관시키거나 특정 사용자를 IP 주소와 연관시키려고 할 때 유용합니다. 여기에서 각 규칙을 검사하고 확인하여 공격을 교정할 수 있습니다. 규칙을 클릭하고 **Rule Details** 탭에서 분류 및 대응 정보를 검토하여 문제를 적절하게 평가하고 해결하세요.

사용자 정의 대시보드를 생성하여 소스 및 결과별 로그인 횟수와 같은 주요 인증 데이터를 시각화할 수도 있습니다. 이를 통해 전체 사용자 기반의 활동에 대한 높은 수준의 보기를 제공하고 추세를 확인하여 조사해야 할 의심스러운 급증을 식별하는 데 도움이 됩니다.

### 향후 조사를 위해 로그 복원 및 트레이드 사용 

Datadog은 [모든 로그][18]를 수집하고 분석하여 전체 환경에서 위협을 탐지할 수 있도록 보장합니다. [인덱싱하지 않으려는][19] 모든 로그를 보관한 다음 나중에 조사, 감사 및 컴플라이언스 목적으로 신속하게 [복원][20]할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_siem/
[2]: /ko/logs/log_collection/?tab=application#application-log-collection
[3]: /ko/logs/log_configuration/processors/#grok-parser
[4]: https://www.datadoghq.com/blog/logs-standard-attributes/
[5]: /ko/logs/log_configuration/attributes_naming_convention
[6]: /ko/logs/log_configuration/attributes_naming_convention/#user-related-attributes
[7]: /ko/logs/log_configuration/attributes_naming_convention/#events
[8]: /ko/logs/log_configuration/attributes_naming_convention/#web-access
[9]: https://developers.google.com/recaptcha/docs/v3
[10]: https://app.datadoghq.com/security/configuration/rules?product=siem&query=brute%20force%20attack&sort=rule
[11]: https://app.datadoghq.com/security/configuration/rules?product=siem&query=credential%20stuffing%20attack&sort=rule
[12]: /ko/cloud_siem/default_rules/
[13]: /ko/cloud_siem/explorer
[14]: https://app.datadoghq.com/notebook/credentialstuffingrunbook
[15]: /ko/notebooks/#commenting
[16]: https://app.datadoghq.com/screen/integration/security-monitoring-ip-investigation
[17]: https://app.datadoghq.com/screen/integration/security-monitoring-user-investigation
[18]: https://www.datadoghq.com/blog/logging-without-limits/
[19]: /ko/logs/log_configuration/indexes/#exclusion-filters
[20]: https://www.datadoghq.com/blog/efficient-log-rehydration-with-datadog/