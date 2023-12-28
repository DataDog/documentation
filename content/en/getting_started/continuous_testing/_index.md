---
title: Getting Started with Continuous Testing
kind: documentation
further_reading:
- link: 'https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests in a CI/CD Pipeline'
- link: '/synthetics/api_tests'
  tag: 'Documentation'
  text: 'Learn more about API tests'
- link: '/synthetics/multistep'
  tag: 'Documentation'
  text: 'Learn more about multistep API tests'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn more about browser tests'
- link: '/continuous_testing/cicd_integrations'
  tag: 'Documentation'
  text: 'Learn about running Synthetic tests in a CI pipeline'
algolia:
  tags: ["continuous testing"]
---
{{< jqmath-vanilla >}}

## Overview

Continuous Testing lets you automatically run and monitor the same [Synthetic tests][1] you've configured in your staging, QA, and pre-production environments to proactively alert your team and block your pipeline deployments should code changes cause testing failures.

Your codeless tests can:
* [Launch API requests on your systems][2]
* [Simulate browser scenarios within your web application][3]
* [Test functionality within your iOS and Android applications][4]

Once your tests run, examine test results and CI batches in the [Synthetic Monitoring & Continuous Testing Explorer.][5]

Improve your developer workflow with Continuous Testing:
* Use the [`datadog-ci` NPM package][6] to run these tests directly in your CI pipeline.
* Use the [Datadog Synthetics VS Code Integration][7] to run tests in your IDE.

Continuous Testing also offers [parallelization][24], which allows you to execute multiple tests in your CI/CD pipelines simultaneously rather than sequentially to help speed up your building, testing, and deployment processes.

## Prerequisites

If you haven't already, create a [Datadog account][8].

## Create a Continuous Testing test

To set up a Continuous Testing test, first create a Synthetic test in Datadog. In this example, create a [browser test][3] on the site `https://www.shopist.io`, a test e-commerce web application.

Browser tests simulate a user's journey through your web application beginning at your **Starting URL**. Ensuring your **Starting URL** is a resource in your staging environment makes it easier to test changes before moving them into production.

### Configure your test details

1. On the Datadog site, hover over **UX Monitoring** and click **Continuous Testing**.
2. In the top right corner, click **New Test** > **Browser Test**.
3. Define your browser test:

    - Add the URL of the website you want to monitor into the Starting URL field. For this example, enter `https://www.shopist.io`.
    - Select **Advanced Options** to set custom request options, certificates, authentication credentials, and more. In this example, no specific advanced option is needed.
    - Name your test and set a Team Tag such as **team-checkout**. Tags allow you to keep your test suite organized and find tests you're interested in through the Synthetic Monitoring & Continuous Testing Explorer.
    - Choose the browsers and devices to test.

4. Continue [filling out your test details and your recording like you normally would][9].

{{< img src="continuous_testing/new_browser_test.png" alt="new_browser_test" style="width:100%;" >}}


## Run your Continuous Testing tests

To improve your development workflow, you can use `datadog-ci` in your CLI as a CI environment to configure your test. Then run your test directly in your IDE as a developer environment.

### Running tests in the CLI

Extend your use of Continuous Testing by using the [`datadog-ci` NPM package][6]. `datadog-ci` lets you execute commands from within your CI/CD scripts to test your application before deployment. You can automate blocking and rolling back changes when tests fail. Read the [`datadog-ci` Configuration page for installation and setup instructions][10].

You can use `datadog-ci` to execute only those tests tagged with specific [Team tags][25]. For example, to run all tests tagged as `team-checkout`:

1. Navigate to your command line.
2. Run the following:
   ```
   yarn datadog-ci synthetics run-tests -search 'tag:team-checkout' --config global.config.json
   ```
For more information about running the Synthetics command and using reporters, see [Configuration Documentation][11]

### Running tests in your IDE

Separately, you can use the [Datadog Synthetics VS Code Integration][12] to help you:

* Use a [Private Location][13] or [Tunnel][14] to accelerate development locally.
* Run HTTP API tests and browser tests and see their results within VS Code.
* Test only what matters by executing relevant tests at the same time.

{{< img src="developers/ide_integrations/vscode/vscode-extension-demo.png" alt="vscode-extension-demo" style="width:100%;" >}}

### Running tests in VS Code

1. Open VS Code and install the Datadog Extension from the VS Code Extensions view.
2. Open the Datadog Synthetics extension and sign in when prompted.
3. Select a Synthetic test to run.
4. Set a Start URL.
5. Run the test.

