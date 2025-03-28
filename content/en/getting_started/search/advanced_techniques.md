---
title: Advanced Search Techniques
description: Learn advanced techniques for searching and filtering in Datadog
further_reading:
    - link: "/getting_started/search/core_concepts"
      tag: "Documentation"
      text: "Core Search Concepts"
    - link: "/getting_started/search/feature_specific"
      tag: "Documentation"
      text: "Feature-Specific Search Guide"
---

## Overview

This guide covers advanced search techniques in Datadog, building on the fundamentals covered in [Core Search Concepts](/getting_started/search/core_concepts).

## Complex Query Patterns

### Nested Boolean Logic

Combine multiple conditions with parentheses for complex filtering:
```text
(service:api AND (@http.status_code:>=500 OR @error.type:timeout))
AND env:production
NOT team:deprecated
```

### Range Queries

Use ranges for numeric and time-based searches:
```text
# Numeric ranges
@duration:[100 TO 1000]
@http.status_code:[400 TO 499]

# Time ranges
@timestamp:[2023-01-01 TO 2023-01-31]
@last_modified:[now-1h TO now]
```

## Advanced Filtering Techniques

### Faceted Search

Use facets to filter on specific attributes:
```text
# Filter by multiple facet values
@facet_name:(value1 OR value2)

# Exclude facet values
@facet_name NOT (value1 OR value2)
```

### Pattern Matching

Advanced wildcard and pattern usage:
```text
# Multiple wildcards
service:*-api-*

# Prefix matching
@error.stack:Exception*

# Suffix matching
@http.url:*.pdf
```

## Resource-Based Filtering

### Service Topology

Filter based on service relationships:
```text
# Find traces where service A calls service B
service:service-a AND @span.child_of.service:service-b

# Find all downstream services
@span.child_of.service:parent-service
```

### Infrastructure Filtering

Target specific infrastructure components:
```text
# Container-based filtering
container_name:web-* AND @docker.image:nginx

# Kubernetes filtering
kube_namespace:production AND kube_deployment:frontend
```

## Advanced Tag Usage

### Tag Aggregation

Combine multiple tag conditions:
```text
# Match all tags
service:api AND env:prod AND team:backend

# Match any tag
service:(api OR web) AND env:(staging OR prod)
```

### Tag Hierarchies

Use tag hierarchies for precise filtering:
```text
# Environment hierarchy
env:prod.us-east.web

# Application hierarchy
app:ecommerce.payment.processor
```

## Metric Query Patterns

### Rate and Aggregation

Filter based on metric behavior:
```text
# High rate of change
rate(@metric_name):>100

# Aggregation thresholds
avg(@metric_name):>1000
```

### Correlation

Find related metrics:
```text
# Correlated metrics
@metric_name1:>100 AND @metric_name2:<50

# Service correlation
service:api AND @error_rate:>0.1
```

## Log Query Patterns

### Full-Text Search

Advanced text matching:
```text
# Proximity search
"error database"~5

# Fuzzy matching
"authentication"~
```

### Log Attributes

Complex attribute filtering:
```text
# Multiple attribute conditions
@http.method:POST AND @http.url:*/api/v1/* AND @duration:>1000

# Nested attribute matching
@user.data.preferences.theme:dark
```

## APM Query Patterns

### Trace Filtering

Advanced trace search:
```text
# Error patterns
@error.type:TimeoutError AND @http.url:*/api/*

# Performance patterns
@duration:>100ms AND @span.kind:server
```

### Service Graphs

Filter service relationships:
```text
# Direct dependencies
@span.parent.service:frontend AND service:backend

# Service chains
service:gateway AND @span.child_of.service:auth
```

## Best Practices

### Query Optimization

1. **Use Specific Fields**
   - Prefer attribute searches over full-text
   - Use faceted fields when available

2. **Optimize Performance**
   - Place specific filters first
   - Avoid leading wildcards
   - Use time ranges effectively

3. **Structure Queries**
   - Group related conditions
   - Use consistent patterns
   - Document complex queries

## Next Steps

* Explore [Feature-Specific Search](/getting_started/search/feature_specific)
* Learn about [Log Management](/logs/explorer/search)
* Understand [APM & Continuous Profiling](/tracing/trace_explorer/search)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}} 