---
title: Data Retention Periods
disable_sidebar: true
aliases:
    - /developers/guide/data-collection-resolution-retention
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
filter_all: All
content: "TK The following table lists the attributes automatically applied to data sent to Datadog by the Agent by each of the RUM, Logs, and APM products, as applicable to the data domain. Optionally, filter the list by product or search by keyword or description text to find the attributes you're interested in. TK"
---

Find below a summary of Datadog data type and default retention period:

| Product Suite | Product | Data Type | Default Retention Period |
|---------------|---------|-----------|--------------------------|
| AI | Bits AI | Prompts/Responses | 120 days |
| AI | Event Management | Events | 15 months |
| AI | LLM Observability |Input and Output texts | 15 days |
| Applications | Continuous Profiler | Profiles | 8 days, 1 year for profiles visualized in UI |
| Applications | Continuous Profiler | Profile metrics | 6 months |
| Applications | APM | Indexed spans | Maximum 30 days |
| Applications | APM | Sampled traces | 30 days | 
| Applications | APM | Viewed traces in UI | Indefinite |
| Applications | APM | Trace metrics | 15 months |
| Applications | Database Monitoring | Query metrics | 15 months |
| Applications | Database Monitoring | Query samples |  15 days |
| Applications | Data Streams Monitoring | Traces | 30 days |
| Applications | Data Streams Monitoring | Metrics | 15 months |
| Applications | Service Catalog | Service metadata | Indefinite |
| Applications | Cloud | API crawlers | 15 months|
| Applications | Data Jobs Monitoring | Job traces | 15 days |
| Digital Experience | Error Tracking | Errors | Errors deleted after 1 year of inactivity |
| Digital Experience | Browser RUM | Events | Maximum 30 days |
| Digital Experience | Mobile RUM | Events | Maximum 30 days |
| Digital Experience | Synthetics | Test results | If in UI, 15 months; if not in UI, 2 months |
| Digital Experience | Mobile App Testing | Test results | If in UI, 15 months; if not in UI, 2 months |
| Digital Experience | Mobile App Testing | Mobile application binaries | Indefinite |
| Digital Experience | Mobile App testing | Metrics | 15 months |
| Digital Experience | Session Replay | Replays | 30 days, with an option to manually extend replays by 15 months |
| Digital Experience | Product Analytics | Events | 15 months |
| Infrastructure | Serverless | Logs | 15 days |
| Infrastructure | Serverless | Traces | 30 days |
| Infrastructure | Serverless | Metrics | 15 days |
| Infrastructure | Cloud Cost Management | Reports | 15 months |
| Infrastructure | Cloud Cost Management | Recommendations | 90 days |
| Infrastructure | Network Performance Monitoring | Netflow | 14 days |
| Infrastructure | Network Device Monitoring | Netflow | 30 days |
| Infrastructure | Network Device Monitoring | SNMP Traps (Logs) | 14 days |
| Infrastructure | Network Device Monitoring | Metrics | 15 months |
| Infrastructure | Cloudcraft | System architectures | Indefinite |
| Infrastructure | Container Monitoring | Container metadata | 2 hours |
| Infrastructure | Container Monitoring | YAML definitions | 7 days |
| Infrastructure | Container Monitoring | Process distribution metrics | 15 months |
| Infrastructure | Universal Service Monitoring | RED metrics | 15 months |
| Logs | Logs Management | Logs | Plan |
| Logs | Observability Pipelines | Worker configurations | Indefinite |
| Platform | CoScreen | Sessions | 15 months |
| Platform | CoScreen | Anonymized client-side telemetry | 90 days |
| Platform | App Builder | Apps | Indefinite |
| Platform | Workflow Automation | Workflows | 30 days |
| Platform | Reference Tables | Tables | Indefinite |
| Platform | Dashboards / Notebooks / Monitors | Dashboards / Notebooks / Monitors | Indefinite |
| Platform | Metrics | Custom metrics | 15 months |
| Security | Software Composition Analysis | Detected Vulnerabilities | 15 months |
| Security | Application Security Management | Security signals | 15 months |
| Security | Application Security Management | Spans | 90 days |
| Security | Application Security Management | Comments / IP addresses | Indefinite |
| Security | Cloud Security Management | Findings | 15 months |
| Security | Cloud SIEM | Security signals | 15 months |
| Security | Cloud SIEM | Security notifications and rules | Indefinite |
| Service Management | Incident Management | Incidents | Indefinite |
| Service Management | Case Management | Cases | Indefinite |
| Service Management | Service Level Objectives | Results | 45 days |
| Service Management | Service Level Objectives | Snapshots | Indefinite |
| Software Delivery | CI Pipeline Visibility | Pipelines | 15 months |
| Software Delivery | CD Visibility | Deployments | 30 days |
| Software Delivery | Test Visibility & Intelligent Test Runner, Continuous Testing | Tests | 3 months |
| Software Delivery | DevOps Research and Assessment (DORA) | Metrics | 15 months |
| Software Delivery | Quality Gates | Gates | 30 days |
| Software Delivery | Code Analysis | Scans | 15 months |

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}
