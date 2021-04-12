---
aliases:
- 3kq-2r3-p4u
control: 5.3.2
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: All namespaces have network policies defined
type: security_rules
---

## Description

Use network policies to isolate traffic in your cluster network.

## Rationale

Running different applications on the same Kubernetes cluster creates a risk of one compromised application attacking a neighboring application. Network segmentation is important to ensure that containers can communicate only with those they are supposed to. A network policy is a specification of how selections of pods are allowed to communicate with each other and other network endpoints. Network Policies are namespace scoped. When a network policy is introduced to a given namespace, all traffic not allowed by the policy is denied. However, if there are no network policies in a namespace, all traffic will be allowed into and out of the pods in that namespace.

## Audit

Run the following command and review the NetworkPolicy objects created in the cluster: `kubectl --all-namespaces get networkpolicy`

Ensure that each namespace defined in the cluster has at least one Network Policy.

## Remediation

Follow the documentation and create network policy objects as you need them.

## Impact

Once network policies are in use within a given namespace, traffic not explicitly allowed by a network policy will be denied. It is important to ensure that, when introducing network policies, legitimate traffic is not blocked.

## Default Value

By default, network policies are not created.

## References

1. [https://kubernetes.io/docs/concepts/services-networking/networkpolicies/ ][1]
2. [https://octetz.com/posts/k8s-network-policy-apis ][2]
3. [https://kubernetes.io/docs/tasks/configure-pod-container/declare-network-policy/][3]

## CIS Controls

Version 6.14.1 Implement Network Segmentation Based On Information Class Segment - The network based on the label or classification level of the information stored on the servers. Locate all sensitive information on separated VLANS with firewall filtering to ensure that only authorized individuals are only able to communicate with systems necessary to fulfill their specific responsibilities.

Version 7.14.1 Segment the Network Based on Sensitivity - Segment the network based on the label or classification level of the information stored on the servers, locate all sensitive information on separated Virtual Local Area Networks (VLANs).

Version 7.14.2 Enable Firewall Filtering Between VLANs - Enable firewall filtering between VLANs to ensure that only authorized systems are able to communicate with other systems necessary to fulfill their specific responsibilities.

[1]: https://kubernetes.io/docs/concepts/services-networking/networkpolicies/
[2]: https://octetz.com/posts/k8s-network-policy-apis
[3]: https://kubernetes.io/docs/tasks/configure-pod-container/declare-network-policy/
