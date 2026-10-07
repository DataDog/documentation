---
description: Découvrez les modèles de logs, de métriques et de traces prêts à l'emploi
  disponibles pour la création et le déploiement de pipelines dans l'interface utilisateur
  d'Observability Pipelines.
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines#set-up-a-pipeline
  tag: Documentation
  text: Configurez des pipelines
- link: https://learn.datadoghq.com/courses/course-getting-started-observability-pipelines
  tag: Centre d'apprentissage
  text: Démarrage avec Observability Pipelines
title: Explorer les modèles
---
## Présentation {#overview}

Lorsque vous créez un pipeline dans l'interface utilisateur d'Observability Pipelines, sélectionnez l'un des modèles prêts à l'emploi pour la création et le déploiement de pipelines en fonction de votre cas d'utilisation.

{{< img src="observability_pipelines/eight_templates.png" alt="L'interface utilisateur d'Observability Pipelines montrant les huit modèles" style="width:100%;" >}}

## Modèles {#templates}

Les modèles sont conçus pour les cas d'utilisation suivants :

{{< tabs >}}
{{% tab "Logs" %}}

### Archiver les logs {#archive-logs}

Utilisez le modèle Archive Logs pour stocker les logs dans une solution de stockage cloud (Amazon S3, Google Cloud Storage ou Azure Storage). Les logs archivés sont stockés dans un format réhydratable par Datadog afin qu'ils puissent être réhydratés dans Datadog selon les besoins. Ceci est utile lorsque :

- Vous avez un volume élevé de logs bruyants, mais pourriez avoir besoin de les indexer dans Datadog Log Management de manière ponctuelle pour une enquête.
- Vous migrez vers Datadog Log Management et souhaitez conserver des logs historiques après avoir terminé la migration.
- Vous avez une politique de rétention pour répondre aux exigences de conformité, mais n'avez pas nécessairement besoin d'indexer ces logs.

### Double envoi de logs {#dual-ship-logs}

À mesure que votre organisation se développe, vos besoins en observabilité pour différents cas d'utilisation, tels que la sécurité, l'archivage et la gestion des logs, évoluent également. Cela pourrait signifier devoir tester différentes solutions d'archivage, de SIEM et de gestion des logs. Cependant, la gestion des pipelines de logs vers différentes solutions peut être complexe. Utilisez le modèle Double envoi de logs pour envoyer vos logs vers différentes destinations, afin de pouvoir évaluer différents outils et workflows avec un minimum de perturbations pour votre environnement de production.

### Générer des métriques basées sur les logs {#generate-log-based-metrics}

Certaines sources de logs, telles que les pare-feu et les équipements réseau, génèrent un grand volume d'événements de log qui contiennent des données de log qui n'ont pas besoin d'être stockées. Souvent, vous avez seulement besoin d'un résumé des logs et d'une comparaison avec des données historiques. Les métriques basées sur les logs constituent également un moyen rentable de résumer les données de log de l'ensemble de votre flux d'ingestion. Utilisez le modèle Générer des métriques pour générer des métriques de comptage, de jauge ou de distribution à partir de logs correspondant à une requête.

Voici les types de métriques disponibles :
  | Type de métrique  | Description                                                                                                                                         | Exemple                                                                                       |
  | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
  | COMPTE        | Le nombre total d'occurrences d'événements dans un intervalle de temps. Peut être réinitialisé à zéro, mais ne peut pas être diminué.                                          | Vous souhaitez compter le nombre de logs avec `status:error`.                                     |
  | JAUGE        | Un instantané d'une valeur au moment où elle est rapportée.                                                                                                   | Vous souhaitez suivre la dernière utilisation du processeur par host.                                        |
  | DISTRIBUTION | Valeurs brutes envoyées à Datadog afin que les agrégations de centiles (telles que p95, p99) soient calculées côté serveur, globalement sur chaque host rapportant la métrique. | Vous souhaitez obtenir le p95 global de `response_time_seconds` sur chaque host desservant un endpoint d'API. |


### Enrichissement des logs {#log-enrichment}

Les différents services, systèmes et applications de votre organisation génèrent tous des logs contenant des couches d'informations et dans des formats différents. Pour gérer ces logs, vous devrez peut-être normaliser leur format et ajouter des informations pour faciliter leur recherche et leur analyse. Par exemple, chaque source de log a son propre format unique. Cela peut rendre la recherche et l'analyse difficiles au cours des enquêtes s'ils n'ont pas été reformatés et normalisés. Vous pourriez également avoir des informations supplémentaires, telles que des identifiants client ou des adresses IP, que vous souhaitez ajouter à vos logs.

### Contrôle du volume des logs {#log-volume-control}

Les logs bruts sont bruyants et seuls certains logs sont utiles pour la recherche et l'analyse ultérieures lors des enquêtes. Utilisez le modèle de contrôle du volume des logs pour déterminer quels logs envoyer à votre solution indexée, telle qu'une solution SIEM ou de gestion des logs. Cela vous aide à augmenter la valeur de vos logs indexés et à respecter votre budget prévu.

### Masquage des données sensibles {#sensitive-data-redaction}

Les données sensibles, telles que les numéros de carte de crédit, les numéros d'acheminement bancaire et les clés d'API, peuvent être révélées involontairement dans vos logs, ce qui peut exposer votre organisation à des risques financiers et de confidentialité.

Utilisez le modèle de masquage des données sensibles pour détecter et masquer les informations sensibles sur site. Le processeur de scanner de données sensibles d'Observability Pipelines fournit 70 règles de numérisation prêtes à l'emploi, mais vous pouvez également créer vos propres règles de numérisation personnalisées à l'aide d'expressions régulières. Les règles prêtes à l'emploi reconnaissent les modèles standard tels que les numéros de carte de crédit, les adresses e-mail, les adresses IP, les clés API et SSH, ainsi que les jetons d'accès.

### Fractionnement des logs {#split-logs}

Lorsque vous avez des logs provenant de différents services et applications, vous devrez peut-être les envoyer à différents services en aval pour les interroger, les analyser et générer des alertes. Par exemple, vous pourriez vouloir envoyer les logs de sécurité vers une solution SIEM et les logs DevOps vers Datadog. Utilisez le modèle de fractionnement des logs pour prétraiter vos logs séparément pour chaque destination avant de les envoyer en aval.

{{% /tab %}}
{{% tab "Métriques" %}}

### Gouvernance des tags de métriques {#metric-tag-governance}

Les métriques capturent des signaux concernant votre environnement et offrent un aperçu de la santé de votre système, de vos workflows métier et de vos activités de sécurité. Ces métriques sont envoyées depuis vos diverses applications, périphériques réseau et nœuds, mais la valeur des métriques individuelles peut varier considérablement.

Pour vous aider à gérer la qualité et le volume de vos métriques, utilisez le modèle de gouvernance des tags de métriques pour les traiter dans Observability Pipelines avant de les envoyer vers vos destinations. Vous pouvez utiliser des processeurs pour ne conserver que les métriques dont vous avez besoin, standardiser le marquage des métriques et supprimer les tags indésirables afin d'éviter une cardinalité élevée.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}