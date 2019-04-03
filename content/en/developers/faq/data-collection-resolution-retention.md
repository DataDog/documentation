---
title: Datadog data collection, resolution, and retention
kind: faq
---

Find below a summary of Datadog data collection, resolution, and retention:

| Source                       | Collection Methods                                                    | Collection interval | Minimum Resolution | Default Retention                  | Product Category |
| ----                         | ----                                                                  | ----                | ----               | ----                               | ----             |
| System metrics               | Datadog agent                                                         | 15 secs             | 1 s                | 15 months                          | Infrastructure   |
| Agent side integrations      | Datadog agent + enabled integration                                   | 15 secs             | 1 s                | 15 months                          | Infrastructure   |
| Live Containers              | Datadog agent + enabled docker integration OR Datadog container agent | 2 secs              | 1 s                | 36 hours                           | Infrastructure   |
| Live Processes               | Datadog agent + Process agent (enabled)                               | 2 secs              | 1 s                | 36 hours                           | Infrastructure   |
| Custom Metrics (Agent check) | Datadog agent + custom agent check                                    | 15 secs             | 1 s                | 15 months                          | Infrastructure   |
| Custom Metrics (StatsD)      | Datadog agent (built-in statsD collector)                             | 15 secs             | 1 s                | 15 months                          | Infrastructure   |
| Custom Metrics (API)         | POST directly to Datadog's API                                        | Real time           | 1 s                | 15 months                          | Infrastructure   |
| Events                       | Datadog agent OR integrations OR API                                  | Real time           | 1 s                | 15 months                          | Infrastructure   |
| Traces (Sampled)             | Datadog Agent + tracing library                                       | Real time           | 1 micro sec        | See traces retention documentation | APM              |
| Trace Metrics (Unsampled)    | Datadog Agent + tracing library                                       | Real time           | 1 micro sec        | 15 months                          | APM              |
| Trace Events (Unsampled)     | Datadog Agent + tracing library + enabled logs                        | Real time           | 1 micro sec        | 2 Weeks                            | APM + Logs       |
| Logs                         | Datadog agent + enabled logs OR 3rd party log collectors OR API       | Real time           | 1 micro sec        | Plan                               | Logs             |
| API Test metrics             | Datadog Synthetics application                                        | 1 min               | 1 min              | 15 months                          | Synthetics       |
| Browser Test metrics         | Datadog Synthetics application                                        | 5 mins              | 5 min              | 15 months                          | Synthetics       |
