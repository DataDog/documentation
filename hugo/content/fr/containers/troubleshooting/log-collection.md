---
aliases:
- /fr/logs/guide/docker-logs-collection-troubleshooting-guide/
description: Dépannez les problèmes courants liés à la Log Collection dans les environnements
  conteneurisés
further_reading:
- link: /containers/kubernetes/log
  tag: Documentation
  text: Log Collection Kubernetes
- link: /containers/docker/log
  tag: Documentation
  text: Log Collection Docker
title: Dépannage de la collecte de logs de conteneurs
---
## Présentation {#overview}

Les applications conteneurisées écrivent les logs dans les flux Standard Output et Error (`stdout` / `stderr`), que le runtime de conteneur et l'orchestrateur capturent et traitent de diverses manières. Le Datadog Agent s'appuie sur la gestion par défaut des fichiers de Docker et de Kubernetes pour gérer ces fichiers de log. Lorsque le Datadog Agent surveille les conteneurs sur son host, il découvre leurs logs, les suit, leur attribue des tags et les transmet à Datadog pour chaque conteneur.

Cette documentation couvre les étapes de dépannage de la Log Collection **Docker** et de la Log Collection **Kubernetes**. Pour le contexte complet et les étapes de configuration générale de la Log Collection dans les environnements conteneurisés, consultez la documentation [Docker][1] et [Kubernetes][2].

Pour la Log Collection basée sur [**ECS Fargate**][3] et [**EKS Fargate**][4], consultez leur documentation dédiée à la configuration et au dépannage. 

## Comprendre la Log Collection dans Docker et Kubernetes {#understanding-log-collection-in-docker-and-kubernetes}

Dans les environnements conteneurisés, les logs sont collectés par le Datadog Agent de deux manières principales : la collecte **basée sur les fichiers** et la collecte **basée sur les sockets** via l'API Docker.

La documentation Docker et Kubernetes privilégie la collecte basée sur les fichiers, car elle offre de meilleures performances et une meilleure fiabilité. La collecte basée sur les sockets peut être utilisée dans les environnements Docker comme option de secours. Dans les clusters Kubernetes, la collecte basée sur les sockets nécessite le runtime Docker, qui est largement déprécié dans la plupart des distributions Kubernetes.

Dans les environnements conteneurisés, Datadog recommande d'envoyer les logs vers les flux `stdout` / `stderr` plutôt que d'écrire dans des fichiers de log isolés dans les conteneurs d'application. Ces flux permettent une collecte plus automatisée et plus fiable.

### Fichiers de log {#log-files}

Avec le pilote de log `json-file` par défaut de Docker, les logs `stdout`/`stderr` sont stockés dans `/var/lib/docker/containers`. Ces logs peuvent être collectés en montant `/var/lib/docker/containers` (`c:/programdata/docker/containers` sur Windows) dans le conteneur de l'Agent. Par exemple :

```bash
/var/lib/docker/containers/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d-json.log. 
```

Si ce point de montage n'existe pas, l'Agent revient à la collecte basée sur les sockets. Accès à l'API Docker via le socket sur `/var/run/docker.sock`.

Dans Kubernetes, les logs `stdout`/`stderr` sont stockés par défaut dans `/var/log/pods`. La structure des dossiers est configurée par pod unique et par conteneur au sein de ce pod. Par exemple :

```bash
/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log
```

Si le conteneur dans le pod redémarre dans Kubernetes, il incrémente automatiquement le nom de fichier (`0.log` -> `1.log`), ce que l'Agent prend automatiquement en compte. Voir [Collecte de logs Kubernetes][2] pour plus d'informations.

À mesure que l'Agent découvre les conteneurs correspondants sur le host, il recherche leurs fichiers de logs en fonction de la structure de dossiers et de fichiers attendue par environnement.

### Fonction Autodiscovery de l'Agent {#agent-autodiscovery}

Par défaut, l'Agent collecte uniquement les logs des conteneurs lorsque la collecte de logs est activée et que l'une des conditions suivantes est remplie :

