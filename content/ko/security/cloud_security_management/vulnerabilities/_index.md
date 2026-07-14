---
aliases:
- /ko/security/infrastructure_vulnerabilities/
- /ko/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: 설명서
  text: Cloud Security Vulnerabilities에서 SBOM 수집 활성화
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: 설명서
  text: 호스트 취약점 설정
- link: /infrastructure/containers/container_images
  tag: 설명서
  text: 컨테이너 이미지 조회
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: 설명서
  text: Cloud Security Vulnerabilities 문제 해결
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: 블로그
  text: Datadog Container Monitoring의 컨테이너 이미지로 문제 해결 워크플로 향상
- link: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
  tag: 설명서
  text: 프로덕션에서 감지된 취약점에 Dockerfile 연결
title: Cloud Security Vulnerabilities
---
## 개요 {#overview}

Cloud Security Vulnerabilities는 CI/CD 파이프라인부터 실제 운영 환경까지 컨테이너 이미지, 호스트, 호스트 이미지 및 서버리스 함수를 지속적으로 스캔하여 취약점을 탐지함으로써 보안 태세를 강화하고 규정 준수를 달성할 수 있도록 지원합니다. 런타임 관측 가능성을 활용하여 일상적인 워크플로에서 악용 가능한 취약점의 우선순위를 지정하고 해결할 수 있으며, 다른 Datadog 제품에 대한 종속성 없이 하나의 화면에서 모든 작업을 수행할 수 있습니다.

Cloud Security Vulnerabilities를 사용하면 한 곳에서 클라우드 보안 관리 전략을 수행할 수 있습니다.

- CI/CD 파이프라인부터 운영 리소스까지 아우르는 취약점 관리 프로그램 구축
- SOC2, PCI, HIPAA, CIS 및 FedRamp와 같은 규정 준수 감사 통과
- 새롭게 등장하는 취약점(0-day CVE) 해결

**참고**: 애플리케이션 라이브러리의 취약점 관리는 [Software Composition Analysis][5]를 참조하세요. 애플리케이션 코드의 경우 [Code Security][10]를 참조하세요.

## 주요 기능 {#key-capabilities}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서는 Agentless Scanning을 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Agentless 또는 통합 Datadog Agent를 사용한 배포
: Agentless 또는 이미 배포되어 있는 통합 Datadog Agent를 사용하여 전체 인프라의 취약점을 빠르게 스캔합니다.

클라우드 리소스의 실시간 인벤토리
: 컨테이너 이미지, 호스트, 서버리스 함수 및 인프라에 배포된 모든 패키지를 실시간으로 인벤토리화하고 SBOM(소프트웨어 자재 명세서)을 내보냅니다.

지속적인 취약점 탐지
: 호스트와 레지스트리의 실행 중인 컨테이너 이미지, 호스트, 호스트 이미지 및 서버리스 환경에서 최근 업데이트와 새로 공개된 CVE를 스캔하고 취약한 컨테이너 이미지 레이어를 식별합니다.

런타임 관측 가능성을 활용한 악용 가능한 취약점 우선순위 지정
: CISA KEV, EPSS 및 공개된 익스플로잇 정보 등을 반영하여 CVSS를 기반으로 계산되는 Datadog 보안 점수를 활용합니다. 런타임 관측 가능성을 통해 운영 환경, 공격 노출, 민감한 데이터 처리 및 권한 있는 액세스를 모니터링할 수 있습니다.

가이드 기반 해결 지원
: 영향을 받는 레이어를 확인하고 이미지별 맞춤 권장 사항을 제공받아 취약점 수명 주기 관리를 수행할 수 있습니다.

자동화 및 통합 구현
: Jira 티켓 생성을 자동화하고 SLA를 구현합니다. Datadog의 공개 API를 사용하여 취약점, 커버리지 및 SBOM을 내보낼 수 있습니다.

보고서 탐색
: 대시보드에서 취약점 데이터를 확인하고 모니터링합니다.

## 배포 방법 {#deployment-methods}

