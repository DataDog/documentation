ダウンタイムなしで Datadog インスツルメンテーションを更新するには、[デプロイメントスロット][slots]を使用します。[GitHub Action for Azure CLI][azure-cli-marketplace] を使用するワークフローを作成できます。

サンプルの [GitHub ワークフロー][workflow]を参照してください。


[slots]: https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots
[azure-cli-marketplace]: https://github.com/marketplace/actions/azure-cli-action
[ワークフロー]: /resources/yaml/serverless/aas-workflow-linux.yaml