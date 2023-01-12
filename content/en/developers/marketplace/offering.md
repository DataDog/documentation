---
title: Develop a Marketplace Offering
type: documentation
description: Learn how to develop and publish an offering on the Datadog Marketplace.
further_reading:
- link: "https://partners.datadoghq.com/"
  tag: "Partner Network"
  text: "Datadog Partner Network"
- link: "https://www.datadoghq.com/blog/datadog-marketplace/"
  tag: "Blog"
  text: "Expand your monitoring reach with the Datadog Marketplace"
- link: "/developers/marketplace/"
  tag: "Documentation"
  text: "Learn about the Datadog Marketplace"
- link: "/developers/integrations/oauth_for_integrations"
  tag: "Documentation"
  text: "Learn about using OAuth for integrations"
---

## Overview

This page walks you through how to develop an offering on the Datadog Marketplace. If you have any questions, reach out to <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a>.

## Development process

To develop a Marketplace tile, follow these instructions:

1. [Choose a type of offering to list](#select-an-offering).
2. [Access the Marketplace repository and set up a directory](#set-up-a-directory-and-clone-the-marketplace-repository).
3. [Install and configure the Datadog Development Toolkit](#install-and-configure-the-datadog-development-toolkit).
4. [Populate the integration tile scaffolding](#populate-the-integration-tile-scaffolding).
5. [Complete the necessary integration asset files](#complete-the-necessary-integration-asset-files).
6. [Open a pull request](#open-a-pull-request).
7. [Review feedback and request approval to merge the pull request and release the integration tile](#review-process).
8. [Coordinate go-to-market opportunities with Partner Marketing](#coordinate-gtm-opportunities).

## Select an offering

A standard Marketplace integration tile appears with the following format:

{{< img src="developers/marketplace/marketplace-tile-example.png" alt="Example Marketplace tile" style="width:30%" >}}

Choose from the following offering types to create an integration tile that represents your listing on the [Datadog Marketplace][1]:

- A [Datadog Agent-based integration](#agent-based-integrations)
- A [REST API integration](#rest-api-integrations)
- A [Datadog App](#datadog-apps)
- A [SaaS license or subscription](#saas-license-or-professional-service-offerings)
- [Professional services](#saas-license-or-professional-service-offerings)

### REST API integrations

Use an [API integration][2] to enrich and submit data from your backend, or pull data directly out of Datadog. API integrations work well in building a connector between Datadog and another SaaS platform. This method is ideal for Technology Partners that are SaaS based, and have an existing website for users to log into for authorization purposes.

Since API integrations do not use the Datadog Agent to collect data, you need to create an [informational tile-only listing](#saas-license-or-professional-service-offerings) once your development work is complete.

REST API integrations must be bi-directional, meaning that the integration should be able to pull data from and push data into Datadog.

REST API Integrations send the following types of data to Datadog:

- [Metrics][3]
- [Logs & Log Pipelines][4]
- [Events][5]
- [Service Checks][6]
- [Traces][7]
- [Incidents][8]
- [Security Events][9]

A Datadog API key is required to submit data to a Datadog API endpoint, and an application key is required to query data from Datadog. Instead of requesting these credentials directly from a user, Datadog recommends using [OAuth][10] to handle authorization and access for API-based integrations.

You can explore examples of existing API integrations in the `integrations-extras` repository such as [Vantage][11].

### Datadog Apps

[Datadog Apps][12] are custom dashboard widgets that are developed in the [Datadog Developer Platform][13]. Once your Datadog App is ready to publish, you need to create an [informational tile-only listing](#saas-license-or-professional-service-offerings) on the Integrations or Marketplace page.

### SaaS license or professional service offerings

To list a SaaS license or professional service offering in the Marketplace, you only need to create an informational tile-only listing.

### Agent-based integrations

Agent-based integrations are bi-directional; they use Agent checks to pull data from and push data into Datadog. For more information about creating an Agent-based offering, see [Create an Agent-based Integration for Marketplace][14].

There are three types of Agent checks:
- An [OpenMetrics check][14] is suitable for gathering telemetry data from existing applications that expose metrics using the OpenMetrics standard.
- A [Python check][2] is suitable for monitoring services or products that do not expose metrics in a standard format. Python checks can also be used to collect telemetry data from various APIs or command line tools.
- [DogStatsD][3] is suitable for applications that already emit telemetry using the StatsD protocol.

Integrations send the following types of data to Datadog:

- [Metrics][4]
- [Logs & Log Pipelines][5]
- [Events][6]
- [Service Checks][7]
- [Traces][8]
- [Incidents][9]
- [Security Events][10]

## Set up a directory and clone the Marketplace repository

Once you've decided on an offering, set up a directory:

1. Request access to the [Marketplace repository][15] by following the instructions in the [Marketplace documentation][16].
2. Create a `dd` directory:
   {{< code-block lang="shell" >}}mkdir $HOME/dd{{< /code-block >}}

   The Datadog Development Toolkit command expects you to be working in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps.
3. Once you have been granted access to the Marketplace repository, create the `dd` directory and clone the `marketplace` repo:
   {{< code-block lang="shell" >}}git clone git@github.com:DataDog/marketplace.git{{< /code-block >}}
4. Create a feature branch to work in.

## Install and configure the Datadog development toolkit

The Agent Integration Developer Tool allows you to create scaffolding when you are developing an integration by generating a skeleton of your integration tile's assets and metadata. For instructions on installing the tool, seeInstall the [Datadog Agent Integration Developer Tool][17].

Once you've installed the Developer tool, configure the tool for the `marketplace` repo:

To install the toolkit:

Set `marketplace` as the default working repository:

```
ddev config set marketplace $HOME/dd/marketplace
ddev config set repo marketplace
```

If you used a directory other than `$HOME/dd` to clone the marketplace directory, use the following command to set your working repository:

```
ddev config set marketplace <PATH/TO/MARKETPLACE>
ddev config set repo marketplace
```

## Populate the integration tile scaffolding

Run the `ddev` command to generate a skeleton of the folders and files needed for your integration. The options you use with the command are different depending on what type of integration you are developing. For a full list of the files created by the `ddev` command, see [Integrations assets][19].

For Datadog Apps, Datadog REST API integrations, professional services, and standalone SaaS licenses, use the Datadog Development Toolkit to create scaffolding for an informational tile-only listing.

To create the informational tile-only listing's scaffolding:

1. Make sure you're inside the `marketplace` directory:
   {{< code-block lang="shell" >}}cd $HOME/dd/marketplace{{< /code-block >}}
2. Run the `ddev` command with the `-t tile` option
   {{< code-block lang="shell" >}}ddev create -t tile "<Offering Name>"{{< /code-block >}}


## Complete the necessary integration asset files

Make sure that the following required assets for your integration are complete:

{{% integration-assets %}}

### README

{{% integrations_readme %}}

### Media carousel

{{% integrations_media_carousel %}}

## Open a pull request

Before you open a pull request, run the following command to catch any problems with your integration:

```
ddev validate all changes
```

Push up your feature branch and open a pull request that contains your integration tile's asset files (including images) in the [`marketplace` repository][15]. The Marketplace repository does not allow forks. For instructions on creating a clone of the repo, see the [Set up section](#set-up-a-directory-and-clone-the-marketplace-repository). After you've created your pull request, automatic checks run in Azure DevOps pipelines to verify that your pull request is in good shape and contains all the required content to be updated.

To request access to the Azure DevOps pipeline, leave a comment in the pull request requesting access.

## Review process

Once your pull request passes all the checks, reviewers from the `Datadog/agent-integrations`, `Datadog/marketplace-review`, and `Datadog/documentation` teams provide suggestions and feedback on best practices.

Once you have addressed the feedback and re-requested reviews, these reviewers approve your pull request. Contact the Marketplace team if you would like to preview the integration tile in your sandbox account. This allows you to validate and preview additional changes in the integration tile on the Datadog Marketplace before your pull request is merged.

## Coordinate GTM opportunities

Once a Marketplace tile is live, Technology Partners can meet with Datadog's Partner Marketing team to coordinate a joint go-to-market (GTM) strategy, which includes the following:

- A Datadog quote for partner press releases
- A blog post on the [Datadog Monitor][18]
- Amplification of social media posts

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/marketplace/
[2]: /api/latest/
[3]: /api/latest/metrics/
[4]: /logs/faq/partner_log_integration/
[5]: /api/latest/events/
[6]: /api/latest/service-checks/
[7]: /tracing/guide/send_traces_to_agent_by_api/
[8]: /api/latest/incidents/
[9]: /api/latest/security-monitoring/
[10]: /developers/integrations/oauth_for_integrations/
[11]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[12]: /developers/datadog_apps/
[13]: https://app.datadoghq.com/apps/
[14]: /developers/marketplace/marketplace-agent-integration/
[15]: https://github.com/Datadog/marketplace
[16]: /developers/marketplace/#request-access-to-marketplace
[17]: /developers/integrations/python/
[18]: https://datadoghq.com/blog/
