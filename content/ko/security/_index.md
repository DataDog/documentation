---
aliases:
- /ko/compliance_monitoring
- /ko/cloud_siem
- /ko/security_platform
- /ko/security/security_monitoring
- /ko/security_monitoring/explorer/
- /ko/cloud_siem/explorer/
- /ko/security_platform/explorer
- /ko/synthetics/
- /ko/security_platform/security_signal_management
- /ko/security/security_signal_management
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: 릴리스 노트
  text: 최신 Datadog 보안 릴리스를 확인하세요!(앱 로그인 필요)
- link: https://www.datadoghq.com/guided-tour/security/
  tag: 가이드 투어
  text: 제품 가이드 투어 확인
- link: /getting_started/cloud_siem
  tag: 설명서
  text: Cloud SIEM을 통한 위협 감지 시작
- link: /security/misconfigurations/setup
  tag: 설명서
  text: CSM Misconfigurations로 잘못된 구성 추적하기
- link: /security/threats/setup
  tag: 설명서
  text: CSM 위협을 통한 커널-수준-위협 발견
- link: https://securitylabs.datadoghq.com/
  tag: 보안 연구소
  text: Datadog 보안 연구소 블로그에서 보안 관련 주제에 대해 읽어보기
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 보안 및 위협 탐지를 강화하세요.
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: 블로그
  text: Stratus Red Team을 통한 AWS 위협 감지 향상
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: 블로그
  text: 쿠버네티스(Kubernetes) 애플리케이션 보안 모범 사례
- link: https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/
  tag: 블로그
  text: 클라우드 네이티브 환경에서 네트워크 경계 보안을 위한 모범 사례
- link: https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/
  tag: 블로그
  text: 클라우드 네이티브 인프라에서 데이터 보안을 위한 모범 사례
- link: https://www.datadoghq.com/blog/chaos-engineering-for-security/
  tag: 블로그
  text: 클라우드를 위한 보안 집중 카오스 엔지니어링 환경
- link: https://www.datadoghq.com/blog/datadogs-approach-devsecops/
  tag: 블로그
  text: DevSecOps에 대한 Datadog 접근 방식
title: Datadog 보안
---

## 개요

프로덕션 보안 운영에 속도와 규모를 더하세요. Datadog 보안은 애플리케이션, 호스트, 컨테이너 및 클라우드 인프라에 대한 지속적인 설정 감사와 실시간 위협 감지를 제공합니다. 더욱 향상된 Datadog 관측 가능성 플랫폼과 결합된 Datadog 보안은 조직 공통의 목표에 딱 맞는 보안과 운영의 완벽한 통합을 보여줍니다.  

Datadog 보안은 [애플리케이션 보안 관리](#application-security-management), [클라우드 SIEM](#cloud-siem) 및 [클라우드 보안 관리](#cloud-security-management)를 포함합니다. 자세히 알아보려면 [30초 제품 가이드 투어][14]를 확인하세요.

## 애플리케이션 보안 관리

[애플리케이션 보안 관리][1](ASM)은 SSRF(Server-Side-Request-Forgery), SQL 인젝션, Log4Shell, XSS(Reflected Cross-Site-Scripting) 등 코드 수준 취약성을 악용하려는 애플리케이션 수준 공격에 대한 관측 가능성을 제공합니다. ASM은 [Datadog APM][2], [Datadog Agent][3] 및 인앱 감지 규칙을 활용해 애플리케이션 환경에서 위협을 감지합니다. 제품 [가이드 투어](https://www.datadoghq.com/guided-tour/security/application-security-management/)를 확인해 자세히 알아보세요.

{{< img src="/security/application_security/app-sec-landing-page.png" alt="공격 흐름과 플레임 그래프를 표시하는 Datadog의 보안 신호 패널" width="75%">}}

## 추적하기

[클라우드 SIEM][4](보안 정보 및 이벤트 관리)은 타겟화된 공격, 위협 정보 목록과 일치하는 시스템과 통신하는 IP 또는 안전하지 않은 설정 등 애플리케이션과 인프라의 실시간 위협을 감지합니다. [Datadog 로그 관리][5]로 지원되는 클라우드 SIEM을 통해 [Datadog 클라우드 SIEM에서 감지한 위협을 자동으로 치료하여][6] 위협 대응 워크플로우 속도를 향상할 수 있습니다. 전용 [가이드 투어](https://www.datadoghq.com/guided-tour/security/cloud-siem)를 확인하여 자세히 알아보세요.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="중요 신호, 의심스러운 행위자, 영향 대상 리소스, 위협 정보 및 신호 트렌드 위젯을 포함하는 보안 개요 섹션을 표시하는 클라우드 SIEM 홈페이지" width="100%">}}

## 검색 구문

[클라우드 보안 관리(CSM)][10]은 전 클라우드 인프라에 대한 실시간 위협 감지 및 지속적인 설정 감사를 제공합니다. 원활한 협업과 빠른 치료가 가능하도록 통합된 뷰에서 이를 확인할 수 있습니다. 관측 가능성 데이터를 기반으로 보안 팀은 전체 공격 흐름을 추적하여 위협의 영향을 파악하고 취약성이 트리거된 리소스 소유자를 식별할 수 있습니다.

CSM은 [위협][12], [잘못된 설정][11], [리스트 식별][15] 및 [취약성][16]을 포함합니다. 자세한 내용은 전용 [가이드 투어][13]를 확인하세요.

{{< img src="security/csm/csm_overview_2.png" alt="우선순위 보안 문제 목록이 표시된 클라우드 보안 관리 개요의 보안 받은 편지함" width="100%">}}

Datadog 보안을 시작하려면 Datadog에서 [**보안 > **설정**][9] 페이지로 이동합니다. 해당 페이지에는 단일 또는 다중 설정에 대한 자세한 정보가 포함되거 있습니다. 또는 아래 시작하기 섹션으로 이동해 플랫폼의 각 영역에 대해 자세히 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/
[2]: /ko/tracing/
[3]: /ko/agent/
[4]: /ko/security/cloud_siem
[5]: /ko/logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[9]: https://app.datadoghq.com/security/configuration
[10]: /ko/security/cloud_security_management/
[11]: /ko/security/misconfigurations/
[12]: /ko/security/threats/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /ko/security/identity_risks/
[16]: /ko/security/vulnerabilities/