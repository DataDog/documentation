---
title: Live containers
kind: documentation
aliases:
  - /fr/guides/livecontainers
  - /fr/infrastructure/livecontainers/
further_reading:
  - link: graphing/infrastructure/hostmap
    tag: Graphiques
    text: Observer tous vos hosts sur un seul écran avec la hostmap
  - link: graphing/infrastructure/process
    tag: Graphiques
    text: Découvrir ce qui se passe à tous les niveaux de votre système
---
## Introduction

[Les live containers de Datadog][1] vous permettent de bénéficier d'une réelle visibilité sur l'ensemble des conteneurs de votre environnement.

Inspirés d'outils Bedrock comme *htop*, *ctop* et *kubectl*, les live containers vous offrent une vue d'ensemble globale de votre infrastructure de conteneurs. Leur tableau, régulièrement mis à jour, présente les métriques de ressources actualisées toutes les deux secondes, dispose d'une fonction de recherche à facettes et inclut les logs de conteneur de diffusion.

Associée à des intégrations pour [Docker][2], [Kubernetes][3], [ECS][4] ou d'autres technologies de conteneur, ainsi qu'à la fonction intégrée d'ajout de tags à des composants dynamiques, la vue des live containers fournit une présentation détaillée de la santé de vos conteneurs, de leur consommation en ressources, de leurs logs et de leur déploiement en temps réel :

{{< img src="graphing/infrastructure/livecontainers/livecontainerssummaries.png" alt="Live containers avec résumés"  >}}

## Installation
Après avoir déployé l'[Agent Docker][5], vous pouvez accéder aux métriques de conteneur sans avoir à effectuer la moindre configuration supplémentaire. Pour activer la collecte de logs, suivez les étapes ci-dessous :

{{< tabs >}}

{{% tab "Linux/Windows" %}}
Une fois l'[Agent Datadog][1] installé, activez la collecte de logs en modifiant le [fichier de configuration principal de l'Agent][2]. Changez les paramètres suivants :

```
logs_enabled: true
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```
**Remarques :**

