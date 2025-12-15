#### Configuration

Update your existing Container App ARM Template to include the necessary Datadog App Settings and sidecar, as follows:

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "datadogApiKey": {
      "type": "securestring"
    },
    "datadogSite": {
      "type": "string"
    },
    "service": {
      "type": "string",
      "defaultValue": "my-service"
    },
    "env": {
      "type": "string",
      "defaultValue": "dev"
    },
    "version": {
      "type": "string",
      "defaultValue": "0.0.0"
    }
  },
  "resources": [
    {
      "type": "Microsoft.App/containerApps",
      "apiVersion": "2024-03-01",
      // ...
      "properties": {
        "template": {
          "volumes": [
            {
              "name": "shared-volume",
              "storageType": "EmptyDir"
            }
            // Additional volumes
          ],
          "containers": [
            {
              "name": "main",
              "image": "index.docker.io/your/image:tag", // Replace with your Application Image
              "resources": {
                "cpu": 1,
                "memory": "2Gi"
              },
              "env": [
                {
                  "name": "DD_ENV",
                  "value": "[parameters('env')]"
                },
                {
                  "name": "DD_SERVICE",
                  "value": "[parameters('service')]"
                },
                {
                  "name": "DD_VERSION",
                  "value": "[parameters('version')]"
                },
                // Additional tracing/application env vars
                {
                  "name": "DD_LOGS_INJECTION",
                  "value": "true"
                }
              ],
              "volumeMounts": [
                {
                  "volumeName": "shared-volume",
                  "mountPath": "/shared-volume"
                }
                // Additional volume mounts
              ]
            },
            {
              "name": "datadog-sidecar",
              "image": "index.docker.io/datadog/serverless-init:latest",
              "resources": {
                "cpu": "0.5",
                "memory": "1Gi"
              },
              "env": [
                {
                  "name": "DD_AZURE_SUBSCRIPTION_ID",
                  "value": "[subscription().subscriptionId]"
                },
                {
                  "name": "DD_AZURE_RESOURCE_GROUP",
                  "value": "[resourceGroup().name]"
                },
                {
                  "name": "DD_API_KEY",
                  "value": "[parameters('datadogApiKey')]"
                },
                {
                  "name": "DD_SITE",
                  "value": "[parameters('datadogSite')]"
                },
                {
                  "name": "DD_SERVICE",
                  "value": "[parameters('service')]"
                },
                {
                  "name": "DD_ENV",
                  "value": "[parameters('env')]"
                },
                {
                  "name": "DD_VERSION",
                  "value": "[parameters('version')]"
                },
                {
                  "name": "DD_SERVERLESS_LOG_PATH",
                  // set this to wherever you write logs in the shared volume:
                  "value": "/shared-volume/logs/app.log"
                }
              ],
              "volumeMounts": [
                {
                  "volumeName": "shared-volume",
                  "mountPath": "/shared-volume"
                }
              ]
            }
          ],
          "scale": {
            "minReplicas": 1,
            "maxReplicas": 1,
            "rules": []
          }
        }
      }
    }
  ]
}
```


Redeploy your updated template:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

See the [Manual tab](?tab=manual#application-environment-variables) for descriptions of all environment variables.

