次のマニフェストは、CSM Threats を有効にし、Datadog Agent をサイドカーとしてアプリケーションをデプロイするために必要な最小構成を表しています。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     initContainers:
     - name: cws-instrumentation-init
       image: datadog/cws-instrumentation:latest
       command:
         - "/cws-instrumentation"
         - "setup"
         - "--cws-volume-mount"
         - "/cws-instrumentation-volume"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
       securityContext:
         runAsUser: 0
     containers:
     - name: "<YOUR_APP_NAME>"
       image: "<YOUR_APP_IMAGE>"
       command:
         - "/cws-instrumentation-volume/cws-instrumentation"
         - "trace"
         - "--"
         - "<ENTRYPOINT>"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
           readOnly: true
     - name: datadog-agent
       image: datadog/agent:latest 
       env:
         - name: DD_API_KEY
           value: "<DD_API_KEY>"
         - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
           value: "true"
         - name: DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED
           value: "true"
         - name: DD_EKS_FARGATE
           value: "true"
         - name: DD_CLUSTER_NAME
           value: "<CLUSTER_NAME>"
         - name: DD_KUBERNETES_KUBELET_NODENAME
           valueFrom:
             fieldRef:
               apiVersion: v1
               fieldPath: spec.nodeName
     volumes:
       - name: cws-instrumentation-volume
     serviceAccountName: datadog-agent
     shareProcessNamespace: true
```