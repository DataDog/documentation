---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: Centre d'apprentissage
  text: Présentation des intégrations
- link: /integrations/
  tag: Documentation
  text: Afficher la liste des intégrations Datadog
kind: documentation
title: Présentation des intégrations
---

## Présentation

Ce guide décrit comment utiliser les intégrations. Si vous souhaitez découvrir comment créer une nouvelle intégration, consultez la page [Créer une nouvelle intégration][1].

Au plus haut niveau, une intégration correspond à l'assemblage d'un système unifié à partir d'unités habituellement considérées séparément. Avec Datadog, vous pouvez utiliser des intégrations pour rassembler toutes les métriques et tous les logs de votre infrastructure afin d'analyser le système dans son ensemble. Chaque composant, ainsi que son impact sur les autres éléments de votre infrastructure, peuvent être étudiés en détail.

**Remarque** : nous vous conseillons de mettre en place la collecte de métriques sur vos projets le plus tôt possible dans le processus de développement, mais vous pouvez commencer à n'importe quelle étape.

Datadog propose trois grands types d'intégrations :

- Les intégrations **basées sur l'Agent** sont installées avec l'Agent Datadog et utilisent une méthode de classe Python appelée `check` pour définir les métriques à recueillir.
- Les intégrations **basées sur un système d'authentification (crawler)** sont configurées dans l'[application Datadog][2], où vous entrez des identifiants pour récupérer des métriques avec l'API. Il s'agit notamment d'intégrations populaires telles que [Slack][3], [AWS][4], [Azure][5], et [PagerDuty][6].
- Les intégrations de **bibliothèque** utilisent l'[API Datadog][7] pour vous permettre de surveiller des applications en fonction du langage dans lequel elles sont écrites, comme [Node.js][8] ou [Python][9].

Vous pouvez aussi créer un [check custom][10] pour définir et envoyer des métriques à Datadog depuis un système interne unique.

## Configurer une intégration

Le package de l'Agent Datadog inclut les intégrations officiellement prises en charge par Datadog dans [integrations-core][11]. Pour utiliser ces intégrations, téléchargez l'Agent Datadog. Les intégrations développées par la communauté se trouvent dans [integrations-extras][12]. Pour en savoir plus sur l'installation ou la gestion de ces intégrations, consultez le [guide de gestion des intégrations][14].

### Autorisations

L'autorisation `manage_integrations` est requise pour interagir avec un carré dʼintégration. Consultez la section relative aux [rôles RBAC][45] pour en savoir plus.

### Clés d'API et d'application