다음 방법을 사용하여 몇 분 안에 Cloud Security Vulnerabilities를 시작하고 인프라를 보호할 수 있습니다.
- [Agentless Scanning][11]
- [통합 Datadog Agent][12]
- [CI/CD Container Image Scanning][21]

여러 배포 방법을 함께 사용할 수도 있습니다. 이미 통합 Datadog Agent가 배포된 환경에서는 이를 사용하고, 다른 환경에서는 Agentless를 사용하며, 운영 환경에 배포되기 전에 취약점을 탐지하기 위해 CI/CD 스캔을 사용할 수 있습니다.

기능을 활성화하면 Datadog은 리소스를 지속적으로 스캔하기 시작하며, 1시간 이내에 [Cloud Security Vulnerabilities Findings 페이지][1]에서 우선순위가 지정된 취약점을 보고하기 시작합니다.

다음 표를 참고하여 시작할 솔루션을 선택하세요.
| 기능                                   | Agentless                                     | 통합 Datadog Agent          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| 인프라 전체 배포 시간 | 수분                                       | 수시간~수주                 |
| 취약점 우선순위 지정              | 예                                           | 예(런타임 컨텍스트 포함)      |
| 취약점 스캔 주기          | 12시간                                      | 실시간                      |

| 취약점 탐지 범위 | Agentless                                                                         | 통합 Datadog Agent          |
|-------------------------------|-----------------------------------------------------------------------------------|--------------------------------|
| 호스트 및 호스트 이미지           | OS 패키지 및 앱 패키지(이미지에 매핑)                                     | OS 패키지                    |
| 컨테이너 이미지               | OS 패키지 및 앱 패키지(이미지에 매핑)                                     | OS 패키지                    |
| 클라우드 공급자                | AWS, Azure, GCP                                                                   | AWS, Azure, GCP, 온프레미스 등 |
| 운영 체제              | Linux, Windows                                                                    | Linux, Windows                 |
| Serverless                    | AWS Lambda, Amazon ECS Fargate, Azure Container Apps, Azure Container Instances, GCP Cloud Run(컨테이너 배포만) | 해당 없음                 |
| 컨테이너 레지스트리          | Amazon ECR(실행 중 + 저장 중), Google Artifact Registry(실행 중인 워크로드만), Azure Container Registry(실행 중인 컨테이너 이미지만) | 해당 없음                 |

호환성에 대한 자세한 내용은 [Cloud Security Vulnerabilities 호스트 및 컨테이너 호환성][13]을 참조하세요. 도움이 필요하면 [문제 해결 가이드][14]를 참조하거나 support@datadoghq.com으로 문의하세요.

## 악용 가능한 취약점을 지속적으로 탐지, 우선순위 지정 및 해결 {#continuously-detect-prioritize-and-remediate-exploitable-vulnerabilities}
[Cloud Security Vulnerabilities Findings 페이지][1]에서는 필터링 및 그룹화 기능을 사용하여 컨테이너 이미지, 호스트 이미지, 실행 중인 호스트 및 서버리스 함수에서 탐지된 취약점을 조사할 수 있습니다.

Datadog Severity Score를 사용하여 먼저 악용 가능한 취약점에 집중할 수 있습니다. 이 점수는 기본 CVSS 점수에 민감한 데이터, 환경 민감도, 공격 노출, 익스플로잇 가용성 및 위협 인텔리전스 소스 등 다양한 위험 요소를 결합하여 계산됩니다.

해결 방법이 제공되는 취약점의 경우 Findings 페이지에서 Dev 및 Ops 팀이 문제를 보다 빠르고 효과적으로 해결할 수 있도록 가이드 기반 해결 단계를 제공합니다. 또한 취약점에 대해 분류, 음소거, 댓글 추가 및 담당자 할당을 수행하여 취약점의 수명 주기를 관리할 수 있습니다.

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="취약점과 사용자가 이를 해결하기 위해 수행할 수 있는 액션을 보여주는 Cloud Security Vulnerabilities Findings 페이지" width="100%">}}

