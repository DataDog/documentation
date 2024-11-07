---
title: Run Mobile App tests from Restricted Networks
description: "Run Mobile App tests from restricted networks"
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
cascade:
  algolia:
    tags: ['mobile_testing']
---

## Overview

Some of your applications might not be available to the public Internet because they are accessing development or local environments, or they are internal applications intended for users within your corporate network (for example, your corporate intranet or VPN). 

{{< img src="/mobile_app_testing/mobile_app_restricted_networks.png" alt="Diagram showing testing of mobile apps behind a firewall or restricted networks" style="width:100%;">}}

To test these applications, add the following IP address ranges to your company's allowlist. This ensures successful requests from your applications in Datadog Mobile App Testing. 

The following is the list of IP ranges associated with the real devices used for Datadog Mobile App Testing:

`54.244.50.32/27`</br>
`99.78.197.0/29`</br>
`15.248.40.40/29`</br>
`54.239.50.200/29`</br>
`34.125.90.96/27`</br>
`34.125.246.157/32`</br>
`44.225.33.89/32`</br>
`66.85.48.0/21`</br>
`162.222.72.0/21`</br>
`34.107.82.96/27`</br>
`34.141.28.96/32`</br>
`162.222.79.0/27`</br>
`185.94.24.0/22`</br>
`34.96.70.78`</br>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}