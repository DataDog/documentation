<!--
Shared serverless-init troubleshooting content.

Pages using this partial must declare these filters:

content_filters:
  - trait_id: instrumentation_method
    option_group_id: aca_instrumentation_method_options
-->

This integration depends on your runtime having a full SSL implementation. If you are using a slim image, you may need to add the following command to your Dockerfile to include certificates:

```dockerfile
RUN apt-get update && apt-get install -y ca-certificates
```

To have your services appear in the [Catalog][2001], you must set the `DD_SERVICE`, `DD_VERSION`, and `DD_ENV` environment variables.

<!-- Sidecar -->
{% if equals($instrumentation_method, "sidecar") %}
If you are missing logs or traces during container shutdown, specify a container start up order to make your main container depend on the sidecar container.
{% /if %}

[2001]: /internal_developer_portal/software_catalog/
