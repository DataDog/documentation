---
beta: true
categories:
  - azure
  - source control
  - collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure DevOps.
doc_link: 'https://docs.datadoghq.com/integrations/azure_devops'
git_integration_title: azure_devops
has_logo: true
integration_title: Microsoft Azure DevOps
is_public: false
kind: integration
manifest_version: 1
name: azure_devops
public_title: Intégration Datadog/Microsoft Azure DevOps
short_description: Surveillez des métriques clés d'Azure DevOps.
version: 1
---
## Présentation

Intégrez Datadog à Azure DevOps pour :

* Suivre les pull requests et les merges effectuées sur vos différents projets
* Visualiser les publications de version et les opérations de build dans le contexte des autres données de votre pile
* Suivre le temps passé à terminer un build ou un élément de travail
* Gérer les éléments de travail et les mises à jour

<div class="alert alert-warning">
L'intégration Azure DevOps est en version bêta publique.
</div>

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1].

### Configuration

Utilisez un hook de service pour créer des événements et des métriques Datadog en réponse aux événements Azure DevOps Services :

1. Dans Datadog, cliquez sur le bouton d'installation visible sur le [carré d'intégration Azure DevOps][7].
2. Dans Azure, accédez à la page des hooks de service pour votre projet.
3. Cliquez sur **Créer un abonnement**.
4. Sélectionnez le service Datadog.
5. Configurez l'événement déclencheur Visual Studio.
6. Saisissez votre [clé d'API Datadog][4] dans le champ adéquat.
7. Indiquez si vous utilisez un compte Datadog américain ou européen.
8. Testez l'abonnement de votre hook de service, puis terminez la configuration.
9. Répétez les étapes 4 à 7 pour chaque type d'événement que vous souhaitez envoyer à Datadog. Tous les types d'événement sont acceptés.

Une fois vos hooks de service configurés, accédez à Datadog pour visualiser les événements et les métriques d'Azure DevOps.

Documentation de référence Azure supplémentaire : [Créer un hook de service pour Azure DevOps Services et TFS avec Datadog][6] (en anglais)

#### Créer un hook de service par programmation

Pour créer des abonnements de hook de service par programmation, utilisez la [documentation Azure][5] et l'endpoint de Datadog :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```
https://app.datadoghq.com/intake/webhook/azuredevops?api_key=<CLÉ_API_DATADOG>
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```
https://app.datadoghq.eu/intake/webhook/azuredevops?api_key=<CLÉ_API_DATADOG>
```

{{% /tab %}}
{{< /tabs >}}

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_devops" >}}


### Événements

L'intégration Azure DevOps accepte tous les types d'événements Azure DevOps.

### Checks de service

L'intégration Azure DevOps n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

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
La durée d'une opération de build est calculée à partir des événements *build completed*, en mesurant l'intervalle (en secondes) entre le début et la fin du build.

La durée d'un élément de travail est calculée à partir des événements *work item updated*, en mesurant l'intervalle (en heures) entre la création de l'élément de travail et son passage au statut `Done`.

**Remarque** : en cas de réouverture d'un élément de travail `Done`, un autre point de données est généré lors de son prochain passage au statut `Done`. Le point de données initial n'est pas modifié, et le nouveau point de données est comparé à la création initiale de l'élément de travail.


[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[6]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[7]: https://app.datadoghq.com/account/settings#integrations/azuredevops


{{< get-dependencies >}}