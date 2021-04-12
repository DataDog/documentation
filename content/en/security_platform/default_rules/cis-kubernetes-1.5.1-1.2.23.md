---
aliases:
- djt-49a-5ep
control: 1.2.23
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --audit-log-maxage argument is set to 30 or as appropriate
type: security_rules
---

## Description

Retain the logs for at least 30 days or as appropriate.

## Rationale

Retaining logs for at least 30 days ensures that you can go back in time and investigate or correlate any events. Set your audit log retention period to 30 days or as per your business requirements.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--audit-log-maxage` argument is set to `30` or as appropriate.

## Remediation

Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the `--audit-log-maxage` parameter to `30` or as an appropriate number of days: `--audit-log-maxage=30`

## Impact

None

## Default Value

By default, auditing is not enabled.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 
2. https://kubernetes.io/docs/concepts/cluster-administration/audit/ 
3. https://github.com/kubernetes/features/issues/22

## CIS Controls

Version 6 6.3 Ensure Audit Logging Systems Are Not Subject To Loss (i.e. rotation/archive) Ensure that all systems that store logs have adequate storage space for the logs generated on a regular basis, so that log files will not fill up between log rotation intervals. The logs must be archived and digitally signed on a periodic basis. Version 7 6.4 Ensure adequate storage for logs Ensure that all systems that store logs have adequate storage space for the logs generated.
