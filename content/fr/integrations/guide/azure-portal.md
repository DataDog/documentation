---
further_reading:
- link: /integrations/azure/
  tag: Documentation
  text: Intégration Azure
- link: https://www.datadoghq.com/blog/azure-datadog-partnership
  tag: Blog
  text: 'Partenariat : Microsoft intègre nativement Datadog sur le portail Azure '
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: Blog
  text: Activer en quelques minutes la surveillance pour les environnements Azure
    de grande envergure avec Datadog

title: Gérer l'intégration Azure native
---

<div class="alert alert-warning">
  Les informations figurant sur cette page permettent de gérer l'intégration Azure native avec la ressource Datadog.
</div>

Ce guide vise à vous aider à gérer l'intégration Datadog/Azure sur le portail Azure à l'aide de la ressource Datadog. Cette dernière représente la connexion entre une organisation Datadog et votre environnement Azure. Vous pouvez configurer une ressource Datadog afin d'associer tous les abonnements que vous souhaitez surveiller. [Créez une ressource Datadog][1] dans Azure avant de poursuivre votre lecture.

Grâce à la ressource Datadog, vous pouvez effectuer les opérations suivantes au sein de l'abonnement Azure associé :
- Consulter ou modifier la portée de la ressource Datadog, afin d'inclure les abonnements à surveiller
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

Sélectionnez **Overview** dans la barre latérale de gauche pour afficher des informations sur votre ressource Datadog.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="Le portail Azure avec l'option Overview mise en évidence dans la barre de navigation de gauche" responsive="true" style="width:100%;">}}

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

Pour interrompre l'envoi de logs et de métriques depuis Azure vers Datadog, sélectionnez **Disable** sur la page Overview, puis cliquez sur **OK**.

{{< img src="integrations/guide/azure_portal/disable.png" alt="La page de ressource Datadog sur le portail Azure. L'option Overview de la barre de navigation de gauche est sélectionnée. L'onglet Disable et le bouton OK sont mis en évidence." responsive="true" style="width:100%;">}}

**Remarque** : si vous désactivez la ressource Datadog, cela interrompt l'envoi des métriques et logs de la plate-forme à Datadog pour l'abonnement associé. Toutes les ressources de l'abonnement transmettant directement des données à Datadog via l'Agent ou l'extension continueront à envoyer ces données.

### Section Enable

Pour commencer à envoyer des logs et des métriques depuis Azure vers Datadog, sélectionnez **Enable** sur la page Overview, puis cliquez sur **OK**. La configuration précédemment utilisée pour les logs et métriques (le cas échéant) est alors récupérée et activée.

{{< img src="integrations/guide/azure_portal/enable.png" alt="La page de ressource Datadog sur le portail Azure. L'option Overview de la barre de navigation de gauche est sélectionnée. L'onglet Disable et le bouton OK sont mis en évidence." responsive="true" style="width:100%;">}}

### Section Delete

Pour supprimer la ressource Datadog, sélectionnez **Delete** sur la page Overview. Confirmez votre décision en saisissant `yes`, puis cliquez sur **Delete**.

{{< img src="integrations/guide/azure_portal/delete.png" alt="La page de ressource Datadog sur le portail Azure. L'option Overview de la barre de navigation de gauche est sélectionnée. L'onglet Delete et un champ permettant de confirmer la suppression sont mis en évidence." responsive="true" style="width:100%;">}}

Pour les organisations Datadog gérant leur facturation via la Place de marché Azure :
- Si la ressource Datadog supprimée est la seule ressource Datadog mappée à l'organisation Datadog associée, les logs et métriques ne seront plus envoyés à Datadog, et Datadog ne facturera plus aucun service via Azure. L'assistance Datadog vous contactera pour confirmer les prochaines étapes à suivre pour la gestion de votre compte.
- Si d'autres ressources Datadog sont mappées à l'organisation Datadog associée, la suppression d'une ressource Datadog interrompt uniquement l'envoi de logs et métriques pour l'abonnement Azure associé.

Si votre organisation Datadog ne gère **pas** sa facturation via la Place de marché Azure, la suppression d'une ressource Datadog entraîne uniquement le retrait de l'intégration pour l'abonnement Azure concerné.

### Section Change plan

Sélectionnez **Change Plan** dans la page Overview pour modifier votre offre Datadog.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="La page de ressource Datadog sur le portail Azure. L'option Overview de la barre de navigation de gauche est sélectionnée. L'onglet Change Plan est mis en évidence." responsive="true" style="width:100%;">}}

Le portail récupère toutes les offres Datadog disponibles pour votre locataire, y compris les éventuelles offres exclusives. Sélectionnez l'offre de votre choix, puis cliquez sur **Change Plan**.

