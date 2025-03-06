---
aliases:
- /ko/compliance_monitoring
- /ko/cloud_siem
- /ko/security_platform
- /ko/security/security_monitoring
- /ko/security_monitoring/explorer/
- /ko/cloud_siem/explorer/
- /ko/security_platform/explorer
- /ko/security/explorer
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
- link: /security/cloud_security_management/misconfigurations/
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
- link: https://www.datadoghq.com/blog/investigate-denial-of-service-attacks/
  tag: 블로그
  text: 복잡한 DoS(Denial-of-Service) 공격 조사
- link: https://www.datadoghq.com/blog/optimize-and-secure-azure-functions/
  tag: 블로그
  text: Azure Functions 최적화 및 보안 팁
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: 블로그
  text: Datadog를 사용해 코드로 감지하기
- link: https://www.datadoghq.com/blog/lateral-movement-entra-id-azure/
  tag: 블로그
  text: 하이브리드 Azure 환경에서 측면 움직임 감지
- link: https://www.datadoghq.com/blog/secrets-management/
  tag: 블로그
  text: 클라우드 환경이 공격에 취약하게 되는 비밀 파악
- link: https://www.datadoghq.com/blog/cloud-security-roundup-infrastructure-identity/
  tag: 블로그
  text: '클라우드 보안 연구 및 가이드 정리: 인프라스트럭처 및 액세스'
- link: https://www.datadoghq.com/blog/cloud-security-roundup-devsecops-threat-detection-ai/
  tag: 블로그
  text: '클라우드 보안 연구 및 가이드 정리: DevSecOps, 위협 탐지 및 AI'
title: Datadog 보안
---

## 개요

프로덕션 보안 운영을 더 확장하고 신속하게 수행하세요. Datadog Security는 애플리케이션, 호스트, 컨테이너 및 클라우드 인프라스트럭처 전반에 걸쳐 실시간 위협 탐지 및 지속적인 구성 감사를 제공합니다. 뛰어난 성능의 Datadog 옵저버빌리티 플랫폼과 결합된 Datadog Security는 조직의 목표에 맞춰 보안과 운영 간에 효율적인 통합을 제공합니다.

Datadog Security에는 [Application Security](#application-security), [Cloud SIEM](#cloud-siem), [Cloud Security Management](#cloud-security-management)가 포함됩니다. 자세한 내용은 [30초 제품 둘러보기][14]에서 확인하세요.

## 애플리케이션 보안

Datdog [애플리케이션 보안][1]은 SSRF(Server-Side-Request-Forgery), SQL 삽입, Log4Shell, XSS(Reflected Cross-Site-Scripting) 등 코드 수준 취약성을 악용하려는 애플리케이션 수준 공격에 관측성을 제공합니다. ASM에서는 [Datadog APM][2], [Datadog 에이전트][3] 및 인앱 감지 규칙을 활용해 애플리케이션 환경에서 위협을 감지합니다. 제품 [둘러보기](https://www.datadoghq.com/guided-tour/security/application-security-management/)를 확인해 자세히 알아보세요.

위협 탐지 외에도 Datadog은 다음 기능을 포함하는 [Code Security][20]을 통해 개발부터 생산까지 엔드투엔드 코드 및 라이브러리 취약점 탐지를 제공합니다.
- 자사 코드의 보안 및 품질 문제를 식별하기 위한 [Static Code Analysis (SAST)][21] 
- 리포지토리와 서비스 모두에서 오픈 소스 종속성을 식별하기 위한 [Software Composition Analysis (SCA)][22] 
- 서비스의 코드 수준 취약점에 대한 [Runtime Code Analysis (IAST)][23] 

{{< img src="/security/application_security/app-sec-landing-page.png" alt="공격 흐름과 화염 그래프를 표시하는 Datadog 보안 신호 패널" width="75%">}}

## Cloud SIEM

[클라우드 SIEM][4](보안 정보 및 이벤트 관리)은 타겟화된 공격, 위협 정보 목록과 일치하는 시스템과 통신하는 IP 또는 안전하지 않은 설정 등 애플리케이션과 인프라의 실시간 위협을 감지합니다. [Datadog 로그 관리][5]로 지원되는 클라우드 SIEM을 통해 [Datadog 클라우드 SIEM에서 감지한 위협을 자동으로 치료하여][6] 위협 대응 워크플로우 속도를 향상할 수 있습니다. 전용 [가이드 투어](https://www.datadoghq.com/guided-tour/security/cloud-siem)를 확인하여 자세히 알아보세요.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="중요 신호, 의심스러운 행위자, 영향 대상 리소스, 위협 정보 및 신호 트렌드 위젯을 포함하는 보안 개요 섹션을 표시하는 클라우드 SIEM 홈페이지" width="100%">}}

## 클라우드 보안 관리

[클라우드 보안 관리(CSM)][10]은 전 클라우드 인프라에 대한 실시간 위협 감지 및 지속적인 설정 감사를 제공합니다. 원활한 협업과 빠른 치료가 가능하도록 통합된 뷰에서 이를 확인할 수 있습니다. 관측 가능성 데이터를 기반으로 보안 팀은 전체 공격 흐름을 추적하여 위협의 영향을 파악하고 취약성이 트리거된 리소스 소유자를 식별할 수 있습니다.

CSM은 [위협][12], [잘못된 설정][11], [리스트 식별][15] 및 [취약성][16]을 포함합니다. 자세한 내용은 전용 [가이드 투어][13]를 확인하세요.

{{< img src="security/csm/csm_overview_2.png" alt="우선순위 보안 문제 목록이 표시된 클라우드 보안 관리 개요의 보안 받은 편지함" width="100%">}}

Datadog 보안을 시작하려면 Datadog에서 [**Security** > **Setup**][9] 페이지로 이동합니다. 해당 페이지에는 단일 또는 다중 설정에 대한 자세한 정보가 포함되거 있습니다. 또는 아래 시작하기 섹션으로 이동해 플랫폼의 각 영역에 대해 자세히 알아보세요.

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
[11]: /ko/security/cloud_security_management/misconfigurations/
[12]: /ko/security/threats/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /ko/security/cloud_security_management/identity_risks/
[16]: /ko/security/cloud_security_management/vulnerabilities/
[17]: /ko/security/application_security/troubleshooting/#disabling-threat-management-and-protection
[18]: /ko/security/application_security/troubleshooting/#disabling-software-composition-analysis
[19]: /ko/security/application_security/troubleshooting/#disabling-code-security
[20]: /ko/security/code_security/
[21]: /ko/security/code_security/static_analysis/
[22]: /ko/security/code_security/software_composition_analysis/
[23]: /ko/security/code_security/iast/