---
bundle: com.datadoghq.dd.notebooks
bundle_title: Datadog Notebooks
description: Get a notebook using the specified notebook ID.
icon:
  icon_name: Notebook
  type: icon
input: '#/$defs/GetNotebookWithoutCellsInputs'
inputFieldOrder:
- notebook_id
- templateVariables
keywords:
- describe
- get
- lookup
output: '#/$defs/GetNotebookWithoutCellsOutputs'
source: _datadog
title: Get notebook
---

Get a notebook using the specified notebook ID.

{{< workflows >}}
