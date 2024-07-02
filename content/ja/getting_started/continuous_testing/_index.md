---
title: Getting Started with Continuous Testing
kind: documentation
further_reading:
- link: "https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline"
  tag: ラーニングセンター
  text: Introduction to Synthetic Tests in a CI/CD Pipeline
- link: "https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/"
  tag: Blog
  text: Best practices for continuous testing with Datadog
- link: "https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/"
  tag: Blog
  text: Use Datadog Continuous Testing to release with confidence
- link: /continuous_testing/environments
  tag: Documentation
  text: Learn about local and staging environments
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: Learn about Continuous Testing and CI/CD
algolia:
  tags: [continuous testing]
---
{{< jqmath-vanilla >}}

## Overview

Continuous Testing enables you to automatically run and monitor the same [Synthetic tests][1] you've configured in your [staging, QA, and pre-production environments][14], which proactively alert your team and block your pipeline deployments when code changes cause test failures.

Your Continuous Testing tests can:

* [Launch API requests on your systems][2]
* [Simulate browser scenarios within your web application][3]
* [Test functionality within your iOS and Android applications][4]

You can set up [parallelization][24], which allows you to execute multiple tests in your CI/CD pipelines simultaneously rather than sequentially to help speed up your building, testing, and deployment processes. Once your tests run, examine test results and CI batches in the [Synthetic Monitoring & Testing Results Explorer][5]. 

To improve your developer workflow with Continuous Testing, you can:

* Use the [`datadog-ci` NPM package][6] to run tests directly in your CI pipeline.
* Use the [Datadog Synthetics VS Code Integration][7] to run tests directly in your IDE.

Continuous Testing accelerates your organization's application development by automating end-to-end testing across the entire software lifecycle. You can run tests in local and staging environments, parallelize test runs, and integrate with CI providers.

## Prerequisites

If you haven't already, create a [Datadog account][8].

## Create a Continuous Testing test

To set up a Continuous Testing test, first create a Synthetic test in Datadog. In this example, create a [browser test][3] on the site `https://www.shopist.io`, a test e-commerce web application.

Browser tests simulate a user's journey through your web application beginning at your **Starting URL**. Ensuring your **Starting URL** is a resource in your staging environment makes it easier to test changes before moving them into production.

### Configure your test details

1. Navigate to [**Digital Experience** > **Synthetic Monitoring & Testing** > **New Test**][26].
2. In the top right corner, click **New Test** > **Browser Test**.

   {{< img src="continuous_testing/new_browser_test.png" alt="new_browser_test" style="width:80%;" >}}

3. Define your browser test:

    - Add the URL of the website you want to monitor into the Starting URL field. For this example, enter `https://www.shopist.io`.
    - Select **Advanced Options** to set custom request options, certificates, authentication credentials, and more. In this example, no specific advanced option is needed.
    - Name your test and set a Team Tag such as **team-checkout**. Tags allow you to keep your test suite organized and find tests you're interested in through the Synthetic Monitoring & Testing Results Explorer.
    - Choose the browsers and devices to test.

4. Continue [filling out your test details and your recording like you normally would][9].

## Integrate with a CI provider or collaboration tool

Accelerate your application development by combining testing and troubleshooting in Continuous Testing, streamlining your workflows, and minimizing context switching. 

To integrate with a CI provider or a collaboration tool like [Slack][28] or [Jira][29], see the respective documentation:

{{< partial name="getting_started/continuous_testing/providers.html" >}}

</br>

## Run your Continuous Testing tests

To improve your development workflow, you can use `datadog-ci` in your CLI as a CI environment to configure your test. Then run your test directly in your IDE as a developer environment.

### Running tests in the CLI

Extend your use of Continuous Testing by using the [`datadog-ci` NPM package][6]. `datadog-ci` lets you execute commands from within your CI/CD scripts to test your application before deployment. You can automate blocking and rolling back changes when tests fail. Read the [`datadog-ci` Configuration page for installation and setup instructions][10].

You can use `datadog-ci` to execute only those tests tagged with specific [Datadog Teams tags][25]. For example, to run all tests tagged as `team-checkout`:

1. Navigate to your command line.
2. Run the following command:

   ```
   datadog-ci synthetics run-tests -search 'tag:team-checkout' --config global.config.json
   ```

For more information about running the Synthetics command and using reporters, see the [Configuration documentation][11].

### Running tests in your IDE

Separately, you can use the [Datadog Synthetics VS Code Integration][12] to help you:

