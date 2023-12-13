---
further_reading:
- link: /security/cloud_security_management/
  tag: 설명서
  text: 클라우드 보안 관리
- link: /security/misconfigurations/custom_rules/schema/
  tag: 설명서
  text: CSM 구성 오류 클라우드 리소스 스키마
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: 블로그
  text: Datadog 워크플로를 통한 엔드투엔드 프로세스 자동화
- link: https://www.datadoghq.com/blog/csm-at-datadog/
  tag: 블로그
  text: 클라우드 인프라스트럭처의 보안 상태 개선을 위한 Datadog CSM 사용 방법
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 보안 및 위협 탐지를 강화하세요.
- link: https://securitylabs.datadoghq.com/
  tag: 보안 연구소
  text: Datadog의 보안 연구, 보고서, 팁 및 동영상
kind: 설명서
title: 클라우드 보안 관리 시작하기
---

## 개요

[Datadog 클라우드 보안 관리][1](CSM)는 전체 클라우드 인프라스트럭처에 걸쳐 실시간 위협 탐지 및 지속적인 구성 감사를 제공합니다. 통합 가시성 데이터에 기반하여 CSM에는 [잘못된 구성][2] 및 [위협][3]이 포함됩니다.

이 가이드에서는 CSM으로 팀을 구성하고 운영하기 위한 모범 사례를 안내합니다.

## 1단계: 배포

1. [Datadog Agent(버전 7.46 이상)][4]를 설치합니다.
2. 클라우드 리소스 및 인프라스트럭처에 대해 CSM을 활성화합니다.
    - **CSM Threats**: [Kubernetes][5], [Docker][6], [호스팅 기반][7] 설치.
    - **CSM Misconfigurations**: [AWS][10], [Azure][11], [GCP][12], [Kubernetes][8], [Docker][9] 지침.
    - **CSM Identity Risks**: [AWS 리소스 수집][26] 및 [Cloudtrail 로그 포워딩][27] 활성화.
    - **CSM Vulnerabilities**: Kubernetes, ECS EC2 인스턴스 및 호스트 기반 설치에 대한 [컨테이너 이미지 스캐닝][23] 및 [호스트 스캐닝][24] 지침.
3. 조직의 위험과 위협에 대한 개요를 확인하려면 [CSM 홈페이지][13]를 참조하세요.
4. [500개 이상의 즉시 사용 가능한 위협 및 잘못된 구성 탐지 규칙][14]을 검토하세요.
5. [보안 신호][15]를 살펴보고 [CSM 잘못된 구성 발견 사항][16]을 검토하세요.
6. [Identity Risks][29] 페이지에서 [신원 위험][28]을 검토하고 수정합니다.
7. [Container Images][25] 페이지에서 컨테이너 취약성을 검토하고, [Infrastructure Vulnerability][30] 페이지에서 통합된 취약성 목록을 확인하세요.
8. [알림 규칙][17]을 설정하고 Slack, Jira, 이메일 등을 통해 알림을 받습니다.

## 2단계: 맞춤 설정

1. 노이즈를 줄이기 위해 [CSM 위협 억제 규칙][18]을 설정하세요.
2. [CSM 잘못된 구성][19] 및 [CSM 위협][20]에 대한 사용자 지정 탐지 규칙을 만듭니다.

## 3단계: 보고서 및 대시보드

1. [규정 준수 보고서][21]를 검토하여 조직의 상태를 평가하세요.
2. 즉시 사용 가능한 대시보드를 사용하거나 [직접 생성][22]하여 더 빠르게 조사, 보고 및 모니터링할 수 있습니다.
3. 주간 [보안 다이제스트][31] 보고서를 구독하여 지난 7일 동안 발견된 가장 중요한 신규 보안 문제를 조사하고 해결하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/
[2]: /ko/security/misconfigurations/
[3]: /ko/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ko/security/threats/setup/?tab=kuberneteshelm#configure-the-csm-threats-agent
[6]: /ko/security/threats/setup/?tab=docker#configure-the-csm-threats-agent
[7]: /ko/security/threats/setup/?tab=hostothers#configure-the-csm-threats-agent
[8]: /ko/security/misconfigurations/setup?tab=kubernetes
[9]: /ko/security/misconfigurations/setup?tab=docker
[10]: /ko/security/misconfigurations/setup?tab=aws
[11]: /ko/security/misconfigurations/setup?tab=azure
[12]: /ko/security/misconfigurations/setup?tab=googlecloud
[13]: https://app.datadoghq.com/security/csm
[14]: /ko/security/default_rules/#cat-cloud-security-management
[15]: /ko/security/misconfigurations/signals_explorer/
[16]: /ko/security/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /ko/security/cloud_security_management/guide/tuning-rules/
[19]: /ko/security/misconfigurations/custom_rules
[20]: /ko/security/threats/agent_expressions
[21]: /ko/security/misconfigurations/frameworks_and_benchmarks
[22]: /ko/dashboards/#overview
[23]: /ko/security/cloud_security_management/setup/csm_pro?tab=aws#configure-csm-for-container-vulnerabilities
[24]: /ko/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-csm-for-vulnerabilities
[25]: https://app.datadoghq.com/containers/images
[26]: /ko/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /ko/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /ko/security/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports