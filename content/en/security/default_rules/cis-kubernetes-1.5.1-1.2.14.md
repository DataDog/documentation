---
aliases:
- 85k-yzu-zx9
- /security_monitoring/default_rules/85k-yzu-zx9
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.2.14
control: 1.2.14
disable_edit: true
framework: cis-kubernetes
integration_id: kubernetes
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: kubernetes
security: compliance
source: kubernetes
title: Admission controller ServiceAccount is enabled
type: security_rules
---

## Description

Automate service accounts management.

## Rationale

When you create a pod, if you do not specify a service account, it is automatically assigned the default service account in the same namespace. You should create your own service account and let the API server manage its security tokens.

## Audit

Run the following command on the master node:

```bash
ps -ef | grep kube-apiserver
```

Verify the `--disable-admission-plugins` argument is set to a value that does not include `ServiceAccount`.

## Remediation

Follow the documentation and create ServiceAccount objects as per your environment. Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and ensure that the --disable-admission-plugins parameter is set to a value that does not include ServiceAccount.

## Impact

None.

## Default value

By default, ServiceAccount is set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://kubernetes.io/docs/admin/admission-controllers/#serviceaccount 3. https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/

## CIS controls

Version 6 16 Account Monitoring and Control Account Monitoring and Control Version 7 16 Account Monitoring and Control Account Monitoring and Control
