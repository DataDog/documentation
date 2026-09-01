---
algolia:
  tags:
  - data retention
aliases:
- /ko/developers/faq/data-collection-resolution-retention/
- /ko/developers/guide/data-collection-resolution-retention
attributes:
- data_type: '- **오류**: 15일

    - **인덱싱된 스팬**: 15일 또는 30일(고객 플랜에 따라 결정)

    - **서비스/리소스 통계**: 30일

    - **조회된 트레이스**: 계정 유지 기간 동안 보관

    '
  product: APM
- data_type: '- **Security 신호**: 15개월

    - **스팬**: 90일

    '
  product: App and API Protection
- data_type: '- **감사 로그(Audit Trail 활성화됨)**: 90일

    - **감사 로그(Audit Trail 비활성화됨)**: 7일

    '
  product: Audit Trail
- data_type: '- **메시지**: 15개월

    '
  product: Bits Chat
- data_type: '- **소스 코드**: 7일

    '
  product: Bits Code
- data_type: '- **조사**: 계정 유지 기간 동안 보관

    '
  product: Bits Investigation
- data_type: '- **세션, 조회, 액션 및 오류 이벤트**: 30일

    - **리소스, 장기 작업 및 바이탈 이벤트**: 15일

    '
  product: Browser RUM
- data_type: '- **케이스**: 계정 유지 기간 동안 보관

    '
  product: Case Management
- data_type: '- **배포**: 30일

    '
  product: CD Visibility
- data_type: '- **Pipelines, 스테이지, 작업, 설정, 명령**: 15개월

    '
  product: CI Pipeline Visibility
- data_type: '- **비용 메트릭**: 15개월

    - **권장 사항**: 90일

    '
  product: Cloud Cost Management
- data_type: '- **탐지 결과 및 해결된 취약점**: 15개월

    '
  product: Cloud Security
- data_type: '- **신호**: 15개월

    - **탐지, 알림, 억제**: 계정 유지 기간 동안 보관

    '
  product: Cloud SIEM
- data_type: '- **이벤트**: 90일

    - **Security 신호**: 15개월

    '
  product: Workload Protection
- data_type: '- **스캔**: 15개월

    '
  product: Code Security SAST
- data_type: '- **탐지된 취약점**: 15개월

    '
  product: Code Security IAST
- data_type: '- **컨테이너 메타데이터**: 2시간

    - **실시간 프로세스 및 컨테이너**: 36시간

    - **YAML 정의**: 7일

    '
  product: Container and Process Monitoring
- data_type: '- **플레임 그래프, 호출 그래프 및 스레드 타임라인**: 8일

    - **노트북으로 내보낸 플레임 그래프**: 1년

    - **UI에서 최소 한 번 이상 열린 개별 프로필**: 1년

    - **프로필 메트릭**: 30일

    '
  product: Continuous Profiler
- data_type: '- **배치 결과**: 2개월

    - **테스트 결과**: 2개월

    '
  product: Continuous Testing
- data_type: '- **작업 트레이스**: 90일

    '
  product: 'Data Observability: Jobs Monitoring'
- data_type: '- **쿼리 샘플**: 15일

    - **쿼리 메트릭**: 15개월

    '
  product: Database Monitoring
- data_type: '- **Dashboards, Notebooks, Monitors**: 계정 유지 기간 동안 보관

    '
  product: Datadog App
- data_type: '- **배포**: 2년

    '
  product: DORA Metrics
- data_type: '- **오류 샘플**: 30일

    - **이슈**: 마지막 활동 후 1년

    '
  product: Error Tracking
- data_type: '- **이벤트**: 15개월

    '
  product: Event Management
- data_type: '- **인시던트**: 계정 유지 기간 동안 보관

    '
  product: Incident Management
- data_type: '- **프로덕션 트레이스 및 스팬**: 15(기본값), 30, 60 또는 90일(고객 플랜에 따라 결정)

    - **실험 트레이스 및 스팬**: 15(기본값), 90, 180, 270, 365일(고객 플랜에 따라 결정)

    - **데이터세트**: 3년

    '
  product: Agent Observability
- data_type: '- **로그**: 고객 플랜에 따라 결정

    - **Sensitive Data Scanner 예시 로그**: <span class="d-none site-region-container"
    data-region="us,us3,us5,eu,ap1,ap2,uk1">3일</span><span class="d-none site-region-container"
    data-region="gov,gov2">7일</span>

    '
  product: Log Management
- data_type: '- **태그 및 값**: 15개월

    '
  product: Metrics
- data_type: '- **테스트 결과(UI에 표시되지 않음)**: 2개월

    - **테스트 결과(UI에 표시됨)**: 15개월

    - **모바일 애플리케이션 바이너리**: 계정 유지 기간 동안 보관

    '
  product: Mobile App Testing
- data_type: '- **세션, 조회, 액션 및 오류 이벤트**: 30일

    - **리소스, 장기 작업 및 바이탈 이벤트**: 15일

    '
  product: Mobile RUM
- data_type: '- **NetFlow**: 15, 30, 60 또는 90일(고객 플랜에 따라 결정)

    - **SNMP 트랩**: 고객 플랜에 따라 결정(기본값 15일)

    '
  product: Network Device Monitoring
- data_type: '- **네트워크 트래픽**: 14일

    '
  product: Cloud Network Monitoring
- data_type: '- **Network Path 테스트**: 30일

    '
  product: Network Path
- data_type: '- **이벤트**: 15개월

    - **사용자 프로필**: 15개월, 또는 <a href="/product_analytics/guide/rum_and_product_analytics/#how-do-i-set-up-product-analytics">Product
    Analytics가 활성화되지 않은</a> 경우 30일

    '
  product: Product Analytics
- data_type: '- **게이트 평가**: 30일

    '
  product: Quality Gates
- data_type: '- **표**: 계정 유지 기간 동안 보관

    '
  product: Reference Tables
- data_type: '- **서비스 메타데이터**: 계정 유지 기간 동안 보관

    '
  product: Service Catalog
- data_type: '- **SLO 결과**: 15개월

    '
  product: Service Level Objectives
- data_type: '- **리플레이(UI의 확장 옵션이 선택되지 않음)**: 30일

    - **리플레이(UI의 확장 옵션이 선택됨)**: 15개월

    '
  product: Session Replay
- data_type: '- **탐지된 취약점**: 15개월

    '
  product: Software Composition Analysis (SCA)
- data_type: '- **소스 코드**: 7일

    '
  product: Source Code Integration
- data_type: '- **테스트 결과**: 15개월

    '
  product: Synthetics
- data_type: '- **테스트**: 3개월

    '
  product: Test Visibility & Intelligent Test Runner
- data_type: '- **워크플로**: 30일

    '
  product: Workflow Automation
content: 다음 표는 데이터 유형 및 제품별 기본 데이터 보존 기간을 보여줍니다. 원하는 데이터 유형이나 제품을 찾으려면 키워드 또는 설명 텍스트로
  검색할 수 있습니다. 수집 간격 및 최소 해상도 정보는 [Datadog 데이터 수집 및 해결](/extend/guide/data-collection-resolution)을
  참조하세요. 도움이 더 필요하신가요? [Datadog 지원팀](/help)에 문의하세요.
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 제출된 주요 데이터 카테고리 검토
title: 데이터 보관 기간
type: data_retention_periods
---
### 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}