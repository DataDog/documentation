---
title: Custom Landing Page
kind: documentation
---

## Overview

Datadog allows administrators to set a dashboard as the default landing page for the organization. A custom landing page helps a large or small organization control the narrative for their users.

You can customize a dashboard with the information you want your users to see when they first log on to Datadog. Use the Organization settings to set that dashboard as the custom landing page for your organization. That dashboard becomes the default page that users see when they access the Datadog site.

If an organization does not set a custom landing page, Datadog sets a default landing page. In organizations that use APM, the APM homepage is the default landing page. If the organization does not use APM, the dashboard list is the default landing page.

## Set a custom landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can set the custom landing page for an organization.

To set a custom landing page, follow the steps below:

1. Navigate to [Organization settings][1].
2. In the left page menu, select **Preferences**.
3. In the Datadog Homepage section, click the **Dashboard** button.
4. Use the drop-down list to select a dashboard.
5. Click the **Save** button.

To set a custom landing page using the API, see the [TODO need link][2] API reference.

## Use the default landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can change the landing page for an organization.

To restore the default landing page of APM Home, follow the steps below:

1. Navigate to [Organization settings][1].
2. In the left page menu, select **Preferences**.
3. In the Datadog Homepage section, click the **Default: APM Home** button.
4. Click the **Save** button.

To restore the default landing page using the API, see the [TODO need link][2] API reference.

[1]: https://app.datadoghq.com/organization-settings/
[2]: TODO
