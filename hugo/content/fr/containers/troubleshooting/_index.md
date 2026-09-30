---
description: Dépannage des problèmes liés aux conteneurs
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: Documentation
  text: Dupliquer des hosts avec Kubernetes sur AWS (EC2 ou EKS)
title: Dépannage des conteneurs
---

Cette page fournit des informations de dépannage pour la surveillance des conteneurs.


Il existe trois méthodes pour déployer l'Agent :
1. En tant que [**conteneur dans un runtime**][1]

2. Dans un **environnement cloud**, tel qu'[Amazon ECS][2], [Fargate dans un environnement Amazon ECS][3] ou [Amazon EKS][4]

3. Dans un [environnement Kubernetes][16]

Ces différentes méthodes présentent des défis de déploiement uniques. Utilisez cette page comme point de départ pour résoudre les problèmes. Si vous continuez à rencontrer des difficultés, contactez [l'assistance Datadog][6] pour obtenir de l'aide supplémentaire.

Pour plus de détails sur les mises à jour ou modifications des versions de l'Agent, consultez les [notes de version][7] de Datadog.

## Problèmes généraux

### Les variables d'environnement ne sont pas définies et les tags ne sont pas injectés

Une méthode utile pour injecter des [variables d'environnement][8] ou pour configurer une bibliothèque DogStatsD consiste à implémenter la fonctionnalité [contrôleur d'admission][9] sur l'Agent de cluster. **Remarque** : l'Agent de cluster doit être déployé et en cours d'exécution _avant_ le déploiement de l'application.

### Les métriques n'apparaissent pas sur la plateforme Web Datadog

Vérifiez que les éléments suivants sont vrais :

- L'endpoint de métriques est exposé et ouvert pour que l'Agent puisse l'atteindre.

- Il n'y a pas de proxys ou de pare-feu susceptibles d'empêcher l'Agent d'accéder à l'endpoint.

- L'Agent a [Autodiscovery][10] activé.


### Les logs ne sont pas collectés

Il existe deux [variables d'environnement][8] qui peuvent affecter la collecte des logs et depuis quels conteneurs :

- Définissez `DD_LOGS_ENABLED` sur `true` pour collecter les logs.
- De plus, définissez `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` sur `true` pour collecter tous les logs de tous les conteneurs.

Pour exclure les logs (et autres fonctionnalités) de la collecte, consultez le [guide de gestion de la découverte de conteneurs][11].

### Impossible de se connecter au Kubelet

L'erreur la plus courante qui empêche la connexion à l'API Kubelet est la vérification du certificat TLS Kubelet.

La vérification TLS est activée par défaut et peut empêcher l'Agent de se connecter à l'API Kubelet via HTTPS. Vous pouvez désactiver la vérification TLS en utilisant des paramètres dédiés ou en définissant la variable `DD_KUBELET_TLS_VERIFY` pour tous les conteneurs dans le manifeste de l'Agent :

 - Définissez `TLS_VERIFY` sur `false`.

### Les métriques HPA n'apparaissent pas ou ne correspondent pas à la valeur attendue

Tout d'abord, assurez-vous que l'Agent de cluster est déployé et capable d'envoyer des données à l'Agent de nœud.

Ensuite, examinez la requête utilisée pour mettre à l'échelle les métriques externes dans le récapitulatif des métriques. Seules les requêtes valides effectuent une mise à l'échelle automatique. S'il y a plusieurs requêtes, **toutes** les requêtes sont ignorées si **l'une** des requêtes est invalide.

Lorsque vous contactez l'assistance pour obtenir de l'aide supplémentaire concernant les métriques HPA, fournissez les éléments suivants à [l'assistance Datadog][6] :
  - Une sortie `describe` du manifeste HPA :
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - Une sortie `describe` de la Custom Resource Definition DatadogMetric :
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## Runtime

 Pour les logs, assurez-vous que la commande de déploiement de l'Agent a `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` et `DD_LOGS_ENABLED` activés.

## Cloud

Assurez-vous que votre stratégie IAM est mise à jour.

### Les logs ne sont pas collectés dans Fargate

  - [ECS][12] : assurez-vous que le routeur de logs est attaché au conteneur depuis lequel vous souhaitez collecter les logs.

  - [EKS][13] : il existe deux méthodes courantes pour que l'Agent collecte les logs dans un environnement EKS Fargate : le transfert de logs avec les logs CloudWatch et le transfert de logs via [Amazon Data Firehose][14]. L'utilisation d'Amazon Data Firehose pour collecter les logs nécessite l'implémentation réussie du flux de distribution Amazon Data Firehose, ainsi que certains outils de ligne de commande.


## Kubernetes

### Le conteneur ne se déploie pas ou ne collecte pas de métriques

Tout d'abord, assurez-vous que votre clé API est valide.

Ensuite, dans votre pod d'Agent de nœud, exécutez la commande `agent status` et examinez les résultats.

### Métriques `kubeapi_server`, `kube_controller_manager` ou `etcd` non reçues

Sur les services managés tels qu'Azure Kubernetes Service (AKS) et Google Kubernetes Engine (GKE), l'utilisateur ne peut pas accéder aux composants du control plane. Par conséquent, il n'est pas possible d'exécuter les checks `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` ou `etcd` dans ces environnements.

## ECS Fargate

### L'Agent Windows expire lors du démarrage du service

```text
[ENTRYPOINT][ERROR] Could not start the service: The service did not respond to the start or control request in a timely fashion.
. Error: [1053 (0x41d)]
```

Pour éviter cette erreur, assurez-vous d'avoir défini une réservation d'**unités CPU** d'au moins `512` pour l'Agent Datadog.

# Données de dépannage demandées par l'assistance Datadog

Après avoir ouvert un ticket d'assistance, il peut vous être demandé les types d'informations suivants :

### Agent Flare 

Vous pouvez utiliser la commande [`flare`][15] pour envoyer des informations de dépannage à l'assistance Datadog.

**Flare de l'Agent de nœud**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Flare de l'Agent de cluster**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```


### Sortie de describe Pod

Cela fournit à l'équipe un aperçu de la manière dont l'Agent de nœud ou l'Agent de cluster a été déployé, quels étaient les événements les plus récents pour le pod et si certaines qualités (telles que les tags custom) ont été injectées et appliquées aux métriques de host. La section `> <FILENAME>.yaml` de la commande crée une sortie de fichier qui peut être envoyée à l'assistance Datadog en tant que pièce jointe :

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### Manifeste/déploiement

Il s'agit du fichier utilisé pour déployer l'Agent dans votre environnement. Il informe Datadog des tags configurés, si les logs ont été activés et si certains conteneurs sont définis pour être ignorés.

Dans le cas du déploiement de l'Agent dans un environnement runtime, envoyez à l'assistance la ligne de commande utilisée pour déployer l'Agent.

Les trois méthodes de déploiement les plus courantes sont : chart Helm, DaemonSet et opérateur.

### Sortie cURL 

Si vous rencontrez des métriques manquantes ou inexactes, l'assistance Datadog peut demander le résultat d'une sortie cURL de l'Agent de nœud tentant d'atteindre l'endpoint de métriques. Cela se fait en exécutant la commande depuis l'intérieur du conteneur de l'Agent et peut informer l'assistance si l'Agent a accès aux métriques. **Remarque** : cela n'est pas possible dans Fargate ou les services managés :

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## Pour aller plus loin

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