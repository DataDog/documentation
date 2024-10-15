---
title: Facets
further_reading:
- link: "service_management/events/explorer/attributes"
  tag: "Documentation"
  text: "Learn about reserved attributes"
---

## Overview

By default, Datadog indexes event attributes as facets. Facets are accessible from the Event Explorer facet side-panel, analytics, and monitors.

A facet displays the distinct members of an attribute or a tag and provides basic analytics, such as the number of events represented. Facets allow you to pivot or filter your datasets based on a given attribute. To filter, select the values that you want to see.

{{< img src="service_management/events/explorer/facets-location.png" alt="Facets side-panel" style="width:100%;" >}}

### Create a facet

To add a facet, use the **+ Add** in the left side panel.

After you add the facet, the value of this attribute is stored for all new views, and you can use it in the search bar and facet side panels. You can also use it to group by in event monitors and graph widgets.

### Reserved attributes
**Host**, **Service** and **Status** are part of the core Event Attributes. You can not create new facet on service, host and status tag. 

For Datadog monitor events, the first event tag in alphabetic order is used to set the event attribute. For example, for an event with multiple service tags `service:bcd; service:ace`, `service:ace` will be used to set event attribute. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}