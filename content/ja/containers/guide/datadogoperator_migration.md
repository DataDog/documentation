## Migrating to version 1.0 of the Datadog Operator

<div class="alert alert-warning">
The <code>v1alpha1</code> <code>DatadogAgent</code> reconciliation in the Operator is deprecated since v1.2.0+ and will be removed in v1.7.0. After it's removed, you will not be able to configure the Datadog Operator to reconcile the <code>v1alpha1</code> <code>DatadogAgent</code> CRD. However, you will still be able to apply a <code>v1alpha1</code> manifest with the conversion webhook enabled using <code>datadogCRDs.migration.datadogAgents.conversionWebhook.enabled</code>.
</div>

<div class="alert alert-warning">
<code>DatadogAgent</code> <code>v1alpha1</code> and the conversion webhook will be removed in v1.8.0. After it's removed, you will not be able to migrate unless you use earlier version of the Operator.
</div>


Datadog Operator v0.X uses `v1alpha1` of the DatadogAgent custom resource. Datadog Operator v1.X reconciles `v2alpha1`.

This guide describes how to migrate to the `v2alpha1/DatadogAgent` custom resource from `v1alpha1/DatadogAgent`.

### Requirements

If you are using `v1alpha1` with a 0.X version of the Datadog Operator and would like to upgrade, you need to use the conversion webhook feature.

Start by ensuring that you have the minimum required version of the chart and its dependencies:

```
NAME                    CHART VERSION   APP VERSION DESCRIPTION
datadog/datadog-crds    1.0.0           1           Datadog Kubernetes CRDs chart
```

For the Datadog Operator chart:

```
NAME                        CHART VERSION   APP VERSION DESCRIPTION
datadog/datadog-operator    1.0.0           1.0.0       Datadog Operator
```

#### Install cert manager
If you do not already have the cert manager, install it with Helm.

Add the chart:

```
helm repo add jetstack https://charts.jetstack.io
```

Then, install it:

```
 helm install \
  cert-manager jetstack/cert-manager \
  --version v1.11.0 \
  --set installCRDs=true
```

### Migration

Run the following command to redeploy the Datadog Operator and configure Kubernetes to store version `v2alpha1` of the DatadogAgent:

```
helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=1.0.0 \
    --set datadogCRDs.migration.datadogAgents.version=v2alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=true \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=true
```

With this, the conversion webhook server (run by the Datadog Operator) converts existing DatadogAgent objects.

If you have `v1alpha1` versions and migrate, it is recommended that you save the converted version and start solely deploying the converted version. Once you deploy only the `v2alpha1` DatadogAgent, you can disable the conversion webhook.

### Notes

Starting at the version 1.0.0 of the `datadog-operator` chart, the field `image.tag` has a default values of `1.0.0`, and `datadogCRDs.migration.datadogAgents.version` is `v2alpha1`.

These are set in the command here to illustrate the migration of going from a Datadog Operator version < 1.0.0 with a stored version of `v1alpha1` to the GA version of `1.0.0` with a stored version of `v2alpha1`.

### Implementation details

This creates a self-signed Certificate (using an Issuer) that is used by the Certificate Manager to mutate the DatadogAgent CRD to document the `caBundle` that the API Server uses to contact the conversion webhook.

The Datadog Operator is running the reconciler for `v2alpha1` object and starts a conversion webhook server, exposed on port 9443. The API Server uses this server to convert `v1alpha1` DatadogAgent to `v2alpha1`.

### Lifecycle

The conversion webhook is not meant to run indefinitely. Datadog only recommends it to migrate your objects during a transitional period.

Once converted, you can store the new version of your DatadogAgent, deactivate the conversion, and deploy only `v2alpha1` objects.

### トラブルシューティング

#### I don't see the `v2alpha1` version of the DatadogAgent resource.

Because `v1alpha1` and `v2alpha1` are _served_, you might need to specify which version you want to see:

```
kubectl get datadogagents.v2alpha1.datadoghq.com datadog-agent
```

#### The conversion is not working.

The logs of the Datadog Operator pod should show that the conversion webhook is enabled, the server is running, and the certificates are watched.

```
kubectl logs datadog-operator-XXX-YYY
[...]
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook","msg":"Registering webhook","path":"/convert"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.builder","msg":"Conversion webhook enabled","GVK":"datadoghq.com/v2alpha1, Kind=DatadogAgent"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"setup","msg":"starting manager"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook.webhooks","msg":"Starting webhook server"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.certwatcher","msg":"Updated current TLS certificate"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook","msg":"Serving webhook server","host":"","port":9443}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","msg":"Starting server","path":"/metrics","kind":"metrics","addr":"0.0.0.0:8383"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","msg":"Starting server","kind":"health probe","addr":"0.0.0.0:8081"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.certwatcher","msg":"Starting certificate watcher"}
[...]
```

#### How do I check the service registered for the conversion for a registered endpoint?

```
kubectl describe service datadog-operator-webhook-service
[...]
Name:              datadog-operator-webhook-service
Namespace:         default
[...]
Selector:          app.kubernetes.io/instance=datadog-operator,app.kubernetes.io/name=datadog-operator
[...]
Port:              <unset>  443/TCP
TargetPort:        9443/TCP
Endpoints:         10.88.3.28:9443
```

#### How do I verify the registered service for the conversion webhook?

```
kubectl describe crd datadogagents.datadoghq.com
[...]
  Conversion:
    Strategy:  Webhook
    Webhook:
      Client Config:
        Ca Bundle:  LS0t[...]UtLS0tLQo=
        Service:
          Name:       datadog-operator-webhook-service
          Namespace:  default
          Path:       /convert
          Port:       443
      Conversion Review Versions:
        v1
```

#### The CRD does not have the `caBundle`.

Make sure that the CRD has the correct annotation: `cert-manager.io/inject-ca-from: default/datadog-operator-serving-cert`. Also, check the logs of the `cert-manager-cainjector` pod.

If you do not see anything standing out, setting the log level to 5 (debug) might help:

```
kubectl edit deploy cert-manager-cainjector -n cert-manager
[...]
    spec:
      containers:
      - args:
        - --v=5
[...]
```

You should see logs such as:

```
[...]
I0217 08:11:15.582479       1 controller.go:178] cert-manager/certificate/customresourcedefinition/generic-inject-reconciler "msg"="updated object" "resource_kind"="CustomResourceDefinition" "resource_name"="datadogagents.datadoghq.com" "resource_namespace"="" "resource_version"="v1"
I0217 08:25:24.989209       1 sources.go:98] cert-manager/certificate/customresourcedefinition/generic-inject-reconciler "msg"="Extracting CA from Certificate resource" "certificate"="default/datadog-operator-serving-cert" "resource_kind"="CustomResourceDefinition" "resource_name"="datadogagents.datadoghq.com" "resource_namespace"="" "resource_version"="v1"
[...]
```
### Rollback

If you migrated to the new version of the Datadog Operator using `v2alpha1` but want to roll back to the former version, Datadog recommends:
- Scaling the Datadog Operator deployment to 0 replicas.
  ```
  kubectl scale deploy datadog-operator --replicas=0
  ```
- Upgrading the chart to have `v1alpha1` stored and for the Datadog Operator to use the 0.8.X image.
  ```
  helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=0.8.4 \
    --set datadogCRDs.migration.datadogAgents.version=v1alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=false \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=false
  ```
- Redeploy the previous DatadogAgent `v1alpha1` object.

**Note**: The DaemonSet of the Datadog Agents is rolled back in the process.
