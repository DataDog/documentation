---
description: Unifiez les métriques et les logs de votre infrastructure à l'aide d'intégrations
  basées sur des Agents, sur l'authentification et sur des bibliothèques.
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: Centre d'apprentissage
  text: Présentation des intégrations
- link: https://learn.datadoghq.com/courses/getting-started-integrations
  tag: Centre d'apprentissage
  text: Débuter avec les intégrations
- link: /integrations/
  tag: Documentation
  text: Afficher la liste des intégrations Datadog
- link: https://www.datadoghq.com/blog/1k-integrations-milestone/
  tag: Blog
  text: 'Mise à l''échelle de l''observabilité Datadog : 1 000 intégrations et en
    augmentation'
title: Présentation des intégrations
---
## Présentation {#overview}

Ceci est un guide pour l'utilisation des intégrations. Si vous recherchez des informations sur la création d'une nouvelle intégration, consultez la page [Créer une nouvelle intégration][1].

Une intégration, au niveau le plus élevé, consiste à assembler un système unifié à partir d'unités qui sont généralement considérées séparément. Chez Datadog, vous pouvez utiliser des intégrations pour rassembler toutes les métriques et tous les logs de votre infrastructure et obtenir une visibilité sur le système unifié dans son ensemble ; vous pouvez voir les éléments individuellement et également la manière dont chaque élément impacte l'ensemble.

**Remarque** : Il est préférable de commencer à collecter des métriques sur vos projets le plus tôt possible dans le processus de développement, mais vous pouvez commencer à n'importe quelle étape.

Datadog propose trois grands types d'intégrations :

- **Les intégrations basées sur un Agent** sont installées avec le Datadog Agent et utilisent une méthode de classe Python appelée `check` pour définir les métriques à collecter.
- **Les intégrations basées sur l'authentification (crawler)** sont configurées dans [Datadog][2] où vous fournissez des identifiants pour obtenir des métriques avec l'API. Cela inclut des intégrations populaires comme [Slack][3], [AWS][4], [Azure][5] et [PagerDuty][6].
- **Les intégrations de bibliothèque** utilisent la [Datadog API][7] pour vous permettre de surveiller des applications en fonction du langage dans lequel elles sont écrites, comme [Node.js][8] ou [Python][9].

Vous pouvez aussi créer un [check personnalisé][10] pour définir et envoyer des métriques à Datadog depuis un système interne unique.

## Configuration d'une intégration {#setting-up-an-integration}

Le paquet Datadog Agent inclut des intégrations officiellement prises en charge par Datadog, dans [integrations core][11]. Pour utiliser ces intégrations, téléchargez le Datadog Agent. Les intégrations basées sur la communauté se trouvent dans [integrations extras][12]. Pour plus d'informations sur l'installation ou la gestion de ces intégrations, consultez le [guide de gestion des intégrations][14].

### Autorisations{#permissions}

L'autorisation Integrations Manage est requise pour interagir avec une tuile d'intégration. Consultez [RBAC roles][45] pour plus d'informations.

### Clés d'API et d'application {#api-and-application-keys}

Pour [installer le Datadog Agent][15], vous avez besoin d'une [clé d'API][16]. Si l'Agent est déjà téléchargé, assurez-vous de configurer la clé d'API dans le fichier `datadog.yaml`. Pour utiliser la plupart des fonctionnalités Datadog supplémentaires en dehors de la soumission de métriques et d'événements, vous avez besoin d'une [clé d'application][16]. Vous pouvez gérer les clés d'API et d'application de vos comptes sur la [page Paramètres d'API][17].

### Installation {#installation}

Si vous souhaitez vous connecter avec une intégration basée sur un crawler ou une bibliothèque, accédez à ce fournisseur sur la [page Integrations][18] pour obtenir des instructions spécifiques sur la façon de vous connecter. Pour les autres intégrations prises en charge, installez le [Datadog Agent][15]. La plupart des intégrations sont prises en charge pour les Agents conteneurisés : [Docker][19] et [Kubernetes][20]. Une fois l'Agent téléchargé, accédez à la [page Integrations][18] pour trouver des instructions de configuration spécifiques pour chaque intégration.

### Configuration des intégrations de l'Agent {#configuring-agent-integrations}

<div class="alert alert-info">Vous pouvez configurer les intégrations de l'Agent à distance sur l'ensemble de votre parc depuis une interface utilisateur et une API centralisées avec <a href="/agent/fleet_automation/configure_integrations/">Fleet Automation</a>, au lieu de modifier <code>conf.yaml</code> des fichiers sur chaque host. Découvrez les services détectés automatiquement, limitez une configuration à n'importe quel sous-ensemble de hosts par tag ou filtre de host, et déployez sur chaque Agent correspondant en une seule action. Cela nécessite Remote Configuration et l'Agent version 7.76 ou ultérieure sur des machines virtuelles Linux ou Windows.</div>

