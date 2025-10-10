---
title: Run Mobile App tests from Restricted Networks
description: Run Mobile App tests from restricted networks
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Mobile Application Testing and
  Monitoring > Run Mobile App tests from Restricted Networks
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/restricted_networks/index.html
---

# Run Mobile App tests from Restricted Networks

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Some of your applications might not be available to the public Internet because they are accessing development or local environments, or they are internal applications intended for users within your corporate network (for example, your corporate intranet or VPN).

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/mobile_app_restricted_networks.f4c99444d4232c0b3682d9aa8c34673c.png?auto=format"
   alt="Diagram showing testing of mobile apps behind a firewall or restricted networks" /%}

To test these applications, add the following IP address ranges to your company's allowlist. This ensures successful requests from your applications in Datadog Mobile App Testing.

The following is the list of IP ranges associated with the real devices used for Datadog Mobile App Testing:

### AWS Device Farm{% #aws-device-farm %}

`54.244.50.32/27``99.78.197.0/29``15.248.40.40/29``54.239.50.200/29`

### US West{% #us-west %}

`34.125.90.96/27``34.125.246.157/32``44.225.33.89/32``66.85.48.0/21``162.222.72.0/21`

### US East{% #us-east %}

`66.85.48.0/21``162.222.72.0/21``34.145.254.128/27`

### EU Central{% #eu-central %}

`34.107.82.96/27``34.141.28.96/32``162.222.79.0/27``185.94.24.0/22`

### HTTP steps{% #http-steps %}

Below is the list of IP ranges required for executing HTTP steps within Synthetic Mobile Application Tests. You may disregard these ranges if your tests do not use HTTP steps.

`52.13.151.244/32``54.201.250.26/32``44.236.137.143/32``52.35.189.191/32``34.208.32.189/32``52.35.61.232/32``52.89.221.151/32``3.120.223.25/32``3.121.24.234/32``18.195.155.52/32`

## Troubleshooting{% #troubleshooting %}

If you experience issues with Mobile App Testing on restricted networks, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support](https://docs.datadoghq.com/help).

### Unable to launch recorder{% #unable-to-launch-recorder %}

To launch the Mobile Application Testing (MAT) Recorder, Datadog needs to establish UDP/TCP TURN connections to enable WebRTC connections. If the user is behind a restrictive network (such as a strict firewall or VPN), these connections may fail, leading to a "Device unexpectedly disconnected" error:

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/restricted_networks/device_disconnected_error.9d222293ae02203c9f1144a81389def6.png?auto=format"
   alt="Screenshot of launching a mobile device, displaying the disconnected error." /%}

To check for successful UDP/TCP TURN connections, run a network test using a [Twilio Network Test](https://networktest.twilio.com/). The result of the test confirms whether connectivity to TURN servers is successful or not. If the connection is successful, you will see a message like "Successfully established a UDP connection to Twilio":

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/restricted_networks/twilio_test.11b40bff06dd8023ab4ab2e7eacafdaa.png?auto=format"
   alt="Screenshot of a successful test using a Twilio Network Test." /%}

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

## Further reading{% #further-reading %}

- [Best practices for creating end-to-end tests](https://www.datadoghq.com/blog/test-creation-best-practices/)
- [Learn how to create Synthetic mobile app tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/)
- [Learn how to upload your iOS or Android mobile applications](https://docs.datadoghq.com/synthetics/mobile_app_testing/settings)
