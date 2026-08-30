---
description: Apprenez à remapper la valeur d'attributs de log réservés, tels que host,
  source et service, avec le processeur Edit Fields ou Custom Processor dans Observability
  Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/edit_fields/
  tag: Documentation
  text: En savoir plus sur le processeur Edit Fields
- link: /observability_pipelines/processors/custom_processor/
  tag: Documentation
  text: En savoir plus sur le processeur Custom Processor
title: Remapper les attributs réservés
---
## Présentation {#overview}

Les processeurs d'Observability Pipelines vous permettent d'ajouter, de modifier et de supprimer des champs de log. Le remappage des attributs ou la réécriture des valeurs garantit que vos logs sont traités et standardisés correctement. Pour la majorité des cas d'utilisation de traitement, utilisez le processeur Edit Fields pour ajouter, remapper ou supprimer des champs de vos logs. Pour les cas d'utilisation avancés, utilisez le Custom Processor pour modifier conditionnellement des champs ou réécrire la valeur d'un champ.

Dans Datadog, les [attributs réservés][1] sont des champs de log mis de côté pour un traitement spécifique dans la plateforme. Les attributs réservés incluent ` host`, `source`, `status`, `service`, `trace_id` et `message`. Les attributs réservés sont appliqués lors de l'acheminement des logs vers les destinations Observability Pipelines suivantes :

- Datadog Logs
- Amazon S3 (pour les archives de logs)
- Azure Blob Storage (pour les archives de logs)
- Google Cloud Storage (pour les archives de logs)

Il existe des restrictions dans Observability Pipelines sur la façon dont vous pouvez modifier les attributs réservés. Par exemple, les attributs réservés ne peuvent pas être renommés à l'aide du processeur Rename Field, mais doivent être remappés à la place. Ce guide vous accompagne dans les étapes de remappage de la valeur des attributs réservés.

