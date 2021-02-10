---
title: Live containers
kind: documentation
aliases:
  - /fr/guides/livecontainers
  - /fr/graphing/infrastructure/livecontainers/
further_reading:
  - link: /infrastructure/hostmap/
    tag: Graphiques
    text: Visualisez tous vos hosts sur un seul écran avec la hostmap
  - link: /infrastructure/process/
    tag: Graphiques
    text: Découvrir ce qui se passe à tous les niveaux de votre système
---
## Présentation

[Les live containers de Datadog][1] vous permettent de bénéficier d'une réelle visibilité sur l'ensemble des conteneurs de votre environnement.

Inspirés d'outils Bedrock comme *htop*, *ctop* et *kubectl*, les live containers vous offrent une vue d'ensemble globale de votre infrastructure de conteneurs. Leur tableau, régulièrement mis à jour, présente les métriques de ressources actualisées toutes les deux secondes, dispose d'une fonction de recherche à facettes et affiche les logs de conteneur sous forme de flux.

Associée à [Docker][2], [Kubernetes][3], [ECS][4] ou d'autres technologies de conteneur, ainsi qu'à la fonction intégrée de tagging de composants dynamiques, la vue des live containers fournit une présentation détaillée de la santé de vos conteneurs, de leur consommation en ressources, de leurs logs et de leur déploiement en temps réel :

{{< img src="infrastructure/livecontainers/livecontainersoverview.png" alt="Live containers avec résumés"  >}}

## Configuration

### Ressources Kubernetes

L'Agent Datadog et l'Agent de cluster peuvent être configurés afin de récupérer des ressources Kubernetes pour des [live containers][5]. Cela vous permet de surveiller l'état de vos pods, déploiements et autres entités Kubernetes dans un espace de nommage ou une zone de disponibilité précise. Il est également possible de consulter les spécifications de ressources pour les échecs de pods d'un déploiement ou encore de mettre en corrélation l'activité d'un nœud avec les logs associés.

Avant d'effectuer les configurations ci-dessous pour les ressources Kubernetes des live containers, il est nécessaire d'installer au minimum la [version 7.21.1 de l'Agent][6] ainsi que la [version 1.9.0 de l'Agent de cluster][7].

{{< tabs >}}
{{% tab "Helm" %}}

Si vous utilisez le [chart Helm Datadog][1] officiel :

- Utilisez au minimum la version 2.4.5 du chart.
  **Remarque** : assurez-vous que les versions de l'Agent et de l'Agent de cluster sont codées en dur, avec les versions minimales requises, dans le fichier [values.yaml][2] de votre chart Helm.
- Définissez `datadog.orchestratorExplorer.enabled` sur `true` dans [values.yaml][2].
- Déployez une nouvelle version.

Dans certaines configurations, il arrive que l'Agent de processus et l'Agent de cluster ne parviennent pas à détecter automatiquement un nom de cluster Kubernetes. Lorsque c'est le cas, la fonctionnalité ne démarre pas et une entrée WARN est ajoutée aux logs de l'Agent de cluster, avec le message suivant : `Orchestrator explorer enabled but no cluster name set: disabling`. Vous devez alors définir `datadog.clusterName` sur le nom de votre cluster dans [values.yaml][2].

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

