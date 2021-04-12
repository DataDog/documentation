---
aliases:
- 6c7-jd2-t3u
control: 1.2.25
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --audit-log-maxsize argument is set to 100 or as appropriate
type: security_rules
---

## Description

Rotate log files on reaching 100 MB or as appropriate.

## Rationale

Kubernetes automatically rotates the log files. Retaining old log files ensures that you would have sufficient log data available for carrying out any investigation or correlation. If you have set file size of 100 MB and the number of old log files to keep as 10, you would approximate have 1 GB of log data that you could potentially use for your analysis.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--audit-log-maxsize` argument is set to `100` or as appropriate.

## Remediation

Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the `--audit-log-maxsize` parameter to an appropriate size in MB. For example, to set it as 100 MB: `--audit-log-maxsize=100`

## Impact

None

## Default Value

By default, auditing is not enabled.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://kubernetes.io/docs/concepts/cluster-administration/audit/ 3. https://github.com/kubernetes/features/issues/22

## CIS Controls

Version 6 6.3 Ensure Audit Logging Systems Are Not Subject To Loss (i.e. rotation/archive) Ensure that all systems that store logs have adequate storage space for the logs generated on a regular basis, so that log files will not fill up between log rotation intervals. The logs must be archived and digitally signed on a periodic basis. Version 7 6.4 Ensure adequate storage for logs Ensure that all systems that store logs have adequate storage space for the logs generated.