Si votre configuration spécifique utilise une source Splunk HEC et une destination Datadog, consultez [Remappez les attributs de source et de service lors de l'utilisation de la source Splunk HEC et de la destination Datadog](#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination).

## Remappez la valeur des attributs réservés {#remap-the-value-of-reserved-attributes}

Pour modifier ou remplacer la valeur d'un champ d'attribut réservé existant, Datadog recommande deux approches utilisant Observability Pipelines. La première utilise le processeur Edit Fields, et la seconde utilise le processeur Custom Processor.

### Utilisez le processeur Edit Fields pour des attributions de champs de base {#use-an-edit-fields-processor-for-basic-field-assignments}

1. Utilisez un processeur {{< ui >}}Remove field{{< /ui >}} pour supprimer l'attribut réservé du log.
2. Utilisez un processeur {{< ui >}}Add field{{< /ui >}} pour réintroduire l'attribut réservé dans le log avec le nom de champ et l'attribution de valeur corrects.

**Remarque** : En ce qui concerne l'ordre des processeurs, le processeur {{< ui >}}Add Field{{< /ui >}} doit être placé immédiatement après le processeur {{< ui >}}Remove Field{{< /ui >}} pour garantir un remappage correct des champs.

#### Exemple {#example}
L'image du processeur {{< ui >}}Remove field{{< /ui >}} ci-dessous supprime le champ `service` mal nommé du log.

{{< img src="observability_pipelines/guide/remap_attributes/remove_field_remap.png" alt="Un processeur de suppression de champ qui supprime le tag service et un processeur d'ajout de champ qui ajoute le champ service avec la valeur payment-app" style="width:50%;" >}}

L'image du processeur {{< ui >}}Add field{{< /ui >}} ci-dessous réinsère le champ `service` avec la valeur correcte.

{{< img src="observability_pipelines/guide/remap_attributes/add_field_remap.png" alt="Un processeur de suppression de champ qui supprime le tag service et un processeur d'ajout de champ qui ajoute le champ service avec la valeur payment-app" style="width:50%;" >}}

### Utilisez le Custom Processor pour des attributions dynamiques ou manuelles {#use-the-custom-processor-for-dynamic-or-manual-assignments}

Utilisez le {{< ui >}}Custom Processor{{< /ui >}} pour réécrire la valeur de l'attribut réservé.

#### Attribuez dynamiquement la valeur en utilisant la syntaxe de modèle pour référencer la valeur d'un autre champ. {#dynamically-assign-the-value-using-template-syntax-to-reference-another-fields-value}

Le script du Custom Processor suivant réécrit le champ `service` et attribue dynamiquement la valeur de `app_id` à la valeur du champ `service`.

```
.service = {{.app_id}}
```

Dans l'image d'exemple ci-dessous, l'entrée montre `service` avec la valeur `wrongstatus`. Après le traitement du log avec le script, la sortie montre `service` avec la valeur `streaming-service`, qui est la valeur de `app_id`.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_dynamically_assign.png" alt="Un processeur personnalisé montrant en entrée la valeur de statut incorrecte et en sortie le statut correct" style="width:100%;" >}}

#### Réécrivez manuellement la valeur d'un attribut avec un nom statique {#manually-rewrite-the-value-of-an-attribute-with-a-static-name}

Le script du Custom Processor suivant définit le champ `status` sur la valeur statique `info`.

```
.status = "info"
```

Dans l'image d'exemple ci-dessous, l'entrée montre `status` avec la valeur `wrongstatus`. Après le traitement du log avec le script, la sortie montre `status` avec `info` comme attribué.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_statically_assign.png" alt="Un processeur personnalisé montrant en entrée la valeur de statut incorrecte et en sortie le statut correct" style="width:100%;" >}}

## Remappez les attributs de source et de service lors de l'utilisation de la source Splunk HEC et de la destination Datadog {#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination}

Suivez les instructions de cette section pour remapper les valeurs `source` et/ou `service` si vous utilisez une source Splunk HEC et une destination Datadog. Vous devez suivre ces instructions pour remapper ces attributs :

 - Le `service` de Splunk est ce que Datadog appelle l'attribut `source`.
 - Le `sourcetype` de Splunk est ce que Datadog appelle l'attribut `ddsource`.

**Remarque** : Si vous souhaitez remapper d'autres attributs réservés, tels que `env` et `hostname`, suivez les instructions [Remappez la valeur des attributs réservés](#remap-the-value-of-reserved-attributes).

Vous pouvez utiliser le [Custom Processor](#remap-service-and-source-attributes-using-the-custom-processor) ou [Edit Fields](#remap-service-and-source-attributes-using-edit-fields) pour :

1. Remappez le champ `service` du log d'entrée sur le nom de champ `source`.
1. Remappez le champ `source` du log d'entrée sur le nom de champ `ddsource`.

### Remappez les attributs de service et de source à l'aide du Custom Processor {#remap-service-and-source-attributes-using-the-custom-processor}

Voici un exemple de log d'entrée provenant de la source Splunk HEC :

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Supposons qu'il s'agisse des valeurs correctes que vous souhaitez pour le log envoyé à Datadog :

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}

Use this Custom Processor script to remap the `service` and `source` to the correct values:

```json
  .source = "cdn-logs"
  .ddsource = "akamai"
  del(.service)
```

Après le traitement du log avec le script, la sortie affiche :

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

Dans l'image d'exemple ci-dessous, l'entrée affiche `source` et `service` avec la valeur `wrongstatus`. Après le traitement du log avec le script, les valeurs correctes sont affichées.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_splunkhec_dd.png" alt="Un processeur personnalisé montrant en entrée la valeur de statut incorrecte et en sortie le statut correct" style="width:100%;" >}}

### Remappez les attributs de service et de source à l'aide d'Edit Fields {#remap-service-and-source-attributes-using-edit-fields}

Voici un exemple de log d'entrée provenant de la source Splunk HEC :

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Supposons qu'il s'agisse des valeurs correctes que vous souhaitez pour le log envoyé à Datadog :

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

Effectuez les opérations suivantes pour remapper les attributs `source` et `service` sur les valeurs correctes :

1. Utilisez un processeur {{< ui >}}Remove field{{< /ui >}} pour supprimer le champ `source`.
    - Saisissez `source` dans le champ {{< ui >}}Field to drop{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_source.png" alt="Un processeur de suppression de champ qui supprime le champ source" style="width:50%;" >}}
1. Utilisez un processeur {{< ui >}}Add field{{< /ui >}} pour ajouter le champ `ddsource` avec la valeur `akamai`.
    - Saisissez `ddsource` dans le champ {{< ui >}}Field to add{{< /ui >}}.
    - Saisissez `akamai` dans le champ {{< ui >}}Value to add{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_ddsource.png" alt="Un processeur d'ajout de champ qui ajoute le champ ddsource" style="width:50%;" >}}
1. Utilisez un processeur {{< ui >}}Remove field{{< /ui >}} pour supprimer le champ `service`.
    - Saisissez `service` dans le champ {{< ui >}}Field to drop{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_service.png" alt="Un processeur de suppression de champ qui supprime le champ service" style="width:50%;" >}}
1. Utilisez un processeur {{< ui >}}Add field{{< /ui >}} pour ajouter le champ `source` avec la valeur `cdn-logs`.
    - Saisissez `source` dans le champ {{< ui >}}Field to add{{< /ui >}}.
    - Saisissez `cdn-logs` dans le champ {{< ui >}}Value to add{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_source.png" alt="Un processeur d'ajout de champ qui ajoute le champ ddsource" style="width:50%;" >}}


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes