---
title: Integrate your Synthetic test monitor with Statuspage
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/guide/integrate-monitors-with-statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate monitors with Statuspage"
---

## Overview

If you use [Atlassian Statuspage][6] for visibility into your applications' and services' uptime, you can update the status of your systems with Synthetic test monitor notifications.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" style="width:95%;">}}

1. See the [Statuspage documentation][7] to generate a component-specific email address.
2. Add the generated email address into your test's notification message. For example, `@custom-statuspage-email@notifications.statuspage.io`.
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state. For example, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Fill out the monitor notification section and add a summary in the monitor name. For example, `Shopist Checkout Functionality`.
5. After you have configured your monitor, click **Save & Exit**.

For more information, see [Integrating Monitors with Statuspage][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /monitors/guide/integrate-monitors-with-statuspage/