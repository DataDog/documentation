---
title: Get Started with Datadog on Stripe Projects
description: Provision and manage a Datadog organization from the Stripe CLI using Stripe Projects.
further_reading:
    - link: 'https://www.datadoghq.com/blog/datadog-stripe-projects/'
      tag: 'Blog'
      text: 'Provision Datadog on Stripe Projects'
    - link: 'https://docs.stripe.com/cli'
      tag: 'Documentation'
      text: 'Stripe CLI documentation'
---

<div class="alert alert-info">Datadog provisioning through Stripe Projects is limited to the US1 site. The email address on your Stripe account must not already be associated with a Datadog account.</div>

## Overview

Use [Stripe Projects][1] to provision and manage Datadog from the Stripe CLI. This flow creates a Datadog organization and adds its API key, site, and organization name to your application's `.env` file.

## Prerequisites

- A Stripe account with an email address that isn't associated with an existing Datadog account

## Setup

### Install the Stripe CLI and Projects plugin

1. Install the [Stripe CLI][2] version 1.43.3 or later:

   ```shell
   npm install -g @stripe/cli
   ```

   For other installation methods, see [Install the Stripe CLI][2].

1. Install the Stripe Projects plugin:

   ```shell
   stripe plugin install projects
   ```

### Provision Datadog

1. Initialize Stripe Projects:

   ```shell
   stripe projects init
   ```

1. Add Datadog Observability:

   ```shell
   stripe projects add datadog/observability
   ```

1. Confirm that your `.env` file contains your Datadog API key, site, and organization name.

### Upgrade your plan

If your Stripe account has a saved payment method, upgrade your Datadog plan to pay-as-you-go with one command:

```shell
stripe projects upgrade datadog-observability
```

### Remove Datadog from Stripe Projects

Remove Datadog from your Stripe project and update your local environment variables:

```shell
stripe projects remove datadog-observability
stripe projects env --pull
```

This stops management of your Datadog organization through Stripe Projects. It doesn't delete your Datadog account or organization.

## Access Datadog

1. Go to the [Datadog login page](https://app.datadoghq.com/account/login).
1. Select **Sign in with Google** if you use a Google account to sign in to Stripe. Otherwise, select **Forgot password?** and enter the email address from your Stripe account to set a Datadog password.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.stripe.com/projects
[2]: https://docs.stripe.com/cli/install
