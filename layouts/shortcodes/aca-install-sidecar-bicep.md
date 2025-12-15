#### Configuration

Update your existing Container App bicep to include the necessary Datadog App Settings and sidecar, as follows:

```bicep
@secure()
param datadogApiKey string
param datadogSite string
param service string = 'my-service'
param env string = 'dev'
param version string = '0.0.0'

resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  // ...
  properties: {
    template: {
      volumes: [
        {
          name: 'shared-volume'
          storageType: 'EmptyDir'
        }
        // Additional volumes
      ]
      containers: [
        {
          name: 'main'
          image: 'index.docker.io/your/image:tag' // Replace with your Application Image
          resources: {
            cpu: 1
            memory: '2Gi'
          }
          env: [
            { name: 'DD_ENV', value: env }
            { name: 'DD_SERVICE', value: name }
            { name: 'DD_VERSION', value: version }
            { name: 'DD_LOGS_INJECTION', value: 'true' }
            // Additional tracing/application env vars
          ]
          volumeMounts: [
            { volumeName: 'shared-volume', mountPath: '/shared-volume' }
            // Additional volume mounts
          ]
        }
        {
          name: 'datadog-sidecar'
          image: 'index.docker.io/datadog/serverless-init:latest'
          resources: {
            cpu: '0.5'
            memory: '1Gi'
          }
          env: [
            { name: 'DD_AZURE_SUBSCRIPTION_ID', value: subscription().subscriptionId }
            { name: 'DD_AZURE_RESOURCE_GROUP', value: resourceGroup().name }
            { name: 'DD_API_KEY', value: datadogApiKey }
            { name: 'DD_SITE', value: datadogSite }
            { name: 'DD_SERVICE', value: service }
            { name: 'DD_ENV', value: env }
            { name: 'DD_VERSION', value: version }
            // set this to wherever you write logs in the shared volume:
            { name: 'DD_SERVERLESS_LOG_PATH', value: '/shared-volume/logs/app.log' }
          ]
          volumeMounts: [{ volumeName: 'shared-volume', mountPath: '/shared-volume' }]
        }
      ]
      scale: { minReplicas: 1, maxReplicas: 1, rules: [] }
    }
  }
}
```


Redeploy your updated template:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

See the [Manual tab](?tab=manual#application-environment-variables) for descriptions of all environment variables.