## Configurations des organisations Datadog

### Section Monitored Subscriptions

Sélectionnez **Monitored Subscriptions** dans la barre latérale de gauche pour afficher ou modifier la portée de la ressource Datadog. La liste des abonnements actuellement surveillés s'affiche. Cette vue vous permet de modifier la portée de la ressource Datadog, afin de surveiller tous les abonnements de votre choix. L'abonnement avec la ressource Datadog doit forcément être inclus.

{{< img src="integrations/guide/azure_portal/azure-portal-multiple-subscriptions.png" alt="La ressource Datadog dans le portail Azure, avec l'option Monitored Subscriptions sélectionnée dans la section dédiée aux configurations de l'organisation Datadog. Deux abonnements sont affichés." responsive="true" style="width:100%;">}}

   - Pour ajouter des abonnements à surveiller, cliquez sur `+ Add Subscriptions`. La liste des abonnements disponibles inclut uniquement les abonnements pour lesquels vous disposez du rôle `Owner`. Sélectionnez les abonnements à surveiller, puis cliquez sur `Add`.
   - Pour ne plus surveiller des abonnements avec Datadog, sélectionnez les abonnements de votre choix, puis cliquez sur `Remove Subscriptions`. Seuls les utilisateurs disposant du rôle `Owner` peuvent désactiver la surveillance d'abonnements.

**Remarque** : les paramètres (comme les filtres de host et les règles de collecte de logs) sont appliqués à l'ensemble des abonnements surveillés. Pour appliquer différents paramètres en fonction des abonnements, créez plusieurs ressources Datadog.

### Section Metrics and logs

Sélectionnez « Metrics and logs » dans la barre latérale de gauche pour modifier les règles de configuration pour les métriques et les logs. Toutes les règles sont appliquées de manière dynamique à l'ensemble de l'abonnement chaque fois que des ressources sont ajoutées ou des tags, changés.

Les changements apportés aux paramètres de configuration des métriques ou des logs devraient prendre effet dans quelques minutes.

#### Collecte de métriques
Par défaut, Datadog recueille automatiquement les métriques de toutes les ressources Azure incluses dans les abonnements associés.

Vous avez la possibilité de restreindre la collecte de métriques pour les VM Azure et les plans App Service. Pour ce faire, utilisez les tags Azure associés à vos ressources.

##### Règles de tag pour l'envoi de métriques

 * Les machines virtuelles, les groupes de machines virtuelles identiques et les plans App Service qui possèdent des tags `include` envoient des métriques à Datadog.
 * À l'inverse, les machines virtuelles, les groupes de machines virtuelles identiques et les plans App Service qui possèdent des tags `exclude` n'envoient pas de métriques à Datadog.
 * En cas de conflit entre des règles d'inclusion et d'exclusion, la règle d'exclusion est prioritaire.
 * Il n'est pas possible de limiter la collecte de métriques pour d'autres types de ressources.

#### Collecte de logs

Trois types de logs peuvent être envoyés par Azure à Datadog à l'aide de la ressource Datadog.

