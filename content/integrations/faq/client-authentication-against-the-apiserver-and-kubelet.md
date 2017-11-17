---
title: Client Authentication against the apiserver and kubelet
kind: faq
customnav: integrationsnav
---

By default the agent authenticates against the apiserver and kubelet with its service account bearer token. If you want to specify its path, set the following option. If X509 client certificates are set, either for the kubelet or apiserver, they will be used instead. The recommended way to [expose these files](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-files-from-a-pod) to the agent is by using [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).

```
bearer_token_path: /var/run/secrets/kubernetes.io/serviceaccount/token
apiserver_client_crt: /path/to/client.crt
apiserver_client_key: /path/to/client.key
kubelet_client_crt: /path/to/client.crt
kubelet_client_key: /path/to/client.key
```

## Server Authentication for apiserver and kubelet

Similarly we use the default CA cert of the agent's service account to verify the apiserver's identity, but custom ones can be specified here.

```
apiserver_ca_cert: /path/to/cacert.crt
kubelet_cert: /path/to/ca.pem
```

The default for kubelet traffic is to try and use the read-only port that doesn't require TLS and to fall back to the HTTPS API with simple TLS validation. Providing a cert forces TLS validation on. Explicitly disabling tls_verify should be used with caution: if an attacker sniffs the agent requests they will see the agent's service account bearer token.

```
kubelet_tls_verify: True
```