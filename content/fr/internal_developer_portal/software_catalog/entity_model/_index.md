---
algolia:
  tags:
  - codeLocations
aliases:
- /fr/software_catalog/service_definitions/
- /fr/software_catalog/adding_metadata
- /fr/tracing/software_catalog/service_metadata_structure
- /fr/tracing/software_catalog/adding_metadata
- /fr/software_catalog/add_metadata
- /fr/service_catalog/adding_metadata
- /fr/tracing/service_catalog/service_metadata_structure
- /fr/tracing/service_catalog/adding_metadata
- /fr/service_catalog/add_metadata
- /fr/service_catalog/service_definitions
- /fr/service_catalog/service_definitions/v2-0
- /fr/software_catalog/service_definitions/v2-0
- /fr/service_catalog/service_definitions/v2-1
- /fr/software_catalog/service_definitions/v2-1
- /fr/service_catalog/service_definitions/v2-2
- /fr/software_catalog/service_definitions/v2-2
- /fr/service_catalog/service_definitions/v3-0
- /fr/software_catalog/service_definitions/v3-0
- /fr/software_catalog/apis
- /fr/tracing/faq/service_definition_api/
- /fr/tracing/software_catalog/service_definition_api
- /fr/software_catalog/service_definition_api
- /fr/tracing/service_catalog/service_definition_api
- /fr/service_catalog/service_definition_api
- /fr/tracing/api_catalog/api_catalog_api/
- /fr/api_catalog/api_catalog_api
- /fr/service_catalog/apis
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Site externe
  text: Créez et gérez des définitions avec Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Découvrez l'API de définition
- link: /integrations/github
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: Blog
  text: Importez des fichiers YAML Backstage dans Datadog
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: Blog
  text: Améliorez l'expérience des développeurs et la collaboration avec la version
    3.0 du schéma du catalogue de services
- link: https://www.datadoghq.com/blog/software-catalog-custom-entities/
  tag: Blog
  text: Modélisez votre architecture avec des entités personnalisées dans le catalogue
    de logiciels Datadog
title: Modèle d'entité
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le schéma du modèle d'entité v3.0 n'est pas disponible sur le site sélectionné pour le moment.</div>

{{< /site-region >}}

## Aperçu {#overview}

Le catalogue de logiciels utilise des schémas de définition pour stocker et afficher des métadonnées pertinentes sur vos entités. Les schémas ont des règles de validation intégrées pour garantir que seules des valeurs valides sont acceptées. Vous pouvez consulter les avertissements dans l'onglet **Définition** du panneau latéral du catalogue de logiciels pour tous les services sélectionnés.

{{< img src="/tracing/internal_developer_portal/entity-model-flow-chart.png" alt="Un organigramme montrant comment les composants du catalogue de logiciels se connectent entre eux et à votre environnement cloud " style="width:100%;" >}}

## Versions prises en charge {#supported-versions}

Datadog prend en charge quatre versions du schéma de définition :

- **v3.0** : Dernière version avec un modèle de données élargi, un support de multi-propriété, une déclaration manuelle des dépendances et des fonctionnalités améliorées pour une infrastructure complexe.
- **v2.2** : Prend en charge les annotations des utilisateurs pour des métadonnées personnalisées et des associations de pipeline CI pour lier les services à leurs processus de construction.
- **v2.1** : Prend en charge les regroupements de services pour une meilleure organisation et introduit des champs supplémentaires pour des descriptions de services plus complètes.
- **v2** : Première version prise en charge, fournissant des champs essentiels pour des métadonnées de service de base et de la documentation.

Chaque version s'appuie sur la précédente, ajoutant de nouvelles fonctionnalités tout en assurant une rétrocompatibilité. Choisissez la version qui correspond le mieux à vos besoins et à la complexité de votre infrastructure.

## Comparaison des versions {#version-comparison}

Les fonctionnalités suivantes sont prises en charge dans chaque version :

| Fonctionnalité                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Métadonnées de base                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Regroupements de services             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| Annotations utilisateur              | {{< X >}}   | {{< X >}} |           |           |
| Associations de pipeline CI         | {{< X >}}   | {{< X >}} |           |           |
| Modèle de données étendu           | {{< X >}}   |           |           |           |
| Propriété multiple               | {{< X >}}   |           |           |           |
| Déclaration manuelle de dépendance | {{< X >}}   |           |           |           |

