---
title: Mobile Application Testing Settings
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Mobile Application Testing and
  Monitoring > Mobile Application Testing Settings
sourceUrl: https://docs.datadoghq.com/synthetics/mobile_app_testing/settings/index.html
---

# Mobile Application Testing Settings

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Manage your uploaded mobile applications and your parallelization settings on the [Synthetic Monitoring & Continuous Testing Settings page](https://docs.datadoghq.com/synthetics/settings/).

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/applications_list_2.1c86ab92a50cb2b308c324434d8eadc9.png?auto=format"
   alt="Mobile Applications Settings" /%}

## Create an application{% #create-an-application %}

To add a mobile application, navigate to the [**Mobile Applications List** tab](https://app.datadoghq.com/synthetics/settings/mobile-applications) and click **+ Create Application**.

{% tab title="Android" %}

1. Select **Android** as the OS for your mobile application.
1. Select the framework your application is built with. Supported frameworks are native Android frameworks and React Native.
1. Name your mobile application.
1. Add `env` tags as well as additional tags to your mobile application. You can use these tags to filter through your mobile app tests on the [Synthetic Monitoring & Continuous Testing page](https://app.datadoghq.com/synthetics/tests).
1. Optionally, enter a description for your mobile application.
1. Upload an [`.apk` file](https://developer.android.com/tools/bundletool).
1. Enter a name for the version of your mobile application. Optionally, select **Mark this version as latest**.
1. Click **Create Application**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/settings/mobile_app_settings_android.ec55d2a44d7f8f9b03153bbf38c700ec.png?auto=format"
   alt="Create a mobile app test with Android and Native (default) selected" /%}

{% /tab %}

{% tab title="iOS" %}

1. Select **iOS** as the OS for your mobile application.
1. Select the framework your application is built with. Supported frameworks are native iOS frameworks and React Native.
1. Name your mobile application.
1. Add `env` tags as well as additional tags to your mobile application. You can use these tags to filter through your mobile app tests on the [Synthetic Monitoring & Continuous Testing page](https://app.datadoghq.com/synthetics/tests).
1. Optionally, enter a description for your mobile application.
1. Upload an `.ipa` file.
1. Enter a name for the version of your mobile application. Optionally, select **Mark this version as latest**.
1. Click **Create Application**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/settings/mobile_app_settings_ios.ade9e75ace1f432dabcfd89f598b55a7.png?auto=format"
   alt="Create a mobile app test with iOS and Native (default) selected" /%}

{% /tab %}

To edit or delete a mobile application, hover over a mobile application in the **Mobile Applications List** and click on the respective icon.

{% alert level="info" %}
**Note**: As of July 2025, React Native applications are officially supported for Mobile Application Testing. No action is needed for React Native applications that were uploaded before official support: tests continue to run as expected. Mobile Application Testing does not provide full support for Flutter applications.
{% /alert %}

## Manage application versions{% #manage-application-versions %}

Clicking on a mobile application in the **Mobile Applications List** displays existing versions of the application. Hover over a version and click the **+** icon to [create a mobile app test](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/) with the selected mobile application's version.

To edit or delete a version of a mobile application, hover over a version in the mobile application and click on the respective icon.

### Add a version{% #add-a-version %}

To add a version of an existing mobile application:

1. Hover over the `+` icon in a mobile application in the **Mobile Applications List** and click **Add new version**.
1. Upload an [`.apk`](https://developer.android.com/tools/bundletool) or `.ipa` file.
1. Enter a version name.
1. Optionally, select **Mark this version as latest**.
1. Click **Add Version**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/add_new_version.99e668a7954da4bac8687a2e64149f4b.png?auto=format"
   alt="Add a new version of a mobile application" /%}

## Customize your parallelization{% #customize-your-parallelization %}

For more information about parallelizing your Synthetic tests, see [Continuous Testing Settings](https://docs.datadoghq.com/continuous_testing/settings/).

## Permissions{% #permissions %}

By default, only users with the Datadog Admin and Datadog Standard roles can access the Synthetic Monitoring **Applications List** page. To get access to the **Applications List** page, upgrade your user to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac/#datadog-default-roles).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac/#custom-roles), add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

## Further reading{% #further-reading %}

- [Learn how to create a mobile test](https://docs.datadoghq.com/synthetics/mobile_app_testing/)
- [Run your Synthetic tests in a CI pipeline](https://docs.datadoghq.com/continuous_testing/cicd_integrations)