1. La version 1.9.0 ou une version ultérieure de l'[Agent de cluster][1] est requise pour commencer la configuration du DaemonSet. L'Agent de cluster doit être en cours d'exécution et l'Agent doit pouvoir communiquer avec celui-ci. Consultez la section [Configuration de l'Agent de cluster][2] pour en savoir plus.

    - Définissez le conteneur de l'Agent de cluster à l'aide de la variable d'environnement suivante :

        ```yaml
          - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
            value: "true"
        ```

    - Définissez le ClusterRole de l'Agent de cluster à l'aide des autorisations RBAC suivantes.
Notez bien que pour les apiGroups `apps`, les live containers ont besoin d'autorisations
pour recueillir des ressources kubernetes (`pods`, `services`, `nodes`, etc.)
qui devraient déjà se trouver dans le RBAC si vous avez suivi la [documentation relative à la configuration de l'Agent de cluster][2].
Si elles sont absentes, ajoutez-les (après
`deployments`, `replicasets`) :
        ```yaml
          ClusterRole:
          - apiGroups:  # To create the datadog-cluster-id CM
            - ""
            resources:
            - configmaps
            verbs:
            - create
            - get
            - update
          ...
          - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
            - ""
            resources:
            - namespaces
            verbs:
            - get
          ...
          - apiGroups:  # To collect new resource types
            - "apps"
            resources:
            - deployments
            - replicasets
            # Below are in case RBAC was not setup from the above linked "Cluster Agent Setup documentation"
            - pods 
            - nodes
            - services
            verbs:
            - list
            - get
            - watch
        ```
    Ces autorisations sont requises pour créer une ConfigMap `datadog-cluster-id` dans le même espace de nommage que le DaemonSet de l'Agent et le déploiement de l'Agent de cluster, mais également pour recueillir les déploiements et les ReplicaSets.

    Si la ConfigMap `cluster-id` n'est pas créée par l'Agent de cluster, le pod de l'Agent n'est pas initié, ce qui génère le statut `CreateContainerConfigError`. Si le pod de l'Agent est bloqué par l'absence de cette ConfigMap, modifiez les autorisations de l'Agent de cluster et redémarrez ses pods pour permettre la création de la CongifMap. Le pod de l'Agent récupèrera automatiquement un statut normal.

2. L'Agent de processus, qui s'exécute dans le DaemonSet de l'Agent, doit être activé et en cours d'exécution. La collecte de processus ne doit pas forcément être en cours. Les options suivantes doivent également être configurées :

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    - name: DD_ORCHESTRATOR_CLUSTER_ID
      valueFrom:
        configMapKeyRef:
          name: datadog-cluster-id
          key: id
    ```

Dans certaines configurations, il arrive que l'Agent de processus et l'Agent de cluster ne parviennent pas à détecter automatiquement un nom de cluster Kubernetes. Lorsque c'est le cas, la fonctionnalité ne démarre pas et une entrée WARN est ajoutée aux logs de l'Agent de cluster, avec le message suivant : `Orchestrator explorer enabled but no cluster name set: disabling`. Vous devez alors définir ajouter les options suivantes dans la section `env` de l'Agent de cluster et de l'Agent de processus :

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<NOM_CLUSTER>"
  ```

[1]: /fr/agent/cluster_agent/
[2]: /fr/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}

### Inclure ou exclure des conteneurs

Il est possible d'inclure et/ou d'exclure des conteneurs pour la collecte en temps réel :

* Pour exclure des conteneurs, passez la variable d'environnement `DD_CONTAINER_EXCLUDE` ou ajoutez `container_exclude:` dans le fichier de configuration principal `datadog.yaml`.
* Pour inclure des conteneurs, passez la variable d'environnement `DD_CONTAINER_INCLUDE` ou ajoutez `container_include:` dans le fichier de configuration principal `datadog.yaml`.

Ces deux arguments ont pour valeur un **nom d'image**. Les expressions régulières sont également prises en charge.

Par exemple, pour exclure toutes les images Debian à l'exception des conteneurs dont le nom commence par *frontend*, ajoutez les deux lignes de configuration suivantes dans votre fichier `datadog.yaml` :
```yaml
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

```shell
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**Remarque** : pour la version 5 de l'Agent, au lieu d'ajouter les lignes ci-dessus dans le fichier de configuration principal `datadog.conf`, ajoutez explicitement un fichier `datadog.yaml` dans `/etc/datadog-agent/`. En effet, l'Agent de processus exige que toutes les options de configuration se trouvent à cet emplacement. Cette configuration exclut uniquement les conteneurs de la collecte en temps réel, et **non** de la fonction Autodiscovery.

## Prise en main

Rendez-vous sur la [page Containers][1] pour accéder automatiquement à la vue des **Conteneurs**.

## Rechercher, filtrer et faire pivoter

### Recherche textuelle

Les conteneurs sont, de par leur nature, des objets avec une très forte cardinalité. La recherche de texte flexible de Datadog permet de rechercher des sous-chaînes correspondantes dans le champ name, ID ou image d'un conteneur.

Si vous avez activé la fonctionnalité Ressources Kubernetes, vous avez la possibilité d'effectuer des recherches parmi les chaînes `pod`, `deployment`, `ReplicaSet` et `service name` ainsi que parmi les étiquettes Kubernetes dans une [vue Ressources Kubernetes](#vue-ressources-kubernetes).

Pour combiner plusieurs recherches textuelles au sein d'une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

|              |                                                                                                                                  |                                                                 |
|:-------------|:---------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------|
| **Opérateur** | **Description**                                                                                                                  | **Exemple**                                                     |
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut).                           | java AND elasticsearch                                          |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                                                       | java OR python                                                  |
| `NOT` / `!`  | **Exclusion** : le terme suivant n'est PAS dans l'événement. Vous pouvez utiliser le mot `NOT` ou le caractère `!` pour effectuer la même opération. | java NOT elasticsearch <br> **équivalent** : java !elasticsearch |

