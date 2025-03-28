---
title: Getting Started with Search in Datadog
description: Learn the fundamentals of searching and filtering across Datadog products
further_reading:
    - link: "/getting_started/search/core_concepts"
      tag: "Documentation"
      text: "Core Search Concepts"
    - link: "/getting_started/search/advanced_techniques"
      tag: "Documentation"
      text: "Advanced Search Techniques"
    - link: "/getting_started/search/feature_specific"
      tag: "Documentation"
      text: "Feature-Specific Search Guide"
---

## Overview

Datadog provides powerful search capabilities across its products and features. This guide introduces you to the fundamental concepts of searching in Datadog and helps you navigate to more detailed, feature-specific documentation.

## Common Search Patterns

Across Datadog, you'll encounter these common search patterns:

1. **Simple text search**: Find items containing specific text
2. **Tag-based filtering**: Filter by metadata using key:value pairs
3. **Resource filtering**: Target specific resources or metrics
4. **Boolean logic**: Combine multiple conditions
5. **Wildcard matching**: Use pattern matching for flexible searches

## Core Search Components

### Boolean Operators

Use these operators to combine or exclude search terms:

| Operator | Description | Example |
|----------|-------------|---------|
| `AND` | Both conditions must be true | `service:web AND env:prod` |
| `OR` | Either condition can be true | `status:error OR status:warning` |
| `NOT` | Exclude matches | `service:web NOT env:dev` |

### Tag-Based Filtering

Tags are key:value pairs that help you filter and group data:

```text
service:payment-api
env:production
team:backend
```

### Wildcard Filtering

Use wildcards for flexible matching:

* `*` matches multiple characters: `service:web-*`
* `?` matches a single character: `host:web-server-?`

## Feature-Specific Search

Different Datadog features offer specialized search capabilities:

{{< tabs >}}
{{% tab "Logs" %}}
* Full-text search
* Structured data queries
* Pattern detection
[Learn more about Log Search →](/logs/explorer/search)
{{% /tab %}}
{{% tab "APM" %}}
* Trace filtering
* Span queries
* Service maps
[Learn more about APM Search →](/tracing/trace_explorer/search)
{{% /tab %}}
{{% tab "Metrics" %}}
* Metric queries
* Tag-based filtering
* Advanced aggregations
[Learn more about Metrics Filtering →](/metrics/advanced-filtering)
{{% /tab %}}
{{< /tabs >}}

## Getting Started

1. **Start Simple**: Begin with basic text searches and single tag filters
2. **Add Tags**: Use tags to filter your results more precisely
3. **Combine Filters**: Use boolean operators to create more specific searches
4. **Explore Features**: Learn about feature-specific search capabilities

## Next Steps

* Learn more about [Core Search Concepts](/getting_started/search/core_concepts)
* Explore [Advanced Search Techniques](/getting_started/search/advanced_techniques)
* Dive into [Feature-Specific Search](/getting_started/search/feature_specific)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}} 