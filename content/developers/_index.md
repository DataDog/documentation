---
title: Developers
kind: documentation
customnav: developersnav
---

Monitoring tools should be flexible, so we provide multiple ways to interact with Datadog. This section will give you a quick overview of the various methods available

## API
Datadog features a powerful API to programmatically access the service. You can submit custom metrics; manage dashboards and monitors; schedule downtimes; and perform administrative actions.
Available endpoints can be found on [our dedicated API documentation page](/api).

In addition, [many libraries](/developers/libraries/#api-and-dogstatsd-client-libraries) are available to directly interact with the API.

## Submitting custom metrics
While you can submit metrics directly through [our API](/api), you can also submit metrics via the Datadog Agent using DogStatsD and custom checks.

The Datadog Agent includes DogStatsD, a powerful statsd daemon with additional features, that provides better control over your metric metadata and aggregation.
[Multiple libraries](/developers/libraries) are available to easily send metrics from your application to Datadog using DogStatsD.

The API and DogStatsD are handy to _push_ metrics to Datadog from one of your application.
If you would like to regularly _pull_ metrics from a particular setup, similar to what is done by the agent for the systems we directly support, you can [add your own integration](/integrations/new_integration). We have provided detailed steps and resources for [developing](/integrations/integration_sdk) and [testing](/developers/testing/) new integrations.
These integrations can then be easily shared with the Datadog community, for instance through our [Datadog/integrations-extras repository](https://github.com/DataDog/integrations-extras)

When sending metrics via DogStatsD or a custom integration, it is helpful to have a deeper understanding of metrics. Here are some technical resources regarding metric internals:

* [Learn more about metric behavior](/developers/metrics)

* [Learn more about metric types](/developers/metrictypes)

## APM
You can also find our [APM tracing utilities](/developers/libraries/#apm-tracing-client-libraries), which you can use and contribute to. Support on new languages can be proposed by the community, along with community APM integrations.

## Community Integrations
Many users from our community have already [shared integrations](/developers/libraries/#community-integrations) with a large number of commonly used applications.
These resources are also useful to reference when starting the work on a new agent integration.