Utilisez des parenthèses pour regrouper des opérateurs. Par exemple, `(NOT (elasticsearch OR kafka) java) OR python`.

### Filtrer et faire pivoter

La capture d'écran ci-dessous illustre un système filtré de façon à visualiser un cluster Kubernetes composé de neuf nœuds. La charge RSS et la charge processeur des conteneurs sont affichées et comparées aux limites provisionnées pour les conteneurs (le cas échéant). Dans cet exemple, on constate que les conteneurs de ce cluster sont surprovisionnés. Vous pouvez définir des limites plus strictes et faire appel au bin packing pour optimiser l'utilisation des ressources.

{{< img src="infrastructure/livecontainers/overprovisioned.png" alt="Surprovisionnement" style="width:80%;">}}

Les environnements de conteneur sont dynamiques et peuvent être difficiles à surveiller. La capture d'écran ci-dessous illustre une vue qui a été pivotée par `kube_service` et `host`, et filtrée par `kube_namespace:default` dans le but de réduire les données parasite liées au système. Vous pouvez voir où les différents services sont exécutés, ainsi que le degré de saturation des métriques clés : 

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="Host x services"  style="width:80%;">}}

Pour analyser l'évolution de l'utilisation des ressources entre les différentes mises à jour, vous pouvez faire pivoter les données en fonction des paramètres `ecs_task_name` et `ecs_task_version` d'ECS.

{{< img src="infrastructure/livecontainers/tasksxversion.png" alt="Tasks x version" style="width:80%;">}}

Pour les ressources Kubernetes, sélectionnez les tags Datadog à utiliser pour filtrer les données, par exemple `environment`, `service` ou `pod_phase`. Vous pouvez également utiliser les facettes de conteneur sur la gauche pour visualiser une ressource Kubernetes spécifique. Regroupez vos pods en fonction de tags Datadog pour obtenir une vue agrégée et retrouver des informations plus rapidement.

## Tagging

Les conteneurs sont [tagués][8] avec tous les tags au niveau des hosts existants, ainsi qu'avec les métadonnées associées à chaque conteneur.

Le tag `image_name` est ajouté à tous les conteneurs, y compris les intégrations avec des orchestrateurs couramment utilisés, telles que [ECS][4] et [Kubernetes][3], qui fournissent davantage de tags au niveau des conteneurs. De plus, chaque conteneur est doté d'une icône Docker, ECS ou Kubernetes afin de pouvoir identifier en quelques secondes les conteneurs orchestrés. 

Les conteneurs ECS possèdent les tags suivants :

* `task_name`
* `task_version`
* `ecs_cluster`

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

SI vous avez configuré le [tagging de service unifié][9], les tags `env`, `service`, et `version` sont également recueillis automatiquement.
L'utilisation de ces tags vous permet d'assurer la cohésion des données de l'APM, des logs, des métriques et des live containers.

