---
title: Run Mobile App tests from Restricted Networks
description: "Run Mobile App tests from restricted networks"
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

Some of your applications might not be available to the public internet because they are accessing development or local environments, or they are internal applications intended for users within your corporate network (for example, your corporate intranet or VPN).

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


### HTTP steps

Below is the list of IP ranges required for executing HTTP steps within Synthetic Mobile Application Tests. You may disregard these ranges if your tests do not use HTTP steps.

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

### Unable to launch recorder

To launch the Mobile Application Testing (MAT) Recorder, Datadog needs to establish UDP/TCP TURN connections to enable WebRTC connections. If the user is behind a restrictive network (such as a strict firewall or VPN), these connections may fail, leading to a "Device unexpectedly disconnected" error:

{{< img src="/mobile_app_testing/restricted_networks/device_disconnected_error.png" alt="Screenshot of launching a mobile device, displaying the disconnected error." style="width:100%;" >}}

To check for successful UDP/TCP TURN connections, run a network test using a [Twilio Network Test][2]. The result of the test confirms whether connectivity to TURN servers is successful or not. If the connection is successful, you will see a message like "Successfully established a UDP connection to Twilio":

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
