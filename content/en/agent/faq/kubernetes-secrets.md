---
title: How do I use Kubernetes secrets to set my API key?
kind: faq
---

In Kubernetes, a `secret` object enables you to store sensitive information, such as an API key.

To use Kubernetes `secret`s to set your API key, first encode your plaintext API key using `base_64`:

```shell
echo -n <DD_API_KEY> | base64
```

This command generates the value for `<YOUR_BASE64_ENCODED_DATADOG_API_KEY>`.

Then, uncomment the "Secret" manifest section and the `valueFrom` section of the `DD_API_KEY` environment variable of the DaemonSet.

Secret manifest section:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: datadog-secret
  labels:
    app: "datadog"
type: Opaque
data:
  api-key: "<YOUR_BASE64_ENCODED_DATADOG_API_KEY>"
```

`valueFrom` section of the `DD_API_KEY` environment variable:

```yaml
valueFrom:
  secretKeyRef:
    name: datadog-secret
    key: api-key
```

Finally, replace `<YOUR_BASE64_ENCODED_DATADOG_API_KEY>` with the value you generated with `base_64`.
