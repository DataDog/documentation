---
aliases:
- vc8-r6d-eye
control: 4.2.11
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --rotate-certificates argument is not set to false
type: security_rules
---

## Description

Enable kubelet client certificate rotation.

## Rationale

The `--rotate-certificates` setting causes the kubelet to rotate its client certificates by creating new CSRs as its existing credentials expire. This automated periodic rotation ensures that the there is no downtime due to expired certificates and thus addressing availability in the CIA security triad.

*Note*: This recommendation only applies if you let kubelets get their certificates from the API server. In case your kubelet certificates come from an outside authority/tool (e.g. Vault) then you need to take care of rotation yourself. 

*Note*: This feature also requires the `RotateKubeletClientCertificate` feature gate to be enabled (which is the default since Kubernetes v1.7).

## Audit

Run the following command on each node: `ps -ef | grep kubelet`. Verify that the `--rotate-certificates` argument is not present, or is set to true. If the `--rotate-certificates` argument is not present, verify that if there is a Kubelet config file specified by `--config`, that file does not contain `rotateCertificates: false`.

## Remediation

If using a Kubelet config file, edit the file to add the line `rotateCertificates: true` or remove it altogether to use the default value. If using command line arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and remove the `--rotate-certificates=false` argument from the `KUBELET_CERTIFICATE_ARGS` variable. Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

None

## Default Value

By default, kubelet client certificate rotation is enabled.

## References

1. [https://github.com/kubernetes/kubernetes/pull/41912 ][1]
2. [https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet-tls-bootstrapping/#kubelet-configuration ][2]
3. [https://kubernetes.io/docs/imported/release/notes/ ][3]
4. [https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/][4]

## CIS Controls

Version 6.14.2 Encrypt All Sensitive Information Over Less-trusted - Networks All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted.

Version 7.14.4 Encrypt All Sensitive Information in Transit - Encrypt all sensitive information in transit.

[1]: https://github.com/kubernetes/kubernetes/pull/41912
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet-tls-bootstrapping/#kubelet-configuration
[3]: https://kubernetes.io/docs/imported/release/notes/
[4]: https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/