Pour des informations détaillées sur chaque version, y compris les schémas complets et des exemples de fichiers YAML, consultez les pages des versions individuelles dans [Versions prises en charge](#supported-versions).

## Détails de la version {#version-details}

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Optez pour l'aperçu de la dernière version du catalogue de logiciels." >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

### Fonctionnalités clés {#key-features}
- **Modèle de données étendu** : v3.0 prend en charge plusieurs types d'entités. Vous pouvez organiser vos systèmes en utilisant divers composants tels que des systèmes, des services, des files d'attente et des magasins de données.
- **Propriété multiple** : Vous pouvez attribuer plusieurs propriétaires à tout objet défini par le schéma v3.0 pour spécifier plusieurs points de contact.
- **Cartographie des relations améliorée** : Avec les données APM et USM, vous pouvez détecter automatiquement les dépendances entre les composants. La version v3.0 prend en charge la déclaration manuelle pour compléter la topologie système détectée automatiquement afin d'assurer une vue d'ensemble complète de la manière dont les composants interagissent au sein de vos systèmes.
- **Héritage des métadonnées système** : Les composants au sein d'un système héritent automatiquement des métadonnées du système. Il n'est plus nécessaire de déclarer les métadonnées pour tous les composants associés un par un comme dans les versions v2.1 et v2.2.
- **Emplacement de code précis** : Ajoutez la cartographie de l'emplacement de votre code pour votre service. La section `codeLocations` dans la version v3.0 spécifie les emplacements du code avec le dépôt qui contient le code et son `paths` associé. L'attribut `paths` est une liste de [globs][4] qui doit correspondre aux chemins dans le dépôt.
- **Journaux et événements filtrés** : Déclarez les journaux sauvegardés et les requêtes d'événements pour un `system` à travers les sections `logs` et `events` et visualisez les résultats sur la page Système.
- **Entités personnalisées** : Définissez des types d'entités personnalisées au-delà de Service, Système, Magasin de données, File d'attente et API. Ciblez les fiches d'évaluation et les actions pour des types d'entités spécifiques.
- **(À venir) Intégrations** : Intégrez des outils tiers pour obtenir dynamiquement des informations liées à vos composants (par exemple, des demandes de tirage GitHub, des incidents PagerDuty et des pipelines GitLab). Générez des rapports et rédigez des règles de fiche d'évaluation pour toute source tierce.
- **(À venir) Regrouper par produit ou domaine** : Organisez les composants par produit, ce qui permet plusieurs niveaux de regroupement hiérarchique.

### Structure du schéma {#schema-structure}

Vous pouvez voir les [définitions complètes du schéma sur Github][1].

La version v3.0 contient les changements suivants par rapport à la version v2.2 :
- `schema_version` est maintenant `apiVersion`
Le champ - `kind` est nouveau et définit le type de composant : service, file d'attente, magasin de données, système ou API.
- `dd-service` est maintenant `metadata.name`
- `team` est maintenant `owner` et `additionalOwners` s'il y a plusieurs équipes
- `lifecycle`, `tier`, `languages` et `type` sont maintenant sous `spec`
- `links`, `contacts`, `description` et `tags` sont maintenant sous les métadonnées
- `application` a été amélioré pour devenir son propre type : `system`. Il n'existe plus en tant que champ distinct sur un service.

### Exemples de fichiers YAML {#example-yaml-files}

{{% collapse-content title="Composant de <code>kind:system</code>" level="h4" expanded=false id="id-for-anchoring" %}}
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: myapp
  displayName: My App
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
integrations:
  pagerduty:
    serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
  opsgenie:
    serviceURL: https://www.opsgenie.com/service/shopping-cart
    region: US
spec:
  components:
    - service:myservice
    - service:otherservice
extensions:
  datadoghq.com/shopping-cart:
    customField: customValue
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
  events:
    - name: "deployment events"
      query: "app:myapp AND type:github"
    - name: "event type B"
      query: "app:myapp AND type:github"
  logs:
    - name: "critical logs"
      query: "app:myapp AND type:github"
    - name: "ops logs"
      query: "app:myapp AND type:github"
  pipelines:
    fingerprints:
      - fp1
      - fp2
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Composant de <code>kind:library</code>" level="h4" expanded=false id="id-for-anchoring" %}}
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: library
metadata:
  name: my-library
  displayName: My Library
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Composants qui font partie de plusieurs systèmes" level="h4" expanded=false id="id-for-anchoring" %}}
Si un seul composant fait partie de plusieurs systèmes, vous devez spécifier ce composant dans le YAML pour chaque système. Par exemple, si le magasin de données `orders-postgres` est un composant à la fois d'une flotte postgres et d'une application web, spécifiez deux fichiers YAML :

Pour la flotte postgres (`managed-postgres`), spécifiez une définition pour `kind:system` :
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
spec:
  components:
    - datastore:orders-postgres
    - datastore:foo-postgres
    - datastore:bar-postgres
metadata:
  name: managed-postgres
  owner: db-team
{{< /code-block >}}

Pour l'application web (`shopping-cart`), déclarez une définition séparée pour `kind:system` :
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}