La plupart des paramètres de configuration sont spécifiques à l'[intégration individuelle][18]. Configurez les intégrations de l'Agent en accédant au dossier `conf.d` à la racine du répertoire de configuration de votre Agent. Chaque intégration possède un dossier nommé `<INTEGRATION_NAME>.d`, qui contient le fichier `conf.yaml.example`. Cet exemple de fichier répertorie toutes les options de configuration disponibles pour l'intégration concernée.

Pour activer une intégration donnée :

1. Renommez le fichier `conf.yaml.example` (dans le dossier `<INTEGRATION_NAME>.d` correspondant) en `conf.yaml`.
2. Mettez à jour les paramètres requis dans le fichier de configuration nouvellement créé avec les valeurs correspondant à votre environnement.
3. [Redémarrez le Datadog Agent][21].

**Remarque** : Tous les fichiers de configuration suivent le format documenté sous [@param specification][22].

Par exemple, voici le fichier de configuration `conf.yaml` minimal nécessaire pour collecter des métriques et des logs depuis l'[intégration apache][23] :

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

Pour surveiller plusieurs instances Apache dans le même check d'Agent, ajoutez des instances supplémentaires à la section `instances` :

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### Intervalle de collecte {#collection-interval}

L'intervalle de collecte par défaut pour toutes les intégrations standard Datadog est de 15 secondes. Pour modifier l'intervalle de collecte, utilisez le paramètre `min_collection_interval`. Pour plus de détails, consultez [Mise à jour de l'intervalle de collecte][24].

### Tagging {#tagging}

Le tagging est un élément clé du filtrage et de l'agrégation des données arrivant dans Datadog depuis de nombreuses sources. Pour plus d'informations sur les tags, consultez [Premiers pas avec les tags][25].

Si vous définissez des tags dans le fichier `datadog.yaml`, les tags sont appliqués à toutes les données de vos intégrations. Une fois que vous avez défini un tag dans `datadog.yaml`, toutes les nouvelles intégrations en héritent.

Par exemple, définir `service` dans votre fichier de configuration est la [configuration d'Agent][26] recommandée pour surveiller des systèmes distincts et indépendants.

Pour mieux unifier votre environnement, il est également recommandé de configurer le tag `env` dans l'Agent. Pour en savoir plus, consultez [Unified Service Tagging][27].

#### Configuration des tags par check{#per-check-tag-configuration}
Vous pouvez personnaliser le comportement des tags pour chaque check, en remplaçant les paramètres globaux définis au niveau de l'Agent :

1. **Désactiver les tags d'Autodiscovery**

    Par défaut, les métriques rapportées par les intégrations incluent les tags automatiquement détectés depuis l'environnement. Par exemple, les métriques rapportées par un check Redis qui s'exécute dans un conteneur incluent les tags associés au conteneur, tels que `image_name`. Vous pouvez désactiver ce comportement en définissant le paramètre `ignore_autodiscovery_tags` sur `true`.

1. **Définir la cardinalité des tags par check d'intégration**

    Vous pouvez définir le niveau de cardinalité des tags (faible, orchestrateur ou élevé) pour chaque check à l'aide du paramètre `check_tag_cardinality`. Cela remplace le paramètre global de cardinalité des tags défini dans la configuration de l'Agent.

```yaml
init_config:
# Ignores tags coming from autodiscovery
ignore_autodiscovery_tags: true

# Override global tag cardinality setting
check_tag_cardinality: low

# Rest of the config here
```

Pour les environnements conteneurisés, vous pouvez également définir ces paramètres via les [annotations Kubernetes Autodiscovery][47].

### Validation {#validation}

Pour valider la configuration de votre Agent et de vos intégrations, [exécutez la sous-commande `status` de l'Agent][28] et recherchez la nouvelle configuration dans la section Checks.

## Installation de plusieurs intégrations {#installing-multiple-integrations}

L'installation de plusieurs intégrations consiste à ajouter les informations de configuration dans un nouveau fichier `conf.yaml` situé dans le dossier `<INTEGRATIONS>.d` correspondant. Recherchez les paramètres requis pour la nouvelle intégration dans le fichier `conf.yaml.example`, ajoutez-les dans le nouveau fichier `conf.yaml`, puis suivez les mêmes étapes pour valider votre configuration.

## Intégrations détectées automatiquement {#autodetected-integrations}

Si vous configurez la [collecte de processus][29], Datadog détecte automatiquement les technologies exécutées sur vos hosts. Cela identifie les intégrations Datadog qui peuvent vous aider à surveiller ces technologies. Ces intégrations détectées automatiquement sont affichées dans la [recherche d'intégrations][2] :

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="Intégrations détectées automatiquement" >}}

Chaque intégration possède l'un des quatre types de statut suivants :

- {{< ui >}}Detected{{< /ui >}} : La technologie est en cours d'exécution sur un host, mais l'intégration n'a pas été installée ou configurée et seules des métriques partielles sont collectées. Configurez l'intégration pour une couverture complète. Pour trouver une liste de hosts exécutant une technologie détectée automatiquement, ouvrez la tuile des intégrations et sélectionnez l'onglet {{< ui >}}Hosts{{< /ui >}}.
- {{< ui >}}Installed{{< /ui >}} : Cette intégration est installée et configurée sur un host.
- {{< ui >}}Available{{< /ui >}} : Toutes les intégrations qui n'entrent pas dans les catégories {{< ui >}}Installed{{< /ui >}} et {{< ui >}}Detected{{< /ui >}}.
- {{< ui >}}Missing Data{{< /ui >}} : Aucune métrique d'intégration n'a été détectée au cours des 24 dernières heures. 

## Pratiques de sécurité {#security-practices}

Pour en savoir plus sur la manière dont Datadog traite vos données et sur d'autres aspects de la sécurité, consultez notre [documentation dédiée][30].

## Contrôle d'accès granulaire {#granular-access-control}
Par défaut, l'accès aux ressources d'intégration (comptes, services, webhooks) n'est pas restreint. Des contrôles d'accès granulaires peuvent être utilisés pour restreindre le comportement des utilisateurs, des équipes, des rôles ou de l'ensemble de votre organisation au niveau de la ressource d'intégration.

**Remarque** : L'option d'accès restreint n'est visible que si l'intégration prend en charge le contrôle d'accès granulaire. Pour vérifier si le contrôle d'accès granulaire est pris en charge pour une intégration, consultez la [documentation de cette intégration][46].
{{< img src="getting_started/integrations/GRACE integration-account-modal.png" alt="Contrôles d'accès granulaires" style="width:70%;" >}}

1. Tout en consultant une intégration, accédez à l'onglet {{< ui >}}Configure{{< /ui >}} et localisez la ressource (compte, service, webhook) à laquelle appliquer des contrôles d'accès granulaires. 
2. Cliquez sur {{< ui >}}Set Permissions{{< /ui >}}.
3. Par défaut, tout le monde dans votre organisation dispose d'un accès complet. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}. 
4. La boîte de dialogue se met à jour pour indiquer que les membres de votre organisation ont un accès {{< ui >}}Viewer{{< /ui >}} par défaut.
5. Utilisez le menu déroulant pour sélectionner une ou plusieurs équipes, rôles ou utilisateurs autorisés à modifier le monitor.
    **Remarque**: L'autorisation [Integrations Manage][45] est également requise pour modifier des ressources individuelles.  
6. Cliquez sur {{< ui >}}Add{{< /ui >}}.
7. La boîte de dialogue se met à jour pour afficher les autorisations modifiées.
8. Cliquez sur {{< ui >}}Save{{< /ui >}}. La page d'intégration s'actualise automatiquement avec les autorisations modifiées. 

**Remarque :** Pour conserver l'accès en modification à la ressource, le système exige que vous incluiez au moins un rôle ou une équipe dont vous êtes membre avant d'enregistrer.

Pour rétablir l'accès général à une ressource d'intégration restreinte, procédez comme suit :

1. Tout en consultant une intégration, accédez à l'onglet {{< ui >}}Configure{{< /ui >}} et localisez la ressource (compte, service, webhook) pour laquelle l'accès général doit être rétabli.
2. Cliquez sur {{< ui >}}Set Permissions{{< /ui >}}.
3. Cliquez sur {{< ui >}}Restore Full Access{{< /ui >}}.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}. La page d'intégration s'actualise automatiquement avec les autorisations modifiées. 

## Quelle est la prochaine étape ? {#whats-next}

Maintenant que votre première intégration est configurée, [explorez toutes les métriques][31] envoyées par votre application à Datadog et utilisez ces métriques pour configurer des [dashboards][32] et des [alertes][33] afin de surveiller vos données.

Découvrez également les solutions [Log Management][34], [APM][35] et [Synthetic Monitoring][36] de Datadog.

## Dépannage {#troubleshooting}

La première étape du dépannage d'une intégration consiste à utiliser un plugin dans votre éditeur de code ou à utiliser l'un des nombreux outils en ligne pour vérifier que le YAML est valide. L'étape suivante consiste à suivre toutes les étapes de [dépannage de l'Agent][37].

