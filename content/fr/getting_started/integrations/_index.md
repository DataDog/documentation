---
title: Présentation des intégrations
kind: documentation
aliases:
  - /fr/getting_started/integrations
further_reading:
  - link: 'https://learn.datadoghq.com/'
    tag: Centre d'apprentissage
    text: Présentation de Datadog
  - link: /integrations/
    tag: Intégrations
    text: La liste complète des intégrations de Datadog
---
- [Configurer une intégration](#setting-up-an-integration)
  - [Les clés d'API et d'application](#api-and-application-keys)
  - [Installation](#installation)
  - [Configurer les intégrations de l'Agent](#configuring-agent-integrations)
  - [Tagging](#tagging)
  - [Validation](#validation)
- [Installer plusieurs intégrations](#installing-multiple-integrations)
- [Pratiques de sécurité](#security-practices)
- [La suite ?](#what-s-next)
- [Dépannage](#troubleshooting)
- [Termes clés](#key-terms)
- [Pour aller plus loin](#further-reading)

Il s'agit d'un guide d'utilisation des intégrations. Si vous recherchez des informations sur la création d'une nouvelle intégration, consultez la page [Créer une nouvelle intégration][1].

Au plus haut niveau, une intégration correspond à l'assemblage d'un système unifié à partir d'unités habituellement considérées séparément. Chez Datadog, vous pouvez utiliser les intégrations pour rassembler toutes les métriques et les logs de votre infrastructure et avoir une vue d'ensemble sur le système unifié. Vous pouvez voir les parties individuellement et également comment elles impactent le tout.

**Remarque** : il vaut mieux commencer à recueillir des métriques sur vos projets le plus tôt possible dans le processus de développement, mais vous pouvez commencer à n'importe quelle étape.

Datadog fournit trois types d'intégrations principaux :

* **Les intégrations basées sur l'Agent** sont installées avec l'Agent Datadog et utilisent une classe Python appelée `check` pour définir les métriques à recueillir.
* **Les intégrations basées sur l'authentification (crawler)** sont implémentées dans l'[application Datadog][2] où vous entrez des identifiants pour obtenir des métriques avec l'API. Cela comprend des intégrations populaires comme [Slack][3], [AWS][4], [Azure][5], et [PagerDuty][6].
* **Les intégrations de bibliothèque** utilisent l'[API Datadog][7] pour vous permettre de surveiller des applications en fonction du langage dans lequel elles sont écrites, comme [Node.js][8] ou [Python][9].

Vous pouvez aussi créer un [check custom][10] pour définir et envoyer des métriques à Datadog depuis votre système interne unique.

## Configurer une intégration

Le paquet de l'Agent Datadog inclut les intégrations officiellement prises en charge par Datadog, dans le [cœur d'intégrations][11]. Pour utiliser les intégrations dans le cœur d'intégrations, téléchargez l'Agent Datadog. Les intégrations communautaires se trouvent dans les [intégrations supplémentaires][12], et pour les utiliser, vous devez télécharger le [kit de développement logiciel][13]. Pour en savoir plus sur l'installation ou la gestion de ces intégrations, consultez le [guide de gestion des intégrations][14].

### Les clés d'API et d'application

Pour [installer l'Agent Datadog][15], vous devez disposer d'une [clé d'API][16]. Si l'Agent est déjà téléchargé, veillez à configurer la clé d'API dans le fichier `datadog.yaml`. Pour utiliser la plupart des fonctionnalités Datadog en plus de l'envoi des métriques et des événements, vous devez disposer d'une [clé d'application][16]. Vous pouvez gérer vos clés d'API et d'application depuis la page [API Settings][17] de l'interface graphique.

### Installation

Si vous souhaitez connecter une intégration basée sur une bibliothèque ou un crawler, allez à ce fournisseur sur la page [Integrations][18] pour obtenir des instructions spécifiques sur la manière de se connecter. Pour les autres intégrations prises en charge, installez l'[Agent Datadog][19]. La plupart des intégrations sont prises en charge sur nos agents conteneurisés : [Docker][20] et [Kubernetes][21]. Après avoir téléchargé l'Agent, allez à la section de la [page Integrations][18] pour trouver les instructions de configuration spécifiques pour les intégrations individuelles.

### Configurer les intégrations de l'Agent

Les configurations sont spécifiques aux [intégrations][18]. Dans le répertoire `conf.d/<NOM_INTÉGRATION>.d` à la racine du répertoire de configuration de votre Agent, vous trouverez un répertoire appelé `<NOM_INTÉGRATION>.d` pour chaque intégration officiellement prise en charge par l'Agent, contenant un exemple de fichier `conf.yaml.example` qui énumère toutes les options de configuration disponibles pour cette intégration particulière.

Pour activer une intégration donnée :

1. Renommez le fichier `conf.yaml.example` (dans le répertoire `<NOM_INTÉGRATION>.d` correspondant) en `conf.yaml`.
2. Mettez à jour les paramètres requis dans le nouveau fichier de configuration avec les valeurs correspondant à votre environnement.
3. [Redémarrez l'Agent Datadog][22].

**Remarque** : tous les fichiers de configuration respectent le format documenté dans la [documentation des paramètres][23].

Par exemple, voici le fichier de configuration `conf.yaml` minimal nécessaire pour recueillir des métriques et des logs de l'[intégration apache][24] :

```
init_config:

instances:

  - apache_status_url: http://localhost/server-status?auto

logs:
  - type: file
    path: /var/log/apache2/access.log
    source: apache
    sourcecategory: http_web_access
    service: apache
  - type: file
    path: /var/log/apache2/error.log
    source: apache
    sourcecategory: http_web_access
```

Pour créer plusieurs instances dans le même check de l'Agent pour surveiller deux services Apache, créez une nouvelle instance avec un `-` dans la section `instances:` :

```
init_config:

instances:

  - apache_status_url: http://localhost/server-status?auto

  - apache_status_url: http://<ENDPOINT_APACHE_DISTANT>/server-status?auto
```

### Tagging

Le tagging est un élément clé dans le filtrage et l'agrégation des données arrivant dans Datadog depuis plusieurs sources. Vous pouvez assigner des tags dans les fichiers de configuration, dans les variables d'environnement, dans l'interface graphique, dans l'API et dans DogStatsD. Si vous définissez des tags dans le fichier `datadog.yaml`, les tags sont appliqués à toutes les données de vos intégrations. Une fois le tag défini dans `datadog.yaml`, toutes les nouvelles intégrations en héritent. Si vous utilisez une variable d'environnement de tag, elle s'applique à toutes les intégrations. Si vous définissez les tags dans le fichier de configuration des intégrations correspondantes, ils s'appliquent uniquement à cette intégration spécifique. Si vous utilisez les tags dans les conteneurs, ils s'appliquent uniquement à ce conteneur. Pour en savoir plus sur le tagging, consultez [Débuter avec les tags][25].

### Validation

Pour valider la configuration de votre Agent et de vos intégrations, [lancez la sous-commande `status` de l'Agent][26] et cherchez une nouvelle configuration dans la section Checks.

## Installer plusieurs intégrations

Installer plusieurs intégrations revient à ajouter les informations de configuration à un nouveau fichier `conf.yaml` dans le répertoire `<INTÉGRATIONS>.d`. Cherchez les paramètres requis pour la nouvelle intégration dans le fichier `conf.yaml.example`, ajoutez-les dans le nouveau fichier `conf.yaml`, puis suivez les mêmes étapes pour valider votre configuration.

## Pratiques de sécurité

Pour en savoir plus sur la manière dont Datadog traite vos données et sur d'autres considérations de sécurité, consultez notre [documentation sur la sécurité][27].

## La suite ?

Maintenant que vos premières intégrations sont configurées, vous pouvez commencer à [explorer toutes les métriques][28] envoyées par Datadog à votre application et à utiliser ces métriques pour commencer à configurer des [graphiques][29] et des [alertes][30] pour surveiller vos données.

Consultez également nos solutions de [gestion des logs][31], [APM][32] et [Synthetics][33].

## Dépannage

La première étape de dépannage d'une intégration consiste à utiliser un plug-in dans votre éditeur de code ou à utiliser l'un de nombreux outils en ligne pour vérifier la validité du YAML. L'étape suivante consiste à suivre toutes les étapes de [dépannage de l'Agent][34].

Si les problèmes persistent, contactez [notre superbe équipe d'assistance][35].

## Termes clés

| Terme                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **conf.yaml**          | Vous créez le fichier `conf.yaml` dans le dossier `conf.d/<NOM_INTÉGRATION>` à la racine du [répertoire de configuration de votre Agent][36]. Utilisez ce fichier pour connecter des intégrations à votre système et pour configurer leurs paramètres.                                                                                                                                                                                                                                       |
| **check custom**       | Si vous possédez un système unique que vous souhaitez surveiller, ou si vous allez étendre les métriques déjà envoyées par une intégration, vous pouvez créer un [check custom][10] pour définir et envoyer des métriques à Datadog. Cependant, si vous souhaitez surveiller une application généralement disponible, un service public ou un projet open source, et si nous n'avons pas d'intégration existante pour celui-ci, vous pouvez envisager de [créer une nouvelle intégration][1] plutôt qu'un check custom. |
| **datadog.yaml**       | Il s'agit du fichier de configuration principal où vous définissez comment l'Agent interagit dans son ensemble avec ses propres intégrations et avec votre système. Utilisez ce fichier pour mettre à jour les clés d'API, les proxys, les tags de host et autres paramètres globaux.                                                                                                                                                                                                                                       |
| **événement**              | Les événements sont des messages informatifs sur votre système, utilisés par le [flux d'événements][37] pour vous permettre de créer des monitors sur ces derniers.                                                                                                                                                                                                                                                                                                                           |
| **instance**           | Vous définissez et mappez l'instance de ce que vous surveillez dans le fichier `conf.yaml`. Par exemple, dans [l'intégration `http_check`][38], vous définissez le nom associé à l'instance de l'endpoint HTTP que vous surveillez uptime et downtime. Vous pouvez surveiller **plusieurs instances** dans la même intégration en définissant toutes les instances dans le fichier `conf.yaml`.                                                               |
| **nom_intégration.d** | Si vous avez une configuration complexe, vous pouvez la décomposer en plusieurs fichiers `YAML`, puis les stocker dans le répertoire `<NOM_INTÉGRATION>.d` pour définir la configuration. L'Agent charge tous les fichiers `YAML` valides dans le répertoire `<NOM_INTÉGRATION>.d`.                                                                                                                                                                                                       |
| **journalisation**            | Si le système que vous surveillez a des logs, vous pouvez personnaliser les logs que vous envoyez à Datadog et utiliser notre [solution de gestion de la journalisation][31] pour les gérer et les analyser.                                                                                                                                                                                                                                                                                         |
| **metadata.csv**       | Le fichier qui énumère et stocke les métriques recueillies par chaque intégration.                                                                                                                                                                                                                                                                                                                                                                                          |
| **métriques**            | La liste des éléments recueillis à partir de votre système par chaque intégration. Vous pouvez trouver les métriques pour chaque intégration dans le fichier `metadata.csv` de cette intégration. Pour en savoir plus sur les métriques, consultez la page de développement des [métriques][39]. Vous pouvez aussi configurer des [métriques custom][40]. De cette manière, si l'intégration n'offre pas de métrique par défaut, vous pouvez généralement en ajouter une.                                                                                               |
| **paramètres**         | Utilisez les paramètres dans le fichier `conf.yaml` pour contrôler les accès entre la source de données de votre intégration et l'Agent. Le fichier `conf.yaml.example` des intégrations individuelles énumère tous les paramètres obligatoires et facultatifs.                                                                                                                                                                                                                                |
| **check de service**      | Les checks de service sont un type de monitor utilisé pour le suivi du statut de disponibilité du service. Pour en savoir plus, consultez le [guide des checks de service][41].                                                                                                                                                                                                                                                                                                                     |
| **tagging**            | Les [tags][25] permettent de personnaliser les métriques pour les trier et les visualiser de la manière la plus utile pour vous.                                                                                                                                                                                                                                                                                                                                      |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/integrations/new_check_howto
[2]: https://app.datadoghq.com/account/settings
[3]: /fr/integrations/slack
[4]: /fr/integrations/amazon_web_services
[5]: /fr/integrations/azure
[6]: /fr/integrations/pagerduty
[7]: /fr/api
[8]: /fr/integrations/node
[9]: /fr/integrations/python
[10]: /fr/developers/write_agent_check/?tab=agentv6
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[13]: /fr/developers/integrations/new_check_howto/#developer-toolkit
[14]: /fr/agent/guide/integration-management
[15]: https://github.com/DataDog/dd-agent
[16]: /fr/account_management/api-app-keys
[17]: https://app.datadoghq.com/account/settings#api
[18]: /fr/integrations
[19]: https://app.datadoghq.com/account/settings#agent
[20]: https://app.datadoghq.com/account/settings#agent/docker
[21]: https://app.datadoghq.com/account/settings#agent/kubernetes
[22]: /fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[23]: /fr/developers/integrations/new_check_howto/#param-specification
[24]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[25]: /fr/tagging
[26]: /fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[27]: /fr/security
[28]: /fr/graphing/metrics/explorer
[29]: /fr/graphing
[30]: /fr/monitors
[31]: /fr/logs
[32]: /fr/tracing
[33]: /fr/synthetics
[34]: /fr/agent/troubleshooting/?tab=agentv6
[35]: /fr/help
[36]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[37]: https://app.datadoghq.com/event/stream
[38]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[39]: /fr/developers/metrics
[40]: /fr/developers/metrics/custom_metrics
[41]: /fr/monitors/guide/visualize-your-service-check-in-the-datadog-ui