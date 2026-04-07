---
title: Custom Organization Landing Page
description: Set a custom dashboard as your organization's landing page or choose your own personal home page in Datadog.
---

## Overview

The Datadog organization landing page is the first page your users see when they log on to Datadog or navigate to the Datadog root page. Datadog determines which landing page to display based on the following priority:

1. **Custom user home page**: A [personal home page][3] set by the individual user.
1. **Custom organization home page**: A custom page chosen by an administrator for the entire organization.
1. **APM-enabled organizations**: The APM Home page.
1. **Default**: The Dashboard List.

**Note**: Trial organizations default to the Quick Start guide, and Studio organizations default to the Studio page. These take precedence over the priority list above.

## Set a custom organization landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can set the custom landing page for an organization. Custom organization landing pages are not available during free trial periods.

To set a custom organization landing page:

1. Navigate to [**Organization Settings**][1].
1. From the tabs on the left, select [**Preferences**][2].
1. In the Datadog Homepage section, click **Individual Dashboard**.
1. Use the dropdown list to select a dashboard.
1. Click the **Save** button.

As an administrator, you can also enforce your chosen home page and disallow users from setting their own landing page.

## Use the default landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can change the landing page for an organization.

To restore the default landing page:

1. Navigate to [**Organization Settings**][1].
1. From the tabs on the left, select [**Preferences**][2].
1. In the Datadog Homepage section, click **Default: Dashboard List**.
1. Click the **Save** button.

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/organization-settings/preferences
[3]: /account_management/#home-page
