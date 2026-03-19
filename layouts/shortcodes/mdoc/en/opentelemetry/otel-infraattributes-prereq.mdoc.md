{% alert level="warning" %}
For the `infraattributes` processor to add Kubernetes tags, your telemetry must include the `container.id` resource attribute. This is often, but not always, added by OTel SDK auto-instrumentation.

If your tags are missing, see the [troubleshooting guide][1] for details on how to add this attribute.

[1]: /opentelemetry/troubleshooting/#infrastructure-tags-are-missing-from-telemetry
{% /alert %}