* Use a [private location][13] or [a local environment][14] to accelerate development locally.
* Run HTTP API tests and browser tests and see their results within VS Code.
* Test only what matters by executing relevant tests at the same time.

{{< img src="developers/ide_plugins/vscode/vscode-extension-demo.png" alt="vscode-extension-demo" style="width:100%;" >}}

### Running tests in VS Code

1. Open VS Code and install the Datadog Extension from the VS Code Extensions view.
2. Open the Datadog Synthetics extension and sign in when prompted.
3. Select a Synthetic test to run.
4. Set a Start URL.
5. Run the test.

## Examine results in the Synthetic Monitoring & Testing Results Explorer

The Synthetic Monitoring & Testing Results Explorer allows you to create visualizations and filter [CI batches][22] and [test runs][23] for your Continuous Testing tests.

Navigate to [**Digital Experience** > **Synthetic Monitoring & Testing** > **New Test**][26], then select **CI Batches** or **Test Runs** to see results from your CI batches or test runs in the Explorer. Select a CI batch or test from the list to get a more detailed view of the result.

{{< tabs >}}
{{% tab "CI Batches" %}}
{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Search and manage your CI batches in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}
{{% /tab %}}
{{% tab "Test Runs" %}}
{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Search and manage your test runs in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

### Create a search query

Explore one of the following out-of-the-box search queries to start filtering your CI batches or test runs.

{{< img src="continuous_testing/explorer/search_queries.png" alt="Out-of-the-box search queries in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;" >}}

Optionally, you can create a query to [search your test runs][15]. Using the browser test you created above, locate the Test ID and create a search query using the common test run facets. 

To find the ID of your browser test:

{{< img src="continuous_testing/example_test_id.png" alt="The browser test ID highlighted in the Properties section of a test run" style="width:60%;" >}}

1. Navigate to the [**Tests** page][19].
2. Select a test.
3. Look for the Test ID in the **Properties** section.

For more information about using facets in your search query, see [Search Test Runs][17].

To export your view of the Synthetic Monitoring & Testing Results Explorer, click **> Views**. For more information, see [Saved Views][16].

## Set parallelization preferences

By default, Synthetic tests are not parallelized. Parallelization allows you to run multiple tests in your CI/CD pipelines simultaneously. If you want to parallelize your tests, you can use the **Estimate Parallelization** calculator to determine your needs.

{{< img src="continuous_testing/parallelization_estimate.png" alt="parallelization_estimate" style="width:100%;" >}}

Navigate to [**Digital Experience** > **Synthetic Monitoring & Testing** > **Settings**][27] to locate the calculator.

For instance, if you have 24 tests per CI batch, each taking 2 minutes to complete, and your target is for all tests to be completed within 4 minutes, you need to run 12 tests in parallel.

$$\text"estimated parallelization" = {\text"24 tests per CI batch"* \text"2 minute duration"} / \text"4 minute expected duration in your CI pipeline"$$

Once you're done estimating your parallelization, input the number of test runs you want to execute at the same time in the Parallelization modal. Then, click **Save Selection**.

For more information, see the [Parallelization documentation][18].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/
[2]: /getting_started/synthetics/api_test/
[3]: /getting_started/synthetics/browser_test/
[4]: /mobile_app_testing/
[5]: /synthetics/explorer?track=synbatch
[6]: /continuous_testing/cicd_integrations/configuration/?tab=npm
[7]: /developers/ide_plugins/
[8]: https://datadoghq.com
[9]: /getting_started/synthetics/browser_test/#create-a-browser-test
[10]: /continuous_testing/cicd_integrations/configuration/?tab=npm#install-the-package
[11]: /continuous_testing/cicd_integrations/configuration/?tab=npm#reporters
[12]: /developers/ide_plugins/vscode/
[13]: /getting_started/synthetics/private_location/
[14]: /continuous_testing/environments/
[15]: /continuous_testing/explorer/?tab=testruns#create-a-search-query
[16]: /continuous_testing/explorer/saved_views/
[17]: /continuous_testing/explorer/search_runs/
[18]: /continuous_testing/settings/#parallelization
[19]: https://app.datadoghq.com/synthetics/tests
[22]: /glossary/?product=synthetic-monitoring#test-batch
[23]: /glossary/?product=synthetic-monitoring#test-run
[24]: /glossary/?product=synthetic-monitoring#parallelization
[25]: /account_management/teams/
[26]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20-%40result.result.unhealthy%3Atrue&index=%2A&track=synthetics&viz=stream&from_ts=1713544430419&to_ts=1713548030419&live=true
[27]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[28]: /integrations/slack/
[29]: /integrations/jira/