## Vues

### Vue Conteneurs

Grâce à la vue **Conteneurs**, vous pouvez visualiser vos données sous forme de [nuage de points](#nuages-de-points) ou de [série temporelle][10]. La vue comprend également un tableau vous permettant de trier les données de vos conteneurs selon différents champs, comme le nom du conteneur, son statut et sa date de démarrage.

#### Nuage de points

Utilisez l'analyse de nuage de points pour comparer deux métriques entre elles et ainsi mieux comprendre les performances de vos conteneurs.

Pour accéder à l'analyse de nuage de points [dans la page Containers][1], cliquez sur le bouton *Show Summary graph*, puis sélectionnez l'onglet « Scatter Plot » :

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="sélection de nuage de points" style="width:60%;">}}

Par défaut, le graphique regroupe les données à partir de la clé de tag `short_image`. La taille de chaque point dépend du nombre de conteneurs du groupe. Lorsque vous cliquez sur un point, cela affiche chaque conteneur et host qui contribue au groupe.

La requête en haut de la fenêtre vous permet de contrôler les différentes options de l'analyse de nuage de points :

* Choisissez les métriques à afficher.
* Choisissez la méthode d'agrégation des deux métriques.
* Choisissez l'échelle pour l'axe des X et des Y (*Linear* ou *Log*).

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="nuage de points" style="width:80%;">}}

#### Surveillance en temps réel

Lorsque vous utilisez activement la page des conteneurs, les métriques sont recueillies toutes les deux secondes. Cette particularité est très importante pour les métriques hautement volatiles, telles que l'utilisation du processeur. En arrière-plan, pour le contexte historique, les métriques sont recueillies toutes les 10 secondes.

### Vue Ressources Kubernetes

Si vous avez activé la fonctionnalité Ressources Kubernetes pour Live Containers, utilisez le menu déroulant **View** en haut à gauche de chaque page pour basculer entre les vues **Pods**, **Deployments**, **ReplicaSets** et **Services** . Chacune de ces vues comprend un tableau de données pour vous aider à mieux organiser vos données par champ (nom, statut, etc.) et par étiquettes Kubernetes, ainsi qu'une Cluster Map détaillée pour obtenir une vue d'ensemble de vos pods et clusters Kubernetes.

#### Cluster Map

Les Cluster Maps Kubernetes vous offrent une vue d'ensemble de vos pods et clusters Kubernetes. Vous pouvez visualiser toutes vos ressources depuis un seul écran en définissant des groupes et des filtres personnalisés, et choisir les métriques à utiliser pour colorer les pods.

Pour analyser en détail une ressource spécifique depuis la Cluster Map, cliquez sur un cercle ou un groupe. Les détails apparaîtront alors dans un volet distinct.

#### Volet d'informations

Cliquez sur une ligne du tableau ou sur un objet de la Cluster Map pour afficher des informations sur une ressource spécifique dans un volet latéral. Ce volet est utile pour le dépannage et pour trouver des informations sur un conteneur ou une ressource, comme par exemple :

* [**Logs**][11] : visualisez les logs de votre conteneur ou de votre ressource. Cliquez sur l'un de ces logs pour afficher les logs associés dans le Log Explorer.
* [**Metrics**][12] : visualisez les métriques de votre conteneur ou ressource, mises à jour en temps réel. Vous avez la possibilité d'afficher n'importe quel graphique en plein écran et d'en partager un snapshot ou de l'exporter depuis cet onglet.
* **Network** : Visualisez les performances réseau d'un conteneur ou d'une ressource, y compris la source, la destination, le volume envoyé/reçu et le débit. Utilisez le champ **Destination** pour effectuer une recherche par tag tel que `DNS` ou `ip_type`, ou utilisez le filtre **Group by** dans cette vue pour regrouper vos données réseau par tag, tel que `pod_name` ou `service`.
* [**Traces**][13] : visualisez les traces de votre conteneur ou ressource, y compris la date, le service, la durée, la méthode et le code de statut d'une trace.

