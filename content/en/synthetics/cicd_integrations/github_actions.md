---
title: GitHub Actions
kind: documentation
description: 
further_reading:
- link: "/continuous_integration/setup_pipelines/github"
  tag: "Documentation"
  text: "Set up Tracing on GitHub Actions Workflows"
---

## Overview

Trigger Synthetic tests from your GitHub workflows with the GitHub Action available on Datadog's Marketplace.

## Setup

### Installation

1. Add Datadog API and application keys as environment variables to your GitHub repository. For more information, see [API and Application Keys][1].
2. Use `Datadog/synthetics-ci-github-action` in your GitHub workflow. 

## Inputs

`api_key` (required)
: Your Datadog API key. This key is created by your [Datadog organization][1] and should be stored as a [secret][2].<br/>
**Example**: `https://github.com/my-org/my-repo.git`

`app_key` (required)
: Your Datadog Application key. This key is created by your [Datadog organization][3] and should be stored as a [secret][2].<br/>
**Example**: `main`

`datadog_site` (Optional)
: The Datadog site. For users in the EU, set to `datadoghq.eu`. For example: `datadoghq.com` or `datadoghq.eu`.<br/>
**Example**: `datadoghq.com`

`public_ids` (Optional)
: String of public IDs separated by commas for Synthetic tests you want to trigger. If no value is provided, the action looks for files named with `synthetics.json`.<br/>
**Example**: `abc-d3f-ghi, jkl-mn0-pqr`

`config_path` (Optional)
: The global JSON configuration is used when launching tests. See the [example configuration][4] for more details.<br/>
**Example**: `datadog-ci.json`

`files` (Optional)
: Glob pattern to detect Synthetic tests config files.<br/>
**Example**: `{,!(node_modules)/**/}*.synthetics.json`

`subdomain` (Optional)
: The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com`, the subdomain value needs to be set to `myorg`.<br/>
**Example**: `app`

`test_search_query` (Optional)
: Trigger tests corresponding to a [search query][5].<br/>
**Example**: `tag:e2e-tests`

`tunnel` (Optional)
: Use the [testing tunnel][6] to trigger tests.<br/>
**Example**: `true`


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/
[2]: https://docs.github.com/en/actions/reference/encrypted-secrets
[3]: https://github.com/DataDog/synthetics-ci-github-action/
[4]: /synthetics/cicd_integrations/configuration#setup-a-client
[5]: /synthetics/search/#search
[6]: /synthetics/cicd_integrations/configuration#use-the-testing-tunnel
