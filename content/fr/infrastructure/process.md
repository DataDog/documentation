---
title: Live processes
kind: documentation
aliases:
  - /fr/guides/process
  - /fr/graphing/infrastructure/process/
further_reading:
  - link: 'https://www.datadoghq.com/blog/live-process-monitoring/'
    tag: Blog
    text: Surveiller vos processus avec Datadog
  - link: /infrastructure/process/generate_process_metrics/
    tag: Documentation
    text: Augmenter la rétention des données de processus à l'aide de métriques
  - link: /infrastructure/livecontainers
    tag: Graphiques
    text: Consulter en temps réel tous les conteneurs de votre environnement
---
## Introduction

Les live processes de Datadog vous offrent une visibilité en temps réel sur les processus en cours d'exécution sur votre infrastructure. Grâce aux live processes, vous pouvez :

* Consulter en un seul endroit tous vos processus en cours d'exécution
* Consulter en détail la consommation des ressources sur vos hosts et vos conteneurs, à l'échelle des processus
* Interroger les processus en cours d'exécution sur un certain host, dans une zone spécifique ou avec une charge de travail précise
* Surveiller les performances des logiciels internes et tiers pendant leur utilisation à l'aide de métriques système dotées d'une granularité de deux secondes
* Ajouter du contexte à vos dashboards et notebooks

{{< img src="infrastructure/process/live_processes_main.png" alt="Présentation des live processes"  >}}

## Installation

