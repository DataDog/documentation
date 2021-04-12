---
aliases:
- mtg-wt7-w4j
control: 1.3.6
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: RotateKubeletServerCertificate argument is set to true (Controller Manager)
type: security_rules
---

## Description

Enable kubelet server certificate rotation on controller-manager.

## Rationale

`RotateKubeletServerCertificate` causes the kubelet to both request a serving certificate after bootstrapping its client credentials and rotate the certificate as its existing credentials expire. This automated periodic rotation ensures that the there are no downtimes due to expired certificates and thus addressing availability in the CIA security triad. 

*Note*: This recommendation only applies if you let kubelets get their certificates from the API server. In case your kubelet certificates come from an outside authority/tool (e.g. Vault) then you need to take care of rotation yourself.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-controller-manager
```
Verify that `RotateKubeletServerCertificate` argument exists and is set to `true`.

## Remediation

Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml` on the master node and set the `--feature-gates` parameter to include `RotateKubeletServerCertificate=true`. 

```
--feature-gates=RotateKubeletServerCe`rtificate=true
```

## Impact

None

## Default Value

By default, `RotateKubeletServerCertificate` is not set.

## References

1. [https://kubernetes.io/docs/admin/kubelet-tls-bootstrapping/#approval-controller ][1]
2. [https://github.com/kubernetes/features/issues/267 ][2]
3. [https://github.com/kubernetes/kubernetes/pull/45059 ][3]
4. [https://kubernetes.io/docs/admin/kube-controller-manager/][4]

## CIS Controls

Version 6 14.2 Encrypt All Sensitive Information Over Less-trusted Networks All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 

Version 7 14.4 Encrypt All Sensitive Information in Transit Encrypt all sensitive information in transit.               

[1]: https://kubernetes.io/docs/admin/kubelet-tls-bootstrapping/#approval-controller 
[2]: https://github.com/kubernetes/features/issues/267 
[3]: https://github.com/kubernetes/kubernetes/pull/45059 
[4]: https://kubernetes.io/docs/admin/kube-controller-manager/