* Pour recueillir les informations relatives aux conteneurs dans l'installation standard, plutôt qu'avec l'[Agent Docker][1], l'utilisateur `dd-agent` doit disposer des autorisations pour accéder à **docker.sock**.
* Par défaut, les logs sont indexés. Toutefois, vous pouvez configurer des [filtres d'exclusion][2] pour bénéficier d'un contrôle précis sur l'indexation et recevoir uniquement des données Live Tail.


[1]: /fr/agent/docker/log/?tab=hostinstallation
[2]: /fr/agent/guide/agent-configuration-files/
{{% /tab %}}

{{% tab "Docker" %}}

Suivez les instructions pour l'[Agent Docker][1], en transmettant, en plus de tout autre paramètre personnalisé, les attributs suivants (selon les cas) :

```
-e DD_LOGS_ENABLED=true
-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

**Remarque** : par défaut, les logs sont indexés. Toutefois, vous pouvez configurer des [filtres d'exclusion][2] pour bénéficier d'un contrôle précis sur l'indexation et recevoir uniquement des données Live Tail.

[1]: /fr/agent/docker/log/?tab=containerinstallation
[2]: /fr/logs/indexes/#exclusion-filters
{{% /tab %}}

{{% tab "Kubernetes" %}}
Dans le manifeste `dd-agent.yaml` utilisé pour créer le [Daemonset][1], ajoutez les variables d'environnement, le montage de volume et le volume suivants :

```
  env:
    - name: DD_LOGS_ENABLED
        value: "true"
    - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
        value: "true"

  volumeMounts:
    - name: pointerdir
        mountPath: /opt/datadog-agent/run

volumes:
  - hostPath:
      path: /opt/datadog-agent/run
      name: pointerdir

```

**Remarque** :

* Par défaut, les logs sont indexés. Toutefois, vous pouvez configurer des [filtres d'exclusion][2] pour bénéficier d'un contrôle précis sur les index et les données Live Tail uniquement.

[1]: /fr/agent/kubernetes/daemonset_setup
[2]: /fr/logs/indexes/#exclusion-filters
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus sur l'activation de la collecte de logs pour les intégrations, consultez la [documentation à ce sujet][6].

## Logs de conteneur

Consultez les logs de diffusion pour n'importe quel conteneur, tels que `docker logs -f` ou `kubectl logs -f`, dans Datadog. Cliquez sur un conteneur dans le tableau pour afficher davantage d'informations. Cliquez sur l'onglet *Logs* pour visualiser en temps réel les données de [Live Tail][7] ou les logs indexés historiques, peu importe leur date.

### Live Tail
Grâce à Live Tail, tous les logs de conteneur sont diffusés. Si vous choisissez d'interrompre la diffusion, vous pouvez facilement lire le contenu des logs en cours d'écriture. Vous pouvez ensuite reprendre la diffusion.

Vous pouvez effectuer des recherches sur le contenu des logs de diffusion à l'aide d'une simple correspondance de chaîne. Pour en savoir plus sur Live Tail, consultez la [documentation dédiée][7].

**Remarque** : les logs de diffusion ne sont pas persistants. Si vous saisissez une nouvelle recherche ou actualisez la page, cela efface le contenu de la diffusion.

{{< img src="graphing/infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Aperçu logs volet latéral" video="true"  >}}

### Logs indexés

Choisissez un intervalle pour afficher les logs correspondants que vous avez choisis d'indexer et de rendre persistants. L'indexation vous permet de filtrer vos logs à l'aide de tags et de facettes. Par exemple, pour rechercher des logs affichant le statut `Error`, saisissez `status:error` dans la zone de recherche. La fonction de saisie automatique peut vous aider à trouver le tag que vous souhaitez utiliser. Les attributs clés de vos logs sont déjà stockés dans des tags, ce qui vous permet de les rechercher, filtrer et agréger en cas de besoin.

{{< img src="graphing/infrastructure/livecontainers/errorlogs.png" alt="Aperçu logs volet latéral"  style="width:100%;">}}

## Recherche, filtrage et pivotement

### Recherche textuelle

Les conteneurs sont, de par leur nature, des objets avec une très forte cardinalité. La recherche de texte flexible de Datadog cherche des correspondances dans les sous-chaînes du nom, de l'ID ou des champs d'image du conteneur.

Pour combiner plusieurs recherches textuelles au sein d'une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

|              |                                                                                                                                  |                                                                 |
| :----        | :----                                                                                                                            | :----                                                           |
| **Opérateur** | **Description**                                                                                                                  | **Exemple**                                                     |
| `AND`        | **Intersection** : les deux termes sont inclus dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut).                           | java AND elasticsearch                                          |
| `OR`         | **Union** : un des deux termes est inclus dans les événements sélectionnés.                                                                       | java OR python                                                  |
| `NOT` / `!`  | **Exclusion** : le terme suivant n'est PAS dans l'événement. Vous pouvez utiliser le mot `NOT` ou le caractère `!` pour effectuer la même opération. | java NOT elasticsearch <br> **équivalent** : java !elasticsearch |

Utilisez des parenthèses pour regrouper les opérateurs. Par exemple, `(NOT (elasticsearch OR kafka) java) OR python`.


### Tagging

Les conteneurs sont [tagués][8] avec tous les tags des hosts existants, ainsi qu'avec les métadonnées associées à chaque conteneur.

Le tag `image_name` est ajouté à tous les conteneurs, y compris les intégrations avec des orchestrateurs couramment utilisés, telles que [ECS][4] et [Kubernetes][3], qui fournissent davantage de tags au niveau des conteneurs. De plus, chaque conteneur est doté d'une icône Docker, ECS ou Kubernetes afin de pouvoir identifier en quelques secondes les conteneurs orchestrés. 

Les conteneurs ECS possèdent les tags suivants :

*  `task_name`
*  `task_version`
*  `ecs_cluster`

Les conteneurs Kubernetes possèdent les tags suivants :

* `pod_name`
* `kube_pod_ip`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `kube_cluster`

### Filtrage et pivotement

La capture d'écran ci-dessous illustre un système filtré de façon à obtenir un cluster Kubernetes composé de neuf nœuds. L'utilisation RSS et du processeur des conteneurs est transmise et comparée aux limites définies pour les conteneurs (le cas échéant). Dans cet exemple, il semblerait que les conteneurs de ce cluster soient en sur-approvisionnement. Vous pouvez définir des limites plus strictes et rassembler les ressources pour optimiser leur utilisation.

{{< img src="graphing/infrastructure/livecontainers/overprovisioned.png" alt="Sur-approvisionnement"  style="width:80%;">}}

Les environnements de conteneur sont dynamiques et peuvent être difficiles à surveiller. La capture d'écran ci-dessous comporte une vue qui a été pivotée par `kube_service` et `host`, et filtrée par `kube_namespace:default` dans le but de réduire les parasites système. Vous pouvez voir où les services s'exécutent, ainsi que le degré de saturation des métriques clés : 

{{< img src="graphing/infrastructure/livecontainers/hostxservice.png" alt="host x services"  style="width:80%;">}}

Pour bien comprendre les changements d'utilisation des ressources entre chaque mise à jour, vous pouvez effectuer un pivotement avec les paramètres `ecs_task_name` et `ecs_task_version` d'ECS.

{{< img src="graphing/infrastructure/livecontainers/tasksxversion.png" alt="Tasks x version"  style="width:80%;">}}

## Nuages de points

Utilisez l'analyse de nuage de points pour comparer deux métriques entre elles, afin de mieux comprendre les performances de vos conteneurs.

Pour accéder à l'analyse de nuage de points [dans la page Containers][1], cliquez sur le bouton *Show Summary graph*, puis sélectionnez l'onglet « Scatter Plot » :

{{< img src="graphing/infrastructure/livecontainers/scatterplot_selection.png" alt="sélection nuage de points"  style="width:60%;">}}

Par défaut, le graphique effectue un regroupement à partir de la clé de tag `short_image`. La taille de chaque point dépend du nombre de conteneurs du groupe. Lorsque vous cliquez sur un point, cela affiche chaque conteneur et host qui contribue au groupe.

La requête en haut de la fenêtre vous permet de contrôler les différentes options de l'analyse de nuage de points :

* Choisissez les métriques à afficher.
* Choisissez la méthode d'agrégation des deux métriques.
* Choisissez l'échelle pour l'axe des X et des Y (*Linear* ou *Log*).

{{< img src="graphing/infrastructure/livecontainers/scatterplot.png" alt="nuage de points"  style="width:80%;">}}


## Surveillance en temps réel

Lorsque vous utilisez activement la page des conteneurs, les métriques sont recueillies toutes les deux secondes. Cet aspect est très important pour les métriques hautement volatiles, telles que l'utilisation du processeur. En arrière-plan, pour le contexte historique, les métriques sont recueillies toutes les 10 secondes.

## Inclure ou exclure des conteneurs

*Veuillez noter que l'utilisation des live containers n'est pas mesurée. L'inclusion ou l'exclusion de conteneurs n'a donc aucune incidence sur votre facturation.*

Il est possible d'inclure et/ou d'exclure des conteneurs pour la collecte en temps réel :

- Pour exclure des conteneurs, transmettez la variable d'environnement `DD_AC_EXCLUDE` ou ajoutez `ac_exclude:` dans le fichier de configuration principal `datadog.yaml`.
- Pour inclure des conteneurs, transmettez la variable d'environnement `DD_AC_INCLUDE` ou ajoutez `ac_include:` dans le fichier de configuration principal `datadog.yaml`.

Ces deux arguments ont pour valeur un **nom d'image**. Les expressions régulières sont également prises en charge.

Par exemple, pour exclure toutes les images Debian à l'exception des conteneurs dont le nom commence par *frontend*, ajoutez les deux lignes de configuration suivantes dans votre fichier `datadog.yaml` :

```
ac_exclude: ["image:debian"]
ac_include: ["name:frontend.*"]
```

**Remarque** : pour la version 5 de l'Agent, au lieu d'ajouter les lignes ci-dessus dans le fichier de configuration principal `datadog.conf`, ajoutez explicitement un fichier `datadog.yaml` dans `/etc/datadog-agent/`. En effet, l'Agent de processus exige que toutes les options de configuration se trouvent à cet emplacement. Cette configuration exclut uniquement les conteneurs de la collecte en temps réel, et **non** de la fonction Autodiscovery.

## Remarques et problèmes connus

- Cette fonctionnalité ne prend actuellement pas en charge les conteneurs Windows.

- La collecte de données en temps réel (2 secondes) est désactivée après 30 minutes. Pour reprendre la collecte en temps réel, actualisez la page.

- Les réglages RBAC peuvent restreindre la collecte de métadonnées Kubernetes. Consultez les [entités RBAC pour l'Agent Datadog][9].

- Dans Kubernetes, la valeur de `health` correspond à la sonde de disponibilité des conteneurs, et non à leur sonde d'activité.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/containers
[2]: /fr/integrations/docker_daemon
[3]: /fr/integrations/kubernetes
[4]: /fr/integrations/amazon_ecs
[5]: /fr/agent/docker/#run-the-docker-agent
[6]: /fr/agent/docker/log/?tab=hostinstallation#activate-log-integrations
[7]: /fr/logs/live_tail
[8]: /fr/tagging
[9]: https://gist.github.com/hkaj/404385619e5908f16ea3134218648237