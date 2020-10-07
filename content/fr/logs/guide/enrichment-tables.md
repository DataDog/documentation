---
title: Ajouter des métadonnées personnalisées aux logs grâce aux tables d'enrichissement
kind: guide
beta: true
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: /logs/processing/parsing/
    tag: Documentation
    text: En savoir plus sur le parsing
---
<div class="alert alert-warning">
La fonctionnalité Tables d'enrichissement est actuellement en bêta privée. Pour en savoir plus, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.
</div>

## Présentation

Définissez de nouvelles entités dans Datadog (telles que des informations client, des noms de service, des informations sur un service ou des adresses IP) en important un fichier CSV contenant une table d'informations. Une entité correspond à une clé primaire dans une table d'enrichissement et à ses métadonnées associées. Les données peuvent être appliquées en tant que tags aux logs lors de leur ingestion dans le [processeur de correspondances][1].

{{< img src="logs/guide/enrichment-tables/overview.png" alt="Tables d'enrichissement" style="width:100%;">}}

## Créer une table d'enrichissement

Pour créer une table d'enrichissement, importez un fichier CSV en nommant les colonnes appropriées et en définissant la clé primaire. Cette clé sera utilisée pour les correspondances.

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="Créer une table d'enrichissement" style="width:100%;">}}

Cette table d'enrichissement peut ensuite être utilisée pour ajouter des attributs supplémentaires aux logs via le [processeur de correspondances][1].

## Modifier une table d'enrichissement

Pour modifier une table d'enrichissement existante et y appliquer de nouvelles données, cliquez sur le bouton **Update Data +** en haut à droite. Les données de la table seront écrasées par celles du CSV sélectionné, ce qui signifie que toutes les lignes existantes avec la même clé primaire seront mises à jour, et que toutes les nouvelles lignes seront ajoutées. Une fois la table enregistrée, les lignes modifiées seront traitées de façon asynchrone et mises à jour dans l'aperçu. Les lignes mises à jour peuvent mettre jusqu'à 10 minutes à apparaître dans les logs affectés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/processors/?tab=ui#lookup-processor