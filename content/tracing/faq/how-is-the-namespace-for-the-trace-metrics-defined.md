---
title: How is the namespace for the trace metrics defined?
kind: faq
---

The namespace is basically trace.<name>.<metrics> where

* is coming from the name of the integration ("redis", "pylons", etc.)
* is about the hits, errors or latency ("request.hits", etc.)
* the metrics are tagged by service & resource.

So for pylons it might be `trace.pylons.request.hits{service:mcnulty}`.

You can use the Chrome inspector on the traces page to find the metric name in the **batch_query** call:

{{< img src="tracing/faq/chrome_inspector.png" alt="Chrome Inspector" responsive="true" popup="true">}}