Si vos problèmes persistent, contactez l'[assistance Datadog][38].

## Termes clés {#key-terms}

`conf.yaml`
: Vous créez le `conf.yaml` dans le dossier `conf.d/<INTEGRATION_NAME>.d` à la racine de votre [répertoire de configuration de l'Agent][39]. Utilisez ce fichier pour connecter des intégrations à votre système, ainsi que pour configurer leurs paramètres.

check personnalisé
: Si vous disposez d'un système unique que vous souhaitez surveiller, ou si vous souhaitez étendre les métriques déjà envoyées par une intégration, vous pouvez créer un [check personnalisé][10] pour définir et envoyer des métriques à Datadog. Cependant, si vous souhaitez surveiller une application généralement disponible, un service public ou un projet open source et que l'intégration n'existe pas, envisagez de [créer une nouvelle intégration][1] plutôt qu'un check personnalisé.

`datadog.yaml`
: Il s'agit du fichier de configuration principal où vous définissez la manière dont l'Agent interagit globalement avec ses propres intégrations et avec votre système. Utilisez ce fichier pour mettre à jour les clés d'API, les proxys, les tags de host et d'autres paramètres globaux.

événement
: Les événements sont des messages d'information concernant votre système qui sont consommés par [l'Events Explorer][40] afin que vous puissiez créer des moniteurs basés sur ceux-ci.

