---
title: How do I do arithmetic with grouped metrics?
kind: faq
---

To graph the sum of `app.foo.bar{env:staging}` and `app.foo.baz{env:staging}`
grouped `by {host}`, write a graph query that looks like:

```text
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
```
