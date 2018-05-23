---
title: docker.containers.running and kubernetes.pods.running values
kind: faq
---

When displaying the `docker.containers.running` and/or `kubernetes.pods.running` metrics in your metric explorer, they may not display the containers/pods situation accurately. 

The root cause is that zero values for those metrics are not sent when some contexts expire (such as a Redis pod that may be terminated on a node and recreated on another one), so you need to add the `fill-by` last-value to force contexts to expire sooner.

**Note**: The `docker.container.running.total` metric does not exhibit this symptom (since it is a client-computed host sum).