- `logs_config.container_collect_all` est activé pour collecter les logs de tous les conteneurs découverts
- Le conteneur est configuré pour la collecte de logs à partir d'une intégration basée sur l'Autodiscovery

L'Agent prend également en compte toutes les règles d'exclusion/inclusion de conteneurs que vous avez configurées dans la [Gestion de la découverte de conteneurs][5]. 

Enfin, l'Agent est responsable de la collecte des logs des conteneurs situés sur le même host que lui. 

Il est important de prendre ces règles en compte pour comprendre comment la collecte de logs est configurée pour vos conteneurs. Si vous ne voyez pas les logs d'un conteneur donné, vous devez vérifier :

- La collecte de logs a-t-elle été activée pour l'Agent ?
- Le conteneur est-il activé pour la collecte de logs par rapport aux règles de découverte ?
- L'Agent s'exécute-t-il sur le même host que le conteneur souhaité ?

#### Configuration de la collecte de tous les conteneurs {#container-collect-all-configuration}

Pour des instructions complètes sur la façon d'activer la collecte de logs, consultez la documentation sur la collecte de logs [Docker][1] et [Kubernetes][2]. Pour une référence rapide, vous pouvez consulter des exemples sur la façon de configurer l'Agent pour activer la collecte de logs et activer la fonctionnalité `container_collect_all`, qui est définie sur false par défaut. 

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Lors de l'utilisation de `container_collect_all`, l'Agent collectera tous les logs des conteneurs découverts et les taguera avec les tags `source` et `service`, correspondant au tag `short_image` du conteneur découvert. 

Si `container_collect_all` n'est pas activé, vous devez activer individuellement la collecte de logs par conteneur avec des configurations basées sur Autodiscovery.

#### Configuration d'Autodiscovery {#autodiscovery-configuration}

L'Autodiscovery vous permet de configurer les conteneurs à partir desquels l'Agent collecte des logs. Datadog recommande d'utiliser les [labels de conteneur dans Docker][6] ou les [annotations de pod dans Kubernetes][7]. Il s'agit de configurations de log basées sur JSON placées sur le conteneur/pod correspondant émettant ces logs. Voir l'exemple minimal suivant :

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

Les labels Docker peuvent être définis dans la commande docker run, le fichier Docker Compose, ou intégrés dans l'image du conteneur.

Par exemple dans une commande run :

```
-l com.datadoghq.ad.logs='[{"source":"example-source","service":"example-service"}]'
```

Voir plus d'exemples dans [Docker Log Collection](/containers/docker/log/?tab=dockerfile#log-integrations).

{{% /tab %}}
{{< /tabs >}}

Avec ces deux méthodes, assurez-vous que votre configuration :
- Définit au moins la source et le service 
- Est un JSON valide
- Est définie sur votre pod Kubernetes ou conteneur Docker correspondant
- Utilise le bon nom de clé pour déclencher la configuration de log ; vous n'avez pas besoin d'ajuster le nom de la clé en fonction de votre [site Datadog][8]. 

Pour plus d'exemples sur la façon de définir votre configuration de log, voir [Configurations avancées de Log Collection][9].

### Tagging {#tagging}

L'Agent attribue automatiquement des tags à vos logs au niveau « high » de [cardinalité des tags][10] pour chaque environnement. Vous pouvez consulter les [tags Docker][11] et les [tags Kubernetes][12] prêts à l'emploi ici. Cela inclut également tous les tags collectés par [Unified Service Tagging][13] ou par différentes règles d'extraction de tags à partir des métadonnées des conteneurs.

Pour personnaliser ces tags, modifier les règles de collecte de logs ou activer la collecte de logs en général, vous pouvez appliquer des labels ou des annotations Autodiscovery aux conteneurs concernés.

