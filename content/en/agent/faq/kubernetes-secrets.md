---
title: How do I use Kubernetes secrets to set my API key?
kind: faq
---

In Kubernetes, a `secret` object enables you to store sensitive information, such as an API key. 

To use Kubernetes `secret`s to set your API key, first create the secret:

1. Encode your plaintext API key using `base_64`.

```
echo -n <DD_API_KEY> | base64
```

This command generates the value for `<YOUR_BASE64_ENCODED_DATADOG_API_KEY>`

2. Uncomment the "Secret" manifest section and the `valueFrom` section of the `DD_API_KEY` environment variable of the DaemonSet.

Secret manifest section:

```
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

```
valueFrom:
  secretKeyRef:
    name: datadog-secret
    key: api-key
```

3. Replace `<YOUR_BASE64_ENCODED_DATADOG_API_KEY>` with the value you generated in step 1.
