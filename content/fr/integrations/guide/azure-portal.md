---
title: Datadog sur le portail Azure
kind: guide
further_reading:
  - link: /integrations/azure/
    tag: Documentation
    text: Intégration Azure
  - link: https://www.datadoghq.com/blog/azure-datadog-partnership
    tag: Blog
    text: "Partenariat\_: Microsoft intègre nativement Datadog sur le portail Azure "
---
<div class="alert alert-warning">
  Les informations figurant sur cette page s'adressent aux utilisateurs Datadog se servant du site US3 avec Azure.
</div>

Ce guide vise à vous aider à gérer l'intégration Datadog/Azure sur le portail Azure à l'aide de la ressource Datadog. Cette dernière représente la connexion entre une organisation Datadog et un abonnement Azure. [Créez une ressource Datadog][1] dans Azure avant de poursuivre votre lecture.

Grâce à la ressource Datadog, vous pouvez effectuer les opérations suivantes au sein de l'abonnement Azure associé :
- Configurer la collecte de métriques Azure et de logs de la plate-forme
- Vérifier les ressources Azure à l'origine de l'envoi des métriques et logs
- Visualiser vos clés d'API et définir la clé par défaut pour vos déploiements d'Agent de ressource Datadog
- Déployer l'Agent de VM Datadog sur vos VM Azure et consulter des informations détaillées sur les Agents en cours d'exécution
- Déployer l'extension .NET Datadog sur vos applications Web Azure et consulter des informations détaillées à propos des extensions installées
- Reconfigurer l'authentification unique
- Modifier l'offre de votre organisation Datadog (Place de marché Azure uniquement)
- Activer ou désactiver l'intégration Azure
- Supprimer la ressource Datadog

Nous utiliserons ici le portail Azure. Si vous préférez vous servir de l'interface de ligne de commande, consultez l'[article associé pour Datadog][2].

## Présentation

Sélectionnez Overview dans la barre latérale de gauche pour afficher des informations sur votre ressource Datadog.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="Vue d'ensemble de la ressource US3 Azure" responsive="true" style="width:100%;">}}

### Principales informations

La page Overview présente les principales caractéristiques de votre ressource Datadog, notamment le nom du groupe de ressources, l'emplacement (sa région), l'abonnement, les tags, le lien vers l'organisation Datadog, le statut, l'offre tarifaire et le cycle de facturation.

**Remarque** : si vous avez activé le SSO, le lien vers l'organisation Datadog est un lien SAML. Dans ce cas, si votre organisation Datadog a été créée via la Place de marché Azure, vous devrez définir un mot de passe lors de votre première utilisation de ce lien.

### Liens

La page Overview propose des liens permettant de consulter les dashboards, les logs et les hostmaps Datadog.

### Résumé des ressources

La page Overview contient un tableau récapitulatif des ressources transmettant des logs et métriques à Datadog. Celui-ci possède les colonnes suivantes :

| Colonne             | Description                                                               |
|--------------------|---------------------------------------------------------------------------|
| Resource type      | Le type de ressource Azure.                                                   |
| Total resources    | Le nombre total de toutes les ressources pour le type de ressource en question.                          |
| Logs to Datadog    | Le nombre de ressources transmettant des logs à Datadog via l'intégration.    |
| Metrics to Datadog | Le nombre de ressources transmettant des métriques à Datadog via l'intégration. |

### Section Disable

Pour interrompre l'envoi de logs et de métriques depuis Azure vers Datadog, sélectionnez Disable sur la page Overview, puis cliquez sur OK.

{{< img src="integrations/guide/azure_portal/disable.png" alt="Désactiver l'intégration US3 Azure" responsive="true" style="width:100%;">}}

**Remarque** : si vous désactivez la ressource Datadog, cela interrompt l'envoi des métriques et logs de la plate-forme à Datadog pour l'abonnement associé. Toutes les ressources de l'abonnement transmettant directement des données à Datadog via l'Agent ou l'extension continueront à envoyer ces données.

### Section Enable

Pour commencer à envoyer des logs et des métriques depuis Azure vers Datadog, sélectionnez Enable sur la page Overview, puis cliquez sur OK. La configuration précédemment utilisée pour les logs et métriques (le cas échéant) est alors récupérée et activée.

{{< img src="integrations/guide/azure_portal/enable.png" alt="Activer l'intégration US3 Azure" responsive="true" style="width:100%;">}}

### Section Delete

