---
title: Time Selections in Workspaces
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
- link: "/dashboards/guide/custom_time_frames/"
  tag: "Documentation"
  text: "Custom Time Frames"
---

## Overview

Log Workspaces is designed for conducting investigations or analyses on a specific, fixed time range. Unlike rolling time ranges, which continuously update to show the most recent data, Workspaces assumes that you are focusing on a static period. As a result, the time selection in Workspaces does not automatically move forward, and a default time range is set upon the Workspace's creation. This ensures that the data remains consistent throughout the investigation, unless manually updated by the user.

## Static time selections in Workspaces

After you select a time range—such as the past 15 minutes—it remains static until you manually select a new time range. For instance, if you choose "past 15 minutes" at 1:05 p.m., the time range remains 12:50 p.m. to 1:05 p.m. until you manually update it. You can do this by opening the time range selection dropdown and choosing the same time range or a different one to display the most current data.

{{< img src="/logs/workspace/time_selection/time_selector_more.png" alt="Time selection options including custom time frames" style="width:80%;" >}}

## Set a default time

By default, workspaces are set to display data for the past 15 minutes. For example, if you create a workspace at 3:03 p.m. on October 1, 2024, the default time range is 2:48 p.m. to 3:03 p.m. This is the default time range that is displayed each time you open the workspace, unless you manually set a new default.

To change the default time:

1. Select a new time frame from the dropdown menu.  
2. Click **Set Default Time** to the left of the time selection dropdown.

{{< img src="/logs/workspace/time_selection/set_default_time.png" alt="Option to Set Default Time, at the top of your workspace" style="width:90%;" >}}

This new selection becomes the default time frame for that Workspace.

<div class="alert alert-warning">If you modify the time selection but do not set a new default, the next time you open the workspace, it reverts to the original default time. To ensure your time selection persists, you must click <strong>Set Default Time</strong> after making your selection.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}