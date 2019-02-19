---
title: Client Authentication against the apiserver and kubelet
kind: faq
---

By default the Agent authenticates against the apiserver and kubelet with its service account bearer token. If you want to specify its path, set the options below. If X509 client certificates are set, either for the kubelet or apiserver, they will be used instead. The recommended way to [expose these files][1] to the Agent is by using [Kubernetes Secrets][2].

```
bearer_token_path: /var/run/secrets/kubernetes.io/serviceaccount/token
apiserver_client_crt: /path/to/client.crt
apiserver_client_key: /path/to/client.key
kubelet_client_crt: /path/to/client.crt
kubelet_client_key: /path/to/client.key
```

## Server Authentication for apiserver and kubelet

We use the default CA certificate of the Agent's service account to verify the apiserver's identity. To use custom certificates, specify the path in your configuration file.

```
apiserver_ca_cert: /path/to/cacert.crt
kubelet_cert: /path/to/ca.pem
```

The default for kubelet traffic is to first try to use the read-only port that doesn't require TLS and then to fall back to the HTTPS API with simple TLS validation. Providing a cert forces TLS validation on. Explicitly disabling tls_verify should be used with caution: if an attacker sniffs the Agent requests they will see the Agent's service account bearer token.

```
kubelet_tls_verify: True
```

[1]: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-files-from-a-pod
[2]: https://kubernetes.io/docs/concepts/configuration/secret
