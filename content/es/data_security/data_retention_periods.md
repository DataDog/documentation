---
algolia:
  tags:
  - data retention
aliases:
- /es/developers/faq/data-collection-resolution-retention/
- /es/developers/guide/data-collection-resolution-retention
attributes:
- data_type: '- **Errors**: 15 days

    - **Indexed spans**: 15 or 30 days, determined by customer plan

    - **Services/resources statistics**: 30 days

    - **Viewed traces**: Retained for the duration of the account

    '
  product: APM
- data_type: '- **Security signals**: 15 months

    - **Spans**: 90 days

    '
  product: App and API Protection
- data_type: '- **Audit logs (Audit Trail enabled)**: 90 days

    - **Audit logs (Audit Trail disabled)**: 7 days

    '
  product: Audit Trail
- data_type: '- **Messages**: 15 months

    '
  product: Bits AI Assistant
- data_type: '- **Source Code**: 7 days

    '
  product: Bits AI Dev Agent
- data_type: '- **Investigations**: Retained for the duration of the account

    '
  product: Bits AI SRE
- data_type: '- **Session, View, Action, and Error Events**: 30 days

    - **Resource, Long Task, and Vitals Events**: 15 Days

    '
  product: Browser RUM
- data_type: '- **Cases**: Retained for the duration of the account

    '
  product: Case Management
- data_type: '- **Deployments**: 30 days

    '
  product: CD Visibility
- data_type: '- **Pipelines, stages, jobs, setups, commands**: 15 months

    '
  product: CI Pipeline Visibility
- data_type: '- **Recommendations**: 90 days

    '
  product: Cloud Cost Management
- data_type: '- **Findings and resolved vulnerabilities**: 15 months

    '
  product: Cloud Security
- data_type: '- **Signals**: 15 months

    - **Detections, notifications, suppressions**: Retained for the duration of the
    account

    '
  product: Cloud SIEM
- data_type: '- **Events**: 90 days

    - **Security signals**: 15 months

    '
  product: Workload Protection
- data_type: '- **Scans**: 15 months

    '
  product: Code Security SAST
- data_type: '- **Detected vulnerabilities**: 15 months

    '
  product: Code Security IAST
- data_type: '- **Container metadata**: 2 hours

    - **Live processes and containers**: 36 hours

    - **YAML definitions**: 7 days

    '
  product: Container and Process Monitoring
- data_type: '- **Individual profiles (not opened in the UI)**: 8 days

    - **Individual profiles (opened in the UI at least once)**: 1 year

    - **Profile metrics**: 90 days

    '
  product: Continuous Profiler
- data_type: '- **Batch results**: 2 months

    - **Test results**: 2 months

    '
  product: Continuous Testing
- data_type: '- **Sessions**: 15 months

    '
  product: CoScreen
- data_type: '- **Job traces**: 90 days

    '
  product: 'Data Observability: Jobs Monitoring'
- data_type: '- **Query samples**: 15 days

    - **Query metrics**: 15 months

    '
  product: Database Monitoring
- data_type: '- **Dashboards, Notebooks, Monitors**: Retained for the duration of
    the account

    '
  product: Datadog App
- data_type: '- **Deployments**: 2 years

    '
  product: DORA Metrics
- data_type: '- **Error samples**: 30 days

    - **Issues**: 1 year after last activity

    '
  product: Error Tracking
- data_type: '- **Events**: 15 months

    '
  product: Event Management
- data_type: '- **Incidents**: Retained for the duration of the account

    '
  product: Incident Management
- data_type: '- **Production Traces and spans**: 15 (default), 30, 60, or 90 days,
    determined by customer plan

    - **Experiments Traces and spans**: 15 (default), 90, 180, 270, 365 days, determined
    by customer plan

    - **Datasets**: 3 years

    '
  product: Agent Observability
- data_type: '- **Logs**: Determined by customer plan

    '
  product: Log Management
- data_type: '- **Tags and values**: 15 months

    '
  product: Metrics
- data_type: '- **Test results (not displayed in UI)**: 2 months

    - **Test results (displayed in UI)**: 15 months

    - **Mobile application binaries**: Retained for the duration of the account

    '
  product: Mobile App Testing
- data_type: '- **Session, View, Action, and Error Events**: 30 days

    - **Resource, Long Task, and Vitals Events**: 15 Days

    '
  product: Mobile RUM
- data_type: '- **NetFlow**: 15, 30, 60, or 90 days, determined by customer plan

    - **SNMP traps**: Determined by customer plan, default to 15 days

    '
  product: Network Device Monitoring
- data_type: '- **Network traffic**: 14 days

    '
  product: Cloud Network Monitoring
- data_type: '- **Network Path Tests**: 30 days

    '
  product: Network Path
- data_type: '- **Events**: 15 months

    - **User Profiles**: 15 months, or 30 days if <a href="/product_analytics/guide/rum_and_product_analytics/#how-do-i-set-up-product-analytics">Product
    Analytics is not enabled</a>

    '
  product: Product Analytics
- data_type: '- **Gate evaluations**: 30 days

    '
  product: PR Gates
- data_type: '- **Tables**: Retained for the duration of the account

    '
  product: Reference Tables
- data_type: '- **Service metadata**: Retained for the duration of the account

    '
  product: Service Catalog
- data_type: '- **SLO results**: 15 months

    '
  product: Service Level Objectives
- data_type: '- **Replays (extension option in UI is unchecked)**: 30 days

    - **Replays (extension option in UI is checked)**: 15 months

    '
  product: Session Replay
- data_type: '- **Detected vulnerabilities**: 15 months

    '
  product: Software Composition Analysis (SCA)
- data_type: '- **Source Code**: 7 days

    '
  product: Source Code Integration
- data_type: '- **Test results**: 15 months

    '
  product: Synthetics
- data_type: '- **Tests**: 3 months

    '
  product: Test Visibility & Intelligent Test Runner
- data_type: '- **Workflows**: 30 days

    '
  product: Workflow Automation
content: La siguiente tabla enumera los períodos de retención de datos predeterminados
  por tipo de datos y producto. Opcionalmente, busque por palabra clave o texto descriptivo
  para encontrar el tipo de datos o producto que le interesa. Para obtener información
  sobre el intervalo de colección y la resolución mínima, consulte [Datadog Data Collection
  and Resolution](/extend/guide/data-collection-resolution). ¿Aún necesita ayuda?
  Contacte a [Datadog support](/help).
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revise las principales categorías de datos enviados a Datadog
title: Períodos de retención de datos
type: data_retention_periods
---
### Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}