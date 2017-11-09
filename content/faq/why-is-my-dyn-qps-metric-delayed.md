---
title: Why is my dyn.qps metric delayed?
kind: faq
customnav: main_references
---

You can use [Datadog's Dyn integration](/integrations/dyn) to visualize and monitor on the number of DNS queries made per second and on the number of zone changes.

You will notice, however, that the dyn.qps metric only appears in your Datadog account somewhere around 90 minutes after the current time. This is intended behavior, as Dyn currently only makes this data available for collection some ~90 minutes after the current time.