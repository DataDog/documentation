---
categories:
  - azure
  - source control
  - collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure DevOps.
doc_link: 'https://docs.datadoghq.com/integrations/azure_devops'
draft: false
git_integration_title: azure_devops
has_logo: true
integration_title: Microsoft Azure DevOps
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_devops
public_title: Intégration Datadog/Microsoft Azure DevOps
short_description: Surveillez des métriques clés d'Azure DevOps.
version: '1.0'
---
## Présentation

Intégrez Datadog à Azure DevOps pour :

- Suivre les pull requests et les merges effectuées sur vos différents projets
- Visualiser les publications de version et les opérations de build dans le contexte des autres données de votre pile
- Suivre le temps passé à terminer un build ou un élément de travail
- Gérer les éléments de travail et les mises à jour

## Configuration

### Installation

Dans Datadog, cliquez sur le bouton d'installation visible sur le [carré d'intégration Azure DevOps][1].

### Configuration

Utilisez un hook de service pour créer des événements et des métriques Datadog en réponse aux événements Azure DevOps Services :

{{< img src="integrations/azure_devops/configure-service-hook.gif" alt="Configurer des hooks de service" >}}

1. Dans Azure, accédez à la page des hooks de service pour votre projet.
2. Cliquez sur **Créer un abonnement**.
3. Sélectionnez le service Datadog.
4. Configurez l'événement déclencheur Visual Studio.
5. Saisissez votre [clé d'API Datadog][2] dans le champ adéquat.
6. Indiquez si votre organisation utilise le site américain (`US`) ou européen (`EU`) de Datadog.
7. Testez l'abonnement de votre hook de service, puis terminez la configuration.
8. Répétez les étapes 4 à 7 pour chaque type d'événement que vous souhaitez envoyer à Datadog. Tous les types d'événement sont acceptés.

Une fois vos hooks de service configurés, accédez à Datadog pour visualiser les événements et les métriques d'Azure DevOps.

Documentation de référence Azure supplémentaire : [Créer un hook de service pour Azure DevOps Services et TFS avec Datadog][3] (en anglais)

#### Créer un hook de service par programmation

Pour créer des abonnements de hook de service par programmation, utilisez la [documentation Azure][4] et l'endpoint de Datadog :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```text
https://app.datadoghq.com/intake/webhook/azuredevops?api_key=<CLÉ_API_DATADOG>
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```text
https://app.datadoghq.eu/intake/webhook/azuredevops?api_key=<CLÉ_API_DATADOG>
```

{{% /tab %}}
{{< /tabs >}}

### Utiliser les monitors Datadog en tant que portes dans Azure Pipelines

Vous pouvez également utiliser les monitors Datadog en tant que portes pour [contrôler le déploiement des versions][5] dans Azure Pipelines. Cette option vous permet d'arrêter automatiquement les déploiements problématiques si un état anormal est détecté dans Datadog.

1. Ajoutez l'extension [Datadog Monitors as Deployment Gates][6] à votre organisation Azure DevOps.

    {{< img src="integrations/azure_devops/extension-service-connection.gif" alt="Association de services d'extension" >}}

2. Dans Azure DevOps, accédez à **Connexions de services** dans les paramètres de votre projet, et sélectionnez **Nouvelle connexion de service**.
3. Dans la liste, sélectionnez Datadog et cliquez sur **Suivant**.
4. Dans les champs proposés, ajoutez votre clé d'API Datadog et la clé d'application du compte que vous souhaitez utiliser, puis saisissez un nom et une description pour identifier ce compte Datadog dans Azure DevOps. Cliquez sur **Enregistrer**. Vous pouvez ajouter d'autres connexions de service si vous souhaitez interroger les monitors de plusieurs comptes Datadog différents.
5. Accédez à **Azure Pipelines** pour commencer à configurer votre déploiement. Vous aurez alors la possibilité d'ajouter des conditions de pré-déploiement ou de post-déploiement entre les différentes phases. Sélectionnez où vous souhaitez ajouter un monitor Datadog, puis activez le bouton **Portes**.
6. Cliquez sur **Ajouter** et sélectionnez l'option **Query Datadog monitors**.
7. Sélectionnez la connexion de service Datadog, puis saisissez l'ID de votre monitor et le seuil de gravité de votre choix. Le seuil de gravité correspond au statut du monitor (`Alert` ou `Warning`) auquel la tâche échoue.

    {{< img src="integrations/azure_devops/datadog-monitor-gate.gif" alt="Porte de monitor Datadog" >}}

8. Répétez les étapes 5 à 7 pour ajouter d'autres portes dans votre pipeline de déploiement.

**Remarque** : utilisez les [monitors composite][7] pour surveiller plusieurs conditions pour les portes de votre pipeline via un seul état d'intégrité pour chaque phase.

Pour afficher le code source, consultez le [référentiel de l'extension Monitor Gate d'Azure Devops][8].

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_devops" >}}


### Événements

L'intégration Azure DevOps accepte tous les types d'événements Azure DevOps.

### Checks de service

L'intégration Azure DevOps n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

### FAQ

**Cette intégration engendre-t-elle des frais supplémentaires ?**<br>
Les métriques et les événements générés par cette intégration n'engendrent aucun surcoût.

**Pendant combien de temps les données sont-elles conservées dans Datadog ?**<br>
Tout comme les autres données de séries temporelles, les données issues de cette intégration sont conservées pendant une durée de 15 mois.

**Quel est le délai d'affichage des événements et des métriques sur Datadog ?**<br>
La latence totale dépend de nombreux facteurs. Dans la plupart des cas, les événements et les métriques apparaissent sur Datadog moins de 30 secondes après la survenue d'un incident.

**Comment les événements et les métriques Azure DevOps peuvent-ils être utilisés dans Datadog ?**<br>
Tout comme les autres types de métriques et d'événements dans Datadog, ils peuvent être utilisés pour créer des dashboards, configurer des monitors ou réaliser des opérations de dépannage.

**Comment les métriques liées à la durée d'un build ou d'un élément de travail sont-elles générées ?**<br>
La durée d'une opération de build est calculée à partir des événements _build completed_, en mesurant l'intervalle (en secondes) entre le début et la fin du build.

La durée d'un élément de travail est calculée à partir des événements _work item updated_, en mesurant l'intervalle (en heures) entre la création de l'élément de travail et son passage au statut `Done`.

**Remarque** : en cas de réouverture d'un élément de travail `Done`, un autre point de données est généré lors de son prochain passage au statut `Done`. Le point de données initial n'est pas modifié, et le nouveau point de données est comparé à la création initiale de l'élément de travail.

[1]: https://app.datadoghq.com/account/settings#integrations/azuredevops
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[4]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops
[6]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors
[7]: /fr/monitors/monitor_types/composite/
[8]: https://github.com/DataDog/azure-devops-monitor-gate-extension
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/