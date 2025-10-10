---
title: Network Tests
description: Analyze global Network Paths with managed locations.
aliases:
further_reading:
- link: "/network_monitoring/network_path/"
  tag: "Doc"
  text: "Learn more about Network Path"
---

## Overview

Network Path testing in Synthetic Monitoring gives you complete visibility into the routes your synthetic tests follow, enabling you to pinpoint where failures happen, whether in applications, on-premises networks, or with ISPs. This accelerates root cause analysis, enables proactive issue detection, and triggers actionable alerts when tests fail. It also provides uptime data to help you measure and communicate the value of your network reliability investments.

Running Network Path tests from managed locations lets you perform TCP, UDP, and ICMP checks on your application to visualize the Network Path packets follow when executing queries from different global locations.

## Test creation

1. In the Datadog site, hover over **Digital Experience** in the left hand menu and select Tests (under Synthetic Monitoring & Testing).
2. Click **New Test > Network Path Test**.

{{< img src="synthetics/network_tests/network_path_test.png" alt="Network Path test creation from New Synthetics Test" style="width:60%;">}}

## Test configuration

1. Choose your request type (TCP, UDP, or ICMP) and specify the URL to query. Port information is optional.  
2. Name your test.  
3. Optional: Configure advanced options:  
   1. **Source service**: The label displayed for the source host in the Network Path visualization.  
   2. **Destination service**: The label displayed for the destination host in the Network Path visualization.  
   3. **Max TTL**: Maximum time-to-live (maximum number of hops) for outgoing probe packets. Defaults to 30 hops.  
   4. **E2E Queries**: Number of packets sent to the destination to measure packet loss, latency, and jitter.  
   5. **Traceroute Queries**: Number of traceroute path tracings to perform. Results are aggregated in each test run details panel.  
   6. **TCP traceroute strategy** (TCP tests only): Choose between Selective Acknowledgement (SACK) and Synchronize (SYN) traceroute strategies. SACK and Force SACK more closely mimic modern application traffic.  
4. Optional: Add **Tags** to your test, including environment tags. Use tags to filter your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][1].

  {{< img src="synthetics/network_tests/new_network_path_test.png" alt="Network Path test creation form with Advanced options displayed." style="width:80%;">}}

5. Define assertions to determine the expected results for your test. At least one assertion is required.

  {{< img src="synthetics/network_tests/network_path_assertions.png" alt="Network Path test creation form with assertions drop down." style="width:80%;">}}
   | Type | Operator 1 | Operator 2 | Value type |
   | :---- | :---- | :---- | :---- |
   | latency | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |
   | packet loss |  | `is`, `<`, `<=`, `>`, `>=` | int (0 to 100\) |
   | jitter |  | `is`, `<`, `<=`, `>`, `>=` | float |
   | network hops  | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |

6. Select the locations from which to run your test. Network Path tests can run from managed locations to test from outside your network.

  {{% managed-locations %}}

7. Set the test frequency to determine how often Datadog runs your Network Path test. Scheduled tests ensure your most important endpoints remain accessible to your users.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests