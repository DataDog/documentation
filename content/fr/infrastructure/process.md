---
title: Live processes
kind: documentation
aliases:
  - /fr/guides/process
  - /fr/graphing/infrastructure/process/
further_reading:
  - link: /infrastructure/hostmap
    tag: Graphiques
    text: Visualisez tous vos hosts sur un seul écran avec la hostmap
  - link: /infrastructure/livecontainers
    tag: Graphiques
    text: Consulter en temps réel tous les conteneurs de votre environnement
---
## Introduction

La surveillance de processus de Datadog permet de visualiser en temps réel les éléments les plus granulaires dans un déploiement.

{{< img src="infrastructure/process/live_process_preview.png" alt="aperçu de live process" >}}

## Installation

Les processus d'installation suivants sont valables pour l'[Agent version 6 et 7][1]. Si vous utilisez l'Agent version 5, [suivez le processus d'installation correspondant][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Une fois l'installation de l'Agent Datadog effectuée, activez la collecte Live Processes en modifiant le [fichier de configuration principal de l'Agent][1]. Définissez le paramètre suivant sur `true` :

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


[1]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
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

## Recherche, filtrage et pivotement

### Syntaxe de recherche

Les processus et les conteneurs sont, de par leur nature, des objets avec une très forte cardinalité. La recherche de chaîne approximative vous permet d'afficher des informations pertinentes. Saisissez une chaîne composée de deux caractères ou plus pour afficher des résultats. L'image ci-dessous présente l'environnement de démonstration de Datadog filtré avec la chaîne `postgres /9.`.

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

### Tagging

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

### Filtrage et pivotement

Vous pouvez commencer par appliquer le filtre `role:McNulty-Query`, le service de requête frontal de Datadog, afin d'affiner la recherche. Ensuite, recherchez les processus NGINX maître et faites pivoter le tableau par zone de disponibilité pour vous assurer de la haute disponibilité du service.

{{< img src="infrastructure/process/mcnultynginx.png" alt="nginx mcnulty" style="width:80%;">}}

Dans le cas suivant, on vérifie les processus Elasticsearch pour un groupe de fonctionnalités individuel. On a également ajouté des métriques pour les changements de contexte volontaires ou involontaires, ces métriques étant disponibles dans le menu en forme d'engrenage en haut à droite du tableau.

{{< img src="infrastructure/process/burritoelasticsearch.png" alt="elasticsearch burrito" style="width:80%;">}}

Dans l'exemple ci-dessous, on a recherché des processus SSH et effectué un pivotement avec le paramètre `user` afin de déterminer les personnes connectées aux différents hosts.

{{< img src="infrastructure/process/sshusers.png" alt="utilisateurs ssh" style="width:80%;">}}

Cet exemple est peut-être moins passionnant qu'on aurait pu l'espérer.

## Nuage de points

Utilisez l'analyse de nuage de points pour comparer deux métriques entre elles et ainsi mieux comprendre les performances de vos conteneurs.

Pour accéder à l'analyse de nuage de points [dans la page Processes][4], cliquez sur le bouton _Show Summary graph_, puis sélectionnez l'onglet « Scatter Plot » :

{{< img src="infrastructure/process/scatterplot_selection.png" alt="sélection de nuage de points"  style="width:60%;">}}

Par défaut, le graphique regroupe la clé de tag `command`. La taille de chaque point représente le nombre de processus dans ce groupe. Lorsque vous cliquez sur un point, les PID et les conteneurs qui contribuent au groupe s'affichent.

La requête en haut de la fenêtre vous permet de contrôler les différentes options de l'analyse de nuage de points :

- Choisissez les métriques à afficher.
- Choisissez la méthode d'agrégation des deux métriques.
- Choisissez l'échelle pour l'axe des X et des Y (_Linear_ ou _Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="inspection de conteneur" style="width:80%;">}}

## Vue Live Containers enrichie

Tout comme la fonctionnalité Live Processes vous offre une visibilité accrue sur vos déploiements de conteneur, [Live Containers][5] vous permet de visualiser en détail votre conteneur et l'environnement d'orchestration. Lorsque la fonctionnalité Live Processes est activée, l'arborescence des processus pour chaque conteneur est incluse dans le panneau d'inspection de conteneur sur cette page.

{{< img src="infrastructure/process/containerinspect.png" alt="inspection de conteneur" style="width:80%;">}}

## Surveillance en temps réel

Lorsque vous utilisez activement la fonctionnalité Live Processes, les métriques sont recueillies toutes les deux secondes. Cet aspect est très important pour les métriques hautement volatiles, telles que l'utilisation du processeur. En arrière-plan, pour le contexte historique, les métriques sont recueillies toutes les 10 secondes.

## Remarques et questions fréquemment posées

- La collecte de fichiers ouverts et du répertoire de travail actuel est limitée en fonction du niveau du privilège de l'utilisateur qui exécute `dd-process-agent`. Si `dd-process-agent` n'est pas en mesure d'accéder à ces champs, ils sont recueillis automatiquement.
- La collecte de données en temps réel (toutes les 2 s) est désactivée après 30 minutes. Pour reprendre la collecte en temps réel, actualisez la page.
- En cas de déploiement sur des conteneurs, le fichier `/etc/passwd` monté dans `docker-dd-agent` est nécessaire pour recueillir les noms d'utilisateur de chaque processus. Il s'agit d'un fichier public, et l'Agent de processus n'utilise aucun autre champ que celui du nom d'utilisateur. Toutes les fonctionnalités, à l'exception du champ de métadonnées `user`, fonctionnent sans accéder à ce fichier. **Remarque** : la fonctionnalité Live Processes utilise uniquement le fichier `passwd` du host et ne récupère pas le nom d'utilisateur pour les utilisateurs créés dans des conteneurs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/faq/agent-5-process-collection/
[3]: /fr/tagging/
[4]: https://app.datadoghq.com/process
[5]: /fr/infrastructure/livecontainers/