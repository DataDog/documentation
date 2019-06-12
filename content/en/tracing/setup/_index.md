---
title: Configure your application to collect traces
kind: documentation
aliases:
    - /tracing/languages
    - /tracing/proxies
disable_toc: true
---

After you have [installed the Datadog Agent][1], and [enabled trace collection][2], then configure your application to send traces using one of the libraries locally, or in [a container][3].

### Language setup

{{< partial name="apm/apm-languages.html" >}}

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][4].

[1]: /agent
[2]: /agent/apm
[3]: /tracing/send_traces/#containers
[4]: /developers/libraries/#apm-tracing-client-libraries
