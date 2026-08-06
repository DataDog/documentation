To update your Datadog instrumentation with zero downtime, use [deployment slots][slots]. You can create a workflow that uses [GitHub Action for Azure CLI][azure-cli-marketplace]. 

See the sample [GitHub workflow][workflow].


[slots]: https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots
[azure-cli-marketplace]: https://github.com/marketplace/actions/azure-cli-action
[workflow]: /resources/yaml/serverless/aas-workflow-linux.yaml