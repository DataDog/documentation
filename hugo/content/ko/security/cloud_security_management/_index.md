---
algolia:
  tags:
  - csm
  - cloud security management
  - inbox
aliases:
- /ko/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: Cloud Security
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: 설명서
  text: Cloud Security Misconfigurations를 사용하여 구성 오류 추적 시작
- link: /security/research_feed
  tag: 설명서
  text: Security Research Feed
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: 블로그
  text: Stratus Red Team을 통한 AWS 위협 감지 향상
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: 블로그
  text: Kubernetes 애플리케이션 보안 모범 사례
- link: https://www.datadoghq.com/blog/workload-security-evaluator/
  tag: 블로그
  text: Datadog의 Workload Security Evaluator를 사용하여 컨테이너 환경에서 Atomic Red Team 탐지 테스트
    실행
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: 블로그
  text: Datadog Security Labs Ruleset로 일반적인 클라우드 보안 위험 해결
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: 블로그
  text: 클라우드 네이티브 환경의 애플리케이션 보안 모범 사례
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: 블로그
  text: 클라우드 환경에 대한 충분한 보안 커버리지 구축
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings-2024/
  tag: 블로그
  text: 2024년 Cloud Security 현황 연구에서 얻은 주요 인사이트
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: 블로그
  text: Datadog Security Inbox의 보안 위험 우선 순위 지정 방법
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: 블로그
  text: Datadog을 DaC(Detection as Code)로 사용하는 방법
- link: https://www.datadoghq.com/blog/shared-responsibility-model/
  tag: 블로그
  text: '공유 책임 모델 간소화: 클라우드 보안 의무를 충족하는 방법'
- link: https://www.datadoghq.com/blog/detect-bedrock-misconfigurations-cloud-security
  tag: 블로그
  text: Datadog Cloud Security를 사용해 Amazon Bedrock의 구성 오류 탐지
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: 블로그
  text: Datadog Cloud Security를 사용해 리소스 간 노출 경로 추적
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: 블로그
  text: Datadog Cloud Security를 사용해 글로벌 프레임워크 전반에 규정 준수 확장
- link: https://www.datadoghq.com/blog/ec2-ami-risks
  tag: 블로그
  text: 'AWS AMI 보안: 잘못 구성된 AMI 또는 퍼블릭 AMI가 클라우드 공격 표면 확대에 미치는 영향'
- link: https://www.datadoghq.com/blog/cloud-security-oci
  tag: 블로그
  text: Datadog Cloud Security를 사용해 OCI 리소스 보호
