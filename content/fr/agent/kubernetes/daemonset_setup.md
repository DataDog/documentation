---
title: Exécuter l'Agent avec un DaemonSet Kubernetes
kind: documentation
further_reading:
  - link: agent/autodiscovery
    tag: documentation
    text: Autodiscovery avec l'Agent Docker
  - link: agent/kubernetes/host_setup
    tag: documentation
    text: Exécuter l'Agent sur un host avec Kubernetes
  - link: agent/kubernetes/integrations
    tag: documentation
    text: Intégrations personnalisées
aliases:
  - /agent/kubernetes/apm
---
Tirez profit des DaemonSets pour déployer l'Agent Datadog sur l'ensemble de vos nœuds (ou sur un nœud donné grâce [aux nodeSelectors][1]). 

*Si vous ne pouvez pas utiliser de DaemonSets pour votre cluster Kubernetes, [installez l'Agent Datadog][2] en tant que déploiement sur chaque nœud Kubernetes.*

## Configurer les autorisations RBAC
Si le contrôle d'accès basé sur des rôles (RBAC) est activé sur votre Kubernetes, configurez les autorisations RBAC du compte de service de votre Agent Datadog.

Créez les ServiceAccount, ClusterRole et ClusterRoleBinding appropriés :

```
kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
```

## Créer un manifeste
Créez le manifeste `datadog-agent.yaml` suivant.

Pensez à encoder votre clé d'API avec `base64` :

```
echo -n <CLÉ_API_DD> | base64
```

**Remarque** : si vous avez recours à KMS ou que DogStatsD sollicite beaucoup de ressources, il se peut que vous ayez besoin de rehausser la limite de mémoire.

```yaml
# datadog-agent.yaml

# Uncomment this section to use Kubernetes secrets to configure your Datadog API key

# apiVersion: v1
# kind: Secret
# metadata:
#   name: datadog-secret
#   labels:
#     app: "datadog"
# type: Opaque
# data:
#   api-key: "<YOUR_BASE64_ENCODED_DATADOG_API_KEY>"
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            ## Custom metrics via DogStatsD - uncomment this section to enable custom metrics collection
            ## Set DD_DOGSTATSD_NON_LOCAL_TRAFFIC to true to collect StatsD metrics from other containers.
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            ## Trace Collection (APM) - uncomment this section to enable APM
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            ## Kubernetes Secrets - uncomment this section to supply API Key with secrets
            # valueFrom:
            #   secretKeyRef:
            #     name: datadog-secret
            #     key: api-key

          ## Set DD_SITE to datadoghq.eu to send your Agent data to the Datadog EU site
          - name: DD_SITE
            value: "datadoghq.com"

          ## Set DD_DOGSTATSD_NON_LOCAL_TRAFFIC to true to allow StatsD collection.
          - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
            value: "false"
          - name: DD_COLLECT_KUBERNETES_EVENTS
            value: "true"
          - name: DD_LEADER_ELECTION
            value: "true"
          - name: KUBERNETES
            value: "true"
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
          - name: DD_APM_ENABLED
            value: "true"
        ## Note these are the minimum suggested values for requests and limits. The amount of resources required by the Agent varies depending on the number of checks, integrations, and features enabled.
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: logpodpath
            mountPath: /var/log/pods
          ## Docker runtime directory, replace this path with your container runtime logs directory, or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
          - name: logcontainerpath
            mountPath: /var/lib/docker/containers
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
        livenessProbe:
          exec:
            command:
            - ./probe.sh
          initialDelaySeconds: 15
          periodSeconds: 5
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        ## Docker runtime directory, replace this path with your container runtime logs directory, or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

Remplacez `<VOTRE_CLÉ_API>` par [votre clé d'API Datadog][3] ou utilisez des [secrets Kubernetes][4] pour définir votre clé d'API en tant que [variable d'environnement][5]. SI vous choisissez d'utiliser des secrets Kubernetes, consultez les [instructions de configuration d'une clé d'API avec des secrets Kubernetes][6] de Datadog. Consultez la section relative à l'[intégration Docker][7] pour découvrir toutes les options de configuration.

Déployez le DaemonSet avec cette commande :
```
kubectl create -f datadog-agent.yaml
```

**Remarque** : ce manifeste permet d'activer la fonctionnalité de configuration automatique d'Autodiscovery. Pour découvrir comment configurer Autodiscovery, consultez la [documentation dédiée][8].

### Vérification

Pour vérifier que l'Agent Datadog s'exécute dans votre environnement en tant que DaemonSet, exécutez :

```
kubectl get daemonset
```

Si l'Agent est déployé, une sortie similaire au texte ci-dessous s'affiche. Les valeurs `DESIRED` et `CURRENT` correspondent au nombre de nœuds exécutés dans votre cluster.

```
NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2         2            2           <none>          16h
```

### Détection automatique du nom de cluster Kubernetes

Depuis la version 6.5.0 de l'Agent Datadog, la configuration de l'Agent comprend un attribut de nom de cluster à utiliser dans les clusters Kubernetes afin d'obtenir des alias de host uniques. Cet attribut peut être défini grâce à la variable d'environnement `DD_CLUSTER_NAME`.

Depuis la version 6.11.0, l'Agent Datadog peut détecter automatiquement le nom du cluster Kubernetes sur Google GKE, Azure AKS et AWS EKS. Cette fonctionnalité simplifie l'identification des nœuds sur tous les clusters Kubernetes en ajoutant un alias qui comprend le nom du cluster sous forme de suffixe dans le nom du nœud.

Sur Google GKE et Azure AKS, le nom du cluster est récupéré depuis l'API du fournisseur de cloud. Pour AWS EKS, le nom du cluster est récupéré à partir des tags d'instance EC2.

**Remarque** : sur AWS, vous devez ajouter l'[autorisation][9] `ec2:DescribeInstances` à votre stratégie IAM Datadog afin de permettre à l'Agent d'interroger les tags d'instance EC2.


## Activer les fonctionnalités

### Collecte de logs

Pour activer la [collecte de logs][10] avec votre DaemonSet :

1. Définissez les variables `DD_LOGS_ENABLED` et `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` sur true dans votre section *env* :

    ```
    (...)
      env:
        (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_AC_EXCLUDE
          value: "name:datadog-agent"
    (...)
    ```

   **Remarque** : définissez `DD_AC_EXCLUDE` pour empêcher l'Agent Datadog de recueillir et d'envoyer ses propres logs. Supprimez ce paramètre si vous souhaitez recueillir les logs de l'Agent Datadog.

2. Montez le volume `pointdir` dans *volumeMounts* :

    ```
      (...)
        volumeMounts:
          (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
      (...)
      volumes:
        (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
      (...)
    ```

   Le `pointdir` est utilisé pour stocker un fichier avec un pointeur vers tous les conteneurs à partir desquels l'Agent recueille des logs. Ce volume permet de s'assurer qu'aucun log n'est perdu lorsque l'Agent est redémarré ou lors d'un problème réseau.


L'Agent peut collecter les logs de deux façons : depuis le socket Docker et depuis les fichiers de logs Kubernetes (automatiquement gérés par Kubernetes). Utilisez la collecte via les fichiers de logs lorsque :

* Le Docker n'est pas le runtime.
* Plus de 10 conteneurs sont utilisés au sein de chaque pod.

L'API Docker est optimisée pour obtenir les logs d'un conteneur à la fois. Lorsqu'un conteneur contient un grand nombre de pods, la collecte de logs via le socket Docker peut solliciter davantage de ressources qu'en passant par les fichiers.

{{< tabs >}}
{{% tab "Fichier Kubernetes" %}}

Montez également `/var/lib/docker/containers`, car `/var/log/pods` est un lien symbolique vers ce répertoire :

```
  (...)
    volumeMounts:
      (...)
      - name: logpodpath
        mountPath: /var/log/pods
      # Répertoire d'exécution de Docker. Remplacez ce chemin par le répertoire des logs d'exécution de vos conteneurs,
      # ou supprimez cette configuration si `/var/log/pods` ne correspond au lien symbolique d'aucun autre répertoire.
      - name: logcontainerpath
        mountPath: /var/lib/docker/containers
  (...)
  volumes:
   (...)
    - hostPath:
        path: /var/log/pods
      name: logpodpath
    # Répertoire d'exécution de Docker. Remplacez ce chemin par le répertoire des logs d'exécution de vos conteneurs,
    # ou supprimez cette configuration si `/var/log/pods` ne correspond au lien symbolique d'aucun autre répertoire.
    - hostPath:
        path: /var/lib/docker/containers
      name: logcontainerpath
  (...)
```

{{% /tab %}}
{{% tab "Socket Docker" %}}

Montez le socket Docker sur l'Agent Datadog :

```
  (...)
    volumeMounts:
      (...)
      - name: dockersocket
        mountPath: /var/run/docker.sock
  (...)
  volumes:
    (...)
    - hostPath:
        path: /var/run/docker.sock
      name: dockersocket
  (...)
```

{{% /tab %}}
{{< /tabs >}}

L'Agent Datadog suit la logique suivante pour savoir où collecter les logs :

1. L'Agent cherche le socket Docker. S'il est disponible, il recueille les logs à partir de ce socket.
2. S'il n'est pas disponible, l'Agent cherche le chemin `/var/log/pods`. Si ce dernier est disponible, il recueille les logs à partir de ce chemin.

Remarque : si vous souhaitez recueillir les logs à partir de `/var/log/pods` même lorsque le socket Docker est monté, vous pouvez définir la variable d'environnement `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` (ou `logs_config.k8s_container_use_file` dans `datadog.yaml`) sur `true` pour forcer l'Agent à passer par les fichiers.

Enfin, utilisez [Autodiscovery avec les annotations de pod][11] pour optimiser la collecte de logs pour vos conteneurs.

#### Conteneurs de courte durée

{{< tabs >}}
{{% tab "Fichier Kubernetes" %}}

Par défaut, l'Agent recherche de nouveaux conteneurs toutes les cinq secondes.

Si vous utilisez l'Agent v6.12+, les logs de conteneurs de courte durée (en raison d'une interruption ou d'un crash) sont automatiquement recueillis à partir des fichiers Kubernetes (via `/var/log/pods`). Les logs des conteneurs d'initialisation sont eux aussi recueillis.

{{% /tab %}}
{{% tab "Socket Docker" %}}

Dans un environnement de Docker, l'Agent reçoit les mises à jour de conteneurs en temps réel via les événements Docker. L'Agent extrait et met à jour la configuration toutes les secondes depuis les étiquettes de conteneur (Autodiscovery).
À partir de l'Agent v6.14+, l'Agent recueille les logs de tous les conteneurs (qu'ils soient exécutés ou arrêtés). Par conséquent, les logs des conteneurs de courte durée qui ont été lancés ou arrêtés il y a moins d'une seconde sont également recueillis tant qu'ils ne sont pas supprimés.

{{% /tab %}}
{{< /tabs >}}

### APM et tracing distribué

Pour activer l'APM en autorisant l'envoi de données depuis le port 8126, définissez la variable `DD_APM_NON_LOCAL_TRAFFIC` sur true dans votre section *env* :

```
(...)
      env:
        (...)
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Transmettez ensuite le port de l'Agent au host.

```
(...)
      ports:
        (...)
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
(...)
```

Utilisez l'API Downward pour récupérer l'IP du host. Le conteneur d'application requiert une variable d'environnement qui pointe vers `status.hostIP`. L'Agent de conteneur Datadog s'attend à ce que celle-ci soit intitulée `DD_AGENT_HOST` :

```
apiVersion: apps/v1
kind: Deployment
...
    spec:
      containers:
      - name: <NOM_CONTENEUR>
        image: <IMAGE_CONTENEUR>/<TAG>
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```

Enfin, indiquez aux traceurs d'application l'emplacement où le host de l'Agent Datadog utilise la variable d'environnement `DD_AGENT_HOST`. Par exemple, en Python :

```
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

Consultez la [documentation sur l'APM propre à votre langage][12] pour obtenir davantage d'exemples.

### Collecte de processus

Consultez la section relative à la [collecte de processus pour Kubernetes][13].

### DogStatsD

Pour envoyer des métriques custom via DogStatsD, définissez la variable `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur true dans votre section *env* :

```
(...)
      env:
        (...)
        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Pour en savoir plus, consultez [la documentation relative à DogStatsD de Kubernetes][14].

Pour envoyer des métriques custom via DogStatsD depuis vos pods d'application, supprimez la mise en commentaire de la ligne `# hostPort: 8125` dans votre manifeste `datadog-agent.yaml`. Vous exposez ainsi le port DogStatsD sur chacun de vos nœuds Kubernetes.

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu autorise uniquement un accès pour vos applications et autres sources de confiance.
En outre, certains plug-ins réseau ne prennent pas encore en charge `hostPorts`, ce qui rend cette configuration inutile.
Pour y remédier, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur un host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant le pod de démarrer. Cela n'est pas systématiquement possible avec toutes les installations Kubernetes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://kubernetes.io/docs/concepts/configuration/secret
[5]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[6]: /fr/agent/faq/kubernetes-secrets
[7]: /fr/agent/docker/#environment-variables
[8]: /fr/agent/autodiscovery/?tab=agent#how-to-set-it-up
[9]: /fr/integrations/amazon_ec2/#configuration
[10]: /fr/logs
[11]: /fr/agent/autodiscovery/integrations/?tab=kubernetes
[12]: /fr/tracing/setup
[13]: /fr/graphing/infrastructure/process/?tab=kubernetes#installation
[14]: /fr/agent/kubernetes/dogstatsd
