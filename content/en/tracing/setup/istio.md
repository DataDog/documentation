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

[1]: /agent/kubernetes/
[2]: /agent/kubernetes/apm/
[3]: https://istio.io/docs/setup/kubernetes/install/helm
