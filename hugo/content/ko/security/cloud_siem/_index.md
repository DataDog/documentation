---
aliases:
- /ko/security_monitoring/
- /ko/security_platform/cloud_siem/security_home/
- /ko/security_platform/cloud_siem/
- /ko/security/cloud_siem/security_home/
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-cloud-siem
  tag: 학습 센터
  text: Cloud SIEM 소개
- link: https://learn.datadoghq.com/courses/cloud-siem-automated-remediation
  tag: 학습 센터
  text: Security Workflows를 통한 위협 조사 및 수정 자동화
- link: https://www.datadoghq.com/blog/cloud-siem-cases/
  tag: 블로그
  text: Datadog Cloud SIEM의 Case Management를 통해 보안 신호를 구조화된 조사로 전환하기
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: 블로그
  text: Datadog을 통한 Google Cloud AI 스택 평가, 최적화 및 보안 강화하기
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: 블로그
  text: 'Cloud SIEM의 새로운 기능: AI 기반 조사, 향상된 위협 인텔리전스, 확장 가능한 보안 운영'
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: 블로그
  text: Datadog Observability Pipelines를 통한 MSSP의 로그 수집 및 집계 간소화하기
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: 블로그
  text: 'Datadog Cloud SIEM: 보안 운영의 혁신을 주도하기'
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: 블로그
  text: Datadog Case Management를 통해 문제를 선제적으로 추적, 분류 및 할당하기
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: 블로그
  text: Datadog 워크플로 및 Cloud SIEM으로 일반적인 보안 작업을 자동화하고 위협에 대비하기
- link: https://www.datadoghq.com/blog/soar/
  tag: 블로그
  text: Datadog SOAR 워크플로를 통해 ID 보호, 위협 억제, 위협 인텔리전스 자동화하기
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog Audit Trail로 팀 전반에 규정 준수, 거버넌스 및 투명성 구축하기
- link: https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/
  tag: 블로그
  text: Stratus Red Team 및 Datadog Cloud SIEM을 사용하여 AWS 위협 에뮬레이션 및 탐지 검증하기
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM으로 1Password 모니터링하기
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: 블로그
  text: 클라우드 환경에 충분한 보안 적용 범위 구축하기
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: 블로그
  text: 네트워크 및 보안 분석을 위해 DNS 로그 모니터링하기
- link: https://www.datadoghq.com/blog/akamai-zero-trust-application-security/
  tag: 블로그
  text: Datadog Cloud SIEM으로 Akamai Zero Trust와 Application Security 모니터링하기
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: 블로그
  text: 공격자가 Microsoft 365 서비스를 악용하는 방법
- link: https://www.datadoghq.com/blog/monitor-security-metrics/
  tag: 블로그
  text: Datadog으로 조직의 보안 태세를 모니터링하기
- link: https://www.datadoghq.com/blog/risky-behavior-cloud-environments/
  tag: 블로그
  text: 클라우드 환경에서 위험한 행동 식별하기
