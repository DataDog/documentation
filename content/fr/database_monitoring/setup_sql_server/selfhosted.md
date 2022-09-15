---
description: Installer et configurer Database Monitoring pour SQL Server auto-hébergé
further_reading:
- link: /integrations/sqlserver/
  tag: Documentation
  text: Intégration SQL Server basique
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentation
  text: Résoudre les problèmes courants
kind: documentation
title: Configuration de Database Monitoring pour SQL Server auto-hébergé
---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

<div class="alert alert-warning">La solution Database Monitoring pour SQL Server est en version bêta privée. Contactez votre chargé de compte pour demander l'accès à la version bêta.</div>

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Microsoft SQL Server, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, ainsi que des états, des failovers et des événements de base de données.

Pour activer la solution Database Monitoring pour votre base de données, suivez les étapes ci-dessous :

1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
2. [Installer l'Agent](#installer-l-agent)

## Avant de commencer

{{% dbm-sqlserver-before-you-begin %}}

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour le serveur de base de données, afin de pouvoir recueillir les statistiques et requêtes.

Créez une connexion en lecture seule pour vous connecter au serveur en attribuant les autorisations requises :

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<MOT_DE_PASSE>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
```

## Installer l'Agent

Il est conseillé d'installer directement l'Agent sur le host SQL Server. En effet, cette approche permet à l'Agent de recueillir de nombreuses données de télémétrie système (processeur, mémoire, disque, réseau), en plus des données de télémétrie propres à SQL Server.

{{< tabs >}}
{{% tab "Host Windows" %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Host Linux" %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}