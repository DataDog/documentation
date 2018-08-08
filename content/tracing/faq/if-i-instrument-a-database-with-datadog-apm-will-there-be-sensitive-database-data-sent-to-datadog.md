---
title: If I instrument a database with Datadog APM, will there be sensitive database data sent to Datadog?
kind: faq
---

Out of the box, the way we communicate with databases*, should not transmit the actual parameters, so you shouldn't have this situation. (Named parameters, ie "?" will be stored). In the future, we should be adding custom trace retention policies as well (ie, TTLs per-resource)

