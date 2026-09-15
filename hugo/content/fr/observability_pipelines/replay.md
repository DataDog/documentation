---
aliases:
- /fr/observability_pipelines/rehydration/
description: Découvrez comment utiliser Replay pour récupérer des logs archivés et
  les traiter dans Observability Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/
  tag: Documentation
  text: En savoir plus sur les processeurs
- link: /observability_pipelines/packs/
  tag: Documentation
  text: En savoir plus sur les Packs
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: Blog
  text: Réhydratez les logs archivés dans n'importe quel SIEM ou fournisseur de journalisation
    avec Observability Pipelines
title: Replay
---
## Présentation {#overview}

Replay pour Observability Pipelines vous permet d'extraire des logs archivés à partir d'un stockage d'objets et de les traiter dans Observability Pipelines, y compris avec des [Packs][1]. Cela vous donne un accès cohérent au contexte historique sans avoir à reconstruire des workflows ou à modifier les pipelines d'ingestion.

Les organisations stockent souvent de grands volumes de logs dans des archives à long terme rentables pour contrôler les dépenses et répondre aux exigences de conformité. Cependant, les données historiques deviennent souvent difficiles d'accès en cas d'incident de sécurité, de demande d'audit ou d'enquête opérationnelle. La récupération de logs archivés depuis un stockage froid peut être lente, manuelle et perturbatrice, nécessitant des scripts ad hoc, une décompression ou un effort d'ingénierie dédié. Replay pour Observability Pipelines résout ces problèmes.

{{< img src="observability_pipelines/replay_pipeline.png" alt="Un pipeline avec la source Replay Amazon S3." style="width:100%;" >}}

## Fonctionnement de Replay {#how-replay-works}

Replay fournit un workflow automatisé pour récupérer et retraiter les logs archivés stockés dans un stockage d'objets, tel qu'Amazon S3, Google Cloud Storage et Azure Blob Storage. Cela vous aide à équilibrer l'efficacité du stockage avec un accès rapide aux données historiques.

Avec Replay, vous pouvez :

### Récupérer des logs archivés à la demande {#retrieve-archived-logs-on-demand}

Extraire uniquement les données dont vous avez besoin pour les enquêtes, les audits, le dépannage ou les tests de pipeline, et éliminer les longs délais de récupération et les étapes d'extraction manuelle.

### Cibler des plages horaires ou des segments d'événements spécifiques {#target-specific-time-ranges-or-event-slices}

Spécifiez la période exacte ou le sous-ensemble d'événements dont vous avez besoin pour éviter de déplacer ou de traiter des données inutilement.

### Traiter les logs historiques avec Observability Pipelines {#process-historical-logs-with-observability-pipelines}

Les logs rejoués passent par la même logique de parsing, d'enrichissement, de normalisation et de routage appliquée aux flux de logs en direct.

Cela garantit :

- Un formatage et une extraction de champs cohérents
- Un enrichissement fiable (par exemple, métadonnées utilisateur, géo-IP et cloud)
- Des contrôles de sécurité et de conformité uniformes
- Un comportement identique pour les données historiques et en temps réel

### Acheminez les données rejouées vers n'importe quelle destination prise en charge {#route-replayed-data-to-any-supported-destination}

Vous pouvez envoyer les logs historiques traités vers des SIEM, des lacs de données, des plateformes d'analyse ou toute destination Observability Pipelines.

### Éliminez la manipulation manuelle {#eliminate-manual-handling}

Replay offre un moyen structuré et prévisible de réintégrer des données archivées dans votre plateforme d'observabilité, afin que vous n'ayez pas à utiliser de scripts personnalisés, de décompression manuelle ou de processus de récupération ad hoc.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/packs/