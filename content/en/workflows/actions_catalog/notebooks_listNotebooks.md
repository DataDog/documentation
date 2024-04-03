---
bundle: com.datadoghq.dd.notebooks
bundle_title: Datadog Notebooks
description: Get all notebooks.
icon:
  icon_name: Notebook
  type: icon
input: '#/$defs/ListNotebooksInputs'
inputFieldOrder:
- start
- count
- sort_field
- sort_dir
- query
- is_template
keywords:
- all
- list
output: '#/$defs/ListNotebooksOutputs'
source: _datadog
title: List notebooks
---

Get all notebooks.

{{< workflows >}}
