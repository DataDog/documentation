---
title: Testing With Proxies, Firewalls, or VPNs
kind: documentation
description: Learn how to set up Continuous Testing on a private environment.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Continuous Testing tests into your CI/CD pipeline"
- link: "https://www.datadoghq.com/blog/internal-application-testing-with-datadog/"
  tag: "Blog"
  text: "Test internal applications with Datadog's testing tunnel and private locations"
- link: "/continuous_testing/cicd_integrations"
  tag: "Documentation"
  text: "Learn about Continuous Testing and CI/CD"
---

## Overview

Most of the development cycle happens within private networks, which are usually inaccessible to Synthetic tests. With the help of [`datadog-ci`][2], you can establish a Continuous Testing tunnel that allows Synthetics Workers to reach the environments that your application is deployed on during the development cycle, such as your development laptop, a CI job, or a private staging environment.

Datadog recommends using the testing tunnel if you need to launch Continuous Testing tests against local versions of your application without deploying a dedicated, long-lasting probing system such as a [private location][1]. You can also use the testing tunnel to trigger tests on short-lived cloud environments.

## What is the testing tunnel?

The testing tunnel is a functionality that comes with the [@datadog/datadog-ci][2] NPM package, which is one of the methods Datadog provides to include your Synthetic tests as part of your CI/CD pipelines.

The testing tunnel creates short-lived secure connections between your internal environments and the Datadog infrastructure, allowing you to swiftly trigger Synthetic HTTP and Browser tests on your private applications. This allows Datadog to access and test your internal applications.

{{< img src="continuous_testing/testing_tunnel.png" alt="Continuous Testing tunnel allows the Synthetics Worker to reach your private applications" width="100%" >}}

First, `datadog-ci` gets a pre-signed URL from Datadog for authentication. Then, it opens a WebSocket secure (WSS) connection to Datadog's managed locations using the pre-signed URL. By using SSH connections through the WebSocket connection, tests are triggered by `datadog-ci` and executed through Datadog's managed locations.

Because DNS resolution is performed through the testing tunnel, you can test applications with internal domains or even on the `localhost` of the machine running `datadog-ci`.

When using the testing tunnel, your tests' locations are overridden by a location that depends on your Datadog account region.

## How to use the testing tunnel

As mentioned above, the testing tunnel comes with the [`@datadog/datadog-ci`][2] NPM package and is available in versions `>=v0.11.0` of the package. To get started, see [Continuous Testing and CI/CD][3].

Once you've set up your client on your local machine or your CI server, you can launch your HTTP and browser tests with the testing tunnel by appending the command used to launch tests with `--tunnel`.

For example, if you are using a global configuration file, you can use the following:

```sh
datadog-ci synthetics run-tests --config <GLOBAL_CONFIG_FILE>.json --tunnel
```

### Firewall requirements

Allow **Outbound connections** for the following Datadog endpoints:

{{< site-region region="us" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us1.synthetics.datadoghq.com`   | Required to open the WSS connection from the `datadog-ci` client to the tunnel service. |
| 443 | `intake.synthetics.datadoghq.com` | Required to get the presigned URL and to trigger the Synthetic tests. |
| 443 | `api.datadoghq.com` | Required to search for Synthetic tests, get them, and poll their results. |

{{< /site-region >}}

{{< site-region region="eu" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-eu1.synthetics.datadoghq.com`   | Required to open the WSS connection from the `datadog-ci` client to the tunnel service. |
| 443 | `api.datadoghq.eu` | Required to get the presigned URL, search for Synthetic tests, get them, trigger them, and poll their results. |

**Note**: Although the tunnel service top level domain is `.com` (and not `.eu`), the endpoint is located in EU (Frankfurt AWS).

{{< /site-region >}}

{{< site-region region="us3" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us3.synthetics.datadoghq.com`   | Required to open the WSS connection from the `datadog-ci` client to the tunnel service. |
| 443 | `api.us3.datadoghq.com` | Required to get the presigned URL, search for Synthetic tests, get them, trigger them, and poll their results. |

{{< /site-region >}}

{{< site-region region="us5" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us5.synthetics.datadoghq.com`   | Required to open the WSS connection from the `datadog-ci` client to the tunnel service. |
| 443 | `api.us5.datadoghq.com` | Required to get the presigned URL, search for Synthetic tests, get them, trigger them, and poll their results. |

{{< /site-region >}}

{{< site-region region="ap1" >}}

 Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-ap1.synthetics.datadoghq.com`   | Required to open the WSS connection from the `datadog-ci` client to the tunnel service. |
| 443 | `api.ap1.datadoghq.com` | Required to get the presigned URL, search for Synthetic tests, get them, trigger them, and poll their results. |

{{< /site-region >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /continuous_testing/cicd_integrations#use-the-cli
