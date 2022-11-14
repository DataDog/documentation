---
aliases:
- 8ji-mdh-b6r
- /security_monitoring/default_rules/8ji-mdh-b6r
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-2.2
control: '2.2'
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
title: Client authentication is enabled for etcd
type: security_rules
---

## Description

Enable client authentication on etcd service.

## Rationale

Etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should not be available to unauthenticated clients. You should enable the client authentication via valid certificates to secure the access to the etcd service.

## Audit

Run the following command on the etcd server node:
```
ps -ef | grep etcd
```
Verify that the `--client-cert-auth` argument is set to `true`.

## Remediation

Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master node and set the below parameter:

```
--client-cert-auth="true"
```

## Impact

All clients attempting to access the etcd server will require a valid client certificate.

## Default value

By default, the etcd service can be queried by unauthenticated clients.

## References

1. [https://coreos.com/etcd/docs/latest/op-guide/security.html ][`]
2. [https://kubernetes.io/docs/admin/etcd/ ][1]
3. [https://coreos.com/etcd/docs/latest/op-guide/configuration.html#client-cert-auth][2]

## CIS controls

Version 6 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know Version 7 4 Controlled Use of Administrative Privileges Controlled Use of Administrative Privileges                

[1]: https://coreos.com/etcd/docs/latest/op-guide/security.html 
[2]: https://kubernetes.io/docs/admin/etcd/ 
[3]: https://coreos.com/etcd/docs/latest/op-guide/configuration.html#client-cert-auth
