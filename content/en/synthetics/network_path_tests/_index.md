---
title: Network Path Testing
description: Analyze global Network Paths with managed locations.
aliases:
further_reading:
- link: "/network_monitoring/network_path/"
  tag: "Doc"
  text: "Learn more about Network Path"
- link: "https://www.datadoghq.com/blog/network-path/"
  tag: "Blog"
  text: "Identify slowdowns across your entire network with Datadog Network Path"
- link: "https://www.datadoghq.com/blog/synthetic-monitoring-network-path/"
  tag: "Blog"
  text: "Understand user experience through network performance with Datadog Synthetic Monitoring"
---

## Overview

Network Path Testing in Synthetic Monitoring gives you complete visibility into the routes your synthetic tests follow. You can pinpoint where failures happen, whether in applications, on-premises networks, or with ISPs. This accelerates root cause analysis, enables proactive issue detection, and triggers actionable alerts when tests fail. It also provides uptime data to help you measure and communicate the value of your network reliability investments.

Running Network Path tests from managed locations lets you perform TCP, UDP, and ICMP checks on your application. Visualize the Network Path packets follow when executing queries from different global locations and private environments.

<div class="alert alert-info">For information on billing for Network Path Testing in Synthetic Monitoring, see the <a href="https://www.datadoghq.com/pricing/?product=network-monitoring#products">pricing page</a>.</div>

## Test creation

1. In Datadog, hover over **Digital Experience** in the left-hand menu and select Tests (under Synthetic Monitoring & Testing).
2. Click **New Test > Network Path Test**.

{{< img src="synthetics/network_tests/network_path_test.png" alt="Network Path test creation from New Synthetics Test" style="width:60%;">}}

## Test configuration

1. Choose your **request type** (TCP, UDP, or ICMP) and specify the host or URL to query. Port information is optional for UDP and ICMP tests.  
2. Name your test.  
3. Optional: Configure advanced options:  
   1. **Source service**: The label displayed for the source host in the Network Path visualization.  
   2. **Destination service**: The label displayed for the destination host in the Network Path visualization.  
   3. **Max TTL**: Maximum time-to-live (maximum number of hops) for outgoing probe packets. Defaults to 30 hops.  
   4. **E2E Queries**: Number of packets sent to the destination to measure packet loss, latency, and jitter. Defaults to 50.
   5. **Traceroute Queries**: Number of traceroute path tracings to perform. Results are aggregated in each test run details panel. Defaults to 3.
   6. **TCP traceroute strategy** (TCP tests only): Choose between Selective Acknowledgement (SACK) and Synchronize (SYN) traceroute strategies. SACK and Force SACK more closely mimic modern application traffic.
4. Optional: Add **Tags** to your test, including environment tags. Use tags to filter your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][1].

  {{< img src="synthetics/network_tests/new_network_path_test.png" alt="Network Path test creation form with Advanced options displayed." style="width:80%;">}}

5. Define **assertions** to determine the expected results for your test. At least one assertion is required.

   {{< img src="synthetics/network_tests/network_path_assertions.png" alt="Network Path test creation form with assertions drop down." style="width:80%;">}}

   | Type | Operator 1 | Operator 2 | Value type |
   | :---- | :---- | :---- | :---- |
   | latency | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |
   | packet loss |  | `is`, `<`, `<=`, `>`, `>=` | int (0 to 100) |
   | jitter |  | `is`, `<`, `<=`, `>`, `>=` | float |
   | network hops  | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |

6. Select the **locations** from which to run your test. You can run Network Path tests from managed locations to test public endpoints, or from a [Datadog Agent](#agent-configuration) to test private environments.

   {{% managed-locations-network-path %}}

7. Set the **test frequency** to determine how often Datadog runs your Network Path test. Scheduled tests ensure your most important endpoints remain accessible to your users.

8. [Define alert conditions][4] and [configure the test monitor][5] for your Network Path test.

{{% synthetics-alerting-monitoring-network-path %}}

## Agent configuration

Network Path tests cannot be run directly from private locations. However, you can run them from any host or device where the Datadog Agent is installed, including hosts that also act as private locations for Synthetic Monitoring tests.

To test network conditions inside private environments, install the Datadog Agent on the host or device, and run Network Path tests from that Agent. For full end-to-end coverage, you can group the application tests running from private locations, and
Network Path tests running from the Datadog Agent on the _same host_, into a single [test suite][9]. This provides a unified view of your service, feature, and application health across all layers affecting user experience.

### Prerequisites

Requires [Agent version][7] `7.72` or higher.

### Setup

1. Enable the system-probe traceroute module in **/etc/datadog-agent/system-probe.yaml** by adding the following:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Enable the Agent Synthetics Collector in **/etc/datadog-agent/datadog.yaml** by adding the following:

   ```yaml
   synthetics:
     collector:
       enabled: true
   ```

3. Ensure the API key used for the Datadog Agent has [Remote Configuration][6] enabled. All newly created API keys have Remote Configuration enabled by default.

4. [Restart the Agent][8] for it to appear in the list of available test locations.

   ```shell
   sudo systemctl restart datadog-agent
   ```

## View test results

Click on a Network Path test on the [Synthetic Tests page][1] to view the Test Details page, which displays comprehensive information about your test:

- Test properties and configuration
- Test history
- Individual test runs
- Aggregated Network Path visualizations across all test runs

The Network Path visualization shows the routes packets take to complete queries during each test run. Drag the [health bar][3] handles to adjust the time frame and view a snapshot of end-to-end latency and packet loss for a specific time interval. For more information about how Network Path visualizations are built, see the [Network Path documentation][2].

  <div class="alert alert-info">Changing the health bar does not affect the global time range at the top of the page.</div>

  {{< img src="synthetics/network_tests/network_path_section.png" alt="Network Path visualization section of a network path test." style="width:100%;">}}

Click on a test run in the table at the bottom of the page to view details for that specific run. The side panel displays:
 
- Run information
- Network Path visualization, aggregated across all traceroute queries (based on your [tests advanced options](#test-configuration))
- Assertion results, aggregated across all end-to-end queries (based on your tests [advanced options](#test-configuration)) <br></br>

  {{< img src="synthetics/network_tests/test_run_side_panel.png" alt="A single test run from a network test, displaying the side panel" style="width:100%;">}}

## Retention

<div class="alert alert-info">Network Path Testing data is retained for 30 days.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /network_monitoring/network_path/path_view/
[3]: /network_monitoring/network_path/path_view/#health-bar
[4]: /synthetics/network_path_tests/#define-alert-conditions
[5]: /synthetics/network_path_tests/#configure-the-test-monitor
[6]: /remote_configuration/#enable-remote-configuration
[7]: /agent/
[8]: /agent/configuration/agent-commands/#restart-the-agent
[9]: /synthetics/test_suites