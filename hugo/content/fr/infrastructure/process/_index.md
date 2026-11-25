---
aliases:
- /fr/guides/process
- /fr/graphing/infrastructure/process/
further_reading:
- link: /infrastructure/process/generate_process_metrics/
  tag: Documentation
  text: Augmentez la rétention des données de processus avec des métriques
- link: /infrastructure/livecontainers
  tag: Documentation
  text: Obtenez une visibilité en temps réel sur tous les conteneurs de votre environnement
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: Blog
  text: Surveillez vos processus avec Datadog
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: Blog
  text: Corrélez les performances logicielles et la consommation des ressources avec
    des vues enregistrées
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: Blog
  text: Résolvez les problèmes plus rapidement grâce aux données réseau et d'application
    au niveau du processus
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: Blog
  text: Résolvez les anomalies de performance des charges de travail avec Watchdog
    Insights pour Live Processes
title: Live Processes
---
<div class="alert alert-info">
Live Processes et Live Process Monitoring sont inclus dans l'offre Enterprise. Pour tous les autres forfaits, contactez votre responsable de compte ou <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> pour demander cette fonctionnalité.
</div>

## Introduction {#introduction}

Live Processes de Datadog vous offre une visibilité en temps réel sur les processus exécutés sur votre infrastructure. Utilisez Live Processes pour :

* Affichez tous vos processus en cours d'exécution au même endroit
* Décomposez la consommation des ressources sur vos hosts et conteneurs au niveau du processus
* Effectuez une requête pour trouver les processus exécutés sur un host spécifique, dans une zone spécifique ou exécutant une charge de travail spécifique
* Surveillez les performances des logiciels internes et tiers que vous exécutez à l'aide de métriques système avec une granularité de deux secondes
* Ajoutez du contexte à vos dashboards et notebooks

{{< img src="infrastructure/process/live_processes_main.png" alt="Présentation de Live Processes" >}}

## Installation {#installation}

Si vous utilisez l'Agent 5, suivez ce [processus d'installation spécifique][1]. Si vous utilisez l'Agent 6 ou 7, [consultez les instructions ci-dessous][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Une fois le Datadog Agent installé, activez la collecte Live Processes en modifiant le [fichier de configuration principal de l'Agent][1] et en définissant le paramètre suivant sur `true` :

```yaml
process_config:
  process_collection:
    enabled: true
```

De plus, certaines options de configuration peuvent être définies en tant que variables d'environnement.

**Remarque** : Les options définies en tant que variables d'environnement remplacent les paramètres définis dans le fichier de configuration.

