---
title: docker.containers.running and kubernetes.pods.running values
kind: faq
---

### docker.containers.running and kubernetes.pods.running - real time values

My metrics `docker.containers.running` and `kubernetes.pods.running` do not display the correct values, what is the issue?

When displaying the `docker.containers.running` and/or `kubernetes.pods.running` metrics in your metric explorer, they may not display the containers/pods situation accurately. That is because we do not send zero values for those metrics when some contexts expire (such as a Redis pod that may be terminated on a node and recreated on another one), so you would need to add the `fill-by` last-value to force the contexts to expire sooner.


However, note that the `docker.container.runing.total` metric that does not exhibit this symptom (since it is a client-computed host sum).

To double check that the issue does not lie with the Datadog agent, you can run the agent check docker command from an agent pod:

`kubectl exect -it <agent_pod> agent check docker`

And look at the `docker.container.running` and `kubernetes.pods.running` values.

This should not affect the Docker nor Kubernetes dashboard.