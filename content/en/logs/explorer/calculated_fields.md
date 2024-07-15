---
title: Calculated Fields
disable_toc: false
private: true
---

## Overview

Use calculated fields when you want to apply Boolean logic, perform arithmetic operations, and/or manipulate strings while querying your logs.

{{< img src="logs/explorer/calculated_query.png" alt="The create a calculated field modal with a formula that concatenates the first name and last name and makes it lowercase" style="width:50%;">}}

## Add a calculated field

In the Log Explorer:

1. Navigate to [Log Explorer][1].
1. Click the **Add** button that is next to the search query bar.
1. Select **Calculated field**.

Pivot directly from a specific JSON attribute:

1. Navigate to [Log Explorer][1].
1. Open a log event to the side panel.
1. Click on a specific log attribute to open the context menu.
1. Click **Create calculated field from <attribute>**.

## Supported functions and operations

- Arithmetic operations between attributes or literals: (`+`, `-`, `*`, and `/`)
- Comparisons between attributes or literals: (`>`, `>`, `=`, `<`, `<=`, `==`, and `!=`)
- The following string manipulation functions:
    - `lower(<attribute>)`
    - `upper(<attribute>)`
    - `proper(<attribute>)`
    - `concat(<attribute>, <attribute> [, <attribute>, ...])`
    - `textjoin(<delimiter>, <attribute>, <attribute> [, <attribute>, ...])`

[1]: https://app.datadoghq.com/logs