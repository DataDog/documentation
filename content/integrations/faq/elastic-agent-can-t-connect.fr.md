---
title: L'Agent Elasticsearch ne peut pas se connecter.
kind: faq
---

```
    elastic
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Vérifiez que le paramètre `url` dans `elastic.yaml` est correcte.