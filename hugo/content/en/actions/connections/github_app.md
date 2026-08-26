---
title: GitHub App Connection
description: Connect Datadog Actions with your own GitHub App instead of the Datadog GitHub integration.
disable_toc: false
further_reading:
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Connections"
---

## Overview

Use a GitHub App connection when you want to onboard your own GitHub App instead of authenticating actions with the Datadog GitHub integration tile.

With this connection, Datadog authenticates as an installation of your GitHub App. You provide the GitHub App ID, installation ID, and private key, and Datadog uses these credentials to request short-lived access tokens automatically. This approach allows you to control the repositories and permissions available to your workflows and apps.

## Create and install a GitHub App

If you already have an installed GitHub App with the permissions required by your actions, skip to [Gather the connection credentials](#gather-the-connection-credentials).

1. In GitHub, navigate to your organization's **Settings** > **Developer settings** > **GitHub Apps**.
1. Click **New GitHub App**.
1. Enter an app name and homepage URL.
1. Under **Webhook**, clear the **Active** checkbox unless you use the app's webhook for another purpose. A GitHub App connection does not require a webhook.
1. Under **Permissions**, grant access only to the resources your actions require, such as repository contents, pull requests, or issues.
1. Click **Create GitHub App**.
1. On the app's settings page, click **Install App**.
1. Select the organization where you want to install the app, then select whether the app can access all repositories or only selected repositories.
1. Click **Install**.

Depending on your organization's GitHub Apps policy, installing the app might require approval from an organization owner.

## Gather the connection credentials

Gather the following values from GitHub:

- **App ID**: On the GitHub App's settings page, copy the numeric App ID displayed near the top of the page.
- **Installation ID**: Open the app's installation settings. The installation ID is the numeric value in the URL, such as `github.com/settings/installations/12345678`.
- **Private key**: On the GitHub App's settings page, under **Private keys**, click **Generate a private key**. GitHub downloads a `.pem` file. Store the file securely because GitHub does not allow you to download the same private key again.

## Create the connection in Datadog

1. From the [Action Catalog page][1], click the {{< ui >}}Connections{{< /ui >}} tab.
1. Click {{< ui >}}New Connection{{< /ui >}}.
1. Select the {{< ui >}}GitHub{{< /ui >}} connection type.
1. Select the {{< ui >}}GitHub App{{< /ui >}} credential type.
1. Enter a connection name.
1. Enter the App ID and installation ID you copied from GitHub.
1. In the {{< ui >}}Private Key{{< /ui >}} field, paste the full contents of the `.pem` file.
1. If you use GitHub Enterprise Server, enter its hostname in the {{< ui >}}GitHub Hostname{{< /ui >}} field. Leave this field blank for `github.com`.
1. Click {{< ui >}}Create{{< /ui >}}.

The connection is private by default. To allow other users to use it in workflows or apps, configure access from the connection's permissions settings. For more information, see Access and Authentication for [Workflow Automation][2] or [App Builder][3].

## Update GitHub App permissions

If you add permissions to a GitHub App after installing it, existing installations do not receive the permissions automatically. Open the app's installation settings for each organization or account and accept the new permissions before using them in an action.

## Troubleshooting

### Actions use the wrong organization or repositories

Check that the installation ID in the connection matches the installation for the expected organization and repositories. You can find the installation ID in the app's installation settings URL.

### An action returns a permission error

Check the permissions configured for the GitHub App and the repositories available to its installation. If you added permissions after installing the app, open the installation settings and accept the new permission request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** or **#app-builder** channel on the [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/actions/action-catalog
[2]: /actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[3]: /actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection
[4]: https://chat.datadoghq.com/
