---
title: What's the syntax to sum multiple datapoints into a single line?
kind: faq
aliases:
    - /graphing/faq/what-s-the-syntax-to-sum-multiple-datapoints-into-a-single-line
---

Switch commas separating the queries into plus signs, from:

```text
"q": "sum:system.io.rkb_s{device:sda}*1024, sum:system.io.rkb_s{device:sdb}
*1024, sum:system.io.rkb_s{device: sdc}*1024"
```

to:

```text
"q": "sum:system.io.rkb_s{device:sda}*1024 + sum:system.io.rkb_s{device:sdb}
*1024 + sum:system.io.rkb_s{device: sdc}*1024"
```
