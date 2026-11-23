---
aliases:
- /fr/internal_developer_portal/software_catalog/entity_model/custom_entities
description: Définissez des types d'entités personnalisés dans Catalog pour représenter
  des composants uniques à votre organisation, tels que des bibliothèques, des pipelines
  ou des modèles de ML.
disable_toc: false
further_reading:
- link: /internal_developer_portal/catalog/set_up/create_entities
  tag: Documentation
  text: Créez des entités dans Catalog
- link: /internal_developer_portal/catalog/entity_model/native_entities/
  tag: Documentation
  text: En savoir plus sur les types d'entités natifs
title: Entités personnalisées
---
## Présentation {#overview}

À partir de [schema definition v3.0][5]+, vous pouvez définir des types d'entités personnalisés au-delà des [types natifs][6] (tels que service, datastore ou queue). 

Les entités personnalisées vous permettent de représenter tout composant ou ressource important pour votre organisation mais qui ne correspond pas aux catégories standard. Par exemple, vous pourriez créer des types d'entités personnalisés pour des bibliothèques, des pipelines, des modèles de ML ou des composants d'infrastructure.

Consultez GitHub pour les [définitions complètes du schéma][7].

## Créer un type d'entité personnalisé {#create-a-custom-entity-type}

Vous pouvez créer des types d'entités personnalisés dans Datadog ou via l'API Catalog. Après avoir créé le type, vous pouvez ajouter des entités de ce type dans Datadog ou par programmation via les [Catalog APIs][2], [GitHub integration][4], [GitLab integration][9] ou [Terraform module][3].

### Dans Datadog {#in-datadog}

1. Accédez à **APM** > **Catalog**, puis cliquez sur [**Manage**][8].
1. Cliquez sur **Manage Custom Entity Types** pour afficher les types d'entités existants, natifs et personnalisés.

   {{< img src="/tracing/internal_developer_portal/manage-entity-types.png" alt="La fenêtre contextuelle Manage Entity Types, affichant les types natifs et personnalisés existants ainsi qu'un bouton pour créer un type d'entité personnalisé" style="width:100%;" >}}

1. Cliquez sur **Add Custom Entity Type** pour ajouter un type. 

Si vous fermez la fenêtre et sélectionnez **Create New Entry**, votre type personnalisé apparaît dans la liste déroulante `kind` en haut de la fenêtre contextuelle. 

{{< img src="/tracing/internal_developer_portal/custom-type-in-dropdown.png" alt="La fenêtre contextuelle Create New Entry, qui affiche la liste déroulante « kind » incluant les types d'entités personnalisés." style="width:60%;" >}}

### Via l'API {#through-the-api}

Alternativement, définissez vos types personnalisés via la [Catalog API][1].

### Exemple d'entité {#example-entity}

Dans l'exemple suivant, un utilisateur définit une entité de type personnalisé `library` avec des liens, des tags et des équipes propriétaires :

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

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/software-catalog/#create-or-update-kinds
[2]: /fr/api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /fr/integrations/github/
[5]: /fr/internal_developer_portal/catalog/entity_model
[6]: /fr/internal_developer_portal/catalog/entity_model/native_entities
[7]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[8]: https://app.datadoghq.com/software/settings/get-started
[9]: /fr/integrations/gitlab-source-code/