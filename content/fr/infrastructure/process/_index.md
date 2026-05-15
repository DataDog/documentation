---
aliases:
- /fr/guides/process
- /fr/graphing/infrastructure/process/
further_reading:
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: Blog
  text: Surveiller vos processus avec Datadog
- link: /infrastructure/process/generate_process_metrics/
  tag: Documentation
  text: Augmenter la rétention des données de processus à l'aide de métriques
- link: /infrastructure/livecontainers
  tag: Documentation
  text: Consulter en temps réel tous les conteneurs de votre environnement
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: Blog
  text: Corréler les performances des logiciels et la consommation de ressources avec
    les vues enregistrées
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: Blog
  text: Résoudre plus rapidement vos problèmes avec des données d'application et réseau
    au niveau des processus
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: Blog
  text: Correction des anomalies liées aux performances des workloads avec Watchdog Insights
    pour les live processes
title: Live processes
---
<div class="alert alert-info">
Les processus en direct et la surveillance des processus en direct sont inclus dans le plan Entreprise. Pour tous les autres plans, contactez votre représentant commercial ou <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> pour demander cette fonctionnalité.
</div>

## Introduction {#introduction}

Les processus en direct de Datadog vous offrent une visibilité en temps réel sur les processus en cours d'exécution sur votre infrastructure. Utilisez les processus en direct pour :

* Voir tous vos processus en cours d'exécution au même endroit
* Décomposer la consommation de ressources sur vos hôtes et conteneurs au niveau des processus
* Interroger les processus s'exécutant sur un hôte spécifique, dans une zone spécifique, ou exécutant une charge de travail spécifique
* Surveiller la performance des logiciels internes et tiers que vous exécutez en utilisant des métriques système avec une granularité de deux secondes
* Ajouter du contexte à vos tableaux de bord et carnets de notes

{{< img src="infrastructure/process/live_processes_main.png" alt="Aperçu des processus en direct" >}}

## Installation {#installation}