Si vous utilisez l'Agent v5, [suivez ce processus d'installation][1]. Si vous utilisez les versions 6 ou 7, [consultez les instructions ci-dessous][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Une fois l'installation de l'Agent Datadog effectuée, activez la collecte des live processes en modifiant le [fichier de configuration principal de l'Agent][1]. Définissez le paramètre suivant sur `true` :

```yaml
process_config:
    enabled: 'true'
```

La valeur `enabled` est une chaîne avec les options suivantes :

- `"true"` : activer la collecte des processus et des conteneurs par l'Agent de processus.
- `"false"` (par défaut) : recueillir les conteneurs uniquement (lorsque cela est possible).
- `"disabled"` : ne pas exécuter l'Agent de processus.

En outre, certaines options de configuration peuvent être définies en tant que variables d'environnement.

**Remarque** : les options définies en tant que variables d'environnement remplacent les paramètres définis dans le fichier de configuration.

Une fois la configuration effectuée, [redémarrez l'Agent][2].


[1]: /fr/agent/guide/agent-configuration-files/
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Suivez les instructions pour l'[Agent Docker][1], en transmettant, en plus de tout autre paramètre personnalisé, les attributs suivants (selon les cas) :

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**Remarques** :

- Pour recueillir des informations relatives aux conteneurs dans l'installation standard, l'utilisateur `dd-agent` doit disposer des autorisations d'accès à `docker.sock`.
- Il est possible de recueillir des processus de host même lorsque l'Agent est exécuté en tant que conteneur.


[1]: /fr/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Dans le manifeste [dd-agent.yaml][1] utilisé pour créer le Daemonset, ajoutez les variables d'environnement, le montage de volume et le volume suivants :

```yaml
 env:
    - name: DD_PROCESS_AGENT_ENABLED
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

Reportez-vous à l'[installation de Daemonset][2] standard et aux pages d'informations sur l'[Agent Docker][3] pour en savoir plus.

**Remarque** : il est possible de recueillir des processus de host même lorsque l'Agent est exécuté en tant que conteneur.


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: /fr/agent/kubernetes/
[3]: /fr/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

Mettez à jour votre fichier [datadog-values.yaml][1] avec la configuration de collecte de processus suivante, puis mettez à niveau votre chart Helm Datadog :

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}

{{< /tabs >}}

### Nettoyage des arguments de processus

Pour masquer des données sensibles sur une page Live Processes, l'Agent nettoie les arguments sensibles de la ligne de commande de processus. Cette fonctionnalité est activée par défaut, et la valeur de tout argument de processus correspondant aux mots suivants est masquée.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Remarque** : la mise en correspondance est **sensible à la casse**.

Pour définir votre propre liste à fusionner avec celle par défaut, utilisez le champ `custom_sensitive_words` à la section `process_config` du fichier `datadog.yaml`. Appliquez des wildcards (`*`) pour définir votre propre contexte de correspondance. Toutefois, un wildcard unique (`'*'`) ne peut pas être utilisé en tant que mot sensible.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**Remarque** : les termes inclus dans le champ `custom_sensitive_words` peuvent uniquement contenir des caractères alphanumériques, des underscores et des wildcards (`'*'`). Un mot sensible ne peut pas être composé d'un wildcard uniquement.

L'image suivante illustre un processus sur la page Live Processes dont les arguments ont été masqués à l'aide de la configuration ci-dessus.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="nettoyage des arguments de processus" style="width:100%;">}}

Définissez `scrub_args` sur `false` pour désactiver entièrement le nettoyage des arguments de processus.

Vous pouvez également nettoyer **tous** les arguments des processus en activant le flag `strip_proc_arguments` dans votre fichier de configuration `datadog.yaml` :

```yaml
process_config:
    strip_proc_arguments: true
```

## Requêtes

### Déterminer le contexte des processus 

De par leur nature, les processus sont des objets caractérisés par une très forte cardinalité. Vous pouvez utiliser les filtres de texte et de tag pour préciser votre contexte afin d'afficher uniquement les processus pertinents.

#### Filtres de texte

Lorsque vous saisissez une chaîne de texte dans la barre de recherche, la fonction de recherche de chaîne approximative est utilisée pour interroger les processus contenant cette chaîne dans leurs lignes de commande ou leurs chemins. Saisissez une chaîne composée de deux caractères ou plus pour afficher des résultats. L'image ci-dessous présente l'environnement de démonstration de Datadog filtré avec la chaîne `postgres /9.`.

**Remarque** : `/9.` génère une correspondance dans le chemin de commande, tandis que `postgres` génère une correspondance dans la commande.

{{< img src="infrastructure/process/postgres.png" alt="Postgres"  style="width:80%;">}}

Pour combiner plusieurs recherches textuelles au sein d'une requête complexe, utilisez l'un des opérateurs booléens suivants :

|              |                                                                                                                                  |                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| **Opérateur** | **Description**                                                                                                                  | **Exemple**                                                     |
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut).                           | java AND elasticsearch                                          |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                                                       | java OR python                                                  |
| `NOT` / `!`  | **Exclusion** : le terme suivant n'est PAS dans l'événement. Vous pouvez utiliser le mot `NOT` ou le caractère `!` pour effectuer la même opération. | java NOT elasticsearch <br> **équivalent** : java !elasticsearch |

Utilisez des parenthèses pour regrouper les opérateurs. Par exemple, `(NOT (elasticsearch OR kafka) java) OR python` .

#### Filtres de tag

Vous pouvez également filtrer vos processus à l'aide de [tags][3] Datadog comme `host`, `pod`, `user` et `service`. Saisissez des filtres de tag directement dans la barre de recherche ou sélectionnez-les dans le volet des facettes, situé sur la gauche de la page.

Datadog génère automatiquement un tag `command`, afin que vous puissiez appliquer un filtre basé sur les éléments suivants :
* Les logiciels tiers (p. ex., `command:mongod` ou `command:nginx`)
* Les logiciels de gestion de conteneurs (p. ex., `command:docker` ou `command:kubelet`)
* Les charges de travail habituelles (p. ex, `command:ssh` ou `command:CRON`)

### Agréger des processus

Le [tagging][3] améliore la navigation. En plus de tous les tags de host existants, les processus présentent le tag `user`.

En outre, les processus des conteneurs ECS se voient appliquer les tags suivants :

- `task_name`
- `task_version`
- `ecs_cluster`

Les processus des conteneurs Kubernetes se voient appliquer les tags suivants :

- `pod_name`
- `kube_pod_ip`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `Kube_cluster`

SI vous avez configuré le [tagging de service unifié][4], les tags `env`, `service`, et `version` sont également recueillis automatiquement.
L'utilisation de ces tags vous permet d'assurer la cohésion des données de l'APM, des logs, des métriques et des processus.
Veuillez noter que cette configuration s'applique uniquement aux environnements conteneurisés.

## Nuage de points

Utilisez l'analyse de nuage de points pour comparer deux métriques entre elles et ainsi mieux comprendre les performances de vos conteneurs.

Pour accéder à l'analyse de nuage de points [dans la page Processes][5], cliquez sur le bouton _Show Summary graph_, puis sélectionnez l'onglet « Scatter Plot » :

{{< img src="infrastructure/process/scatterplot_selection.png" alt="sélection de nuage de points"  style="width:60%;">}}

Par défaut, le graphique regroupe la clé de tag `command`. La taille de chaque point représente le nombre de processus dans ce groupe. Lorsque vous cliquez sur un point, les PID et les conteneurs qui contribuent au groupe s'affichent.

La requête en haut de la fenêtre vous permet de contrôler les différentes options de l'analyse de nuage de points :

- Choisissez les métriques à afficher.
- Choisissez la méthode d'agrégation des deux métriques.
- Choisissez l'échelle pour l'axe des X et des Y (_Linear_ ou _Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="inspection de conteneur" style="width:80%;">}}

## Monitors de processus

Tirez profit des [monitors de live processes][6] pour générer des alertes basées sur le nombre de n'importe quel groupe de processus sur l'ensemble des hosts ou des tags. Vous pouvez configurer les alertes des processus depuis la [page Monitors][7]. Pour en savoir plus, consultez la rubrique [Monitor de live processes][6].

{{< img src="infrastructure/process/process_monitor.png" alt="Monitor de processus"  style="width:80%;">}}

## Processus dans les dashboards et les notebooks

Vous pouvez représenter graphiquement des métriques de processus dans des dashboards et des notebooks à l'aide du [widget Série temporelle][8]. Pour configurer les paramètres, procédez comme suit :
1. Sélectionnez la source de données Live Processes.
2. Créez un filtre basé sur des chaînes de texte dans la barre de recherche.
3. Sélectionnez une métrique de processus à représenter.
4. Appliquez un filtre à l'aide des tags du champ `From`.

{{< img src="infrastructure/process/process_widget.png" alt="Widget Processus"  style="width:80%;">}}

## Intégrations détectées automatiquement

Datadog utilise la collecte de processus pour détecter automatiquement les technologies qui s'exécutent sur vos hosts. Cette opération permet d'identifier les intégrations Datadog qui peuvent vous aider à surveiller ces technologies. Les intégrations détectées automatiquement s'affichent dans la [recherche d'intégrations][1] :

{{< img src="getting_started/integrations/ad_integrations.png" alt="Intégrations détectées automatiquement" >}}

Chaque intégration possède l'un des deux types de statuts suivants :

- **+ Detected** : cette intégration n'est activée sur aucun host qui l'exécute.
- **✓ Partial Visibility** : cette intégration est activée sur certains hosts, mais les hosts pertinents ne l'exécutent pas tous.

Les hosts qui exécutent l'intégration, mais sur lesquels l'intégration n'est pas activée, se trouvent dans l'onglet **Hosts** du carré de l'intégration.

## Processus de la plateforme Datadog

{{< img src="infrastructure/process/process_platform.gif" alt="Processus de la plateforme Datadog" >}}

### Live containers

Les live processes vous aident à gagner en visibilité sur les déploiements de vos conteneurs, en surveillant les processus en cours d'exécution sur chacun de vos conteneurs. Cliquez sur un conteneur depuis la page [Live Containers][9] pour afficher l'arborescence des processus, y compris les commandes en cours d'exécution et leur consommation de ressources. Lorsqu'elles sont utilisées conjointement à d'autres métriques de conteneur, ces données vous permettent de déterminer l'origine des échecs de conteneurs ou de déploiement.

### APM

Dans les [traces de l'APM][10], vous pouvez cliquer sur la span d'un service pour afficher les processus qui s'exécutent sur son infrastructure sous-jacente. Les processus d'une span de service sont mis en corrélation avec les hosts ou pods sur lesquels le service s'exécute au moment de la requête. Vous pouvez analyser des métriques de processus, comme le processeur et la mémoire RSS, en consultant parallèlement les erreurs au niveau du code. Vous pourrez ainsi distinguer les problèmes spécifiques à l'application des problèmes d'infrastructure globaux. Lorsque vous cliquez sur un processus, vous êtes redirigé vers la [page Live Processes][1]. Les processus associés ne sont actuellement pas pris en charge pour les traces sans serveur et Browser. 

### Network Performance Monitoring 

Lorsque vous étudiez une dépendance dans la [vue d'ensemble de la page Network][11], vous pouvez consulter les processus exécutés sur l'infrastructure sous-jacente des endpoints (p. ex, les services) qui communiquent entre eux. Utilisez les métadonnées des processus pour déterminer si une mauvaise connexion réseau (caractérisée par un nombre élevé de retransmissions TCP) ou une forte latence des appels réseau (caractérisée par une longue durée d'aller-retour TCP) peut être causée par de lourdes charges de travail utilisant les ressources de ces endpoints. Un tel dysfonctionnement peut nuire à l'intégrité et à l'efficacité des communications.

## Surveillance en temps réel

Lorsque vous utilisez activement la fonctionnalité Live Processes, les métriques sont recueillies toutes les deux secondes. Cet aspect est très important pour les métriques hautement volatiles, telles que l'utilisation du processeur. En arrière-plan, pour le contexte historique, les métriques sont recueillies toutes les 10 secondes.

## Informations supplémentaires

- La collecte de fichiers ouverts et du répertoire de travail actuel est limitée en fonction du niveau du privilège de l'utilisateur qui exécute `dd-process-agent`. Si `dd-process-agent` n'est pas en mesure d'accéder à ces champs, ils sont recueillis automatiquement.
- La collecte de données en temps réel (toutes les 2 s) est désactivée après 30 minutes. Pour reprendre la collecte en temps réel, actualisez la page.
- En cas de déploiement sur des conteneurs, le fichier `/etc/passwd` monté dans `docker-dd-agent` est nécessaire pour recueillir les noms d'utilisateur de chaque processus. Il s'agit d'un fichier public, et l'Agent de processus n'utilise aucun autre champ que celui du nom d'utilisateur. Toutes les fonctionnalités, à l'exception du champ de métadonnées `user`, fonctionnent sans accéder à ce fichier. **Remarque** : la fonctionnalité Live Processes utilise uniquement le fichier `passwd` du host et ne récupère pas le nom d'utilisateur pour les utilisateurs créés dans des conteneurs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/agent-5-process-collection/
[2]: /fr/agent/
[3]: /fr/getting_started/tagging/
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /fr/monitors/monitor_types/process/
[7]: https://app.datadoghq.com/monitors#create/live_process
[8]: /fr/dashboards/widgets/timeseries/#pagetitle
[9]: /fr/infrastructure/livecontainers/
[10]: /fr/tracing/
[11]: /fr/network_monitoring/performance/network_page