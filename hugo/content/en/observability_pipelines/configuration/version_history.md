---
title: Pipeline Version History
description: View the versions of a pipeline and compare changes between versions.
disable_toc: false
further_reading:
- link: "observability_pipelines/configuration/update_existing_pipelines/"
  tag: "Documentation"
  text: "Update an existing pipeline"
- link: "observability_pipelines/configuration/export_and_import_pipeline_configurations/"
  tag: "Documentation"
  text: "Export or import pipeline configurations to JSON or Terraform"
- link: "observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up a pipeline"
---

## Overview

Each time you deploy changes to a pipeline, Observability Pipelines saves a new version of that pipeline. Use the **Version History** tab to see who changed a pipeline and when, and review what changed between versions.

## View the version history of a pipeline

1. Navigate to [Observability Pipelines][1].
1. Select the pipeline.
1. Click the **Version History** tab.

The left side of the page lists the versions of the pipeline, with the latest version at the top. Observability Pipelines keeps a maximum of 50 versions for each pipeline. Each version shows its version number, the date it was created, and the user or service account that created it.

Select a version to see its pipeline graph. The header of the graph shows the version number, the user or service account that created it, and the date and time it was created.

{{< img src="observability_pipelines/version_history/version_history_tab.png" alt="The Version History tab showing a list of three versions and the pipeline graph for Version 2, with added and removed components highlighted" style="width:100%;" >}}

## Review changes in a version

The pipeline graph for a version shows the changes since the previous version. For example, Version 2 shows the changes since Version 1. Components in the graph are labeled based on the change:

| Label | Description |
|-------|-------------|
| **Added** | The component is new in this version. |
| **Removed** | The component was in the previous version but is not in this version. |
| **Modified** | The component is in both versions, but its configuration changed. |
| **Moved**    | The component is in both versions but in different positions in the configuration. |

### See a summary of changes

The **Since Version N** summary at the top of the graph shows how many components were added and removed. To see the full list of changes:

1. Click the summary (for example, **5 added 4 removed**).
1. Use the **Show** dropdown menu to filter the list by type of change.
1. Click on an item to see the related component.

Each change in the list shows the component name, the component type (source, processor group, processor, or destination), and whether it was added, removed, or modified.

{{< img src="observability_pipelines/version_history/changes_dropdown.png" alt="The changes summary dropdown listing the added and removed sources, processor groups, and destinations" style="width:60%;" >}}

### Compare the configuration of a component

To compare the configuration of a single component between versions:

1. Click the **</>** icon on the component.
1. Click **Diff** to see the configuration in the previous version next to the configuration in the selected version. The comparison highlights removed lines in red and added lines in green. Click **JSON** to see the component's configuration without the comparison.

For an added component, the diff shows the full configuration as new lines.

{{< img src="observability_pipelines/version_history/source_diff.png" alt="The diff for an added HTTP/S Server source, with the configuration shown as added lines." style="width:80%;" >}}

For a removed component, the diff shows the full configuration as removed lines.

{{< img src="observability_pipelines/version_history/removed_component_diff.png" alt="The diff for a removed Spike Protection processor group, with the configuration shown as removed lines." style="width:80%;" >}}

For a modified component, the diff highlights the lines that changed.

{{< img src="observability_pipelines/version_history/modified_component_diff.png" alt="The diff for a modified Spike Protection processor, with the changed display name highlighted." style="width:80%;" >}}

### Compare the full pipeline configuration

To compare the entire configuration of a version with the previous version, click **View Diff**. A side-by-side view of the pipeline's JSON configuration opens, with the previous version on the left and the selected version on the right. Changed lines are highlighted.

{{< img src="observability_pipelines/version_history/view_diff.png" alt="The View Diff window showing the JSON configuration of Version 2 compared with Version 1." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
