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
    text: Liste complète des intégrations Datadog
---
Ce guide décrit comment utiliser les intégrations Datadog. Si vous souhaitez découvrir comment créer une nouvelle intégration, consultez la page [Créer une nouvelle intégration][1].

Au plus haut niveau, une intégration correspond à l'assemblage d'un système unifié à partir d'unités habituellement considérées séparément. Avec Datadog, vous pouvez utiliser des intégrations pour rassembler toutes les métriques et tous les logs de votre infrastructure afin d'analyser le système dans son ensemble. Chaque composant, ainsi que son impact sur les autres éléments de votre infrastructure, peuvent être étudiés en détail.

**Remarque** : nous vous conseillons de mettre en place la collecte de métriques sur vos projets le plus tôt possible dans le processus de développement, mais vous pouvez commencer à n'importe quelle étape.

Datadog propose trois grands types d'intégrations :

- Les intégrations **basées sur l'Agent** sont installées avec l'Agent Datadog et utilisent une méthode de classe Python appelée `check` pour définir les métriques à recueillir.
- Les intégrations **basées sur un système d'authentification (crawler)** sont configurées dans l'[application Datadog][2], où vous entrez des identifiants pour récupérer des métriques avec l'API. Il s'agit notamment d'intégrations populaires telles que [Slack][3], [AWS][4], [Azure][5], et [PagerDuty][6].
- Les intégrations de **bibliothèque** utilisent l'[API Datadog][7] pour vous permettre de surveiller des applications en fonction du langage dans lequel elles sont écrites, comme [Node.js][8] ou [Python][9].

Vous pouvez aussi créer un [check custom][10] pour définir et envoyer des métriques à Datadog depuis un système interne unique.

## Configurer une intégration

Le paquet de l'Agent Datadog inclut les intégrations officiellement prises en charge par Datadog dans [integrations-core][11]. Pour utiliser ces intégrations, téléchargez l'Agent Datadog. Les intégrations développées par la communauté se trouvent dans [integrations-extras][12] et nécessitent de télécharger le [kit de développement logiciel][13] pour être utilisées. Pour en savoir plus sur l'installation ou la gestion de ces intégrations, consultez le [guide de gestion des intégrations][14].

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

**Remarque** : tous les fichiers de configuration respectent le format décrit dans la [documentation des paramètres][22].

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

Pour créer plusieurs instances dans un même check d'Agent et surveiller deux services Apache, créez une nouvelle instance avec un `-` dans la section `instances` :

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<ENDPOINT_APACHE_DISTANT>/server-status?auto"
      service: remote-apache
