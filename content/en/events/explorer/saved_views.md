---
title: Saved Views
aliases:
- /service_management/events/explorer/saved_views/
further_reading:
- link: "/events/explorer/"
  tag: "Documentation"
  text: "Learn more about the Events Explorer"
---

## Overview

Events Saved Views make it easier for you and your teammates to switch between different troubleshooting contexts. Save the state of the [{{< ui >}}Events Explorer{{< /ui >}} page][1] and get access to:
- Scoped queries
- Relevant facets
- Time range

## Create a saved view

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the avatar of the user who created the view. To create a saved view:
1. Customize the Events query to scope down to the events you are troubleshooting. For more information, see the [Event Analytics][2] and [Search Syntax][3] documentation.
1. Click {{< ui >}}+ Save{{< /ui >}}.
1. Enter a name and click {{< ui >}}Save{{< /ui >}} to create a saved view.

To access your saved views, expand {{< ui >}}> Views{{< /ui >}} to the left of **Events Explorer**. From the saved view entry in the Views panel, you can:

* {{< ui >}}Load{{< /ui >}} or {{< ui >}}reload{{< /ui >}} a saved view.
* {{< ui >}}Update{{< /ui >}} a saved view with the configuration of the current view.
* {{< ui >}}Rename{{< /ui >}} or {{< ui >}}delete{{< /ui >}} a saved view.
* {{< ui >}}Share{{< /ui >}} a saved view through a short link.
* {{< ui >}}Star{{< /ui >}} (favorite) a saved view so it appears on top of your saved view list, and is accessible directly from the navigation menu.

## Default views

To access your default view, expand {{< ui >}}> Views{{< /ui >}} to the left of **Events Explorer**. Your existing Events Explorer view is your default saved view. This configuration is only accessible and viewable to you. Updating this configuration does not have any impact on your organization.

Temporarily override your default saved view by adding facets to your search query and clicking {{< ui >}}Update your default view{{< /ui >}}. To create a new saved view, Click the {{< ui >}}+ Create a New Saved View{{< /ui >}} button.

In the default view entry in the {{< ui >}}Views{{< /ui >}} panel, you can:
* {{< ui >}}Reload{{< /ui >}} your default view by clicking on the entry.
* {{< ui >}}Update{{< /ui >}} your default view with the current parameters.
* {{< ui >}}Reset{{< /ui >}} your default view to Datadog's defaults for a fresh restart.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/explorer
[2]: /events/explorer/searching
[3]: /events/explorer/searching