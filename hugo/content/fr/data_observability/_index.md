---
description: Surveillez la qualité, les performances et les coûts des données grâce
  à Data Observability pour détecter les anomalies, analyser la lignée des données
  et prévenir les problèmes affectant les systèmes en aval.
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/
  tag: Blog
  text: Datadog apporte l'observabilité aux équipes de données en acquérant Metaplane.
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Évaluez, optimisez et sécurisez votre pile d'IA Google Cloud avec Datadog.
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: Blog
  text: 'Surveillance des pipelines de données : notions de base – suivi de l''état
    et des performances dans la pile de données'
title: Vue d'ensemble de Data Observability
---
## Présentation {#overview}
Data Observability (DO) aide les équipes de données à améliorer la fiabilité des données pour les applications d'analyse et d'IA, et à optimiser les performances et les coûts des pipelines de données. En unifiant la surveillance de la qualité et des travaux, de la production à la consommation, les équipes peuvent détecter et résoudre les problèmes plus rapidement tout en optimisant les coûts et les performances.

{{< img src="data_observability/do_suite_root_cause_analysis-1.png" alt="Lignée de bout en bout de Datadog Data Observability avec les traces de jobs Spark." style="width:100%;" >}}

## Fonctionnalités clés {#key-capabilities}

- **Détectez les échecs précocement** : Repérez les données erronées dans des entrepôts comme Snowflake, Databricks et BigQuery grâce à des monitors basés sur le ML avant que les dashboards, les parties prenantes ou les modèles d'IA ne soient impactés. Détectez les échecs de pipeline en amont dans les travaux exécutés sur Databricks, Spark, Airflow ou dbt.
- **Accélérez la remédiation** : Triez plus rapidement en utilisant la lignée de bout en bout pour identifier les causes profondes, évaluer le rayon d'impact des incidents et acheminer vers le bon responsable. Visualisez quel job dans le pipeline a échoué ou a été retardé, et basculez vers les traces d'exécution et les logs des jobs pour en déterminer la raison.
- **Optimisez les coûts et les performances** : Obtenez une visibilité sur le coût et l'efficacité des travaux et clusters Spark et Databricks, et utilisez les recommandations pour optimiser la configuration des clusters, le code et les requêtes.
- **Unifiez l'observabilité de bout en bout** : Corrélez la qualité des données, l'exécution des pipelines et les signaux d'infrastructure en un seul endroit, couvrant l'ensemble du cycle de vie des données.

## Démarrez {#get-started}

{{< whatsnext desc="Data Observability se compose des éléments suivants :" >}}
   {{< nextlink href="/data_observability/data_catalog/" >}}Catalogue de données : Parcourez et recherchez dans un inventaire centralisé de vos actifs de données à travers les intégrations connectées.{{< /nextlink >}}
   {{< nextlink href="/data_observability/lineage/" >}}Lignée : Tracez les dépendances en amont et les consommateurs en aval à travers votre pile de données.{{< /nextlink >}}
   {{< nextlink href="/data_observability/quality_monitoring/" >}}Quality Monitoring : Identifiez les problèmes de données avant que les applications BI et IA en aval ne soient impactées.{{< /nextlink >}}
   {{< nextlink href="/data_observability/jobs_monitoring/" >}}Jobs Monitoring : Observez, dépannez et optimisez les travaux à travers vos pipelines de données.{{< /nextlink >}}
   {{< nextlink href="/data_observability/cicd/" >}}CI/CD : Prévenez les problèmes de qualité des données avant qu'ils ne soient fusionnés.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}