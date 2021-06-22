---
title: Kubernetes Audit Logs
name: kubernetes_audit_logs
kind: integration
description: 'Track everything that happens inside your Kubernetes clusters'
short_description: 'Track inside Kubernetes clusters'
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes_audit_logs.md']
categories:
    - log collection
    - containers
    - orchestration
doc_link: /integrations/kubernetes_audit_logs/
aliases:
    - logs/log_collection/kubernetes_audit_logs
has_logo: true
integration_title: Kubernetes Audit Logs
is_public: true
public_title: Datadog-Kubernetes Audit Logs
supported_os:
    - linux
    - mac_os
    - windows
further_reading:
    - link: 'logs/'
      tag: 'Documentation'
      text: 'Log Management'
    - link: 'https://www.datadoghq.com/blog/key-kubernetes-audit-logs-for-monitoring-cluster-security/'
      tag: 'Blog'
      text: 'Key Kubernetes audit logs for monitoring cluster security'
integration_id: "kubernetes-audit-logs"
---

## Overview

Collect [Kubernetes audit logs][1] to track everything that happens inside your Kubernetes clusters, including every call made to the Kubernetes API by any service. This includes the control plane (built-in controllers, the scheduler), node daemons (the kubelet, kube-proxy, and others), cluster services (e.g., the cluster autoscaler), users making `kubectl` requests, and even the Kubernetes API itself.

With the Kubernetes audit logs integration, you can diagnose permission issues, identify RBAC policies that need to be updated, and track slow API requests that are impacting your whole cluster. Deep dive into these topics with the [Datadog talk at KubeCon 2019][2].

## Setup

This integration is **available for Agent >6.0**

### Configuration

For more information about setting up Kubernetes audit logs, refer to [the official Kubernetes documentation][3].

To enable audit logs in Kubernetes:

1. Audit logs are disabled by default in Kubernetes. To enable them in your API server configuration, specify an audit policy file path:

    ```conf
    kube-apiserver
      [...]
      --audit-log-path=/var/log/kubernetes/apiserver/audit.log
      --audit-policy-file=/etc/kubernetes/audit-policies/policy.yaml
    ```

2. Create the policy file at `/etc/kubernetes/audit-policies/policy.yaml` to specify the types of API requests you want to capture in your audit logs. Audit policy rules are evaluated in order. The API server follows the first matching rule it finds for each type of operation or resource. Example of an audit policy:

```yaml
# /etc/kubernetes/audit-policies/policy.yaml

apiVersion: audit.k8s.io/v1
kind: Policy
rules:
    # do not log requests to the following
    - level: None
      nonResourceURLs:
          - '/healthz*'
          - '/logs'
          - '/metrics'
          - '/swagger*'
          - '/version'

    # limit level to Metadata so token is not included in the spec/status
    - level: Metadata
      omitStages:
          - RequestReceived
      resources:
          - group: authentication.k8s.io
            resources:
                - tokenreviews

    # extended audit of auth delegation
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          - group: authorization.k8s.io
            resources:
                - subjectaccessreviews

    # log changes to pods at RequestResponse level
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          # core API group; add third-party API services and your API services if needed
          - group: ''
            resources: ['pods']
            verbs: ['create', 'patch', 'update', 'delete']

    # log everything else at Metadata level
    - level: Metadata
      omitStages:
          - RequestReceived
```

This example policy file configures the API server to log at the highest level of detail for certain types of cluster-changing operations (update, patch, create, delete). It also tracks requests to the `subjectaccessreviews` resource at the highest level to help troubleshoot authentication delegation issues.

You may want to reduce the level of verbosity to `Metadata` for endpoints that contain sensitive data (e.g., `tokenreviews` resource). Datadog also omits the `RequestReceived` stage from logs.

In the last section, for everything that was not explicitly configured by the previous rules, the policy is configured to log at `Metadata` level. As audit logs might be verbose, you can choose to exclude less critical actions/verbs (e.g., operations that don't change the cluster state like list, watch, and get).

### Log collection

1. [Install the Agent][1] on your Kubernetes environment.
2. Log collection is disabled by default. Enable it in the `env` section of your [DaemonSet][4]:

    ```yaml
    env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: 'true'
    ```

3. Mount the audit log directory as well as a directory that the Agent uses to store a pointer to know which log was last sent from that file. To do this, add the following in the `volumeMounts` section of the daemonset:

    ```yaml
     # (...)
        volumeMounts:
          # (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
          - name: auditdir
            mountPath: /var/log/kubernetes/apiserver
          - name: dd-agent-config
            mountPath: /conf.d/kubernetes_audit.d
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/kubernetes/apiserver
          name: auditdir
        - name: dd-agent-config
            configMap:
              name: dd-agent-config
              items:
                - key: kubernetes-audit-log
                  path: conf.yaml
      # (...)
    ```

      This also mounts the `conf.d` folder which is used to configure the Agent to collect logs from the audit log file.

4. Configure the Agent to collect logs from that file with a ConfigMap:

    ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
        name: dd-agent-config
        namespace: default
    data:
        kubernetes-audit-log: |-
            logs:
              - type: file
                path: /var/log/kubernetes/apiserver/audit.log
                source: kubernetes.audit
                service: audit
    ```

### Validation

[Run the Agent's status subcommand][5] and look for `Logs` under the Checks section.

## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/#installation
[2]: https://www.youtube.com/watch?v=raJRLmGb9Is&t=1s
[3]: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
[4]: /agent/kubernetes/log/
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: /help/
