---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: Documentation
  text: Configuration de Postgres
- link: /database_monitoring/setup_postgres/rds
  tag: Documentation
  text: Configuration de Database Monitoring pour Postgres avec une gestion sur Amazon RDS
title: Installation rapide de Database Monitoring pour Postgres RDS
---

L'installation rapide de Database Monitoring pour RDS vous permet de configurer rapidement des Agents pour surveiller vos instances RDS Postgres. Une fois quelques options définies, Datadog génère un modèle CloudFormation qui configure votre instance pour la surveillance et utilise Amazon ECS pour déployer l'Agent sur l'instance RDS avec les configurations DBM recommandées.

## Prérequis

- Un groupe de sécurité doit être configuré sur l'instance pour autoriser les connexions entrantes depuis le VPC de l'instance et les connexions sortantes vers Internet.
- Le nom d'utilisateur et le mot de passe d'accès administrateur de l'instance RDS doivent être stockés dans un secret AWS au sein d'AWS Secrets Manager. Notez le nom de ressource Amazon (ARN) de ce secret, car Datadog l'utilise pour accéder aux identifiants lors de la configuration et du fonctionnement.

<div class="alert alert-info">Datadog ne stocke pas les identifiants administrateur. Ils sont uniquement utilisés temporairement pour connecter l'Agent, et aucune donnée n'est conservée une fois le processus terminé.</div>

## Installation

1. Accédez à la page [Database Monitoring Setup][1].
1. Dans l'onglet **Unmonitored Hosts**, cliquez sur **Add Agent** pour l'instance RDS sur laquelle vous souhaitez installer l'Agent.
1. Si vous ne disposez pas d'un cluster ECS installé pour votre compte et votre région, cliquez sur **Create Cluster**.
1. Sélectionnez un groupe de sécurité dans la liste déroulante **Security Group**.
1. Cliquez sur **Select API Key**, sélectionnez une clé d'API dans la liste, puis cliquez sur **Use API Key**.
1. Cliquez sur **Launch CloudFormation Stack in AWS Console**. Une nouvelle page s'ouvre et affiche l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une stack. Le modèle inclut la configuration requise pour déployer l'Agent afin de surveiller votre instance RDS.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup