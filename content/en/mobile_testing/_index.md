---
title: Mobile Application Testing
kind: documentation
description: "Create intelligent, self-maintaining mobile tests to ensure the most critical parts of your mobile applications are up and running from real devices."
disable_sidebar: true
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/mobile_testing/mobile_tests"
  tag: "Documentation"
  text: "Learn how to create Synthetic mobile tests"
- link: "/continuous_testing/"
  tag: "Documentation"
  text: "Learn about Continuous Testing & CI/CD"
algolia:
  tags: ['mobile_testing']
---

Mobile tests allow you to observe how your mobile applications are performing using **simulated requests and actions from real devices**. Datadog tracks the performance of your mobile applications and alerts you about faulty behavior such as regressions, broken features, high response times, and unexpected status codes. 

[**Computing SLOs**][4] on your key endpoints and user journeys makes it easier to stick to your application performance targets and ultimately provide a consistent customer experience.

You can create mobile tests in Datadog by navigating to [**UX Monitoring** > **New Test**][1] and selecting **Mobile Application Test**.

## Upload a mobile application

[Create a mobile application][2] for your Android or iOS application, upload the `.apk` or `.ipa` file, and specify an application version.

## Record mobile application tests

[Create mobile tests][3] on critical user journeys and business journeys to monitor how your customers experience your iOS and Android applications end-to-end from different device types.

{{< img src="mobile_testing/mobile_application_testing_demo.png" alt="Examples of the recording workflow for a Synthetic Mobile Test" style="width:90%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/mobile/create
[2]: /mobile_testing/settings
[3]: /mobile_testing/mobile_tests
[4]: /service_management/service_level_objectives