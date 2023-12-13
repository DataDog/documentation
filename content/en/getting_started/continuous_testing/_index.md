---
title: Getting Started with Continuous Testing
kind: documentation
further_reading:
- link: 'https://learn.datadoghq.com/courses/intro-to-synthetic-tests'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: '/synthetics/api_tests'
  tag: 'Documentation'
  text: 'Learn more about API tests'
- link: '/synthetics/multistep'
  tag: 'Documentation'
  text: 'Learn more about multistep API tests'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn more about browser tests'
- link: '/synthetics/private_locations'
  tag: 'Documentation'
  text: 'Learn more about private locations'
- link: '/continuous_testing/cicd_integrations'
  tag: 'Documentation'
  text: 'Learn about running Synthetic tests in a CI pipeline'
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to enhance your synthetic testing capabilities"
algolia:
  tags: ["synthetics"]
---

## Overview

Continuous Testing lets you automatically run and monitor the same [Synthetic tests](https://docs.datadoghq.com/synthetics/) you’ve configured in your staging, QA, and pre-production environments to proactively alert your team and block your pipeline deployments should code changes cause testing failures. 

Your codeless tests can:
* [Launch API requests on your systems](https://docs.datadoghq.com/getting_started/synthetics/api_test)
* [Simulate browser scenarios within your web application](https://docs.datadoghq.com/getting_started/synthetics/browser_test/)
* [Test functionality within your iOS and Android applications](https://docs.datadoghq.com/mobile_app_testing/)

Once your tests run, examine test results and CI batches in the [Synthetic Monitoring & Continuous Testing Explorer.](https://app.datadoghq.com/synthetics/explorer?track=synbatch)

Improve your developer workflow with Continuous Testing by [leveraging the datadog-ci NPM Package](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm) to run these tests directly in your CI pipeline and the [Datadog Synthetics VS Code Integration](https://docs.datadoghq.com/developers/ide_integrations/) to run tests in your IDE.

Datadog also offers Parallelization, allowing you to execute multiple tests in your CI/CD pipelines simultaneously rather than sequentially to help speed up your building, testing, and deployment processes.

## Prerequisites

If you haven't already, create a [Datadog account][1].

## Create a Continuous Testing test

To set up a Continuous Testing test, first create a Synthetics test in Datadog. In this example, you'll create a [Browser test](https://docs.datadoghq.com/getting_started/synthetics/browser_test) on the site https://www.shopist.io, a test e-commerce web application.

Browser tests simulate a user's journey through your web application beginning at your **Starting URL**. Ensuring your **Starting URL** is a resource in your staging environment will make it easier to test changes before moving them into production.

### Configure your test details

1. In the Datadog site, hover over **UX Monitoring** in the left hand menu and select **Continuous Testing**
2. In the top right corner, click **New Test** > **Browser Test**.
3. Define your browser test:

    - Add the URL of the website you want to monitor into the Starting URL field. For this example, enter https://www.shopist.io 
    - Select Advanced Options to set custom request options, certificates, authentication credentials, and more. In this example, no specific advanced option is needed.
    - Name your test and set a Team Tag such as **team-checkout**. Tags allow you to keep your test suite organized and quickly find tests you’re interested in through the Synthetic Monitoring & Continuous Testing Explorer.
    - Choose the browsers and devices to test.

4. Continue [filling out your test details and your recording like you normally would](https://docs.datadoghq.com/getting_started/synthetics/browser_test/#create-a-browser-test).

{{< img src="continuous_testing/new_browser_test.png" alt="new_browser_test" style="width:100%;" >}}


## Run your Continuous Testing tests

To improve your developer workflow, you can either choose to run your Continuous Testing test using the CLI or your IDE.

### Running tests in the CLI

Extend your use of Continuous Testing by using the [datadog-ci NPM package](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm). datadog-ci lets you execute commands from within your CI/CD scripts to test your application before deployment, allowing you to automate blocking and rolling back changes in case of any testing failures. Refer to the [datadog-ci Configuration page for installation and setup instructions](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#install-the-package).

You can also use **datadog-ci** to only execute tests tagged with specific Team tags. For example, to run all tests tagged as **team-checkout**, you can:

1. Navigate to your command line
2. Run:
```
yarn datadog-ci synthetics run-tests -search 'tag:team-checkout' --config global.config.json
```
For more information about running the Synthetics command and using reporters, see [Configuration Documentation](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#reporters)

### Running tests in your IDE

Separately, you can use the [Datadog Synthetics VS Code Integration](https://docs.datadoghq.com/developers/ide_integrations/vscode/) to help you:

* Run HTTP API Tests and Browser Tests within your local environments
* See test results locally in VS Code
* Test only what matters by executive relevant tests at the same time

{{< img src="developers/ide_integrations/vscode/vscode-extension-demo.png" alt="vscode-extension-demo" style="width:100%;" >}}

### Running a Continuous Test in VS Code

1. Open VS Code and install the Datadog Extension from the VS Code Extensions view
2. Open the Datadog Synthetics extension and sign in when prompted
3. Select a Synthetic Test to run
4. Set a Start URL
5. Run the test

## Synthetics Explorer

The **Synthetics Explorer** allows you to create visualizations and filter CI batches for your Continuous Testing tests. Navigate there by hovering over **UX Monitoring** within the left-hand menu of Datadog and selecting **Continuous Testing**.

Review your tests by clicking on either **CI Batches** or **Test Runs** on the left. Select any test within the Explorer to dive deeper into the results.

{{< img src="continuous_testing/ci_explorer_test_results.png" alt="ci_explorer_test_results" style="width:100%;" >}}

### Create a search query

{{< img src="continuous_testing/example_search_queries.png" alt="example-search-queries" style="width:100%;" >}}

Click on one of the out-of-the-box search queries to get started with filtering through your CI Batches and Test Runs. These can filter:
- All failing tests
- Tests which initially failed but are now passing
- Unused Tests

Optionally, you can create a query to [search your test runs](https://docs.datadoghq.com/continuous_testing/explorer/?tab=testruns#create-a-search-query). Using the Browser Test you created above, locate the Test ID and create a search query using the common test run facets. To find the ID of your Browser Test:
1. Navigate to the Synthetic Tests page
2. Select a test
3. Look for the Test ID within the **Properties** section

{{< img src="continuous_testing/example_test_id.png" alt="example_test_id" style="width:100%;" >}}

To export your view of the Synthetics and CT Explorer, click **>Views** and click **Save**. For more information, see [Saved Views](https://docs.datadoghq.com/continuous_testing/explorer/saved_views/).

For more information about using facets in your search query, see [Search Test Runs](https://docs.datadoghq.com/continuous_testing/explorer/search_runs/).

## Set Parallelization Preferences

By default, tests are not parallelized. Parallelization allows you to run multiple tests in your CI/CD pipelines simultaneously. If you want to parallelize your tests, you can use the Estimate Parallelization calculator to determine your needs.

Find it by hovering over **UX Monitoring** on the Datadog site, selecting **Settings**, and choosing **Parallelization Settings** on the left to find the calculator in the lower-right.

{{< img src="continuous_testing/parallelization_estimate.png" alt="parallelization_estimate" style="width:100%;" >}}

For instance, if you have 24 tests per CI batch, each taking 2 minutes to complete, and your target is for all tests to be completed within 4 minutes, you’d need to run 12 tests in parallel.

{{Equation in LaTeX?}}

Once you’re done estimating your parallelization, input the number of test runs you want to execute at the same time in the Parallelization modal. Then click **Save Selection**.

See the [Parallelization documentation](https://docs.datadoghq.com/continuous_testing/settings/#parallelization) for details.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /getting_started/synthetics/api_test/
[3]: /getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /getting_started/synthetics/browser_test/
[5]: /getting_started/synthetics/private_location/
