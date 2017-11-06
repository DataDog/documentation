---
title: Monitoring Twemproxy
kind: faq
customnav: developersnav
---

You may find here a community custom agent check that integrates with Twemproxy: https://gist.github.com/Martiflex/86c1ce34253b64afd1dd

Known limitation of this integration: 
There's currently an issue with [requests](http://docs.python-requests.org/en/latest/) lib not honoring the closed socket correctly sometimes, showing up as a "broken" integration, when it's working.