## Examine results in the Synthetic Monitoring and Continuous Testing Explorer

The Synthetic Monitoring and Continuous Testing Explorer allows you to create visualizations and filter [CI batches][22] and [test runs][23] for your Continuous Testing tests. Navigate to **UX Monitoring** > **Continuous Testing**.

Select **CI Batches** or **Test Runs** to see results from your CI batches or test runs in the Explorer. Select a CI batch or test from the list to get a more detailed view of the result.

{{< img src="continuous_testing/ci_explorer_test_results.png" alt="ci_explorer_test_results" style="width:100%;" >}}

### Create a search query

Click one of the following out-of-the-box search queries to filter your CI batches or test runs:
- [All failing tests][19]
- [Tests which initially failed but are now passing][20]
- [Unused Tests][21]

{{< img src="continuous_testing/example_search_queries.png" alt="example-search-queries" style="width:100%;" >}}

Optionally, you can create a query to [search your test runs][15]. Using the browser test you created above, locate the Test ID and create a search query using the common test run facets. To find the ID of your browser test:
1. Navigate to the Synthetic Tests page.
2. Select a test.
3. Look for the Test ID in the **Properties** section.

{{< img src="continuous_testing/example_test_id.png" alt="example_test_id" style="width:70%;" >}}

To export your view of the Synthetic Monitoring & Continuous Testing Explorer, click **>Views** and click **Save**. For more information, see [Saved Views][16].

For more information about using facets in your search query, see [Search Test Runs][17].

## Set parallelization preferences

By default, Synthetic tests are not parallelized. Parallelization allows you to run multiple tests in your CI/CD pipelines simultaneously. If you want to parallelize your tests, you can use the **Estimate Parallelization** calculator to determine your needs.

Navigate to **UX Monitoring** > **Settings** and click **Parallelization Settings** to locate the calculator.

{{< img src="continuous_testing/parallelization_estimate.png" alt="parallelization_estimate" style="width:100%;" >}}

For instance, if you have 24 tests per CI batch, each taking 2 minutes to complete, and your target is for all tests to be completed within 4 minutes, you need to run 12 tests in parallel.

$$\text"estimated parallelization" = {\text"24 tests per CI batch"* \text"2 minute duration"} / \text"4 minute expected duration in your CI pipeline"$$

Once you're done estimating your parallelization, input the number of test runs you want to execute at the same time in the Parallelization modal. Then, click **Save Selection**.

See the [Parallelization documentation][18] for more details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/
[2]: /getting_started/synthetics/api_test/
[3]: /getting_started/synthetics/browser_test/
[4]: /mobile_app_testing/
[5]: /synthetics/explorer?track=synbatch
[6]: /continuous_testing/cicd_integrations/configuration/?tab=npm
[7]: /developers/ide_integrations/
[8]: https://datadoghq.com
[9]: /getting_started/synthetics/browser_test/#create-a-browser-test
[10]: /continuous_testing/cicd_integrations/configuration/?tab=npm#install-the-package
[11]: /continuous_testing/cicd_integrations/configuration/?tab=npm#reporters
[12]: /developers/ide_integrations/vscode/
[13]: /getting_started/synthetics/private_location/
[14]: /continuous_testing/
[15]: /continuous_testing/explorer/?tab=testruns#create-a-search-query
[16]: /continuous_testing/explorer/saved_views/
[17]: /continuous_testing/explorer/search_runs/
[18]: /continuous_testing/settings/#parallelization
[19]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20-%40result.result.httpStatusCode%3A%5B100%20TO%20399%5D%20%40result.result.passed%3Afalse&agg_m=count&agg_q=%40result.result.httpStatusCode&cols=&index=%2A&top_n=100&track=synthetics&viz=timeseries
[20]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20%40result.result.initialResultID%3A%2A%20%40result.status%3A0&agg_m=count&agg_q=%40result.result.httpStatusCode&cols=&index=%2A&top_n=100&track=synthetics&viz=stream
[21]: https://app.datadoghq.com/synthetics/explorer?query=%40ci.job.name%3A%2A&agg_m=count&agg_q=%40result.test_public_id&cols=&index=%2A&top_n=100&track=synbatch&viz=query_table
[22]: /glossary/?product=synthetic-monitoring#test-batch
[23]: /glossary/?product=synthetic-monitoring#test-run
[24]: /glossary/?product=synthetic-monitoring#parallelization
[25]: /account_management/teams/
