---
title: Tracing Kubernetes Applications
kind: Documentation
aliases:
  - /tracing/kubernetes/
further_reading:
- link: "https://github.com/DataDog/datadog-trace-agent"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

In order to enable APM tracing, the `datadog/agent` image must be configured to enable the Trace Agent, passing `DD_APM_ENABLED=true` as environment variable.

For additional information or different installation processes, see the [Agent 6 Kubernetes documentation][2].

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
      serviceAccountName: datadog-agent
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
            value: "yes"
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

**Warning**: This opens a port on your host. Make sure your firewall covers that correctly. 
Another word of caution: some network plugging don't support `hostPorts` yet, so this won't work. The workaround in this case is to add `hostNetwork: true` in your agent pod specifications. This shares the network namespace of your host with the Datadog agent. Again, make sure this logic is okay with your security policies.

Then, deploy the DemonSet with the command:

```bash
kubectl create -f datadog-agent.yaml
```

Because of the `hostPort` directive, you can then send traces to the `hostIP` of Nodes using the Downward API from your application containers.

Your application containers will need the Node IP and port set as environment variables:

```yaml
env:
  - name: DD_AGENT_SERVICE_HOST
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
  - name: DD_AGENT_SERVICE_PORT
    value: 8126
```

Your application level tracers must then be configured to submit traces to this address.
See the examples below for each supported language:

#### Python

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_SERVICE_HOST'],
    port=os.environ['DD_AGENT_SERVICE_PORT'],
)
```

#### Ruby

```ruby
Datadog.configure do |c|
  c.tracer hostname: ENV['DD_AGENT_SERVICE_HOST'],
           port: ENV['DD_AGENT_SERVICE_PORT']
end
```

#### Go

```go
import (
    "os"
    ddtrace "github.com/DataDog/dd-trace-go/opentracing"
)


func main() {
    config := ddtrace.NewConfiguration()
    config.AgentHostname = os.GetEnv("DD_AGENT_SERVICE_HOST")
    config.AgentPort = os.GetEnv("DD_AGENT_SERVICE_PORT")

    tracer, closer, err := ddtrace.NewTracer(config)
    defer closer.Close()
}
```

#### Java

Update the Java Agent configuration via environment variables:

```bash
DD_AGENT_HOST=$DD_AGENT_SERVICE_HOST \
DD_AGENT_PORT=$DD_AGENT_SERVICE_PORT \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

or via system properties:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=$DD_AGENT_SERVICE_HOST \
     -Ddd.agent.port=$DD_AGENT_SERVICE_PORT \
     -jar /your/app.jar
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-trace-agent
[2]: /agent/basic_agent_usage/kubernetes
[3]: https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services
