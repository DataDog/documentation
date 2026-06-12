---
aliases:
- /fr/logs/guide/docker-logs-collection-troubleshooting-guide/
description: Résoudre les problèmes courants liés à la collecte de journaux dans des
  environnements conteneurisés
further_reading:
- link: /containers/kubernetes/log
  tag: Documentation
  text: Collecte de journaux Kubernetes
- link: /containers/docker/log
  tag: Documentation
  text: Collecte de logs avec Docker
title: Dépannage de la collecte de journaux de conteneurs
---
## Aperçu {#overview}

Les applications conteneurisées écrivent des journaux dans les flux de sortie standard et d'erreur (`stdout` / `stderr`), que le runtime de conteneur et l'orchestrateur capturent et gèrent de diverses manières. L'Agent Datadog s'appuie sur la gestion par défaut basée sur des fichiers de Docker et Kubernetes pour gérer ces fichiers journaux. Alors que l'Agent Datadog surveille les conteneurs sur son hôte, il découvre, suit, étiquette et rapporte ces journaux à Datadog pour chaque conteneur.

Cette documentation couvre les étapes de dépannage pour la collecte de journaux **Docker** et **Kubernetes**. Pour le contexte complet et les étapes de configuration générales pour la collecte de journaux conteneurisés, consultez la documentation [Docker][1] et [Kubernetes][2].

Pour la collecte de journaux basée sur [**ECS Fargate**][3] et [**EKS Fargate**][4], consultez leur documentation dédiée à la configuration et au dépannage. 

## Comprendre la collecte de journaux dans Docker et Kubernetes {#understanding-log-collection-in-docker-and-kubernetes}

Dans des environnements conteneurisés, les journaux sont collectés par l'Agent Datadog de deux manières principales : la collecte **basée sur des fichiers** et la collecte **basée sur des sockets** via l'API Docker.

La documentation de Docker et Kubernetes privilégie la collecte basée sur des fichiers, car elle offre de meilleures performances et une meilleure fiabilité. La collecte basée sur des sockets peut être utilisée dans des environnements Docker comme option de secours. Dans les clusters Kubernetes, la collecte basée sur des sockets nécessite le runtime Docker, qui est largement obsolète dans la plupart des distributions Kubernetes.

Dans des environnements conteneurisés, Datadog recommande de journaliser vers les flux `stdout` / `stderr` au lieu d'écrire dans des fichiers journaux qui sont isolés dans les conteneurs d'application. Ces flux permettent une collecte plus automatisée et fiable.

### Fichiers journaux {#log-files}

Avec le pilote de journal par défaut de Docker, `json-file` les journaux `stdout`/`stderr` sont stockés dans `/var/lib/docker/containers`. Ces journaux peuvent être collectés en montant `/var/lib/docker/containers` (`c:/programdata/docker/containers` sur Windows) dans le conteneur de l'Agent. Exemple :

```bash
/var/lib/docker/containers/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d-json.log. 
```

Si ce point de montage n'existe pas, l'Agent revient à la collecte basée sur les sockets. Accès à l'API Docker via le socket à `/var/run/docker.sock`.

Dans Kubernetes, les journaux `stdout`/`stderr` sont stockés dans `/var/log/pods` par défaut. La structure des dossiers est établie pour chaque pod et pour chaque conteneur se trouvant dans ce pod. Exemple :

```bash
/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log
```

Si le conteneur dans le pod redémarre dans Kubernetes, il incrémente automatiquement le nom de fichier (`0.log` -> `1.log`) que l'Agent prend en compte automatiquement. Voir [la collecte de journaux Kubernetes][2] pour plus d'informations.

Au fur et à mesure que l'Agent découvre les conteneurs correspondants sur l'hôte, il recherche leurs fichiers journaux en fonction de la structure de dossiers et de fichiers attendue par environnement.

### Autodécouverte de l’agent {#agent-autodiscovery}

Par défaut, l’agent ne collecte des journaux à partir des conteneurs que lorsque la collecte de journaux est activée et que :

