---
title: Record steps with a custom User-Agent
kind: documentation
description: Record Browser test steps with a custom User-Agent string 
further_reading:
- link: "/synthetics/browser_tests/actions"
  tag: "Documentation"
  text: "Learn about steps for browser tests"
- link: "/synthetics/browser_tests/advanced_options/"
  tag: "Documentation"
  text: "Configure advanced options for steps"
---

In some cases, you might need to set a specific `User-Agent` string to be able to record your browser tests steps. To do so:

1. Open your application in a pop up by clicking on **Open in Popup** in your browser test recorder.
2. Open your Chrome Developer Tools.
3. Click on the menu button with the three vertical dots.
4. Select the **More tools - Network conditions** option.
5. Go to the **Network conditions** tab and disable the **Select automatically** option.
6. Choose **Custom** and enter the `User-Agent` string of interest.

**Note:** The  [default `User-Agent` string][1] can be overridden at test execution time by adding it as a header in your test configuration. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/guide/identify_synthetics_bots/?tab=apitests#default-headers