Pour supprimer la ressource Datadog, sélectionnez Delete sur la page Overview. Confirmez votre décision en saisissant `yes`, puis cliquez sur Delete.

{{< img src="integrations/guide/azure_portal/delete.png" alt="Supprimer la ressource Datadog US3 Azure" responsive="true" style="width:100%;">}}

Pour les organisations Datadog gérant leur facturation via la Place de marché Azure :
- Si la ressource Datadog supprimée est la seule ressource Datadog mappée à l'organisation Datadog associée, les logs et métriques ne seront plus envoyés à Datadog, et Datadog ne facturera plus aucun service via Azure. L'assistance Datadog vous contactera pour confirmer les prochaines étapes à suivre pour la gestion de votre compte.
- Si d'autres ressources Datadog sont mappées à l'organisation Datadog associée, la suppression d'une ressource Datadog interrompt uniquement l'envoi de logs et métriques pour l'abonnement Azure associé.

Si votre organisation Datadog ne gère PAS sa facturation via la Place de marché Azure, la suppression d'une ressource Datadog entraîne uniquement le retrait de l'intégration pour l'abonnement Azure concerné.

### Section Change plan

Sélectionnez Change Plan dans la page Overview pour modifier votre offre Datadog.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="Changer d'offre US3 Azure" responsive="true" style="width:100%;">}}

Le portail récupère toutes les offres Datadog disponibles pour votre locataire, y compris les éventuelles offres exclusives. Sélectionnez l'offre de votre choix, puis cliquez sur Change Plan.

## Configurations des organisations Datadog
### Section Metrics and logs

Sélectionnez Metrics and logs dans la barre latérale de gauche pour modifier les règles de configuration pour les métriques et les logs. Consultez la [documentation Azure][3] pour configurer les métriques et logs.

### Section Monitored Resources

Sélectionnez Monitored Resources dans la barre latérale de gauche pour afficher la liste des ressources envoyant des logs et des métriques à Datadog. Utilisez la fonction de recherche pour filtrer la liste en précisant un nom de ressource, un type, un groupe, un emplacement ou encore si la ressource doit envoyer des logs ou des métriques à Datadog.

{{< img src="integrations/guide/azure_portal/monitored-resources.png" alt="Ressources surveillées US3 Azure" responsive="true" style="width:100%;">}}

Si une ressource envoie des logs à Datadog, la valeur `Sending` figure dans la colonne Logs to Datadog. Dans le cas contraire, aucun log n'est envoyé. Voici les différentes raisons possibles :

| Raison                                    | Description                                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Resource doesn't support sending logs     | L'envoi de logs à Datadog peut uniquement être configuré pour les types de ressources avec des catégories de logs de surveillance.                           |
| Limit of five diagnostic settings reached | Chaque ressource Azure peut inclure jusqu'à cinq paramètres de diagnostic. Pour en savoir plus, consultez la [documentation relative aux paramètres de diagnostic][4]. |
| Error                                     | L'envoi de logs à Datadog a été configuré pour la ressource, mais il est bloqué par une erreur.                                         |
| Logs not configured                       | L'envoi de logs à Datadog peut uniquement être configuré pour les ressources Azure avec des tags de ressource appropriés.                             |
| Region not supported                      | La ressource Azure se trouve dans une région qui ne prend pas en charge l'envoi de logs à Datadog.                                         |
| Datadog Agent not configured              | Les machines virtuelles sur lesquelles l'Agent Datadog n'est pas installé ne transmettent pas de logs à Datadog.                                        |

### Section Virtual machine agent

Pour affiche la liste des VM de l'abonnement, sélectionnez Virtual machine agent dans la barre latérale de gauche. Depuis cette page, vous pouvez installer l'Agent Datadog en tant qu'extension sur une VM.

Les informations suivantes sont indiquées pour chaque VM :

| Colonne               | Description                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name        | Le nom de la VM.                                                                                                                                                  |
| Resource status      | Indique si la VM est en cours d'exécution ou non. L'Agent Datadog peut uniquement être installé sur une VM en cours d'exécution. En cas d'interruption d'une VM, l'installation de l'Agent est désactivée. |
| Agent version        | Le numéro de version de l'Agent Datadog.                                                                                                                               |
| Agent status         | Indique si l'Agent Datadog s'exécute ou non sur la VM.                                                                                                                |
| Integrations enabled | Les principales métriques recueillies par les intégrations activées dans l'Agent Datadog.                                                                                  |
| Install method       | L'outil utilisé pour installer l'Agent Datadog. Exemple : Chef, extension VM Azure, etc.                                                                    |
| Sending logs         | Indique si l'Agent Datadog envoie ou non des logs à Datadog.                                                                                                          |

