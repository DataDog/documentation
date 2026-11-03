---
title: Subscriptions
description: Let visitors subscribe to status page updates by email, Slack, Microsoft Teams, or an RSS or Atom feed, and manage subscribers.
further_reading:
- link: "/incident_response/status_pages/"
  tag: "Documentation"
  text: "Datadog Status Pages"
---

Status page visitors can subscribe to updates by email, Slack, Microsoft Teams, or an RSS or Atom feed. Each subscription type is turned on or off independently for each status page. When a notice or scheduled maintenance is published with **Notify subscribers** enabled, email, Slack, and Microsoft Teams subscribers receive updates for the components they follow.

When more than one subscription type is enabled, clicking **Subscribe** on the published page opens a modal with a tab for each enabled type.

## Email subscriptions

Email subscriptions on status pages are **double opt-in**. After entering an email to subscribe, users receive a confirmation email and must click the confirmation link to activate their subscription. During this process, users can choose to receive notifications for the entire status page or select specific components they want to monitor. A preferred timezone can be configured for timestamp formatting within notifications. Users can manage their preferences and update their subscriptions at any time through the subscription management link included in notification emails.

For **internal** status pages, the subscription process is the same, but users must log in to the same Datadog organization to confirm their subscription and receive notifications.

{{< img src="/incident_response/status_pages/status_pages_subscription_1.png" alt="Screenshot of the Status Page subscription modal with fields filled out" style="width:70%;" >}}

### Enable email subscriptions

Two settings control email subscriptions:

- **Notify subscribers**: Sends an email to all subscribers when new updates are published. When disabled, notices still go to other subscription types, such as Slack and Microsoft Teams.
- **Show subscribe option to visitors**: Adds a **Subscribe** option to the published page.

1. From your status page, click **Settings**, then select **Email** under **Subscriptions**.
2. Enable **Notify subscribers**.
3. (Optional) Enable **Show subscribe option to visitors**. This option requires **Notify subscribers**.
4. (Optional) Under **Email Header Image**, upload an image to display at the top of notification emails.

{{< img src="incident_response/status_pages/status_pages_enable_email.png" alt="Status page email subscription settings showing the Notify subscribers and Show subscribe option to visitors toggles" style="width:80%;" >}}

