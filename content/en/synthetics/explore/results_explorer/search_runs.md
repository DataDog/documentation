---
title: Search Test Runs
description: Examine all of your test runs and troubleshoot failing test results.
aliases:
- /continuous_testing/explorer/search_runs/
further_reading:
- link: '/synthetics/explore/results_explorer'
  tag: 'Documentation'
  text: 'Learn about the Synthetic Monitoring & Testing Results Explorer'
---

## Overview

After selecting a time frame from the dropdown menu on the top right, you can search for test runs by clicking on the **Test Runs** event type in the [Synthetic Monitoring & Testing Results Explorer][1].

{{< img src="continuous_testing/explorer/explorer_test_runs_2.png" alt="Search and manage your test runs in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}

You can use facets to accomplish the following actions:

- Observe the latest test runs that required retries.
- Aggregate failed API test runs by HTTP status code and plot trends. 

## Explore facets

The facets panel on the left lists several facets you can use to search through your test runs. To start customizing the search query, click through the list of facets starting with **Common**.

### Common test run attributes

<table>
  <thead>
    <tr>
      <th style="width: 30%;">Facet</th>
      <th style="width: 70%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Batch ID</code></td>
      <td>The batch ID associated with the test run.</td>
    </tr>
    <tr>
      <td><code>Execution&nbsp;Rule</code></td>
      <td>The execution rule associated with the test result of the CI batch: Blocking, Non Blocking, and Skipped.</td>
    </tr>
    <tr>
      <td><code>Location</code></td>
      <td>The location associated with the test result of the batch.</td>
    </tr>
    <tr>
      <td><code>Passed</code></td>
      <td>The overall status of the test run.</td>
    </tr>
    <tr>
      <td><code>Run Type</code></td>
      <td>The run type of the test run. It can be scheduled, CI, or manually triggered.</td>
    </tr>
    <tr>
      <td><code>Failure Code</code></td>
      <td>Code indicating reason for test failure.</td>
    </tr>
    <tr>
      <td><code>Test Type</code></td>
      <td>Type of test being executed.</td>
    </tr>
    <tr>
      <td><code>Test Subtype</code></td>
      <td>Specific subtype of the test.</td>
    </tr>
    <tr>
      <td><code>Location Version</code></td>
      <td>Version of the private test location.</td>
    </tr>
    <tr>
      <td><code>Location Platform</code></td>
      <td>Platform name of the private location.</td>
    </tr>
    <tr>
      <td><code>Test ID</code></td>
      <td>Identifier for the test.</td>
    </tr>
    <tr>
      <td><code>Failure Message</code></td>
      <td>Message detailing the failure.</td>
    </tr>
    <tr>
      <td><code>Result Retry Number</code></td>
      <td>Number of times the test was retried.</td>
    </tr>
    <tr>
      <td><code>Test Finished At</code></td>
      <td>Timestamp when the test finished.</td>
    </tr>
    <tr>
      <td><code>Test Started At</code></td>
      <td>Timestamp when the test started.</td>
    </tr>
    <tr>
      <td><code>Test Triggered At</code></td>
      <td>Timestamp when the test was triggered.</td>
    </tr>
    <tr>
      <td><code>Test Will Retry At</code></td>
      <td>Timestamp for the next retry of the test.</td>
    </tr>
    <tr>
      <td><code>Trace ID</code></td>
      <td>Trace identifier for tracking.</td>
    </tr>
    <tr>
      <td><code>Open Telemetry ID</code></td>
      <td>Open Telemetry identifier.</td>
    </tr>
    <tr>
      <td><code>Variable Name</code></td>
      <td>Name of a variable used in the test.</td>
    </tr>
  </tbody>
</table>

## Timings attributes

**Timings** facets allow you to filter on timing-related attributes for API test runs.

| Facet          | Description                                                     |
|----------------|-----------------------------------------------------------------|
| `DNS`          | The time spent resolving the DNS name for an API test run.      |
| `Download`     | The time spent downloading the response for an API test run.    |
| `First Byte`   | The time spent waiting for the first byte of the response to be received for an API test run. |
| `Open`         | The overall time a websocket remained open for a WebSocket test run. |
| `Received`     | The overall time a websocket connection spent receiving data for a WebSocket test run. |
| `TCP`          | The time spent establishing a TCP connection for an API test run. |
| `Total`        | The total response time for an API test run.                    |

### HTTP attributes

**HTTP** facets allow you to filter on HTTP attributes.

| Facet                  | Description                                 |
|------------------------|---------------------------------------------|
| `HTTP Status Code`     | The HTTP status code for the test run.      |

### gRPC attributes

**gRPC** facets are related to gRPC test runs.

| Facet                   | Description                                                            |
|-------------------------|------------------------------------------------------------------------|
| `Health Check Status`   | The health check status for the gRPC test. Statuses are `Serving` or `Failing`. |

### SSL attributes

**SSL** facets are related to SSL test runs.

| Facet     | Description                                                      |
|-----------|------------------------------------------------------------------|
| `AltNames`| Alternative record names associated with an SSL certificate.     |

### TCP attributes

**TCP** facets are related to TCP connections during test runs.

| Facet                 | Description                                                                           |
|-----------------------|---------------------------------------------------------------------------------------|
| <code>Connection&nbsp;Outcome</code>  | The connection status for the TCP connection. Outcomes can be `established`, `timeout`, or `refused`. |

### Devices attributes

**Devices** facets are related to the devices used during test runs.

| Facet                    | Description                                                  |
|--------------------------|--------------------------------------------------------------|
| `Device Name`            | Name of the device used for testing.                         |
| `Device Resolution Width`| Width of the device resolution.                              |
| `Device Resolution Height`| Height of the device resolution.                            |
| `Device Type`            | Type of the device used for testing.                         |

### Browser attributes

**Browser** facets are related to browser tests.

| Facet                  | Description                                                     |
|------------------------|-----------------------------------------------------------------|
| `Browser Type`         | Browser type used in the test.                                  |
| `Browser Version`      | Version of the browser used in the test.                        |
| `Browser User Agent`   | User agent of the browser used.                                 |

### API attributes

**API** facets are related to API test runs.

| Facet                         | Description                                                 |
|-------------------------------|-------------------------------------------------------------|
| `Resolved IP`                 | IP resolved by DNS resolution.                              |
| `DNS Resolution Server`       | Server used for DNS resolution.                             |
| `Request Body`                | Body of the HTTP request.                                   |
| `Request Headers`             | Headers of the HTTP request.                                |
| `Request Host`                | Host in the HTTP request.                                   |
| `Request Message`             | Message in the HTTP request.                                |
| `Request Metadata`            | Metadata related to the HTTP request.                       |
| `Request URL`                 | URL of the HTTP request.                                    |
| `Response Body`               | Body of the HTTP response.                                  |
| `Body Size`                   | Size of the response body.                                  |
| `Cache Headers Server`        | Server from cache headers in response.                      |
| `Cache Headers Vary`          | Vary field from cache headers in response.                  |
| `Cache Headers Via`           | Via field from cache headers in response.                   |
| `CDN Provider`                | CDN provider used in response delivery.                     |
| `Response Close Status Code`  | Status code when response was closed.                       |
| `Response Is Body Truncated`  | Indicates if response body was truncated.                   |
| `Response Is Message Truncated`| Indicates if response message was truncated.               |
| `Response Message`            | Message in the HTTP response.                               |
| `Response Metadata`           | Metadata related to the HTTP response.                      |
| `Response Close Reason`       | Reason for response close.                                  |
| `Response Redirects`          | Redirect information in the response.                       |
| `Response Status Code`        | The HTTP status code for the test run.                      |
| `Healthcheck Message Service` | Healthcheck message service information.                    |
| `Handshake Request Message`   | Message during handshake request.                           |
| `Handshake Response Headers`  | Headers during handshake response.                          |
| `Handshake Response Status Code` | Status code during handshake response.                   |

### Mobile attributes

**Mobile** facets are related to mobile tests.

| Facet                     | Description                                                 |
|---------------------------|-------------------------------------------------------------|
| `Mobile Platform`         | Platform name of the mobile device.                         |
| `Mobile Application`      | Version ID of the mobile application.                       |
| `Mobile Platform Version` | Version of mobile platform.                                 |
| `Device Resolution Pixel Ratio` | Pixel ratio of the device display.                            |

### Continuous Testing attributes

**Continuous Testing** facets are related to continuous testing.

| Facet                    | Description                                                                   |
|--------------------------|-------------------------------------------------------------------------------|
| `Concurrency Wait Time`  | Wait time in concurrency testing.                                             |
| `Git Author Email`       | Email of the author of the commit.                                            |
| `Git Author Name`        | Name of the author of the commit.                                             |
| `Git Branch`             | Branch of the repository used.                                                |
| `Git URL`                | URL of the git repository.                                                    |
| `CI Job Name`            | Name of the CI job.                                                           |
| `CI Job URL`             | URL of the CI job.                                                            |
| `CI Pipeline ID`         | Identifier for the CI pipeline.                                               |
| `CI Pipeline Name`       | Name of the CI pipeline.                                                      |
| `CI Pipeline Number`     | Number assigned to the CI pipeline.                                           |
| `CI Pipeline URL`        | URL of the CI pipeline.                                                       |
| `CI Provider Name`       | Name of the CI provider.                                                      |
| `CI Stage Name`          | Name of the stage in the CI process.                                          |
| `CI Workspace Path`      | Workspace path in CI process.                                                 |

### Step attributes

**Step** facets are related to test steps.

| Facet         | Description                    |
|---------------|--------------------------------|
| `Step ID`     | Identifier for test steps.     |
| `Step Name`   | Name of the test steps.        |
| `Step Status` | Status of the test steps.      |


To filter on test runs that are retries, create a search query using `@result.isFastRetry:true`. You can also retrieve the last run for a test with retries using the `@result.isLastRetry:true` field.

For more information about searching for test runs, see [Search Syntax][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /continuous_testing/explorer/search_syntax
