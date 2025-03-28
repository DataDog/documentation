---
title: Feature-Specific Search Guide
description: Learn about search capabilities across different Datadog products
further_reading:
    - link: "/getting_started/search/core_concepts"
      tag: "Documentation"
      text: "Core Search Concepts"
    - link: "/getting_started/search/advanced_techniques"
      tag: "Documentation"
      text: "Advanced Search Techniques"
---

## Overview

While Datadog maintains consistent search patterns across its platform, each product has unique search capabilities tailored to its specific use case. This guide helps you navigate these feature-specific search capabilities.

{{% collapse-content title="Logs Management" level="h4" %}}

[Detailed Log Search Documentation →](/logs/explorer/search)

### Key Capabilities
* Full-text search across log messages
* Structured data queries
* Pattern detection
* Advanced facet filtering

### Unique Syntax
```text
# Message content search
message:"connection timeout"

# Attribute search
@http.status_code:[500 TO 599]

# Pattern search
@message:%{date} ERROR %{word:component} failed
```
{{% /collapse-content %}}

{{% collapse-content title="APM & Continuous Profiling" level="h4" %}}

[Detailed APM Search Documentation →](/tracing/trace_explorer/search)

### Key Capabilities
* Trace filtering
* Span queries
* Service topology search
* Resource filtering

### Unique Syntax
```text
# Trace queries
service:payment-api AND @http.status_code:500

# Service topology
@span.parent.service:frontend AND service:backend

# Resource patterns
resource_name:"/api/v1/*" AND @http.method:POST
```
{{% /collapse-content %}}

{{% collapse-content title="Infrastructure Monitoring" level="h4" %}}

[Detailed Infrastructure Search Documentation →](/infrastructure/search)

### Key Capabilities
* Host filtering
* Container search
* Cloud provider resource filtering
* Integration-specific search

### Unique Syntax
```text
# Host queries
host:prod-* AND platform:linux

# Container filtering
container_name:web-* AND docker.image:nginx

# Cloud resources
cloud.provider:aws AND cloud.instance.type:t2.micro
```
{{% /collapse-content %}}

{{% collapse-content title="Metrics" level="h4" %}}

[Detailed Metrics Filtering Documentation →](/metrics/advanced-filtering)

### Key Capabilities
* Metric name filtering
* Tag-based aggregation
* Rate and threshold queries
* Correlation searches

### Unique Syntax
```text
# Metric filtering
metric.name:system.cpu.idle AND host:prod-*

# Tag aggregation
avg:system.cpu.user{service:web} by {host}

# Rate queries
rate(metric.name):>100
```
{{% /collapse-content %}}

{{% collapse-content title="Security Monitoring" level="h4" %}}

[Detailed Security Search Documentation →](/security_monitoring/search)

### Key Capabilities
* Security signal search
* Threat detection queries
* Compliance filtering
* CSPM rules search

### Unique Syntax
```text
# Security signals
security:attack AND severity:high

# Compliance status
compliance.status:failed AND framework:pci

# Threat detection
threat.source:ip AND threat.level:critical
```
{{% /collapse-content %}}

{{% collapse-content title="Synthetic Monitoring" level="h4" %}}

[Detailed Synthetics Search Documentation →](/synthetics/search)

### Key Capabilities
* Test result filtering
* Location-based search
* Browser test search
* API test filtering

### Unique Syntax
```text
# Test results
test.type:browser AND status:failed

# Location filtering
location:aws:us-east-1 AND @dns.response_time:>1s

# Browser tests
@browser.error:* AND device:chrome
```
{{% /collapse-content %}}

{{% collapse-content title="Real User Monitoring (RUM)" level="h4" %}}

[Detailed RUM Search Documentation →](/real_user_monitoring/explorer/search)

### Key Capabilities
* User session search
* Performance metrics filtering
* Error tracking
* User journey analysis

### Unique Syntax
```text
# Session queries
@session.type:user AND @performance.score:<0.5

# Error tracking
@error.source:js AND @error.type:TypeError

# User journey
@user.journey.step:checkout AND @performance.loading_time:>3s
```
{{% /collapse-content %}}

{{% collapse-content title="CI Visibility" level="h4" %}}

[Detailed CI Search Documentation →](/continuous_integration/explorer/search)

### Key Capabilities
* Pipeline filtering
* Test result search
* Git metadata search
* Coverage metrics filtering

### Unique Syntax
```text
# Pipeline queries
@ci.pipeline.name:deploy AND @ci.status:failed

# Test results
@test.suite:integration AND @test.status:failed

# Git metadata
@git.branch:main AND @git.author.email:*@company.com
```
{{% /collapse-content %}}

{{% collapse-content title="Monitor Management" level="h4" %}}

[Detailed Monitor Search Documentation →](/monitors/manage/search)

### Key Capabilities
* Monitor status filtering
* Alert condition search
* Notification routing
* SLO tracking

### Unique Syntax
```text
# Monitor status
status:Alert AND type:metric

# Alert conditions
query:"avg(last_5m):avg:system.cpu.user{*} > 80"

# Notification
notification:@slack-alerts AND priority:P1
```
{{% /collapse-content %}}

## Best Practices

### Choose the Right Search Context
* Use feature-specific search when focusing on a single product
* Combine searches across features for complex investigations
* Leverage common patterns while respecting feature-specific syntax

### Optimize Your Searches
* Start with feature-specific facets
* Use appropriate time ranges
* Combine with global search patterns when needed

## Next Steps

* Review [Core Search Concepts](/getting_started/search/core_concepts)
* Learn [Advanced Search Techniques](/getting_started/search/advanced_techniques)
* Explore specific product documentation linked throughout this guide

## Further Reading

{{< partial name="whats-next/whats-next.html" >}} 