Turn off **Show subscribe option to visitors** to control who receives updates, such as when migrating from another status page, retiring a page, or limiting updates to a private audience. Admins can still [add or import subscribers](#add-or-import-subscribers), and existing subscribers keep receiving notifications.

### Add or import subscribers

You can add or import subscribers before you publish your page or enable **Notify subscribers**.

1. From your status page, click **Settings**, then select **Email** under **Subscriptions**.
2. Under **Email Subscribers**, do one of the following:
   - To add one subscriber, click **Add Subscriber** and enter an email address.
   - To import a list, click **Import Subscribers** and upload a `.txt` file with one email address per line. You can import up to 1,000 subscribers at a time.

New subscribers must confirm their email address before they receive notifications:

- **Published page**: Datadog sends the confirmation email immediately.
- **Unpublished page**: Subscribers are saved as **pending**. Datadog sends the confirmation email when you [publish the page][2].

Unpublishing a page doesn't affect existing subscribers.

### Configure a custom email sender domain

By default, status page subscription emails are sent from a Datadog email address. To send notifications from your own domain, configure a custom SMTP server in Organization Settings.

<div class="alert alert-danger">The <code>org_management</code> permission is required to add SMTP servers in Organization Settings. The <code>status_pages_settings_write</code> permission is required to select the email sender domain on a status page.</div>

1. From your status page, click **Settings**, then select **Email** under **Subscriptions**.
2. Under **Email Sender Domain**, click **Organization Settings**.
3. In Organization Settings, [add and validate an SMTP server][1].
4. Return to your status page **Settings**, select **Email** under **Subscriptions**, and select your SMTP server as the email sender domain.

<div class="alert alert-info">
If the selected SMTP server fails, notifications are sent to subscribers through <strong>Datadog Default</strong> (<code>no-reply@dtdg.co</code>).
</div>

## Slack subscriptions

Visitors can subscribe to status page updates in Slack through the **Datadog Status Pages** Slack app. When a notice or scheduled maintenance is published with **Notify subscribers** enabled, the app posts updates to each subscribed channel for the components it follows, using your page name and Slack app icon as the sender.

### Enable Slack subscriptions

1. From your status page, click **Settings**, then select **Slack** under **Subscriptions**.
2. Enable **Slack subscriptions**.
3. (Optional) Under **Slack App Icon**, upload an image to use as the sender avatar on Slack notifications.

{{< img src="incident_response/status_pages/status_pages_enable_slack.png" alt="Status page settings showing the Enable Slack subscriptions toggle and the Slack App Icon upload" style="width:80%;" >}}

Click **Subscribe** on the published page to open a modal with a tab for each enabled subscription type.

### Subscribe in Slack

From a published page with Slack subscriptions enabled:

1. Click **Subscribe** and open the **Slack** tab.
1. (Optional) Select **Subscribe to specific services** to choose individual components, or leave it cleared to follow the entire page.
1. Click **Subscribe via Slack**.
   {{< img src="incident_response/status_pages/status_pages_slack_subscription_modal.png" alt="Subscribe to Updates modal with the Slack tab selected and a Subscribe via Slack button" style="width:70%;" >}}
1. Authorize the **Datadog Status Pages** app for your workspace and select the channel to receive updates.
   {{< img src="incident_response/status_pages/status_pages_slack_oauth.png" alt="Slack authorization screen granting the Datadog Status Pages app access to a workspace and channel" style="width:70%;" >}}

After subscribing, the selected channel receives a welcome message confirming the subscription.

**Private channels**: After subscribing, the user receives a message in the **Messages** tab of the Slack app prompting them to invite the **Datadog Status Pages** bot to the channel. The bot must be invited before it can post updates. Direct message (DM) channels are not supported. On **internal** status pages, users must be logged in to the same Datadog organization to subscribe.

### Manage subscriptions

Subscribers can change the components they follow or unsubscribe at any time from the **Manage Preferences** link in any Slack notification.

Status page owners can review subscribers in the status page settings, which lists the subscribed Slack workspaces and channels. Removing a workspace unsubscribes all of its channels from the page.

## Microsoft Teams subscriptions

Visitors can subscribe a Microsoft Teams channel to status page updates through a Teams workflow. When a notice or scheduled maintenance is published with **Notify subscribers** enabled, Datadog posts an Adaptive Card to each subscribed channel for the components it follows.

### Enable Microsoft Teams subscriptions

1. From your status page, click **Settings**, then select **Microsoft Teams** under **Subscriptions**.
1. Turn on the **Enable Microsoft Teams subscriptions** toggle.
1. Click **Save**.

{{< img src="incident_response/status_pages/status_pages_enable_microsoft_teams.png" alt="Status page settings showing the Enable Microsoft Teams subscriptions toggle" style="width:80%;" >}}

Click **Subscribe** on the published page to open a modal with a tab for each enabled subscription type. Turn off **Enable Microsoft Teams subscriptions** to remove the **Microsoft Teams** tab and stop sending Microsoft Teams notifications.

### Subscribe in Microsoft Teams

Microsoft Teams subscriptions use a workflow webhook URL from the channel that receives updates. Create the URL in Microsoft Teams first:

1. In Microsoft Teams, open the channel that should receive updates.
1. Click the **More options** (`...`) menu for the channel, select **Workflows**, and search for the **Send webhook alerts to** template, which is named after the channel (for example, **Send webhook alerts to devops**).
1. Select the team and the channel, follow the prompts to create the workflow, then copy the webhook URL.
   {{< img src="incident_response/status_pages/status_pages_microsoft_teams_workflow_config.png" alt="Microsoft Teams Send webhook alerts workflow configuration with the team and channel fields" style="width:80%;" >}}

Then, from a published page with Microsoft Teams subscriptions enabled:

1. Click **Subscribe** and open the **Microsoft Teams** tab.
1. In **Microsoft Teams URL**, paste the workflow webhook URL. For example:

   ```text
   https://default0a1b2c3d4e5f.0a.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/01/workflows/0123456789abcdef0123456789abcdef/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EXAMPLE_SIGNATURE
   ```

1. (Optional) Select **Subscribe to specific services** to choose individual components, or leave it cleared to follow the entire page.
1. Click **Subscribe**.
   {{< img src="incident_response/status_pages/status_pages_microsoft_teams_subscription_modal.png" alt="Subscribe to Updates modal with the Microsoft Teams tab selected, a Microsoft Teams URL field, and a Subscribe button" style="width:70%;" >}}

After subscribing, a confirmation message appears.

The URL must use HTTPS and be a Power Automate workflow URL, with a host that ends in `.logic.azure.com` or `.environment.api.powerplatform.com`. The **Subscribe** button stays disabled until the URL is valid. A URL can be subscribed to a page only once. On **internal** status pages, users must be logged in to the same Datadog organization to subscribe.

### Notifications

Each Microsoft Teams notification is an Adaptive Card that includes:

- The page name, and the notice title linked to the notice on your status page, followed by the type of event: **New Degradation**, **Degradation Updated**, **Scheduled Maintenance**, **Maintenance Schedule Changed**, **Maintenance Canceled**, or **Maintenance Updated**.
- The message of the update, if there is one.
- The **Status** of the notice. For maintenance windows, the card also shows the **Start** and **End** times, and the previous times when a window is rescheduled.
- A **Components Impacted** list. Each component shows its status, except in scheduled maintenance notifications, which list component names only. Long lists are shortened with a **+N more** row.
- **Manage subscription** and **Unsubscribe** buttons.

Only **Active** subscriptions receive notifications.

### Manage subscriptions

Subscribers can change the components they follow or unsubscribe at any time with the **Manage subscription** and **Unsubscribe** buttons in any notification.

Status page owners can review subscribers in the status page settings. For a published page, the **Microsoft Teams Subscribers** list shows the URL, components, subscription date, and status of each subscription, and can be filtered by status. Hover over a truncated URL to see the full value. To remove subscribers, select one or more rows and click **Unsubscribe**.

A subscription is **Active** while Datadog delivers updates to it. If Datadog can't deliver updates to the URL, for example because the workflow was deleted or turned off, the subscription is marked **Undeliverable** and stops receiving updates. To resume updates, remove the subscription from the list, then subscribe again with a working URL.

## RSS and Atom feeds

Public status pages can publish their notice history as an RSS 2.0 or Atom feed. Visitors subscribe in any feed reader and receive new notices and updates.

Feeds are available on public status pages only.

### Enable feeds

1. From your status page, click **Settings**, then select **RSS** under **Subscriptions**.
1. Enable **RSS feed**.
1. Click **Save Settings**.

### Feed URLs

After the page is published, its feeds are served at the following paths:

| Feed | URL |
| ---- | --- |
| RSS 2.0 | `https://<prefix>.statuspage.datadoghq.com/history.rss` |
| Atom | `https://<prefix>.statuspage.datadoghq.com/history.atom` |

If you [set a custom domain][3], the feeds are also served from that domain; for example, `https://status.acme.com/history.rss`, where `status.acme.com` is the configured custom domain.

Each feed entry corresponds to a notice published on the page and includes the notice title, status, message, and the time the update was posted. Resolved notices remain in the feed as part of the page history. The last 20 notices are shown in the feed.

**Note**: Feeds are unauthenticated. Anyone who can view the status page can read its feed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/org_settings/smtp_configuration
[2]: /incident_response/status_pages/#publish-your-status-page
[3]: /incident_response/status_pages/#set-a-custom-domain
