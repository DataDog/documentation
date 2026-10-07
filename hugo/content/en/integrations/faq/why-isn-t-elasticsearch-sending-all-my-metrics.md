---
title: Why isn't Elasticsearch sending all my metrics?

---

If you've configured the Elasticsearch integration but feel you are not being sent all the available metrics, it may be because your cluster is hosted externally.
If this is the case, change your `elastic.yaml` configuration file to include `cluster_stats: true`. This parameter defaults to false for customers pointing to localhost.

Make sure to [restart your Agent][1] after updating this configuration, and you should be seeing more metrics coming in from this configuration.

[1]: /agent/guide/agent-commands/#start-stop-restart-the-agent
