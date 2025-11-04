This integration depends on your runtime having a full SSL implementation. If you are using a slim image, you may need to add the following command to your Dockerfile to include certificates:

```dockerfile
RUN apt-get update && apt-get install -y ca-certificates
```

To have your {{ .Get "productNames" }} appear in the [software catalog][2001], you must set the `DD_SERVICE`, `DD_VERSION`, and `DD_ENV` environment variables.

{{ if eq (.Get "sidecar") "true" }}If you are missing logs or traces during container shutdown, specify a container start up order to make your main container depend on the sidecar container.
{{ end }}
[2001]: /internal_developer_portal/software_catalog/
