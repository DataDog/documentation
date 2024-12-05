---
categories:
- azure
- collaboration
- outils de développement
- issue tracking
- provisioning
- source control
dependencies: []
description: Surveillez des métriques clés d'Azure DevOps.
doc_link: https://docs.datadoghq.com/integrations/azure_devops
draft: false
git_integration_title: azure_devops
has_logo: true
integration_id: azuredevops
integration_title: Microsoft Azure DevOps
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_devops
public_title: Intégration Datadog/Microsoft Azure DevOps
short_description: Surveillez des métriques clés d'Azure DevOps.
team: web-integrations
version: '1.0'
---

## Présentation

Intégrez Datadog à Azure DevOps pour :

- Suivre les pull requests et les merges effectuées sur vos différents projets
- Surveiller les événements de build et de version avec le contexte des autres données de votre pile
- Suivre le temps passé à terminer un build ou un élément de travail
- Gérer les éléments de travail et les mises à jour

## Implémentation

### Installation

Dans Datadog, cliquez sur le bouton d'installation figurant sur le [carré d'intégration Azure DevOps][1].

### Configuration

Utilisez un hook de service pour créer des événements et des métriques Datadog en réponse aux événements Azure DevOps Services :

{{< img src="integrations/azure_devops/configure-service-hook.mp4" alt="Configurer des hooks de service" video="true" >}}

1. Dans Azure, accédez à la page des hooks de service pour votre projet.
2. Cliquez sur **Créer un abonnement**.
3. Sélectionnez le service Datadog.
4. Configurez l'événement déclencheur Visual Studio.
5. Saisissez votre [clé d'API Datadog][2] dans le champ adéquat.
6. Ajoutez le site Datadog de votre organisation : {{< region-param key="dd_site_name" code="true" >}}
7. Testez l'abonnement de votre hook de service, puis terminez la configuration. **Remarque** : le test ne valide pas votre clé dAPI ou le site Datadog de votre organisation.
8. Répétez les étapes 4 à 7 pour chaque type d'événement que vous souhaitez envoyer à Datadog. Tous les types d'événements sont acceptés.

Une fois vos hooks de service configurés, accédez à Datadog pour visualiser les événements et les métriques d'Azure DevOps.

Documentation de référence Azure supplémentaire : [créer un hook de service pour Azure DevOps Services et TFS avec Datadog][3]

#### Programmation

Suivez la documentation Azure pour [Créer un abonnement de hook de service par programmation][4] et utiliser l'endpoint de Datadog :

```text
https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=<CLÉ_API_DATADOG>
```

### Utiliser les monitors Datadog en tant que portes dans Azure Pipelines

Vous pouvez également utiliser les monitors Datadog en tant que portes pour [contrôler le déploiement des versions][5] dans Azure Pipelines. Cette option vous permet d'arrêter automatiquement les déploiements problématiques si un état anormal est détecté dans Datadog.

1. Ajoutez l'extension [Datadog Monitors as Deployment Gates][6] à votre organisation Azure DevOps.

    {{< img src="integrations/azure_devops/extension-service-connection.mp4" alt="Connexion de service pour l'extension" video="true" >}}

2. Dans Azure DevOps, accédez à **Service Connections** dans les paramètres de votre projet, et sélectionnez **New Service Connection**.
3. Dans la liste, sélectionnez Datadog et cliquez sur **Next**.
4. Dans les champs proposés, ajoutez votre clé d'API Datadog et la clé d'application du compte que vous souhaitez utiliser, puis saisissez un nom et une description pour identifier ce compte Datadog dans Azure DevOps. Cliquez sur **Enregistrer**. Vous pouvez ajouter d'autres connexions de service si vous souhaitez interroger les monitors de plusieurs comptes Datadog différents.
5. Accédez à **Azure Pipelines** pour configurer votre déploiement. Vous aurez alors la possibilité d'ajouter des conditions de pré-déploiement ou de post-déploiement entre les différentes phases. Sélectionnez où vous souhaitez ajouter un monitor Datadog, puis activez le bouton **Portes**.
6. Cliquez sur **Ajouter** et sélectionnez l'option **Query Datadog monitors**.
7. Sélectionnez la connexion de service Datadog, puis saisissez l'ID de votre monitor et le seuil de gravité de votre choix. Le seuil de gravité correspond au statut du monitor (`Alert` ou `Warning`) auquel la tâche échoue.

    {{< img src="integrations/azure_devops/datadog-monitor-gate.mp4" alt="Porte de monitor Datadog" video="true" >}}

8. Répétez les étapes 5 à 7 pour ajouter d'autres portes dans votre pipeline de déploiement, si nécessaire.

**Remarque** : utilisez les [monitors composite][7] pour surveiller plusieurs conditions pour les portes de votre pipeline via un seul état d'intégrité pour chaque phase.

Pour afficher le code source, consultez le [référentiel de l'extension Monitor Gate d'Azure Devops][8].

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_devops" >}}


### Événements

L'intégration Azure DevOps prend en charge tous les [types d'événements de hook de service][10] :

- Build et mise en production
- Éléments de travail
- Code


### Checks de service

L'intégration Azure DevOps n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

### FAQ

#### Cette intégration engendre-t-elle des frais supplémentaires ?
Les métriques et les événements générés par cette intégration n'engendrent aucun surcoût.

#### Pendant combien de temps les données sont-elles conservées dans Datadog ?
Les données issues de cette intégration sont conservées pendant une durée de 15 mois, tout comme les autres types de données de série temporelle dans Datadog.

#### Quel est le délai d'affichage des événements et des métriques sur Datadog ?
La latence totale dépend de nombreux facteurs. Dans la plupart des cas, les événements et les métriques apparaissent sur Datadog moins de 30 secondes après la survenue d'un incident.

#### Comment les événements et les métriques Azure DevOps peuvent-ils être utilisés dans Datadog ?
Les événements et métriques Azure DevOps fonctionnent de la même manière que les autres événements et métriques Datadog. Ils servent à créer des dashboards, configurer des monitors ou encore à diagnostiquer des problèmes.

#### Comment les métriques liées à la durée d'un build ou d'un élément de travail sont-elles générées ?
La durée d'une opération de build est calculée à partir des événements _build completed_, en mesurant l'intervalle (en secondes) entre le début et la fin du build.

La durée d'un élément de travail est calculée à partir des événements _work item updated_, en mesurant l'intervalle (en heures) entre la création de l'élément de travail et son passage au statut `Done`.

**Remarque** : en cas de réouverture d'un élément de travail `Done`, un autre point de données est généré lors de son prochain passage au statut `Done`. Le point de données initial n'est pas modifié, et le nouveau point de données est comparé à la création initiale de l'élément de travail.

#### Mon test d'abonnement de hook de service renvoie un message de réussite. Pourquoi les événements n'arrivent-ils pas sur Datadog ?
Le test d'abonnement du hook de service surveille uniquement la capacité d'Azure DevOps à envoyer des événements à Datadog. Il ne permet pas de valider votre clé d'API ou le site Datadog (américain ou européen) de votre organisation. Assurez-vous que la clé d'API et le site sont valides.

[1]: https://app.datadoghq.com/account/settings#integrations/azuredevops
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[4]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops
[6]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors
[7]: /fr/monitors/monitor_types/composite/
[8]: https://github.com/DataDog/azure-devops-monitor-gate-extension
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[10]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#available-event-types
[11]: https://docs.datadoghq.com/fr/help/