---
title: Generate Synthetics Browser Tests from RUM Session Replays
kind: guide
further_reading:
    - link: # TODO: blog post link
      tag: 'Blog'
      text: 'Create browser tests directly from Datadog RUM Session Replay'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: 'real_user_monitoring/browser'
      tag: 'Documentation'
      text: 'RUM Browser Monitoring'

---

## Overview

Real User Monitoring (RUM) gives you end-to-end visibility into the real-time activity and experience of individual users. 
Synthetic tests allow you to observe how your systems and applications are performing using simulated requests and actions from around the globe.
Operated together, you can create browser tests from RUM Session Replays. Ensuring that your tests accurately represent real user behaviors.


{{< img src="synthetics/guide/rum-synthetics/convert.png" alt="Convertor popup">}}


## Generate tests based on RUM Session Replays
To create new tests from Datadog RUM's Session Replay, go in RUM and select a session with Session Replay you want to create a test from.
Click on the "Create Browser Test" button at the top of the RUM timeline. 

This will automatically clone the events captured within a session replay, such as user clicks and page loads, into individual steps for a new browser test. For example, in the following screenshot, we cloned a user's session on the shopping page, which includes navigating to it and clicking the "Add to cart" button. 

{{< img src="synthetics/guide/rum-synthetics/recorder_filled.png" alt="Browser test recorder filled automatically with RUM data">}}

Further customize your tests and test steps to suit your needs, just as you would for any other browser test. For instance, you can add additional test steps (such as assertions), adjust the frequency of your test's runs, and customize its notification.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables 
[2]: /synthetics/api_tests/http_tests
