---
title: Custom Organization Landing Page
description: Set a custom dashboard as your organization's landing page to control the first impression and information users see when logging into Datadog.
---

## Overview

The Datadog organization landing page is the first page your users see when they log in to Datadog or navigate to the Datadog root page. Organization administrators can set a custom default landing page. Individual users can override this by setting their own [personal home page][3].

The landing page a user sees is determined by the following priority:

1. **Personal home page**: The user's [personal home page][3], if set.
2. **Custom organization home page**: The custom default set by an administrator.
3. **APM Home**: The default for APM-enabled organizations.
4. **Dashboard List**: The fallback default.

**Note**: Trial organizations default to the Quick Start guide. Studio organizations default to the Studio page unless an administrator sets a custom organization home page.

## Set a custom landing page for your organization

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can set the custom landing page for an organization. Custom landing pages are not available during free trial periods.

To set a custom landing page, follow the steps below:

1. Navigate to [**Organization Settings**][1].
2. From the tabs on the left, select [**Preferences**][2].
3. In the Datadog Homepage section, click **Individual Dashboard**.
4. Use the dropdown list to select a dashboard.
5. Click the **Save** button.

As an administrator, you can also enforce a home page for your organization and prevent users from setting their own landing page.

## Use the default landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can change the landing page for an organization.

To restore the default landing page:

1. Navigate to [**Organization Settings**][1].
2. From the tabs on the left, select [**Preferences**][2].
3. In the Datadog Homepage section, click **Default: Dashboard List**.
4. Click the **Save** button.

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/organization-settings/preferences
[3]: /account_management/#home-page
