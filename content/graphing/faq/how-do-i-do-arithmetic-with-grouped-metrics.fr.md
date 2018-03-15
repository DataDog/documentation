---
title: Comment faire de l'arithmétique avec des métriques groupées?
kind: faq
---

Pour grapher la sum de `app.foo.bar{env:staging}` et `app.foo.baz{env:staging}`
groupés `by {host}`, écrivez la requête de graphe suivante:

```
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
```