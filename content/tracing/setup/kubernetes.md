---
title: Tracing Kubernetes Applications
kind: Documentation
aliases:
  - /tracing/kubernetes/
further_reading:
- link: "https://github.com/DataDog/datadog-trace-agent"
  tag: "Github"
  text: "Source code"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

In order to enable APM tracing, the `datadog/agent` image must be configured to enable the trace collection by passing `DD_APM_ENABLED=true` as environment variable.

For additional information or different installation processes, see the [Agent 6 Kubernetes documentation][1].

## Deploy Agent DaemonSet

Create the following `datadog-agent.yaml` manifest:

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      containers:
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_APM_ENABLED
            value: "true"
          - name: DD_API_KEY
            value: "<YOUR_API_KEY>"
          - name: DD_COLLECT_KUBERNETES_EVENTS
            value: "true"
          - name: DD_LEADER_ELECTION
            value: "true"
          - name: KUBERNETES
            value: "true"
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
        livenessProbe:
          exec:
            command:
            - ./probe.sh
          initialDelaySeconds: 15
          periodSeconds: 5
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

To send custom metrics via dogstatsd from your application pods, uncomment the `# hostPort: 8125` line in your `datadog-agent.yaml` manifest. This exposes the DogStatsD port on each of your Kubernetes nodes.

To send Traces from your application pods, uncomment the `# hostPort: 8126` line in your `datadog-agent.yaml` manifest. This exposes the Datadog Agent tracing port on each of your Kubernetes nodes.

**Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. 
Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work. If you use EKS to host your Agent and applications, the `hostPorts` parameter could not work. 
The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

Then, deploy the DemonSet with the command:

```bash
kubectl create -f datadog-agent.yaml
```

Because of the `hostPort` directive, you can then send traces to the `hostIP` of Nodes using the Downward API from your application containers.

Your application containers then needs the Node IP and port to be set as environment variables:

```yaml
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
          - name: DD_AGENT_PORT
            value: "8126"
```

Your application level tracers must then be configured to submit traces to this address.
See the examples below for each supported language:

{{< tabs >}}
{{% tab "Java" %}}

The Java Tracing Module automatically looks for and initializes with the ENV variables DD_AGENT_HOST and DD_AGENT_PORT:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

You can also use system properties:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=$DD_AGENT_HOST \
     -Ddd.agent.port=$DD_AGENT_PORT \
     -jar /your/app.jar
```

{{% /tab %}}
{{% tab "Python" %}}

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_AGENT_PORT'],
)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
Datadog.configure do |c|
  c.tracer hostname: ENV['DD_AGENT_HOST'],
           port: ENV['DD_AGENT_PORT']
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "net"
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        os.Getenv("DD_AGENT_HOST"),
        os.Getenv("DD_AGENT_PORT"),
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}

```

{{% /tab %}}
{{% tab "Node.js" %}}

```js
const tracer = require('dd-trace').init({
  hostname: process.env.DD_AGENT_HOST,
  port: process.env.DD_AGENT_PORT
})
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/kubernetes
