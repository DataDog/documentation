---
title: Reusing browser tests journeys across your test suite
kind: guide
further_reading:
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: '/synthetics/browser_tests/actions'
      tag: 'Documentation'
      text: 'Create Browser Test Steps'
    - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
      tag: 'Blog'
      text: 'Best practices for creating end-to-end tests'

---

## Overview

There are a number of cases in which it makes sense to reuse a similar journey in several different tests. Some examples include:

* If most of your application’s functionalities are located behind a login, you might want to [reuse your login steps](#create-and-re-use-a-login-subtest) at the beginning of each of your tests
* If you want to monitor your application’s functionalities on several different environments, you can create tests for your prod environment and then leverage these as subtests for your other environments (dev, staging, etc.)
* If running your tests leads to in database object creation, you can create tests to keep your testing environment clean and use these as subtests to systematically have clean up performed at the beginning or end of your tests.

The Browser test subtest feature allows you to reuse your journeys among your test suite and consequently:
* **Saves you time at test creation** (eg. if you have a login test, you just need to call it as a subtest at the beginning of all your test suite, instead of recording the same login steps for each of your tests);
* **Makes your tests easier to understand**, as you make blocks that are meaningful to the person reading after you;
* **Allows for better maintenance**, because if your flows change, you only need to update it once, and not once per test.

In the below example, we look into creating and re-using a login subtest.

## Create and re-use a login subtest

If monitoring your application involves first logging into it, a best practice is to create a single test containing all your login steps, and to then have all your other Browser tests leverage that login test as a subtest. 

To create a login test and use it as a subtest in the rest of your test suite:

1. Create a first test A that does nothing but logging into your application. You can set the **start URL** of this test A to your pre login URL.

{{< img src="synthetics/guide/reusing-browser-test-journeys/login_subtest_recording.mp4" alt="Recording the Login subtest" video="true"  width="100%">}}

2. Create a second test B that monitors any post login functionalities of your application. You can set the **start URL** of this test B to your pre login URL as well.

{{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_configuration.png" alt="Configuring the parent test" >}}

In the above example, you can see that this second test focuses on dashboard creation monitoring.

3. Once on the recorder of your test B, click the Subtest button and select the login test A you just created. 

{{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_subtest.mp4" alt="Including subtest in parent test" video="true"  width="100%">}}

You just created a **Subtest** step: all the steps of the subtest (ie. test A) are consequently played at the beginning of your parent test (ie. test B).
By default, the subtest is played in the main tab. This means your subtest steps are played in the same tab as the previous and following steps. The subtest starts running using the URL that was set in the parent test (ie. the pre login URL), and once all the subtest steps have been executed, the Browser test executes the parent’s first non subtest step from the page the subtest was last on. We did not set any parent step for now.

You can only see that after importing your login subtest (ie. test A) in your parent test (ie. test B), the two variables from the login subtest are imported into your parent test as well.

**Note:** You can choose the tab in which the subtest should execute using [**Subtest Advanced Options**][1].

4. Login to your account with the dedicated credentials in the iframe/pop up associated with the recorder in order to start recording your parent test’s steps from the same state your Browser test would be in after going through the subtest’s steps.

{{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_iframe.mp4" alt="Replaying subtest in parent test" video="true"  width="100%">}}

5. Hit **Start recording** once you’re logged in to start recording the parent test’s post login steps you’re interested in. Once you’re done hit **Save**.

{{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_recording.mp4" alt="Recording parent test" video="true"  width="100%">}}

In the above example we are checking that after logging into a test Datadog account, users are able to create a timeboard and that the timeboard is associated with the user who created it.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options#subtests
