---
title: Agent de cluster Datadog pour Kubernetes
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: Blog
    text: Présentation de l'Agent de cluster Datadog
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: Blog
    text: Mettre à l'échelle vos charges de travail Kubernetes avec n'importe quelle métrique Datadog
  - link: /agent/autodiscovery/clusterchecks
    tag: Documentation
    text: Exécuter les checks de cluster avec Autodiscovery
  - link: agent/kubernetes/daemonset_setup
    tag: Documentation
    text: Configuration de DaemonSet avec Kubernetes
  - link: agent/kubernetes/integrations
    tag: Documentation
    text: Intégrations personnalisées
  - link: 'https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting'
    tag: Github
    text: Dépannage de l'Agent de cluster Datadog
---
L'Agent de cluster Datadog fournit une méthode simplifiée et centralisée de collecte des données de surveillance au niveau des clusters. En agissant comme un proxy entre le serveur d'API et les Agents basés sur des nœuds, l'Agent de cluster permet de réduire la charge du serveur. Il transmet également les métadonnées de cluster aux Agents basés sur des nœuds afin d'enrichir les métadonnées des métriques recueillies localement.

Grâce à l'Agent de cluster Datadog, vous pouvez :

* atténuer l'incidence des Agents sur votre infrastructure ;
* isoler les Agents basés sur des nœuds dans leurs nœuds respectifs, afin de limiter les règles RBAC à la lecture des métriques et des métadonnées du kubelet ;
* tirer parti de la mise à l'échelle automatique de pods horizontaux avec des métriques Kubernetes custom (consultez [le guide dédié][1] pour en savoir plus sur cette fonctionnalité).

**Remarque** : pour bénéficier de toutes les fonctionnalités de l'Agent de cluster Datadog, vous devez exécuter la version 1.10+ de Kubernetes.

## Implémentation

### Configurer les autorisations RBAC de l'Agent de cluster

