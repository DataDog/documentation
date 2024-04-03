---
bundle: com.datadoghq.dd.notebooks
bundle_title: Datadog Notebooks
description: Create a notebook using the specified options.
icon:
  icon_name: Notebook
  type: icon
input: '#/$defs/CreateNotebookInputs'
inputFieldOrder:
- time
- cells
- name
- status
- metadata
output: '#/$defs/CreateNotebookOutputs'
source: _datadog
title: Create notebook
---

Create a notebook using the specified options.

{{< workflows >}}
