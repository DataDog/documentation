---
title: Mobile Application Private Locations
description: "Run Mobile App tests from private locations"
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
Customers can add the following IP Address Ranges to their allow list to allow traffic from Mobile App Tests to access restricted networks e.g. staging environments, dev environments, non-public apps or apps that require a VPN to access.

private locations allows you to package up synthetics and run on your own server

allows you to access networks not public to internet (such as dev/staging)

mobile doesn’t have this concept yet (Have to allow IP allow list) so hence need this doc

Add the list of IPs without specifying location/region etc.

Synthetic mobile tests run on external mobile device providers. Tests running on these devices have predictable IPs, so that customers can expect any network request to be coming from known IP ranges.

Some customers have restricted networks, and need to add these IP ranges to their allowlist.

AWS Device Farm
Documentation: Get the IP address range of Device Farm mobile devices 

IP CIDR ranges:

54.244.50.32/27

99.78.197.0/29

15.248.40.40/29

54.239.50.200/29

Saucelabs
Documentation: Data Center Endpoints | Sauce Labs Documentation 

US West Data Center IP CIDR ranges:

34.125.90.96/27

34.125.246.157/32

44.225.33.89/32

66.85.48.0/21

162.222.72.0/21

EU Central Data Center IP CIDR ranges:

34.107.82.96/27

34.141.28.96/32

162.222.79.0/27

185.94.24.0/22

Sauce Connect Proxy IP CIDR ranges:

34.96.70.78
## Further reading

{{< partial name="whats-next/whats-next.html" >}}