- link: https://www.datadoghq.com/blog/detect-phishing-activity-amazon-ses/
  tag: 블로그
  text: 'Amazon SES 모니터링: 클라우드에서 피싱 캠페인 탐지하기'
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM을 사용하여 코드형 탐지를 구축, 테스트 및 확장하기
title: Cloud SIEM
---
{{< learning-center-callout header="교육 웨비나 세션 참가" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Datadog Cloud SIEM 및 Cloud Security가 역동적인 클라우드 규모의 환경에서 조직의 위협 탐지 및 조사 역량을 어떻게 향상하는지 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

Datadog Cloud SIEM(Security Information and Event Management)은 보안 데이터를 분석하고 상관관계를 파악하는 시스템입니다. 이를 통해 보안 운영 팀 전체가 보안 문제를 조회, 탐지, 조사하고 대응할 수 있습니다. Datadog의 확장 가능한 플랫폼을 활용하는 Cloud SIEM은 Datadog Agent 및 API 기반 통합을 통해 클라우드와 온프레미스 시스템 모두에서 텔레메트리를 수집합니다.

효과적인 보안 대응에는 속도, 컨텍스트, 통찰력 및 자동화가 필요합니다. Cloud SIEM은 유입되는 데이터를 지속적으로 분석하여 위협을 탐지하고, 대응 가능한 보안 신호를 생성하며, 여러 소스의 보안 신호를 상관 분석합니다. 이를 통해 팀은 인시던트를 조사하고 신속하게 대응할 수 있습니다.

팀이 최신 공격 동향을 파악할 수 있도록 Datadog은 클라우드 및 온프레미스 시스템 전반의 페타바이트급 텔레메트리를 분석하여 새로운 위협과 공격자 행동을 식별하는 위협 연구원 팀도 운영하고 있습니다. 최근 조사에 관한 기사를 읽으려면 [Datadog Security Labs][1]를 참조하세요.

### 보안 및 관측 가능성 {#security-and-observability}

Cloud SIEM은 클라우드 및 온프레미스 텔레메트리를 보안 워크플로에 직접 포함하여 조사 및 대응 속도를 높입니다. 또한 DevOps 팀과 보안 팀을 연결하는 공유 플랫폼을 통해 조직은 사일로를 허물고 협력하여 효율적으로 위협에 대응할 수 있습니다.

### 보안 데이터의 유연한 비용 관리 {#flexible-cost-control-for-security-data}

조직이 확장됨에 따라 가시성을 저해하지 않으면서 보안 로그 수집 비용을 제어하는 것이 중요합니다. Cloud SIEM은 Datadog Log Management와 통합되어 있어 보안 로그에 적합한 보존 및 쿼리 기능을 선택할 수 있습니다. 이러한 유연성은 비용 효율성과 위협 탐지 요구 사항 사이의 균형을 맞추는 데 도움이 됩니다.

다음 옵션 중 하나를 사용하여 로그를 저장하세요.
- [Standard indexing][6]: 컴퓨팅 리소스를 가장 많이 사용하며 자주 쿼리해야 하는 로그에 적합합니다.
- [Flex Logs][7]: 장기간 보관해야 하지만 때로는 긴급하게 쿼리해야 하는 로그에 적합합니다.
- [Log Archives][8] 쿼리 빈도가 낮고 장기간 보관해야 하는 로그에 적합합니다.

### Guided 보안 데이터 온보딩 {#guided-security-data-onboarding}

Cloud SIEM [Content Packs][9]은 보안 팀을 위해 선별된 Datadog 통합 모음입니다. 각 콘텐츠 팩에는 통합 구성 방법과 탐지 규칙, 기본 제공 대화형 대시보드, 구문 분석 도구, SOAR 워크플로 등 포함된 항목에 대한 지침이 있습니다. Content Packs는 보안 문제를 조사하는 데 도움이 되도록 각 통합에 특화된 대응 가능한 인사이트를 강조합니다.

### 콘텐츠 팩 상태 모니터링 {#content-pack-health-monitoring}

콘텐츠 팩을 활성화하면 통합의 상태를 확인할 수 있으며, 문제가 발생할 경우 가능한 한 빨리 정상 운영을 재개할 수 있도록 문제 해결 단계를 안내합니다.

### 로그 검색 및 분석 {#log-search-and-analysis}

패싯을 사용하거나 로그의 필드를 직접 클릭하여 로그 탐색기에서 검색을 구성하세요. 또는 Bits AI와 자연어 검색을 사용하여 중요한 보안 이벤트를 찾으세요. 보안 팀은 내장된 그룹화 및 표 조회 기능과 패턴 분석 및 시각화 기능을 통해 데이터에서 보안 인사이트를 얻을 수 있습니다. 자세한 내용은 [Log Explorer][11] 및 [로그 검색 구문][10]을 참조하세요.

## 시작하기 {#get-started}

Datadog 계정이 아직 없는 경우 [무료 체험][2]에 가입하세요. Datadog 계정에 로그인한 후 다음 단계를 따르세요.

1. [Cloud SIEM][12]으로 이동합니다.
1. {{< ui >}}Enable Cloud SIEM{{< /ui >}}을 클릭합니다.
1. 온보딩 단계를 따릅니다.

더 자세한 설정 지침은 [Getting Started Guide][4]를 참조하세요.

## Cloud SIEM 개요 페이지 {#cloud-siem-overview-page}

[Cloud SIEM 개요 페이지][3]로 이동하세요. 이 페이지에서 보안 분석가, 보안 및 탐지 엔지니어, 보안 운영 센터(SOC) 관리자를 위한 주요 보안 인사이트를 확인하고 일반적인 워크플로를 수행하세요. 개요 페이지에서 다음 작업을 수행할 수 있습니다.
- 중요한 신호, 진행 중인 케이스 및 고위험 엔터티에 액세스할 수 있습니다.
- 온보딩 작업을 완료하고 콘텐츠 팩 상태를 검토합니다.
- 지역 또는 인터넷 서비스 제공업체(ISP)별로 주요 신호를 조회하고 조사합니다.
- MITRE ATT&CK 전술별로 신호와 규칙을 분석합니다.
- 탐지 성능(평균 탐지 시간(MTTD), 오탐률)을 추적합니다.
- 최신 [Security Labs][1] 연구 및 릴리스 정보를 읽어보세요.

{{< ui >}}Customize Page{{< /ui >}}를 클릭하여 모듈의 순서를 변경하거나 모듈을 숨기고 중요한 내용을 확인하세요.

아래에서 각 Cloud SIEM 개요 페이지 섹션에 대해 자세히 알아보세요.

### 보안 범위 {#security-coverage}

{{< img src="security/security_monitoring/landing/01_security_coverage.png" alt="11개의 활성 콘텐츠 팩과 1개의 손상된 콘텐츠 팩, 그리고 Cloud SIEM에서 분석한 로그의 막대그래프를 보여주는 보안 범위 섹션입니다." style="width:100%;" >}}

데이터 처리 문제나 보안 범위의 공백을 지속적으로 파악하세요.

#### 활성화된 콘텐츠 팩 및 통합 {#enabled-content-packs-and-integrations}

포괄적인 보안 범위를 제공하기 위해 주요 범주 전반에서 활성화된 콘텐츠 팩과 통합을 조회하세요. 가로 막대의 각 섹션 위로 마우스를 가져가면 각 범주에서 어떤 콘텐츠 팩이 활성화되어 있는지 확인할 수 있습니다.

#### 콘텐츠 팩 및 로그 상태 KPI {#content-pack-and-logs-health-kpis}

콘텐츠 팩이나 통합이 경고 또는 중단 상태인지 확인하여 커버리지 격차를 해결하세요. 상태 타일을 클릭하여 영향을 받는 콘텐츠 팩을 조회하세요.

#### 분석된 로그 {#logs-analyzed}

주요 로그 소스 전반의 로깅 추세를 조회하고 비정상적인 급증이나 급락을 식별하세요. 하단의 범례를 클릭하여 소스별 추세를 탐색하세요.

### 중요 신호 및 케이스 {#important-signals-and-cases}

{{< img src="security/security_monitoring/landing/02_important_signals_cases.png" alt="" style="width:100%;" >}}

환경에서 발생하는 다음과 같은 주요 이벤트를 확인하세요.

#### 규칙별로 그룹화된 최근 미해결 신호 {#recent-open-signals-grouped-by-rule}

규칙 이름별로 그룹화되고 심각도별로 정렬된 신호를 조회하여 환경에서 가장 중요한 신호의 개요를 파악하세요. 신호나 심각도 배지를 클릭하여 Signal Explorer의 필터링된 보기에서 자세한 내용을 조회하세요.

#### 최근 미해결 보안 케이스 {#recent-open-security-cases}

[Case Management][5]를 사용하여 추가 분석이 필요한 신호를 추적하세요. 환경 내 활성 보안 케이스를 조회하고 케이스를 클릭하여 자세한 내용을 조회하세요.

### 엔터티 위험 {#entity-risks}

{{< img src="security/security_monitoring/landing/03_entity_risks.png" alt="상위 위험 엔터티, 엔터티 유형별 분류 및 위험 심각도별 엔터티 수를 보여주는 Cloud SIEM 개요 페이지의 엔터티 위험 섹션" style="width:100%;" >}}

환경 내 위험 엔터티를 검토하세요.

#### 상위 위험 엔터티 {#top-risky-entities}

가장 높은 위험 점수를 가진 엔터티를 조회하세요. 엔터티를 클릭하여 자세한 내용을 조회하고 조치를 취하세요.

#### 엔터티 유형별 분류 {#entity-type-breakdown}

환경에서 가장 일반적인 엔터티 유형을 조회하세요. 원형 차트의 조각을 클릭하여 유형별로 엔터티 목록을 필터링하세요.

#### 엔터티 위험 점수 분석 {#entities-risk-score-breakdown}

심각도별로 엔터티를 조회하세요. 심각도 타일을 클릭하여 해당 심각도의 엔터티 목록을 조회하세요.

### 위협 지도 {#threat-map}

{{< img src="security/security_monitoring/landing/04_threat_map.png" alt="" style="width:100%;" >}}

환경 내 신호가 생성되는 위치에 대한 인사이트를 얻으세요.

#### 국가별 상위 IP 분포 {#top-ips-by-country-distribution}

중요한 신호와 덜 중요한 신호의 세부 분석을 통해 가장 많은 신호를 생성하는 IP를 확인하세요. 또한 지도를 사용하여 국가별 신호 목록을 확인할 수 있습니다.

#### 국가별 신호 {#signals-by-country}

신호가 발생하는 위치별 비율 분석을 확인하세요. 원형 차트 조각을 클릭하여 국가 및 주 또는 도별로 필터링하고 예상치 못한 위치에서 발생하는 신호를 식별하세요.

#### ISP 공급자별 신호 {#signals-by-isp-provider}

어떤 ISP가 신호를 보내고 있는지 검토하세요. 원형 차트 조각을 클릭하여 공급자 및 위치별로 범위를 좁히세요.

### 보안 개요 {#security-overview}

{{< img src="security/security_monitoring/landing/05_security_overview.png" alt="" style="width:100%;" >}}

모든 신호에 대한 상위 수준의 개요

#### 신호 분포 {#signal-distribution}

섹션 왼쪽에서 선택한 시간 범위 동안 심각도 및 추세별로 그룹화된 신호를 조회하세요.
오른쪽에서 심각도, 소스 및 해결 상태별 신호 활동 분석을 조회하세요. 생키 다이어그램의 노드를 클릭하면 해당 노드의 세부 정보에 따라 필터링된 신호를 Signal Explorer에서 조회할 수 있습니다.

#### 신호 대응 평균 시간{#mean-time-to-respond-to-signals}

팀의 대응 속도에 대한 KPI를 확인하세요. 심각도 타일을 클릭하여 `under review` 또는 `archive`로 설정되고 선택한 심각도로 필터링된 신호를 조회하세요.

### MITRE ATT&CK 커버리지 {#mitre-attck-coverage}

{{< img src="security/security_monitoring/landing/06_mitre_coverage.png" alt="" style="width:100%;" >}}

MITRE ATT&CK 전술 및 기술별 탐지 규칙 커버리지와 신호 활동입니다.

#### 규칙이 1개 이상 있는 기술 {#techniques-with-at-least-1-rule}

환경에서 활성화된 탐지 규칙이 몇 개의 기술을 커버하는지 확인하세요.

#### 규칙 밀도 KPI{#rule-density-kpis}

규칙 밀도가 높거나 중간이거나 낮은 기술 또는 규칙이 전혀 없는 기술이 몇 개인지 조회하세요. 타일을 클릭하여 필터링된 MITRE 맵을 조회하세요.

#### 전술별 신호 조회{#signals-per-tactic-view}

어떤 MITRE ATT&CK 전술이 신호를 생성하는지 조회하세요. 원형 차트 조각을 클릭하여 해당 전술로 필터링된 Signal Explorer를 조회하세요. 드롭다운을 클릭하고 {{< ui >}}Rules count{{< /ui >}}를 선택하여 가장 많은 규칙이 매핑된 전술을 조회하세요. 규칙 수별로 조회할 때 원형 차트 조각을 클릭하면 해당 전술로 필터링된 탐지 규칙 탐색기 보기가 생성됩니다.

#### 기술별 신호 조회{#signals-per-technique-view}

어떤 MITRE ATT&CK 기술이 신호를 생성하는지 조회하세요. 원형 차트 조각을 클릭하여 기술별로 필터링된 Signal Explorer를 조회하세요. 드롭다운을 클릭하고 {{< ui >}}Rules count{{< /ui >}}를 선택하여 가장 많은 규칙이 매핑된 기술을 조회하세요. 규칙 수별로 조회할 때 원형 차트 조각을 클릭하여 해당 기술로 필터링된 탐지 규칙 탐색기를 조회하세요.

### 탐지 규칙 성능 {#detection-rules-performance}

{{< img src="security/security_monitoring/landing/07_detection_rule_performance.png" alt="" style="width:100%;" >}}

탐지 규칙 성능에 대해 더 깊이 이해하세요. Cloud SIEM에서 신호를 분류할 때 이 섹션을 가장 효과적으로 활용할 수 있습니다.

#### Cloud SIEM용 MTTD KPI {#mttd-kpis-for-cloud-siem}

모든 신호에 대한 평균 탐지 시간(MTTD)을 조회하세요. 아래 타일은 심각도가 중요, 높음, 중간인 신호의 MTTD를 보여줍니다. 타일을 클릭하여 Signal Explorer에서 해당 심각도의 신호를 조회하세요.

#### 신호 활동 {#signal-activity}

선택한 시간 범위 동안의 신호 추세를 조회하세요. 막대그래프 하단의 심각도 확인란을 선택하여 심각도별로 범위를 좁히세요. 이는 비정상적인 급증이나 급락을 식별하는 데 유용할 수 있습니다.

#### 중요 신호 변경별 규칙(1주) {#rules-by-important-signal-change-1-week}

지난주와 비교하여 중요 신호 활동이 증가한 규칙을 조회하세요. 규칙 이름을 클릭하여 해당 규칙 이름으로 필터링된 신호를 Signal Explorer에서 조회하세요.

#### 심각도 변경별 신호(1주) {#signals-by-severity-change-1-week}

지난주와 비교하여 모든 신호의 심각도가 어떻게 변경되었는지 조회하세요. 심각도를 클릭하여 Signal Explorer에서 해당 심각도의 신호를 조회하세요.

#### 아카이브 사유별 중요 신호 {#important-signals-by-archived-reason}

아카이브 사유별로 아카이브된 신호 수를 확인하세요. 사유를 클릭하여 해당 보관 사유로 필터링된 Signal Explorer를 조회하세요.

#### 진양성(악성)으로 아카이브된 규칙 {#rules-archived-with-true-positive-malicious}

`True Positive: Malicious`로 아카이브된 규칙을 확인하세요. 규칙을 클릭하여 Signal Explorer에서 신호를 조회하세요.

#### 진양성(정상)으로 아카이브된 규칙 {#rules-archived-with-true-positive-benign}

`True Positive: Benign`으로 아카이브된 규칙을 확인하세요. 규칙을 클릭하여 Signal Explorer에서 신호를 조회하세요.

#### 오탐률별 규칙 {#rules-by-false-positive-rate}

규칙이 생성한 전체 신호 중 오탐으로 표시된 신호의 비율을 계산하여 노이즈가 가장 많은 규칙을 확인하세요. 규칙을 클릭하여 Signal Explorer에서 해당 규칙의 신호를 조회하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://securitylabs.datadoghq.com/
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://app.datadoghq.com/security/siem/home?
[4]: /ko/getting_started/security/cloud_siem/
[5]: /ko/security/cloud_siem/investigate_security_signals/#case-management
[6]: /ko/logs/log_configuration/indexes
[7]: /ko/logs/log_configuration/flex_logs/
[8]: /ko/logs/log_configuration/archives/
[9]: /ko/security/cloud_siem/content_packs/
[10]: /ko/logs/explorer/search_syntax/
[11]: /ko/logs/explorer/
[12]: https://app.datadoghq.com/security/siem/intro