apiVersion: v3
kind: system
spec:
  lifecycle: production
  tier: critical
  components:
    - service:shopping-cart-api
    - service:shopping-cart-processor
    - queue:orders-queue
    - datastore:orders-postgres
metadata:
  name: shopping-cart
  owner: shopping-team
  additionalOwners:
    - name: sre-team
      type: operator
---
apiVersion: v3
kind: datastore
metadata:
  name: orders-postgres
  additionalOwners:
    - name: db-team
      type: operator
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-api
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-processor
---
{{< /code-block >}}
{{% /collapse-content %}}

### Héritage explicite et implicite des métadonnées {#explicit-and-implicit-metadata-inheritance}

#### Héritage explicite {#explicit-inheritance}

Le champ `inheritFrom` indique au pipeline d'ingestion d'hériter des métadonnées de l'entité référencée par `<entity_kind>:<name>`.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### Héritage implicite {#implicit-inheritance}
Les composants (`kind:service`, `kind:datastore`, `kind:queue`, `kind:ui`) héritent de toutes les métadonnées du système auquel ils appartiennent sous les conditions suivantes :
- Il n'y a qu'un seul système défini dans le fichier YAML.
- La clause `inheritFrom:<entity_kind>:<name>` est absente dans le fichier YAML.

### Migration vers v3.0 {#migrating-to-v30}
v3.0 prend en charge les mêmes méthodes de création de métadonnées que les versions précédentes, y compris Github, API, Terraform, Backstage, ServiceNow et l'interface utilisateur. Cependant, il existe de nouveaux [points de terminaison API][5] et une nouvelle [ressource Terraform][6] pour v3.0.

