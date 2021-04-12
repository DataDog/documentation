---
aliases:
- 58q-wv7-ba7
control: 1.2.11
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Admission control plugin AlwaysAdmit is not set
type: security_rules
---

## Description

Do not allow all requests.

## Rationale

Setting admission control plugin AlwaysAdmit allows all requests and do not filter any requests. The AlwaysAdmit admission controller was deprecated in Kubernetes v1.13. Its behavior was equivalent to turning off all admission controllers.

## Audit

Run the following command on the master node:

```bash
ps -ef | grep kube-apiserver
```

Verify the `--enable-admission-plugins` argument's value (if set) does not include `AlwaysAdmit`.

## Remediation

Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and either remove the --enable-admission-plugins parameter, or set it to a value that does not include AlwaysAdmit.

## Impact

Only requests explicitly allowed by the admissions control plugins would be served.

## Default Value

AlwaysAdmit is not in the list of default admission plugins.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://kubernetes.io/docs/admin/admission-controllers/#alwaysadmit

## CIS Controls

Version 6 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know Version 7 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know
