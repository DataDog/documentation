---
title: Utilisation de base de l'Agent Kubernetes dans l'Agent v5
kind: guide
private: true
aliases:
  - /fr/agent/faq/agent-5-kubernetes-basic-agent-usage
---
{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Dashboard Kubernetes" >}}

<div class="alert alert-warning">
L'Agent Datadog v5 est pris en charge jusqu'à la version 1.8 de Kubernetes. Pour la version la plus récente de Kubernetes, utilisez l'Agent Datadog v6.
</div>

## Présentation

Recueillez des métriques de Kubernetes en temps réel pour :

* Visualiser et surveiller les états de Kubernetes
* Être informé des failovers et des événements de Kubernetes

Pour Kubernetes, il est recommandé d'exécuter l'[Agent dans un DaemonSet][1]. Nous avons créé une [image Docker][2] comprenant les intégrations Docker et Kubernetes activées.

Vous pouvez également vous contenter d'[exécuter l'Agent Datadog sur votre host][3] et de le configurer de façon à rassembler vos métriques Kubernetes.

## Configurer Kubernetes

### Installation

#### Installation sur un conteneur

Grâce à Kubernetes, vous pouvez tirer profit des DaemonSets pour déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds (ou sur un nœud donné grâce aux nodeSelectors). 

