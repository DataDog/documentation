---
title: Reverse Connection
further_reading:
- link: "/cloudprem/install/"
  tag: "Documentation"
  text: "CloudPrem Installation Prerequisites"
---

The reverse connection allows your CloudPrem cluster to initiate the HTTP connection with Datadog using your API keys, without the need to set up a DNS entry and public ingress. This is also useful for environments with strict network policies or when you prefer not to expose CloudPrem publicly.

To activate the reverse connection, set the following values in your Helm chart:

```yaml
config:
  cloudprem:
    enable_reverse_connection: true
    site: "datadoghq.com" # your site
    dd_api_key: "${DD_API_KEY}"
    dd_application_key: "${DD_APP_KEY}"
```

