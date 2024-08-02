---
description: Étapes à suivre pour gérer automatiquement l'intégration Azure avec Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentation
  text: Intégration Azure

title: Guide sur la gestion automatisée de l'intégration Azure
---

## Présentation

 Ce guide vous explique comment gérer de façon automatisée l'intégration Azure avec Datadog, ainsi que d'autres ressources Azure telles que l'extension Agent VM de Datadog. Il vous aide à gérer simultanément vos capacités d'observabilité sur plusieurs comptes.

**Tous les sites** : grâce aux étapes de ce guide, il est possible d'utiliser le processus d'inscription d'application pour tous les [sites Datadog][3] afin de mettre en place la collecte des métriques Azure. De même, vous avez la possibilité de configurer un Event Hub pour l'ensemble des sites, de façon à envoyer les logs de la plateforme Azure.

**US3** : si votre organisation utilise le site Datadog US3, vous pouvez tirer profit de l'intégration native Azure pour simplifier la gestion et la collecte des données de votre environnement Azure. Il est recommandé d'utiliser dès que possible cette méthode. Il vous suffit de créer une [ressource Datadog dans Azure][14] afin d'associer vos abonnements Azure à votre organisation Datadog. Il n'est alors pas nécessaire d'utiliser le processus d'inscription d'application pour la collecte des métriques ni de configurer un Event Hub pour l'envoi des logs. Consultez le guide [Gérer l'intégration Azure native][1] pour en savoir plus.

## Intégration Datadog/Azure

L'intégration Azure standard repose sur un processus d'inscription d'application pour mettre en place la collecte des métriques, ainsi que sur la configuration d'un Event Hub Azure pour l'envoi des logs de la plateforme Azure. Créez une inscription d'application dans Azure avant d'intégrer Datadog à votre environnement Azure, puis attribuez l'autorisation **Monitoring Reader** à Datadog afin de surveiller le contexte défini (abonnements ou groupes de gestion). Si vous n'avez pas encore créé d'inscription d'application, consultez la rubrique [Intégration via l'interface de ligne de commande Azure][6] ou la rubrique [Intégration via le portail Azure][4] pour obtenir des instructions de configuration.

**Remarque** : lors de la création de l'inscription d'application, vous pouvez attribuer des autorisations de lecture au niveau du groupe de gestion. Cela vous permet de surveiller plusieurs abonnements et d'intégrer automatiquement les nouveaux abonnements à la surveillance.

### Terraform

Suivez les étapes ci-dessous pour déployer l'intégration via [Terraform][13].

1. Configurez le [fournisseur Terraform Datadog][15] pour interagir avec l'API Datadog via une configuration Terraform.

2. Définissez votre fichier de configuration Terraform en utilisant l'exemple ci-dessous comme modèle. Mettez à jour les paramètres suivants avant d'appliquer les modifications :
    * `tenant_name` : votre ID Azure Active Directory.
    * `client_id` : la clé du secret de votre application Web Azure.
    * `client_secret` : la clé du secret de votre application Web Azure.

   Consultez la page dédiée à la [ressource de l'intégration Datadog/Azure][17] (en anglais) dans le registre Terraform pour obtenir un exemple détaillé de l'utilisation de la ressource, la liste complète des paramètres facultatifs ainsi que des ressources Datadog supplémentaires.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<NOM_LOCATAIRE_AZURE>"
  client_id     = "<ID_CLIENT_AZURE>"
  client_secret = "<CLÉ_SECRET_CLIENT_AZURE>"
}

{{< /code-block >}}

3. Exécutez `terraform apply`. Patientez 10 minutes le temps que les données commencent à être recueillies, puis consultez le dashboard de vue d'ensemble Azure prêt à l'emploi pour visualiser les métriques envoyées par vos ressources Azure.

#### Gérer plusieurs abonnements ou locataires