### Documentation de référence API {#api-reference-documentation}
Pour créer, obtenir et supprimer des définitions pour tous les types d'entités comme les points de terminaison, les systèmes, les magasins de données et les files d'attente, consultez la [documentation de référence de l'API du catalogue logiciel][8].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[2]: https://github.com/DataDog/schema/tree/main/service-catalog
[3]: /fr/code_analysis/faq/#identifying-the-code-location-in-the-service-catalog
[4]: https://en.wikipedia.org/wiki/Glob_(programming)
[5]: /fr/api/latest/software-catalog/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[7]: software_catalog/customize/import_entries_backstage
[8]: /fr/api/latest/software-catalog/

{{% /tab %}}

{{% tab "v2.2" %}}

### Fonctionnalités clés {#key-features-1}
- Annotations utilisateur
- Écrasement du type de service et des langues détectés automatiquement en utilisant `type` et `languages`
- Associer un pipeline CI à un service en utilisant `ci-pipeline-fingerprints`
- Logique de validation moins restrictive pour `contact.type` et `link.type`

### Structure du schéma {#schema-structure-1}

Le [schéma complet est disponible sur GitHub][1].

Exemple YAML :

```yaml
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
```

### Documentation de référence API {#api-reference-documentation-1}

- Pour créer, obtenir et supprimer des définitions de service, consultez la [documentation de référence de l'API des définitions de service][4].
- Pour créer, obtenir et supprimer des définitions pour de nouveaux types de composants comme les systèmes, les magasins de données et les files d'attente, consultez la [documentation de référence de l'API du catalogue logiciel][3].
- Pour créer et mettre à jour des règles et des résultats de tableau de bord de service, consultez la [documentation de référence de l'API des tableaux de bord de service][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /fr/api/latest/service-scorecards/
[3]: /fr/api/latest/software-catalog/
[4]: /fr/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### Fonctionnalités clés {#key-features-2}
- Nouveaux éléments d'interface utilisateur tels que les regroupements de services et les champs pour `application`, `tier` et `lifecycle`
- `Application` et `Teams` peuvent être utilisés comme variables de regroupement dans le catalogue logiciel.
Le champ - `Lifecycle` indique le stade de développement pour différencier entre les services `production`, `experimental` ou `deprecated`.
Le champ - `Tier` indique la criticité du service pour la priorisation lors du triage des incidents.

### Structure du schéma {#schema-structure-2}

Le [schéma complet est disponible sur GitHub][1].

Exemple YAML :

```yaml
schema-version: v2.1
dd-service: delivery-state-machine
team: serverless
application: delivery-state-machine
tier: tier0
lifecycle: production
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist-serverless/tree/main/delivery-state-machine
    type: repo
  - name: Deployment
    provider: github
    url: https://github.com/DataDog/shopist-serverless/blob/main/delivery-state-machine/serverless.yml
    type: repo
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
    type: doc
tags:
  - "app:serverless-delivery"
  - "tier:3"
  - "business-unit:operations"
```

### Documentation de référence API {#api-reference-documentation-2}

- Pour créer, obtenir et supprimer des définitions de service, consultez la [documentation de référence de l'API des définitions de service][4].
- Pour créer, obtenir et supprimer des définitions pour de nouveaux types de composants comme les systèmes, les magasins de données et les files d'attente, consultez la [documentation de référence de l'API du catalogue logiciel][3].
- Pour créer et mettre à jour des règles et des résultats de tableau de bord de service, consultez la [documentation de référence de l'API des tableaux de bord de service][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.1
[2]: /fr/api/latest/service-scorecards/
[3]: /fr/api/latest/software-catalog/
[4]: /fr/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.0" %}}

### Fonctionnalités clés {#key-features-3}
- Métadonnées de service de base
- Associations d'équipe
- Informations de contact
- Liens externes

### Structure du schéma {#schema-structure-3}

Le [schéma complet est disponible sur GitHub][1].

Exemple YAML :

```yaml
schema-version: v2
dd-service: delivery-api
team: distribution-management
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
repos:
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
docs:
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
  pagerduty: https://datadog.pagerduty.com/service-directory/PXZNFXP
```

### Documentation de référence API {#api-reference-documentation-3}

- Pour créer, obtenir et supprimer des définitions de service, consultez la [documentation de référence de l'API des définitions de service][4].
- Pour créer, obtenir et supprimer des définitions pour de nouveaux types de composants comme les systèmes, les magasins de données et les files d'attente, consultez la [documentation de référence de l'API du catalogue logiciel][3].
- Pour créer et mettre à jour des règles et des résultats de tableau de bord de service, consultez la [documentation de référence de l'API des tableaux de bord de service][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /fr/api/latest/service-scorecards/
[3]: /fr/api/latest/software-catalog/
[4]: /fr/api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## Construire des extensions personnalisées {#build-custom-extensions}

<div class="alert alert-info">Les extensions personnalisées sont en disponibilité limitée pour toutes les versions de schéma.</div>

Les extensions personnalisées vous permettent d'attacher des métadonnées spécifiques à l'organisation aux entités, permettant ainsi le support d'outils et de flux de travail personnalisés. Par exemple, utilisez le champ `extensions` pour inclure des notes de version, des balises de conformité ou des modèles de propriété dans vos définitions d'entités.

Datadog prend également en charge des clés d'extension spécifiques pour certaines fonctionnalités. Celles-ci incluent :
- `datadoghq.com/dora-metrics` : Définir des modèles de chemin de code source pour filtrer les commits Git lors du calcul des [métriques DORA][21].
- `datadoghq.com/cd-visibility` : Contrôler quels commits sont considérés comme faisant partie d'un déploiement dans [CD Visibility][22].

L'exemple suivant définit une extension personnalisée utilisée pour gérer la planification des versions à travers les environnements :
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: payment-platform
  displayName: "Payment Platform"
  links:
    - name: Runbook
      type: runbook
      url: https://runbook/payment-platform
  contacts:
    - name: Payment Team
      type: team
      contact: https://www.slack.com/archives/payments
  owner: payments-team
  additionalOwners:
    - name: finance-team
      type: stakeholder
spec:
  components:
    - service:payment-api
    - queue:payment-requests
    - datastore:payment-db
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "ci-tool://shopist/k8s/staging-deploy"
          branch: "main"
          schedule: "0 9 * * 1"
{{< /code-block >}}


## Validation de schéma via le plugin IDE {#schema-validation-through-ide-plugin}

Datadog fournit un [schéma JSON][18] pour les définitions afin que lorsque vous éditez une définition dans un [IDE supporté][19], des fonctionnalités telles que l'autocomplétion et la validation soient fournies.

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode identifie le problème à résoudre" style="width:100%;" >}}

Le [schéma JSON pour les définitions Datadog][20] est enregistré auprès de l'[open source Schema Store][19].


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://app.datadoghq.com/services
[6]: /fr/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /fr/tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /fr/api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[18]: http://json-schema.org/
[19]: https://www.schemastore.org
[20]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[21]: /fr/dora_metrics/setup/#handling-multiple-services-in-the-same-repository
[22]: /fr/continuous_delivery/features/code_changes_detection?tab=github#specify-service-file-path-patterns