```

#### Intervalle de collecte

L'intervalle de collecte par défaut pour toutes les intégrations Datadog standard est de 15 secondes. Pour modifier l'intervalle de collecte, utilisez le paramètre `min_collection_interval`. Pour en savoir plus, consultez la [documentation dédiée aux développeurs][24].

### Tagging

L'ajout de tags est essentiel pour être en mesure de filtrer et d'agréger les données envoyées à Datadog depuis plusieurs sources. Pour en savoir plus sur les tags, consultez la section [Débuter avec les tags][25].

Si vous définissez des tags dans le fichier `datadog.yaml`, ils sont appliqués aux données de toutes vos intégrations. Une fois votre tag défini dans `datadog.yaml`, toutes les nouvelles intégrations en héritent.

Par exemple, il est conseillé d'utiliser `service` pour la [configuration de l'Agent][26] lors de la surveillance de systèmes distincts et indépendants.

Pour mieux unifier votre environnement, nous vous recommandons également de configurer le tag `env` dans l'Agent. Pour en savoir plus sur le tagging de service unifié, consultez la [section dédiée][12].

### Validation

Pour valider la configuration de votre Agent et de vos intégrations, [lancez la sous-commande `status` de l'Agent][27] et cherchez une nouvelle configuration dans la section Checks.

## Installer plusieurs intégrations

L'installation de plusieurs intégrations revient nécessite d'ajouter les informations de configuration à un nouveau fichier `conf.yaml` dans le dossier `<INTEGRATIONS>.d`. Cherchez les paramètres obligatoires pour la nouvelle intégration dans le fichier `conf.yaml.example`, ajoutez-les dans le nouveau fichier `conf.yaml`, puis suivez les mêmes étapes pour valider votre configuration.

## Intégrations détectées automatiquement

Si vous avez configuré la [collecte de processus][28], Datadog détecte automatiquement les technologies qui s'exécutent sur vos hosts. Cette opération permet d'identifier les intégrations Datadog qui peuvent vous aider à surveiller ces technologies. Les intégrations détectées automatiquement s'affichent dans la [recherche d'intégrations][2] :

{{< img src="getting_started/integrations/ad_integrations.png" alt="Intégrations détectées automatiquement" >}}

Chaque intégration possède l'un des deux types de statuts suivants :

- **+ Detected** : cette intégration n'est activée sur aucun host qui l'exécute.
- **✓ Partial Visibility** : cette intégration est activée sur certains hosts, mais pas sur tous les hosts pertinents qui l'exécutent.

Les hosts qui exécutent l'intégration, mais sur lesquels l'intégration n'est pas activée, se trouvent dans l'onglet **Hosts** du carré de l'intégration.

## Mesures de sécurité

Pour en savoir plus sur la manière dont Datadog traite vos données et sur d'autres questions de sécurité, consultez notre [documentation dédiée][29].

## Et ensuite ?

Maintenant que vos premières intégrations sont configurées, vous pouvez commencer à [explorer toutes les métriques][30] envoyées par votre application à Datadog et à utiliser ces métriques pour configurer des [dashboards][31] et des [alertes][32] afin de surveiller vos données.

Découvrez également nos solutions [Log Management][33], [APM][34] et [surveillance Synthetic][35].

## Dépannage

Lorsque vous dépannez une intégration, il est nécessaire de commencer par vérifier la validité du YAML en utilisant un plug-in dans votre éditeur de code ou en faisant appel à l'un des nombreux outils en ligne dédiés. Ensuite, la procédure consiste à suivre toutes les étapes de la section [Dépannage de l'Agent][36].

Si les problèmes persistent, contactez [notre formidable équipe d'assistance][37].

## Termes clés

`conf.yaml`
: Le fichier `conf.yaml` doit être créé dans le dossier `conf.d/<NOM_INTÉGRATION>` à la racine du [répertoire de configuration de votre Agent][38]. Utilisez ce fichier pour connecter des intégrations à votre système et pour configurer leurs paramètres.

Check custom
: Si vous utilisez un système privé que vous souhaitez surveiller, ou si vous voulez envoyer des métriques supplémentaires à partir d'une intégration, vous pouvez créer un [check custom][10] pour définir des métriques et les envoyer à Datadog. Toutefois, si vous souhaitez surveiller une application disponible librement, un service public ou un projet open source qui ne bénéficie d'aucune intégration dédiée, nous vous conseillons de [créer une nouvelle intégration][1] plutôt qu'un check custom.

`datadog.yaml`
: Il s'agit du fichier de configuration principal où vous définissez comment l'Agent dans son ensemble interagit avec ses propres intégrations et avec votre système. Utilisez ce fichier pour mettre à jour les clés d'API, les proxys, les tags de host et d'autres paramètres généraux. 
Événement
: Les événements sont des messages qui vous informent sur votre système. Ils sont recueillis dans le [flux d'événements][39]. Vous pouvez créer des monitors basés sur les événements.

Instance
: Chaque instance de ce que vous surveillez doit être définie et mappée dans le fichier `conf.yaml`. Par exemple, pour l'[intégration `http_check`][40], vous devez définir le nom associé à l'instance de l'endpoint HTTP dont vous surveillez l'uptime et le downtime. Vous pouvez surveiller **plusieurs instances** dans une même intégration en définissant toutes les instances dans le fichier `conf.yaml`.

`<NOM_INTÉGRATION>.d`
: Si votre configuration est complexe, vous pouvez la décomposer en plusieurs fichiers `YAML`, puis placer tous les fichiers dans le dossier `<NOM_INTÉGRATION>.d` pour définir la configuration. L'Agent charge tous les fichiers `YAML` valides dans le dossier `<NOM_INTÉGRATION>.d`.

Logs
: Si le système que vous surveillez génère des logs, vous pouvez personnaliser les logs que vous envoyez à Datadog et utiliser notre [solution Log Management][33] pour les gérer et les analyser.

`metadata.csv`
: Ce fichier énumère et stocke les métriques recueillies par chaque intégration.

Métriques
: La liste des données recueillies à partir de votre système par chaque intégration. La liste des métriques de chaque intégration se trouve dans le fichier `metadata.csv` correspondant à cette intégration. Pour en savoir plus sur les métriques, consultez la [page sur les métriques dédiée aux développeurs][41]. Vous pouvez également configurer des [métriques custom][42] afin d'ajouter des métriques qui ne sont pas proposées par défaut avec l'intégration.

Paramètres
: Utilisez les paramètres dans le fichier `conf.yaml` pour contrôler les accès entre la source de données de votre intégration et l'Agent. Le fichier `conf.yaml.example` de chaque intégration énumère l'ensemble des paramètres obligatoires et facultatifs.

Check de service
: Les checks de service sont un type de monitor utilisé pour surveiller le statut de disponibilité du service. Pour en savoir plus, consultez le [guide sur les checks de service][43].

Tags
: Les [tags][25] permettent de personnaliser les métriques pour les trier et les visualiser comme bon vous semble.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/integrations/new_check_howto/
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
[13]: /fr/developers/integrations/new_check_howto/#developer-toolkit
[14]: /fr/agent/guide/integration-management/
[15]: https://app.datadoghq.com/account/settings#agent
[16]: /fr/account_management/api-app-keys/
[17]: https://app.datadoghq.com/account/settings#api
[18]: /fr/integrations/
[19]: https://app.datadoghq.com/account/settings#agent/docker
[20]: https://app.datadoghq.com/account/settings#agent/kubernetes
[21]: /fr/agent/guide/agent-commands/#restart-the-agent
[22]: /fr/developers/integrations/new_check_howto/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /fr/developers/custom_checks/write_agent_check/#collection-interval
[25]: /fr/getting_started/tagging/
[26]: /fr/getting_started/agent/#setup
[27]: /fr/agent/guide/agent-commands/#agent-status-and-information
[28]: /fr/infrastructure/process/
[29]: /fr/security/
[30]: /fr/metrics/explorer/
[31]: /fr/dashboards/
[32]: /fr/monitors/
[33]: /fr/logs/
[34]: /fr/tracing/
[35]: /fr/synthetics/
[36]: /fr/agent/troubleshooting/
[37]: /fr/help/
[38]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[39]: https://app.datadoghq.com/event/stream
[40]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[41]: /fr/developers/metrics/
[42]: /fr/developers/metrics/custom_metrics/
[43]: /fr/monitors/guide/visualize-your-service-check-in-the-datadog-ui/