- `logs_config.container_collect_all` est activé pour collecter des journaux de tous les conteneurs découverts
- Le conteneur est configuré pour la collecte de journaux à partir d'une intégration basée sur l'autodécouverte

L'Agent prend également en compte toutes les règles d'exclusion/inclusion de conteneurs que vous avez configurées dans [Gestion de la découverte des conteneurs][5]. 

Enfin, l'Agent est responsable de la collecte des journaux des conteneurs sur le même hôte que lui-même. 

Il est important de prendre en compte ces règles pour comprendre comment la collecte de journaux est configurée pour vos conteneurs. Si vous ne voyez pas de journaux pour un conteneur donné, vous devriez vérifier :

- L’agent a-t-il été activé pour la collecte de journaux ?
- Le conteneur est-il activé pour la collecte de journaux par rapport aux règles de découverte ?
- L’agent fonctionne-t-il sur le même hôte que le conteneur souhaité ?

#### Configuration « collecte de tous les conteneurs » {#container-collect-all-configuration}

Pour des instructions complètes sur la façon d'activer la collecte de journaux, consultez la documentation sur la collecte de journaux [Docker][1] et [Kubernetes][2]. Pour une référence rapide, vous pouvez voir des exemples sur la façon de configurer l'Agent pour activer la collecte de journaux et activer la fonctionnalité `container_collect_all`, qui est désactivée par défaut. 

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  #(...)
spec:
  #(...)
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

{{% k8s-operator-redeploy %}}
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  #(...)
  logs:
    enabled: true
    containerCollectAll: true
```

{{% k8s-helm-redeploy %}}
{{% /tab %}}

{{% tab "Agent conteneurisé" %}}

```bash
DD_LOGS_ENABLED=true
DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

{{% /tab %}}
{{< /tabs >}}

Lors de l'utilisation de `container_collect_all`, l'Agent collectera tous les journaux des conteneurs découverts et les étiquetera avec les balises `source` et `service`, correspondant à la balise `short_image` du conteneur découvert. 

Si `container_collect_all` n'est pas activé, vous devez activer individuellement la collecte de journaux par conteneur avec des configurations basées sur l'autodécouverte.

#### Configuration de l'autodécouverte {#autodiscovery-configuration}

L'autodécouverte vous permet de configurer les conteneurs dont l'Agent collecte les journaux. Datadog recommande d'utiliser [les étiquettes de conteneur dans Docker][6] ou [les annotations de Pod dans Kubernetes][7]. Ce sont des configurations de journaux basées sur JSON placées sur le conteneur/pod correspondant émettant ces journaux. Voir l'exemple minimal suivant :

{{< tabs >}}
{{% tab "Kubernetes" %}}

Les annotations Kubernetes doivent être définies sur le pod, et non sur la charge de travail parente qui le crée. L'annotation doit être ajustée pour correspondre au nom de votre conteneur.

