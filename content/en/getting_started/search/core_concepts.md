---
title: Core Search Concepts
description: Learn the fundamental concepts of searching and filtering in Datadog
further_reading:
    - link: "/getting_started/search/advanced_techniques"
      tag: "Documentation"
      text: "Advanced Search Techniques"
    - link: "/getting_started/tagging/using_tags"
      tag: "Documentation"
      text: "Using Tags in Datadog"
---

## Overview

This guide explains the core concepts of searching in Datadog, including basic syntax, operators, and filtering techniques that are common across all Datadog products.

## Basic Search Syntax

### Text Search

The simplest form of search is plain text:
```text
error
timeout
"database connection"
```

* Single words match anywhere in searchable fields
* Use quotes for exact phrase matching
* Searches are case-insensitive by default

### Attribute Search

Search specific fields using the `@` prefix:
```text
@http.status_code:500
@duration:>100
@service:payment-api
```

## Boolean Logic

### Basic Operators

| Operator | Usage | Example |
|----------|-------|---------|
| `AND` | Both conditions must be true | `error AND timeout` |
| `OR` | Either condition can be true | `error OR warning` |
| `NOT` | Exclude matches | `error NOT timeout` |

### Operator Precedence

1. `NOT`
2. `AND`
3. `OR`

Use parentheses to control precedence:
```text
(error OR warning) AND service:api
```

## Tag Filtering

### Tag Structure

Tags follow a `key:value` format:
```text
env:production
service:web
team:backend
```

### Multiple Values

Filter for multiple values using parentheses:
```text
service:(web-server OR api-server)
env:(staging OR production)
```

### Exclusion

Exclude specific tags using `NOT`:
```text
service:web NOT env:dev
```

## Wildcard Patterns

### Available Wildcards

* `*` - Match zero or more characters
* `?` - Match exactly one character

### Common Uses

```text
# Match all production services
service:prod-*

# Match specific version numbers
version:2.?

# Match multiple subdomains
host:*.example.com
```

### Best Practices

* Place wildcards at the end of terms when possible
* Avoid leading wildcards when you can be more specific
* Use specific prefixes to improve search performance

## Numeric Comparisons

### Available Operators

* `>` Greater than
* `>=` Greater than or equal
* `<` Less than
* `<=` Less than or equal

### Examples

```text
@duration:>100
@http.status_code:>=500
@retry_count:<3
```

## Time-Based Search

### Time Operators

* `>` After
* `>=` At or after
* `<` Before
* `<=` At or before

### Examples

```text
@timestamp:>2023-01-01
@last_seen:<1h
```

## Common Patterns

### Combining Multiple Conditions

```text
# Find production errors
service:payment AND status:error AND env:production

# Find specific HTTP status codes
@http.method:POST AND @http.status_code:[500 TO 599]
```

### Resource Filtering

```text
# Filter by specific resources
resource_name:"/api/v1/users"
container_name:web-*

# Combine with status
resource_name:"/api/v1/users" AND @http.status_code:429
```

## Next Steps

* Explore [Advanced Search Techniques](/getting_started/search/advanced_techniques)
* Learn about [Feature-Specific Search](/getting_started/search/feature_specific)
* Understand [Tag Best Practices](/getting_started/tagging/using_tags)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}} 