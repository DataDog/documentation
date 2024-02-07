---
title: Errors during OpenShift upgrade with custom SCCs
kind: faq
---

When upgrading OpenShift Container Platform (OCP) from 4.11 to 4.12 with Datadog installed on your cluster, you may encounter the following error for the `package-server-manager` pod:

```
deployment openshift-operator-lifecycle-manager/package-server-manager has a
replica failure FailedCreate: pods "package-server-manager-12a3b4cd5e-1x2y3" is
forbidden: violates PodSecurity "restricted:v1.24": seLinuxOptions (pod set
forbidden securityContext.seLinuxOptions: type "spc_t"; user may not be set;
role may not be set)
```

This error occurs if custom Security Context Constraints (SCCs), such as Datadog's custom SCC, are present in the cluster.

## Workaround

1. Back up the `datadog` SCC to `datadog_scc.yaml`:
   ```shell
   oc get scc datadog -n <NAMESPACE> -o yaml > datadog_scc.yaml
   ```

   Replace `<NAMESPACE>` with the name of your project namespace.

1. Remove the `datadog` SCC:
   ```shell
   oc delete scc datadog -n <NAMESPACE>
   ```

   Replace `<NAMESPACE>` with the name of your project namespace.

1. Finish upgrading your cluster.

1. Recreate the SCC from your backup file:
   ```shell
   oc create -f datadog_scc.yaml
   ```