instance
: Vous définissez et mappez l'instance de ce que vous surveillez dans le fichier `conf.yaml`. Par exemple, dans l'[intégration `http_check`][41], vous définissez le nom associé à l'instance de l'endpoint HTTP dont vous surveillez le temps de disponibilité et le downtime. Vous pouvez surveiller **plusieurs instances** dans la même intégration, et vous le faites en définissant toutes les instances dans le fichier `conf.yaml`.

`<INTEGRATION_NAME>.d`
: Si vous avez une configuration complexe, vous pouvez la diviser en plusieurs fichiers `YAML`, puis les stocker tous dans le dossier `<INTEGRATION_NAME>.d` pour définir la configuration. L'Agent charge tout fichier `YAML` valide présent dans le dossier `<INTEGRATION_NAME>.d`.

journalisation
: Si le système que vous surveillez génère des logs, personnalisez les logs que vous envoyez à Datadog en utilisant la [solution Log Management][34].

`metadata.csv`
: Le fichier qui répertorie et stocke les métriques collectées par chaque intégration.

métriques
: La liste des éléments collectés depuis votre système par chaque intégration. Vous pouvez trouver les métriques pour chaque intégration dans le fichier `metadata.csv` de cette intégration et dans le tableau **Données collectées** sur la page de documentation de l'intégration. Dans ce tableau, une métrique répertoriée avec *Affiché en tant que \\<unité\\>* possède déjà une unité définie dans les métadonnées de l'intégration. Une métrique sans cette notation n'a pas d'unité définie par défaut, vous devez donc en configurer une manuellement sur la page [résumé des métriques][48]. Pour plus d'informations sur les métriques, consultez la page développeur [Metrics][42]. Vous pouvez également configurer des [métriques personnalisées][43], donc si l'intégration ne propose pas de métrique prête à l'emploi, vous pouvez généralement l'ajouter.

paramètres
: Utilisez les paramètres du fichier `conf.yaml` pour contrôler les accès entre votre source de données d'intégration et l'Agent. Le fichier `conf.yaml.example` de chaque intégration répertorie tous les paramètres requis et non requis.

check de service
: Les vérifications de service sont un type de monitor utilisé pour suivre le statut de disponibilité du service. Pour plus d'informations, consultez le [guide des vérifications de service][44].

tagging
: [Tags][25] sont un moyen d'ajouter une personnalisation aux métriques afin que vous puissiez les filtrer et les visualiser de la manière la plus utile pour vous.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/extend/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /fr/integrations/slack/
[4]: /fr/integrations/amazon_web_services/
[5]: /fr/integrations/azure/
[6]: /fr/integrations/pagerduty/
[7]: /fr/api/
[8]: /fr/integrations/node/
[9]: /fr/integrations/python/
[10]: /fr/extend/custom_checks/write_agent_check/
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
[22]: /fr/extend/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /fr/extend/custom_checks/write_agent_check/#updating-the-collection-interval
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
[46]: /fr/integrations/
[47]: /fr/containers/kubernetes/integrations/#tag-cardinality
[48]: https://app.datadoghq.com/metric/summary