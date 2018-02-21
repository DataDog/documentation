---
title: Kubernetes container installation
kind: documentation
---

## Setup

Take advantage of DaemonSets to automatically deploy the Datadog Agent on all your nodes (or on specific nodes by using nodeSelectors).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog agent](https://hub.docker.com/r/datadog/agent/) as a sidecar container on each Kubernetes node.*

If your Kubernetes has RBAC enabled, see the [documentation on how to configure RBAC permissions with your Datadog-Kubernetes integration](/integrations/faq/using-rbac-permission-with-your-kubernetes-integration).

* Create the following `datadog-agent.yaml` manifest:

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      containers:
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            value: "YOUR_API_KEY"
          - name: KUBERNETES
            value: "yes"
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "250m"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
        livenessProbe:
          exec:
            command:
            - ./probe.sh
          initialDelaySeconds: 15
          periodSeconds: 5
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

Replace `YOUR_API_KEY` with [your api key](https://app.datadoghq.com/account/settings#api) or use [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/) to set your API key [as an environement variable](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables).

* Deploy the DaemonSet with the command:
  ```
  kubectl create -f datadog-agent.yaml
  ```

**Note**:  This manifest enables autodiscovery's auto configuration feature. To learn how to configure autodiscovery, please refer to [its documentation](https://docs.datadoghq.com/agent/kubernetes/autodiscovery).

## RBAC

In the context of using the Kubernetes integration, and when deploying agents in a Kubernetes cluster, a set of rights are required for the agent to integrate seamlessly.

You will need to allow the agent to be allowed to perform a few actions:

- `get` and `update` of the `Configmaps` named `datadogtoken` to update and query the most up to date version token corresponding to the latest event stored in ETCD.
- `list` and `watch` of the `Events` to pull the events from the API Server, format and submit them.
- `get`, `update` and `create` for the `Endpoint`. The Endpoint used by the agent for the [Leader election](#leader-election) feature is named `datadog-leader-election`.
- `list` the `componentstatuses` resource, in order to submit service checks for the Controle Plane's components status.

You can find the templates in manifests/rbac [here](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/rbac).
This will create the Service Account in the default namespace, a Cluster Role with the above rights and the Cluster Role Binding.

### Custom integrations

#### ConfigMap
It is possible to leverage the ConfigMaps to configure or enable integrations.
To do so, you only need to create a ConfigMap with the integration(s)'s configuration.
Then, reference this ConfigMap among the volumes of your agent's manifest.

For example, in the following case we customize the name, url and tags fields of the http check.
To enable other integrations, just specify the correct yaml name and make sure it is properly formated.

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: dd-agent-config
  namespace: default
data:
  http-config: |-
    init_config:
    instances:
    - name: My service
      url: my.service:port/healthz
      tags:
        - service:critical
---
```
And in the manifest of your agent (Daemonset/Deployment) add the following:
```
[...]
        volumeMounts:
        [...]
          - name: dd-agent-config
            mountPath: /conf.d
      volumes:
      [...]
        - name: dd-agent-config
          configMap:
            name: dd-agent-config
            items:
            - key: http-config
              path: http_check.yaml
[...]
```

#### Annotations

It is also possible to enable integrations via the annotations in the manifest of your application.
This can be done with the autodiscovery, for more details, see the [Autodiscovery](/agent/kubernetes/autodiscovery) section.