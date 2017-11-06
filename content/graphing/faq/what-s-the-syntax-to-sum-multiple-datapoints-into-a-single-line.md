---
title: What's the syntax to sum multiple datapoints into a single line?
kind: faq
customnav: graphingnav
---

You can switch commas separating the queries into plus signs, from:

```
"q": "sum:system.io.rkb_s{device:sda}*1024, sum:system.io.rkb_s{device:sdb}
*1024, sum:system.io.rkb_s{device: sdc}*1024"
```

to:

```
"q": "sum:system.io.rkb_s{device:sda}*1024 + sum:system.io.rkb_s{device:sdb}
*1024 + sum:system.io.rkb_s{device: sdc}*1024"
```