1. Des [logs d'activité](#logs-d-activite)
2. Des [logs de ressource](#logs-de-ressource)
3. Des [logs Azure Active Directory](#logs-azure-active-directory)

##### Logs d'activité

Les logs au niveau de l'abonnement fournissent des informations clés sur les opérations réalisées sur vos ressources dans le [plan de contrôle][3]. Les modifications apportées aux événements Service Health sont également incluses. Consultez les logs d'activité pour déterminer la nature des opérations d'écriture (`PUT`, `POST`, `DELETE`), la personne à leur origine et leur date.

Pour envoyer les logs au niveau de l'abonnement à Datadog, sélectionnez **Send subscription activity logs**. Si vous ne sélectionnez pas cette option, aucun log au niveau de l'abonnement ne sera envoyé à Datadog.

##### Logs de ressource

Les **logs de ressource Azure** fournissent des informations clés sur les opérations réalisées sur les ressources Azure dans le [plan de données][2]. Les opérations du plan de données consistent par exemple à récupérer un secret à partir d'un coffre de clés ou à transmettre une requête à une base de données. Le contenu de ces logs de ressources varie en fonction du service Azure et du type de ressource.

Pour envoyer des logs de ressource Azure à Datadog, sélectionnez **Send Azure resource logs for all defined resources**. Les types de logs de ressource Azure sont répertoriés dans les [catégories de logs de ressource d'Azure Monitor][4]. Si vous sélectionnez cette option, tous les logs de ressource seront envoyés à Datadog, y compris pour les nouvelles ressources créées dans les abonnements liés.

Il est possible de filtrer l'ensemble des ressources Azure transmettant des logs à Datadog à l'aide de tags de ressource Azure.

###### Règles de tag pour l'envoi de logs

* Les ressources Azure qui possèdent des tags `include` envoient des logs à Datadog.
* Les ressources Azure qui possèdent des tags `exclude` n'envoient pas de logs à Datadog.
* En cas de conflit entre des règles d'inclusion et d'exclusion, la règle d'exclusion est prioritaire.

Par exemple, avec la règle de tag de la capture d'écran ci-dessous, seuls ces machines virtuelles, groupes de machines virtuelles identiques et plans App Service avec le tag `Datadog = True` envoient des métriques à Datadog. Les ressources (de tous types) avec le tag `Datadog = True` envoient des logs à Datadog.

{{< img src="integrations/guide/azure_portal/metrics-and-logs-tag-rules.png" alt="Capture d'écran d'une règle de tags de métriques Datadog=true définie pour les machines virtuelles, les groupes de machines virtuelles identiques et les plans App Service. La section Logs est également configurée avec la règle de tags Datadog=true" responsive="true" style="width:100%;">}}

##### Logs Azure Active Directory

Les logs Azure Active Directory (Azure AD) contiennent l'historique des activités de connexion ainsi qu'une piste d'audit des modifications apportées dans Azure AD pour un locataire précis. Pour envoyer des logs Azure AD, procédez comme suit :

1. Accédez à Azure Active Directory dans Azure, puis sélectionnez **Diagnostic Settings** dans la barre de navigation de gauche.
2. Cliquez sur **Add diagnostic setting**.
3. Sélectionnez les catégories de logs que vous souhaitez envoyer à Datadog. Il est conseillé d'envoyer toutes les catégories.
4. Dans **Destination details**, sélectionnez **Send to a partner solution**.
5. Sélectionnez un abonnement, puis une ressource Datadog dans la liste déroulante **Destination**.

Tous les logs Azure AD du locataire sont envoyés à l'organisation Datadog liée à la ressource Datadog sélectionnée. Si vous disposez de plusieurs ressources Datadog associant des abonnements à une seule organisation, la ressource Datadog sélectionnée n'a aucune incidence. Vous n'avez besoin d'effectuer cette configuration qu'une seule fois par locataire Azure.

### Section Monitored Resources

Sélectionnez Monitored Resources dans la barre latérale de gauche pour afficher la liste des ressources envoyant des logs et des métriques à Datadog. Utilisez la fonction de recherche pour filtrer la liste en précisant un nom de ressource, un type, un groupe, un emplacement ou encore si la ressource doit envoyer des logs ou des métriques à Datadog.

{{< img src="integrations/guide/azure_portal/monitored-resources.png" alt="La page de ressource Datadog sur le portail Azure. L'option Monitored Resources est mise en évidence sous l'en-tête Datadog org configurations." responsive="true" style="width:100%;">}}

Si la ressource envoie des logs à Datadog, la valeur `Sending` est affichée dans la colonne **Logs to Datadog**. Dans le cas contraire, aucun log n'est envoyé. Voici les différentes raisons possibles :

| Raison                                    | Description                                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Resource doesn't support sending logs     | L'envoi de logs à Datadog peut uniquement être configuré pour les types de ressources avec des catégories de logs de surveillance.                           |
| Limit of five diagnostic settings reached | Chaque ressource Azure peut inclure jusqu'à cinq paramètres de diagnostic. Pour en savoir plus, consultez la [documentation relative aux paramètres de diagnostic][5]. |
| Erreur                                     | L'envoi de logs à Datadog a été configuré pour la ressource, mais il est bloqué par une erreur.                                         |
| Logs not configured                       | L'envoi de logs à Datadog peut uniquement être configuré pour les ressources Azure avec des tags de ressource appropriés.                             |
| Region not supported                      | La ressource Azure se trouve dans une région qui ne prend pas en charge l'envoi de logs à Datadog.                                         |
| Datadog Agent not configured              | Les machines virtuelles sur lesquelles l'Agent Datadog n'est pas installé ne transmettent pas de logs à Datadog.                                        |

### Section Virtual machine agent

Pour afficher la liste des VM de l'abonnement, sélectionnez **Virtual machine agent** dans la barre latérale de gauche. Depuis cette page, vous pouvez installer l'Agent Datadog en tant qu'extension sur une VM.

Les informations suivantes sont indiquées pour chaque VM :

| Colonne               | Description                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name        | Le nom de la VM.                                                                                                                                                  |
| Resource status      | Indique si la VM est en cours d'exécution ou non. L'Agent Datadog peut uniquement être installé sur une VM en cours d'exécution. En cas d'interruption d'une VM, l'installation de l'Agent est désactivée. |
| Version de l'Agent        | Le numéro de version de l'Agent Datadog.                                                                                                                               |
| Agent status         | Indique si l'Agent Datadog s'exécute ou non sur la VM.                                                                                                                |
| Integrations enabled | Les principales métriques recueillies par les intégrations activées dans l'Agent Datadog.                                                                                  |
| Install method       | L'outil utilisé pour installer l'Agent Datadog. Exemple : Chef, extension VM Azure, etc.                                                                    |
| Sending logs         | Indique si l'Agent Datadog envoie ou non des logs à Datadog.                                                                                                          |

#### Installation

Pour installer l'Agent Datadog, sélectionnez la VM de votre choix, puis cliquez sur **Install Agent**. Vous devrez confirmer que vous souhaitez installer l'Agent avec la clé par défaut. Sélectionnez **OK** pour lancer l'installation. Azure affiche le statut `Installing` tant que l'Agent n'est pas installé ni provisionné. Une fois l'installation terminée, le statut `Installed` est indiqué.

#### Désinstallation

Si l'Agent Datadog a été installé avec l'extension VM Azure, vous pouvez le désinstaller en sélectionnant la VM pertinente, puis en cliquant sur **Uninstall Agent**.

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

Pour installer l'[extension Datadog][6], sélectionnez l'application de votre choix, puis cliquez sur **Install Extension**. Vous devrez confirmer que vous souhaitez installer l'extension. Sélectionnez **OK** pour lancer l'installation. Cela redémarre votre application et ajoute les paramètres suivants :

- `DD_API_KEY:<CLÉ_API_DÉFAUT>`
- `DD_SITE:us3.datadoghq.com`
- `DD_LOGS_INJECTION:true`

Azure affiche le statut `Installing` tant que l'extension n'est pas installée ni provisionnée. Une fois l'installation terminée, le statut `Installed` est indiqué.

**Remarque** : vérifiez que vous avez ajouté l'extension aux applications avec les [runtimes pris en charge][7]. La ressource Datadog ne limite pas ni ne filtre la liste des applications.

#### Désinstallation

Pour désinstaller l'extension Datadog, sélectionnez l'application pertinente, puis cliquez sur **Uninstall Extension**.

## Paramètres
### Authentification unique

Sélectionnez **Single sign-on** dans la barre latérale de gauche pour reconfigurer l'authentification unique.

Pour activer l'authentification unique via Azure Active Directory, sélectionnez Enable single sign-on. Le portail récupère alors l'application Datadog depuis Azure Active Directory. Le nom de l'application correspond au nom de l'application d'entreprise que vous avez choisi lors de la configuration de l'intégration. Sélectionnez le nom de l'application Datadog tel qu'indiqué ci-dessous :

{{< img src="integrations/guide/azure_portal/sso.png" alt="Le portail Azure avec l'option « Enable single sign-on through Azure active directory » activée" responsive="true" style="width:100%;">}}

### Clés d'API

Sélectionnez **Keys** dans la barre latérale de gauche pour afficher la liste des clés d'API pour votre ressource Datadog.

{{< img src="integrations/guide/azure_portal/api-keys.png" alt="La vue Keys du portail Azure, avec une clé d'API" responsive="true" style="width:100%;">}}

Le portail Azure vous permet uniquement de consulter les clés d'API. Pour les gérer, cliquez sur le lien Datadog portal. Une fois vos modifications terminées dans Datadog, actualisez le portail Azure.

L'intégration Datadog/Azure vous permet d'installer l'Agent Datadog sur une VM ou sur un app service. Si vous ne sélectionnez pas de clé par défaut, l'installation de l'Agent Datadog échoue.

### Cloud Security Posture Management

Sélectionnez `Cloud Security Posture Management` dans la barre latérale du gauche pour configurer [Cloud Security Posture Management][8].

Par défaut, la solution CSPM n'est pas activée. Pour l'activer, sélectionnez `Enable Datadog Cloud Security Posture Management` et cliquez sur **Save**. Cela active CSPM pour tous les abonnements associés à la ressource Datadog.

Pour désactiver CSPM, décochez la case et cliquez sur **Save**.

{{< img src="integrations/guide/azure_portal/enable-CSPM.png" alt="La page du portail Azure, avec l'option Cloud Security Posture Management sélectionnée sous l'onglet Settings." responsive="true" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/fr/integrations/azure/?tab=link&site=us3#create-datadog-resource
[2]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[5]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings
[6]: /fr/serverless/azure_app_services
[7]: /fr/serverless/azure_app_services/#requirements
[8]: /fr/security/cspm/