Si vous utilisez l'Agent 5, suivez ce [processus d'installation spécifique][1]. Si vous utilisez l'Agent 6 ou 7, [voir les instructions ci-dessous][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Une fois l'Agent Datadog installé, activez la collecte des processus en direct en modifiant le [fichier de configuration principal de l'Agent][1] en définissant le paramètre suivant sur `true` :

```yaml
process_config:
  process_collection:
    enabled: true
```

De plus, certaines options de configuration peuvent être définies en tant que variables d'environnement.

**Remarque** : Les options définies en tant que variables d'environnement remplacent les paramètres définis dans le fichier de configuration.

Une fois la configuration effectuée, [redémarrez l'Agent][2].


[1]: /fr/agent/configuration/agent-configuration-files/
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Suivez les instructions pour l'[Agent Docker][1], en transmettant, en plus de tout autre paramètre personnalisé, les attributs suivants (selon les cas) :

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**Remarque** :

- Pour collecter des informations sur les conteneurs dans l'installation standard, l'utilisateur `dd-agent` doit avoir les autorisations nécessaires pour accéder à `docker.sock`.
- Exécuter l'Agent en tant que conteneur vous permet toujours de collecter les processus hôtes.


[1]: /fr/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

Mettez à jour votre fichier [datadog-values.yaml][1] avec la configuration de collecte de processus suivante :

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```

Ensuite, mettez à niveau votre Helm chart :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

**Remarque** : Exécuter l'Agent en tant que conteneur vous permet toujours de collecter les processus hôtes.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator Datadog" %}}

Dans votre `datadog-agent.yaml`, définissez `features.liveProcessCollection.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

{{% k8s-operator-redeploy %}}

**Remarque** : Exécuter l'Agent en tant que conteneur vous permet toujours de collecter les processus hôtes.

{{% /tab %}}
{{% tab "Kubernetes (Manuel)" %}}

Dans le manifeste `datadog-agent.yaml` utilisé pour créer le DaemonSet, ajoutez les variables d'environnement suivantes, le montage de volume et le volume :

```yaml
 env:
    - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

Consultez l'installation standard du [DaemonSet][1] et les pages d'informations sur l'[Agent Docker][2] pour plus de documentation.

**Remarque** : Exécuter l'Agent en tant que conteneur vous permet toujours de collecter les processus hôtes.

[1]: /fr/containers/guide/kubernetes_daemonset
[2]: /fr/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-info">Vous pouvez voir vos processus ECS Fargate dans Datadog. Pour voir leur relation avec les conteneurs ECS Fargate, utilisez l'Agent Datadog v7.50.0 ou une version ultérieure.</div>

Pour collecter des processus, l'Agent Datadog doit être exécuté en tant que conteneur au sein de la tâche.

Pour activer la surveillance des processus dans ECS Fargate, définissez la variable d'environnement `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` sur `true` dans la définition du conteneur de l'Agent Datadog au sein de la définition de la tâche.

Exemple :

```json
{
    "taskDefinitionArn": "...",
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            ...
            "environment": [
                {
                    "name": "DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED",
                    "value": "true"
                }
                ...
             ]
         ...
         }
    ]
  ...
}
```

Pour commencer à collecter des informations sur les processus dans ECS Fargate, ajoutez le paramètre [`pidMode`][3] à la définition de la tâche et définissez-le sur `task` comme suit :

```text
"pidMode": "task"
```

Une fois activé, utilisez le volet `AWS Fargate` conteneurs sur la [page des processus en direct][1] pour filtrer les processus s'exécutant dans ECS, ou entrez `fargate:ecs` dans la requête de recherche.

{{< img src="infrastructure/process/fargate_ecs.png" alt="Processus dans AWS Fargate" >}}

Pour plus d'informations sur l'installation de l'Agent Datadog avec AWS ECS Fargate, consultez la [documentation d'intégration ECS Fargate][2].

[1]: https://app.datadoghq.com/process
[2]: /fr/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### Statistiques I/O {#io-stats}

Les statistiques I/O et des fichiers ouverts peuvent être collectées par le système-probe Datadog, qui s'exécute avec des privilèges élevés. Pour collecter ces statistiques, activez le module de processus du système-probe :

1. Copiez la configuration d'exemple du système-probe :

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. Éditez `/etc/datadog-agent/system-probe.yaml` pour activer le module de processus :

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Redémarrer l'Agent][12] :

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **Remarque** : Si la commande `systemctl` n'est pas disponible sur votre système, exécutez plutôt la commande suivante : `sudo service datadog-agent restart`


### Empreinte de collecte de processus optimisée {#optimized-process-collection-footprint}

Sur Linux, l'empreinte globale de l'Agent Datadog est réduite en exécutant la collecte de conteneurs et de processus dans l'Agent Datadog principal (au lieu de l'Agent de Processus séparé). Dans Datadog Agent v7.65.0+, cela est activé par défaut.  **Remarque** : l'Agent de Processus est toujours requis pour [Surveillance du Réseau Cloud][14].

L'état de l'Agent pour cette fonctionnalité est répertorié dans la section `Process Component`, par exemple :

```text
=================
Process Component
=================


  Enabled Checks: [process rtprocess]
  System Probe Process Module Status: Not running
  Process Language Detection Enabled: False

  =================
  Process Endpoints
  =================
    https://process.datadoghq.com. - API Key ending with:
        - *****

  =========
  Collector
  =========
    Last collection time: 2026-01-14 10:04:49
    Docker socket: /var/run/docker.sock
    Number of processes: 48
    Number of containers: 0
    Process Queue length: 0
    RTProcess Queue length: 0
    Connections Queue length: 0
    Event Queue length: 0
    Pod Queue length: 0
    Process Bytes enqueued: 0
    RTProcess Bytes enqueued: 0
    Connections Bytes enqueued: 0
    Event Bytes enqueued: 0
    Pod Bytes enqueued: 0
    Drop Check Payloads: []
    Number of submission errors: 0
