---
aliases:
- /ko/security/security_monitoring/getting_started/
further_reading:
- link: /security/application_security/terms
  tag: 설명서
  text: 애플리케이션 보안 용어 및 개념
- link: /security/application_security/how-appsec-works
  tag: 설명서
  text: 애플리케이션 보안 관리의 작동 방식
- link: /security/application_security/enabling/
  tag: 설명서
  text: ASM 활성화
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 보안 및 위협 탐지를 강화하세요.
- link: /getting_started/application_security/software_composition_analysis
  tag: 가이드
  text: 소프트웨어 구성 요소 분석 시작하기
- link: https://securitylabs.datadoghq.com/
  tag: 보안 연구소
  text: Datadog의 보안 연구, 보고서, 팁 및 동영상
kind: 설명서
title: 애플리케이션 보안 관리 시작하기
---

## 개요

Datadog 애플리케이션 보안 관리(ASM)는 운영 중인 웹 애플리케이션 및 API를 보호하는 데 도움이 됩니다. ASM은 서비스의 애플리케이션 수준 취약성에 대한 가시성을 제공하고 이러한 취약성을 이용하려는 공격 및 공격자로부터 실시간으로 보호합니다.

이 가이드에서는 ASM을 사용하여 팀을 운영하는 모범 사례를 설명합니다.

## 보안 위험이 있는 서비스 식별


ASM을 활용할 수 있는 **취약하거나 공격에 노출된 서비스를 식별합니다**. 그런 다음 [**Service Catalog > Security 페이지**][1]에서 사용하려는 서비스를 선택합니다.

{{< img src="getting_started/appsec/ASM_activation_service_selection_v2.png" alt="취약점을 표시하고 의심스러운 요청 열을 기준으로 정렬된 ASM 서비스 페이지 보기." style="width:100%;" >}}

이러한 보안 인사이트는 APM에 의해 보고된 데이터에서 감지됩니다. 이러한 인사이트는 보안을 우선순위로 정하는 데 도움이 됩니다. ASM은 서비스에 대한 모든 보안 위험을 파악하고 우선순위를 지정하여 해결하는 데 도움이 됩니다.

**참고**: 취약점이나 의심스러운 요청이 보고되지 않은 경우 서비스가 최신 Datadog 추적 라이브러리 버전을 사용하고 있는지 확인하세요. [Security Service Catalog][2]에서 서비스의 사이드 패널을 열고 **Tracing Configuration**을 살펴보세요.


{{< img src="getting_started/appsec/ASM_Tracing_Configuration.png" alt="Tracer Configuration tab in APM Service Catalog page view. Highlighting which version of the Datadog Agent, and Datadog tracing library are being used by your services." style="width:100%;" >}}


## ASM 사용

### 인앱 지침으로 ASM 사용

[ASM 랜딩 페이지][18]의 지침에 따라 시작하세요. 여기에는 다음이 포함됩니다.
- ASM의 혜택을 받을 수 있는 서비스를 안내합니다.
- 환경 변수로 Datadog 추적 라이브러리를 설정합니다.
- 서비스를 재시작합니다.</br>

1. **Get Started with ASM**을 클릭합니다.
2. **Get Started** 를 선택하면 오픈 소스 라이브러리의 취약성을 감지하고(Software Composition Analysis), 코드 수준 취약성을 찾아 수정하며 (Code Security), 서비스에서 위협 감지를 찾아 활성화할 수 있습니다(Threat Management).
3. 지침에 따라 ASM을 시작합니다.

   {{< img src="getting_started/appsec/asm_sca_setup.png" alt="Software Composition Analysis 설정 페이지" style="width:100%;" >}}


### 원격 설정으로 ASM 사용
#### 요구 사항:
- 호스트 또는 컨테이너에 설치된 Datadog 에이전트 버전 7.42.0 이상입니다.
- Datadog 트레이서 버전은 [원격 설정과 호환됩니다][16].

#### 원격 설정 설치(아직 활성화되지 않은 경우)
  다음 단계에 따라 Datadog UI에서 [원격 설정][17]을 활성화합니다. 여기에는 다음이 포함됩니다:
  1. 조직의 원격 구성 기능을 활성화합니다.
  2. 기존 API 키에 원격 설정 기능을 추가하거나 새 기능을 만듭니다.
  3. 원격 설정 기능이 있는 API 키를 사용하도록 Datadog 에이전트 설정을 업데이트합니다.

  자세한 내용은 [원격 설정 설치][21]를 참조하세요.

### ASM 테스트
ASM이 활성화되면 애플리케이션 취약성을 즉시 파악하고 서비스를 대상으로 하는 공격 및 공격자를 탐지합니다.

1. **취약성 확인**: [취약성 탭][14]으로 이동하여 취약성을 분석하고 해결합니다.
2. **공격 확인**: 공격 패턴을 보내 테스트 탐지 규칙을 트리거합니다. 단말기에서 다음 스크립트를 실행합니다:

  {{< code-block lang="sh" >}}
  for ((i=1;i<=250;i++)); do
  # 기존 서비스의 경로 타겟
  curl https://your-application-url/<EXISTING ROUTE> -A
  'dd-test-scanner-log';
  # 기존에 없는 서비스의 경로 타겟
  curl https://your-application-url/<NON-EXISTING ROUTE> -A
  'dd-test-scanner-log';
  done{{< /code-block >}}

3. 몇 초 후에 생성되는 신호를 보려면 [보안 신호 탐색기][6]로 이동합니다.

## 리포트 및 알림

1. [알림 규칙][23]을 설정하여 슬랙, 지라, 이메일 등을 사용하여 알림을 받을 수 있습니다.
3. 주간 [위협 요약][22] 보고서를 구독하면 지난 7일 동안 발견된 가장 중요한 보안 위협에 대한 조사 및 해결을 시작할 수 있습니다.


더 나아가기 위한 모범 사례 보기를 원하면 [제품 내 빠른 시작 안내][19] 를 확인합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?&lens=Security
[2]: https://app.datadoghq.com/services?hostGroup=%2A&lens=Security
[3]: /ko/security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[4]: /ko/security/application_security/how-appsec-works/
[5]: /ko/security/application_security/threats/add-user-info/
[6]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /ko/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /ko/security/notifications/rules/
[13]: /ko/security/application_security/risk_management
[14]: https://app.datadoghq.com/security/appsec/vm?&group=vulnerability
[15]: https://docs.datadoghq.com/ko/agent/guide/how_remote_config_works/?tab=configurationyamlfile#overview
[16]: https://docs.datadoghq.com/fr/security/application_security/enabling/compatibility/
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[19]: https://app.datadoghq.com/security/configuration/asm/onboarding
[20]: /ko/getting_started/application_security/#setup-asm
[21]: /ko/agent/remote_config?tab=configurationyamlfile#setup
[22]: https://app.datadoghq.com/security/configuration/reports
[23]: https://app.datadoghq.com/security/configuration/notification-rules