Une fois la configuration effectuée, [redémarrez l'Agent][2].


[1]: /fr/agent/configuration/agent-configuration-files/
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Suivez les instructions pour le [Docker Agent][1], en transmettant les attributs suivants, en plus de tout autre paramètre personnalisé si nécessaire :

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**Note** :

- Pour collecter des informations sur les conteneurs lors d'une installation standard, l'utilisateur `dd-agent` doit disposer des autorisations nécessaires pour accéder à `docker.sock`.
- L'exécution de l'Agent en tant que conteneur vous permet toujours de collecter les processus des hosts.


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

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

**Remarque** : L'exécution de l'Agent en tant que conteneur vous permet toujours de collecter les processus des hosts.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog Operator" %}}

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

**Remarque** : L'exécution de l'Agent en tant que conteneur vous permet toujours de collecter les processus des hosts.

{{% /tab %}}
{{% tab "Kubernetes (manuel)" %}}

Dans le manifeste `datadog-agent.yaml` utilisé pour créer le DaemonSet, ajoutez les variables d'environnement, le montage de volume et le volume suivants :

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

Consultez les pages de documentation sur l'[installation standard du DaemonSet][1] et sur le [Docker Agent][2] pour plus d'informations.

**Remarque** : L'exécution de l'Agent en tant que conteneur vous permet toujours de collecter les processus des hosts.

[1]: /fr/containers/guide/kubernetes_daemonset
[2]: /fr/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-info">Vous pouvez afficher vos processus ECS Fargate dans Datadog. Pour voir leur relation avec les conteneurs ECS Fargate, utilisez le Datadog Agent v7.50.0 ou une version ultérieure.</div>

Afin de collecter les processus, le Datadog Agent doit être exécuté en tant que conteneur au sein de la tâche.

Pour activer la surveillance des processus dans ECS Fargate, définissez la variable d'environnement `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` sur `true` dans la définition du conteneur du Datadog Agent au sein de la définition de tâche.

Par exemple :

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

Pour commencer à collecter des informations sur les processus dans ECS Fargate, ajoutez le [paramètre `pidMode`][3] à la définition de tâche et définissez-le sur `task` comme suit :

```text
"pidMode": "task"
```

Une fois activé, utilisez la facette `AWS Fargate` Containers sur la [page Live Processes][1] pour filtrer les processus s'exécutant dans ECS, ou saisissez `fargate:ecs` dans la requête de recherche.

{{< img src="infrastructure/process/fargate_ecs.png" alt="Processus dans AWS Fargate" >}}

Pour plus d'informations sur l'installation du Datadog Agent avec AWS ECS Fargate, consultez la [documentation de l'intégration ECS Fargate][2].

[1]: https://app.datadoghq.com/process
[2]: /fr/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### Statistiques d'E/S {#io-stats}

Les statistiques d'E/S et de fichiers ouverts peuvent être collectées par le system-probe Datadog, qui s'exécute avec des privilèges élevés. Pour collecter ces statistiques, activez le module de processus du system-probe :

1. Copiez l'exemple de configuration du system-probe :

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. Modifiez `/etc/datadog-agent/system-probe.yaml` pour activer le module de processus :

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Redémarrez l'Agent][12] :

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **Remarque** : si la commande `systemctl` n'est pas disponible sur votre système, exécutez plutôt la commande suivante : `sudo service datadog-agent restart`


### Empreinte de collecte de processus optimisée {#optimized-process-collection-footprint}

Sous Linux, l'empreinte globale du Datadog Agent est réduite en exécutant la collecte des conteneurs et des processus dans le Datadog Agent principal (au lieu du Process Agent distinct). Dans Datadog Agent v7.65.0+, cette fonctionnalité est activée par défaut.  **Remarque** : le Process Agent est toujours requis pour [Cloud Network Monitoring][14].

Le statut de l'Agent pour cette fonctionnalité est répertorié dans la section `Process Component`, par exemple :

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

Afin de masquer les données sensibles sur la page Live Processes, l'Agent nettoie les arguments sensibles de la ligne de commande du processus. Cette fonctionnalité est activée par défaut et la valeur de tout argument de processus correspondant à l'un des mots suivants est masquée.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Remarque** : la correspondance est **insensible à la casse**.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Définissez votre propre liste à fusionner avec la liste par défaut, en utilisant le champ `custom_sensitive_words` dans le fichier `datadog.yaml` sous la section `process_config`. Utilisez des caractères génériques (`*`) pour définir votre propre périmètre de correspondance. Cependant, un seul caractère générique (`'*'`) n'est pas pris en charge en tant que mot sensible.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**Remarque** : les mots dans `custom_sensitive_words` ne doivent contenir que des caractères alphanumériques, des traits de soulignement ou des caractères génériques (`'*'`). Un mot sensible composé uniquement de caractères génériques n'est pas pris en charge.

L'image suivante montre un processus sur la page Live Processes dont les arguments ont été masqués en utilisant la configuration ci-dessus.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="Nettoyage des arguments de processus" style="width:100%;">}}

Définissez `scrub_args` sur `false` pour désactiver complètement le nettoyage des arguments de processus.

Vous pouvez également nettoyer **tous** les arguments des processus en activant l'indicateur `strip_proc_arguments` dans votre fichier de configuration `datadog.yaml` :

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Vous pouvez utiliser le chart Helm pour définir votre propre liste, qui est fusionnée avec la liste par défaut. Ajoutez les variables d'environnement `DD_SCRUB_ARGS` et `DD_CUSTOM_SENSITIVE_WORDS` à votre fichier `datadog-values.yaml`, puis mettez à niveau votre chart Helm Datadog :

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


Utilisez des caractères génériques (`*`) pour définir votre propre périmètre de correspondance. Cependant, un seul caractère générique (`'*'`) n'est pas pris en charge en tant que mot sensible.

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

### Définir le périmètre des processus {#scoping-processes}

Les processus sont, par nature, des objets à cardinalité extrêmement élevée. Pour affiner votre périmètre afin d'afficher les processus pertinents, vous pouvez utiliser des filtres de texte et de tags.

#### Filtres de texte {#text-filters}

Lorsque vous saisissez une chaîne de texte dans la barre de recherche, une recherche approximative est utilisée pour interroger les processus contenant cette chaîne de texte dans leurs lignes de commande ou leurs chemins. Saisissez une chaîne de deux caractères ou plus pour voir les résultats. Ci-dessous se trouve l'environnement de démonstration de Datadog, filtré avec la chaîne `postgres /9.`.

**Remarque** : `/9.` a été trouvé dans le chemin de commande, et `postgres` correspond à la commande elle-même.

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

Pour combiner plusieurs recherches de chaînes en une requête complexe, utilisez l'un des opérateurs booléens suivants :

`AND`
: **Intersection**: les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut)<br> **Exemple**: `java AND elasticsearch`

`OR`
: **Union** : un des deux termes figure dans les événements sélectionnés <br> **Exemple** : `java OR python`

`NOT` / `!`
: **Exclusion** : le terme suivant n'est PAS présent dans l'événement. Vous pouvez utiliser le mot `NOT` ou le caractère `!` pour effectuer la même opération<br> **Exemple** : `java NOT elasticsearch` ou `java !elasticsearch`

Utilisez des parenthèses pour regrouper les opérateurs. Par exemple, `(NOT (elasticsearch OR kafka) java) OR python`.

#### Filtres de tags {#tag-filters}

Vous pouvez également filtrer vos processus à l'aide des [tags][3] Datadog, tels que `host`, `pod`, `user` et `service`. Saisissez les filtres de tags directement dans la barre de recherche ou sélectionnez-les dans le panneau des facettes à gauche de la page.

Datadog génère automatiquement un tag `command`, afin que vous puissiez filtrer par :

- Logiciels tiers, par exemple : `command:mongod`, `command:nginx`
- Logiciels de gestion de conteneurs, par exemple : `command:docker`, `command:kubelet`
- Charges de travail courantes, par exemple : `command:ssh`, `command:CRON`

#### Tags d'environnement conteneurisé {#containerized-environment-tags}

De plus, les processus dans les conteneurs ECS sont également tagués par :

- `task_name`
- `task_version`
- `ecs_cluster`

Les processus dans les conteneurs Kubernetes sont tagués par :

- `pod_name`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `kube_cluster_name`

Si vous avez configuré le [Unified Service Tagging][4], `env`, `service` et `version` sont automatiquement détectés.
La disponibilité de ces tags vous permet de relier l'APM, les logs, les métriques et les données de processus.
**Remarque** : cette configuration s'applique uniquement aux environnements conteneurisés.

#### Règles de création de tags personnalisés {#rules-to-create-custom-tags}
<div class="alert alert-info">
Nécessite les <code>Process Tags Read</code> et <code>Process Tag Write</code>  autorisations de rôle Datadog<br/>
</div>

Vous pouvez créer des définitions de règles pour ajouter manuellement des tags aux processus en fonction de la ligne de commande.

1. Dans l'onglet **Manage Process Tags**, sélectionnez le bouton _New Process Tag Rule_
2. Sélectionnez un processus à utiliser comme référence
3. Définissez les critères de parsing et de correspondance pour votre tag
4. Si la validation réussit, créez une nouvelle règle

Une fois la règle créée, les tags sont disponibles pour toutes les valeurs de ligne de commande de processus qui correspondent aux critères de la règle. Ces tags sont disponibles dans la recherche et peuvent être utilisés dans la définition de [Live Process Monitors][6] et de [Custom Metrics][13].

## Nuage de points {#scatter-plot}

Utilisez l'analyse par nuage de points pour comparer deux métriques entre elles afin de mieux comprendre les performances de vos conteneurs.

Pour accéder à l'analyse par nuage de points [sur la page Processes][5], cliquez sur le bouton _Show Summary graph_, puis sélectionnez l'onglet « Scatter Plot » :

{{< img src="infrastructure/process/scatterplot_selection.png" alt="Sélection du nuage de points" style="width:60%;">}}

Par défaut, le graphique effectue un regroupement par clé de tag `command`. La taille de chaque point représente le nombre de processus dans ce groupe, et cliquer sur un point affiche les processus et conteneurs individuels qui contribuent au groupe.

Les options en haut du graphique vous permettent de contrôler votre analyse par nuage de points :

- Sélection des métriques à afficher.
- Sélection de la méthode d'agrégation pour les deux métriques.
- Sélection de l'échelle des axes X et Y (_Linear_/_Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="Inspection de conteneur" style="width:80%;">}}

## Moniteurs de processus {#process-monitors}

Utilisez le [Live Process Monitor][6] pour générer des alertes basées sur le nombre de n'importe quel groupe de processus sur des hosts ou des tags. Vous pouvez configurer des alertes de processus sur la [page Monitors][7]. Pour en savoir plus, consultez la [documentation du Live Process Monitor][6].

{{< img src="infrastructure/process/process_monitor.png" alt="Process Monitor" style="width:80%;">}}

## Processus dans les dashboards et les notebooks {#processes-in-dashboards-and-notebooks}

Vous pouvez représenter graphiquement les métriques de processus dans les dashboards et les notebooks à l'aide du [widget Timeseries][8]. Pour configurer cela :
1. Sélectionnez Processes comme source de données
2. Filtrez à l'aide de chaînes de texte dans la barre de recherche
3. Sélectionnez une métrique de processus à représenter graphiquement
4. Filtrez à l'aide de tags dans le champ `From`

{{< img src="infrastructure/process/process_widget.png" alt="Widget Processes" style="width:80%;">}}

## Surveillance de logiciels tiers {#monitoring-third-party-software}

### Intégrations détectées automatiquement {#autodetected-integrations}

Datadog utilise la collecte de processus pour détecter automatiquement les technologies exécutées sur vos hosts. Cela identifie les intégrations Datadog qui peuvent vous aider à surveiller ces technologies. Ces intégrations détectées automatiquement sont affichées dans la [recherche Integrations][1] :

{{< img src="getting_started/integrations/ad_integrations.png" alt="Intégrations détectées automatiquement" >}}

Chaque intégration possède l'un des deux types de statut suivants :

- **+ Detected** : cette intégration n'est activée sur aucun host qui l'exécute.
- **✓ Partial Visibility** : cette intégration est activée sur certains hosts, mais pas sur tous les hosts concernés qui l'exécutent.

Les hosts qui exécutent l'intégration, mais sur lesquels celle-ci n'est pas activée, se trouvent dans l'onglet **Hosts** de la vignette des intégrations.

### Vues d'intégration {#integration-views}

{{< img src="infrastructure/process/integration_views.png" alt="Vues d'intégration" >}}

Une fois qu'un logiciel tiers a été détecté, Live Processes aide à analyser les performances de ce logiciel.
1. Pour commencer, cliquez sur *Views* en haut à droite de la page pour ouvrir une liste d'options prédéfinies, notamment Nginx, Redis et Kafka.
2. Sélectionnez une vue pour définir le périmètre de la page de façon à n'afficher que les processus exécutant ce logiciel.
3. Lors de l'inspection d'un processus lourd, passez à l'onglet *Integration Metrics* pour analyser l'état de santé du logiciel sur le host sous-jacent. Si vous avez déjà activé l'intégration Datadog pertinente, vous pouvez consulter toutes les métriques de performance collectées par l'intégration pour distinguer un problème au niveau du host d'un problème au niveau du logiciel. Par exemple, observer des pics corrélés dans l'utilisation du processeur par le processus et la latence des requêtes MySQL peut indiquer qu'une opération intensive, telle qu'une analyse complète du tableau, retarde l'exécution d'autres requêtes MySQL dépendant des mêmes ressources sous-jacentes.

Vous pouvez personnaliser les vues d'intégration (par exemple, lors de l'agrégation d'une requête pour les processus Nginx par host) et d'autres requêtes personnalisées en cliquant sur le bouton *+Save* en haut de la page. Cela enregistre votre requête, vos sélections de colonnes de tableau et vos paramètres de visualisation. Créez des vues enregistrées pour accéder rapidement aux processus qui vous intéressent sans configuration supplémentaire, et pour partager les données de processus avec vos collaborateurs.

## Processus sur l'ensemble de la plateforme {#processes-across-the-platform}

### Live Containers {#live-containers}

Live Processes ajoute une visibilité supplémentaire à vos déploiements de conteneurs en surveillant les processus s'exécutant sur chacun de vos conteneurs. Cliquez sur un conteneur dans la page [Live Containers][9] pour afficher son arborescence de processus, y compris les commandes qu'il exécute et leur consommation de ressources. Utilisez ces données parallèlement à d'autres métriques de conteneurs pour déterminer la cause profonde des échecs de conteneurs ou de déploiements.

### APM {#apm}

Dans [APM Traces][10], vous pouvez cliquer sur le span d'un service pour voir les processus s'exécutant sur son infrastructure sous-jacente. Les processus du span d'un service sont corrélés avec les hosts ou les pods sur lesquels le service s'exécute au moment de la requête. Analysez les métriques de processus telles que le CPU et la mémoire RSS parallèlement aux erreurs au niveau du code pour distinguer les problèmes spécifiques à l'application des problèmes d'infrastructure plus larges. Un clic sur un processus ouvre la page Live Processes. Les processus associés ne sont pas pris en charge pour les traces serverless et de navigateur.

### Cloud Network Monitoring {#cloud-network-monitoring}

Lorsque vous inspectez une dépendance dans la page [Network Analytics][11], vous pouvez voir les processus s'exécutant sur l'infrastructure sous-jacente des endpoints, tels que les services communiquant entre eux. Utilisez les métadonnées de processus pour déterminer si une mauvaise connectivité réseau (indiquée par un nombre élevé de retransmissions TCP) ou une latence élevée des appels réseau (indiquée par un temps d'aller-retour TCP élevé) pourrait être due à des charges de travail lourdes consommant les ressources de ces endpoints, affectant ainsi la santé et l'efficacité de leur communication.

## Surveillance en temps réel {#real-time-monitoring}

Les processus sont normalement collectés avec une résolution de 10 s. Lorsque vous travaillez activement avec la page Live Processes, les métriques sont collectées avec une résolution de 2 s et affichées en temps réel, ce qui est important pour les métriques volatiles telles que le CPU. Cependant, pour le contexte historique, les métriques sont ingérées avec la résolution par défaut de 10 s.

## Informations supplémentaires {#additional-information}

- La collecte de données en temps réel (2 s) est désactivée après 30 minutes. Pour reprendre la collecte en temps réel, actualisez la page.
- Dans les déploiements de conteneurs, le fichier `/etc/passwd` monté dans le `docker-dd-agent` est nécessaire pour collecter le nom d’utilisateur de chaque processus. Il s'agit d'un fichier public et le Process Agent n'utilise aucun champ à l'exception du nom d'utilisateur. Si l'Agent s'exécute sans privilèges, le montage ne se produit pas. Même sans accès au fichier `/etc/passwd`, toutes les fonctionnalités, à l'exception du champ de métadonnées `user`, continuent de fonctionner. **Remarque** : Live Processes utilise uniquement le fichier `passwd` du host et n'effectue pas de résolution de nom d'utilisateur pour les utilisateurs créés au sein des conteneurs.

## Pour aller plus loin {#further-reading}

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