---
title: Traces metrics namespace
kind: documentation
---

The trace metrics namespace is `trace.<name>.<metrics>{<tags>}` where

* `<name>` is coming from the name of the integration ("redis", "pylons", etc.)
* `<metrics>` is about the hits, errors or latency ("request.hits", etc.)
* `<tags` the metrics are tagged by service & resource.

So for pylons it might be `trace.pylons.request.hits{service:mcnulty}`.