Les tags de vos logs peuvent également provenir de [l'héritage des tags du host][14]. Toutes les données, y compris les logs, entrant dans Datadog passent par ce processus. Lors de leur ingestion par Datadog, les logs héritent de tous les tags du host associés à ce host. Vous pouvez voir ces tags dans Infrastructure List pour votre host. Ces tags sont le plus souvent définis par :

- Le Datadog Agent, grâce à sa découverte automatique ou aux `DD_TAGS` définis manuellement
- Les intégrations des fournisseurs cloud qui collectent et définissent des tags pour vos hosts

Par exemple, les tags `pod_name` et `short_image` proviennent de l'Agent, qui définit ces tags lors de l'envoi. D'autres tags comme `region` et `kube_cluster_name` proviennent de l'héritage des tags des hosts lors de l'ingestion.

## Dépannage de la collecte des logs des conteneurs avec les commandes de l'Agent {#troubleshooting-container-log-collection-with-agent-commands}

Le Datadog Agent exécuté sur le même nœud que votre conteneur d'application est responsable de la collecte des logs de ce conteneur. Lors de l'exécution de ces commandes, en particulier dans les environnements Kubernetes, assurez-vous d'utiliser le pod de l'Agent correspondant au conteneur d'application concerné.

Pour obtenir une liste de commandes de dépannage utiles, consultez [Agent Commands][15].

### Statut de l'Agent {#agent-status}

Vous pouvez exécuter la commande de statut de l'Agent pour voir si l'Agent de journalisation rencontre des problèmes

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

Cette commande vous montre le statut de l'Agent de logs en général et du collecteur de logs pour chaque conteneur que l'Agent surveille :

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

Si le statut de l'Agent de logs ne ressemble pas à ce qui précède, consultez les conseils de dépannage dans les sections suivantes.

Chaque collecteur de logs individuel fournit des informations détaillées sur la façon dont l'Agent collecte les logs pour un conteneur spécifique. En utilisant l'exemple Kubernetes ci-dessus, ce résultat nous indique :

- **Collector name** (`default/my-deployment-55d847444b-2fkch/my-container`) identifie le namespace, le pod et le conteneur.
- **Identifier** (`ba778eaff...`) correspond à l'ID du conteneur surveillé.
- **Path** et **Inputs** indiquent les emplacements où l'Agent a recherché et identifié les fichiers de logs du conteneur.
- **Service** et **Source** résument les tags utilisés.

Dans Docker, le résultat est en grande partie le même ; seul le nom du collecteur de logs individuel est différent.

Si vous voyez le message suivant lorsque vous exécutez la commande de statut de l'Agent :

```
==========
Logs Agent
==========

  Logs Agent is not running
```
Cela signifie que vous n'avez pas activé la collecte de logs dans l'Agent.

Si le statut de l'Agent de logs n'affiche aucune intégration dans la section Integrations et que vous voyez `LogsProcessed: 0` et `LogsSent: 0` :

```
==========
Logs Agent
==========

    LogsProcessed: 0
    LogsSent: 0
```
Ce statut signifie que les logs sont activés mais que vous n'avez pas spécifié les conteneurs dont l'Agent doit collecter les logs.

### Agent configcheck {#agent-configcheck}

Vous pouvez exécuter la commande `agent configcheck` pour afficher toutes les configurations chargées et résolues dans un Agent en cours d'exécution.

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

Cette commande affiche la configuration du collecteur de logs, en utilisant le `Configuration source` qui fait référence à l'ID du conteneur. Vous pouvez ainsi faire le rapprochement avec la sortie de `agent status`.

```
===  check ===
Configuration provider: kubernetes-container-allinone
Configuration source: container:containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
Log Config:
[{"service":"example-service","source":"example-source"}]
Autodiscovery IDs:
* containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
```

Le `Log Config` appliqué par l'Autodiscovery fournit des tags `service` et `source` personnalisés affichés sous la forme `[{"service":"example-service","source":"example-source"}]`. La sortie `configcheck` permet de vérifier comment l'Agent a configuré la collecte des logs d'un conteneur donné à partir de son ID.

Lors de l'utilisation de `logs_config.container_collect_all`, si aucune configuration unique n'est fournie, vous verrez que cela utilise par défaut `[{}]` pour le conteneur.


### Agent stream-logs {#agent-stream-logs}

Vous pouvez exécuter la commande `agent stream-logs` pour diffuser en temps réel vers la console les logs que l'Agent voit, ainsi que les métadonnées associées et le contenu des logs.

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

Vous pouvez filtrer ce résultat avec le flag `--name`, qui correspond au format de nommage Kubernetes (Namespace/Pod Name/Container). Vous pouvez également filtrer cette sortie selon les tags appliqués à l'aide du flag `--service` ou `--source`. 

Pour trouver le `<NAME>`, utilisez la commande `agent status`. Par exemple, `default/my-deployment-55d847444b-2fkch/my-container` :

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
Cette commande affichera en continu vos logs tels qu'ils sont rapportés par l'Agent :

```text
$ agent stream-logs --name default/my-deployment-55d847444b-2fkch/my-container
...
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016005644 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 INFO Sample Info Log
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016049347 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 ERROR Sample Error Log
```

Chaque ligne doit fournir le nom de l'intégration, le type, le statut, l'horodatage, le nom de host, le service, la source, les tags de conteneur et le message. Cela montre quels logs l'Agent collecte, quelles métadonnées sont associées à ces logs et quel message est envoyé.

Appuyez sur `Ctrl + C` pour arrêter la diffusion des logs.

### Capture du fichier de logs brut {#capturing-the-raw-log-file}

Pour vérifier si l'Agent suit correctement les logs, vous pouvez copier le fichier de logs et l'examiner à l'aide de la commande [`agent status`](#agent-status).

Exécutez la commande `agent status` et vérifiez la section « Logs Agent » pour le conteneur en question. Par exemple, pour un pod nommé `my-deployment-98878c5d8-mc2sk` avec le conteneur `my-container`, cela peut ressembler à ceci :

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

Nous pouvons voir le `Path` indiquant où l'Agent effectue sa recherche et le `Inputs` montrant le fichier journal découvert en tant que `/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log`. 

Comme le lien est ouvert dans le pod de l'Agent, vous pouvez copier ce fichier du pod de l'Agent vers votre machine locale, en utilisant une commande `kubectl cp` : 

```
kubectl cp <Agent Pod>:<Log Input Path> <Desired Filename>
```

Si le pod de l'Agent dans l'exemple était nommé `datadog-agent-xxxxx`, cela ressemblerait à ceci :

```text
kubectl cp datadog-agent-xxxxx:/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log my-container.log
```
Vous pouvez examiner le fichier copié pour voir exactement les logs auxquels l'Agent a accès et déterminer si Kubernetes capture les logs nécessaires. La même chose peut être faite pour les conteneurs Docker dans leur chemin `/var/lib/docker/containers` et une commande docker cp.

## Problèmes courants {#common-issues}

Des problèmes courants peuvent entraver l'envoi de logs à Datadog dans les environnements conteneurisés. Si vous rencontrez des problèmes lors de l'envoi de logs à Datadog, consultez les problèmes courants ci-dessous. Si vous continuez à rencontrer des difficultés, contactez notre équipe de support pour obtenir une aide supplémentaire.

### Prétraitement du nom de host {#hostname-preprocessing}

Un problème courant survient lorsque les logs bruts contiennent un attribut JSON pour un `host`, `hostname` ou `syslog.hostname`. Par exemple :

{{< img src="logs/troubleshooting/hostname_preprocessing.png" alt="exemple de prétraitement du nom de host" >}}

Les logs au format JSON passent par un ensemble de règles de prétraitement relatives aux attributs réservés, tels que `timestamp` ou `level`, pour définir l'horodatage officiel ou le niveau de log de chaque entrée. L'un de ces attributs réservés concerne le [prétraitement du host][16], où un attribut JSON `host`, `hostname` ou `syslog.hostname` devient le `host` officiel du log. Cela entraîne l'attribution de ces entrées de log au « mauvais » host et, par conséquent, elles n'héritent pas des tags attendus au niveau du host « d'origine ».

Vous pouvez effectuer une requête sur les logs correspondant à l'attribut JSON `@host:* OR @hostname:* OR @syslog.hostname:*` pour voir quels logs utilisent activement ce prétraitement.

Il existe quelques options pour résoudre ce problème.
- Si possible, mettez à jour l'application pour éviter de journaliser un attribut JSON `host` ou `hostname`, en le supprimant ou en le remplaçant par une autre clé.
- Mettez à jour vos [règles de prétraitement globales][17] pour ignorer ce comportement. Cependant, tous les logs qui en dépendent perdraient cette fonctionnalité.
- Ajoutez une configuration d'Autodiscovery pour créer une [configuration de log personnalisée qui masque le mot-clé host][18].

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

Les règles ci-dessus recherchent la chaîne `"host"` (guillemets inclus) et la remplacent par `"app_host"` pour conserver la structure JSON. Remplacez le motif par `hostname` si nécessaire pour vos logs.

Vous pouvez également ajouter une [règle de traitement globale][19] pour que l'Agent masque les mots-clés dans tous les logs qu'il traite en utilisant la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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


### Tags de niveau host manquants sur les nouveaux hosts ou nœuds {#missing-host-level-tags-on-new-hosts-or-nodes}

Lors de l'envoi de logs à Datadog depuis un host ou un nœud nouvellement créé, il peut s'écouler quelques minutes avant que les tags de niveau host ne soient [hérités][20]. Par conséquent, les tags de niveau host peuvent être manquants dans ces logs. 

Pour remédier à ce problème, vous pouvez utiliser la variable d'environnement `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` pour configurer une durée (en minutes). Le Datadog Agent attache manuellement les tags de niveau host qu'il connaît à chaque log envoyé pendant cette durée. Après cette durée, l'Agent revient à l'héritage des tags lors de l'ingestion.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Lors de l'envoi de logs à Datadog depuis des conteneurs ou des pods nouvellement créés, le tagger interne du Datadog Agent peut ne pas encore disposer des tags de conteneur/pod associés. Par conséquent, des tags peuvent manquer dans ces logs.

Pour remédier à ce problème, vous pouvez utiliser la variable d'environnement `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` pour configurer une durée (en secondes) pendant laquelle le Datadog Agent doit attendre avant de commencer à envoyer des logs depuis des conteneurs et des pods nouvellement créés. La valeur par défaut est `0`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Par défaut, l'Agent recherche de nouveaux conteneurs toutes les 5 secondes. Pour l'Agent v6.12+, les logs de conteneurs à courte durée de vie (arrêtés ou ayant planté) sont automatiquement collectés lors de l'utilisation de la méthode de collecte de logs par fichier. Cela inclut également la collecte des logs des conteneurs init. Tant que ces fichiers existent toujours.

Dans Kubernetes, la plupart des logs des pods et de leurs conteneurs sont conservés assez longtemps pour que l'Agent puisse les transmettre, même pour les processus à courte durée de vie. Par défaut, les CronJobs et les Jobs Kubernetes conservent le pod assez longtemps pour que l'Agent puisse transmettre ses logs, même pour les conteneurs terminés. Cependant, si vous spécifiez une [règle de nettoyage de Job][21] `ttlSecondsAfterFinished`, Datadog recommande au moins 15 secondes pour permettre à l'Agent de les traiter.

### Problèmes de collecte de logs Docker à partir de fichiers {#docker-log-collection-from-file-issues}

L'Agent collecte les logs Docker à partir des fichiers journaux sur le disque par défaut dans les versions 6.33.0/7.33.0+ tant que les fichiers journaux sur le disque sont accessibles par l'Agent. `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` peut être défini sur `false` pour désactiver ce comportement.

Lors de la collecte des logs de conteneur Docker à partir de fichiers, l'Agent revient à une collecte depuis le socket Docker s'il ne peut pas lire le répertoire où les logs de conteneur Docker sont stockés (`/var/lib/docker/containers` sur Linux). Pour diagnostiquer ce problème, vérifiez le statut du Logs Agent et recherchez une entrée de type fichier affichant une erreur similaire à la suivante :

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

Ce statut signifie que l'Agent est incapable de trouver un fichier journal pour un conteneur donné. Pour résoudre ce problème, vérifiez que le dossier contenant les logs de conteneur Docker est correctement exposé au conteneur du Datadog Agent. Sur Linux, cela correspond à `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` sur la ligne de commande démarrant le conteneur de l'Agent, tandis que sur Windows, cela correspond à `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`. 

Notez que le répertoire relatif au host sous-jacent peut être différent en raison d'une configuration spécifique du démon Docker ; cela ne pose pas de problème si le mappage du volume Docker est correct. Par exemple, utilisez `-v /data/docker/containers:/var/lib/docker/containers:ro` si le répertoire de données Docker a été déplacé vers `/data/docker` sur le host sous-jacent.

Si les logs sont collectés mais que des lignes uniques semblent être divisées, vérifiez que le démon Docker utilise le [pilote de journalisation JSON](#different-docker-log-driver).

### Agent installé sur le host {#host-based-agent}

Si vous installez l'Agent sur le host au lieu de l'exécuter dans un conteneur Docker, l'utilisateur `dd-agent` doit être ajouté au groupe Docker pour avoir l'autorisation de lire depuis le socket Docker. Si vous voyez les logs d'erreur suivants provenant de l'Agent :

```text
<TIMESTAMP> UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
<TIMESTAMP> UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Pour ajouter l'Agent au groupe d'utilisateurs Docker, exécutez la commande suivante :

```
usermod -a -G docker dd-agent
```
**Remarque :** Lorsque vous installez l'Agent sur le host, l'Agent n'a pas l'autorisation d'accéder à ` /var/lib/docker/containers` car cela nécessite un accès root. Par conséquent, il collectera les logs depuis le socket Docker.


### Pilote de journalisation Docker différent {#different-docker-log-driver}

Le pilote par défaut de Docker est le [pilote de journalisation json-file][23], l'Agent tente donc de lire cette structure en premier. Si vos conteneurs sont configurés pour utiliser un autre pilote de journalisation, le Logs Agent indiquera qu'il parvient à trouver vos conteneurs, mais qu'il ne peut pas collecter leurs logs à partir des fichiers. Dans les environnements Docker, Datadog recommande d'utiliser le pilote de log `json-file` pour une expérience optimale avec l'Agent. Cependant, l'Agent peut également être configuré pour lire à partir du pilote de journalisation `journald`.

1. Si vous n'êtes pas sûr du pilote de journalisation utilisé par vos conteneurs, utilisez `docker inspect <CONTAINER_NAME>` pour voir quel pilote de journalisation vous avez défini. Le bloc suivant apparaît dans Docker Inspect lorsque le conteneur utilise le pilote de journalisation JSON

   ```
   "LogConfig": {
       "Type": "json-file",
       "Config": {}
   },
   ```

2. Si le conteneur est configuré pour utiliser le pilote de journalisation journald, le bloc suivant apparaît dans Docker Inspect :
   ```
   "LogConfig": {
       "Type": "journald",
       "Config": {}
   },
   ```

3. Pour collecter des logs à partir du pilote de journalisation journald, configurez l'intégration journald [en suivant la documentation Datadog-Journald][24].
4. Montez le fichier YAML dans votre conteneur en suivant les instructions de la [documentation du Docker Agent][25]. Pour plus d'informations sur la configuration des pilotes de journalisation pour les conteneurs Docker, [consultez cette documentation][26].

## Pour aller plus loin {#further-reading}

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
[18]: /fr/agent/logs/advanced_log_collection/?tab=annotations#scrub-sensitive-data-from-your-logs
[19]: /fr/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[20]: /fr/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#integration-inheritance
[21]: https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/#cleanup-for-finished-jobs
[22]: /fr/logs/guide/docker-logs-collection-troubleshooting-guide/#your-containers-are-not-using-the-json-logging-driver
[23]: https://docs.docker.com/engine/logging/drivers/json-file/
[24]: /fr/integrations/journald/?tab=host#setup
[25]: /fr/containers/docker/#mounting-conf-d
[26]: https://docs.docker.com/engine/logging/drivers/journald/