---
further_reading:
- link: /security/application_security/threats/add-user-info/
  tag: 설명서
  text: 사용자 활동 추적
- link: /security/application_security/threats/library_configuration/
  tag: 설명서
  text: ASM 설정 구성
- link: /security/application_security/software_composition_analysis/
  tag: 설명서
  text: 소프트웨어 구성 분석
- link: /security/application_security/how-appsec-works/
  tag: 설명서
  text: ASM 작동 방식
title: 애플리케이션 위협 관리
---

ASM Threat Management는 APM 계측 애플리케이션의 트레이스 원격 측정을 사용하여 관찰된 동작을 알려진 공격 패턴과 비교하거나 비즈니스 로직 남용을 식별함으로써 실행 중인 서비스에 대한 위협 및 공격을 식별합니다.

Threat Monitoring을 통해 제기된 보안 신호는 서비스 상태 및 성능을 모니터링하기 위해 이미 일반적으로 방문하는 보기에 요약되어 표시됩니다. APM의 [Service Catalog][1] 및 개별 Service Pages는 애플리케이션 위협 신호에 대한 인사이트를  제공하여 취약점을 조사하고, 공격자를 차단하고, 공격 노출을 검토할 수 있도록 해줍니다.

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="위협 신호를 표시하는 서비스와 Service Catalog" style="width:100%;" >}}

 Threat Managemen 작동 방식에 대한 자세한 내용은 [How ASM Works][4]를 참조하세요.


## 위협 신호 살펴보기

서비스에 대한 위협 데이터가 Datadog으로 들어오면 [ASM Overview][7]에서 현재 상황에 대한 요약을 보여줍니다. 여기에서 취약점 탐지를 활성화하고, 공격을 검토할 수 있으며, 경고 및 보고를 사용자 정의하고, 서비스에서 ASM을 활성화할 수 있습니다. 의심스러운 활동의 신호를 조사하려면 서비스의 **Review** 링크를 클릭하세요.

[Signals Explorer][2]에서 속성과 패싯으로 필터링하여 중요한 위협을 찾습니다. 신호를 클릭하면 사용자 정보와 IP 주소, 트리거된 규칙, 공격 흐름, 관련 트레이스 및 기타 보안 신호를 포함한 세부 정보를 볼 수 있습니다. 이 페이지에서 케이스를 생성하고 인시던트를 선언할 수도 있습니다. 자세한 내용은 [Investigate Security Signals][8]를 참조하세요.

{{< img src="security/application_security/threats/appsec-threat-overview.png" alt="Signals Explorer의 위협 조사에 대한 개요">}}


## 공격 패턴을 식별하기 위한 인앱 WAF 규칙 생성

애플리케이션에서 의심스러운 동작이 어떻게 보이는지 정의하는 [인앱 WAF 규칙을 생성][5]하여 ASM과 함께 제공되는 기본 규칙을 강화할 수 있습니다. 그런 다음 [커스텀 규칙을 지정][6]하여 이러한 규칙에서 트리거된 공격 시도로부터 보안 신호를 생성하고 조사하기 위해 Threat Monitoring 보기에 표시합니다.

## ASM Protect로 공격 및 공격자의 속도 늦추기

{{% asm-protect %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /ko/security/application_security/how-appsec-works/
[5]: /ko/security/application_security/threats/inapp_waf_rules/
[6]: /ko/security/application_security/threats/custom_rules/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /ko/security/application_security/threats/security_signals/