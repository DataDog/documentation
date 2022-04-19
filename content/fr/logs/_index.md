---
title: Log Management
kind: Documentation
description: Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.
disable_sidebar: true
aliases:
  - /fr/guides/logs/
  - /fr/logs/logging_without_limits
further_reading:
  - link: /logs/log_collection/
    tag: Documentation
    text: Commencer à recueillir vos logs
  - link: https://learn.datadoghq.com
    tag: Centre d'apprentissage
    text: "Découvrir le fonctionnement de la solution Log\_Management de Datadog"
---
## Présentation

Pour veiller à l'intégrité de votre infrastructure, il est crucial d'enregistrer des logs à propos des principales opérations de votre système. Les infrastructures modernes peuvent générer toutes les minutes des milliers d'événements. Vous devez donc déterminer les types de logs à envoyer à une solution de gestion de logs, et les types de logs à archiver. Tout filtrage de vos logs peut entraîner un traitement non exhaustif ou la perte de données importantes.

La solution Log Management de Datadog (également désignée par les termes « logs Datadog » ou « journalisation Datadog ») met fin à ces problèmes en séparant le processus d'ingestion des logs du processus d'indexation. Vous pouvez ainsi recueillir, traiter, explorer et surveiller tous vos logs de façon rentable et sans aucune limite, grâce à Logging without Limits\*.

La solution Logging without Limits\* simplifie vos processus de dépannage dans le [Log Explorer][1]. Vos équipes et vous-même pouvez accéder rapidement aux problèmes concernant votre infrastructure et les corriger au plus vite. Les fonctionnalités intuitives d'archivage facilitent le travail d'audit et d'évaluation des équipes IT et de sécurité. Logging without Limits\* alimente également la solution [Cloud SIEM Datadog][2], qui détecte les menaces de sécurité dans votre environnement sans nécessiter l'indexation de vos logs.

{{< vimeo 293195142 >}}

</br>

## Recueillir les logs

Pour commencer à utiliser Log Management, commencez à [ingérer des logs][3] depuis vos hosts, conteneurs, fournisseurs cloud et autres sources.

## Configurer les logs

{{< img src="/logs/configure.png" alt="Configurer vos logs depuis une vue unique" style="width:80%;">}}

Une fois vos logs ingérés, traitez et enrichissez l'ensemble d'entre eux avec des pipelines et des processeurs, contrôlez précisément votre budget de gestion des logs avec des index, générez des métriques à partir des logs générés ou gérez vos logs dans des archives optimisées pour le stockage grâce aux [paramètres de configuration des logs][4].

## Associer les logs

{{< img src="/logs/connect.png" alt="Corréler les logs aux métriques ou traces" style="width:80%;">}}

Tirez profit des trois piliers de l'observabilité en associant vos logs à vos métriques et traces :

- [Associez vos logs à vos traces][5] pour gagner en visibilité sur vos applications.
- [Corrélez vos logs à vos métriques][6] pour contextualiser un problème et le mapper dans l'ensemble de votre service.

## Explorer les logs

Commencez à explorer vos logs ingérés dans le [Log Explorer][1].

{{< img src="/logs/explore.jpg" alt="Explorer vos logs ingérés" style="width:80%;">}}

- [Recherche][7] : effectuez des recherches dans l'ensemble de vos logs.
- [Live Tailing][8] : visualisez en temps réel vos logs ingérés dans l'ensemble de vos environnements.
- [Analyse][9] : analysez vos logs indexés.
- [Patterns][10] : identifiez des patterns de log en rassemblant vos logs indexés au sein d'un cluster.
- [Vues enregistrées][11] : servez-vous des vues enregistrées pour configurer automatiquement votre vue Log Explorer.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/explorer/
[2]: /fr/security_platform/cloud_siem/
[3]: /fr/logs/log_collection/
[4]: /fr/logs/log_configuration/
[5]: /fr/tracing/connect_logs_and_traces/
[6]: /fr/logs/guide/correlate-logs-with-metrics/
[7]: /fr/logs/explorer/search_syntax/
[8]: /fr/logs/live_tail/
[9]: /fr/logs/explorer/analytics/
[10]: /fr/logs/explorer/patterns/
[11]: /fr/logs/explorer/saved_views/