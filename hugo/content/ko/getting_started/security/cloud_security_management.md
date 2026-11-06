---
aliases:
- /ko/getting_started/cloud_security_management
description: 인프라 전반에 걸친 통합 가시성을 확보하려면 Datadog Cloud Security를 배포합니다. 위협 탐지, 잘못된 구성,
  ID 위험 및 취약성을 설정합니다.
further_reading:
- link: /security/cloud_security_management/
  tag: 설명서
  text: Cloud Security
- link: /infrastructure/resource_catalog/schema/
  tag: 설명서
  text: 클라우드 리소스 스키머 참조
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: 블로그
  text: Datadog 워크플로를 통한 엔드투엔드 프로세스 자동화
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: 블로그
  text: Datadog 자격 증명 유출을 탐지하고 사용자에게 알리는 방법
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 보안 및 위협 탐지를 강화하세요.
- link: https://securitylabs.datadoghq.com/
  tag: 보안 연구소
  text: Datadog의 보안 연구, 보고서, 팁 및 동영상
- link: https://learn.datadoghq.com/courses/csm-misconfigurations
  tag: 학습 센터
  text: Cloud Security Misconfigurations를 사용하여 취약한 클라우드 리소스 검색 및 수정
title: Cloud Security 시작하기
---
## 개요 {#overview}

[Datadog Cloud Security][1]는 클라우드 인프라 전반에 걸쳐 심층적인 가시성, 지속적인 구성 감사, ID 위험 평가, 취약성 탐지 및 실시간 위협 탐지를 제공하며, 이 모든 기능을 통합 플랫폼에서 제공하여 원활한 협업과 신속한 문제 해결을 지원합니다.

Cloud Security를 사용하면 보안 및 DevOps 팀에서 관측 가능성 및 보안 데이터의 공유 컨텍스트에 기반해 행동을 취하여 신속하게 문제의 우선 순위를 지정하고 문제를 해결할 수 있습니다. 이 가이드에서는 Cloud Security로 팀을 구성하고 운영하기 위한 모범 사례를 안내합니다.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트({{< region-param key="dd_site_name" >}})에서는 Agentless Scanning을 사용할 수 없습니다.</div>
{{< /site-region >}}

## 1단계: 배포 {#phase-1-deployment}

1. [Agentless][34] 및/또는 [Datadog Agent(버전 7.46 이상)][4]를 사용하여 [클라우드 리소스 및 인프라에 Cloud Security를 활성화합니다][5].
    - **[위협][3]**: Kubernetes, Docker 및 호스트 기반 설치
    - **[설정 오류][2]**: AWS, Azure, GCP, OCI, Kubernetes 및 Docker 설정 지침
    - **[ID 위험][28]**: AWS 리소스 수집 및 CloudTrail 로그 포워딩 활성화
    - **[취약성][6]**: AWS, Azure, Kubernetes, ECS, EC2 인스턴스 및 호스트 기반 설치를 위한 컨테이너 이미지 스캔 및 호스트 스캔 지침
1. 조직의 위험과 위협에 대한 개요를 확인하려면 [Cloud Security 홈페이지][13]를 살펴봅니다.
1. [500개 이상의 기본 제공 위협 및 설정 오류 탐지 규칙][14]을 검토합니다.
1. [Cloud Security 설정 오류 발견 결과][16]를 검토합니다.
1. [{{< ui >}}Identity Risks{{< /ui >}}][29] 페이지에서 ID 위험을 검토하고 수정합니다.
1. [{{< ui >}}Container Images{{< /ui >}}][25] 페이지에서 컨테이너 취약성을 검토하고, [{{< ui >}}Infrastructure Vulnerability{{< /ui >}}][30] 페이지에서 취약성 통합 목록을 확인합니다.
1. [알림 규칙][17]을 설정하고 Slack, Jira, 이메일 등을 통해 경보를 받습니다.

## 2단계: 사용자 지정 {#phase-2-customization}

1. [Workload Protection 억제 규칙][18]을 설정하여 노이즈를 줄입니다.
2. [Cloud Security Misconfigurations][19] 및 [Workload Protection][20]에 대한 사용자 지정 탐지 규칙을 생성합니다.

## 3단계: 보고서 및 대시보드 {#phase-3-reports-and-dashboards}

1. [규정 준수 보고서][21]를 검토하여 조직의 보안 태세를 평가합니다.
2. 기본 제공 대시보드를 사용하거나 [직접 생성][22]하여 더 빠르게 조사, 보고 및 모니터링할 수 있습니다.
3. 주간 [보안 다이제스트][31] 보고서를 구독하여 지난 7일 동안 발견된 가장 중요한 신규 보안 문제를 조사하고 해결하세요. 

## Cloud Security 비활성화 {#disable-cloud-security}

Cloud Security 비활성화 방법은 다음을 참조하세요.

- [Cloud Security Vulnerabilities 비활성화][32]
- [Workload Protection 비활성화][33]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/
[2]: /ko/security/cloud_security_management/misconfigurations/
[3]: /ko/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ko/security/cloud_security_management/setup
[6]: /ko/security/cloud_security_management/vulnerabilities/
[13]: https://app.datadoghq.com/security/csm
[14]: /ko/security/default_rules/#cat-cloud-security-management
[16]: /ko/security/cloud_security_management/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /ko/security/cloud_security_management/guide/tuning-rules/
[19]: /ko/security/cloud_security_management/misconfigurations/custom_rules
[20]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[21]: /ko/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[22]: /ko/dashboards/#overview
[25]: https://app.datadoghq.com/containers/images
[26]: /ko/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /ko/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /ko/security/cloud_security_management/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports
[32]: /ko/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[33]: /ko/security/workload_protection/troubleshooting/threats/#disable-csm-threats
[34]: /ko/security/cloud_security_management/setup/cloud_integrations