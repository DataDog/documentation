---
title: Data Retention Periods
disable_sidebar: true
type: data_retention_periods
further_reading:
    - link: '/data_security/'
      tag: 'Documentation'
      text: 'Review the main categories of data submitted to Datadog'
filter_all: All
content: "The following table lists the default data retention period by data type and product. Optionally, search by keyword or description text to find the data type or product you're interested in. For collection interval and minimum resolution information, see [Datadog Data Collection and Resolution](/developers/guide/data-collection-resolution-retention). Still need help? Contact [Datadog support](/help)."
attributes: 
  - product: APM
    data_type: |
       - **Errors**: 15 days
       - **Indexed spans**: 15 or 30 days, determined by customer plan
       - **Services/resources statistics**: 30 days
       - **Viewed traces**: 15 months
  - product: Application Security Management
    data_type: |
       - **Security signals**: 15 months
       - **Spans**: 90 days
  - product: Audit Trail
    data_type: |
       - **Audit logs**: 90 days
  - product: Browser RUM
    data_type: |
       - **Events**: 30 days
  - product: Case Management
    data_type: | 
       - **Cases**: Deleted upon request on termination
  - product: CD Visibility
    data_type: | 
       - **Deployments**: 30 days
  - product: CI Pipeline Visibility
    data_type: | 
       - **Pipelines, stages, jobs, setups, commands**: 15 months
  - product: Cloud Cost Management
    data_type: | 
       - **Recommendations**: 90 days
  - product: Cloud Security Management
    data_type: | 
       - **Findings and resolved vulnerabilities**: 15 months
  - product: Cloud SIEM
    data_type: | 
       - **Signals**: 15 months
       - **Detections, notifications, suppressions**: Deleted upon request on termination
  - product: Cloud Workload Security
    data_type: | 
       - **Security signals**: 15 months
       - **Spans**: 90 days
  - product: Code Analysis
    data_type: | 
       - **Scans**: 15 months
  - product: Code Security IAST
    data_type: | 
       - **Detected vulnerabilities**: 15 months
  - product: Container and Process Monitoring
    data_type: | 
       - **Container metadata**: 2 hours
       - **Live processes and containers**: 36 hours
       - **YAML definitions**: 7 days
  - product: Continuous Profiler
    data_type: | 
       - **Profiles (not displayed in the UI)**: 8 days
       - **Profiles (displayed in the UI)**: 1 year
       - **Profile metrics**: 90 days
  - product: Continuous Testing
    data_type: | 
       - **Batch results**: 2 months
       - **Test results**: 2 months
  - product: CoScreen
    data_type: | 
       - **Sessions**: 15 months
  - product: Data Jobs Monitoring
    data_type: | 
       - **Job traces**: 90 days
  - product: Database Monitoring
    data_type: | 
       - **Query samples**: 15 days
  - product: Datadog App
    data_type: | 
       - **Dashboards, Notebooks, Monitors**: Deleted upon request on termination
  - product: Error Tracking
    data_type: | 
       - **Errors**: 1 year after last access
  - product: Event Management
    data_type: | 
       - **Events**: 15 months
  - product: Incident Management
    data_type: | 
       - **Incidents**: Deleted upon request on termination
  - product: LLM Observability
    data_type: | 
       - **Traces and spans**: 15 days
  - product: Log Management
    data_type: | 
       - **Logs**: Determined by customer plan
  - product: Metrics
    data_type: | 
       - **Tags and values**: 15 months
  - product: Mobile App Testing
    data_type: | 
       - **Test results (not displayed in UI)**: 2 months
       - **Test results (displayed in UI)**: 15 months
       - **Mobile application binaries**: Deleted upon request on termination
  - product: Mobile RUM
    data_type: | 
       - **Events**: 30 days
  - product: Network Device Monitoring
    data_type: | 
       - **Netflow**: 30 days
       - **SNMP traps**: 15 days
  - product: Network Performance Monitoring
    data_type: | 
       - **Netflow**: 14 days
  - product: Product Analytics
    data_type: | 
       - **Events**: 15 months
       - **User Profiles**: 30 days
  - product: Quality Gates
    data_type: | 
       - **Gate evaluations**: 30 days
  - product: Reference Tables
    data_type: | 
       - **Tables**: Deleted upon request on termination
  - product: Service Catalog
    data_type: | 
       - **Service metadata**: Deleted upon request on termination
  - product: Service Level Objectives
    data_type: | 
       - **Monitor-based results**: 3 months
       - **Metric and time slice-based results**: 15 months
  - product: Session Replay
    data_type: | 
       - **Replays (extension option in UI is unchecked)**: 30 days
       - **Replays (extension option in UI is checked)**: 15 months
  - product: Software Composition Analysis (SCA)
    data_type: | 
       - **Detected vulnerabilities**: 15 months
  - product: Synthetics
    data_type: | 
       - **Test results (not displayed in UI)**: 2 months
       - **Test results (displayed in UI)**: 15 months
  - product: Test Visibility & Intelligent Test Runner
    data_type: | 
       - **Tests**: 3 months
  - product: Workflow Automation
    data_type: | 
       - **Workflows**: 30 days
---

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}
