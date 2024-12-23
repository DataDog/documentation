---
title: Export Log Workspaces Datasets
private: true
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
- link: "/dashboards/widgets/list/"
  tag: "Documentation"
  text: "List Widget"
---

## Overview

Export your Workspaces cell as a dataset to dashboards and notebooks. The export feature allows you to create datasets and display them in dashboards and notebooks for analysis or reporting. 

## Export a Workspaces cell as a dataset 

From your workspace:

1. Find the dataset you want to export.  
2. Click **Save to Dashboard** or select **Save to Notebook** from the dropdown menu.  
3. In the modal, choose an existing dashboard or notebook, or add the dataset to a new dashboard or notebook.  
4. Click **Save**.  
5. (Optional) Rename the source name and click **Update**. The source name defaults to `<Workspace name> - <Cell name>`.
6. A purple banner indicates a cell that is exported.

{{< img src="logs/workspace/export/example_exported_dataset.png" alt="Example Workspaces cell that has already been exported, showing a purple banner" style="width:100%;" >}}

Saving a cell to a dashboard creates a real-time sync between the cell and every widget it's saved on. Any changes made to an exported dataset are also reflected in the associated dashboards or notebooks. 

From the dashboard or notebook, you have the option of adjusting the columns and customizing widget options. However, You can only change dataset configurations from Log Workspaces. To edit the source, click **Edit in Log Workspaces** from the widget graph editor.

{{< img src="/logs/workspace/export/link_to_workspace_from_dashboard.png" alt="Options in the graph editor to adjust columns and link out to the source Workspace" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}