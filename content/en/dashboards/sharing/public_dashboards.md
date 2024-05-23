---
title: Public Dashboards
kind: documentation
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
    - /graphing/dashboards/shared_graph/
further_reading:
- link: "https://www.datadoghq.com/blog/dashboard-sharing/"
  tag: "Blog"
  text: "Share dashboards securely with anyone outside of your organization"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

## Overview

When you share a dashboard by URL or email link, the shared page shows live, read-only contents of that dashboard. When you generate a URL, you enable *Sharing*, and the dashboard becomes a **public dashboard**. Public dashboards refresh every 30 seconds and this [refresh rate][1] cannot be customized. 

**Note**: Widgets based on APM trace queries do not display data on public dashboards.

## Share a dashboard by public URL

To share an entire dashboard publicly, generate a URL:

1. On the dashboard's page, click **Share** in the upper right.
1. Select **Generate public URL**, which opens a *Sharing: On* pop-up modal.
1. From the dropdown menu, select **Anyone with a link (public)**.
1. Click **Time & Variable Settings** to configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables. **Note**: At least one widget must be set to use [`Global Time`][2].
1. Click **Done** to return to the *Sharing: On* modal.
1. Copy the URL and click **Done**.

**Note**: Widgets based on APM traces queries do not display data on public dashboards. The Log Stream widget doesn't show data either, but other log-based queries do.

## Share a dashboard with individual email addresses

To authorize one or more specific email addresses to view a dashboard page:

1. On the dashboard's page, click **Share** in the upper right.
2. Select **Generate public URL** or **Configure public URL**, which opens a *Sharing: On* pop-up modal.
3. From the dropdown menu, select **Only specified people**.
4. Input the email addresses for people you would like to share your dashboard with.
5. Under **Time & Variable Settings**, configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables. **Note**: At least one widget must be set to use [`Global Time`][2].
6. (Optional) Copy the URL to share; the specified email addresses also receive an email with the link.
7. Click **Done**.

### View a shared dashboard

Individuals whose emails are added to the sharing list for a dashboard receive a link in their email. If the link isn't clicked on within one hour, they can request a new link on the dashboard landing page. If their email address is on the dashboard sharing list, a new email is sent.

After an individual clicks the emailed link, a device is authorized to see the dashboard for up to 30 days. After that time is expired, the user can request a new link on the dashboard landing page. If their email address is on the dashboard share list, a new email is sent.

If a user is removed from the dashboard share list, access is removed.

## Revoke

To revoke access to a shared dashboard:

1. Navigate to the [Dashboard List][3].
2. Select the dashboard you want to revoke access to.
3. Click **Share** in the upper right.
4. Click **Configure public URL**.
5. Click **Delete URL**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#refresh-rate
[2]: /dashboards/widgets/#global-time-selector
[3]: https://app.datadoghq.com/dashboard/lists