Les vues Ressources Kubernetes comprennent également les onglets suivants :

* **Processes** : Visualisez tous les processus en cours d'exécution dans le conteneur de cette ressource.
* **YAML** : Vue d'ensemble détaillée de la ressource au format YAML.
* [**Events**][14] : visualisez tous les événements Kubernetes pour votre ressource.

Pour obtenir un dashboard détaillé de cette ressource, cliquez sur l'option **View Dashboard** en haut à droite de ce volet.

### Logs de conteneur

Visualisez le flux de logs d'un conteneur, tel que `docker logs -f` ou `kubectl logs -f`, dans Datadog. Cliquez sur un conteneur dans le tableau pour afficher davantage d'informations. Cliquez sur l'onglet *Logs* pour visualiser en temps réel les données [Live Tail][15] ou les logs indexés historiques, peu importe leur date.

#### Live Tail

Avec la fonctionnalité Live Tail, tous les logs de conteneur sont diffusés sous forme de flux. Mettez un flux en pause pour lire facilement le contenu des logs en cours d'écriture. Vous pouvez ensuite réactiver la mise à jour du flux.

Vous pouvez effectuer des recherches parmi les logs du flux à l'aide d'une simple correspondance textuelle. Pour en savoir plus sur la fonctionnalité Live Tail, consultez la [documentation dédiée][15].

**Remarque** : les logs diffusés ne sont pas persistants. Si vous saisissez une nouvelle recherche ou actualisez la page, le contenu du flux est effacé.

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Aperçu des logs dans le volet latéral" video="true" >}}

#### Logs indexés

Choisissez un intervalle pour afficher les logs correspondants que vous avez choisis d'indexer et de rendre persistants. L'indexation vous permet de filtrer vos logs à l'aide de tags et de facettes. Par exemple, pour rechercher des logs affichant le statut `Error`, saisissez `status:error` dans la zone de recherche. La fonction de saisie automatique peut vous aider à trouver le tag de votre choix. Les attributs clés de vos logs sont déjà stockés dans des tags, ce qui vous permet de les rechercher, filtrer et agréger en cas de besoin.

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="Aperçu des logs dans le volet latéral" style="width:100%;">}}

## Remarques et problèmes connus

* La collecte de données en temps réel (toutes les 2 s) est désactivée après 30 minutes. Pour reprendre la collecte en temps réel, actualisez la page.
* Les réglages RBAC peuvent restreindre la collecte de métadonnées Kubernetes. Consultez les [entités RBAC pour l'Agent Datadog][16].
* Dans Kubernetes, la valeur de `health` correspond à la sonde de disponibilité des conteneurs, et non à leur sonde d'activité.

### Ressources Kubernetes

* Les données sont mises à jour automatiquement à des intervalles constants. Les intervalles de mises à jour sont susceptibles de changer durant la bêta.
* Dans les clusters comprenant plus de 1 000 déploiements ou ReplicaSets, l'Agent de cluster est susceptible de fortement solliciter le processeur. Vous avez la possibilité de désactiver le nettoyage des conteneurs dans le chart Helm. Consultez [le référentiel Helm Chart][17] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /fr/integrations/docker_daemon/
[3]: /fr/agent/kubernetes/
[4]: /fr/agent/amazon_ecs/
[5]: https://app.datadoghq.com/orchestration/overview
[6]: /fr/agent/
[7]: /fr/agent/cluster_agent/setup/
[8]: /fr/tagging/assigning_tags?tab=agentv6v7#host-tags
[9]: /fr/getting_started/tagging/unified_service_tagging
[10]: /fr/dashboards/widgets/timeseries/
[11]: /fr/logs
[12]: /fr/metrics
[13]: /fr/tracing
[14]: /fr/events
[15]: /fr/logs/live_tail/
[16]: https://github.com/DataDog/datadog-agent/blob/7.23.1/Dockerfiles/manifests/cluster-agent/rbac.yaml
[17]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog