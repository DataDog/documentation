---
aliases:
- /fr/database_monitoring/setup_postgres/supabase/
description: Installez et configurez Database Monitoring pour Supabase avec l'intégration
  Supabase Cloud.
further_reading:
- link: /integrations/supabase-cloud/
  tag: Documentation
  text: Intégration Supabase Cloud
- link: /integrations/postgres/
  tag: Documentation
  text: Intégation Postgres basique
- link: /database_monitoring/setup_postgres/supabase/agent
  tag: Documentation
  text: Configuration Supabase auto-hébergée (installation de l'Agent)
title: Configuration de Database Monitoring pour Supabase Cloud
---
Database Monitoring pour Supabase Cloud offre une visibilité sur vos [bases de données Supabase][3] en exposant des métriques de performance des requêtes et des exemples de requêtes, sans nécessiter de Datadog Agent auto-hébergé.

<div class="alert alert-info">Pour les déploiements Supabase auto-hébergés qui nécessitent un Datadog Agent, consultez <a href="/database_monitoring/setup_postgres/supabase/agent">Configuration Supabase auto-hébergée</a>.</div>

## Prérequis {#prerequisites}

- Un projet Supabase avec une base de données Postgres.
- Votre {{< ui >}}Project ID{{< /ui >}} Supabase (disponible dans les paramètres de votre projet Supabase).
- Votre {{< ui >}}API key{{< /ui >}} Supabase (disponible dans les paramètres de votre projet Supabase sous {{< ui >}}API{{< /ui >}}).
- Un [{{< ui >}}Personal Access Token{{< /ui >}}][4] Supabase avec accès à la Management API.

## Configuration {#setup}

{{< img src="database_monitoring/supabase_cloud_integration_tile.png" alt="Configuration de la tuile d'intégration Supabase Cloud" style="width:80%;" >}}

1. Accédez à la [tuile d'intégration Supabase][1] dans Datadog.
1. Cliquez sur {{< ui >}}Add Account{{< /ui >}}.
1. Saisissez votre {{< ui >}}Project ID{{< /ui >}} et {{< ui >}}API Key{{< /ui >}} Supabase.
1. Sélectionnez {{< ui >}}Enable Database Monitoring for query performance optimizations{{< /ui >}}.
1. Saisissez votre {{< ui >}}Personal Access Token{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Datadog se connecte à votre projet Supabase et commence à collecter les données de télémétrie de Database Monitoring. Aucune installation de l'Agent n'est requise.

<div class="alert alert-info">Chaque projet Supabase doit être configuré séparément. L'ajout de nouveaux projets à un compte Supabase connecté n'active pas automatiquement Database Monitoring.</div>

## Données collectées {#data-collected}

Une fois Database Monitoring activé, Datadog collecte les données de télémétrie suivantes depuis votre base de données Supabase Cloud :

### Métriques de performance des requêtes {#query-performance-metrics}
Métriques provenant de `pg_stat_statements`, collectées toutes les 5 secondes :
- Nombre d'appels et lignes traitées
- Temps d'exécution total et moyen
- Statistiques de succès de cache, de lecture, de modification et d'écriture des tampons partagés et locaux
- Temps de lecture et d'écriture des E/S de bloc
- Nombre de lectures et d'écritures des tampons temporaires

### Échantillons de requêtes {#query-samples}
Instantanés provenant de `pg_stat_activity`, collectés toutes les 5 secondes :
- Instantanés des requêtes actives et inactives
- Texte de requête obfusqué et signatures de requête
- Types et noms d’événements d’attente
- État de la session et type de backend
- PID bloquants
- Agrégats de connexion regroupés par application, état, utilisateur et base de données

### Métadonnées de l'instance de base de données {#database-instance-metadata}
Collectées toutes les 5 minutes :
- Version de PostgreSQL
- Identifiant d'instance et nom d'hôte
- Mode de connexion (direct ou pooler)

## Validez {#validate}

Après la configuration, accédez à la page [Database Monitoring][2] dans Datadog pour consulter les requêtes et les métriques de performance de votre base de données Supabase.

{{< img src="database_monitoring/supabase_cloud_product.png" alt="Vue d’ensemble de Database Monitoring pour une instance Supabase Cloud" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/supabase-cloud
[2]: https://app.datadoghq.com/databases
[3]: https://supabase.com/docs/guides/database/overview
[4]: https://supabase.com/docs/guides/platform/personal-access-tokens