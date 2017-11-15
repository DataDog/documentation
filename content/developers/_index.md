---
title: Developers
kind: documentation
customnav: developersnav
---

As a monitoring tool should be as flexible as possible, we provide multiple ways to interact with the application. This section is meant to give an quick overview of the different possibilities that we designed in that end.

## API
We provide a powerful API with which you can have a wide interaction with our services. It allows you for instance to submit custom metrics, manage your dashboards and monitors, schedule your downtimes, and also provides a variety of administration tools.
All the available endpoints can be found on [our dedicated API documentation page](/api).

In addition, a [variety of libraries](/developers/libraries/#api-and-dogstatsd-client-libraries) are available to directly interact with this API.

## Submitting custom metrics
While you can directly submit metrics through [our API](/api), we also provide different other options that can be more appropriate according to the context:

* The Datadog agent bundles [DogstatsD](/developers/dogstatsd), a powerful _statsd_ daemon with additional capacities, that will allow you to submit metrics through UDP, and benefit of a better control on your metric metadata and aggregation.
[Multiple libraries](/developers/libraries) are available to ease the use of your local or distant _DogstatsD_.

* If you would like regular metric submissions from a particular setup (similar to what is done by the agent for the systems we directly support), you can also directly [add your own integration](/developers/new_integration). We are providing detailed steps and resources so that you can plug a new integration inside you agent and let you monitor any of your services.

## Additional libraries
Other than libraries to reach our API endpoints and submit custom metrics through _DogstatsD_, you can also find here our [APM tracing utilities](/developers/libraries/#apm-tracing-client-libraries), and a selection of [community integrations](/developers/libraries/#community-integrations).

## Developer technical documentation
Would you like to get a deeper understanding of our internal concepts, you can find here some technical resources regarding some of our internal objects:

* [Learn more about metric behavior](/developers/metrics)

* [Learn more about metric types](/developers/metrictypes)
