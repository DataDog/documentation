---
description: Examine all of your test runs and troubleshoot failing test results.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentation
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
kind: documentation
title: Search Test Runs
---

## Overview

After selecting a time frame from the dropdown menu on the top right, you can search for test runs by clicking on the **Test Runs** event type in the [Synthetic Monitoring & Testing Results Explorer][1].

{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Search and manage your test runs in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}

You can use facets to accomplish the following actions:

- Observe the latest test runs that required retries.
- Aggregate failed API test runs by HTTP status code and plot trends. 

## Explore facets

The facets panel on the left lists several facets you can use to search through your test runs. To start customizing the search query, click through the list of facets starting with **Common**.

### Common test run attributes

**Common** facets allow you to filter on your test runs' attributes.

| Facet            | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Batch ID`        | The batch ID associated with the test run.                                               |
| <code>Execution&nbsp;Rule</code> | The execution rule associated with the test result of the CI batch: `Blocking`, `Non Blocking`, and `Skipped`. |
| `Location`       | The location associated with the test result of the batch.                                              |
| `Passed`        | The overall status of the test run.                                               |
| `Run Type`      | The run type of the test run. It can be scheduled, CI, or manually triggered.                                             |

### Timings attributes

**Timings** facets allow you to filter on timing-related attributes for API test runs.

| Facet          | Description                                 |
|----------------|---------------------------------------------|
| `DNS`  | The time spent resolving the DNS name for an API test run.  |
| `Download`     | The time spent downloading the response for an API test run.     |
| `First Byte`      | The time spent waiting for the first byte of the response to be received for an API test run.      |
| `Open`  | The overall time a websocket remained open for a WebSocket test run.  |
| `Received` | The overall time a websocket connection spent receiving data for a WebSocket test run. |
| `TCP` | The time spent establishing a TCP connection for an API test run. |
| `Total` | The total response time for an API test run. |

### HTTP attributes

**HTTP** facets allow you to filter on HTTP attributes.

| Facet          | Description                                 |
|----------------|---------------------------------------------|
| `HTTP Status Code`  | The HTTP status code for the test run.  |

### gRPC attributes

**gRPC** facets are related to gRPC test runs.

| Facet       | Description                               |
|-------------|-------------------------------------------|
| `Health Check Status`       | The health check status for the gRPC test. Statuses are `Serving` or `Failing`.    |

### SSL attributes

**SSL** facets are related to SSL test runs.

| Facet       | Description                               |
|-------------|-------------------------------------------|
| `AltNames`       |Alternative record names associated with an SSL certificate.    |

### TCP attributes

**TCP** facets are related to TCP connections during test runs.

| Facet       | Description                               |
|-------------|-------------------------------------------|
| `Connection Outcome`       | The connection status for the TCP connection. Outcomes can be `established`, `timeout`, or `refused`.    |

To filter on test runs that are retries, create a search query using `@result.isFastRetry:true`. You can also retrieve the last run for a test with retries using the `@result.isLastRetry:true` field.

For more information about searching for test runs, see [Search Syntax][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ja/continuous_testing/explorer/search_syntax