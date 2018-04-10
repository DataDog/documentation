---
title: Developer Tools
kind: documentation
description: Collect custom metrics & create new integration
---

Monitoring tools should be flexible, so we provide multiple ways to interact with Datadog. This section gives you a quick overview of the various methods available

## API
Datadog features a powerful API to programmatically access the service. You can submit custom metrics; manage dashboards and monitors; schedule downtimes; and perform administrative actions.
Available endpoints can be found on [our dedicated API documentation page][1].

In addition, [many libraries][2] are available to directly interact with the API.

## Submitting custom metrics
While you can submit metrics directly through [our API][1], you can also submit metrics via the Datadog Agent using [DogStatsD][3] and custom checks.

The Datadog Agent includes DogStatsD, a powerful statsd daemon with additional features, that provides better control over your metric metadata and aggregation.
[Multiple libraries][4] are available to easily send metrics from your application to Datadog using [DogStatsD][3].

The API and [DogStatsD][3] are handy to _push_ metrics to Datadog from one of your application.
If you would like to regularly _pull_ metrics from a particular setup, similar to what is done by the agent for the systems we directly support, you can [add your own integration][5]. We have provided detailed steps and resources for [developing][6] and [testing][7] new integrations.
These integrations can then be easily shared with the Datadog community, for instance through our [Datadog/integrations-extras repository][8]

When sending metrics via [DogStatsD][3] or a custom integration, it is helpful to have a deeper understanding of metrics. Here are some technical resources regarding metric internals:

* [Learn more about metric behavior][9]

* [Learn more about metric types][9]

## APM
You can also find our [APM tracing utilities][10], which you can use and contribute to. Support on new languages can be proposed by the community, along with community APM integrations.

## Community Integrations
Many users from our community have already [shared integrations][11] with a large number of commonly used applications.
These resources are also useful to reference when starting the work on a new agent integration.


[1]: /api
[2]: /developers/libraries/#api-and-dogstatsd-client-libraries
[3]: /developers/dogstatsd
[4]: /developers/libraries
[5]: /developers/integrations/
[6]: /developers/integrations/integration_sdk
[7]: /developers/integrations/testing/
[8]: https://github.com/DataDog/integrations-extras
[9]: /developers/metrics
[10]: /developers/libraries/#apm-tracing-client-libraries
[11]: /developers/libraries/#community-integrations
