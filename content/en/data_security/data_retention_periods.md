---
title: Data Retention Periods
disable_sidebar: true
type: data_retention_periods
aliases:
    - /developers/guide/data-collection-resolution-retention
further_reading:
    - link: '/data_security/'
      tag: 'Documentation'
      text: 'Review the main categories of data submitted to Datadog'
filter_all: All
content: "TK The following table lists the attributes automatically applied to data sent to Datadog by the Agent by each of the RUM, Logs, and APM products, as applicable to the data domain. Optionally, filter the list by product or search by keyword or description text to find the attributes you're interested in. TK"

attributes: 
  - suite: AI
    product: Bits AI
    data_type: Prompts/Responses
    default_retention_period: 120 days
  - suite: AI
    product: Event Management
    data_type: Events
    default_retention_period: 15 months
  - suite: AI
    product: LLM Observability
    data_type: Input and Output texts
    default_retention_period: 15 days
  - suite: Applications
    product: Continuous Profiler
    data_type: Profiles
    default_retention_period: 8 days, 1 year for profiles visualized in UI
  - suite: Applications
    product: Continuous Profiler
    data_type: Profile metrics
    default_retention_period: 6 months
  - suite: Applications
    product: APM
    data_type: Indexed spans
    default_retention_period: Maximum 30 days
  - suite: Applications
    product: APM
    data_type: Sampled traces
    default_retention_period: 30 days
  - suite: Applications
    product: APM
    data_type: Viewed traces in UI
    default_retention_period: Indefinite
  - suite: Applications
    product: APM
    data_type: Trace metrics
    default_retention_period: 15 months
  - suite: Applications
    product: Database Monitoring
    data_type: Query metrics
    default_retention_period: 15 months
  - suite: Applications
    product: Database Monitoring
    data_type: Query samples
    default_retention_period: 15 days
  - suite: Applications
    product: Data Streams Monitoring
    data_type: Traces
    default_retention_period: 30 days
  - suite: Applications
    product: Data Streams Monitoring
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Applications
    product: Service Catalog
    data_type: Service metadata
    default_retention_period: Indefinite
  - suite: Applications
    product: Cloud
    data_type: API crawlers
    default_retention_period: 15 months
  - suite: Applications
    product: Data Jobs Monitoring
    data_type: Job traces
    default_retention_period: 15 days
  - suite: Digital Experience
    product: Error Tracking
    data_type: Errors
    default_retention_period: Errors deleted after 1 year of inactivity
  - suite: Digital Experience
    product: Browser RUM
    data_type: Events
    default_retention_period: Maximum 30 days
  - suite: Digital Experience
    product: Mobile RUM
    data_type: Events
    default_retention_period: Maximum 30 days
  - suite: Digital Experience
    product: Synthetics
    data_type: Test results
    default_retention_period: If in UI, 15 months; if not in UI, 2 months
  - suite: Digital Experience
    product: Mobile App Testing
    data_type: Test results
    default_retention_period: If in UI, 15 months; if not in UI, 2 months
  - suite: Digital Experience
    product: Mobile App Testing
    data_type: Mobile application binaries
    default_retention_period: Indefinite
  - suite: Digital Experience
    product: Mobile App testing
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Digital Experience
    product: Session Replay
    data_type: Replays
    default_retention_period: 30 days, with an option to manually extend replays by 15 months
  - suite: Digital Experience
    product: Product Analytics
    data_type: Events
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Serverless
    data_type: Logs
    default_retention_period: 15 days
  - suite: Infrastructure
    product: Serverless
    data_type: Traces
    default_retention_period: 30 days
  - suite: Infrastructure
    product: Serverless
    data_type: Metrics
    default_retention_period: 15 days
  - suite: Infrastructure
    product: Cloud Cost Management
    data_type: Reports
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Cloud Cost Management
    data_type: Recommendations
    default_retention_period: 90 days
  - suite: Infrastructure
    product: Network Performance Monitoring
    data_type: Netflow
    default_retention_period: 14 days
  - suite: Infrastructure
    product: Network Device Monitoring
    data_type: Netflow
    default_retention_period: 30 days
  - suite: Infrastructure
    product: Network Device Monitoring
    data_type: SNMP Traps (Logs)
    default_retention_period: 14 days
  - suite: Infrastructure
    product: Network Device Monitoring
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Cloudcraft
    data_type: System architectures
    default_retention_period: Indefinite
  - suite: Infrastructure
    product: Container Monitoring
    data_type: Container metadata
    default_retention_period: 2 hours
  - suite: Infrastructure
    product: Container Monitoring
    data_type: YAML definitions
    default_retention_period: 7 days
  - suite: Infrastructure
    product: Container Monitoring
    data_type: Process distribution metrics
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Universal Service Monitoring
    data_type: RED metrics
    default_retention_period: 15 months
  - suite: Logs
    product: Logs Management
    data_type: Logs
    default_retention_period: Plan
  - suite: Logs
    product: Observability Pipelines
    data_type: Worker configurations
    default_retention_period: Indefinite
  - suite: Platform
    product: CoScreen
    data_type: Sessions
    default_retention_period: 15 months
  - suite: Platform
    product: CoScreen
    data_type: Anonymized client-side telemetry
    default_retention_period: 90 days
  - suite: Platform
    product: App Builder
    data_type: Apps
    default_retention_period: Indefinite
  - suite: Platform
    product: Workflow Automation
    data_type: Workflows
    default_retention_period: 30 days
  - suite: Platform
    product: Reference Tables
    data_type: Tables
    default_retention_period: Indefinite
  - suite: Platform
    product: Dashboards / Notebooks / Monitors
    data_type: Dashboards / Notebooks / Monitors
    default_retention_period: Indefinite
  - suite: Platform
    product: Metrics
    data_type: Custom metrics
    default_retention_period: 15 months
  - suite: Security
    product: Software Composition Analysis
    data_type: Detected Vulnerabilities
    default_retention_period: 15 months
  - suite: Security
    product: Application Security Management
    data_type: Security signals
    default_retention_period: 15 months
  - suite: Security
    product: Application Security Management
    data_type: Spans
    default_retention_period: 90 days
  - suite: Security
    product: Application Security Management
    data_type: Comments / IP addresses
    default_retention_period: Indefinite
  - suite: Security
    product: Cloud Security Management
    data_type: Findings
    default_retention_period: 15 months
  - suite: Security
    product: Cloud SIEM
    data_type: Security signals
    default_retention_period: 15 months
  - suite: Security
    product: Cloud SIEM
    data_type: Security notifications and rules
    default_retention_period: Indefinite
  - suite: Service Management
    product: Incident Management
    data_type: Incidents
    default_retention_period: Indefinite
  - suite: Service Management
    product: Case Management
    data_type: Cases
    default_retention_period: Indefinite
  - suite: Service Management
    product: Service Level Objectives
    data_type: Results
    default_retention_period: 45 days
  - suite: Service Management
    product: Service Level Objectives
    data_type: Snapshots
    default_retention_period: Indefinite
  - suite: Software Delivery
    product: CI Pipeline Visibility
    data_type: Pipelines
    default_retention_period: 15 months
  - suite: Software Delivery
    product: CD Visibility
    data_type: Deployments
    default_retention_period: 30 days
  - suite: Software Delivery
    product: Test Visibility & Intelligent Test Runner, Continuous Testing
    data_type: Tests
    default_retention_period: 3 months
  - suite: Software Delivery
    product: DevOps Research and Assessment (DORA)
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Software Delivery
    product: Quality Gates
    data_type: Gates
    default_retention_period: 30 days
  - suite: Software Delivery
    product: Code Analysis
    data_type: Scans
    default_retention_period: 15 months

---

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}