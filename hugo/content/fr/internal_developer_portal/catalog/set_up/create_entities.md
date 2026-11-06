---
aliases:
- /fr/software_catalog/set_up/new_to_datadog
- /fr/tracing/software_catalog/setup
- /fr/software_catalog/setup
- /fr/tracing/service_catalog/setup
- /fr/service_catalog/setup
- /fr/software_catalog/create_entries/
- /fr/software_catalog/enrich_default_catalog/create_entries
- /fr/service_catalog/create_entries/
- /fr/service_catalog/enrich_default_catalog/create_entries
- /fr/api_catalog/add_entries
- /fr/service_catalog/customize/create_entries/
- /fr/software_catalog/customize/create_entries
- /fr/internal_developer_portal/software_catalog/set_up/create_entities
description: Ajoutez des définitions d'entités à Catalog via l'interface utilisateur
  Datadog ou en automatisant les importations avec GitHub, GitLab, Terraform ou la
  Datadog API.
disable_toc: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Site externe
  text: Créer et gérer des définitions de service avec Terraform
- link: /integrations/github
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
- link: /integrations/gitlab-source-code/
  tag: Documentation
  text: Découvrez l'intégration GitLab
- link: /api/latest/service-definition/
  tag: API
  text: En savoir plus sur l'API de définition de service
- link: /api/latest/software-catalog/
  tag: API
  text: En savoir plus sur l'API Catalog
title: Créer des entités
---
## Présentation {#overview}

