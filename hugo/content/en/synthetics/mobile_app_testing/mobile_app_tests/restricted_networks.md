---
title: Run Mobile App tests from Restricted Networks
description: "Configure network access for Mobile App tests using physical and IP-routed locations."
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/synthetics/mobile_app_testing/"
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

A mobile application may access services protected by firewalls, IP allowlists, or other network restrictions. To test the application, configure those services to accept traffic from the devices running the Mobile App tests.

Mobile App Testing supports physical locations and IP-routed locations. The selected location type affects the source IP addresses your network needs to allow.

**IP-location routing is not a connection to a corporate VPN.** Selecting an IP-routed location does not establish a tunnel into a private network or make private services publicly reachable. The application's services must remain reachable through your organization's approved network-access configuration.

{{< img src="/mobile_app_testing/mobile_app_restricted_networks.png" alt="Diagram showing testing of mobile apps behind a firewall or restricted networks" style="width:100%;">}}

## Locations and network access

### Physical locations

Physical locations use the US or EU device location without applying IP-location routing. Device availability varies by model and operating system version. See [Supported Mobile App Testing Devices][3] for physical-location availability.

### IP-routed locations

IP-routed locations route the device's network traffic through a selected geographic location. Use these locations to test application behavior that depends on the apparent geographic origin of network requests.

Only devices that support IP routing can use IP-routed locations. Physical-location availability does not indicate IP-routing support. Check compatibility in the device selector when creating or editing a test.

If the application uses an IP allowlist, verify the egress IP addresses used by the selected routed locations before configuring the allowlist. Do not assume that allowing physical-device IP addresses also allows IP-routed traffic. Contact [Datadog support][1] for help confirming the network-access requirements.

## Device traffic

Configure the application's firewall or IP allowlist to accept traffic from the devices running the tests. Allowlisting source IP addresses does not make an otherwise unreachable private endpoint accessible.

The following IP ranges are associated with the real devices used for Mobile App Testing. For IP-routed locations, verify the applicable egress addresses separately rather than treating this list as coverage for every routed location.

`54.244.50.32/27`</br>
`99.78.197.0/29`</br>
`15.248.40.40/29`</br>
`54.239.50.200/29`</br>
`34.125.90.96/27`</br>
`34.125.246.157/32`</br>
`44.225.33.89/32`</br>
`66.85.48.0/21`</br>
`162.222.72.0/21`</br>
`66.85.48.0/21`</br>
`162.222.72.0/21`</br>
`34.145.254.128/27`</br>
`34.107.82.96/27`</br>
`34.141.28.96/32`</br>
`162.222.79.0/27`</br>
`185.94.24.0/22`</br>
`103.231.42.40/29`<br>
`103.231.79.40/29`<br>
`209.58.137.40/29`<br>
`217.112.145.88/29`<br>
`149.6.5.8/29`<br>
`3.221.56.233`<br>
`3.72.174.80`<br>
`3.73.105.110/32`<br>
`3.72.144.221/32`<br>
`18.235.85.58/32`<br>
`44.207.198.148/32`<br>
`3.109.252.59`<br>
`43.205.182.101`<br>
`18.138.79.89`<br>
`54.254.173.86`<br>
`52.72.255.172`<br>
`13.126.232.213`<br>
`34.246.27.205`<br>
`3.222.169.4`<br>
`43.204.134.9`<br>
`54.228.155.35`<br>
`54.225.186.4`<br>
`52.71.149.142`<br>
`44.238.12.62`<br>
`3.111.139.20`<br>
`54.255.17.88`<br>
`3.64.247.89`<br>


## Network access for HTTP steps {#http-steps}

HTTP steps have separate network-access requirements from requests made by the mobile application. Selecting an IP-routed device location does not route HTTP-step traffic through that location.

If the tests include HTTP steps, allow the following HTTP-step IP ranges in addition to the applicable device-traffic IP addresses. If the tests do not include HTTP steps, omit these ranges.

`52.13.151.244/32`<br>
`54.201.250.26/32`<br>
`44.236.137.143/32`<br>
`52.35.189.191/32`<br>
`52.88.130.174/32`<br>
`44.236.20.182/32`<br>
`35.85.123.4/32`<br>
`34.210.15.72/32`<br>
`54.244.50.32/27`<br>
`99.78.197.0/29`<br>
`15.248.40.40/29`<br>
`54.239.50.200/29`<br>
`34.208.32.189/32`<br>
`52.35.61.232/32`<br>
`52.89.221.151/32`<br>
`3.120.223.25/32`<br>
`3.121.24.234/32`<br>
`18.195.155.52/32`<br>

## Troubleshooting

If you experience issues with Mobile App Testing on restricted networks, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][1].

### Application requests are blocked

If the application launches but cannot reach its services:

1. Check whether the test uses a physical or IP-routed location.
2. Verify that the selected device supports that location.
3. Check firewall or access logs for the request's source IP address and confirm that the allowlist permits it.
4. Verify that the destination is reachable from the test device. IP-location routing does not establish access to a corporate VPN.

### Unable to launch recorder

The Mobile App Testing recorder requires connectivity between your browser and the remote device. Datadog uses UDP/TCP TURN connections to establish WebRTC connections. A restrictive firewall or VPN on your workstation can block these connections, resulting in a **Device unexpectedly disconnected** error.

This connection is separate from the device's access to the application's services. Allowlisting application traffic does not necessarily resolve recorder connectivity problems:

{{< img src="/mobile_app_testing/restricted_networks/device_disconnected_error.png" alt="Screenshot of launching a mobile device, displaying the disconnected error." style="width:100%;" >}}

To check UDP/TCP TURN connectivity, run a [Twilio Network Test][2]. A successful connection displays a message such as "Successfully established a UDP connection to Twilio":

{{< img src="/mobile_app_testing/restricted_networks/twilio_test.png" alt="Screenshot of a successful test using a Twilio Network Test." style="width:100%;" >}}

If the test fails, Twilio generates a log output indicating errors due to an inability to establish a connection. For example:

```
[3:09:13 PM] Test "TURN UDP Connectivity" started...
[3:09:20 PM] Error: Error: Could not establish a UDP connection to Twilio within 5 seconds
[3:09:20 PM] Test "TURN TCP Connectivity" started...
[3:09:25 PM] Error: Error: Could not establish a TCP connection to Twilio within 5 seconds
[3:09:25 PM] Test "TURN TLS Connectivity" started...
[3:09:30 PM] Error: Error: Could not establish a TLS connection to Twilio within 5 seconds
[3:09:30 PM] Test "Bandwidth" started...
[3:09:35 PM] Error: Error: Could not establish a connection to Twilio within 5 seconds
```

[1]: /help
[2]: https://networktest.twilio.com/
[3]: /synthetics/mobile_app_testing/devices/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
