---
aliases:
- bk7-jyi-j6m
control: 1.2.5
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --kubelet-client-certificate and --kubelet-client-key arguments are set as
  appropriate
type: security_rules
---

## Description

Enable certificate based kubelet authentication.

## Rationale

The apiserver, by default, does not authenticate itself to the kubelet's HTTPS endpoints. The requests from the apiserver are treated anonymously. You should set up certificate-based kubelet authentication to ensure that the apiserver authenticates itself to kubelets when submitting requests.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--kubelet-client-certificate` and `--kubelet-client-key` arguments exist and they are set as appropriate.

## Remediation

Follow the Kubernetes documentation and set up the TLS connection between the apiserver and kubelets. Then, edit API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the kubelet client certificate and key parameters as below. 

```
--kubelet-client-certificate=<path/to/client-certificate-file> 
--kubelet-client-key=<path/to/client-key-file>
```

## Impact

You require TLS to be configured on apiserver as well as kubelets.

## Default Value

By default, certificate-based kubelet authentication is not set.

## References

1. [https://kubernetes.io/docs/admin/kube-apiserver/ ][1]
2. [https://kubernetes.io/docs/admin/kubelet-authentication-authorization/ ][2]
3. [https://kubernetes.io/docs/concepts/cluster-administration/master-node-communication/#apiserver---kubelet][3]

## CIS Controls

Version 6.3.4 Use Only Secure Channels For Remote System Administration - Perform all remote administration of servers, workstation, network devices, and similar equipment over secure channels. Protocols such as telnet, VNC, RDP, or others that do not actively support strong encryption should only be used if they are performed over a secondary encryption channel, such as SSL, TLS or IPSEC. 

Version 7.4.5 Use Multifactor Authentication For All Administrative Access - Use multi-factor authentication and encrypted channels for all administrative account access. 

[1]: https://kubernetes.io/docs/admin/kube-apiserver/ 
[2]: https://kubernetes.io/docs/admin/kubelet-authentication-authorization/ 
[3]: https://kubernetes.io/docs/concepts/cluster-administration/master-node-communication/#apiserver---kubelet
