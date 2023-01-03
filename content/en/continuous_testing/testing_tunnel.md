---
title: Continuous Testing Tunnel
kind: documentation
description: Learn about local and remote CI/CD testing using Datadog's Continuous Testing testing tunnel.
aliases:
  - /synthetics/testing_tunnel
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Continuous Testing tests into your CI/CD pipeline"
- link: "https://www.datadoghq.com/blog/internal-application-testing-with-datadog/"
  tag: "Blog"
  text: "Test internal applications with Datadog's testing tunnel and private locations"
- link: "https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline"
  tag: "Learning Center"
  text: "Learn how to run tests in a CI/CD pipeline"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a browser test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API test"

---

## Overview

The Continuous Testing tunnel creates short-lived secure connections between your internal environments and the Datadog infrastructure, allowing you to swiftly trigger Synthetic tests on your private applications.  

Datadog recommends using the testing tunnel if you need to launch Continuous Testing tests against local versions of your application without deploying a dedicated and long lasting probing system (such as [private locations][1]). The testing tunnel can be used to trigger tests on short-lived cloud environments.

## What is the testing tunnel?

The testing tunnel is a functionality that comes with the [@datadog/datadog-ci][2] NPM package which is one of the methods Datadog <span class="x x-first x-last">provides </span>to include your Synthetic tests as part of your CI/CD pipelines. The testing tunnel creates an end-to-end encrypted HTTP proxy between your infrastructure and Datadog, meaning that any test requests sent <span class="x x-first x-last">through</span> the CLI are automatically routed through the `datadog-ci` client<span class="x x-first x-last">. This allows</span> Datadog to access and test your internal applications. 

{{< img src="synthetics/tunnel_diagram.png" alt="Synthetic testing tunnel diagram" style="width:100%;">}}

`datadog-ci` first gets a presigned URL from Datadog for authentication. It then opens a WebSocket Secure connection (wss) to Datadog's managed locations using the presigned URL. Using SSH connections through the WebSocket connection, tests are triggered by `datadog-ci` and executed through Datadog's managed locations.  

Because DNS resolution is performed through the tunnel, you can test applications with internal domains or even on the `localhost` of the machine running `datadog-ci`.

When using the testing tunnel, your tests' locations are overridden by a location that depends on your Datadog account region.

## How to use the testing tunnel

As mentioned above, the testing tunnel comes with the [@datadog/datadog-ci][2] NPM package and is available from version [v0.11.0][3] of the package. To get started, see [Continuous Testing and CI/CD][4].

Once you've set up your client on your local machine or your CI server, you can decide to have your tests launched with the tunnel by appending the command used to launch tests with `--tunnel`. For instance, if you are using a global configuration file, you can use:

```sh
datadog-ci synthetics run-tests --config <GLOBAL_CONFIG_FILE>.json --tunnel
```

### Firewall requirements

<span class="x x-first x-last">Allow </span>**Outbound connections** for the following Datadog endpoints:

{{< site-region region="us" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us1.synthetics.datadoghq.com`   | Required to open the wss connection from the `datadog-ci` client to the tunnel service. |
| 443  | `intake.synthetics.datadoghq.com` | Required to get the presigned URL and to trigger the Synthetic tests. |
| 443  | `api.datadoghq.com` | Required to search for Synthetic tests, get them, and poll their results. |

{{< /site-region >}}

{{< site-region region="eu" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-eu1.synthetics.datadoghq.com`   | Required to open the wss connection from the `datadog-ci` client to the tunnel service. |
| 443  | `api.datadoghq.eu` | Required to get the presigned URL, search for Synthetic tests, get them, trigger them, and poll their results. |

**Note**: Although the tunnel service top level domain is `.com` (and not `.eu`), the endpoint is located in EU (Frankfurt AWS).

{{< /site-region >}}

{{< site-region region="us3" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us3.synthetics.datadoghq.com`   | Required to open the wss connection from the `datadog-ci` client to the tunnel service. |
| 443  | `api.us3.datadoghq.com` | Required to get the presigned URL, search for Synthetic tests, get them, trigger them, and poll their results. |

{{< /site-region >}}

{{< site-region region="us5" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us5.synthetics.datadoghq.com`   | Required to open the wss connection from the `datadog-ci` client to the tunnel service. |
| 443  | `api.us5.datadoghq.com` | Required to get the presigned URL, search for Synthetic tests, get them, trigger them, and poll their results. |

{{< /site-region >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases/tag/v0.11.0
[4]: /continuous_testing/cicd_integrations#use-the-cli
