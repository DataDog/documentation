---
description: Étapes à suivre pour gérer automatiquement l'intégration Azure native
  avec Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentation
  text: Intégration Azure
- link: https://docs.datadoghq.com/integrations/guide/azure-portal
  tag: Documentation
  text: Gérer l'intégration Azure native

title: Guide sur la gestion automatisée de l'intégration Azure native
---

{{< site-region region="us3" >}}

## Présentation

L'intégration Azure native repose sur la ressource Datadog dans Azure pour simplifier la gestion et la collecte des données de votre environnement Azure. Il est recommandé d'utiliser dès que possible cette méthode. Il vous suffit de créer la ressource [azurerm_datadog_monitor][3] et de lui attribuer le [rôle Monitoring Reader][4] pour associer vos abonnements Azure à votre organisation Datadog. Il n'est alors pas nécessaire d'utiliser le processus d'inscription d'application pour la collecte des métriques ni de configurer un Event Hub pour l'envoi des logs.

## Configuration

**Remarque** : pour configurer l'intégration Azure native, vous devez bénéficier d'un accès Owner pour tous les abonnements Azure que vous souhaitez associer, ainsi que d'un rôle Admin pour l'organisation Datadog que vous leur associez.

### Terraform

1. Vérifiez que vous avez configuré le [fournisseur Azure Terraform][1].

2. Utilisez les modèles ci-dessous pour créer la ressource `azurerm_datadog_monitor` et attribuer le rôle `Monitoring Reader` avec Terraform :

#### Ressource Azure Datadog Monitor

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "azurerm_resource_group" "example" {
  name     = "<NOM>"
  location = "<RÉGION_AZURE>"
}
resource "azurerm_datadog_monitor" "example" {
  name                = "<NOM>"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datadog_organization {
    api_key         = "<CLÉ_API_DATADOG>"
    application_key = "<CLÉ_APPLICATION_DATADOG>"
  }
  user {
    name  = "<NOM>"
    email = "<E-MAIL>"
  }
  sku_name = "Linked"
  identity {
    type = "SystemAssigned"
  }
}

{{< /code-block >}}

#### Rôle Monitoring Reader

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

data "azurerm_subscription" "primary" {}

data "azurerm_role_definition" "monitoring_reader" {
  name = "Monitoring Reader"
}

resource "azurerm_role_assignment" "example" {
  scope              = data.azurerm_subscription.primary.id
  role_definition_id = data.azurerm_role_definition.monitoring_reader.role_definition_id
  principal_id       = azurerm_datadog_monitor.example.identity.0.principal_id
}

{{< /code-block >}}

3. Exécutez `terraform apply`.

## Collecte de logs

Une fois la ressource Datadog configurée dans votre compte Azure, paramétrez la collecte de logs via le portail Azure. Consultez la rubrique [Configurer les métriques et les journaux][5] de la documentation Azure pour en savoir plus.

[1]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
[2]: /fr/integrations/guide/azure-portal/
[3]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors
[4]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/create#configure-metrics-and-logs
{{< /site-region >}}

{{< site-region region="us,us5,eu,ap1,gov" >}}

<div class="alert alert-info">L'intégration Azure native est uniquement disponible pour les organisations utilisant le site US3 de Datadog. Si vous utilisez un autre <a href="https://docs.datadoghq.com/getting_started/site/" target="_blank">site Datadog</a>, consultez plutôt le <a href="https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/" target="_blank">guide sur la gestion automatisée de l'intégration Azure standard</a>. Si vous utilisez le site US3 Datadog, <a href="?site=us3" target="_blank">sélectionnez ce site</a> depuis le menu situé sur la droite de cette page.</div>

{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}