1. Consultez les manifestes dans le [dossier RBAC de l'Agent de cluster Datadog][2].

2. Accédez au répertoire `datadog-agent` et exécutez ce qui suit :

  ```
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
  ```

  Cela permet de créer les objets ServiceAccount, ClusterRole et ClusterRoleBinding appropriés.

### Sécuriser les communications entre l'Agent de cluster et l'Agent

Sécurisez les communications entre l'Agent et l'Agent de cluster en créant un secret.

Exécutez :

```
echo -n '<TokenXdeXtrenteXdeuxXcaractères>' | base64
```

Utilisez cette chaîne de caractère dans le fichier `dca-secret.yaml` situé dans [le répertoire `manifest/cluster-agent`][3].

Vous pouvez également exécuter cette commande d'une ligne :
```
kubectl create secret generic datadog-auth-token --from-literal=token=<TokenXdeXtrenteXdeuxXcaractères>
```

Utilisez ce secret avec la variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN` dans les manifestes de l'Agent de cluster et de l'Agent basé sur des nœuds.

```yaml
          - name: DD_CLUSTER_AGENT_AUTH_TOKEN
            valueFrom:
              secretKeyRef:
                name: datadog-auth-token
                key: token
```

**Remarque** : cela doit être défini dans le manifeste de l'Agent de cluster **et** celui de l'Agent du nœud.

Vous pouvez également monter le fichier `datadog.yaml` si vous ne souhaitez pas utiliser de variables d'environnement. Nous vous conseillons d'utiliser une ConfigMap. Pour cela, ajoutez ce qui suit dans le manifeste de l'Agent de cluster :

```
[...]
        volumeMounts:
        - name: "dca-yaml"
          mountPath: "/etc/datadog-agent/datadog.yaml"
          subPath: "datadog-cluster.yaml"
      volumes:
        - name: "dca-yaml"
          configMap:
            name: "dca-yaml"
[...]
```

Créez ensuite votre `datadog-cluster.yaml` avec les variables de votre choix. Créez la ConfigMap comme suit :
```
kubectl create configmap dca-yaml --from-file datadog-cluster.yaml

```

### Créer l'Agent de cluster et son service

Repérez les manifestes suivants et remplacez `<DD_API_KEY>` par [votre clé d'Api][4] :

* `Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml`
* `Dockerfiles/manifests/cluster-agent/cluster-agent.yaml`

Exécutez ensuite :

`kubectl apply -f Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml`

et

`kubectl apply -f Dockerfiles/manifests/cluster-agent/cluster-agent.yaml`

### Vérification

À ce stade, vous devriez voir ce qui suit :

```
-> kubectl get deploy
NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

-> kubectl get secret
NAME                   TYPE                                  DATA      AGE
datadog-auth-token     Opaque                                1         1d

-> kubectl get pods -l app=datadog-cluster-agent
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

-> kubectl get service -l app=datadog-cluster-agent
NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

### Configurer les autorisations RBAC des Agents basés sur des nœuds

Consultez le manifeste qui figure dans [`Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml`][5]. Il permet de limiter l'accès d'un Agent à l'API du kubelet.

Exécutez :

```
kubectl apply -f Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml
```

### Activer l'Agent de cluster Datadog

Ajoutez les variables d'environnement suivantes à `Dockerfiles/manifests/agent.yaml` :

```yaml
    - name: DD_CLUSTER_AGENT_ENABLED
            value: 'true'
    - name: DD_CLUSTER_AGENT_AUTH_TOKEN
      valueFrom:
        secretKeyRef:
          name: datadog-auth-token
          key: token
#      value: "<TokenXdeXtrenteXdeuxXcaractères>" # Si vous n'utilisez pas le secret, définissez seulement la chaîne de caractères.
```

Créez le DaemonSet avec cette commande :
```
kubectl apply -f Dockerfiles/manifests/agent.yaml
```

### Vérification finale

Exécutez :

```
kubectl get pods | grep agent
```

Vous devriez voir ce qui suit :

```
datadog-agent-4k9cd                      1/1       Running   0          2h
datadog-agent-4v884                      1/1       Running   0          2h
datadog-agent-9d5bl                      1/1       Running   0          2h
datadog-agent-dtlkg                      1/1       Running   0          2h
datadog-agent-jllww                      1/1       Running   0          2h
datadog-agent-rdgwz                      1/1       Running   0          2h
datadog-agent-x5wk5                      1/1       Running   0          2h
[...]
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h
```

La transmission des événements Kubernetes à votre compte Datadog commence alors. Les métriques pertinentes recueillies par vos Agents se voient assigner le tag correspondant dans les métadonnées de cluster.

## Commandes de l'Agent de cluster

Voici les commandes disponibles pour les Agents de cluster de Datadog :

| Commandes                                     | Description                                                                                                                                                                                                                                   |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog-cluster-agent status`              | Offre un aperçu des composants de l'Agent et de leur santé.                                                                                                                                                                            |
| `datadog-cluster-agent metamap <NOM_NŒUD>` | Interroge le cache local du mappage entre les pods qui se trouvent sur `NOM_NŒUD` et les métadonnées de cluster auxquelles il est associé (endpoints, etc.). Le mappeur s'exécute sur tous les nœuds du cluster si vous n'indiquez pas `NOM_NŒUD`.           |
| `datadog-cluster-agent flare <ID_TICKET>`     | Tout comme l'Agent de nœud, l'Agent de cluster peut agréger les logs et les configurations utilisés et transmettre une archive à l'équipe d'assistance. Ils peuvent également être condensés et utilisés localement. **Remarque :** cette commande est exécutée depuis le pod de l'Agent de cluster. |

## Options de l'Agent de cluster

Les variables d'environnement suivantes sont prises en charge :

| Variable                                      | Description                                                                                                                                                                   |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`                                  | Votre [clé d'API Datadog][4].                                                                                                                                                    |
| `DD_HOSTNAME`                                 | Hostname à utiliser pour l'Agent de cluster Datadog.                                                                                                                                |
| `DD_CLUSTER_AGENT_CMD_PORT`                   | Port à servir par l'Agent de cluster Datadog. Valeur par défaut : `5005`.                                                                                                               |
| `DD_USE_METADATA_MAPPER`                      | Active le mappage des métadonnées de cluster. Valeur par défaut : `true`.                                                                                                                |
| `DD_COLLECT_KUBERNETES_EVENTS`                | Configure l'Agent afin de recueillir les événements Kubernetes. Valeur par défaut : `false`. Consultez la [section Collecte d'événements](#collecte-d-evenements) pour en savoir plus.                                |
| `DD_LEADER_ELECTION`                          | Active [l'élection de leader](#election-de-leader). Vous devez définir `DD_COLLECT_KUBERNETES_EVENTS` sur `true` pour activer cette fonction. Valeur par défaut : `false`.                  |
| `DD_LEADER_LEASE_DURATION`                    | Utilisé seulement si l'élection de leader est activée. Consultez les informations [de la section relative à l'élection de leader](#bail-d-election-de-leader). Valeur par défaut : 60 secondes.                     |
| `DD_CLUSTER_AGENT_AUTH_TOKEN`                 | Token de 32 caractères qui doit être partagé entre l'Agent de nœud et l'Agent de cluster Datadog.                                                                        |
| `DD_KUBE_RESOURCES_NAMESPACE`                 | Configure l'espace de nommage où l'Agent de cluster crée les ConfigMaps nécessaires pour l'élection de leader, la collecte d'événements (facultative) et la mise à l'échelle automatique des pods horizontaux. |
| `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`    | Nom du service Kubernetes auquel les Agents de cluster sont exposés. Valeur par défaut : `datadog-cluster-agent`. |
| `DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`       | Fréquence en secondes des interrogations du serveur d'API afin de resynchroniser cache local. Valeur par défaut : 5 minutes.                                                                             |
| `DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`  | Délai d'expiration en secondes de la communication du client avec le serveur d'API. Valeur par défaut : 60 secondes.                                                                                    |
| `DD_EXPVAR_PORT`                              | Modifie le port de récupération des variables publiques [expvar][6] à partir de l'Agent de cluster Datadog. Valeur par défaut : `5000`.                         |
| `DD_EXTERNAL_METRICS_BATCH_WINDOW`            | Délai d'attente en secondes pour traiter un lot de métriques provenant de plusieurs Autoscalers. Valeur par défaut : 10 secondes.                                                                        |
| `DD_EXTERNAL_METRICS_MAX_AGE`                 | Âge maximal en secondes d'un point de données avant qu'il soit considéré comme non valide et ne puisse pas être servi. Valeur par défaut : 90 secondes.                                                                      |
| `DD_EXTERNAL_METRICS_AGGREGATOR`              | Agrégateur des métriques Datadog. S'applique à tous les Autoscalers traités. Choisissez l'un des agrégateurs suivants : `sum`, `avg`, `max` ou `min`.                                                                |
| `DD_EXTERNAL_METRICS_BUCKET_SIZE`             | Durée de la plage en secondes utilisée pour interroger les métriques de Datadog. Valeur par défaut : 300 secondes.                                                                                      |
| `DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE` | Taux permettant de resynchroniser le cache local des métriques traitées avec le stockage global. Cette fonction est particulièrement utile lorsqu'il existe plusieurs réplicas de l'Agent de cluster.                                           |
| `DD_CLUSTER_CHECKS_ENABLED`                   | Active les checks de cluster avec Autodiscovery. Valeur par défaut : `false`. |
| `DD_EXTRA_CONFIG_PROVIDERS`                   | Fournisseurs de configuration Autodiscovery supplémentaires à utiliser. |
| `DD_EXTRA_LISTENERS`                          | Écouteurs Autodiscovery supplémentaires à exécuter. |
| `DD_CLUSTER_NAME`                             | Nom du cluster. Il est ajouté en tant que tag d'instance sur toutes les configurations de check de cluster. |
| `DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`          | Nom du tag d'instance défini avec l'option `DD_CLUSTER_NAME`. Valeur par défaut : `cluster_name`. |
| `DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`   | Période après laquelle les Agents basés sur des nœuds sont considérés comme défaillants et sont supprimés du pool. Valeur par défaut : 30 secondes. |
| `DD_CLUSTER_CHECKS_WARMUP_DURATION`           | Délai entre l'acquisition du leadership et le démarrage de la logique de check de cluster. Permet à tous les Agents basés sur des nœuds de s'enregistrer en premier. Valeur par défaut : 30 secondes. |


## Activation de fonctionnalités
### Collecte d'événements

Pour recueillir des événements, vous devez indiquer les variables d'environnement suivantes dans votre manifeste `datadog-agent.yaml` :

```
          - name: DD_COLLECT_KUBERNETES_EVENTS
            value: "true"
          - name: DD_LEADER_ELECTION
            value: "true"
```
L'activation de l'élection de leader garantit la collecte des événements par un seul Agent.

#### Fournisseur de métadonnées de cluster

Dans l'Agent de nœud, définissez la variable d'environnement `DD_CLUSTER_AGENT_ENABLED` sur true.

La variable d'environnement `DD_KUBERNETES_METADATA_TAG_UPDATE_FREQ` peut être définie afin de spécifier à quelle fréquence les Agents de nœud communiquent avec l'Agent du cluster Datadog.

Désactivez la collecte de tags de métadonnées Kubernetes avec `DD_KUBERNETES_COLLECT_METADATA_TAGS`.

#### Serveur de métriques custom

L'Agent de cluster Datadog implémente l'interface du fournisseur de métriques externes (actuellement en version bêta). Par conséquent, il peut fournir des métriques custom à Kubernetes pour les Autoscalers de pods horizontaux. Il est désigné tout au long de la documentation par le terme « serveur de métriques custom », conformément à la terminologie de Kubernetes (Custom Metrics Server).

Pour activer le serveur de métriques custom :

1. Définissez `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` sur `true` dans le déploiement de l'Agent de cluster Datadog.
2. Configurez la `<CLÉ_APP_DD>` ainsi que la `<CLÉ_API_DD>` dans le déploiement de l'Agent de cluster Datadog.
3. Créez un [service exposant le port 443][7] et [enregistrez-le en tant qu'APIService des métriques externes][8].

Consultez [le guide sur les serveurs de métriques custom[1] (en anglais) pour configurer le serveur de métriques custom et obtenir plus de renseignements sur son fonctionnement.

**Remarque** : un [Autoscaler de pods horizontaux][9] est requis pour acheminer des valeurs via le processus de métriques externes.

#### Checks de cluster avec Autodiscovery

Depuis la version 1.2.0, l'Agent de cluster Datadog peut améliorer le mécanisme Autodiscovery des ressources de cluster non conteneurisées. Pour activer cette fonction, effectuez les modifications suivantes sur le déploiement de l'Agent de cluster :

1. Définissez `DD_CLUSTER_CHECKS_ENABLED` sur `true`.
1. Transmettez le nom de votre cluster avec `DD_CLUSTER_NAME`. Il sera injecté sous forme d'un tag d'instance `cluster_name` dans toutes les configurations, afin que vous puissiez englober vos métriques.
1. La durée du bail d'élection de leader conseillée est de 15 secondes. Définissez-la avec la variable d'environnement `DD_LEADER_LEASE_DURATION`.
1. Si le nom du service n'est pas identique à la valeur par défaut `datadog-cluster-agent`, assurez-vous que la variable d'environnement `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` en tient compte.

Deux sources de configuration sont actuellement prises en charge. Elles sont [décrites dans la documentation relative à Autodiscovery][10] :

- Les fichiers yaml peuvent être montés à partir d'une ConfigMap dans le dossier `/conf.d`. Ils seront automatiquement importés par le point d'entrée de l'image.
- Pour annoter les services Kubernetes, vous devez définir les variables d'environnement `DD_EXTRA_CONFIG_PROVIDERS` et `DD_EXTRA_LISTENERS` sur `kube_services`.

Consultez [le guide dédié sur les checks de cluster avec Autodiscovery][11] pour obtenir plus d'informations sur la configuration et le dépannage de cette fonctionnalité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/CUSTOM_METRICS_SERVER.md
[2]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent/rbac
[3]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/dca-secret.yaml
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml
[6]: https://golang.org/pkg/expvar
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/cluster-agent-hpa-svc.yaml
[8]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/rbac-hpa.yaml
[9]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[10]: /fr/agent/autodiscovery/clusterchecks/#setting-up-check-configurations
[11]: /fr/agent/autodiscovery/clusterchecks