---
title: Kubernetes trace collection
kind: documentation
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
    - /tracing/kubernetes/
    - /tracing/setup/kubernetes
    - /agent/kubernetes/apm
    - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
    - /integrations/faq/gathering-kubernetes-events
    - /agent/kubernetes/event_collection
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
further_reading:
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: "Kubernetes Metrics"
---

To enable APM by allowing incoming data from port 8126, set the `DD_APM_NON_LOCAL_TRAFFIC` variable to true in your *env* section:

```text
(...)
      env:
        (...)
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Then, forward the port of the Agent to the host.

```text
(...)
      ports:
        (...)
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
(...)
```

Use the downward API to pull the host IP; the application container needs an environment variable that points to `status.hostIP`. The Datadog container Agent expects this to be named `DD_AGENT_HOST`:

```text
apiVersion: apps/v1
kind: Deployment
...
    spec:
      containers:
      - name: <CONTAINER_NAME>
        image: <CONTAINER_IMAGE>/<TAG>
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```

Finally, point your application-level tracers to where the Datadog Agent host is using the environment variable `DD_AGENT_HOST`. For example, in Python:

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

Refer to the [language-specific APM instrumentation docs][1] for more examples.

**Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `DD_KUBELET_TLS_VERIFY=false`.



### Enable APM and Distributed Tracing

**Note**: If you want to deploy the Datadog Agent as a deployment instead of a DaemonSet, configuration of APM via Helm is not supported.

Update your [datadog-values.yaml][2] file with the following APM configuration:

```text
datadog:
  (...)
  apm:
   enabled: true
```

Update the `env` section of your application's manifest with the following:

```yaml
env:
  - name: DD_AGENT_HOST
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
```

Then upgrade your Datadog Helm chart.

Finally, point your application-level tracers to the host IP using the environment variable `DD_AGENT_HOST`. For example, in Python:

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

Refer to the [language-specific APM instrumentation docs][1] for more examples.

[1]: /tracing/setup
[2]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
