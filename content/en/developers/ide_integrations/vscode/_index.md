---
title: Datadog Extension for Visual Studio Code
kind: documentation
description: Learn how to run Synthetic tests on local environments directly in Visual Studio Code.
is_beta: true
further_reading:
- link: "/getting_started/synthetics/"
  tag: "Documentation"
  text: "Getting Started with Synthetic Monitoring"
- link: "/continuous_testing/testing_tunnel/"
  tag: "Documentation"
  text: "Learn about the Continuous Testing Tunnel"
---

{{< callout url="#" btn_hidden="true">}}
  The Datadog extension for Visual Studio Code is in public beta. It is intended for Datadog users who have <a href="https://docs.datadoghq.com/synthetics/#pagetitle">Synthetic tests</a> set up already. The extension supports running <a href="https://docs.datadoghq.com/synthetics/api_tests/http_tests">HTTP tests</a> and <a href="https://docs.datadoghq.com/synthetics/browser_tests">browser tests</a>. If the extensions stops working unexpectedly, check for extension updates or <a href=#feedback>reach out to the team</a>.
{{< /callout >}}

## Overview

The Datadog extension for Visual Studio Code helps you improve your code reliability by allowing you to [run Synthetic HTTP tests and browser tests on local environments][1] directly in the IDE. The extension ensures that any potential issue resulting from code changes is identified and addressed before the code is deployed into production and impacts your end users.

// big image here

In addition to running Synthetic tests on your local environments, you can use the Datadog extension to:

- Set custom parameters without altering the original test definition.
- See test results locally in Visual Studio Code and in Datadog to access additional information.
- Test only what matters by executing relevant tests at the same time.
- Create a list of most frequently used Synthetic tests by adding them to **Favorites**. 

// image of settings page

## Requirements

- **A Datadog account**: The extension requires a Datadog account. If you're new to Datadog, go to the [Datadog website][2] to learn more about Datadog's observability tools and sign up for a free trial.
- **Synthetic tests**: The extension allows you to execute Synthetic tests. If you haven't set up Synthetic tests already, [create a test in Datadog][3]. For more information about running tests on a local environment, see [Getting Started with API Tests][4], [Getting Started with Browser Tests][5], and the [Continuous Testing Tunnel documentation][1].

## Setup

You can install the extension from the [VSCode Extensions Marketplace][6].

// Magic VSCode download button

## Run Synthetic tests locally

1. After installing the Datadog extension, log in to Datadog.
2. Select a Synthetic test to execute. You can search for specific tests by clicking the **Search** icon.
3. To run a test in a local environment, update a Synthetic test's configuration by changing the test's start URL to `localhost`.
4. Execute the test.

// image of test configuration panel with start URL modified to localhost

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][7] can create, edit, and delete Synthetic HTTP and browser tests. To get create, edit, and delete access to Synthetic HTTP and browser tests, upgrade your user to one of those two [default roles][7].

If you are using the [custom role feature][8], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

## Feedback

To share your feedback, email [team-ide-integrations@datadoghq.com][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/testing_tunnel/
[2]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /getting_started/synthetics/api_test
[5]: /getting_started/synthetics/browser_test
[6]: TBD
[7]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[8]: /account_management/rbac/?tab=datadogapplication#custom-roles
[9]: mailto:team-ide-integrations@datadoghq.com