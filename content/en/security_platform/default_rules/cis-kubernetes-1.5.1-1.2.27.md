---
aliases:
- b5g-dpn-b7g
control: 1.2.27
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --service-account-lookup argument is set to true
type: security_rules
---

## Description

Validate service account before validating token.

## Rationale

If --service-account-lookup is not enabled, the apiserver only verifies that the authentication token is valid, and does not validate that the service account token mentioned in the request is actually present in etcd. This allows using a service account token even after the corresponding service account is deleted. This is an example of time of check to time of use security issue.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that if the `--service-account-lookup` argument exists it is set to `true`.

## Remediation

Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the below parameter. `--service-account-lookup=true` Alternatively, you can delete the `--service-account-lookup` parameter from this file so that the default takes effect.

## Impact

None

## Default Value

By default, `--service-account-lookup` argument is set to true.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 
2. https://github.com/kubernetes/kubernetes/issues/24167 
3. https://en.wikipedia.org/wiki/Time_of_check_to_time_of_use

## CIS Controls

Version 6 16 Account Monitoring and Control Account Monitoring and Control Version 7 16 Account Monitoring and Control Account Monitoring and Control
