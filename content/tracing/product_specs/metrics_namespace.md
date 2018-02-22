---
title: Trace Metrics Namespace
kind: documentation
---

The trace metrics namespace is `trace.<name>.<metrics>{<tags>}` where

* `<name>`: is the name of the operation i.e. the `span.name`: (*redis.command*, *pylons.request*, *rails.request*, *mysql.query*)
* `<metrics>` is about the hits, errors or latency ("request.hits", etc.)
* `<tags>` the metrics are tagged by service & resource.

So for pylons it might be `trace.pylons.request.hits{service:web_server}`.