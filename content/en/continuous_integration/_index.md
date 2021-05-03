---
title: Continuous Integration Monitoring
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---

With Datadog Continuous Integration (CI) Monitoring you can trace your development workflow from the time a commit is pushed to your repository to when the pipeline is ready to be deployed.

Find tests and pipelines that run slowly, or are unreliable, so you know where to focus your efforts to improve your CI environment.

<div class="alert alert-info">CI Monitoring is in private beta. If you want to be added to the beta or have feedback about the features, <a href="/help/">contact the Datadog Support team</a>.</div>

## Setting up tests and pipelines with Datadog tracing

Datadog CI Monitoring uses the Datadog tracing libraries that are part of Datadog APM.

## Gain insights into your tests

Go to the *Tests* and *Test Runs* sections under the Datadog *CI* menu to see visualizations of test tracing data, such as:

* Test statuses.
* Total number of executed tests.
* Failure rate.
* Wall time clock duration for the test phase.
* Avg delta duration change between commits.

## Gain insights into your pipelines

Go to the *Pipelines* and *Pipelines Executions* sections under the Datadog *CI* menu to see visualizations of pipelines tracing data, such as:

* Status of the last pipeline.
* Average, P95 and last pipeline duration.
* Finished pipelines per hour.
* Failure rate of a certain pipeline.
* Stage breakdown.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

