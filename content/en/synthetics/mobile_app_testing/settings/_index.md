---
title: Mobile Application Testing Settings
kind: documentation
is_beta: true
aliases:
- /mobile_testing/settings
- /mobile_app_testing/settings
further_reading:
- link: "/synthetics/mobile_app_testing/mobile_app_tests"
  tag: "Documentation"
  text: "Learn how to create a mobile test"
- link: "/continuous_testing/cicd_integrations"
  tag: "Documentation"
  text: "Run your Synthetic tests in a CI pipeline"
---
{{< jqmath-vanilla >}}

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Mobile Application Testing is Generally Available for US1, US5, and EU sites.</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

## Overview

Manage your uploaded mobile applications and your parallelization settings on the [Synthetic Monitoring & Continuous Testing Settings page][1].

{{< img src="mobile_app_testing/applications_list.png" alt="Mobile Applications Settings" style="width:100%;">}}

## Create an application

To add a mobile application, navigate to the [**Mobile Applications List** tab][5] and click **+ Create Application**.

{{< tabs >}}
{{% tab "Android" %}}

1. Select **Android** as the OS for your mobile application.
2. Name your mobile application.
3. Add `env` tags as well as additional tags to your mobile application. You can use these tags to quickly filter through your mobile app tests on the [Synthetic Monitoring & Continuous Testing page][101]. 
4. Optionally, enter a description for your mobile application.
5. Upload an [`.apk` file][102].
6. Enter a name for the version of your mobile application. Optionally, select **Mark this version as latest**.
7. Click **Create Application**.

[101]: https://app.datadoghq.com/synthetics/tests
[102]: https://developer.android.com/tools/bundletool

{{% /tab %}}
{{% tab "iOS" %}}

1. Select **iOS** as the OS for your mobile application.
2. Name your mobile application.
3. Add `env` tags as well as additional tags to your mobile application. You can use these tags to quickly filter through your mobile app tests on the [Synthetic Monitoring & Continuous Testing page][101]. 
4. Optionally, enter a description for your mobile application.
5. Upload an `.ipa` file.
6. Enter a name for the version of your mobile application. Optionally, select **Mark this version as latest**.
7. Click **Create Application**.

[101]: https://app.datadoghq.com/synthetics/tests

{{% /tab %}}
{{< /tabs >}}

To edit or delete a mobile application, hover over a mobile application in the **Mobile Applications List** and click on the respective icon.

## Manage application versions

Clicking on a mobile application in the **Mobile Applications List** displays existing versions of the application. Hover over a version and click the **+** icon to [create a mobile app test][6] with the selected mobile application's version.

To edit or delete a version of a mobile application, hover over a version in the mobile application and click on the respective icon.

### Add a version

To add a version of an existing mobile application:

1. Hover over the `+` icon in a mobile application in the **Mobile Applications List** and click **Add new version**. 
2. Upload an [`.apk`][4] or `.ipa` file.
3. Enter a version name. 
4. Optionally, select **Mark this version as latest**.
5. Click **Add Version**.

{{< img src="mobile_app_testing/add_new_version.png" alt="Add a new version of a mobile application" style="width:50%;">}}

## Customize your parallelization

For more information about parallelizing your Synthetic tests, see [Continuous Testing Settings][7].



## Permissions

By default, only users with the Datadog Admin and Datadog Standard roles can access the Synthetic Monitoring **Applications List** page. To get access to the **Applications List** page, upgrade your user to one of those two [default roles][2]. 

If you are using the [custom role feature][3], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/settings/
[2]: /account_management/rbac/#datadog-default-roles
[3]: /account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool
[5]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[6]: /mobile_app_testing/mobile_app_tests/
[7]: /continuous_testing/settings/