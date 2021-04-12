---
aliases:
- h4p-ch8-wwd
control: 1.2.4
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --kubelet-https argument is set to true
type: security_rules
---

## Description

Use https for kubelet connections.

## Rationale

Connections from apiserver to kubelets could potentially carry sensitive data such as secrets and keys. It is thus important to use in-transit encryption for any communication between the apiserver and kubelets.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--kubelet-https` argument either does not exist or is set to `true`.

## Remediation

Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and remove the `--kubelet-https` parameter.

## Impact

You require TLS to be configured on apiserver as well as kubelets.

## Default Value

By default, kubelet connections are over https.

## References

1. [https://kubernetes.io/docs/admin/kube-apiserver/ ][1]
2. [https://kubernetes.io/docs/admin/kubelet-authentication-authorization/][2]

## CIS Controls

Version 6 14.2 Encrypt All Sensitive Information Over Less-trusted Networks All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 

Version 7 14.4 Encrypt All Sensitive Information in Transit Encrypt all sensitive information in transit.                

[1]: https://kubernetes.io/docs/admin/kube-apiserver/ 
[2]: https://kubernetes.io/docs/admin/kubelet-authentication-authorization/