```yaml
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: |
          [{
            "source": "example-source",
            "service": "example-service"
          }]
    spec:
      containers:
      - name: <CONTAINER_NAME>
        image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

Les étiquettes Docker peuvent être définies dans la commande docker run, le fichier Docker Compose ou intégrées dans l'image du conteneur.

Par exemple, dans une commande d'exécution :

```
-l com.datadoghq.ad.logs='[{"source":"example-source","service":"example-service"}]'
```

Voir plus d'exemples dans [Collecte de journaux Docker](/containers/docker/log/?tab=dockerfile#log-integrations).

{{% /tab %}}
{{< /tabs >}}

Avec ces deux configurations, assurez-vous que votre configuration :
- A au moins la source et le service définis 
- Est un JSON valide
- Est défini sur votre pod Kubernetes ou conteneur Docker correspondant
- Utilise le bon nom de clé pour déclencher la configuration des journaux, vous n'avez pas besoin d'ajuster le nom de la clé en fonction de votre [site Datadog][8]. 

Pour plus d'exemples sur la façon de définir votre configuration de journaux, voir [Configurations avancées de collecte de journaux][9].

### Étiquetage {#tagging}

L'Agent attribue automatiquement des balises à vos journaux au niveau "élevé" de [cardinalité des balises][10] pour chaque environnement. Vous pouvez consulter les [balises Docker prêtes à l'emploi ici][11] et [les balises Kubernetes ici][12]. Cela inclut également toutes les balises collectées par [Unified Service Tagging][13] ou différentes règles d'extraction de balises à partir des métadonnées des conteneurs.

Pour personnaliser ces balises, modifiez les règles de collecte des journaux ou activez la collecte des journaux en général, vous pouvez appliquer des étiquettes ou des annotations d'autodécouverte aux conteneurs respectifs.

Les balises sur vos journaux peuvent également provenir de [l'héritage des balises d'hôte][14]. Toutes les données, y compris les journaux, entrant dans Datadog passent par ce processus. Lors de l'entrée dans Datadog, les journaux héritent de toutes les balises au niveau de l'hôte qui sont associées à cet hôte. Vous pouvez voir ces balises dans la liste d'infrastructure pour votre hôte. Celles-ci sont le plus souvent définies par :

- L'Agent Datadog et sa découverte automatique ou son ensemble manuel de `DD_TAGS` fourni
- Les intégrations des fournisseurs de cloud collectant et définissant des balises pour vos hôtes

Par exemple, les balises `pod_name` et `short_image` proviennent de l'Agent définissant cette balise lors de la soumission. D'autres balises comme `region` et `kube_cluster_name` proviennent de l'héritage des balises d'hôte lors de l'entrée.

## Dépannage de la collecte des journaux de conteneurs avec des commandes d'Agent {#troubleshooting-container-log-collection-with-agent-commands}

L'Agent Datadog fonctionnant sur le même nœud que votre conteneur d'application est responsable de la collecte des journaux de ce conteneur. Lors de l'exécution de ces commandes, en particulier dans des environnements Kubernetes, assurez-vous de travailler avec le bon pod d'Agent pour votre conteneur d'application souhaité.

Pour une liste de commandes utiles de dépannage, consultez [Commandes de l'Agent][15].

### État de l'Agent {#agent-status}

Vous pouvez exécuter la commande d'état de l'Agent pour voir si l'Agent de journalisation rencontre des problèmes

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent status
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

Cette commande vous montre l'état de l'Agent des Journaux en général et le collecteur de journaux pour chaque conteneur que l'Agent surveille :

```text
==========
Logs Agent
==========
    Reliable: Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 8.60922316e+08
    EncodedBytesSent: 3.9744538e+07
    LogsProcessed: 604328
    LogsSent: 60431
  
  ============
  Integrations
  ============
  
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    - Type: file
      Identifier: ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
      Path: /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/*.log
      Service: example-service
      Source: example-source
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log  
      Bytes Read: 5075   
      Pipeline Latency:
        Average Latency (ms): 0
        24h Average Latency (ms): 0
        Peak Latency (ms): 0
        24h Peak Latency (ms): 0
```

Si l'état de l'agent des journaux ne ressemble pas à ce qui précède, consultez les conseils de dépannage dans les sections suivantes.

Chaque collecteur de journaux individuel fournit des informations détaillées sur la manière dont l'agent collecte les journaux pour un conteneur spécifique. En utilisant l'exemple Kubernetes ci-dessus, cette sortie nous indique :

- **Nom du collecteur** (`default/my-deployment-55d847444b-2fkch/my-container`) identifie l'espace de noms, le pod et le conteneur.
- **Identifiant** (`ba778eaff...`) est l'ID du conteneur individuel surveillé.
- **Chemin** et **Entrées** montrent les emplacements où l'agent a recherché et identifié les fichiers journaux du conteneur.
- **Service** et **Source** résument les balises utilisées.

Dans Docker, la sortie est largement la même, seul le nom du collecteur de journaux individuel est différent.

Si la commande status de l'Agent renvoie le message suivant :

```
==========
Logs Agent
==========

  Logs Agent is not running
```
Cela signifie que vous n'avez pas activé la collecte des journaux dans l'Agent.

Si l'état de l'Agent des journaux ne montre aucune intégration et que vous voyez `LogsProcessed: 0` et `LogsSent: 0` :

```
==========
Logs Agent
==========

    LogsProcessed: 0
    LogsSent: 0
```
Cet état signifie que les journaux sont activés, mais que vous n'avez pas spécifié de quels conteneurs l'Agent doit collecter.

### Vérification de la configuration de l'Agent {#agent-configcheck}

Vous pouvez exécuter la commande `agent configcheck` pour imprimer toutes les configurations chargées et résolues dans un Agent en cours d'exécution.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent configcheck
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent configcheck
```

{{% /tab %}}
{{< /tabs >}}

Cette commande vous montre la configuration du collecteur de journaux, en utilisant le `Configuration source` faisant référence à l'ID du conteneur. Cela peut être utilisé pour faire correspondre avec la sortie `agent status`.

```
===  check ===
Configuration provider: kubernetes-container-allinone
Configuration source: container:containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
Log Config:
[{"service":"example-service","source":"example-source"}]
Autodiscovery IDs:
* containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
```

Le `Log Config` appliqué à partir de l'autodécouverte fournit des balises personnalisées `service` et `source` affichées comme `[{"service":"example-service","source":"example-source"}]`. La sortie `configcheck` est utile pour vérifier comment l'Agent a configuré la collecte des journaux pour un conteneur donné en fonction de son ID de conteneur.

Lors de l'utilisation de `logs_config.container_collect_all`, si aucune configuration unique n'est fournie, vous verrez cela par défaut à `[{}]` pour le conteneur.


### Agent stream-logs {#agent-stream-logs}

Vous pouvez exécuter la commande `agent stream-logs` pour diffuser les journaux vers la console que l'Agent voit en temps réel, avec les métadonnées associées et le contenu des journaux.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent stream-logs

# Stream logs relative to "Namespace/Pod Name/Container Name" based name
kubectl exec -it <Agent Pod> -- agent stream-logs --name <NAME>
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent stream-logs
```

{{% /tab %}}
{{< /tabs >}}

Vous pouvez filtrer cette sortie avec le drapeau `--name`, qui correspond au format de nommage Kubernetes (Espace de noms/Nom du pod/Conteneur). Alternativement, vous pouvez filtrer en fonction des balises appliquées avec le drapeau `--service` ou `--source`. 

Pour trouver le `<NAME>`, utilisez la commande `agent status`. Par exemple, `default/my-deployment-55d847444b-2fkch/my-container` :

```
==========
Logs Agent
==========
    ...  
  ============
  Integrations
  ============
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    ...
```
Cette commande imprimera en continu vos journaux tels que rapportés par l'Agent :

```text
$ agent stream-logs --name default/my-deployment-55d847444b-2fkch/my-container
...
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016005644 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 INFO Sample Info Log
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016049347 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 ERROR Sample Error Log
```

Chaque ligne doit fournir le nom de l'intégration, le type, l'état, l'horodatage, le nom d'hôte, le service, la source, les balises de conteneur et le message. Cela montre quels journaux l'Agent collecte, quelles métadonnées sont associées à ces journaux et quel message est envoyé.

Appuyez sur `Ctrl + C` pour quitter le processus de flux.

### Capture du fichier journal brut {#capturing-the-raw-log-file}

Pour vérifier si l'Agent suit correctement les journaux, vous pouvez copier le fichier journal et l'examiner en utilisant la [`agent status` commande ](#agent-status).

Exécutez la commande `agent status` et vérifiez dans la section « Logs Agent » pour le conteneur en question. Par exemple, pour un Pod nommé `my-deployment-98878c5d8-mc2sk` avec le conteneur `my-container`, cela peut ressembler à ceci :

```text
  default/my-deployment-98878c5d8-mc2sk/my-container
  --------------------------------------------------
    - Type: file
      Identifier: fa54113fffebc83ffef4bd863c8c1012bd5cfb19311a4dcd7d8e9b5271dc29fe
      Path: /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/*.log
      Service: busybox
      Source: busybox
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log  
```

Nous pouvons voir le `Path` pour l'endroit où l'Agent recherche et le `Inputs` montrant le fichier journal découvert comme `/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log`. 

Puisque le lien est ouvert dans le Pod de l'Agent, vous pouvez copier ce fichier du Pod de l'Agent vers votre machine locale, en utilisant une commande `kubectl cp` : 

```
kubectl cp <Agent Pod>:<Log Input Path> <Desired Filename>
```

Si le Pod de l'Agent dans l'exemple était nommé `datadog-agent-xxxxx`, cela ressemblerait à :

```text
kubectl cp datadog-agent-xxxxx:/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log my-container.log
```
Vous pouvez examiner le fichier copié pour voir les journaux exacts que l'Agent voit afin d'identifier si les journaux nécessaires sont capturés par Kubernetes. Il en va de même pour les conteneurs Docker dans leur chemin `/var/lib/docker/containers` et une commande docker cp.

## Problèmes courants {#common-issues}

Il existe des problèmes courants qui peuvent entraver l'envoi de journaux à Datadog dans des environnements conteneurisés. Si vous rencontrez des problèmes pour envoyer des journaux à Datadog, consultez les problèmes courants ci-dessous. Si vous continuez à avoir des problèmes, contactez notre équipe de support pour obtenir une assistance supplémentaire.

### Prétraitement du nom d'hôte {#hostname-preprocessing}

Un problème courant se produit si les journaux bruts ont un attribut JSON pour un `host`, `hostname`, ou `syslog.hostname`. Exemple :

{{< img src="logs/troubleshooting/hostname_preprocessing.png" alt="exemple de prétraitement du nom d'hôte" >}}

Les journaux formatés en JSON passent par un ensemble de règles de prétraitement relatives aux attributs réservés, tels que `timestamp` ou `level` pour définir l'horodatage officiel ou le niveau de journal du journal. Un de ces attributs réservés est pour [le prétraitement de l'hôte][16], où un attribut JSON de `host`, `hostname`, ou `syslog.hostname` devient le `host` officiel du journal. Cela entraîne l'attribution de ces déclarations de journal à l'hôte « incorrect » et, par conséquent, ne pas hériter des balises de niveau hôte attendues de l'hôte « original ».

Vous pouvez interroger les journaux correspondant à l'attribut JSON de `@host:* OR @hostname:* OR @syslog.hostname:*` pour montrer quels journaux utilisent activement ce prétraitement.

Il existe quelques options pour résoudre ce problème.
- Si possible, mettez à jour l'application pour éviter de journaliser un attribut JSON `host` ou `hostname`, soit en le supprimant, soit en le changeant pour une autre clé.
- Mettez à jour vos [règles de prétraitement globales][17] pour ignorer ce comportement. Cependant, tous les journaux dépendant de cela perdraient cette fonctionnalité.
- Ajoutez une configuration Autodiscovery pour créer une [configuration de journal personnalisée qui masque le mot-clé hôte][18].

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: |-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
spec:
  containers:
    - name: <CONTAINER_NAME>
      image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

```yaml
  labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
```

{{% /tab %}}
{{< /tabs >}}

Ces règles ci-dessus recherchent la chaîne `"host"` (guillemets inclus) et les remplacent par `"app_host"` pour conserver la structure JSON. Remplacez le motif par `hostname` si nécessaire pour vos journaux.

Vous pouvez également ajouter une [règle de traitement global][19] pour l'Agent afin de masquer les mots-clés dans tous les journaux qu'il traite en utilisant la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES`.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}

{{% tab "Variable d'environnement" %}}

```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```
{{% /tab %}}
{{< /tabs >}}


### Balises de niveau hôte manquantes sur de nouveaux hôtes ou nœuds {#missing-host-level-tags-on-new-hosts-or-nodes}

Lors de l'envoi de journaux à Datadog depuis un hôte ou un nœud nouvellement créé, il peut falloir quelques minutes pour que les balises de niveau hôte soient [héritées][20]. En conséquence, les balises de niveau hôte peuvent être manquantes dans ces journaux. 

Pour remédier à ce problème, vous pouvez utiliser la variable d'environnement `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` pour configurer une durée (en minutes). L'Agent Datadog attache manuellement les balises de niveau hôte dont il a connaissance à chaque journal envoyé pendant cette durée. Après cette durée, l'Agent revient à s'appuyer sur l'héritage des tags lors de l'intégration.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```

{{% /tab %}}

{{% tab "Variable d'environnement" %}}

```
DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION='10m'
```
{{% /tab %}}
{{< /tabs >}}

### Tags manquants sur les nouveaux conteneurs ou pods {#missing-tags-on-new-containers-or-pods}

Lors de l'envoi de journaux à Datadog depuis des conteneurs ou Pods nouvellement créés, le tagueur interne de l'Agent Datadog peut ne pas encore avoir les tags de conteneur/pod associés. En conséquence, des tags peuvent manquer dans ces journaux.

Pour remédier à ce problème, vous pouvez utiliser la variable d'environnement `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` pour configurer une durée (en secondes) pendant laquelle l'Agent Datadog attend avant de commencer à envoyer des journaux depuis des conteneurs et Pods nouvellement créés. La valeur par défaut est `0`.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```

{{% /tab %}}

{{% tab "Variable d'environnement" %}}

```
DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION='5'
```
{{% /tab %}}
{{< /tabs >}}

### Pods à courte durée de vie {#short-lived-pods}

Par défaut, l'Agent recherche de nouveaux conteneurs toutes les cinq secondes. Pour l'Agent v6.12+, les journaux des conteneurs à courte durée de vie (arrêtés ou plantés) sont automatiquement collectés lors de l'utilisation de la méthode de collecte de journaux par fichier. Cela inclut également la collecte des journaux des conteneurs d'initialisation. Tant que ces fichiers existent encore.

Dans Kubernetes, la plupart des journaux des pods et de leurs conteneurs sont conservés suffisamment longtemps pour que l'Agent puisse les signaler, même pour des processus à courte durée de vie. Les CronJobs et Jobs Kubernetes conservent par défaut le pod suffisamment longtemps pour que l'Agent puisse signaler ses journaux, même pour des conteneurs terminés. Cependant, si vous spécifiez une [règle de nettoyage de Job][21] `ttlSecondsAfterFinished`, Datadog recommande au moins 15 secondes pour permettre à l'Agent de les gérer.

### Problèmes de collecte de journaux Docker à partir de fichiers {#docker-log-collection-from-file-issues}

L'Agent collecte par défaut les journaux Docker à partir des fichiers journaux sur disque dans les versions 6.33.0/7.33.0+ tant que les fichiers journaux sur disque sont accessibles par l'Agent. `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` peut être défini sur `false` pour désactiver ce comportement.

Lors de la collecte des journaux des conteneurs Docker à partir de fichiers, l'Agent revient à la collecte à partir du socket Docker s'il ne peut pas lire le répertoire où les journaux des conteneurs Docker sont stockés (`/var/lib/docker/containers` sur Linux). Pour diagnostiquer cela, vérifiez l'état de Logs Agent et recherchez une entrée de type fichier montrant une erreur similaire à la suivante :

```
- Type: docker
    Service: stable
    Source: stable
    Status: OK
    The log file tailer could not be made, falling back to socket
    Inputs:
    68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d  
    Bytes Read: 160973 
```

Cet état signifie que l'Agent est incapable de trouver un fichier journal pour un conteneur donné. Pour résoudre ce problème, vérifiez que le dossier contenant les journaux des conteneurs Docker est correctement exposé au conteneur de l'Agent Datadog. Sur Linux, cela correspond à `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` sur la ligne de commande démarrant le conteneur Agent, tandis que sur Windows, cela correspond à `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`. 

Notez que le répertoire relatif à l'hôte sous-jacent peut être différent en raison de la configuration spécifique du démon Docker—ceci n'est pas un problème tant qu'un mappage correct des volumes Docker est effectué. Par exemple, utilisez `-v /data/docker/containers:/var/lib/docker/containers:ro` si le répertoire de données Docker a été déplacé vers `/data/docker` sur l'hôte sous-jacent.

Si des journaux sont collectés mais que des lignes individuelles semblent être coupées, vérifiez que le démon Docker utilise le [JSON logging driver](#different-docker-log-driver).

### Agent basé sur l'hôte {#host-based-agent}

Si vous installez l'Agent sur l'hôte plutôt que de l'exécuter dans un conteneur Docker, l'utilisateur `dd-agent` doit être ajouté au groupe Docker pour avoir la permission de lire à partir du socket Docker. Si vous voyez les journaux d'erreur suivants de l'agent :

```text
<TIMESTAMP> UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
<TIMESTAMP> UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Ajoutez l'Agent au groupe d'utilisateurs Docker, exécutez la commande suivante :

```
usermod -a -G docker dd-agent
```
**Remarque :** Lorsque vous installez l'Agent sur l'hôte, l'Agent n'a pas la permission d'accéder à ` /var/lib/docker/containers` car cela nécessite un accès root. En conséquence, il collectera des journaux à partir du socket Docker.


### Pilote de journalisation Docker différent {#different-docker-log-driver}

La valeur par défaut de Docker est le [json-file logging driver][23] ; ainsi, l'Agent tente d'abord de lire cette structure. Si vos conteneurs sont configurés pour utiliser un pilote de journalisation différent, l'Agent indiquera qu'il parvient à identifier vos conteneurs, mais qu'il n'est pas en mesure de collecter leurs journaux à partir du fichier. Dans les environnements Docker, Datadog recommande d'utiliser le `json-file` pilote de journalisation pour une expérience optimale de l'Agent. Cependant, l'Agent peut également être configuré pour lire à partir du `journald` pilote de journalisation.

1. Si vous n'êtes pas sûr du pilote de journalisation que vos conteneurs utilisent, utilisez `docker inspect <CONTAINER_NAME>` pour voir quel pilote de journalisation vous avez défini. Le bloc suivant apparaît dans l'Inspect Docker lorsque le conteneur utilise le pilote de journalisation JSON.

   ```
   "LogConfig": {
       "Type": "json-file",
       "Config": {}
   },
   ```

2. Si le conteneur est configuré pour le pilote de journalisation journald, le bloc suivant apparaît dans l'Inspect Docker :
   ```
   "LogConfig": {
       "Type": "journald",
       "Config": {}
   },
   ```

3. Pour collecter des journaux à partir du pilote de journalisation journald, configurez l'intégration journald [en suivant la documentation Datadog-Journald][24].
4. Montez le fichier YAML dans votre conteneur en suivant les instructions de la [Docker Agent documentation][25]. Pour plus d'informations sur la configuration des pilotes de journalisation pour les conteneurs Docker, [voir cette documentation][26].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/docker/log/
[2]: /fr/containers/kubernetes/log/
[3]: /fr/integrations/aws-fargate/?tab=webui#log-collection
[4]: /fr/integrations/eks_fargate/?tab=admissioncontrollerdatadogoperator#log-collection
[5]: /fr/containers/guide/container-discovery-management
[6]: /fr/containers/docker/log/?tab=dockerfile#log-integrations
[7]: /fr/containers/kubernetes/log/?tab=datadogoperator#autodiscovery-annotations
[8]: /fr/getting_started/site/
[9]: /fr/agent/logs/advanced_log_collection/?tab=configurationfile
[10]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[11]: /fr/containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[12]: /fr/containers/kubernetes/tag/?tab=datadogoperator
[13]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[14]: /fr/getting_started/tagging/#tag-inheritance
[15]: /fr/agent/configuration/agent-commands/
[16]: /fr/logs/log_configuration/pipelines/?tab=host#preprocessing
[17]: https://app.datadoghq.com/logs/pipelines
[18]: /fr/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[19]: /fr/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[20]: /fr/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#integration-inheritance
[21]: https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/#cleanup-for-finished-jobs
[22]: /fr/logs/guide/docker-logs-collection-troubleshooting-guide/#your-containers-are-not-using-the-json-logging-driver
[23]: https://docs.docker.com/engine/logging/drivers/json-file/
[24]: /fr/integrations/journald/?tab=host#setup
[25]: /fr/containers/docker/#mounting-conf-d
[26]: https://docs.docker.com/engine/logging/drivers/journald/