---
title: Quelle est la syntaxe pour additionner plusieurs points de données en une seule ligne?
kind: faq
---

Commutez les virgules séparant les requêtes en signes plus, à partir de:

```
"q": "sum:system.io.rkb_s{device:sda}*1024, sum:system.io.rkb_s{device:sdb}
*1024, sum:system.io.rkb_s{device: sdc}*1024"
```

à:

```
"q": "sum:system.io.rkb_s{device:sda}*1024 + sum:system.io.rkb_s{device:sdb}
*1024 + sum:system.io.rkb_s{device: sdc}*1024"
```