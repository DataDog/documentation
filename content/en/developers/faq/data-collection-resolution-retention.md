---
title: Datadog Data Collection, Resolution, and Retention
kind: faq
---

Find below a summary of Datadog data collection, resolution, and retention:

| Source                       | Collection Methods                                                    | Collection interval | Minimum Resolution | Default Retention                       | Product Category |
| ----                         | ----                                                                  | ----                | ----               | ----                                    | ----             |
| System metrics               | Datadog Agent                                                         | 15 secs             | 1 s                | 15 months                               | Infrastructure   |
| Agent integrations           | Datadog Agent + enabled integrations                                  | 15 secs             | 1 s                | 15 months                               | Infrastructure   |
| Live Containers              | Datadog Agent + enabled Docker integration or Datadog container Agent | 2 secs              | 1 s                | 36 hours                                | Infrastructure   |
| Live Processes               | Datadog Agent + Process Agent                                         | 2 secs              | 1 s                | 36 hours                                | Infrastructure   |
| Custom Metrics (Agent check) | Datadog Agent + custom Agent check                                    | 15 secs             | 1 s                | 15 months                               | Infrastructure   |
| Custom Metrics (StatsD)      | Datadog Agent (built-in statsD collector)                             | 15 secs             | 1 s                | 15 months                               | Infrastructure   |
| Custom Metrics (API)         | POST directly to Datadog's API                                        | Real time           | 1 s                | 15 months                               | Infrastructure   |
| Events                       | Datadog Agent, integrations, or API                                   | Real time           | 1 s                | 15 months                               | Infrastructure   |
| Traces (Sampled)             | Datadog Agent + tracing library                                       | Real time           | 1 micro sec        | [See traces retention documentation][1] | APM              |
| Trace Metrics (Unsampled)    | Datadog Agent + tracing library                                       | Real time           | 1 micro sec        | 15 months                               | APM              |
| Trace Events (Unsampled)     | Datadog Agent + tracing library + enabled logs                        | Real time           | 1 micro sec        | 2 Weeks                                 | APM + Logs       |
| Logs                         | Datadog Agent + Logs, 3rd party log collectors, or API                | Real time           | 1 micro sec        | Plan                                    | Logs             |
| API Test metrics             | Datadog Synthetics application                                        | 1 min               | 1 min              | 15 months                               | Synthetics       |
| Browser Test metrics         | Datadog Synthetics application                                        | 5 mins              | 5 min              | 15 months                               | Synthetics       |

[1]: /tracing/guide/trace_sampling_and_storage
