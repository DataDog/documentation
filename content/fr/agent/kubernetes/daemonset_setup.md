---
{}
---
---
title: Configuration de DaemonSet avec Kubernetes
kind: documentation
further_reading:
- link: agent/autodiscovery
  tag: documentation
  text: Autodiscovery avec l'Agent Docker
- link: agent/kubernetes/host_setup
  tag: documentation
  text: Configuration de host avec Kubernetes
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
**Remarque** : si vous avez recours à KMS ou utilisez fréquemment DogStatsD, il se peut que vous ayez besoin de rehausser la limite de mémoire.

```yaml
# datadog-agent.yaml

# Supprimer la mise en commentaire de cette section pour utiliser les secrets Kubernetes afin de configurer votre clé d'API Datadog

# apiVersion: v1
# kind: Secret
# metadata:
#   name: datadog-secret
#   labels:
#     app: "datadog"
# type: Opaque
# data:
#   api-key: "<VOTRE_CLÉ_API_DATADOG_ENCODÉE_BASE64>"
---
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
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
            # Métriques custom via DogStatsD : supprimer la mise en commentaire de cette section pour activer la collecte des métriques custom
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            # Collecte des traces (APM) : supprimer la mise en commentaire pour activer l'APM
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            # Secrets Kubernetes : supprimer la mise en commentaire de cette section pour fournir la clé d'API avec des secrets
#            valueFrom:
#              secretKeyRef:
#                name: datadog-secret
#                key: api-key
          - name: DD_SITE
            # Définir DD_SITE sur datadoghq.eu pour envoyer les données de votre Agent vers le site européen de Datadog
            value: "datadoghq.com"
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

Si l'Agent est déployé, une sortie similaire au texte s'affiche. Les valeurs `DESIRED` et `CURRENT` correspondent au nombre de nœuds exécutés dans votre cluster.

```
NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2         2            2           <none>          16h
```

### Détection automatique du nom de cluster Kubernetes

Depuis la version 6.5.0 de l'Agent Datadog, la configuration de l'Agent comprend un attribut de nom de cluster à utiliser dans les clusters Kubernetes afin d'obtenir des alias de host uniques. Cet attribut peut être défini grâce à la variable d'environnement `DD_CLUSTER_NAME`.

Depuis la version 6.11.0, l'Agent Datadog peut détecter automatiquement le nom du cluster Kubernetes sur Google GKE, Azure AKS et AWS EKS. Cette fonctionnalité simplifie l'identification des nœuds sur tous les clusters Kubernetes en ajoutant un alias qui comprend le nom du cluster sous forme de suffixe dans le nom du nœud.

Sur Google GKE et Azure AKS, le nom du cluster est récupéré depuis l'API du fournisseur de cloud. Pour AWS EKS, le nom du cluster est récupéré à partir des tags d'instance EC2.

**Remarque** : sur AWS, vous devez ajouter l’[autorisation][9] `ec2:DescribeInstances` à votre stratégie IAM Datadog afin de permettre à l'Agent d'interroger les tags d'instance EC2.


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
    (...)
    ```

2. Montez le volume `pointdir` dans *volumeMounts* :

    ```
      (...)
        volumeMounts:
          (...)
          - name: pointerdir
              mountPath: /opt/datadog-agent/run
      (...)
      volumes:
        (...)
        - hostPath:
            path: /opt/datadog-agent/run
            name: pointerdir
      (...)
    ```

Pour en savoir plus, consultez [la documentation relative à la collecte de logs Docker][11].

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

Utilisez l'API descendante pour récupérer l'IP du host. Le conteneur de l'application requiert une variable d'environnement qui redirige vers `status.hostIP`. L'Agent de conteneur Datadog s'attend à ce que celle-ci soit intitulée `DD_AGENT_HOST` :

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

Enfin, redirigez vos traceurs au niveau de l'application vers l'emplacement où le host de l'Agent Datadog utilise la variable d'environnement `DD_AGENT_HOST`. Par exemple, en Python :

```
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

Consultez les [documentations sur l'APM dans chaque langage][11] pour obtenir davantage d'exemples.

### Collecte de processus

Consultez la section relative à la [collecte de processus pour Kubernetes][12].

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

Pour en savoir plus, consultez [la documentation relative à DogStatsD de Kubernetes][13].

Pour envoyer des métriques custom via DogStatsD depuis vos pods d'application, supprimez la mise en commentaire de la ligne `# hostPort: 8125` dans votre manifeste `datadog-agent.yaml`. Vous exposez ainsi le port DogStatsD sur chacun de vos nœuds Kubernetes.

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu autorise uniquement un accès pour vos applications et autres sources de confiance.
En outre, certains plug-ins réseau ne prennent pas encore en charge `hostPorts`, ce qui rend cette configuration inutile.
Pour y remédier, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent, afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur un host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau) et le pod ne démarre pas. Cela n'est pas systématiquement possible avec toutes les installations Kubernetes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://kubernetes.io/docs/concepts/configuration/secret
[5]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[6]: /fr/agent/faq/kubernetes-secrets
[7]: /fr/agent/docker/#environment-variables
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery
[9]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/#configuration
[10]: /fr/logs
[11]: /fr/logs/docker/#configuration-file-example
[12]: /fr/graphing/infrastructure/process/?tab=kubernetes#installation
[13]: /fr/agent/kubernetes/dogstatsd