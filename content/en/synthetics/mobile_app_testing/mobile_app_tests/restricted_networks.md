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

Mobile App Testing for restricted networks enables you to monitor mobile tests conducted on networks that are not publicly accessible.

{{< img src="/mobile_app_testing/mobile_app_restricted_networks.png" alt="Diagram showing testing of mobile apps behind a firewall or restricted networks" style="width:100%;">}}

Add the following IP address ranges to your Agent [network allow list][1] to allow traffic from Mobile app tests to access restricted networks, such as staging environments, development environments, and other non-public apps or apps that requiring VPN access.


`54.244.50.32/27`</br>
`99.78.197.0/29`</br>
`15.248.40.40/29`</br>
`54.239.50.200/29`


`34.125.90.96/27`</br>
`34.125.246.157/32`</br>
`44.225.33.89/32`</br>
`66.85.48.0/21`</br>
`162.222.72.0/21`

`34.107.82.96/27`</br>
`34.141.28.96/32`</br>
`162.222.79.0/27`</br>
`185.94.24.0/22`

`34.96.70.78`

[1]: /agent/configuration/network/


## Further reading

{{< partial name="whats-next/whats-next.html" >}}