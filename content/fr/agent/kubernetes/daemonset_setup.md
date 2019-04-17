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
Créez le manifeste `datadog-agent.yaml` suivant :

```yaml
# datadog-agent.yaml

apiVersion: v1
kind: Secret
metadata:
  name: datadog-secret
  labels:
    app: "datadog"
type: Opaque
data:
  api-key: "<VOTRE_CLÉ_API_DATADOG_ENCODÉE_BASE64>"
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
            # Métriques custom via DogStatsD - supprimer la mise en commentaire de cette section pour activer la collecte des métriques custom
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            # Collecte des traces (APM) - supprimer la mise en commentaire de cette section pour activer l'APM
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            valueFrom:
              secretKeyRef:
                name: datadog-secret
                key: api-key
          - name: DD_SITE
            # Définir DD_SITE sur datadoghq.eu pour envoyer les données de l'Agent vers le site européen de Datadog 
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

Remplacez `<VOTRE_CLÉ_API>` par [votre clé d'API Datadog][3] ou utilisez des [secrets Kubernetes][4] pour définir votre clé d'API en tant que [variable d'environnement][5]. Consultez la section relative à l'[intégration Docker][6] pour découvrir toutes les options de configuration.

Déployez le DaemonSet avec cette commande :
```
kubectl create -f datadog-agent.yaml
```

**Remarque** : ce manifeste permet d'activer la fonctionnalité de configuration automatique d'Autodiscovery. Pour découvrir comment configurer Autodiscovery, consultez la [documentation dédiée][7].

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

**Remarque** : sur AWS, vous devez ajouter l’[autorisation][12] `ec2:DescribeInstances` à votre stratégie IAM Datadog afin de permettre à l'Agent d'interroger les tags d'instance EC2.


## Activer les fonctionnalités

### Collecte de logs

Pour activer la [collecte de logs][8] avec votre DaemonSet :

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

Pour en savoir plus, consultez [la documentation relative à la collecte de logs Docker][9].

### Collecte de traces

Pour activer la collecte de traces avec votre DaemonSet :

1. Définissez le port et l'IP du nœud en tant que variables d'environnement pour vos conteneurs d'application :

    ```
    apiVersion: apps/v1
    kind: Deployment
    ...
        spec:
          containers:
          - name: <CONTAINER_NAME>
            image: <CONTAINER_IMAGE>/<TAG>
            env:
              - name: DD_AGENT_HOST
                valueFrom:
                  fieldRef:
                    fieldPath: status.hostIP
    ```

2. Supprimez la mise en commentaire de la ligne `# hostPort: 8126` dans votre manifeste `datadog-agent.yaml` :
  Cela expose le port de tracing de l'Agent Datadog sur chacun de vos nœuds Kubernetes.

    **Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu autorise uniquement un accès pour vos applications et autres sources de confiance. 
    En outre, certains plug-ins réseau ne prennent pas encore en charge `hostPorts`, ce qui rend cette configuration inutile.
    Pour y remédier, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent, afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur un host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau) et le pod ne démarre pas. Cela n'est pas systématiquement possible avec toutes les installations Kubernetes.

### Collecte de processus

Consultez la section relative à la [collecte de processus pour Kubernetes][10].

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

Pour en savoir plus, consultez [la documentation relative à DogStatsD de Kubernetes][11].

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
[6]: /fr/agent/docker/#environment-variables
[7]: https://docs.datadoghq.com/fr/agent/autodiscovery
[8]: /fr/logs
[9]: /fr/logs/docker/#configuration-file-example
[10]: /fr/graphing/infrastructure/process/?tab=kubernetes#installation
[11]: /fr/agent/kubernetes/dogstatsd
[12]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/#configuration
