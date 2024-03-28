---
title: Calculate Queries
kind: documentation
disable_toc: false
private: true
---

## Overview

Use calculated fields when you want to apply boolean logic, perform arithmetic operations, and/or manipulate strings while querying your logs.

## Add a calculated field

You can add a calculated field from the Log Explore or on a specific JSON attribute.

To add a calculated field from the Log Explorer:

1. Navigate to [Log Explorer][1].
1. Click the **Add** button that is next to the search query bar.
1. Select **Calculated field**.

To add a calculated field on a specific JSON attribute:

1. Navigate to [Log Explorer][1].
1. Open a log event to the side panel.
1. Click on a specific log attribute to open the context menu.
1. Click **Create calculated field from <attribute>**.

## Support functions and operations

- Arithmetic functions between attributes or literals: (`+`, `-`, `*`, and `/`)
- Comparisons operators between attributes or literals: (`>`, `>`, `=`, `<`, `<=`, `==`, and `!=`)
- The following string manipulation functions:
    - `lower(<attribute>)`
    - `upper(<attribute>)`
    - `proper(<attribute>)`
    - `concat(<attribute>, <attribute> [, <attribute>, ...])`
    - `textjoin(<delimiter>, <attribute>, <attribute> [, <attribute>, ...])`

[1]: https://app.datadoghq.com/logs