---
title: Périodes de conservation des données
disable_sidebar: true
type: data_retention_periods
aliases:
  - /developers/faq/data-collection-resolution-retention/
  - /developers/guide/data-collection-resolution-retention
further_reading:
    - link: /data_security/
      tag: Documentation
      text: Consulter les principales catégories de données envoyées à Datadog
algolia:
  tags: [data retention]
filter_all: Tous
content: "Le tableau suivant répertorie les périodes de rétention des données par défaut selon le type de données et le produit. Vous pouvez également effectuer une recherche par mot-clé ou description pour trouver le type de données ou le produit qui vous intéresse. Pour obtenir des informations sur l'intervalle de collecte et la résolution minimale, consultez la section [Collecte et résolution des données Datadog](/extend/guide/data-collection-resolution). Besoin d'aide supplémentaire ? Contactez l'[assistance Datadog](/help)."
attributes:
  - product: APM
    data_type: |
- **Erreurs** : 15 jours
- **Spans indexées** : 15 ou 30 jours, selon le plan client
- **Statistiques de services/ressources** : 30 jours
- **Traces consultées** : conservées pendant toute la durée du compte
  - product: Protection des applications et des API
    data_type: |
- **Signaux de sécurité** : 15 mois
- **Spans** : 90 jours
  - product: Piste d'audit
    data_type: |
- **Logs d'audit (Audit Trail activé)** : 90 jours
- **Logs d'audit (Audit Trail désactivé)** : 7 jours
  - product: Bits AI Dev Agent
    data_type: |
- **Code source** : 7 jours
  - product: RUM Browser
    data_type: |
- **Événements de session, vue, action et erreur** : 30 jours
- **Événements de ressource, tâche longue et signaux vitaux** : 15 jours
  - product: Case Management
    data_type: |
- **Cas** : conservés pendant toute la durée du compte
  - product: CD Visibility
    data_type: |
- **Déploiements** : 30 jours
  - product: CI Pipeline Visibility
    data_type: |
- **Pipelines, étapes, jobs, configurations, commandes** : 15 mois
  - product: Cloud Cost Management
    data_type: |
- **Recommandations** : 90 jours
  - product: Cloud Security
    data_type: |
- **Résultats et vulnérabilités résolues** : 15 mois
  - product: Cloud SIEM
    data_type: |
- **Signaux** : 15 mois
- **Détections, notifications, suppressions** : conservés pendant toute la durée du compte
  - product: Workload Protection
    data_type: |
- **Événements** : 90 jours
- **Signaux de sécurité** : 15 mois
  - product: Code Security SAST
    data_type: |
- **Analyses** : 15 mois
  - product: Code Security IAST
    data_type: |
- **Vulnérabilités détectées** : 15 mois
  - product: Surveillance des conteneurs et des processus
    data_type: |
- **Métadonnées du conteneur** : 2 heures
- **Processus et conteneurs en direct** : 36 heures
- **Définitions YAML** : 7 jours
  - product: Profileur en continu
    data_type: |
- **Profils individuels (non ouverts dans l'interface)** : 8 jours
- **Profils individuels (ouverts au moins une fois dans l'interface)** : 1 an
- **Métriques de profil** : 90 jours
  - product: Tests continus
    data_type: |
- **Résultats de batch** : 2 mois
- **Résultats de tests** : 2 mois
  - product: CoScreen
    data_type: |
- **Sessions** : 15 mois
  - product: "Data Observability : surveillance des jobs"
    data_type: |
- **Traces de jobs** : 90 jours
  - product: Database Monitoring
    data_type: |
- **Échantillons de requêtes** : 15 jours
- **Métriques de requête** : 15 mois
  - product: Application Datadog
    data_type: |
- **Dashboards, notebooks, monitors** : conservés pendant toute la durée du compte
  - product: Métriques DORA
    data_type: |
- **Déploiements** : 2 ans
  - product: Error Tracking
    data_type: |
- **Échantillons d'erreurs** : 30 jours
- **Problèmes** : 1 an après la dernière activité
  - product: Gestion des événements
    data_type: |
- **Événements** : 15 mois
  - product: Incident Management
    data_type: |
- **Incidents** : conservés pendant toute la durée du compte
  - product: LLM Observability
    data_type: |
- **Traces et spans de production** : 15 jours
- **Traces et spans d'expériences** : 90 jours
- **Datasets** : 3 ans
  - product: Log Management
    data_type: |
- **Logs** : selon le plan client
  - product: Métriques
    data_type: |
- **Tags et valeurs** : 15 mois
  - product: Tests d'application mobile
    data_type: |
- **Résultats de tests (non affichés dans l'interface)** : 2 mois
- **Résultats de tests (affichés dans l'interface)** : 15 mois
- **Binaires d'applications mobiles** : conservés pendant toute la durée du compte
  - product: RUM mobile
    data_type: |
- **Événements de session, vue, action et erreur** : 30 jours
- **Événements de ressource, tâche longue et signaux vitaux** : 15 jours
  - product: Surveillance des appareils du réseau
    data_type: |
- **NetFlow** : 15, 30, 60 ou 90 jours, selon le plan client
- **Traps SNMP** : selon le plan client, 15 jours par défaut
  - product: Cloud Network Monitoring
    data_type: |
- **Trafic réseau** : 14 jours
  - product: Chemin réseau
    data_type: |
- **Tests Network Path** : 30 jours
  - product: Analyse des produits
    data_type: |
- **Événements** : 15 mois
- Profils d'utilisateurs** : 30 jours
  - product: Seuils de PR
    data_type: |
- **Évaluations de gate** : 30 jours
  - product: Tables de référence
    data_type: |
- **Tables** : conservées pendant toute la durée du compte
  - product: Catalogue des services
    data_type: |
- **Métadonnées de service** : conservées pendant toute la durée du compte  - product: Service Level Objectives
    data_type: |
- **Résultats des Service Level Objectives** : 15 mois
  - product: Session Replay
    data_type: |
- **Replays (option d'extension dans l'interface non cochée)** : 30 jours
- **Replays (option d'extension dans l'interface cochée)** : 15 mois
  - product: Software Composition Analysis (SCA)
    data_type: |
- **Vulnérabilités détectées** : 15 mois
  - product: Intégration du code source
    data_type: |
- **Code source** : 7 jours
  - product: Synthetics
    data_type: |
- **Résultats de tests (non affichés dans l'interface)** : 2 mois
- **Résultats de tests (affichés dans l'interface)** : 15 mois
  - product: Test Visibility & Intelligent Test Runner
    data_type: |
- **Tests** : 3 mois
  - product: Automatisation de workflows
    data_type: |
- **Workflows** : 30 jours
---

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
