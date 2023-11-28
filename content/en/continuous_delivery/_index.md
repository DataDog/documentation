---
title: Continuous Delivery Visibility
kind: documentation
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=CD%20Visibility"
    tag: "Release Notes"
    text: "Check out the latest CI/CD Visibility releases! (App login required)"
cascade:
    algolia:
        rank: 70
        tags: ['ci/cd', 'continuous delivery']
---

## Overview

Datadog Continuous Delivery (CD) Visibility unifies information about CD providers in addition to data about CD providers. CD Visibility brings software delivery metrics and data into Datadog dashboards and notebooks so you can communicate the health of your CD provider and focus your efforts in improving your team's ability to deliver quality code every time.

// Vimeo link to CD Visibility demo

CD Visibility enables developers to x, y, and z. Further, it also provides build engineers with visibility into this and that. 

## Improve pipeline reliability

CD Visibility contains Software Delivery Insights and DORA metrics that enable to [do X].

## Increase efficiency through seamless integrations

Datadog integrates with the following CD providers to gather pipeline metrics which track the performance and results from the moment a commit enters the pipeline until it is ready to be deployed. Use the data aggregated over time to track trends in the performance of tests and builds, and identify what is most important to fix.

{{< partial name="continuous_delivery/cd-pipelines-getting-started.html" >}}

</br>

## Ready to start?

See [Pipeline Visibility][1] for instructions on setting up CD Visibility with your CD providers, information about compatibility requirements, and steps for instrumenting and configuring data collection. Then, start exploring details about your pipeline executions in the [CI/CD Visibility Explorer][2] and export your search query into a [CD Pipeline Monitor][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_delivery/pipelines
[2]: /continuous_delivery/explorer
[3]: /monitors/types/ci