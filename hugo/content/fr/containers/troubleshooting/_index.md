---
description: Dépannage des problèmes liés aux conteneurs
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: Documentation
  text: Hosts en double avec Kubernetes sur AWS (EC2 ou EKS)
title: Dépannage des conteneurs
---
Cette page fournit des informations de dépannage pour la surveillance des conteneurs.


Il existe trois méthodes pour déployer l'Agent :
1. En tant que [**conteneur dans un runtime**][1] 

2. Dans un **environnement cloud**, tel qu'[Amazon ECS][2], [Fargate dans un environnement Amazon ECS][3] ou [Amazon EKS][4]

3. Dans un [environnement Kubernetes][16]

Ces différentes méthodes présentent des défis de déploiement uniques. Utilisez cette page comme point de départ pour résoudre les problèmes. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][6] pour obtenir de l'aide. 

Pour plus de détails sur les mises à jour ou les modifications des versions de l'Agent, consultez les [notes de version][7] de Datadog.

## Problèmes généraux {#general-issues}

### Les variables d'environnement ne sont pas définies et les tags ne sont pas injectés {#environment-variables-are-not-being-set-and-tags-are-not-injected}

Un moyen utile d'injecter des [variables d'environnement][8] ou de configurer une bibliothèque DogStatsD consiste à implémenter la fonctionnalité [Admission Controller][9] sur le Cluster Agent. **Remarque** : le Cluster Agent doit être déployé et en cours d'exécution _avant_ que l'application ne soit déployée.

### Les métriques n'apparaissent pas sur la plateforme Web Datadog {#metrics-are-not-appearing-on-the-datadog-web-platform}

Vérifiez que les conditions suivantes sont remplies :

- L'endpoint des métriques est exposé et accessible à l'Agent.

- Aucun proxy ni pare-feu ne risque d'empêcher l'Agent d'accéder à l'endpoint. 

- [Autodiscovery][10] est activé sur l'Agent.


### Les journaux ne sont pas collectés {#logs-are-not-collected}

