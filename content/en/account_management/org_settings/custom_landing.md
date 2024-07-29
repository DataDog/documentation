---
title: Custom Organization Landing Page
---

## Overview

The Datadog organization landing page is the first page your users see when they log on to Datadog or navigate to the Datadog root page. Datadog sets a default landing page for your organization. If you use APM, Datadog sets the APM root as the landing page. If you don't use APM, then the list of dashboards is the default landing page.

As an alternative to the default page, Datadog allows administrators to set a dashboard as the landing page for the organization. A custom landing page helps a large or small organization control the narrative for their users.

You can customize a dashboard with the information you want your users to see when they first log on to Datadog. Use [Organization settings][1] to set that dashboard as the custom landing page for your organization.

## Set a custom landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can set the custom landing page for an organization.

To set a custom landing page, follow the steps below:

1. Navigate to [Organization settings][1].
2. From the tabs on the left, select [**Preferences**][2].
3. In the Datadog Homepage section, click **Individual Dashboard**.
4. Use the dropdown list to select a dashboard.
5. Click the **Save** button.

## Use the default landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can change the landing page for an organization.

To restore the default landing page of APM Home, follow the steps below:

1. Navigate to [Organization settings][1].
2. From the tabs on the left, select [**Preferences**][2].
3. In the Datadog Homepage section, click **Default: Dashboard List**.
4. Click the **Save** button.

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/organization-settings/preferences
