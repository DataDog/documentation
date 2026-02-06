---
title: Timeline
aliases:
- /service_management/incident_management/investigate/timeline/
further_reading:
- link: "/incident_response/incident_management/investigate/"
  tag: "Documentation"
  text: "Investigate incidents"
---

## Overview

{{< img src="/incident_response/incident_management/investigate/timeline/timeline_tab.png" alt="Example incident showing the Timeline tab" style="width:100%;" >}}

The Incident Timeline is the primary source of information for the work done during an incident. As actions are performed, new cells are added to the timeline in chronological order to capture the changes made, the person who made the change, and the time the changes were made.

By default, timeline cells are sorted in `oldest first` order, but you can change it to `newest first` using the button at the top of the timeline.

## Content types

Each cell has its own content type that indicates the kind of information the cell contains:

|  Content type      | Description                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Responder note     | A note manually written by an incident responder. Responder notes have the following sub-types:<br>- *Graph*: The responder note contains one or more Datadog graphs<br>- *Link*: The responder note contains a hyperlink<br>- *Code*: The responder note contains text wrapped in Markdown syntax for code blocks
| Incident update    | Any changes made to an incident's properties (including status and severity) or its impact.
| Integration update | Any changes made through the Incident Management product's [integrations][1].
| Task               | Any changes made to incident tasks in the Remediation section of the Incident Details page.
| Notification sent  | An update when a manual notification is sent by an incident responder.

### Responder notes

Add responder notes directly to the timeline using the text box underneath the section tabs of the Incident Details page. You can also add responder notes [to the timeline from Slack][2]. You can customize the timestamp of the responder note at creation time to capture important information that was relevant at an earlier point in time in the chronological order of the timeline. 

For responder notes you author, you can edit the content or timestamp, or delete the note entirely. You can also copy a link to a specific cell to share with teammates. 

### Graph cells

Graph definitions are stored using share URLs for graphs if enabled in your [Organization Settings][3]. For 24 hours after a graph cell is added to the timeline, it has the same full interactive hover states found in Dashboards, Notebooks, and other pages. After 24 hours in the timeline, the graph is replaced with static images capturing what the graph was displaying. This is to ensure that graphs with data that has short retention have backups you can view after the live data for the graphs expires.

### Images

To upload an image to be hosted by Datadog, drop an image file into the text box field above the timeline. This adds the image as an individual cell in the timeline.

You can also add an image to an existing cell:  
{{< img src="/incident_response/incident_management/investigate/timeline/timeline_cell_add_image.png" alt="Your image description" style="width:100%;" >}}
1. Click the pencil icon to edit a cell.  
2. Click the image icon and locate the image in your file directory.  
3. You can use any of the following options to upload an image to be hosted by Datadog:  
    * Drop an image file into the upload area.
    * Click **Choose File** and locate the image in your file directory.
    * Paste a publicly accessible URL for the image.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /incident_response/incident_management/#integrations
[2]: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
