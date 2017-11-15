---
title: What are valid metric names?
kind: faq
customnav: developersnav
---


* Metric names must start with a letter, and after that may contain ascii alphanumerics, underscore and periods. Other characters will get converted to underscores. 
* There is no max length. 
* Unicode is not supported.
* We recommend avoiding spaces.
* Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). We say pseudo-hierarchical because we’re not actually enforcing a hierarchy or doing anything with it,
but we have aspirations to use it to infer things about servers (e.g. “hey, I see hostA and hostB are reporting `http.nginx.*`, those must be web frontends”).