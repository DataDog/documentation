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
- link: "/mobile_testing/settings"
  tag: "Documentation"
  text: "Learn how to upload your iOS or Android mobile applications"
- link: "/continuous_testing/"
  tag: "Documentation"
  text: "Learn about Continuous Testing & CI/CD"
cascade:
  algolia:
    tags: ['mobile_testing']
---

Mobile tests allow you to observe how your mobile applications are performing using **simulated requests and actions from real devices**. Datadog tracks the performance of your mobile applications and alerts you about faulty behavior such as regressions, broken features, high response times, and unexpected status codes. 

[**Computing SLOs**][1] on your key endpoints and user journeys makes it easier to stick to your application performance targets and provide a consistent customer experience.

## Upload a mobile application

[Create a mobile application][2] for your Android or iOS application by uploading an `.apk` or `.ipa` file and specifying the application version.

## Record mobile application tests

{{< img src="mobile_testing/mobile_application_testing_demo.png" alt="Examples of the recording workflow for a Synthetic Mobile Test" style="width:80%;">}}

[Create mobile tests][3] on critical user journeys and business journeys to monitor how your customers experience your iOS and Android applications end-to-end from different device types.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/service_level_objectives
[2]: /mobile_testing/settings
[3]: /mobile_testing/mobile_tests