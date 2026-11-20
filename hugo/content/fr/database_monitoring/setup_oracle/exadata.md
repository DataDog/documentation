---
description: Installer et configurer Database Monitoring pour Oracle Exadata
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Intégration Oracle de base
title: Configurer Database Monitoring pour Oracle Exadata
---

{{% dbm-oracle-definition %}}

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule.

## Avant de commencer

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Impact sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est conservative, mais vous pouvez ajuster des paramètres tels que l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des charges de travail, l'Agent représente moins d'un pourcent du temps d'exécution des requêtes sur la base de données et moins d'un pourcent du CPU. <br/><br/>
Database Monitoring s'exécute en tant qu'intégration par-dessus l'Agent de base ([voir les benchmarks][6]).

Proxies, répartiteurs de charge et poolers de connexion
: L'Agent doit se connecter directement au host surveillé. L'Agent ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge ou un pooler de connexion. Chaque Agent doit connaître le nom d'hôte sous-jacent et doit rester associé à un seul host pendant toute sa durée de vie, même en cas de basculement. Si l'Agent Datadog se connecte à différents hosts pendant son exécution, les valeurs des métriques seront incorrectes.

Considérations relatives à la sécurité des données
: Consultez la section [Informations sensibles][7] pour en savoir plus sur les données que l'Agent collecte depuis vos bases de données et sur la façon de garantir leur sécurité.

## Configuration

Effectuez les opérations suivantes pour activer Database Monitoring avec votre base de données Oracle :

1. [Créer l'utilisateur Datadog](#créer-lutilisateur-datadog)
1. [Installer l'Agent](#installer-l-agent)
1. [Configurer l'Agent](#configurer-lagent)
1. [Installer ou vérifier l'intégration Oracle](#installer-ou-vérifier-lintégration-oracle)
1. [Valider la configuration](#valider-la-configuration)

### Créer l'utilisateur Datadog 

{{% dbm-create-oracle-user %}}

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

### Installer l'Agent

Consultez la documentation [Architecture de configuration DBM][12] pour déterminer où installer l'Agent. L'Agent ne nécessite aucun client Oracle externe.

Pour les étapes d'installation, consultez les [instructions d'installation de l'Agent][9].

### Configurer l'Agent

#### Exadata multi-nœuds

Configurez l'Agent pour chaque nœud en suivant les instructions pour [Oracle RAC][4].

#### Exadata mono-nœud

Configurez l'Agent en suivant les instructions pour les [bases de données Oracle auto-hébergées][3].

### Valider la configuration

[Exécutez la sous-commande status de l'Agent][1] et recherchez `oracle` dans la section **Checks**. Accédez au [dashboard][11] et à la page [Databases][2] dans Datadog pour commencer.

## Requêtes personnalisées

Database Monitoring prend en charge les requêtes custom pour les bases de données Oracle. Consultez le fichier [conf.yaml.example][5] pour en savoir plus sur les options de configuration disponibles.

<div class="alert alert-danger">L'exécution de requêtes custom peut entraîner des coûts ou des frais supplémentaires facturés par Oracle.</div>

[1]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[2]: https://app.datadoghq.com/databases
[3]: /fr/database_monitoring/setup_oracle/selfhosted
[4]: /fr/database_monitoring/setup_oracle/rac
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[6]: /fr/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: /fr/database_monitoring/data_collected/#sensitive-information
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[9]: https://app.datadoghq.com/account/settings/agent/latest
[10]: https://app.datadoghq.com/integrations/oracle
[11]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[12]: /fr/database_monitoring/architecture/

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}