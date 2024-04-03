---
bundle: com.datadoghq.dd.notebooks
bundle_title: Datadog Notebooks
description: Clones the specified notebook.
icon:
  icon_name: Notebook
  type: icon
input: '#/$defs/CloneNotebookInputs'
inputFieldOrder:
- notebookId
- name
- cell
keywords:
- clone
- duplicate
output: '#/$defs/CloneNotebookOutputs'
source: _datadog
title: Clone notebook
---

Clones the specified notebook.

{{< workflows >}}
