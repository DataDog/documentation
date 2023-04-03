## Migrating to the version 1.0 of the Datadog Operator

### Disclaimer

As part of the General Availability release of the Datadog Operator, we are offering a migration path for our early adopters to migrate to the GA version of the custom resource, `v2alpha1/DatadogAgent`.

The Datadog Operator v1.X reconciles the version `v2alpha1` of the DatadogAgent custom resource, while the v0.X reconciles `v1alpha1`.

### Requirements

If you are using the v1alpha1 with a v0.X version of the Datadog Operator and would like to upgrade, you will need to use the Conversion Webhook feature.

Start by ensuring that you have the minimum required version of the chart and it's dependencies:

```
NAME                	CHART VERSION	APP VERSION	DESCRIPTION
datadog/datadog-crds	1.0.0        	1          	Datadog Kubernetes CRDs chart
```

and for the Datadog Operator chart:

```
NAME                    	CHART VERSION	APP VERSION	DESCRIPTION
datadog/datadog-operator	1.0.0        	1.0.0      	Datadog Operator
```

Then you will need to install the cert manager if you don't have it already, add the chart:
```
helm repo add jetstack https://charts.jetstack.io
```
and then install it:
```
 helm install \
  cert-manager jetstack/cert-manager \
  --version v1.11.0 \
  --set installCRDs=true
```

### Migration

You can update with the following:

```
helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=1.0.0 \
    --set datadogCRDs.migration.datadogAgents.version=v2alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=true \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=true
```

This command will redeploy the Datadog Operator and configure Kubernetes to store the version v2alpha1 of the DatadogAgent.
With the above process, existing DatadogAgent objects will be converted thanks to the Conversion Webhook server ran by the Datadog Operator.

If you have v1alpha1 versions and migrate, we recommend you save the converted version and start solely deploying this. Once you only deploy v2alpha1 DatadogAgent, you will be able to disable the ConversionWebhook.

### Notes

Starting at the version 1.0.0 of the datadog-operator chart, the fields `image.tag` has a default values of `1.0.0` and `datadogCRDs.migration.datadogAgents.version` is `v2alpha1`.

We set them in the command here to illustrate the migration of going from a Datadog Operator version < 1.0.0 with a stored version of `v1alpha1` to the GA version of `1.0.0` with a stored version of `v2alpha1`.

### Implementation details

This will create a self-signed `Certificate` (using an `Issuer`) that will be used by the Certificate Manager to mutate the DatadogAgent CRD to document the `caBundle` that the API Server will use to contact the Conversion Webhook.

The Datadog Operator will be running the new reconciler for `v2alpha1` object and will also start a Conversion Webhook Server, exposed on port 9443. This server is the one the API Server will be using to convert v1alpha1 DatadogAgent into v2alpha1.

### Lifecycle

The conversionWebhook is not supposed to be an ever running process, we recommend using it to migrate your objects as a transition.

Once converted, you can store the new version of your DatadogAgent, deactivate the conversion and simply deploy v2alpha1 objects.

### Roadmap

Upon releasing the v2 version of the DatadogAgent object, we will remove v1alpha1 from the CRD as part of a major update of the charts (datadog-crds and datadog-operator).

### Troubleshooting

* I don't see v2alpha1 version of the DatadogAgent resource

The v1alpha1 and the v2alpha1 are `served` so you might need to specify which version you want to see:

```
kubectl get datadogagents.v2alpha1.datadoghq.com datadog-agent
```

* The Conversion is not working

The logs of the Datadog Operator pod should show that the conversion webhook is enabled, the server is running, the certificates are watched.

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

* Check the service registered for the conversion for a registered Endpoint

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

* Verify the registered service for the conversion webhook

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

* The CRD does not have the `caBundle`

Make sure that the CRD has the correct annotation: `cert-manager.io/inject-ca-from: default/datadog-operator-serving-cert` and check the logs of the `cert-manager-cainjector` pod.

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

If you migrated to the new version of the Datadog Operator using v2alpha1 but want to rollback to the former version, we recommend:
- Scaling the Datadog Operator deployment to 0 replicas.
  ```
  kubectl scale deploy datadog-operator --replicas=0
  ```
- Upgrading the chart to have v1alpha1 stored and for the Datadog Operator to use the 0.8.X image.
  ```
  helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=0.8.4 \
    --set datadogCRDs.migration.datadogAgents.version=v1alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=false \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=false
  ```
- Redeploy the previous DatadogAgent v1alpha1 object.

Note: The Daemonset of the Datadog Agents will be rolled out in the process.
