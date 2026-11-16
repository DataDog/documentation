---
aliases:
- /fr/cloud_cost_management/tag_explorer
description: Recherchez et gérez tous les tags liés aux coûts, y compris ceux provenant
  de vos factures, avec des informations sur leurs sources.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
- link: /cloud_cost_management/setup/custom
  tag: Documentation
  text: En savoir plus sur les Custom Costs
- link: /cloud_cost_management/datadog_costs
  tag: Documentation
  text: En savoir plus sur les Datadog Costs
- link: /cloud_cost_management/setup/saas_costs
  tag: Documentation
  text: En savoir plus sur les SaaS and AI Costs
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: Documentation
  text: En savoir plus sur les Tag Pipelines
title: Tag Explorer
---
## Présentation {#overview}

[Cloud Cost Management][1] détecte les sources de tous vos tags liés aux coûts. Vous pouvez rechercher et gérer des tags pour ventiler les coûts, y compris [Custom Costs][4], [Datadog costs][5] et [SaaS cost integrations][6].

Utilisez le [Tag Explorer][2] pour comprendre les sources et afficher les descriptions de chaque tag. Cela inclut les tags gérés via [Tag Pipelines][3]. Les Tag Pipelines vous permettent de créer et de gérer des règles de tags qui corrigent les tags manquants ou incorrects sur votre facture cloud, ou de créer des tags inférés selon votre logique métier.

## Configuration {#setup}

Pour utiliser le Tag Explorer, vous devez configurer [Cloud Cost Management][1] pour AWS, Azure, Google Cloud ou Oracle Cloud.

Consultez la documentation respective de votre fournisseur cloud :

{{< card-grid image_width="50" >}}
  {{< image-card href="/cloud_cost_management/setup/aws/" src="integrations_logos/amazon-web-services_avatar.svg" alt="aws" >}}
  {{< image-card href="/cloud_cost_management/setup/azure/" src="integrations_logos/azure_avatar.svg" alt="azure" >}}
  {{< image-card href="/cloud_cost_management/setup/google_cloud/" src="integrations_logos/google-cloud-platform_avatar.svg" alt="google cloud" >}}
{{< /card-grid >}}

## Rechercher et gérer les tags {#search-and-manage-tags}

Accédez à [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}}][2] et sélectionnez l'onglet {{< ui >}}Tags{{< /ui >}} pour rechercher des tags à partir de vos factures de fournisseur cloud, [Custom Costs][4], [Datadog costs][5], [SaaS cost integrations][6] et [Tag Pipelines][3].

Pour voir les tags d'un fournisseur, sélectionnez-le dans le menu déroulant {{< ui >}}Provider{{< /ui >}} dans le coin supérieur gauche. Utilisez le panneau {{< ui >}}Tag Sources{{< /ui >}} pour affiner davantage les résultats selon l'origine de chaque tag.

Les tags sont disponibles pour les fournisseurs suivants :

- AWS
- Azure
- Confluent Cloud\*
- Databricks\*
- Datadog\*
- Elastic Cloud\*
- Fastly\*
- Google Cloud
- MongoDB\*
- OpenAI\*
- Oracle Cloud
- Snowflake\*
- Twilio\*

\* Les coûts pour ce fournisseur sont en préversion.

## Définir les tags préférés {#set-preferred-tags}
Vous pouvez définir jusqu'à cinq tags préférés pour mettre en évidence les tags les plus importants de votre organisation dans Cloud Cost Management. Ces tags apparaissent en premier lors de la sélection de tags dans la [page Explorer][7], les [rapports CCM][8] et les [règles d'allocation personnalisées][9], entre autres zones.

{{< img src="cloud_cost/tag_explorer/preferred_tags_1.png" alt="Les tags préférés sont affichés dans tout CCM" style="width:100%;" >}}

Vous pouvez choisir des tags préférés parmi tous vos tags de données de coût existants, y compris les [Tag Pipelines][3]. Ces paramètres s'appliquent à l'ensemble de votre organisation.

{{< img src="cloud_cost/tag_explorer/preferred_tags_2.png" alt="Sélectionnez vos tags préférés dans Tag Explorer" style="width:100%;" >}}

## Modifier les descriptions des tags {#edit-tag-descriptions}

Vous pouvez ajouter ou modifier des descriptions pour n'importe quel tag dans Tag Explorer afin de fournir un contexte sur ce que représente un tag et comment il doit être utilisé. Cliquez sur le champ de description d'un tag pour le modifier, ou utilisez l'IA pour générer automatiquement une description.

{{< img src="cloud_cost/tag_explorer/edit_tag_description.png" alt="Modifiez la description d'un tag dans Tag Explorer avec l'option de génération par IA" style="width:60%;" >}}

Les descriptions des tags sont visibles par tous les membres de votre organisation et apparaissent aux emplacements suivants :

- {{< ui >}}Tags{{< /ui >}} : Les descriptions sont affichées dans le tableau des tags à côté de chaque clé de tag.
- {{< ui >}}Group-by selectors{{< /ui >}} : Lors de la sélection de tags pour regrouper dans Cloud Cost Management, les descriptions apparaissent dans le menu déroulant pour aider les utilisateurs à choisir le bon tag.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analyze/tags
[3]: /fr/cloud_cost_management/allocation/tag_pipelines
[4]: /fr/cloud_cost_management/setup/custom
[5]: /fr/cloud_cost_management/datadog_costs
[6]: /fr/cloud_cost_management/setup/saas_costs
[7]: https://app.datadoghq.com/cost/explorer
[8]: /fr/cloud_cost_management/reporting
[9]: /fr/cloud_cost_management/allocation/custom_allocation_rules