Pour ajouter des [définitions d'entités][13] à Catalog, vous pouvez :
- Créez manuellement des définitions via l'interface utilisateur Datadog.
- Gérez les définitions dans le code et automatisez l'importation via GitHub, GitLab, Terraform ou la Datadog API.

## Via l'interface utilisateur Datadog {#through-the-datadog-ui}

Catalog fournit un workflow guidé pour la création de définitions d'entités. Après avoir sélectionné un type d'entité dans le menu déroulant **Kind** (Service, API, Système, et autres), le formulaire présente des champs de métadonnées et des options spécifiques à ce type. Par exemple, la sélection de **API** affiche des champs pour le téléchargement d'une spécification OpenAPI ou gRPC, tandis que la sélection de **Service** affiche des champs pour définir le type et le cycle de vie du service.

Pour créer une définition d'entité :

1. Accédez à la page [Catalog Setup & Config][3].
1. Cliquez sur **Create a New Entry**.
1. Sélectionnez le type d'entité dans le menu déroulant **Kind**.
1. Remplissez les champs de métadonnées, tels que la propriété et les liens de référence.
1. (Facultatif) Passez à **YAML** ou **JSON** pour voir le code généré et la commande cURL. Dans les éditeurs de code, Datadog signale automatiquement les données non valides.

   {{< img src="tracing/software_catalog/software_catalog_definition_editor.png" alt="Éditeur de métadonnées de service affichant un exemple de définition de service." >}}

1. Soumettez les métadonnées en cliquant sur **Save Entry** ou en exécutant la commande cURL fournie.

   **Remarque** : Vous devez disposer de l'autorisation [Service Catalog Write permission][2] pour enregistrer l'entrée.


## Par l'automatisation {#through-automation}

Pour automatiser l'importation via GitHub, GitLab, Terraform, le Datadog Software Metadata Provider ou la Datadog Service Definition API :

### Créez la définition d'entité {#create-the-entity-definition}

1. Créez `service.datadog.yaml` ou `entity.datadog.yaml` pour définir votre entité (Datadog accepte les deux noms de fichier).
1. Nommez votre entité dans le champ `dd-service` (schéma version v2.2 ou antérieure) ou `name` (schéma version v3.0+).

   Exemple :

   {{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
    schema-version: v2.2
    dd-service: my-unmonitored-cron-job
    team: e-commerce
    lifecycle: production
    application: shopping-app
    description: important cron job for shopist backend
    tier: "2"
    type: web
    contacts:
    - type: slack
    contact: https://datadogincidents.slack.com/archives/XXXXX
    links:
    - name: Common Operations
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    - name: Disabling Deployments
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    tags: []
    integrations:
    pagerduty:
    service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
    External Resources (Optional)
   {{< /code-block >}}

1. (Facultatif) Enregistrez plusieurs services dans un seul fichier YAML en séparant chaque définition par trois tirets (`---`).

### Importez la définition {#import-the-definition}

Importez la définition de l'une des manières suivantes :

1. **Terraform** : Créez et importez la définition en tant que [ressource Terraform][4]. 
   
   **Remarque** : La création et la gestion de services dans le Catalogue via des pipelines automatisés nécessitent le [Datadog Provider][5] v3.16.0 ou une version ultérieure.

1. **API Datadog** : Importez votre définition à l'aide de la [Service Definition API][7] (pour le schéma v2.x) ou de la [Catalog API][8] (pour le schéma v3+), qui sont toutes deux des solutions GitHub Actions open source.
1. **GitHub ou GitLab** : Configurez l'intégration GitHub[9] ou l'intégration GitLab[14] pour gérer et importer vos définitions.

#### Intégrations GitHub et GitLab {#github-and-gitlab-integrations}

Configurez l'intégration GitHub[9] ou l'intégration GitLab[14] pour importer des définitions d'entité depuis vos dépôts. Datadog recherche les fichiers `service.datadog.yaml` et `entity.datadog.yaml` dans chaque dépôt disposant d'autorisations de lecture.

Une fois que vous avez mis à jour les fichiers YAML de vos dépôts, vos modifications sont propagées au Catalogue. Vous pouvez enregistrer plusieurs services dans un seul fichier YAML en créant plusieurs documents YAML. Séparez chaque document par trois tirets (`---`).

Pour éviter tout écrasement accidentel, créez et modifiez vos fichiers de définition avec une intégration de code source (GitHub ou GitLab) ou les [Definition API endpoints][11]. La mise à jour d'un même service en utilisant à la fois une intégration de code source et l'API peut entraîner un écrasement involontaire.

##### Intégration GitHub {#github-integration}

Pour installer l'intégration GitHub :
1. Accédez à la [tuile d'intégration][10].
2. Cliquez sur **Lier un compte GitHub** dans l'onglet **Configuration du dépôt**.

Lorsque l'intégration GitHub est configurée pour vos définitions, un bouton **Modifier dans GitHub** apparaît dans l'onglet **Définition** du service et vous redirige vers GitHub pour valider les modifications.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Un bouton Modifier dans GitHub apparaît dans l'onglet Définition d'un service dans le Catalogue" style="width:90%;" >}}

##### Intégration GitLab {#gitlab-integration}

Pour connecter vos dépôts GitLab, suivez les instructions de configuration de l'[intégration GitLab][14], disponibles dans la [tuile d'intégration GitLab][15]. Stockez vos fichiers `service.datadog.yaml` ou `entity.datadog.yaml` dans un dépôt que Datadog est autorisé à lire.

##### Validation de l'intégration {#integration-validation}

Pour valider vos définitions de service ingérées par l'intégration GitHub de Datadog, vous pouvez consulter les événements lorsque les services sont mis à jour ou lorsqu'une erreur survient. Pour afficher les erreurs de validation dans [Event Management][12], filtrez par `source:software_catalog` et `status:error`. Ajustez la période selon vos besoins.

{{< img src="tracing/software_catalog/github_error_event.png" alt="Événement GitHub affichant un message d'erreur provenant de la définition du service." >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/internal_developer_portal/catalog/set_up#configure-role-based-access-and-permissions
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /fr/api/latest/service-definition/
[8]: /fr/api/latest/software-catalog/
[9]: /fr/integrations/github/
[10]: https://app.datadoghq.com/integrations/github
[11]: /fr/api/latest/software-catalog/#create-or-update-entities
[12]: https://app.datadoghq.com/event/explorer
[13]: /fr/internal_developer_portal/catalog/entity_model
[14]: /fr/integrations/gitlab-source-code/
[15]: https://app.datadoghq.com/integrations/gitlab-source-code/