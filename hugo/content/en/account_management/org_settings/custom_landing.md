---
title: Custom Organization Landing Page
description: Set a custom dashboard as your organization's landing page to control the first impression and information users see when logging into Datadog.
---

## Overview

The Datadog organization landing page is the first page your users see when they log on to Datadog or navigate to the Datadog root page. Datadog sets a default landing page for your organization. If you use APM, Datadog sets the APM root as the landing page. If you don't use APM, then the list of dashboards is the default landing page.

As an alternative to the default page, Datadog allows administrators to set a dashboard or another eligible page as the landing page for the organization.

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can set the custom landing page for an organization. Custom landing pages are not available during free trial periods.

Individual users can also set a personal landing page that applies only to their own account. A personal landing page takes precedence over the organization landing page.

## Set an org-wide custom landing page

To set a custom landing page, follow the steps below:

1. Navigate to [Organization settings][1].
2. From the tabs on the left, select [**Preferences**][2].
3. In the Datadog Homepage section select one of the available options or a specific product page from the Product Page card.
4. Click the {{< ui >}}Save{{< /ui >}} button.

To restore the default landing page, select {{< ui >}}Datadog Default{{< /ui >}} and click {{< ui >}}Save{{< /ui >}}.

## Set a personal landing page

Any user can set a personal landing page that applies only to their own account. A personal landing page overrides the organization landing page for that user.

To set a personal landing page:

1. Navigate to [Personal Settings][3].
2. From the tabs on the left, select [**Home Page**][4].
3. Select one of the available options or a specific product page from the Product Page card.
4. Click the {{< ui >}}Save{{< /ui >}} button.

To restore the organization landing page, select {{< ui >}}Org Default{{< /ui >}} and click {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/organization-settings/preferences
[3]: https://app.datadoghq.com/personal-settings/
[4]: https://app.datadoghq.com/personal-settings/home-page