#### Installation

Pour installer l'Agent Datadog, sélectionnez la VM de votre choix, puis cliquez sur Install Agent. Vous devrez confirmer que vous souhaitez installer l'Agent avec la clé par défaut. Sélectionnez OK pour lancer l'installation. Azure affiche le statut `Installing` tant que l'Agent n'est pas installé ni provisionné. Une fois l'installation terminée, le statut `Installed` est indiqué.

#### Désinstallation

Si l'Agent Datadog a été installé avec l'extension VM Azure, vous pouvez le désinstaller en sélectionnant la VM pertinente, puis en cliquant sur Uninstall Agent.

Si l'Agent a été installé à l'aide d'une autre méthode, vous ne pouvez pas utiliser la ressource Datadog pour déployer ou supprimer l'Agent. Des informations sur l'Agent sont tout de même indiquées sur cette page.

### Section App Service extension

Sélectionnez App Service extension dans la barre latérale de gauche pour afficher la liste des app services de l'abonnement. Vous pouvez installer depuis cette page l'extension Datadog sur Azure App Service, afin d'activer le tracing de l'APM et les métriques custom.

Les informations suivantes sont indiquées pour chaque app service :

| Colonne            | Description                                                                                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name     | Le nom de l'application.                                                                                                                                                                 |
| Resource status   | Indique si l'app service est en cours d'exécution ou non. L'extension Datadog peut uniquement être installée sur un app service en cours d'exécution. En cas d'interruption de l'app service, l'installation de l'extension Datadog est désactivée. |
| App service plan  | Le plan spécifique à l'app service.                                                                                                                             |
| Extension version | Le numéro de version de l'extension Datadog.                                                                                                                                         |

#### Installation

Pour installer l'[extension Datadog][5], sélectionnez l'application de votre choix, puis cliquez sur Install Extension. Vous devrez confirmer que vous souhaitez installer l'extension. Sélectionnez OK pour lancer l'installation. Cela redémarre votre application et ajoute les paramètres suivants :

- `DD_API_KEY:<CLÉ_API_DÉFAUT>`
- `DD_SITE:us3.datadoghq.com`
- `DD_LOGS_INJECTION:true`

Azure affiche le statut `Installing` tant que l'extension n'est pas installée ni provisionnée. Une fois l'installation terminée, le statut `Installed` est indiqué.

**Remarque** : vérifiez que vous avez ajouté l'extension aux applications avec les [runtimes pris en charge][6]. La ressource Datadog ne limite ni ne filtre pas la liste des applications.

#### Désinstallation

Pour désinstaller l'extension Datadog, sélectionnez l'application pertinente, puis cliquez sur Uninstall Extension.

## Paramètres
### Authentification unique

Sélectionnez Single sign-on dans la barre latérale de gauche pour reconfigurer l'authentification unique.

Pour activer l'authentification unique via Azure Active Directory, sélectionnez Enable single sign-on. Le portail récupère alors l'application Datadog depuis Azure Active Directory. Le nom de l'application correspond au nom de l'application d'entreprise que vous avez choisi lors de la configuration de l'intégration. Sélectionnez le nom de l'application Datadog tel qu'indiqué ci-dessous :

{{< img src="integrations/guide/azure_portal/sso.png" alt="Authentification unique US3 Azure" responsive="true" style="width:100%;">}}

### Clés d'API

Sélectionnez Keys dans la barre latérale de gauche pour afficher la liste des clés d'API pour votre ressource Datadog.

{{< img src="integrations/guide/azure_portal/api-keys.png" alt="Clés d'API US3 Azure" responsive="true" style="width:100%;">}}

Le portail Azure vous permet uniquement de consulter les clés d'API. Pour les gérer, cliquez sur le lien Datadog portal. Une fois vos modifications terminées dans Datadog, actualisez le portail Azure.

L'intégration Datadog/Azure vous permet d'installer l'Agent Datadog sur une VM ou sur un app service. Si vous ne sélectionnez pas de clé par défaut, l'installation de l'Agent Datadog échoue.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/integrations/azure/#create-datadog-resource
[2]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /fr/integrations/azure/#metrics-and-logs
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings
[5]: /fr/serverless/azure_app_services
[6]: /fr/serverless/azure_app_services/#requirements