title: Cloud Security
---
{{< learning-center-callout header="교육 웨비나 세션 참가" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Datadog Cloud SIEM 및 Cloud Security가 동적, 클라우드 규모 환경에서 위협 탐지 및 조사 역량을 어떻게 향상하는지 알아보세요. 
{{< /learning-center-callout >}}

Datadog Cloud Security는 클라우드 인프라 전반에 걸쳐 심층적인 가시성, 지속적인 구성 감사, ID 위험 평가, 취약성 탐지 및 실시간 위협 탐지를 제공하며, 이 모든 기능을 통합 플랫폼에서 제공하여 원활한 협업과 신속한 문제 해결을 지원합니다.

보안 및 DevOps 팀에서 관측 가능성 및 보안 데이터의 공유 컨텍스트에 기반해 행동을 취하여 신속하게 문제의 우선 순위를 지정하고 문제를 해결할 수 있습니다.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서는 Agentless Scanning을 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Cloud Security는 Datadog Agent와 Agentless를 모두 활용합니다. 조직 보안의 다양한 측면을 관리하기 위해 활성화할 수 있는 다양한 기능이 포함되어 있습니다:

- [{{< ui >}}Misconfigurations{{< /ui >}}][2]: 프로덕션 환경의 보안 위생 및 규정 준수 태세를 추적하고, 감사 증거 수집을 자동화하며, 조직을 공격에 취약하게 만드는 구성 오류를 해결하도록 지원합니다.
- [{{< ui >}}Identity Risks{{< /ui >}}][8]: 조직의 AWS IAM, Azure 및 GCP 위험에 대한 심층적인 가시성을 제공하며, 지속적으로 ID 위험을 탐지하고 해결할 수 있게 해줍니다.
- [{{< ui >}}Vulnerabilities{{< /ui >}}][9]: 인프라에서 실행 중인 컨테이너 이미지, 호스트 이미지 및 호스트에서 악용 가능한 취약성을 지속적으로 탐지하고, 우선 순위를 지정하고, 해결합니다.

Cloud Security에는 다음과 같은 Datadog Security 기능에 대한 액세스 권한도 포함됩니다.
- [탐지 규칙][18]
- [Notifications][6]
- [자동화 파이프라인][19]
- [Security Inbox][14]
- [Audit Trail][20]
- [Security Research Feed][16]

{{< img src="security/csm/csm_overview_5.png" alt="Datadog의 Cloud Security 요약" width="100%">}}

{{< partial name="security-platform/CSW-billing-note.html" >}}

## 조직의 상태 추적{#track-your-organizations-health}

### 홈페이지 대시보드 관리{#manage-homepage-dashboards}

Cloud Security 홈페이지에서 직접 액세스할 수 있는 대시보드를 사용자 지정할 수 있으며, 한 대시보드를 기본 홈페이지 보기로 설정할 수도 있습니다. 대시보드를 사용해 해결 프로젝트의 우선 순위를 지정하고, 보고서를 예약하고, 보안 데이터를 관측 가능성 및 비용 데이터와 나란히 놓고 비교하고, 보고 보기에서 직접 시작할 수 있도록 앱과 워크플로를 임베딩하세요. 

[Cloud Security 홈페이지][4]의 {{< ui >}}Dashboards{{< /ui >}} 섹션에서 ID 위험, 구성 오류 또는 취약성에 대한 대시보드로 바로 이동할 수 있습니다. 기존 대시보드를 추가할 수도 있고, 새로 만들어서 Cloud Security 홈페이지 사이드바에 유지하며 편리하게 액세스할 수도 있습니다.

또한 {{< ui >}}More Options{{< /ui >}} 아이콘을 클릭하여 {{< img src="icons/kebab.png" inline="true" style="height:1em" >}} 고정된 대시보드를 관리할 수 있습니다. 그중 하나를 Cloud Security 홈페이지의 기본 보기로 설정할 수도 있습니다. Datadog 탐색 모음에서 {{< ui >}}Cloud Security{{< /ui >}}를 클릭하거나 Cloud Security 탐색 모음에서 {{< ui >}}Summary{{< /ui >}}를 클릭하면 고정된 대시보드로 바로 이동할 수 있습니다.

자세한 정보는 [대시보드][23]를 참조하세요.

### 보안 태세 점수 추적{#track-your-security-posture-score}

[Cloud Security 구성 오류][2]에서 사용할 수 있는 [보안 태세 점수][5]는 조직의 전반적인 상태를 추적하는 데 도움이 됩니다. 이 점수는 환경에서 활성 기본 제공 클라우드 및 인프라 규정 준수 규칙을 모두 충족하는 항목의 백분율을 나타냅니다.

조직의 점수를 개선하려면 구성 오류를 해결하세요. 근본적인 문제를 해결하거나, 구성 오류를 음소거하면 됩니다.

{{< img src="security/csm/health_scores.png" alt="Cloud Security 개요 페이지의 태세 점수는 조직의 전반적인 상태를 추적합니다." width="100%">}}

## 문제 탐색 및 해결 {#explore-and-remediate-issues}

Cloud Security, Code Security, App and API Protection 및 Workload Protection 전반의 보안 발견 사항을 중요도순으로 확인하려면 [Security Inbox][14]를 사용하세요.

더 자세한 세부 정보를 얻으려면 [발견 사항][7]을 사용해 구성 오류, 취약성 및 ID 위험과 관련된 조직의 보안 발견 사항을 검토하고 해결하세요. 가이드라인 및 해결 단계 등 발견 사항에 관한 상세한 정보를 조회합니다. 환경에서 위협이 탐지되었을 때 [실시간 알림을 보내고][6], 태그를 사용해 피해가 발생하는 리소스의 담당자를 표시합니다.

{{< img src="security/csm/findings_page_2.png" alt="Cloud Security Findings 페이지" width="100%">}}

## 리소스 조사 {#investigate-resources}

- [Security Graph][17]를 사용하여 클라우드 환경을 관계 그래프로 모델링하면 클라우드 리소스 간의 연결 관계를 시각화하고 쿼리할 수 있습니다. 쿼리를 작성해 리소스 간 특정 관계를 검색할 수 있습니다. 예를 들어 공개적으로 액세스할 수 있는 EC2 인스턴스 중에서 민감한 데이터가 포함된 S3 버킷에 액세스할 수 있는 것이 무엇인지 알아내 그러한 인프라 위험을 선제적으로 완화할 수 있습니다.
  {{< img src="security/csm/security_graph.png" alt="EC2 인스턴스 예시를 표시한 Security Graph" width="100%">}}
- [Resource Catalog][12]를 사용해 환경의 호스트 및 리소스에서 보고된 구성 오류 및 위협을 조회합니다. 자세한 정보는 [Resource Catalog][13] 설명서를 참조하세요.
  {{< site-region region="gov,gov2" >}}
  <div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 Resource Catalog가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
  {{< /site-region >}}
  {{< img src="infrastructure/resource_catalog/resource_catalog_infra_3.png" alt="카테고리 및 구성 오류 기준으로 그룹화된 호스트 및 클라우드 리소스가 표시된 Resource Catalog 맵 보기입니다." style="width:100%;" >}}
- [Cloudcraft Security Map][21]을 사용해 리소스 및 그와 관련된 각종 구성 오류, 취약성, ID 위험 또는 민감한 데이터를 시각화합니다. 이러한 오버레이에 대한 자세한 정보는 [Cloudcraft 오버레이][22] 설명서를 참조하세요.

## 주간 다이제스트 보고서 구독 {#subscribe-to-weekly-digest-reports}

지난 한 주 동안의 Cloud Security 활동을 매주 요약해서 받아보세요. 여기에는 지난 7일간 발견된 중요한 새 보안 문제도 포함됩니다. 주간 다이제스트 보고서 구독은 사용자별로 관리됩니다. [주간 다이제스트 보고서를 구독][11]하려면 `security_monitoring_signals_read` 권한이 있어야 합니다.

## 새롭게 출현하는 위협 및 취약성에 관해 알아보기 {#learn-about-emerging-threats-and-vulnerabilities}

[Security Research Feed][15]를 사용해 최신 보안 동향을 파악합니다. 여기에는 Datadog의 Security Research 팀과 Detection Engineering 팀에서 관리하는 콘텐츠가 포함됩니다. 자세한 정보는 [Security Research Feed][16] 설명서를 참조하세요.

## 다음 단계 {#next-steps}

Cloud Security를 시작하려면 Datadog의 [{{< ui >}}Cloud Security Setup{{< /ui >}}][3] 페이지로 이동합니다. 이 페이지에 Cloud Security를 설정하고 구성하는 방법에 대한 자세한 단계가 나와 있습니다. 자세한 정보는 [Cloud Security 설정][10]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/workload_protection/
[2]: /ko/security/cloud_security_management/misconfigurations/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/security/csm
[5]: /ko/glossary/#posture-score
[6]: /ko/security/notifications/
[7]: https://app.datadoghq.com/security/compliance
[8]: /ko/security/cloud_security_management/identity_risks/
[9]: /ko/security/cloud_security_management/vulnerabilities/
[10]: /ko/security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports
[12]: https://app.datadoghq.com/infrastructure/catalog
[13]: /ko/infrastructure/resource_catalog
[14]: /ko/security/security_inbox
[15]: https://app.datadoghq.com/security/feed
[16]: /ko/security/research_feed
[17]: /ko/security/cloud_security_management/security_graph
[18]: /ko/security/detection_rules/
[19]: /ko/security/automation_pipelines/
[20]: /ko/security/audit_trail/
[21]: https://app.datadoghq.com/security/map
[22]: /ko/datadog_cloudcraft/overlays/#security
[23]: /ko/dashboards/