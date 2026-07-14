---
description: Installer et configurer Database Monitoring pour SQL Server auto-hébergé
further_reading:
- link: /integrations/sqlserver/
  tag: Documentation
  text: Intégration SQL Server basique
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentation
  text: Résoudre les problèmes courants
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentation
  text: Configurer la surveillance des blocages
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentation
  text: Configurer la collecte des complétions et des erreurs de requêtes
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capturer les valeurs des paramètres de requête SQL
- link: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  tag: Blog
  text: Planifier votre migration Azure pour les workloads SQL avec Datadog
- link: https://www.datadoghq.com/blog/datadog-monitoring-always-on/
  tag: Blog
  text: Surveiller vos groupes de disponibilité AlwaysOn avec la solution Database
    Monitoring Datadog
title: Configuration de Database Monitoring pour SQL Server auto-hébergé
---
La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Microsoft SQL Server, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

Pour activer la solution Database Monitoring pour votre base de données, suivez les étapes ci-dessous :

1. [Accorder l'accès à l'Agent](#grant-the-agent-access)
1. [Installer l'Agent](#install-the-agent)

## Avant de commencer {#before-you-begin}

Versions de SQL Server prises en charge
: 2012, 2014, 2016, 2017, 2019, 2022, 2025 (nécessite l'Agent 7.79+)

{{% dbm-sqlserver-before-you-begin %}}

## Accorder l'accès à l'Agent {#grant-the-agent-access}

L'Agent Datadog requiert un accès en lecture seule au serveur de base de données afin de pouvoir recueillir les statistiques et requêtes.

Créez une connexion en lecture seule pour vous connecter au serveur en attribuant les autorisations requises :

{{< tabs >}}
{{% tab "SQL Server 2014+" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

Créer le `datadog` utilisateur dans chaque base de données d'application supplémentaire :

```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}
{{% dbm-secret %}}

## Installer l'Agent {#install-the-agent}

Il est conseillé d'installer directement l'Agent sur le host SQL Server. En effet, cette approche permet à l'Agent de recueillir de nombreuses données de télémétrie système (processeur, mémoire, disque, réseau), en plus des données de télémétrie propres à SQL Server.

{{< tabs >}}
{{% tab "Hôte Windows" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Hôte Linux" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{< /tabs >}}

## Exemples de configurations d'Agent {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}