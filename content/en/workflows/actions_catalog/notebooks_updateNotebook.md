---
bundle: com.datadoghq.dd.notebooks
bundle_title: Datadog Notebooks
description: Update a notebook using the specified ID.
icon:
  icon_name: Notebook
  type: icon
input: '#/$defs/UpdateNotebookInputs'
inputFieldOrder:
- time
- notebook_id
- cells
- name
- status
- metadata
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateNotebookOutputs'
source: _datadog
stability: dev
title: Update notebook
---

Update a notebook using the specified ID.

{{< workflows >}}