[컨테이너 이미지][7]에서는 이미지에서 발견된 취약점을 특정 레이어까지 추적할 수 있으므로 보안 위험을 더욱 빠르게 식별하고 해결할 수 있습니다.

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="이미지의 각 레이어와 연결된 취약점 목록" width="100%">}}

## 운영 환경의 취약점을 소스 코드까지 추적 {#trace-production-vulnerabilities-to-source-code}

운영 중인 컨테이너 이미지에서 Datadog가 CVE를 탐지하면 해당 CVE를 취약한 패키지를 도입한 Dockerfile과 커밋에 직접 연결할 수 있습니다. 이를 통해 운영 환경의 경보와 이를 유발한 코드 변경 간의 간극을 해소하여, 개발자가 여러 레지스트리에서 패키지 버전을 추적하는 대신 문제의 원인이 되는 소스에서 바로 취약점을 해결할 수 있도록 필요한 컨텍스트를 제공합니다.

이러한 코드-클라우드 매핑을 활성화하려면 빌드 시 컨테이너 이미지에 OCI 이미지 주석을 추가합니다. Datadog은 이러한 주석을 사용하여 Container Image Vulnerabilities 패널에 Dockerfile 미리 보기를 표시하고, 취약점과 관련된 정확한 리포지토리, 커밋 및 파일 경로를 제공합니다.

소스 연결을 설정하는 방법은 CI/CD 컨테이너 이미지 스캔 가이드의 [Dockerfile을 취약점에 연결][22]을 참조하세요.

## 자동화 및 Jira 통합 {#automation-and-jira-integration}
[보안 알림 규칙][17]과 [자동화 파이프라인(미리 보기)][20]을 설정하여 Cloud Security Vulnerabilities를 일상적인 워크플로에 통합합니다.
- 범위 내에서 악용 가능한 취약점이 탐지되면 알림을 수신
- Jira 티켓을 자동으로 생성
- 취약점을 해결하기 위한 SLA를 구성

{{< img src="security/vulnerabilities/csm-notifications.png" alt="알림 규칙 설정 화면" width="100%">}}

## 추적 및 보고 {#tracking-and-reporting}
기본 제공되는 [Cloud Security Vulnerabilities 대시보드][18]를 사용하여 진행 상황을 추적하고 이해관계자에게 보고합니다. 필요에 따라 복제하고 수정하여 환경에 맞게 사용할 수 있습니다.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="Cloud Security Vulnerabilities 대시보드" width="100%">}}

## 인프라 패키지 탐색 {#explore-infrastructure-packages}

[인프라 패키지 카탈로그][19]는 인프라에 배포된 모든 호스트, 호스트 이미지 및 컨테이너 이미지의 패키지에 대한 실시간 인벤토리를 제공합니다. 또한 취약점 및 런타임 컨텍스트가 포함된 SBOM을 조사할 수 있는 인터페이스를 제공합니다.

영향을 받는 패키지 버전을 검색하고 이를 사용하는 모든 리소스를 식별하여 새롭게 등장한 심각한 취약점의 영향을 빠르게 평가할 수 있습니다.

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="취약점 컨텍스트와 이를 사용하는 리소스로 이동하는 기능을 제공하는 인프라 배포 패키지 인벤토리" width="100%">}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /ko/security/code_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/container-images
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /ko/security/code_security/iast/
[11]: /ko/security/cloud_security_management/setup/agentless_scanning/
[12]: /ko/security/cloud_security_management/setup/agent
[13]: /ko/security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /ko/security/cloud_security_management/troubleshooting/vulnerabilities/
[16]: https://www.datadoghq.com/product-preview/ecr-vulnerability-scanning/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: https://app.datadoghq.com/dash/integration/csm_vulnerabilities?fromUser=true&refresh_mode=sliding&from_ts=1733323465252&to_ts=1733928265252&live=true
[19]: https://app.datadoghq.com/security/catalog/libraries
[20]: https://www.datadoghq.com/product-preview/security-automation-pipelines/
[21]: /ko/security/cloud_security_management/setup/ci_cd
[22]: /ko/security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}