Pour [installer l'Agent Datadog][15], vous devez disposer d'une [clé d'API][16]. Si l'Agent est déjà téléchargé, veillez à configurer votre clé d'API dans le fichier `datadog.yaml`. Pour utiliser la plupart des fonctionnalités Datadog et envoyer des métriques et des événements, vous devez disposer d'une [clé d'application][16]. Accédez à la page [API Settings][17] pour gérer vos clés d'API et d'application.

### Installation

Si vous souhaitez connecter une intégration basée sur une bibliothèque ou un crawler, des instructions spécifiques à chaque fournisseur sont disponibles sur la [page Intégrations][18]. Pour les autres intégrations prises en charge, installez l'[Agent Datadog][15]. La plupart des intégrations sont prises en charge sur nos Agents conteneurisés : [Docker][19] et [Kubernetes][20]. Une fois l'Agent téléchargé, accédez à la [page Intégrations][18] pour consulter les instructions dédiées à votre intégration.

### Configurer les intégrations de l'Agent

La plupart des paramètres de configuration sont spécifiques à [chaque intégration][18]. Configurez les intégrations de l'Agent en accédant au dossier `conf.d` à la racine du répertoire de configuration de votre Agent. Chaque intégration dispose d'un dossier nommé `<NOM_INTÉGRATION>.d`, contenant le fichier `conf.yaml.example`. Cet exemple de fichier énumère toutes les options de configuration disponibles pour cette intégration spécifique.

Pour activer une intégration donnée :

1. Renommez le fichier `conf.yaml.example` (dans le dossier `<NOM_INTÉGRATION>.d` correspondant) en `conf.yaml`.
2. Dans le nouveau fichier de configuration, modifiez les paramètres requis avec les valeurs correspondant à votre environnement.
3. [Redémarrez l'Agent Datadog][21].

**Remarque** : tous les fichiers de configuration respectent le format décrit sous la [spécification @param][22].

Par exemple, voici le fichier de configuration `conf.yaml` minimal nécessaire pour recueillir des métriques et des logs de l'[intégration apache][23] :

```yaml
init_config:
  service: apache

instances:
    - apache_status_url: http://localhost/server-status?auto

logs:
    - type: file
      path: /var/log/apache2/access.log
      source: apache
      sourcecategory: http_web_access
    - type: file
      path: /var/log/apache2/error.log
      source: apache
      sourcecategory: http_web_access
```

Pour surveiller plusieurs instances Apache dans un même check d'Agent, ajoutez des instances supplémentaires à la section `instances` :

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<ENDPOINT_APACHE_DISTANT>/server-status?auto"
      service: remote-apache
```

#### Intervalle de collecte

L'intervalle de collecte par défaut pour toutes les intégrations Datadog standard est de 15 secondes. Pour modifier l'intervalle de collecte, utilisez le paramètre `min_collection_interval`. Pour en savoir plus, consultez la rubrique [Modification de l'intervalle de collecte][24].

### Tags

L'ajout de tags est essentiel pour être en mesure de filtrer et d'agréger les données envoyées à Datadog depuis plusieurs sources. Pour en savoir plus sur les tags, consultez la section [Débuter avec les tags][25].

Si vous définissez des tags dans le fichier `datadog.yaml`, ils sont appliqués aux données de toutes vos intégrations. Une fois votre tag défini dans `datadog.yaml`, toutes les nouvelles intégrations en héritent.

Par exemple, il est conseillé d'utiliser `service` pour la [configuration de l'Agent][26] lors de la surveillance de systèmes distincts et indépendants.

Pour mieux unifier votre environnement, il est également recommandé de configurer le tag `env` dans l'Agent. Pour en savoir plus, consultez la section relative au [tagging de service unifié][27].

Par défaut, les métriques transmises par les intégrations comprennent des tags découverts automatiquement dans l'environnement. Par exemple, les métriques transmises par un check Redis exécuté à l'intérieur d'un conteneur comprennent des tags associés au conteneur, tels que `image_name`. Vous pouvez désactiver ce comportement en définissant le paramètre `ignore_autodiscovery_tags` sur `true` :
```yaml
init_config:

ignore_autodiscovery_tags: true

# Insérer le reste de la configuration ici
```

### Validation

Pour valider la configuration de votre Agent et de vos intégrations, [lancez la sous-commande `status` de l'Agent][28] et cherchez votre nouvelle configuration dans la section Checks.

## Installer plusieurs intégrations

L'installation de plusieurs intégrations revient nécessite d'ajouter les informations de configuration à un nouveau fichier `conf.yaml` dans le dossier `<INTEGRATIONS>.d`. Cherchez les paramètres obligatoires pour la nouvelle intégration dans le fichier `conf.yaml.example`, ajoutez-les dans le nouveau fichier `conf.yaml`, puis suivez les mêmes étapes pour valider votre configuration.

## Intégrations détectées automatiquement

Si vous avez configuré la [collecte de processus][29], Datadog détecte automatiquement les technologies qui s'exécutent sur vos hosts. Cette opération permet d'identifier les intégrations Datadog qui peuvent vous aider à surveiller ces technologies. Les intégrations détectées automatiquement s'affichent dans la [recherche d'intégrations][2] :

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="Intégrations détectées automatiquement" >}}

Chaque intégration possède l'un des trois statuts suivants :

- **Detected** : la technologie s'exécute sur un host, mais l'intégration n'a pas été installée ou configurée. Pour cette raison, seule une partie des métriques est recueillie. Configurez l'intégration pour en profiter pleinement. Pour obtenir la liste des hosts qui exécutent une technologie détectée automatiquement, ouvrez le carré de l'intégration, puis sélectionnez l'onglet **Hosts**.
- **Installed** : l'intégration est installée et configurée sur un host.
- **Available** : cette catégorie rassemble toutes les intégrations qui ne possèdent pas le statut **Installed** ni **Detected**.

## Mesures de sécurité

Pour en savoir plus sur la manière dont Datadog traite vos données et sur d'autres aspects de la sécurité, consultez notre [documentation dédiée][30].

## Et ensuite ?

Maintenant que votre première intégration est configurée, [explorez toutes les métriques][31] envoyées par votre application à Datadog et utilisez ces métriques pour configurer des [dashboards][32] et des [alertes][33] afin de surveiller vos données.

Découvrez également les solutions [Log Management][34], [APM][35] et [surveillance Synthetic][36] de Datadog.

## Dépannage

Lorsque vous dépannez une intégration, il est nécessaire de commencer par vérifier la validité du YAML en utilisant un plug-in dans votre éditeur de code ou en faisant appel à l'un des nombreux outils en ligne dédiés. Ensuite, la procédure consiste à suivre toutes les étapes de la section [Dépannage de l'Agent][37].

Si vos problèmes persistent, contactez l'[assistance Datadog][38].

## Termes clés

`conf.yaml`
: Le fichier `conf.yaml` doit être créé dans le dossier `conf.d/<NOM_INTÉGRATION>.d` à la racine du [répertoire de configuration de votre Agent][39]. Utilisez ce fichier pour connecter des intégrations à votre système et pour configurer leurs paramètres.

Check custom
: Si vous utilisez un système privé que vous souhaitez surveiller, ou si vous voulez envoyer des métriques supplémentaires à partir d'une intégration, vous pouvez créer un [check custom][10] pour définir des métriques et les envoyer à Datadog. Toutefois, si vous cherchez à surveiller une application disponible librement, un service public ou un projet open source qui ne bénéficie d'aucune intégration, envisagez de [créer une nouvelle intégration][1] plutôt qu'un check custom.

`datadog.yaml`
: Il s'agit du fichier de configuration principal au sein duquel vous définissez la façon dont l'Agent dans son ensemble interagit avec ses propres intégrations et avec votre système. Utilisez ce fichier pour mettre à jour les clés d'API, les proxies, les tags de host et d'autres paramètres généraux.

Événement
: Les événements sont des messages informatifs sur votre système. Ils sont transmis à l'[Events Explorer][40] pour vous permettre de créer des monitors en fonction de ces événements.

Instance
: Chaque instance de ce que vous surveillez doit être définie et mappée dans le fichier `conf.yaml`. Par exemple, pour l'[intégration `http_check`][41], vous devez définir le nom associé à l'instance de l'endpoint HTTP dont vous surveillez l'uptime et le downtime. Vous pouvez surveiller **plusieurs instances** dans une même intégration en définissant toutes les instances dans le fichier `conf.yaml`.

`<NOM_INTÉGRATION>.d`
: Si votre configuration est complexe, vous pouvez la décomposer en plusieurs fichiers `YAML`, puis placer tous les fichiers dans le dossier `<NOM_INTÉGRATION>.d` pour définir la configuration. L'Agent charge tous les fichiers `YAML` valides dans le dossier `<NOM_INTÉGRATION>.d`.

Logging
: Si le système que vous surveillez génère des logs, personnalisez les logs que vous envoyez à Datadog à l'aide de la [solution Log Management][34].

`metadata.csv`
: Ce fichier énumère et stocke les métriques recueillies par chaque intégration.

Métriques
: La liste des données recueillies à partir de votre système par chaque intégration. La liste des métriques de chaque intégration se trouve dans le fichier `metadata.csv` correspondant à cette intégration. Pour en savoir plus sur les métriques, consultez la [page sur les métriques dédiée aux développeurs][42]. Vous pouvez également configurer des [métriques custom][43] afin d'ajouter des métriques qui ne sont pas proposées par défaut avec l'intégration.

Paramètres
: Utilisez les paramètres dans le fichier `conf.yaml` pour contrôler les accès entre la source de données de votre intégration et l'Agent. Le fichier `conf.yaml.example` de chaque intégration énumère l'ensemble des paramètres obligatoires et facultatifs.

Check de service
: Les checks de service sont un type de monitor utilisé pour surveiller le statut de disponibilité du service. Pour en savoir plus, consultez le [guide sur les checks de service][44].

Tags
: Les [tags][25] permettent de personnaliser les métriques pour les trier et les visualiser comme bon vous semble.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /fr/integrations/slack/
[4]: /fr/integrations/amazon_web_services/
[5]: /fr/integrations/azure/
[6]: /fr/integrations/pagerduty/
[7]: /fr/api/
[8]: /fr/integrations/node/
[9]: /fr/integrations/python/
[10]: /fr/developers/custom_checks/write_agent_check/
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[14]: /fr/agent/guide/integration-management/
[15]: https://app.datadoghq.com/account/settings/agent/latest
[16]: /fr/account_management/api-app-keys/
[17]: https://app.datadoghq.com/organization-settings/api-keys
[18]: /fr/integrations/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[20]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[21]: /fr/agent/guide/agent-commands/#restart-the-agent
[22]: /fr/developers/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /fr/developers/custom_checks/write_agent_check/#updating-the-collection-interval
[25]: /fr/getting_started/tagging/
[26]: /fr/getting_started/agent/#setup
[27]: /fr/getting_started/tagging/unified_service_tagging/
[28]: /fr/agent/guide/agent-commands/#agent-status-and-information
[29]: /fr/infrastructure/process/
[30]: /fr/data_security/
[31]: /fr/metrics/explorer/
[32]: /fr/dashboards/
[33]: /fr/monitors/
[34]: /fr/logs/
[35]: /fr/tracing/
[36]: /fr/synthetics/
[37]: /fr/agent/troubleshooting/
[38]: /fr/help/
[39]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[40]: https://app.datadoghq.com/event/explorer
[41]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[42]: /fr/metrics/
[43]: /fr/metrics/custom_metrics/
[44]: /fr/monitors/guide/visualize-your-service-check-in-the-datadog-ui/
[45]: /fr/account_management/rbac/permissions/#integrations