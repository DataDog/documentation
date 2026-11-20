---
aliases:
- /fr/ddsql_editor/reference_tables/
further_reading:
- link: /integrations/guide/reference-tables/
  tag: Documentation
  text: Ajouter des métadonnées personnalisées avec les tables de référence
private: true
title: Tables de référence dans DDSQL (aperçu)
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
Le DDSQL Editor est en Preview.
{{< /callout >}}

<div class="alert alert-danger">
  Il existe deux <strong>variantes</strong> différentes de DDSQL. Les exemples de ce guide utilisent la syntaxe DDSQL (Preview). Consultez la syntaxe documentée dans <a href="/ddsql_reference/">DDSQL Reference</a>.
</div>

# Section Overview

Les tables de référence vous permettent de combiner des métadonnées avec des informations déjà présentes dans Datadog. Ces tables stockent des ensembles d'informations prédéfinis qui peuvent être facilement référencés dans vos requêtes, réduisant ainsi la complexité et améliorant les performances des requêtes. Avec DDSQL, vous pouvez interroger des tables de référence et les joindre à d'autres tables pour approfondir vos analyses.

Pour en savoir plus sur l'ajout de tables de référence, consultez la [documentation sur les tables de référence][1].

## Interroger les tables de référence

Vous pouvez interroger des tables de référence directement avec le DDSQL Editor. Ce guide vise à clarifier comment exploiter tout le potentiel des tables de référence dans vos requêtes de données.

### Exemple de syntaxe de requête

Pour interroger une table de référence, vous pouvez utiliser la syntaxe suivante. Supposons que la table de référence s'appelle « test » :

```sql
SELECT * FROM reference_tables.test
```

Cette requête récupère toutes les données de la table de référence spécifiée. Modifiez la requête pour inclure des colonnes ou des conditions spécifiques selon vos besoins.

### Joindre des données

En plus d'interroger des tables de référence, vous pouvez également les joindre à d'autres tables disponibles. En joignant des tables de référence, vous pouvez :

- Combiner des données de référence avec des données en direct pour enrichir vos rapports et dashboards.
- Intégrer des données statiques et dynamiques pour des analyses complètes.

Voici un exemple de jointure d'une table de référence avec une autre table :

```sql
SELECT a.table_name, b.table.version
FROM reference_tables.test a
  JOIN other_table b ON a.key = b.key
ORDER BY b.table_version DESC;
```

## Bonne pratique

Mettez régulièrement à jour les tables de référence pour garantir l'exactitude des données.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/guide/reference-tables/