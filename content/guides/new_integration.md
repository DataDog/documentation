---
title: Officially Integrating with Datadog
kind: guide
listorder: 15
---
Being able to see all of your metrics from across your infrastructure is key within Datadog. While we do have guides to submit custom metrics via our [API][2] and [code instrumentation][1], it's possible you might want to see a certain source become an official integration. Overall, the largest deciding factor in what integrations we build is what our clients request.

If you would like to propose an integration, please reach out to support@datadoghq.com and tell us what metrics you would like to see from that given source.

If you manage or work with a service and would like to see Datadog integrate it, the following information is needed:

  * How will data get into Datadog? There are currently three options:
    1. Push data from the source to Datadog
    2. Crawl the data source's API
    3. Have the Datadog Agent pick up the information from the source
  * What are the metrics and tags should be picked up from the source?
  * What metrics should be included on the default dashboard that we generate for each integration?

We will also need a short blurb describing the integration as well as the correct image to use across our site.

   [1]: http://docs.datadoghq.com/guides/dogstatsd/
   [2]: http://docs.datadoghq.com/api/


