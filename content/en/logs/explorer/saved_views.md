---
title: Saved Views
kind: documentation
description: 'Use Saved Views to automatically configure your Log Explorer.'
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Perform Log Analytics'
    - link: 'logs/processing'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
---

## Overview

Efficient troubleshooting requires that your data is put into the right perspective: the proper **scope** to delimitate your exploration, the proper **visualisation options** to surface meaningful information, and the relevant **[facets][2]** to explore.

But that perspective is highly contextual and depends on what you're looking at and seeking for. Saved Views are meant to easily switch between different troubleshooting contexts, for yourself and for your teammates.

Saved Views are accessible from the upper right corner of the [Log Explorer][6]. 

{{< img src="logs/explorer/saved_views/overview.png" alt="Saved Views selection"  style="width:90%;" >}}

Technically, a Saved View keeps track of: 
- A [search query][1],
- A customized default visualization ([log stream][3], [log patterns][4], or [log analytics][5] along with their specific visualization properties),
- A [selected subset of facets][2] to be displayed in the facet list.


## User's Default Saved View 

{{< img src="logs/explorer/saved_views/default.png" alt="Saved Views selection"  style="width:50%;" >}}

The default view is the default configuration for your Log Explorer. This configuraiton only applies to yourself, and updating this won't impact any of your teammates.

This default configuration can be **temporarily** overriden by either by configuration updates done in the flow of exploration, or that happens when opening links to the log explorer that embed a different configuraiton.

At any moment, from the default view entry in the saved views panel:

* **Reload** your default view, by clicking on the entry.
* **Update** your default view with the current parameters.
* **Reset** your default view to Datadog's defaults for a fresh restart.


## Organization's Saved Views 

{{< img src="logs/explorer/saved_views/custom.png" alt="Saved Views selection"  style="width:50%;" >}}

All other saved views are shared across your organisation:

* **Integration saved views** come out-of-the-box with most of Datadog [Log Management Integrations][7]. These are read-only, and identified with the logo of the integration.
* **Custom saved views** are created by users. They are editable by any user in your organisation (excepting [Read Only users][8]), and identified with the avatar of the user who created it. Hit the **save** button to create a new custom saved view from the current content of your explorer.


{{< img src="logs/explorer/saved_views/save.png" alt="Saved Views selection"  style="width:30%;" >}}


At any moment, from the saved view entry in the saved views panel:

* **Load** or **reload** a saved view.
* **Update** a saved view with the configuration of the current view. 
* **Rename** or **delete** a saved view.
* **Share** a saved view through a short-link.
* **Star** (turn into a favourite) a saved view so that it appears on top of your saved view list, and is accessible directly from the navigation menu.

{{< img src="logs/explorer/saved_views/star.png" alt="Saved Views selection"  style="width:30%;" >}}

*Note*: Update, rename and delete actions are disabled for integration saved views and [Read Only users][8].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /logs/explorer/facets/
[6]: /logs/explorer
[7]: /integrations/#cat-log-collection
[8]: /account_management/rbac/permissions?tab=ui#general-permissions

[1]: /logs/explorer/search/
[3]: /logs/explorer/?tab=logstream#visualization
[4]: /logs/explorer/patterns/
[5]: /logs/explorer/analytics/
