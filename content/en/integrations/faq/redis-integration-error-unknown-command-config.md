---
title: Redis Integration Error, "unknown command 'CONFIG'"
kind: faq
---

The Redis integration will report this error due to the Redis config command being disabled by AWS. Datadog's Redis integration uses the config command to retrieve only one metric, the error should not affect the collection of all other Redis metrics.

It is safe to ignore this error. This will be fixed with the release of version 5.5 of the Datadog Agent.

```text
[ERROR]: "unknown command 'CONFIG'"
```
