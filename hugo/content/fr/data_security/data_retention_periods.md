---
algolia:
  tags:
  - data retention
aliases:
- /fr/developers/faq/data-collection-resolution-retention/
- /fr/developers/guide/data-collection-resolution-retention
attributes:
- data_type: '- **Erreurs** : 15 jours

    - **Indexed spans** : 15 ou 30 jours, déterminés par le forfait client

    - **Statistiques des services/ressources** : 30 jours

    - **Traces consultées** : conservées pendant toute la durée du compte

    '
  product: APM
- data_type: '- **Signaux de sécurité** : 15 mois

    - **Spans** : 90 jours

    '
  product: App and API Protection
- data_type: '- **Logs d''audit (Audit Trail activé)** : 90 jours

    - **Logs d''audit (Audit Trail désactivé)** : 7 jours

    '
  product: Audit Trail
- data_type: '- **Messages** : 15 mois

    '
  product: Bits Chat
- data_type: '- **Code source** : 7 jours

    '
  product: Bits Code
- data_type: '- **Investigations** : conservées pendant toute la durée du compte

    '
  product: Bits Investigation
- data_type: '- **Événements de session, de vue, d''action et d''erreur** : 30 jours

    - **Événements de ressource, de tâche longue et de métriques vitales** : 15 jours

    '
  product: Browser RUM
- data_type: '- **Cas** : conservés pendant toute la durée du compte

    '
  product: Case Management
- data_type: '- **Déploiements** : 30 jours

    '
  product: CD Visibility
- data_type: '- **Pipelines, stages, jobs, setups, commands** : 15 mois

    '
  product: CI Pipeline Visibility
- data_type: '- **Métriques de coûts** : 15 mois

    - **Recommandations** : 90 jours

    '
  product: Cloud Cost Management
- data_type: '- **Résultats et vulnérabilités résolues** : 15 mois

    '
  product: Cloud Security
- data_type: '- **Signaux** : 15 mois

    - **Détections, notifications, suppressions** : conservées pendant toute la durée
    du compte

    '
  product: Cloud SIEM
- data_type: '- **Événements** : 90 jours

    - **Signaux de sécurité** : 15 mois

    '
  product: Workload Protection
- data_type: '- **Scans** : 15 mois

    '
  product: Code Security SAST
- data_type: '- **Vulnérabilités détectées** : 15 mois

    '
  product: Code Security IAST
- data_type: '- **Métadonnées de conteneur** : 2 heures

    - **Processus et conteneurs en direct** : 36 heures

    - **Définitions YAML** : 7 jours

    '
  product: Container and Process Monitoring
- data_type: '- **Flame graphs, call graphs, and thread timelines** : 8 jours

    - **Flame graphs exported to a notebook** : 1 an

    - **Profils individuels ouverts au moins une fois dans l''interface utilisateur**
    : 1 an

    - **Métriques de profil** : 30 jours

    '
  product: Continuous Profiler
- data_type: '- **Batch results** : 2 mois

    - **Résultats de test** : 2 mois

    '
  product: Continuous Testing
- data_type: '- **Job traces** : 90 jours

    '
  product: 'Data Observability: Jobs Monitoring'
- data_type: '- **Query samples** : 15 jours

    - **Métriques de requêtes** : 15 mois

    '
  product: Database Monitoring
- data_type: '- **Dashboards, Notebooks, Monitors** : conservés pendant toute la durée
    du compte

    '
  product: Datadog App
- data_type: '- **Déploiements** : 2 ans

    '
  product: DORA Metrics
- data_type: '- **Échantillons d''erreur** : 30 jours

    - **Issues** : 1 an après la dernière activité

    '
  product: Error Tracking
- data_type: '- **Événements** : 15 mois

    '
  product: Event Management
- data_type: '- **Incidents** : conservés pendant toute la durée du compte

    '
  product: Incident Management
- data_type: '- **Traces et spans de production** : 15 (par défaut), 30, 60 ou 90
    jours, selon le forfait client

    - **Traces et spans d''expérimentation** : 15 (par défaut), 90, 180, 270, 365
    jours, selon le forfait client

    - **Datasets** : 3 ans

    '
  product: Agent Observability
- data_type: '- **Logs** : déterminés par le forfait client

    - **Sensitive Data Scanner example logs** : <span class="d-none site-region-container"
    data-region="us,us3,us5,eu,ap1,ap2,uk1">3 jours</span><span class="d-none site-region-container"
    data-region="gov,gov2">7 jours</span>

    '
  product: Log Management
- data_type: '- **Tags et valeurs** : 15 mois

    '
  product: Metrics
- data_type: '- **Résultats de test (non affichés dans l''interface utilisateur)**
    : 2 mois

    - **Résultats de test (affichés dans l''interface utilisateur)** : 15 mois

    - **Binaires d''application mobile** : conservés pendant toute la durée du compte

    '
  product: Mobile App Testing
- data_type: '- **Événements de session, de vue, d''action et d''erreur** : 30 jours

    - **Événements de ressource, de tâche longue et de métriques vitales** : 15 jours

    '
  product: Mobile RUM
- data_type: '- **NetFlow** : 15, 30, 60 ou 90 jours, selon le forfait client

    - **SNMP traps** : déterminées par le forfait client, 15 jours par défaut

    '
  product: Network Device Monitoring
- data_type: '- **Trafic réseau** : 14 jours

    '
  product: Cloud Network Monitoring
- data_type: '- **Network Path Tests** : 30 jours

    '
  product: Network Path
- data_type: '- **Événements** : 15 mois

    - **Profils d''utilisateur** : 15 mois, ou 30 jours si <a href="/product_analytics/guide/rum_and_product_analytics/#how-do-i-set-up-product-analytics">Product
    Analytics n''est pas activé</a>

    '
  product: Product Analytics
- data_type: '- **Gate evaluations** : 30 jours

    '
  product: Quality Gates
- data_type: '- **Tables** : conservées pendant toute la durée du compte

    '
  product: Reference Tables
- data_type: '- **Service metadata** : conservées pendant toute la durée du compte

    '
  product: Service Catalog
- data_type: '- **SLO results** : 15 mois

    '
  product: Service Level Objectives
- data_type: '- **Replays (l''option d''extension dans l''interface utilisateur n''est
    pas cochée)** : 30 jours

    - **Replays (l''option d''extension dans l''interface utilisateur est cochée)**
    : 15 mois

    '
  product: Session Replay
- data_type: '- **Vulnérabilités détectées** : 15 mois

    '
  product: Software Composition Analysis (SCA)
- data_type: '- **Code source** : 7 jours

    '
  product: Source Code Integration
- data_type: '- **Résultats de test** : 15 mois

    '
  product: Synthetics
- data_type: '- **Tests** : 3 mois

    '
  product: Test Visibility & Intelligent Test Runner
- data_type: '- **Workflows** : 30 jours

    '
  product: Workflow Automation
content: Le tableau suivant liste les périodes de rétention des données par défaut
  par type de données et par produit. Vous pouvez effectuer une recherche par mot-clé
  ou par texte de description pour trouver le type de données ou le produit qui vous
  intéresse. Pour plus d'informations sur l'intervalle de collecte et la résolution
  minimale, consultez [Datadog Data Collection and Resolution](/extend/guide/data-collection-resolution).
  Besoin d'aide supplémentaire ? Contactez le [support Datadog](/help).
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
title: Périodes de rétention des données
type: data_retention_periods
---
### Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}