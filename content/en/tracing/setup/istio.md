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
aliases:
  - /tracing/servicemesh/istio
---

Support for Datadog APM is available for Istio on Kubernetes clusters.
This was first available in Istio v1.1.3.

## Configuration

### Datadog Agent Installation

The Datadog Agent must be [installed][k8s-install] and [APM enabled][apm-enabled].
The `hostPort` setting needs to be uncommented for Istio sidecars to connect to the agent and submit traces.

If Istio's automatic sidecar injection is enabled on the namespace that Datadog Agent runs in, then the Datadog Agent pods will fail to start up.
This can be corrected in one of two ways:

- disable sidecar injection for the Datadog Agent
- create a headless service for the Datadog Agent

#### Disabling Sidecar Injection for the Datadog Agent

Add the `sidecar.istio.io/inject: "false"` annotation to the `datadog-agent` daemonset.
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
```
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

To enable Datadog APM, a [custom installation][istio-custom] is required, to add two extra options before Istio is installed.
These options are passed at the final `helm template` or `helm install` step:

- `--set pilot.traceSampling=100.0`
- `--set global.proxy.tracer=datadog`

Eg: an installation using the `default` configuration profile will use the following command:
```
helm template install/kubernetes/helm/istio --name istio --namespace istio-system --set pilot.traceSampling=100.0 --set global.proxy.tracer=datadog | kubectl apply -f -
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[k8s-install]: /agent/kubernetes/daemonset_setup/
[apm-enabled]: /agent/kubernetes/daemonset_setup/#apm-and-distributed-tracing
[istio-custom]: https://istio.io/docs/setup/kubernetes/install/helm/
