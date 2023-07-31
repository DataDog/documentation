---
title: Mobile Application Testing and Monitoring
kind: documentation
description: "Create intelligent, self-maintaining mobile tests to ensure the most critical parts of your mobile applications are up and running from real devices."
disable_sidebar: true
is_beta: true
aliases:
- /mobile_testing
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/mobile_app_testing/mobile_app_tests"
  tag: "Documentation"
  text: "Learn how to create Synthetic mobile app tests"
- link: "/mobile_app_testing/settings"
  tag: "Documentation"
  text: "Learn how to upload your iOS or Android mobile applications"
- link: "/continuous_testing/"
  tag: "Documentation"
  text: "Learn about Continuous Testing & CI/CD"
cascade:
  algolia:
    tags: ['mobile_testing']
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSeHny7qHl5w3u3DCI4Ilc-r4IQZSAFOeZgMvP3CKBO9hEl1qA/viewform" >}}
  Mobile Application Testing is in private beta. To request access, complete the form.
{{< /callout >}} 

Mobile Application Testing allows you to test and monitor key business flows for Android and iOS applications using real devices. Datadog runs these tests on real devices to provide a realistic, step-by-step representation of key application workflows, screenshots of each step, and detailed pass or fail results so your team can quickly visualize what went wrong.

## Record mobile app tests

[Record mobile app tests][1] for Android and iOS using the no-code test recorder, which makes it easy to create robust and comprehensive tests.

{{< img src="mobile_app_testing/mobile-test-screenshots.mp4" alt="Examples of the recording workflow for a Synthetic Mobile Test" video="true" >}}

## Run tests on CI or manually run tests

[Trigger mobile app tests][2] from your CI pipeline using [Continuous Testing][3], or [schedule mobile app tests][4] to run at regular intervals and manually trigger mobile app tests on the Datadog site.

## Use the Synthetic Monitoring & Continuous Testing Explorer

Create [search queries and visualizations][5] for your Synthetic test runs or batches of tests running in CI/CD pipelines in the [Synthetic Monitoring & Continuous Testing Explorer][6]. 

{{< img src="continuous_testing/explorer_ci_batches.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests
[2]: /mobile_app_testing/mobile_app_tests/#run-tests-in-ci
[3]: /continuous_testing
[4]: /mobile_app_testing/mobile_app_tests/#scheduling-and-alerting
[5]: /continuous_testing/explorer
[6]: https://app.datadoghq.com/synthetics/explorer