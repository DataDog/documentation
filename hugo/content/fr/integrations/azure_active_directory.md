---
assets:
  dashboards: {}
  logs:
    source: azure.active_directory
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- azure
- log collection
- security
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/azure_active_directory/README.md
display_name: Azure Active Directory
draft: false
git_integration_title: azure_active_directory
guid: 1f6dbea8-db4a-4b0e-bfe8-f69efb3e877b
integration_id: azure-active-directory
integration_title: Azure Active Directory
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: azure_active_directory.
metric_to_check: ''
name: azure_active_directory
public_title: Intégration Datadog/Azure Active Directory
short_description: Analysez vos logs d'activité Azure Active Directory
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Azure Active Directory est une offre Active Directory hébergée sur le cloud, proposée par Microsoft Azure.
Cette intégration vous permet d'ingérer vos [logs d'activité Azure AD][1] (logs d'audit et de connexion) dans Datadog.

## Configuration

### Installation

Cette intégration transfère les logs à Datadog via Azure avec Event Hubs. Configurez Azure AD pour transférer les logs d'activité au hub d'événements.

### Configuration

1. Configurez le pipeline de transfert de logs d'Azure à Datadog via Event Hubs en suivant la [documentation relative à la collecte de logs][2].

2. Sur le portail Azure, sélectionnez _Azure Active Directory > Monitoring > Audit logs_.

3. Sélectionnez **Export Settings**.

4. Dans les paramètres de diagnostics, effectuez l'une des opérations suivantes :

   - Pour modifier les paramètres existants, sélectionnez **Edit setting**.
   - Pour ajouter de nouveaux paramètres, sélectionnez **Add diagnostics setting**. Vous pouvez avoir jusqu'à trois paramètres.

5. Cochez la case **Stream to an event hub**, puis sélectionnez **Event Hub/Configure**.

6. Sélectionnez l'abonnement Azure et l'espace de nommage Event Hubs créés plus tôt pour y transférer vos logs.

7. Sélectionnez OK pour quitter la configuration du hub d'événements.

8. Effectuez l'une des opérations suivantes ou les deux. Nous vous recommandons de sélectionner les deux.

   - Pour envoyer des logs d'audit, cochez la case **AuditLogs**.
   - Pour envoyer des logs de connexion, cochez la case **SignInLogs**.

9. Sélectionnez **Save**.

Les logs devraient commencer à parvenir à Datadog au bout de 15 minutes maximum.
Pour en savoir plus sur la configuration, regardez le [tutoriel Azure][3].

## Données collectées

#### Collecte de logs

Cette intégration vous permet de configurer l'ingestion de logs pour les logs d'activité Azure Active Directory.

Cela inclut les éléments suivants :

   - Connexions : informations concernant l'utilisation des applications gérées et les activités de connexion des utilisateurs.

   - Logs d'audit : traçabilité des logs quant aux modifications apportées via diverses fonctionnalités au sein d'Azure AD.

### Métriques

Azure Active Directory n'inclut aucune métrique.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/overview-reports#activity-reports
[2]: https://docs.datadoghq.com/fr/integrations/azure/?tab=eventhub#log-collection
[3]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/tutorial-azure-monitor-stream-logs-to-event-hub
[4]: https://docs.datadoghq.com/fr/help