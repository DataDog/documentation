---
title: Istio
kind: documentation
further_reading:
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
- link: "https://istio.io/"
  tag: "Documentation"
  text: "Istio website"
- link: "https://istio.io/docs/"
  tag: "Documentation"
  text: "Istio documentation"
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Source Code"
  text: "Datadog OpenTracing C++ Client"
---

Datadog APM is available for Istio v1.1.3+ on Kubernetes clusters.

## Configuration

### Datadog Agent Installation

1. [Install the Agent][1]
2. [Make sure APM is enabled for your Agent][2].
3. Uncomment the `hostPort` setting so that Istio sidecars can connect to the Agent and submit traces.

**Note**: The Agent pods fails to start up if Istio's automatic sidecar injection is enabled on the namespace that Datadog Agent runs in. To avoid this:

- [Disabling Sidecar Injection for the Datadog Agent](#disabling-sidecar-injection-for-the-datadog-agent)
- [Create a Headless Service for the Datadog Agent](#create-a-headless-service-for-the-datadog-agent)

#### Disabling Sidecar Injection for the Datadog Agent

Add the `sidecar.istio.io/inject: "false"` annotation to the `datadog-agent` daemonset:

```yaml
...
spec:
  ...
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    ...

```

This can also be done with the `kubectl patch` command.

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### Create a Headless Service for the Datadog Agent

Create a service using the YAML specified below.

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: datadog-agent
  name: datadog-agent
spec:
  clusterIP: None
  ports:
  - name: dogstatsdport
    port: 8125
    protocol: UDP
    targetPort: 8125
  - name: traceport
    port: 8126
    protocol: TCP
    targetPort: 8126
  selector:
    app: datadog-agent
```

### Istio Configuration and Installation

To enable Datadog APM, a [custom Istio installation][3] is required to add two extra options before Istio is installed. These options are passed at the final `helm template` or `helm install` step:

- `--set pilot.traceSampling=100.0`
- `--set global.proxy.tracer=datadog`

Eg: an installation using the `default` configuration profile would use the following command:

```shell
helm template install/kubernetes/helm/istio --name istio --namespace istio-system --set pilot.traceSampling=100.0 --set global.proxy.tracer=datadog | kubectl apply -f -
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/daemonset_setup
[2]: /agent/kubernetes/daemonset_setup/#apm-and-distributed-tracing
[3]: https://istio.io/docs/setup/kubernetes/install/helm