Vous pouvez utiliser plusieurs blocs « provider » avec des alias afin de gérer des ressources Terraform pour plusieurs abonnements ou locataires. Consultez la section [Configuration du fournisseur][9] (en anglais) pour en savoir plus.

### Surveiller le statut de l'intégration

Une fois l'intégration configurée, Datadog commence à appeler en continu les API Azure pour recueillir les données de surveillance critiques de votre environnement Azure. Ces appels renvoient parfois des erreurs (si les identifiants fournis ont expiré, par exemple). Ces erreurs peuvent empêcher Datadog de recueillir les données de surveillance.

En cas d'erreurs critiques, l'intégration Azure génère des événements dans l'Events Explorer de Datadog et les republie toutes les cinq minutes. Vous pouvez configurer un monitor d'événement pour qu'il se déclenche lors de la détection de ces événements et envoie une notification à l'équipe appropriée.

Datadog fournit un monitor conseillé que vous pouvez utiliser comme modèle pour commencer. Pour utiliser le monitor conseillé :

1. Dans Datadog, accédez à **Monitors** -> **New Monitor** et sélectionnez l'onglet [Recommended Monitors][19].
2. Sélectionnez le monitor conseillé nommé `[Azure] Integration Errors`.
3. Apportez les modifications souhaitées à la requête de recherche ou aux conditions d'alerte. Par défaut, le monitor se déclenche chaque fois qu'une nouvelle erreur est détectée et se résout si l'erreur en question n'a pas été détectée au cours des 15 dernières minutes.
4. Modifiez les messages pour la notification initiale et les notifications suivantes selon vos besoins. Veuillez noter que les événements contiennent des informations pertinentes et sont automatiquement inclus dans la notification. Ils comprennent notamment des informations détaillées sur le contexte, l'erreur renvoyée et les actions courantes pour y remédier.
5. [Configurez les notifications][20] de sorte qu'elles soient envoyées via vos canaux privilégiés (e-mail, Slack, PagerDuty ou autres), afin de garantir que votre équipe sera prévenue en cas de problème lié à la collecte des données Azure.

#### Envoyer des logs

Consultez le [guide relatif à la journalisation Azure][18] pour configurer l'envoi de logs depuis votre environnement Azure vers Datadog.

## Extension Azure VM Datadog

### Terraform

Grâce à Terraform, vous pouvez créer et gérer une extension d'Agent Datadog. Suivez les étapes ci-dessous pour installer et configurer l'Agent sur une seule machine, puis importez un fichier de configuration zippé dans le stockage de blob afin de vous y référer dans le bloc Terraform de l'extension VM.

1. [Installez l'Agent][11].
2. Créez et modifiez, si vous le souhaitez, des [configurations d'Agent][12].
3. Pour Windows Server 2008, Vista et les versions plus récentes, créez un fichier zip à partir du dossier `%ProgramData%\Datadog`. Pour Linux, zippez plutôt le dossier `/etc/datadog-agent`.
4. Importez le fichier dans le stockage de blob.
5. Spécifiez l'URL de stockage blob dans le bloc Terraform pour créer l'extension VM :

{{< tabs >}}
{{% tab "Windows" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogWindowsAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<SITE_DATADOG>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<CLÉ_API_DATADOG>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{% tab "Linux" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogLinuxAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<SITE_DATADOG>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<CLÉ_API_DATADOG>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{< /tabs >}}

Consultez la [documentation relative à la ressource de l'extension VM][10] (en anglais) dans le registre Terraform pour en savoir plus sur les arguments disponibles.

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/fr/integrations/guide/azure-portal/
[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /fr/getting_started/site/
[4]: /fr/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-cli
[5]: /fr/integrations/azure/
[6]: /fr/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-portal
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration
[10]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7
[13]: https://www.terraform.io
[14]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[18]: /fr/logs/guide/azure-logging-guide
[19]: https://app.datadoghq.com/monitors/recommended
[20]: /fr/monitors/notify/#configure-notifications-and-automations