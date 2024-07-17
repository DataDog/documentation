---
title: カスタム組織ランディングページ
---

## Overview

Datadog の組織ランディングページは、ユーザーが Datadog にログオンしたり、Datadog のルートページに移動したときに最初に表示されるページです。Datadog は、組織のデフォルトランディングページを設定します。APM を使用する場合、Datadog は APM ルートをランディングページとして設定します。APM を使用しない場合は、ダッシュボードのリストがデフォルトのランディングページとなります。

As an alternative to the default page, Datadog allows administrators to set a dashboard as the landing page for the organization. A custom landing page helps a large or small organization control the narrative for their users.

You can customize a dashboard with the information you want your users to see when they first log on to Datadog. Use [Organization settings][1] to set that dashboard as the custom landing page for your organization.

## Set a custom landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can set the custom landing page for an organization.

To set a custom landing page, follow the steps below:

1. Navigate to [Organization settings][1].
2. 左のタブから、[**Preferences**][2] を選択します。
3. Datadog Homepage セクションで、**Individual Dashboard** をクリックします。
4. Use the dropdown list to select a dashboard.
5. Click the **Save** button.

## Use the default landing page

Only users with the Datadog Admin Role or the Org Management (`org_management`) permission can change the landing page for an organization.

To restore the default landing page of APM Home, follow the steps below:

1. Navigate to [Organization settings][1].
2. 左のタブから、**Preferences** を選択します。
3. Datadog Homepage セクションで、**Default: Dashboard List** をクリックします。
4. Click the **Save** button.

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/organization-settings/preferences