Il existe deux [variables d'environnement][8] qui peuvent influer sur la collecte des journaux et sur les conteneurs à partir desquels ils sont collectés :

- Définissez `DD_LOGS_ENABLED` sur `true` pour collecter les journaux. 
- De plus, définissez `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` sur `true` pour collecter tous les journaux de tous les conteneurs.

Pour exclure des journaux (et d'autres fonctionnalités) de la collecte, consultez le [guide de gestion de la découverte de conteneurs][11].

### Impossible de se connecter au Kubelet {#cannot-connect-to-the-kubelet}

L'erreur la plus courante qui empêche la connexion à l'API Kubelet est la vérification du certificat TLS du Kubelet.

La vérification TLS est activée par défaut et peut empêcher l'Agent de se connecter à l'API Kubelet via HTTPS. Vous pouvez désactiver la vérification TLS en utilisant des paramètres dédiés ou en définissant la variable `DD_KUBELET_TLS_VERIFY` pour tous les conteneurs dans le manifeste de l'Agent :

 - Définissez `TLS_VERIFY` sur `false`.

### Les métriques HPA n'apparaissent pas ou ne correspondent pas à la valeur attendue {#hpa-metrics-are-not-appearing-or-are-not-aligning-with-the-expected-value}

Tout d'abord, assurez-vous que le Cluster Agent est déployé et capable d'envoyer des données à l'Agent de nœud.

Ensuite, examinez la requête utilisée pour mettre à l'échelle les métriques externes dans Metrics Catalog. Seules les requêtes valides permettent la mise à l'échelle automatique. S'il y a plusieurs requêtes, **toutes** les requêtes sont ignorées si **l'une** d'entre elles est invalide.

Lorsque vous demandez une assistance supplémentaire pour les métriques HPA, fournissez les éléments suivants au [support Datadog][6] :
  - La sortie `describe` du manifeste HPA :
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - La sortie `describe` de la définition de ressource personnalisée DatadogMetric :
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## Runtime {#runtime}

 Pour les journaux, assurez-vous que `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` et `DD_LOGS_ENABLED` sont activés dans la commande de déploiement de l'Agent.

## Cloud {#cloud}

Assurez-vous que votre politique IAM est mise à jour.

### Les journaux ne sont pas collectés dans Fargate {#logs-are-not-collected-in-fargate}

  - [ECS][12] : Assurez-vous que le routeur de journaux est associé au conteneur dont vous souhaitez collecter les journaux.

  - [EKS][13] : Il existe deux méthodes courantes pour que l'Agent collecte des journaux dans un environnement EKS Fargate : le transfert des journaux via CloudWatch et le transfert des journaux via [Amazon Data Firehose][14]. L'utilisation d'Amazon Data Firehose pour collecter des journaux nécessite la mise en œuvre réussie du flux de diffusion Amazon Data Firehose, ainsi que certains outils de ligne de commande. 
 

## Kubernetes {#kubernetes}

### Le conteneur ne se déploie pas ou ne collecte pas de métriques {#container-not-deploying-or-collecting-metrics}

Tout d'abord, assurez-vous que votre clé d'API est valide.

Ensuite, dans votre pod d'Agent de nœud, exécutez la commande `agent status` et examinez les résultats.

### Vous ne recevez pas de métriques `kubeapi_server`, `kube_controller_manager` ou `etcd` {#not-getting-kubeapi-server-kube-controller-manager-or-etcd-metrics}

Sur les services gérés tels qu'Azure Kubernetes Service (AKS) et Google Kubernetes Engine (GKE), l'utilisateur ne peut pas accéder aux composants du plan de contrôle. Par conséquent, il n'est pas possible d'exécuter les vérifications `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` ou `etcd` dans ces environnements.

## ECS Fargate {#ecs-fargate}

### Délai d'attente dépassé pour l'Agent Windows lors du démarrage du service {#windows-agent-times-out-while-starting-service}

```text
[ENTRYPOINT][ERROR] Could not start the service: The service did not respond to the start or control request in a timely fashion.
. Error: [1053 (0x41d)]
```

Pour éviter cette erreur, assurez-vous d'avoir défini une réservation de **unités CPU** d'au moins `512` pour le Datadog Agent.

# Données de dépannage demandées par le support Datadog {#troubleshooting-data-requested-by-datadog-support}

Après avoir ouvert un ticket de support, il se peut que l'on vous demande les types d'informations suivants :

### Agent Flare {#agent-flare}

Vous pouvez utiliser la commande [`flare`][15] pour envoyer des informations de dépannage au support Datadog.

**Flare de l'Agent de nœud**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Flare de l'Agent de cluster**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```
 

### Sortie de Describe Pod {#describe-pod-output}

Cela fournit à l'équipe des informations sur la manière dont l'Agent de nœud ou de cluster a été déployé, quels ont été les événements les plus récents pour le pod, et si certaines propriétés (telles que des tags personnalisés) ont été injectées et appliquées aux métriques du host. La section `> <FILENAME>.yaml` de la commande crée un fichier de sortie qui peut être envoyé au support Datadog en tant que pièce jointe : 

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### Manifeste/déploiement {#manifestdeployment}

Il s'agit du fichier utilisé pour déployer l'Agent dans votre environnement. Il indique à Datadog les tags configurés, si la collecte des journaux a été activée et si certains conteneurs sont configurés pour être ignorés. 

Dans le cas d'un déploiement de l'Agent dans un environnement d'exécution, envoyez au support la ligne de commande utilisée pour déployer l'Agent.

Les trois méthodes de déploiement les plus courantes sont : Helm chart, DaemonSet et Operator.

### Sortie cURL {#curl-output}

Si vous constatez que des métriques sont manquantes ou inexactes, le support Datadog peut vous demander la sortie de la commande cURL exécutée par l'Agent de nœud pour tenter d'atteindre l'endpoint des métriques. L'exécution de la commande depuis le conteneur de l'Agent permet au support Datadog de déterminer si l'Agent a accès aux métriques. **Remarque** : Cela n'est pas possible dans un environnement Fargate ou dans des services gérés : 

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/containers/docker/?tab=standard
[2]: https://docs.datadoghq.com/fr/containers/amazon_ecs/?tab=awscli
[3]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/?tab=webui#
[4]: https://docs.datadoghq.com/fr/integrations/eks_fargate
[5]: https://docs.datadoghq.com/fr/containers/kubernetes/
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://app.datadoghq.com/release-notes
[8]: https://docs.datadoghq.com/fr/agent/guide/environment-variables/#overview
[9]: https://docs.datadoghq.com/fr/containers/cluster_agent/admission_controller/?tab=operator
[10]: https://docs.datadoghq.com/fr/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[11]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-management/?tab=containerizedagent
[12]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/?tab=webui#log-collection
[13]: https://docs.datadoghq.com/fr/integrations/eks_fargate/#log-collection
[14]: https://docs.datadoghq.com/fr/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/#overview
[15]: https://docs.datadoghq.com/fr/agent/troubleshooting/send_a_flare
[16]: https://docs.datadoghq.com/fr/containers/kubernetes/installation/?tab=operator