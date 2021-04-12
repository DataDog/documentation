---
aliases:
- xck-irw-85e
control: 1.2.6
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --kubelet-certificate-authority argument is set as appropriate
type: security_rules
---

## Description

Verify kubelet's certificate before establishing connection.

## Rationale

The connections from the apiserver to the kubelet are used for fetching logs for pods, attaching (through kubectl) to running pods, and using the kubelets port-forwarding functionality. These connections terminate at the kubelets HTTPS endpoint. By default, the apiserver does not verify the kubelets serving certificate, which makes the connection subject to man-in-the-middle attacks, and unsafe to run over untrusted and/or public networks.

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-apiserver
```
Verify that the `--kubelet-certificate-authority` argument exists and is set as appropriate.

## Remediation

Follow the Kubernetes documentation and setup the TLS connection between the apiserver and kubelets. Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the `--kubelet-certificate-authority` parameter to the path to the cert file for the certificate authority. 

```
--kubelet-certificate-authority=<ca-string>
```

## Impact

You require TLS to be configured on apiserver as well as kubelets.

## Default Value

By default, `--kubelet-certificate-authority` argument is not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 
2. https://kubernetes.io/docs/admin/kubelet-authentication-authorization/ 
3. https://kubernetes.io/docs/concepts/cluster-administration/master-node-communication/#apiserver---kubelet

## CIS Controls

Version 6.3.4 Use Only Secure Channels For Remote System Administration - Perform all remote administration of servers, workstation, network devices, and similar equipment over secure channels. Protocols such as telnet, VNC, RDP, or others that do not actively support strong encryption should only be used if they are performed over a secondary encryption channel, such as SSL, TLS or IPSEC. 

Version 7.4.5 Use Multifactor Authentication For All Administrative Access - Use multi-factor authentication and encrypted channels for all administrative account access.