*Si vous ne pouvez pas utiliser de DaemonSets pour votre cluster Kubernetes, [installez l'Agent Datadog][4] en tant que déploiement sur chaque nœud Kubernetes.*

Si le contrôle d'accès en fonction du rôle (RBAC) est activé sur votre Kubernetes, consultez la [documentation sur la configuration des autorisations RBAC avec votre intégration Datadog/Kubernetes][5].

* Créez le manifeste `dd-agent.yaml` suivant :

```yaml

apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: dd-agent
spec:
  template:
    metadata:
      labels:
        app: dd-agent
      name: dd-agent
    spec:
      containers:
      - image: gcr.io/datadoghq/docker-dd-agent:latest
        imagePullPolicy: Always
        name: dd-agent
        ports:
          - containerPort: 8125
            name: dogstatsdport
            protocol: UDP
        env:
          - name: API_KEY
            value: "CLÉ_API_DATADOG"
          - name: KUBERNETES
            value: "yes"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
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

Remplacez `CLÉ_API_DATADOG` par [votre clé d'API][6] ou utilisez les [secrets Kubernetes][7] pour définir votre clé d'API en tant que [variable d'environnement][8].

* Déployez le DaemonSet avec cette commande :
  ```shell
  kubectl create -f dd-agent.yaml
  ```

**Remarque** : ce manifeste active la fonctionnalité de configuration automatique d'Autodiscovery. Pour la désactiver, retirez la définition de la variable d'environnement `SD_BACKEND`. Pour découvrir comment configurer Autodiscovery, consultez la [documentation dédiée][9].

#### Installation sur un host

Installez le paquet `dd-check-kubernetes` manuellement ou avec votre gestionnaire de configuration préféré.

### Configuration

Modifiez le fichier `kubernetes.yaml` afin de spécifier votre serveur et votre port. Définissez ensuite les masters à surveiller :

```yaml

instances:
    host: localhost
    port: 4194
    method: http
```

Consultez le [fichier d'exemple kubernetes.yaml][10] pour découvrir toutes les options de configuration disponibles.

### Validation

#### Exécution du conteneur

Pour vérifier que l'Agent Datadog s'exécute dans votre environnement en tant que DaemonSet, exécutez :

```shell
kubectl get daemonset
```

Si l'Agent est déployé, une sortie similaire au texte ci-dessous s'affiche. Les valeurs **desired** et **current** correspondent au nombre de nœuds exécutés dans votre cluster.

```text
NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
dd-agent   3         3         <none>          11h
```

#### Exécution du check de l'Agent

[Lancez la sous-commande `info` de l'Agent][11] et cherchez `kubernetes` dans la section Checks :

```text
Checks
======
    kubernetes
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

## Configurer Kubernetes State

### Installation

#### Installation sur un conteneur

Si vous exécutez Kubernetes >= 1.2.0, vous pouvez utiliser le projet [kube-state-metrics][12] pour fournir des métriques supplémentaires (identifiées par le préfixe `kubernetes_state` dans la liste de métriques ci-dessous) à Datadog.

Pour exécuter kube-state-metrics, créez un fichier `kube-state-metrics.yaml` avec le manifeste suivant pour déployer le service :

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: kube-state-metrics
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: kube-state-metrics
    spec:
      containers:
      - name: kube-state-metrics
        image: gcr.io/google_containers/kube-state-metrics:v1.2.0
        ports:
        - name: metrics
          containerPort: 8080
        resources:
          requests:
            memory: 30Mi
            cpu: 100m
          limits:
            memory: 50Mi
            cpu: 200m
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: 'true'
  labels:
    app: kube-state-metrics
  name: kube-state-metrics
spec:
  ports:
  - name: metrics
    port: 8080
    targetPort: metrics
    protocol: TCP
  selector:
    app: kube-state-metrics
```

Déployez-le ensuite en exécutant :

```shell
kubectl create -f kube-state-metrics.yaml
```

Le manifeste ci-dessus utilise le conteneur public `kube-state-metrics` de Google, qui est également disponible sur [Quay][13]. Si vous souhaitez le créer manuellement, consultez [la documentation officielle du projet][12].

Si vous configurez votre service Métriques Kubernetes State pour une utilisation sur une autre URL ou un autre port, vous pouvez configurer l'Agent Datadog en définissant le paramètre `kube_state_url` dans `conf.d/kubernetes_state.yaml`, puis en redémarrant l'Agent.
Pour en savoir plus, consultez le [fichier kubernetes_state.yaml.example][14]. Si vous avez activé [Autodiscovery][9], l'URL kube-state est configurée et gérée automatiquement.

#### Installation sur un host

Le paquet `dd-check-kubernetes_state` peut être installé manuellement ou via votre gestionnaire de configuration préféré (pour CentOS/AWS, vous trouverez [votre paquet rpm ici][15] et les instructions d'installation sur [cette page][16].
Ensuite, modifiez le fichier `kubernetes_state.yaml` de façon à spécifier votre serveur et votre port, et définissez les masters à surveiller. Consultez le [fichier exemple kubernetes_state.yaml][14] pour découvrir toutes les options de configuration.

### Validation

#### Validation de conteneur

Pour vérifier que l'Agent Datadog s'exécute dans votre environnement en tant que DaemonSet, exécutez :

```shell
kubectl get daemonset
```

Si l'Agent est déployé, une sortie similaire au texte ci-dessous s'affiche. Les valeurs **desired** et **current** correspondent au nombre de nœuds exécutés dans votre cluster.

```shell
NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
dd-agent   3         3         <none>          11h
```

#### Validation du check l'Agent

[Lancez la sous-commande info de l'Agent][11] et cherchez `kubernetes_state` dans la section Checks :

```shell
Checks
======
    kubernetes_state
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

## Configurer Kubernetes DNS

### Installation

Installez le paquet `dd-check-kube_dns` manuellement ou avec votre gestionnaire de configuration préféré.

### Configuration

Modifiez le fichier `kube_dns.yaml` afin de spécifier votre serveur et votre port et de définir les masters à surveiller. Consultez le [fichier d'exemple kube_dns.yaml][17] pour découvrir toutes les options de configuration disponibles.

#### Utilisation de la découverte de services

Si vous utilisez un pod `dd-agent` pour chaque nœud de travail Kubernetes, vous pouvez utiliser les annotations suivantes sur votre pod kube-dns pour récupérer automatiquement les données.

```yaml

apiVersion: v1
kind: Pod
metadata:
  annotations:
    service-discovery.datadoghq.com/kubedns.check_names: '["kube_dns"]'
    service-discovery.datadoghq.com/kubedns.init_configs: '[{}]'
    service-discovery.datadoghq.com/kubedns.instances: '[[{"prometheus_endpoint":"http://%%host%%:10055/metrics", "tags":["dns-pod:%%host%%"]}]]'
```

**Remarques :**

* Le tag « dns-pod » surveille l'IP du pod DNS cible. Les autres tags sont associés au `dd-agent` qui interroge les informations à l'aide de la découverte de services.
* Les annotations de découverte de services doivent être appliquées au pod. En cas de déploiement, ajoutez les annotations aux métadonnées des spécifications du modèle.

### Validation

[Lancez la sous-commande info de l'Agent][11] et cherchez `kube_dns` dans la section Checks :

```shell
Checks
======
    kube_dns
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

[1]: https://github.com/DataDog/docker-dd-agent
[2]: https://gcr.io/datadoghq/docker-dd-agent
[3]: /fr/#host-setup
[4]: /fr/integrations/docker_daemon/
[5]: /fr/agent/kubernetes/
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://kubernetes.io/docs/concepts/configuration/secret
[8]: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables
[9]: /fr/getting_started/agent/autodiscovery/
[10]: https://github.com/DataDog/integrations-core/blob/master/kubernetes/datadog_checks/kubernetes/data/conf.yaml.example
[11]: /fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/kubernetes/kube-state-metrics
[13]: https://quay.io/coreos/kube-state-metrics
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[15]: https://yum.datadoghq.com/stable/6/x86_64
[16]: /fr/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity/
[17]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/conf.yaml.example