---
description: Learn how to develop and publish a Datadog API integration.
further_reading:
- link: /api/latest/using-the-api/
  tag: Documentation
  text: Learn how to use the Datadog API
- link: /developers/authorization/
  tag: Documentation
  text: Learn about using OAuth for API integrations
- link: /developers/
  tag: Documentation
  text: Learn how to develop on the Datadog platform
title: Create an API Integration
type: documentation
---
## Overview

This page walks Technology Partners through creating a Datadog API integration. 

## API integrations

Use [Datadog API endpoints][1] to enrich the customer's experience by submitting data from your backend and pulling data from a user's Datadog account. Technology Partners write and host their code within their environment. 

API integrations are ideal for Technology Partners that are SaaS-based, and have an existing platform that authenticates users.

API integrations can send the following types of data to Datadog:

- [Metrics][2]
- [Logs][3]
- [Events][4]
- [Service Checks][5]
- [Traces][6]
- [Incidents][7]

You can include out-of-the-box assets such as [monitors][25], [dashboards][26], and [log pipelines][27] with your API integration. When a user clicks **Install** on your integration tile, they are prompted to follow the setup instructions, and all out-of-the-box dashboards will appear in their account. Other assets, such as log pipelines, will appear for users after proper installation and configuration of the integration.

To display your offering on the **Integrations** or **Marketplace page**, you need to create a tile (pictured below). This tile will include instructions on how to set up your offering, as well as general information on what the integration does and how to use it. 

{{< img src="developers/integrations/integration_tile.png" alt="A tile representing an example offering on the Integrations page" style="width:25%" >}}

## Development process

### OAuth

Instead of requesting API and Application keys directly from a user, Datadog requires using an [OAuth client][14] to handle authorization and access for API-based integrations. OAuth implementations must support all [Datadog sites][12].

For more information, see [OAuth for Integrations][15] and [Authorization Endpoints][16].

To get started, you can explore examples that use OAuth in the `integrations-extras` repository such as [Vantage][17].

### Build your integration

The process to build an API-based integration looks like the following:

1. Once you've been accepted to the [Datadog Partner Network][29], you will meet with the Datadog Technology Partner team to discuss your offering and use cases.
2. Request a Datadog sandbox account for development.
3. Begin development of your integration, which includes writing and hosting the integration code on your end as well as implementing the [OAuth protocol][28].
4. Test your integration, as well as your OAuth client, in your Datadog sandbox account.
5. Once your development work is tested and complete, follow the steps in [Create a Tile][24] in order to display your integration on the **Integrations** or **Marketplace** page.
6. Once your pull request is submitted and approved, the Datadog Technology Partner team will schedule a demo for a final review of your integration.
7. You will have the option of testing the tile and integration in your Datadog sandbox account before publishing, or immediately publishing the integration for all customers.  

Start building your API integration by [creating a tile][24].

## Update your integration
You can update your integration at any time by editing the relevant files and opening a new pull request to your integration's directory in the [`integrations-extras`][21] repository. 

For API-based integrations, it's recommended to bump the version of an integration when new functionality is added, such as new data is being sent in, or when major bugs have been fixed. 

If an integration version is bumped, ensure that you add an entry to the `CHANGELOG.md` file that adheres to the following format:

   ```
   ## Version Number / Date

   ***Added***: 

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix
   ```

If editing or adding new README content, manifest information, or assets such as dashboards and recommended monitors, a version bump is not needed. 

Updates to assets such as dashboards and recommended monitors are available to customers after the corresponding pull requests are merged and the assets are published. Updates to `README.md`, `manifest.json`, or any other non-code files are also immediately available to customers after publishing. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/ja/api/latest/metrics/
[3]: https://docs.datadoghq.com/ja/logs/faq/partner_log_integration/
[4]: https://docs.datadoghq.com/ja/api/latest/events/
[5]: https://docs.datadoghq.com/ja/api/latest/service-checks/
[6]: https://docs.datadoghq.com/ja/tracing/guide/send_traces_to_agent_by_api/
[7]: https://docs.datadoghq.com/ja/api/latest/incidents/
[8]: https://docs.datadoghq.com/ja/api/latest/security-monitoring/
[9]: https://docs.datadoghq.com/ja/developers/#creating-your-own-solution
[10]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[11]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[12]: https://docs.datadoghq.com/ja/getting_started/site
[13]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[14]: https://docs.datadoghq.com/ja/developers/authorization/
[15]: https://docs.datadoghq.com/ja/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/ja/developers/authorization/oauth2_endpoints/
[17]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[18]: https://www.python.org/downloads/
[19]: https://pypi.org/project/datadog-checks-dev/
[20]: https://docs.datadoghq.com/ja/developers/integrations/check_references/#manifest-file
[21]: https://github.com/DataDog/integrations-extras/
[22]: https://app.datadoghq.com/integrations
[23]: https://docs.datadoghq.com/ja/developers/integrations/python
[24]: https://docs.datadoghq.com/ja/developers/integrations/create_a_tile
[25]: https://docs.datadoghq.com/ja/monitors/
[26]: https://docs.datadoghq.com/ja/dashboards/
[27]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/
[28]: /ja/developers/authorization/oauth2_in_datadog/
[29]: https://partners.datadoghq.com/