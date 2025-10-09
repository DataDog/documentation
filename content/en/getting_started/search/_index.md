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

Datadog provides powerful and flexible search capabilities across its products and features. This guide introduces the core concepts of search syntax in Datadog, helping you understand how to construct effective queries across Logs, Metrics, APM, and more.

You'll learn about shared search semantics, product-specific syntax, and advanced techniques that enhance your querying experience. Each section also includes examples and links to detailed documentation for further reference.

## Understanding Datadog search

Datadog provides a unified way to query data across products using text-based search syntax. All data in Datadog can be explored and filtered through queries, but the syntax and behavior differ depending on the type of data you're working with. There are two primary query formats in Datadog:
- **Metric-based queries**: used in Metrics and Cloud Cost Management (CCM).
- **Event-based queries**: used across most other products, including Logs, APM, RUM, Events, and Security.

Although both query types let you filter and analyze data, their syntax is not interchangeable. Each follows its own structure, operators, and supported functions designed for the type of data it handles.

### Metric-Based Queries

Metric-based queries are designed to retrieve and analyze numerical time series data. They rely on tags and attributes to filter metrics and often combine functions and arithmetic operations to calculate and visualize trends over time (for example, average latency, error rate, or cost over time).

### Event-Based Queries

Event-based queries are used in most Datadog products to explore individual records such as log entries, traces, or browser events. These queries typically support full-text search, faceted filtering, and boolean logic to help users find, group, and analyze relevant events.

Compared to metric queries, event-based searches focus on discovering and filtering individual records rather than aggregating numerical values. They form the foundation for exploratory analysis—helping you identify patterns, troubleshoot issues, and drill into specific data before moving to metrics or dashboards for long-term trends.


## Search fundamentals

Search Fundamentals introduces the common building blocks of Datadog search. It covers how to construct basic queries, use boolean operators, filter by tags and attributes, and understand how search fields work across products. Mastering these fundamentals helps you adapt quickly to product-specific syntax and avoid common query issues.

Learn more in [Search Fundamentals][1].

## Product-specific syntax

Each Datadog product provides its own search syntax, tailored to the type of data it handles. The Product-Specific Search reference highlights the key capabilities and unique operators available in each product, such as log search facets, APM trace filters, or metric aggregation functions. These references help you understand where syntax differs across Datadog products.

See the index of [Product-Specific Search][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/search/fundamentals
[2]: /getting_started/search/product_specific_reference