```

### Nettoyage des arguments de processus {#process-arguments-scrubbing}

Pour masquer les données sensibles sur la page des processus en direct, l'Agent nettoie les arguments sensibles de la ligne de commande du processus. Cette fonctionnalité est activée par défaut et tout argument de processus qui correspond à l'un des mots suivants a sa valeur masquée.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Remarque** : La correspondance est **insensible à la casse**.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Définissez votre propre liste à fusionner avec la liste par défaut, en utilisant le champ `custom_sensitive_words` dans le fichier `datadog.yaml` sous la section `process_config`. Utilisez des jokers (`*`) pour définir votre propre portée de correspondance. Cependant, un seul joker (`'*'`) n'est pas pris en charge en tant que mot sensible.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**Remarque** : Les mots dans `custom_sensitive_words` doivent contenir uniquement des caractères alphanumériques, des traits de soulignement ou des jokers (`'*'`). Un mot sensible composé uniquement de jokers n'est pas pris en charge.

L'image suivante montre un processus sur la page Live Processes dont les arguments ont été masqués à l'aide de la configuration ci-dessus.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="Nettoyage des arguments de processus" style="width:100%;">}}

Définissez `scrub_args` sur `false` pour désactiver complètement le nettoyage des arguments de processus.

Vous pouvez également nettoyer **tous** les arguments des processus en activant le drapeau `strip_proc_arguments` dans votre fichier de configuration `datadog.yaml` :

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Vous pouvez utiliser le graphique Helm pour définir votre propre liste, qui est fusionnée avec la liste par défaut. Ajoutez les variables d'environnement `DD_SCRUB_ARGS` et `DD_CUSTOM_SENSITIVE_WORDS` à votre fichier `datadog-values.yaml`, et mettez à jour votre Helm chart Datadog :

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
    agents:
        containers:
            processAgent:
                env:
                - name: DD_SCRUB_ARGS
                  value: "true"
                - name: DD_CUSTOM_SENSITIVE_WORDS
                  value: "personal_key,*token,*token,sql*,*pass*d*"
```


Utilisez des jokers (`*`) pour définir votre propre portée de correspondance. Cependant, un seul joker (`'*'`) n'est pas pris en charge en tant que mot sensible.

Définissez `DD_SCRUB_ARGS` sur `false` pour désactiver complètement le nettoyage des arguments de processus.

Alternativement, vous pouvez nettoyer **tous** les arguments des processus en activant la variable `DD_STRIP_PROCESS_ARGS` dans votre fichier `datadog-values.yaml` :

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
agents:
    containers:
        processAgent:
            env:
            - name: DD_STRIP_PROCESS_ARGS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}


## Requêtes {#queries}

### Définition des processus {#scoping-processes}

Les processus sont, par nature, des objets d'une cardinalité extrêmement élevée. Pour affiner votre portée afin de visualiser les processus pertinents, vous pouvez utiliser des filtres de texte et de balises.

#### Filtres de texte {#text-filters}

Lorsque vous saisissez une chaîne de texte dans la barre de recherche, une recherche de chaîne floue est utilisée pour interroger les processus contenant cette chaîne de texte dans leurs lignes de commande ou chemins. Entrez une chaîne de deux caractères ou plus pour voir les résultats. Ci-dessous se trouve l'environnement de démonstration de Datadog, filtré avec la chaîne `postgres /9.`.

**Remarque** : `/9.` a été trouvé dans le chemin de commande, et `postgres` correspond à la commande elle-même.

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

Pour combiner plusieurs termes de recherche dans une requête complexe, utilisez l'un des opérateurs booléens suivants :

