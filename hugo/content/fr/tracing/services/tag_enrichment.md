---
description: Enrichissez automatiquement la télémétrie avec des tags d'équipe et de
  système provenant des définitions de service du Catalogue sans redéployer de code.
further_reading:
- link: /tracing/services/service_remapping_rules
  tag: Documentation
  text: Règles Service Remapping
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Catalog
title: Enrichissement de tags
---
{{< callout url="https://www.datadoghq.com/product-preview/tag-enrichment/" >}}
L'enrichissement de tags est en préversion. Pour demander l'accès, remplissez ce formulaire.
{{< /callout >}}

## Présentation {#overview}

Utilisez des règles d'enrichissement de tags pour ajouter des tags à vos logs, spans APM et métriques de trace sans modification de code ni redéploiement. Vous pouvez utiliser des valeurs provenant des métadonnées de service que vous avez déjà définies dans le Catalogue, la valeur d'un autre tag ou une valeur fixe.

## Prérequis {#prerequisites}

Vous devez disposer du rôle Datadog Admin pour créer des règles d'enrichissement de tags. Consultez [Contrôle d'accès basé sur les rôles][2] pour plus de détails.

## Créer une règle d'enrichissement de tags {#create-a-tag-enrichment-rule}

### Règles d'enrichissement de tags par défaut {#default-tag-enrichment-rules}

Pour activer une règle par défaut, accédez à {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] et activez la règle par défaut pour `team` ou `system` en bas de la page.

{{< img src="tracing/services/tag_enrichment/tag-enrichment-landing.png" alt="La page Enrichissement de tags affichant le panneau Règles suggérées, avec des options pour créer des règles d'enrichissement pour les tags système et d'équipe pour tous les services." >}}

L'activation d'une règle par défaut applique `team` ou `system` à toute la télémétrie des services basée sur les métadonnées d'entité définies dans l'IDP. Seuls les services dont les métadonnées d'entité sont renseignées sont enrichis. Les tags sont ajoutés uniquement lorsque la télémétrie du service ne possède pas déjà une valeur pour ce tag.

### Règles d'enrichissement de tags personnalisées {#custom-tag-enrichment-rules}

Les règles personnalisées vous permettent de cibler un ensemble spécifique de services et de configurer exactement comment chaque valeur de tag est sourcée et appliquée.

1. Dans Datadog, accédez à {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] et cliquez sur {{< ui >}}\+ Add Rule{{< /ui >}}.
1. Sélectionnez les entités à enrichir. À mesure que vous sélectionnez des entités, une requête est générée en arrière-plan. Pour modifier la requête, sélectionnez {{< ui >}}Build Advanced Query{{< /ui >}}.
   {{< img src="tracing/services/tag_enrichment/tag-enrichment-adv-query.png" alt="La fenêtre modale Ajouter une règle d'enrichissement de tag IDP avec l'onglet Créer une requête avancée sélectionné, affichant les champs pour la clé de tag, l'opérateur et la valeur, avec une option Ajouter une condition." >}}
   - Sélectionnez {{< ui >}}Add Condition{{< /ui >}} pour ajouter une condition `AND` à votre requête.
   - Ajoutez plusieurs valeurs dans le champ {{< ui >}}Value{{< /ui >}} pour créer une condition `OR`.
1. Choisissez les tags et les méthodes d'enrichissement :
   - Sélectionnez le tag `team`, le tag `system`, le tag `custom`, ou plusieurs.
   - Pour chaque tag, sélectionnez si la valeur du tag provient des métadonnées d'entité, de la valeur d'un tag différent ou d'une valeur fixe.
   - Choisissez si la valeur est appliquée uniquement lorsqu'elle n'existe pas déjà, ou si elle est ajoutée à la liste actuelle de valeurs pour ce tag.
1. Par défaut, les tags sont ajoutés uniquement lorsqu'une valeur est absente pour un élément de télémétrie donné.
1. Optionnellement, saisissez un nom descriptif pour la règle.
1. Examinez et enregistrez votre règle. Une fois la règle enregistrée, l'enrichissement peut prendre jusqu'à une heure pour être entièrement appliqué à la télémétrie entrante.

### Ajouter une règle d'enrichissement de tag depuis une page de service {#add-a-tag-enrichment-rule-from-a-service-page}

Sur toute page de service à laquelle il manque un tag `team` ou `system`, cliquez sur {{< ui >}}Service Config{{< /ui >}} pour ouvrir le panneau latéral de configuration. Une bannière en haut du panneau indique quels tags sont manquants.

{{< img src="tracing/services/tag_enrichment/service-config-side-panel.png" alt="Le panneau latéral Configuration du service pour un service, affichant une bannière qui indique que les tags d'équipe et de système sont manquants dans la télémétrie, avec un bouton Ajouter des tags." >}}

Cliquez sur {{< ui >}}Add Tags{{< /ui >}} pour ouvrir la fenêtre modale de règle d'enrichissement de tag pré-remplie avec ce service.

{{< img src="tracing/services/tag_enrichment/add-idp-tag-enrichment-rule.png" alt="La fenêtre modale Ajouter une règle d'enrichissement de tag IDP, affichant les champs pour sélectionner les entités à enrichir, les tags à ajouter et la méthode de source de tag." >}}

## Comportement d'enrichissement de tags {#tag-enrichment-behavior}

- **Télémétrie impactée** : L'enrichissement de tags s'applique uniquement aux logs, aux spans APM et aux métriques de trace. Comme [Data Observability: Jobs Monitoring][3] envoie la télémétrie des tâches sous forme de spans APM, cette télémétrie est également enrichie, mais les métriques de Jobs Monitoring ne le sont pas. L'enrichissement de tags n'est pas pris en charge pour d'autres types de télémétrie, notamment les métriques personnalisées et d'infrastructure, Database Monitoring, le profilage, Kubernetes, Universal Service Monitoring et les événements.
- **Historical data** : Les règles d'enrichissement de tags s'appliquent uniquement à la télémétrie ingérée pendant qu'une règle est active. Les données passées ne sont pas mises à jour rétroactivement. La suppression ou la modification d'une règle empêche son application à la nouvelle télémétrie, mais ne met pas à jour les données précédemment ingérées.
- **Mises à jour des métadonnées** : la mise à jour ou l'ajout de métadonnées d'entité aux services alors que les règles d'enrichissement sont activées, y compris les règles par défaut, met automatiquement à jour ces tags.
- **Rule processing order** : Les règles d'enrichissement de tags sont appliquées dans l'ordre dans lequel elles ont été créées. Les règles situées en haut de la liste prévalent sur celles situées en dessous.
- **Interaction avec les règles de remappage** : Les règles d'enrichissement de tags sont appliquées après les règles de remappage de service. Si une règle de remappage de service modifie le tag `service`, l'enrichissement utilise le nom de service mis à jour lors de la recherche des métadonnées IDP.
- **Primary tags** L'enrichissement de tags s'applique après la résolution des tags principaux, de sorte que les tags enrichis ne peuvent pas être utilisés comme tags principaux.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
[2]: /fr/account_management/rbac/
[3]: /fr/data_observability/jobs_monitoring/