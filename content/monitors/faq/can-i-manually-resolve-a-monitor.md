---
title: Can I manually resolve a monitor?
kind: faq
customnav: monitornav
---

Yes, you can manually resolve [monitors](/monitors/) but it only makes sense in a couple cases:

* If the monitor is in a "no data" state then resolving it will hide it from the triggered monitors page.
* If the monitor is in the triggered state but has stopped reporting data then
resolving it will hide it from the triggered monitors page.

Otherwise the monitor will pick up the current state on the next evaluation. 

In other words, if the value is still above/below the configured threshold then the monitor may re-trigger upon the next evaluation (in about 60 seconds).