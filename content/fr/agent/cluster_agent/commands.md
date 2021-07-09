---
title: Commandes et options de l'Agent de cluster
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: Blog
    text: Présentation de l'Agent de cluster Datadog
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: Blog
    text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique Datadog
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: /agent/kubernetes/daemonset_setup/
    tag: Documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: /agent/cluster_agent/troubleshooting/
    tag: Documentation
    text: Dépanner l'Agent de cluster Datadog
---
## Commandes de l'Agent de cluster

Voici les commandes disponibles pour les Agents de cluster de Datadog :

`datadog-cluster-agent status`              
: Visualiser les composants de l'Agent et leur santé.

`datadog-cluster-agent metamap <NOM_NŒUD>` 
: Interroge le cache local du mappage entre les pods qui se trouvent sur `NOM_NŒUD` et les métadonnées de cluster auxquelles il est associé (endpoints, etc.). Le mappeur s'exécute sur tous les nœuds du cluster si `NOM_NŒUD` n'est pas spécifié.

`datadog-cluster-agent flare <CASE_ID>`     
: Tout comme l'Agent de nœud, l'Agent de cluster peut agréger les logs et les configurations utilisés et transmettre une archive à l'équipe d'assistance. Ils peuvent également être condensés et utilisés localement. **Remarque :** cette commande est exécutée depuis le pod de l'Agent de cluster.

## Options de l'Agent de cluster

Les variables d'environnement suivantes sont prises en charge :

`DD_API_KEY`                                  
: Votre [clé d'API Datadog][1].

`DD_HOSTNAME`                                 
: Hostname à utiliser pour l'Agent de cluster Datadog.

`DD_ENV`                                      
: Permet de définir le tag `env` pour les données émises par l'Agent de cluster. Uniquement recommandé lorsque l'Agent de cluster surveille des services dans un seul environnement.

`DD_CLUSTER_AGENT_CMD_PORT`                   
: Port devant être utilisé par l'Agent de cluster Datadog. Valeur par défaut : `5005`.

`DD_USE_METADATA_MAPPER`                      
: Active le mappage des métadonnées de cluster. Valeur par défaut : `true`.

`DD_COLLECT_KUBERNETES_EVENTS`                
: Configure l'Agent afin de recueillir les événements Kubernetes. Valeur par défaut : `false`. Consultez la documentation relative à la [Collecte d'événements][2] pour en savoir plus.

`DD_LEADER_ELECTION`                          
: Active l'élection de leader. Définissez `DD_COLLECT_KUBERNETES_EVENTS` sur `true` pour activer cette fonction. Valeur par défaut : `false`.

`DD_LEADER_LEASE_DURATION`                    
: Utilisé seulement si l'élection de leader est activée. Pour en savoir plus, consultez la [la section relative à l'élection de leader][3]. Valeur par défaut : 60 secondes.

`DD_CLUSTER_AGENT_AUTH_TOKEN`                 
: Token de 32 caractères qui doit être partagé entre l'Agent de nœud et l'Agent de cluster Datadog.

`DD_KUBE_RESOURCES_NAMESPACE`                 
: Configure l'espace de nommage où l'Agent de cluster crée les ConfigMaps nécessaires pour l'élection de leader, la collecte d'événements (facultative) et l'autoscaling des pods horizontaux.

`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`    
: Nom du service Kubernetes via lequel les Agents de cluster sont exposés. Valeur par défaut : `datadog-cluster-agent`.

`DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`       
: Fréquence (en secondes) des interrogations du serveur d'API afin de resynchroniser le cache local. La valeur par défaut est de 5 minutes, soit `300` secondes.

`DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`  
: Délai d'expiration (en secondes) de la communication du client avec le serveur d'API. Valeur par défaut : 60 secondes.

`DD_EXPVAR_PORT`                              
: Port à utiliser pour la récupération des variables publiques [expvar][3] à partir de l'Agent de cluster Datadog. Valeur par défaut : `5000`.

`DD_EXTERNAL_METRICS_PROVIDER_BATCH_WINDOW`   
: Délai d'attente (en secondes) pour traiter un lot de métriques provenant de plusieurs Autoscalers. Valeur par défaut : `10` secondes.

`DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE`        
: Âge maximal (en secondes) d'un point de données avant qu'il soit considéré comme non valide et ne puisse pas être traité. Valeur par défaut : `120` secondes.

`DD_EXTERNAL_METRICS_AGGREGATOR`     
: Agrégateur des métriques Datadog. S'applique à tous les Autoscalers traités. Choisissez l'un des agrégateurs suivants : `sum`, `avg`, `max` ou `min`.

`DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE`    
: Durée de la plage (en secondes) utilisée pour interroger les métriques de Datadog. Valeur par défaut : `300` secondes.

`DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE` 
: Fréquence de resynchronisation du cache local des métriques traitées avec le stockage global. Utile lorsqu'il existe plusieurs réplicas de l'Agent de cluster.

`DD_CLUSTER_CHECKS_ENABLED`                   
: Active les checks de cluster avec Autodiscovery. Valeur par défaut : `false`.

`DD_EXTRA_CONFIG_PROVIDERS`                   
: Fournisseurs de configuration Autodiscovery supplémentaires à utiliser.

`DD_EXTRA_LISTENERS`                          
: Écouteurs Autodiscovery supplémentaires à exécuter.

`DD_CLUSTER_NAME`                             
: Nom du cluster. Il est ajouté en tant que tag d'instance sur toutes les configurations de check de cluster.

`DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`          
: 65%match
Nom du tag d'instance défini avec l'option `DD_CLUSTER_NAME`. Valeur par défaut : `cluster_name`.

`DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`   
: Période (en secondes) après laquelle les Agents de nœud sont considérés comme défaillants et sont supprimés du pool. Valeur par défaut : `30` secondes.

`DD_CLUSTER_CHECKS_WARMUP_DURATION`           
: Délai (en secondes) entre l'acquisition du leadership et le démarrage de la logique de check de cluster. Permet à tous les Agents basés de nœud de s'enregistrer en premier. Valeur par défaut : `30` secondes.

`DD_CLUSTER_CHECKS_EXTRA_TAGS`                
: Ajoute des tags supplémentaires aux métriques de checks de cluster.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#api
[2]: /fr/agent/cluster_agent/event_collection/
[3]: https://golang.org/pkg/expvar