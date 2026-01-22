---
title: Intro to Studio
description: If you're new to Datadog, start here.
type: studio
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog Studio is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Datadog Studio gives small development teams production-grade observability without the overhead. Instead of manually configuring individual products and piecing together monitoring tools, Studio provides pre-configured monitoring packages for frontend, backend, or LLM/AI applications that work out of the box.

## Studio vs Datadog

Studio is built for developers at AI-native companies who prioritize rapid iteration, fast deployment, and verifying their application works—not optimizing infrastructure or fine-tuning CI/CD pipelines.

| | Studio | Datadog |
|---|--------|---------|
| **Best for** | Developers at lean, fast-moving companies | Enterprise teams with dedicated DevOps/SRE |
| **Focus** | Ship fast, catch bugs, understand users | Infrastructure monitoring, performance optimization, compliance |
| **Setup** | 5-10 minutes with pre-configured packages | Full control over 20+ products |
| **Unique capabilities** | Automated validation agent, live debugging, production-aware coding assistance | Advanced APM, infrastructure monitoring, security |

### What Studio helps you do

**Ship code fast without breaking things**
Go from idea → code → deploy with minimal friction. Studio's automated validation agent detects what changed across code, configs, and UI on every PR, commit, merge, or deploy—catching regressions before they reach users.

**Catch and fix production errors early**
Get alerted to errors that impact your business. Studio gathers debugging context automatically, so you can fix issues without redeploying or reproducing locally. Live debugging lets you investigate directly in production.

**Understand your users**
See who your users are and what they do. Use session context to diagnose issues, improve flows, and enhance user experience.

**Choose Datadog if you:**
- Need comprehensive infrastructure monitoring across complex environments
- Require advanced APM distributed tracing or security compliance
- Have dedicated DevOps/SRE teams managing observability

## Features by application type

Studio automatically configures the following features based on your application type:
| Application Type       | Features Included |
|------------------------|--------------|
| Frontend applications  | [Error Tracking][1], [Session Replay][2], [Product Analytics][3] |
| Backend services       | [Error Tracking][1], [Logs][4], [Metrics][5], [Datadog Agent][7] |
| LLMs / AI agents       | [LLM Observability and AI Agent Monitoring][6] |

## Get started

{{< whatsnext desc="If you're new to Studio, start here to learn the essentials and set up your first application:" >}}
   {{< nextlink href="/studio/getting_started/" >}}Getting Started{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /error_tracking/
[2]: /session_replay/
[3]: /product_analytics/
[4]: /logs/
[5]: /metrics/
[6]: /llm_observability/
[7]: /agent/