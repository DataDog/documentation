---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: Documentation
  text: Configuration de Postgres
- link: /database_monitoring/setup_postgres/rds
  tag: Documentation
  text: Configuration de Database Monitoring avec Postgres sur Amazon RDS
- link: https://www.datadoghq.com/architecture/dbm-quick-install-aws-rds-postgres/
  tag: Architecture Center
  text: Installation rapide de Datadog DBM pour AWS RDS
title: Installation rapide de Database Monitoring pour Postgres RDS
---
L'installation rapide de Database Monitoring pour RDS vous permet de configurer rapidement des Agents pour surveiller vos instances RDS Postgres. Après avoir spécifié quelques options, Datadog génère un modèle CloudFormation qui configure votre instance pour la surveillance et utilise Amazon ECS pour déployer l'Agent sur l'instance RDS avec les configurations DBM recommandées.

## Prérequis {#prerequisites}

- Un groupe de sécurité doit être configuré sur l'instance pour autoriser les connexions entrantes depuis le VPC de l'instance et les connexions sortantes vers Internet.
- Le nom d'utilisateur et le mot de passe d'accès administrateur de l'instance RDS doivent être stockés dans un secret AWS au sein d'AWS Secrets Manager. Assurez-vous de noter l'Amazon Resource Name (ARN) de ce secret, car Datadog l'utilise pour accéder aux identifiants lors de la configuration et du fonctionnement.

<div class="alert alert-info">Datadog ne stocke pas les identifiants administrateur. Ils sont uniquement utilisés temporairement pour connecter l'Agent, et aucune donnée n'est conservée une fois le processus terminé.</div>

## Installation {#installation}

1. Accédez à la page [Database Monitoring Setup][1].
1. Sous l'onglet {{< ui >}}Unmonitored Hosts{{< /ui >}}, cliquez sur {{< ui >}}Add Agent{{< /ui >}} pour l'instance RDS sur laquelle vous souhaitez installer l'Agent.
1. Si vous n'avez pas de cluster ECS installé pour votre compte et votre région, cliquez sur {{< ui >}}Create Cluster{{< /ui >}}.
1. Sélectionnez un groupe de sécurité dans la liste déroulante {{< ui >}}Security Group{{< /ui >}}.
1. Cliquez sur {{< ui >}}Select API Key{{< /ui >}}, sélectionnez une clé d'API dans la liste, puis cliquez sur {{< ui >}}Use API Key{{< /ui >}}.
1. Cliquez sur {{< ui >}}Launch CloudFormation Stack in AWS Console{{< /ui >}}. Une nouvelle page s'ouvre, affichant l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une pile. Le modèle inclut la configuration requise pour déployer l'Agent afin de surveiller votre instance RDS.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup