---
title: Mobile Application Testing Settings
kind: documentation
further_reading:
- link: "/synthetics/settings"
  tag: "Documentation"
  text: "Learn about Synthetic Monitoring & Continuous Testing Settings"
- link: "/continuous_testing/cicd_integrations"
  tag: "Documentation"
  text: "Run your Synthetic tests in a CI pipeline"
---
{{< jqmath-vanilla >}}

## Overview

You can manage your mobile applications on the [Synthetic Monitoring & Continuous Testing Settings page][1].

{{< img src="mobile_testing/applications_list.png" alt="Mobile Applications Settings" style="width:100%;">}}

## Manage versions

To add a new version of an existing mobile application:

1. Hover over the mobile application and click **Add new version**.
2. Upload an [`.apk`][4] or `.ipa` file.
3. Enter a version name. Optionally, mark this version as the latest.
4. Click **Add Version**.

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][2] can access the Synthetic Monitoring **Applications List** page. To get access to the **Applications List** page, upgrade your user to one of those two [default roles][2]. 

If you are using the [custom role feature][3], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/settings/
[2]: /account_management/rbac/#datadog-default-roles
[3]: /account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool