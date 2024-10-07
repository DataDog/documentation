---
title: Data Retention Periods
disable_sidebar: true
type: data_retention_periods
aliases:
    - /developers/guide/data-collection-resolution-retention
further_reading:
    - link: 'developers/guide/data-collection-resolution'
      tag: 'Documentation'
      text: 'Datadog data collection and resolution'
    - link: '/data_security/'
      tag: 'Documentation'
      text: 'Review the main categories of data submitted to Datadog'
filter_all: All
content: "The following table lists the retention period automatically applied to data sent to Datadog by the Agent by each of the AI, Digital Experience, Infrastructure, Logs, Platform, Security, Service Management, and Software Delivery products. Optionally, filter the list by product or search by keyword to find the attributes you're interested in."
attributes: 
  - suite: AI
    product: LLM Observability
    data_type: Metrics
    default_retention_period: 15 months
  - suite: AI
    product: LLM Observability
    data_type: Traces and spans (includes input and output texts)
    default_retention_period: 15 days
  - suite: Applications
    product: Continuous Profiler
    data_type: Profiles
    default_retention_period: 8 days (1 year if displayed in UI)
  - suite: Applications
    product: Continuous Profiler
    data_type: Profile metrics
    default_retention_period: 1 month
  - suite: Applications
    product: APM
    data_type: Errors
    default_retention_period: 15 days
  - suite: Applications
    product: APM
    data_type: Indexed spans through [Custom Retention filter](https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter)
    default_retention_period: 15 days
  - suite: Applications
    product: APM
    data_type: Indexed spans through [Datadog intelligent retention filter](https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter)
    default_retention_period: 30 days
  - suite: Applications
    product: APM
    data_type: Services/resources statistics and span summaries
    default_retention_period: 30 days
  - suite: Applications
    product: APM
    data_type: Trace metrics
    default_retention_period: 15 months
  - suite: Applications
    product: APM
    data_type: Viewed traces in UI
    default_retention_period: 15 months
  - suite: Applications
    product: Database Monitoring
    data_type: Query metrics
    default_retention_period: 15 months
  - suite: Applications
    product: Data Jobs Monitoring
    data_type: Job traces
    default_retention_period: 90 days
  - suite: Applications
    product: Data Streams Monitoring
    data_type: Metrics
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
    product: Service Catalog
    data_type: Service metadata
    default_retention_period: indefinite
  - suite: Error Tracking
    product: Error Tracking
    data_type: Errors
    default_retention_period: 1 year after last access
  - suite: Digital Experience
    product: Browser RUM
    data_type: Events
    default_retention_period: 30 days
  - suite: Digital Experience
    product: Continuous Testing
    data_type: Batch results
    default_retention_period: 2 months
  - suite: Digital Experience
    product: Continuous Testing
    data_type: Test results
    default_retention_period: 2 months
  - suite: Digital Experience
    product: Mobile App Testing
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Digital Experience
    product: Mobile App Testing
    data_type: Mobile application binaries
    default_retention_period: Indefinite
  - suite: Digital Experience
    product: Mobile App Testing
    data_type: Test results
    default_retention_period: 2 months (15 months if displayed in UI)
  - suite: Digital Experience
    product: Mobile RUM
    data_type: Events
    default_retention_period: 30 days
  - suite: Digital Experience
    product: RUM
    data_type: Errors
    default_retention_period: 30 days (90 days upon request)
  - suite: Digital Experience
    product: Session Replay
    data_type: Replays
    default_retention_period: 30 days (15 months if [option is selected in UI](https://docs.datadoghq.com/real_user_monitoring/session_replay/#retention))
  - suite: Digital Experience
    product: Synthetics
    data_type: Test results
    default_retention_period: 2 months (15 months if displayed in UI)
  - suite: Infrastructure
    product: Serverless
    data_type: Logs
    default_retention_period: 15 days
  - suite: Infrastructure
    product: Cloud Cost Management
    data_type: Cost metrics
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Cloud Cost Management
    data_type: Recommendations
    default_retention_period: 90 days
  - suite: Infrastructure
    product: Container Monitoring
    data_type: Container metadata
    default_retention_period: 2 hours
  - suite: Infrastructure
    product: Container Monitoring
    data_type: Live processes
    default_retention_period: 36 hours
  - suite: Infrastructure
    product: Container Monitoring
    data_type: Live containers
    default_retention_period: 36 hours
  - suite: Infrastructure
    product: Container Monitoring
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Container Monitoring
    data_type: YAML definitions
    default_retention_period: 7 days
  - suite: Infrastructure
    product: Network Device Monitoring
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Network Device Monitoring
    data_type: Netflow
    default_retention_period: 30 days
  - suite: Infrastructure
    product: Network Device Monitoring
    data_type: SNMP traps (Logs)
    default_retention_period: 14 days
  - suite: Infrastructure
    product: Network Performance Monitoring
    data_type: Netflow
    default_retention_period: 14 days
  - suite: Infrastructure
    product: Serverless
    data_type: Metrics
    default_retention_period: 15 months
  - suite: Infrastructure
    product: Serverless
    data_type: Traces
    default_retention_period: 30 days
  - suite: Infrastructure
    product: Universal Service Monitoring
    data_type: RED metrics
    default_retention_period: 15 months
  - suite: Logs and Metrics
    product: Logs
    data_type: Errors
    default_retention_period: Determined by customer plan
  - suite: Logs and Metrics
    product: Log Management
    data_type: Logs
    default_retention_period: Determined by customer plan
  - suite: Logs and Metrics
    product: Metrics
    data_type: Custom metrics
    default_retention_period: 15 months
  - suite: Platform
    product: 
    data_type: 
    default_retention_period: 
  - suite: Platform
    product: 
    data_type: 
    default_retention_period: 
  - suite: Platform
    product: 
    data_type: 
    default_retention_period: 
  - suite: Platform
    product: 
    data_type: 
    default_retention_period: 
  - suite: Platform
    product: 
    data_type: 
    default_retention_period: 
  - suite: 
    product: 
    data_type: 
    default_retention_period: 

---

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}
