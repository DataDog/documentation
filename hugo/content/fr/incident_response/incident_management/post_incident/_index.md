---
description: Gérez les post-mortems et les tâches de suivi après la résolution d'un
  incident
further_reading:
- link: /incident_response/incident_management/post_incident/postmortems
  tag: Documentation
  text: Générez et gérez des post-mortems
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentation
  text: Configurez les modèles de post-mortem et de message
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: Documentation
  text: Gérez les tâches de suivi d'incident
- link: /incident_response/work_management/
  tag: Documentation
  text: Suivez les suivis avec Work Management
title: Post-incident
---
## Présentation {#overview}

Une fois qu'un incident est résolu ou atteint un état stable, la phase post-incident commence. Cette phase critique se concentre sur la documentation de ce qui s'est passé, la collecte des leçons apprises et le suivi des actions de suivi afin de prévenir des incidents similaires à l'avenir. Le workflow post-incident assure l'amélioration continue de votre processus de réponse aux incidents et aide à développer les connaissances organisationnelles.

Utilisez les activités post-incident pour :

- Générez des post-mortems documentant les détails de l'incident, la cause première et les enseignements tirés
- Créez et gérez des tâches de suivi pour la remédiation et l'amélioration des processus
- Communiquez le statut et la résolution de l'incident aux parties prenantes
- Constituez une base de connaissances des modèles d'incidents et de leurs résolutions

## Post-mortems {#postmortems}

Les post-mortems sont essentiels à l'amélioration continue de votre processus de réponse aux incidents. Une fois un incident résolu, vous pouvez générer un post-mortem qui se remplit automatiquement avec les informations de l'incident à l'aide d'un Notebook Datadog, d'une page Confluence ou d'un document Google Drive.

Un post-mortem d'incident comprend généralement :

- **Résumé de l'incident** : Vue d'ensemble de ce qui s'est produit
- **Chronologie** : Séquence chronologique des événements pendant l'incident
- **Analyse des causes profondes** : Enquête détaillée sur les causes sous-jacentes
- **Évaluation de l'impact** : Métriques d'impact sur le client et le service
- **Éléments d'action** : Tâches spécifiques pour prévenir la récurrence
- **Leçons apprises** : Principaux enseignements pour l'organisation

Pour plus d'informations sur la génération de post-mortems et la configuration de modèles, consultez [Post-mortems d'incident][2].

## Suivis {#follow-ups}

Lors d'une enquête sur un incident, votre équipe peut identifier des problèmes qui nécessitent une attention particulière mais qui ne sont pas directement liés à la résolution du problème immédiat. Les suivis vous permettent de capturer ces éléments pour une action ultérieure sans les perdre de vue dans la précipitation pour rétablir le service.

Les exemples courants incluent les améliorations de l'infrastructure, la dette technique, les lacunes dans les processus et les correctifs de causes profondes qui nécessitent plus de temps que l'atténuation immédiate.

Les suivis peuvent être créés à tout moment pendant ou après un incident depuis l'onglet **Remédiation** de l'incident ou depuis Slack. Après la résolution, vous pouvez exporter les suivis vers [Jira][3] (synchronisation unidirectionnelle) ou [Work Management][4] (synchronisation bidirectionnelle avec Jira et ServiceNow) pour les intégrer aux flux de travail existants de votre équipe.

Pour des informations détaillées sur la création, la gestion et l'exportation des suivis, consultez [Suivis d'incident][5].

## Pages de statut : {#status-pages}

Communiquez le statut et la résolution des incidents aux parties prenantes à l'aide de pages de statut. Vous pouvez créer et mettre à jour des avis sur les pages de statut directement depuis les incidents pour partager la disponibilité du service et les détails de l'incident avec les clients ou les équipes internes. Les mises à jour des pages de statut peuvent être connectées à des composants d'incident spécifiques pour refléter automatiquement l'impact des incidents en cours.

Pour plus d'informations sur l'intégration des pages de statut à votre workflow d'incident, consultez [Pages de statut][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /fr/incident_response/incident_management/post_incident/postmortems
[3]: /fr/integrations/jira/
[4]: /fr/incident_response/work_management/
[5]: /fr/incident_response/incident_management/post_incident/follow-ups
[6]: /fr/incident_response/status_pages/