---
aliases:
- 83n-39b-4dk
control: 1.2.26
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --request-timeout argument is set as appropriate
type: security_rules
---

## Description

Set global request timeout for API server requests as appropriate.

## Rationale

Setting global request timeout allows extending the API server request timeout limit to a duration appropriate to the user's connection speed. By default, it is set to 60 seconds which might be problematic on slower connections making cluster resources inaccessible once the data volume for requests exceeds what can be transmitted in 60 seconds. But, setting this timeout limit to be too large can exhaust the API server resources making it prone to Denial-of-Service attack. Hence, it is recommended to set this limit as appropriate and change the default limit of 60 seconds only if needed.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--request-timeout` argument is either not set or set to an appropriate value.

## Remediation

Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml and set the below parameter as appropriate and if needed. For example, --request-timeout=300s

## Impact

None

## Default Value

By default, --request-timeout is set to 60 seconds.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://github.com/kubernetes/kubernetes/pull/51415

## CIS Controls

Version 6 14.6 Enforce Detailed Audit Logging For Sensitive Information Enforce detailed audit logging for access to nonpublic data and special authentication for sensitive data. Version 7 14.9 Enforce Detail Logging for Access or Changes to Sensitive Data Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).
