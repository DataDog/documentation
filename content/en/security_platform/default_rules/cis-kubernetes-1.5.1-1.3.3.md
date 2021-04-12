---
aliases:
- jbp-64r-kyz
control: 1.3.3
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --use-service-account-credentials argument is set to true
type: security_rules
---

## Description

Use individual service account credentials for each controller.

## Rationale

The controller manager creates a service account per controller in the kube-system namespace, generates a credential for it, and builds a dedicated API client with that service account credential for each controller loop to use. Setting the `--use-service-account-credentials` to true runs each control loop within the controller manager using a separate service account credential. When used in combination with RBAC, this ensures that the control loops run with the minimum permissions required to perform their intended tasks.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-controller-manager
```
Verify that the `--use-service-account-credentials` argument is set to true.

## Remediation

Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml` on the master node to set the below parameter:

```
--use-service-account-credentials=true
```

## Impact

Whatever authorizer is configured for the cluster, it must grant sufficient permissions to the service accounts to perform their intended tasks. When using the RBAC authorizer, those roles are created and bound to the appropriate service accounts in the kube-system namespace automatically with default roles and rolebindings that are auto-reconciled on startup. If using other authorization methods (ABAC, Webhook, etc.), the cluster deployer is responsible for granting appropriate permissions to the service accounts (the required permissions can be seen by inspecting the `controller-roles.yaml` and `controller-role-bindings.yaml` files for the RBAC roles.

## Default Value

By default, `--use-service-account-credentials` is set to false.

## References

1. [https://kubernetes.io/docs/admin/kube-controller-manager/ ][1]
2. [https://kubernetes.io/docs/admin/service-accounts-admin/ ][2]
3. [https://github.com/kubernetes/kubernetes/blob/release-1.6/plugin/pkg/auth/authorizer/rbac/bootstrappolicy/testdata/controller-roles.yaml ][3]
4. [https://github.com/kubernetes/kubernetes/blob/release-1.6/plugin/pkg/auth/authorizer/rbac/bootstrappolicy/testdata/controller-role-bindings.yaml ][4]
5. [https://kubernetes.io/docs/admin/authorization/rbac/#controller-roles][5]

## CIS Controls

Version 6.14 Controlled Access Based on the Need to Know

Version 7.4 Controlled Use of Administrative Privileges 

[1]: https://kubernetes.io/docs/admin/kube-controller-manager/ 
[2]: https://kubernetes.io/docs/admin/service-accounts-admin/ 
[3]: https://github.com/kubernetes/kubernetes/blob/release-1.6/plugin/pkg/auth/authorizer/rbac/bootstrappolicy/testdata/controller-roles.yaml 
[4]: https://github.com/kubernetes/kubernetes/blob/release-1.6/plugin/pkg/auth/authorizer/rbac/bootstrappolicy/testdata/controller-role-bindings.yaml 
[5]: https://kubernetes.io/docs/admin/authorization/rbac/#controller-roles
