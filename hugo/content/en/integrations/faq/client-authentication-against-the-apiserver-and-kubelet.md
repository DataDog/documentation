---
title: Client Authentication against the API server and kubelet

---

By default the Agent authenticates against the API server and kubelet with its service account bearer token. If you want to specify its path, set the options below. If X509 client certificates are set, either for the kubelet or API server, they are used instead. The recommended way to [expose these files][1] to the Agent is by using [Kubernetes Secrets][2].

```text
bearer_token_path: /var/run/secrets/kubernetes.io/serviceaccount/token
apiserver_client_crt: /path/to/client.crt
apiserver_client_key: /path/to/client.key
kubelet_client_crt: /path/to/client.crt
kubelet_client_key: /path/to/client.key
```

## Server authentication for API server and kubelet

Datadog uses the default CA certificate of the Agent's service account to verify the API server's identity. To use custom certificates, specify the path in your configuration file.

```text
apiserver_ca_cert: /path/to/cacert.crt
kubelet_client_ca: /path/to/ca.pem
```

The default for kubelet traffic is to first try to use the read-only port that doesn't require TLS and then to fall back to the HTTPS API with simple TLS validation. Providing a cert forces TLS validation on. Explicitly disabling tls_verify should be used with caution: if an attacker sniffs the Agent requests they will see the Agent's service account bearer token.

```text
kubelet_tls_verify: True
```

## Alternate option: kubeconfig

Alternately, you can use [kubeconfig][3] for API server authentication. Use the `DD_KUBERNETES_KUBECONFIG_PATH` environment variable to specify the path, or the equivalent option in [datadog.yaml][4].

```text
kubernetes_kubeconfig_path: /path/to/file
```

[1]: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-files-from-a-pod
[2]: https://kubernetes.io/docs/concepts/configuration/secret
[3]: https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig
[4]: https://github.com/DataDog/datadog-agent/blob/a9e0c4f534482170817300edb3cce01df9abea4a/pkg/config/config_template.yaml#L687-L692