`AND`
: **Intersection**: les deux termes sont dans les événements sélectionnés (si rien n'est ajouté, AND est pris par défaut)<br> **Exemple**: `java AND elasticsearch`

`OR`
: **Union** : soit le terme est contenu dans les événements sélectionnés <br> **Exemple** : `java OR python`

`NOT` / `!`
: **Exclusion** : le terme suivant n'est PAS dans l'événement. Vous pouvez utiliser le mot `NOT` ou le caractère `!` pour effectuer la même opération<br> **Exemple** : `java NOT elasticsearch` ou `java !elasticsearch`

Utilisez des parenthèses pour regrouper les opérateurs. Par exemple, `(NOT (elasticsearch OR kafka) java) OR python` .

#### Filtres de balises {#tag-filters}

Vous pouvez également filtrer vos processus en utilisant les [balises][3] Datadog, telles que `host`, `pod`, `user` et `service`. Saisissez les filtres de balises directement dans la barre de recherche, ou sélectionnez-les dans le panneau de facettes à gauche de la page.

Datadog génère automatiquement une balise `command`, afin que vous puissiez filtrer pour :

- Logiciels tiers, par exemple : `command:mongod`, `command:nginx`
- Logiciels de gestion de conteneurs, par exemple : `command:docker`, `command:kubelet`
- Charges de travail courantes, par exemple : `command:ssh`, `command:CRON`

#### Balises d'environnement conteneurisé {#containerized-environment-tags}

En outre, les processus dans les conteneurs ECS présentent également les tags suivants :

- `task_name`
- `task_version`
- `ecs_cluster`

Les processus des conteneurs Kubernetes se voient appliquer les tags suivants :

- `pod_name`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `kube_cluster_name`

Si vous avez une configuration pour [Tagging de Service Unifié][4] en place, `env`, `service` et `version` sont récupérés automatiquement.
Avoir ces balises disponibles vous permet de relier APM, journaux, métriques et données de processus.
**Remarque** : Cette configuration s'applique uniquement aux environnements conteneurisés.

#### Règles pour créer des balises personnalisées {#rules-to-create-custom-tags}
<div class="alert alert-info">
Nécessite le <code>Process Tags Read</code> et <code>Process Tag Write</code>  permissions de rôle Datadog<br/>
</div>

Vous pouvez créer des définitions de règles pour ajouter des balises manuelles aux processus en fonction de la ligne de commande.

1. Dans l'onglet **Gérer les balises de processus**, sélectionnez le bouton _Nouvelle règle de balise de processus_
2. Sélectionnez un processus à utiliser comme référence
3. Définissez les critères d'analyse et de correspondance pour votre balise
4. Si la validation réussit, créez une nouvelle règle

Après qu'une règle est créée, des balises sont disponibles pour toutes les valeurs de ligne de commande de processus qui correspondent aux critères de la règle. Ces balises sont disponibles dans la recherche et peuvent être utilisées dans la définition des [Moniteurs de Processus en Direct][6] et des [Métriques Personnalisées][13].

## Diagramme de dispersion {#scatter-plot}

Utilisez l'analyse de nuage de points pour comparer deux métriques entre elles, afin de mieux comprendre les performances de vos conteneurs.

Pour accéder à l'analyse du diagramme de dispersion [dans la page des Processus][5], cliquez sur le bouton _Afficher le graphique de résumé_ puis sélectionnez l'onglet "Diagramme de Dispersion" :

{{< img src="infrastructure/process/scatterplot_selection.png" alt="Sélection du diagramme de dispersion" style="width:60%;">}}

Par défaut, le graphique regroupe par la clé de balise `command`. La taille de chaque point représente le nombre de processus dans ce groupe, et cliquer sur un point affiche les processus individuels et les conteneurs qui contribuent au groupe.

Les options en haut du graphique vous permettent de contrôler votre analyse du diagramme de dispersion :

- Sélection des métriques à afficher.
- Sélection de la méthode d'agrégation pour les deux métriques.
- Sélection de l'échelle des axes X et Y (_Linéaire_/_Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="Inspection du conteneur" style="width:80%;">}}

## Moniteurs de processus {#process-monitors}

Utilisez le [Moniteur de Processus en Direct][6] pour générer des alertes basées sur le nombre de tout groupe de processus à travers les hôtes ou les balises. Vous pouvez configurer des alertes de processus dans la [page des Moniteurs][7]. Pour en savoir plus, consultez la [documentation du Moniteur de Processus en Direct][6].

{{< img src="infrastructure/process/process_monitor.png" alt="Moniteur de Processus" style="width:80%;">}}

## Processus dans les tableaux de bord et les carnets {#processes-in-dashboards-and-notebooks}

Vous pouvez représenter graphiquement les métriques de processus dans les tableaux de bord et carnets en utilisant le [Timeseries widget][8]. Pour configurer :
1. Sélectionnez les processus comme source de données
2. Filtrer en utilisant des chaînes de texte dans la barre de recherche
3. Sélectionnez une métrique de processus à représenter graphiquement
4. Filtrer en utilisant des étiquettes dans le champ `From`

{{< img src="infrastructure/process/process_widget.png" alt="Processes widget" style="width:80%;">}}

## Surveillance des logiciels tiers {#monitoring-third-party-software}

### Intégrations autodétectées {#autodetected-integrations}

Datadog utilise la collecte de processus pour autodétecter les technologies fonctionnant sur vos hôtes. Cela identifie les intégrations Datadog qui peuvent vous aider à surveiller ces technologies. Ces intégrations autodétectées sont affichées dans la [Recherche d'intégrations][1] :

{{< img src="getting_started/integrations/ad_integrations.png" alt="Intégrations détectées automatiquement" >}}

Chaque intégration possède l'un des deux types de statuts suivants :

- **+ Détecté** : Cette intégration n'est activée sur aucun hôte qui l'exécute.
- **✓ Visibilité partielle** : Cette intégration est activée sur certains hôtes pertinents, mais pas tous les hôtes concernés ne l'exécutent.

Les hôtes qui exécutent l'intégration, mais où l'intégration n'est pas activée, peuvent être trouvés dans l'onglet **Hôtes** de la tuile des intégrations.

### Vues d'intégration {#integration-views}

{{< img src="infrastructure/process/integration_views.png" alt="Vues d'intégration" >}}

Une fois qu'un logiciel tiers a été détecté, les live processes vous permettent d'analyser les performances de ce logiciel.
1. Pour commencer, cliquez sur *Vues* en haut à droite de la page pour ouvrir une liste d'options prédéfinies, y compris Nginx, Redis et Kafka.
2. Sélectionnez une vue pour limiter la page uniquement aux processus exécutant ce logiciel.
3. Lors de l'inspection d'un processus lourd, passez à l'onglet *Métriques d'intégration* pour analyser la santé du logiciel sur l'hôte sous-jacent. Si vous avez déjà activé l'intégration Datadog pertinente, vous pouvez consulter toutes les métriques de performance collectées à partir de l'intégration pour distinguer entre un problème au niveau de l'hôte et un problème au niveau du logiciel. Par exemple, voir des pics corrélés dans l'utilisation du CPU des processus et la latence des requêtes MySQL peut indiquer qu'une opération intensive, comme un scan complet de table, retarde l'exécution d'autres requêtes MySQL s'appuyant sur les mêmes ressources sous-jacentes.

Vous pouvez personnaliser les vues d'intégration (par exemple, lors de l'agrégation d'une requête pour les processus Nginx par hôte) ainsi que d'autres requêtes personnalisées en cliquant sur le bouton *+Save* en haut de la page. Cela enregistre votre requête, les sélections de colonnes de table et les paramètres de visualisation. Créez des vues enregistrées pour un accès rapide aux processus qui vous intéressent sans configuration supplémentaire, et pour partager les données des processus avec vos coéquipiers.

## Processus sur la plateforme {#processes-across-the-platform}

### Conteneurs en direct {#live-containers}

Live Processes offre une visibilité supplémentaire sur vos déploiements de conteneurs en surveillant les processus en cours d'exécution sur chacun de vos conteneurs. Cliquez sur un conteneur dans la page [Live Containers][9] pour visualiser son arbre de processus, y compris les commandes qu'il exécute et leur consommation de ressources. Utilisez ces données avec d'autres métriques de conteneur pour déterminer la cause profonde des conteneurs ou des déploiements échoués.

### APM {#apm}

Dans [APM Traces][10], vous pouvez cliquer sur le span d'un service pour voir les processus en cours d'exécution sur son infrastructure sous-jacente. Les processus du span d'un service sont corrélés avec les hôtes ou les pods sur lesquels le service s'exécute au moment de la demande. Analysez les métriques des processus telles que l'utilisation du CPU et la mémoire RSS aux côtés des erreurs au niveau du code pour distinguer les problèmes spécifiques à l'application des problèmes d'infrastructure plus larges. Cliquer sur un processus vous amène à la page Live Processes. Les processus associés ne sont pas pris en charge pour les traces serverless ni pour les traces de navigateur.

### Cloud Network Monitoring {#cloud-network-monitoring}

Lorsque vous inspectez une dépendance dans la page [Analyse du réseau][11], vous pouvez voir les processus en cours d'exécution sur l'infrastructure sous-jacente des points de terminaison, tels que les services communiquant entre eux. Utilisez les métadonnées des processus pour déterminer si une mauvaise connectivité réseau (indiquée par un nombre élevé de retransmissions TCP) ou une latence élevée des appels réseau (indiquée par un temps de réponse TCP élevé) pourrait être due à des charges de travail lourdes consommant les ressources de ces points de terminaison, et donc, affectant la santé et l'efficacité de leur communication.

## Surveillance en temps réel {#real-time-monitoring}

Les processus sont normalement collectés à une résolution de 10 secondes. Pendant que vous travaillez activement avec la page Live Processes, les métriques sont collectées à une résolution de 2 secondes et affichées en temps réel, ce qui est important pour des métriques volatiles telles que le CPU. Cependant, pour le contexte historique, les métriques sont ingérées à la résolution par défaut de 10 secondes.

## Informations supplémentaires {#additional-information}

- La collecte de données en temps réel (2s) est désactivée après 30 minutes. Pour reprendre la collecte en temps réel, rafraîchissez la page.
- Dans les déploiements de conteneurs, le fichier `/etc/passwd` monté dans le `docker-dd-agent` est nécessaire pour collecter les noms d'utilisateur pour chaque processus. C'est un fichier public et l'Agent de Processus n'utilise aucun champ sauf le nom d'utilisateur. Si l'Agent fonctionne sans privilèges, le montage ne se produit pas. Même sans accès au fichier `/etc/passwd`, toutes les fonctionnalités, sauf le champ de métadonnées `user`, fonctionnent toujours. **Note** : Live Processes n'utilise que le fichier `passwd` de l'hôte et ne résout pas les noms d'utilisateur pour les utilisateurs créés dans des conteneurs.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/agent-5-process-collection/
[2]: /fr/agent/
[3]: /fr/getting_started/tagging/
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /fr/monitors/types/process/
[7]: https://app.datadoghq.com/monitors/create/live_process
[8]: /fr/dashboards/widgets/timeseries/#pagetitle
[9]: /fr/infrastructure/livecontainers/
[10]: /fr/tracing/
[11]: /fr/network_monitoring/cloud_network_monitoring/network_analytics
[12]: /fr/agent/configuration/agent-commands/#restart-the-agent
[13]: /fr/metrics/custom_metrics/
[14]: /fr/network_monitoring/cloud_network_monitoring/