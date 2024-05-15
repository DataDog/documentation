---
title: Saved Views
kind: Documentation
further_reading:
- link: "/service_management/events/explorer/"
  tag: "Documentation"
  text: "Learn more about the Events Explorer"
---

## Overview

Events Saved Views make it easier for you and your teammates to switch between different troubleshooting contexts. Save the state of the [**Events Explorer** page][1] and get access to:
- Scoped queries
- Relevant facets
- Time range

## Create a saved view

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the avatar of the user who created the view. To create a saved view:
1. Customize the Events query to scope down to the events you are troubleshooting. For more information, see the [Event Analytics][2] and [Search Syntax][3] documentation.
1. Click **+ Save**.
1. Enter a name and click **Save** to create a saved view.

To access your saved views, expand **> Views** to the left of **Events Explorer**. From the saved view entry in the Views panel, you can:

* **Load** or **reload** a saved view.
* **Update** a saved view with the configuration of the current view.
* **Rename** or **delete** a saved view.
* **Share** a saved view through a short link.
* **Star** (favorite) a saved view so it appears on top of your saved view list, and is accessible directly from the navigation menu.

## Default views

To access your default view, expand **> Views** to the left of **Events Explorer**. Your existing Events Explorer view is your default saved view. This configuration is only accessible and viewable to you. Updating this configuration does not have any impact on your organization.

Temporarily override your default saved view by adding facets to your search query and clicking **Update your default view**. To create a new saved view, Click the **+ Create a New Saved View** button.

In the default view entry in the **Views** panel, you can:
* **Reload** your default view by clicking on the entry.
* **Update** your default view with the current parameters.
* **Reset** your default view to Datadog's defaults for a fresh restart.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/explorer
[2]: /service_management/events/explorer/searching
[3]: /service_management/events/explorer/searching