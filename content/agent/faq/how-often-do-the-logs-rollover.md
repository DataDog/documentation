---
title: How often do the logs rollover?
kind: faq
customnav: agentnav
---

The Datadog logs will rollover every 10MB. When rollover occurs, one backup is kept (e.g. forwarder.log.1). If a previous backup exists, it will be overwritten on rollover (e.g. forwarder.log.1 will not be rotated to forwarder.log.2, but will instead be overwritten).