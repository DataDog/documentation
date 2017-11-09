---
title: View jmx data in jConsole and set up your jmx.yaml to collect them
kind: faq
customnav: main_references
---


This articles provides a quick example showing you how you can convert the metric data you can see in jConsole into a valid configuration for the jmx.yaml file of the datadog-agent.
{{< img src="faq/jConsolejmx.png" alt="jConsolejmx" responsive="true" >}}

Once you have the datadog-agent submit these jmx metrics correctly to Datadog, you can graph them and use tags to specify your graph query:
{{< img src="faq/jmxGraphMetric.png" alt="jmxGraphMetric" responsive="true" >}}