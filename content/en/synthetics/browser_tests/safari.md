---
title: Safari Browser Testing
description: Use Synthetic Monitoring tests on your Safari Browser.
private: true
site_support_id: synthetics_safari
---

{{< callout url="https://www.datadoghq.com/product-preview/safari-browser-testing/" >}}
  Safari Browser Testing is currently in Preview, but you can easily request access! Use this form to submit your request today. 
{{< /callout >}} 

## Overview

Datadog supports running Synthetic Monitoring tests on the Safari browser, in addition to Chrome, Edge, and Firefox.

## Safari Browser Testing setup

To run Safari tests, create a new Synthetic Monitoring Browser Test that is **only** scheduled to run on Safari devices. 

Use one of the following three options : 

* **[Create a new Synthetic Monitoring Browser Test](#create-a-new-synthetic-monitoring-browser-test)**: To record a new user journey from scratch.  
* **[Clone an existing Synthetic Monitoring Browser Test](#clone-an-existing-synthetic-monitoring-browser-test)**: To start the user journey from an existing Browser Test.
* **[Creating a new Synthetic Monitoring Browser Test, using an existing test as its subtest (recommended)](#create-a-new-synthetic-monitoring-browser-test-using-an-existing-test-as-a-subtest)**: To base your test off the user journey from an existing test without maintaining two separate user journeys.

## **Create a new Synthetic Monitoring Browser Test** 

1. Create a **new** [Browser Test][1].   
2. In the **Set your test details** > **Browser & Devices** section, **uncheck ALL** browsers and devices except the Safari devices you want. 

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Screenshot of a Browser Test creation, with Safari devices selected" width="80%" >}}

3. In the **Select locations > Safari Private Locations** section, select the location named **macos-pl Safari Private Beta** which has been created for you.

   {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Screenshot of a Browser Test creation, showing the private locations drop down" width="70%" >}}

4. You can continue configuring the test as you would a usual Browser Test.

## Clone an existing Synthetic Monitoring Browser Test

1. Create a **new** Browser Test by cloning your desired existing test.

   {{< img src="synthetics/browser_tests/safari/safari_clone.png" alt="Screenshot of cloning an existing Browser Test" width="70%" >}}

2. In the **Set your test details** > **Browser & Devices** section, **uncheck ALL** browsers and devices except the Safari devices you want.

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Screenshot of a Browser Test creation, with Safari devices selected" width="80%" >}}

3. In the **Select locations > Safari Private Locations** section, select the location named **macos-pl Safari Private Beta** which has been created for you.

   {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Screenshot of a Browser Test creation, showing the private locations drop down" width="70%" >}}

4. You can continue to save and run your new test.

   **Note** Since you are cloning tests, any changes made to the user journey in the original test is not automatically applied to your new Safari test.


## Create a new Synthetic Monitoring Browser Test using an existing test as a subtest

1. Create a **new** [Browser Test][1]. 

2. In the **Set your test details** > **Browser & Devices** section, **uncheck ALL** browsers and devices but the Safari devices you want.

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Screenshot of a Browser Test creation, with Safari devices selected" width="80%" >}}

3. In the **Select locations > Safari Private Locations** section, select the location named **macos-pl Safari Private Beta** which has been created for you.

  {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Screenshot of a Browser Test creation, showing the private locations drop down" width="70%" >}}  

4. Click on **Save & Edit Recording**, add your desired test as a subtest _playing in the main window_ : 

   {{< img src="synthetics/browser_tests/safari/safari_subtest.png" alt="Screenshot of adding an existing subtest" width="70%" >}} 

   **Note**: This references the existing test, so any modifications made to the user journey in the existing test are automatically applied to your new Safari test.

## FAQ

### Can I run a test both on Safari and non-Safari browsers?

**No**. At the moment Synthetic Monitoring browsers tests can only be run on either Safari devices **OR** non Safari devices.

### Can I run Safari tests from managed locations?

**No**. Safari Browser Tests are limited to a dedicated Safari private location in your account. See [list of Synthetic Monitoring Private Locations][2].

**Note**: An API key labeled `MANAGED` and named `API Key managed by synthetics-platform` was created and added to your organization to set up this dedicated Safari private location. **Do not revoke this key** as it is required to enable Safari testing.

In the context of this Preview, it is **expected** that some monitors may be triggered for this private location. The monitors can be resolved by ignoring the `synthetics-safari-private-beta:true` tag.

**Please do not change the name of this private location** as a specific name is required to enable Safari testing. You can restrict its usage and/or add tags to it as needed.

### Are there any existing limitations for Safari tests?

**Yes**. Safari browser specific limitations can affect some of the regular Synthetic Monitoring Browser Test features: 

1. **Managed locations:** Safari tests can only run on a Private Location dedicated to your Datadog account. 
2. **Running Subtests in a new window:** It is only possible to run subtests in the main window.
3. **Errors & Warnings:** Due to Safari limitations, it is not possible to see error details in the **Errors & Warnings** tab.  
4. **Page Resources:** The `type` information for some of the resources in page resources might not be displayed properly. 
5. **Max Concurrency / Parallelization:** For the Preview, you can run up to two tests in parallel while other pending tests are queued. 
6. **Download file:** This feature is not yet available in the Safari Preview.


[1]: https://app.datadoghq.com/synthetics/browser/create
[2]: https://app.datadoghq.com/synthetics/settings/private-locations?query=macos-pl