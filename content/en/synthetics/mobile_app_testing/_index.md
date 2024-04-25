---
title: Mobile Application Testing and Monitoring
kind: documentation
description: "Create intelligent, self-maintaining mobile tests to ensure the most critical parts of your mobile applications are up and running from real devices."
aliases:
- /mobile_testing
- /mobile_app_testing
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/synthetics/mobile_app_testing/mobile_app_tests"
  tag: "Documentation"
  text: "Learn how to create Synthetic mobile app tests"
- link: "/synthetics/mobile_app_testing/settings"
  tag: "Documentation"
  text: "Learn how to upload your iOS or Android mobile applications"
- link: "/continuous_testing/"
  tag: "Documentation"
  text: "Learn about Continuous Testing & CI/CD"
cascade:
  algolia:
    tags: ['mobile_testing']
---

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Mobile Application Testing is Generally Available for US1, US5, and EU sites.</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}


Mobile Application Testing allows you to test and monitor key business flows for Android and iOS applications using real devices. Datadog runs these tests on real devices to provide a realistic, step-by-step representation of key application workflows, screenshots of each step, and detailed pass or fail results so your team can quickly visualize what went wrong.

## Record mobile app tests

[Record mobile app tests][1] for Android and iOS using the no-code test recorder, which makes it easy to create robust and comprehensive tests.

{{< img src="mobile_app_testing/mobile-test-screenshots.mp4" alt="Examples of the recording workflow for a Synthetic Mobile Test" video="true" >}}

## Run tests on CI or manually run tests

[Trigger mobile app tests][2] from your CI pipeline using [Continuous Testing][3], or [schedule mobile app tests][4] to run at regular intervals and manually trigger mobile app tests on the Datadog site.

## Use the Synthetic Monitoring & Testing Results Explorer

Create [search queries and visualizations][5] for your Synthetic test runs or batches of tests running in CI/CD pipelines in the [Synthetic Monitoring & Testing Results Explorer][6]. 

{{< img src="mobile_app_testing/explorer_mobile_test_runs.png" alt="Mobile App Test Runs in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests
[2]: /mobile_app_testing/mobile_app_tests/#run-tests-in-ci
[3]: /continuous_testing
[4]: /mobile_app_testing/mobile_app_tests/#scheduling-and-alerting
[5]: /continuous_testing/explorer
[6]: https://app.datadoghq.com/synthetics/explorer