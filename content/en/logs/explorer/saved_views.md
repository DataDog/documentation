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

Technically, Saved Views keep track of: 
- A [search query][1],
- A customized default visualization ([log stream][3], [log patterns][4], or [log analytics][5] along with their specific visualization properties),
- A [selected subset of facets][2] to be displayed in the facet list.


## User's Default Saved View 

The Default View is the default configuration for your Log Explorer. 

This default configuration can be **temporarily** overriden by either by configuration updates done in the flow of exploration, or that happens when opening links to the log explorer that embed a different configuraiton.

{{< img src="logs/explorer/saved_views/default.png" alt="Saved Views selection"  style="width:90%;" >}}

At any moment, from the Default View section in the Saved View Panel:

* **reload** your default configuration in the current view by clicking on the default view. 
* **update** your default configuration with current parameters, by clicking on the "Update" button.
* **reset** your default configuration at any moment, by clicking on the default view.



## Custom Saved Views 

Saved Views allow you to save search customizations in the Log Explorer, including:


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /logs/explorer/facets/
[6]: /logs/explorer

[1]: /logs/explorer/search/
[3]: /logs/explorer/?tab=logstream#visualization
[4]: /logs/explorer/patterns/
[5]: /logs/explorer/analytics/
