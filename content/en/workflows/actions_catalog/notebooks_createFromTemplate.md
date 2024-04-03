---
bundle: com.datadoghq.dd.notebooks
bundle_title: Datadog Notebooks
description: Create a new notebook from the given template.
icon:
  icon_name: Notebook
  type: icon
input: '#/$defs/CreateNotebookFromTemplateInputs'
inputFieldOrder:
- templateId
- name
- cell
output: '#/$defs/CreateNotebookFromTemplateOutputs'
source: _datadog
title: Create notebook from template
---

Create a new notebook from the given template.

{{< workflows >}}
