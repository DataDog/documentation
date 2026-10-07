---
aliases:
- /fr/agent/cluster_agent/commands
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique
    Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentation
  text: Exécuter des checks de cluster avec Autodiscovery
- link: /agent/kubernetes/daemonset_setup/
  tag: Documentation
  text: Exécuter l'Agent avec un DaemonSet Kubernetes
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépanner l'Agent de cluster Datadog
title: Commandes et options de l'Agent de cluster
---

## Commandes de l'Agent de cluster

Voici les commandes disponibles pour les Agents de cluster de Datadog :

`datadog-cluster-agent status`              
: Visualiser les composants de l'Agent et leur santé.

`datadog-cluster-agent metamap <NOM_NŒUD>` 
: Interroge le cache local du mappage entre les pods qui se trouvent sur `NOM_NŒUD` et les métadonnées de cluster auxquelles ils sont associés, comme les endpoints. Le mappeur s'exécute sur tous les nœuds du cluster si `NOM_NŒUD` n'est pas spécifié.

`datadog-cluster-agent flare <CASE_ID>`     
: Tout comme l'Agent de nœud, l'Agent de cluster peut agréger les logs et les configurations utilisés et transmettre une archive à l'équipe d'assistance. Ils peuvent également être condensés et utilisés localement. **Remarque :** cette commande est exécutée depuis le pod de l'Agent de cluster.

## Variables dʼenvironnement de lʼAgent de cluster

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Définir les variables dʼenvironnement de lʼAgent de cluster sous `override.clusterAgent.env` :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
Définir les variables dʼenvironnement de lʼAgent de cluster sous `clusterAgent.env`:
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
clusterAgent:
  env:
    - name: <ENV_VAR_NAME>
      value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Les variables d'environnement suivantes sont prises en charge :

`DD_API_KEY`                                  
: Votre [clé d'API Datadog][1].

`DD_CLUSTER_CHECKS_ENABLED`                   
: Active les checks de cluster avec Autodiscovery. Valeur par défaut : `false`.

`DD_CLUSTER_AGENT_AUTH_TOKEN`                 
: Token de 32 caractères qui doit être partagé entre l'Agent de nœud et l'Agent de cluster Datadog.

`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`    
: Nom du service Kubernetes via lequel les Agents de cluster sont exposés. Valeur par défaut : `datadog-cluster-agent`.

`DD_CLUSTER_NAME`                             
: Nom du cluster. Il est ajouté en tant que tag d'instance sur toutes les configurations de check de cluster.

`DD_CLUSTER_CHECKS_ENABLED`
: Lorsque la valeur est true, active la logique de distribution sur lʼAgent de cluster leader. Valeur par défaut : `false`.

`DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`   
: Période (en secondes) après laquelle les Agents de nœud sont considérés comme défaillants et sont supprimés du pool. Valeur par défaut : `30` secondes.

`DD_CLUSTER_CHECKS_WARMUP_DURATION`           
: Délai (en secondes) entre l'acquisition du leadership et le démarrage de la logique de check de cluster. Permet à tous les Agents basés de nœud de s'enregistrer en premier. Valeur par défaut : `30` secondes.

`DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`          
: 65%match
Nom du tag d'instance défini avec l'option `DD_CLUSTER_NAME`. Valeur par défaut : `cluster_name`.

`DD_CLUSTER_CHECKS_EXTRA_TAGS`                
: Ajoute des tags supplémentaires aux métriques de checks de cluster.

`DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED`
: Lorsque la valeur est true, lʼAgent de cluster leader recueille les statistiques des exécuteurs de checks au niveau du cluster afin d'optimiser la logique de répartition des checks. Valeur par défaut : `false`.

`DD_CLUSTER_CHECKS_CLC_RUNNERS_PORT`
: Le port utilisé par le client de lʼAgent de cluster pour atteindre les exécuteurs de checks au niveau du cluster et collecter leurs statistiques. Valeur par défaut : `5005`.

`DD_HOSTNAME`                                 
: Hostname à utiliser pour l'Agent de cluster Datadog.

`DD_ENV`                                      
: Permet de définir le tag `env` pour les données émises par l'Agent de cluster. Uniquement recommandé lorsque l'Agent de cluster surveille des services dans un seul environnement.

`DD_USE_METADATA_MAPPER`                      
: Active le mappage des métadonnées de cluster. Valeur par défaut : `true`.

`DD_COLLECT_KUBERNETES_EVENTS`                
: Configure l'Agent afin de recueillir les événements Kubernetes. Valeur par défaut : `false`.

`DD_LEADER_ELECTION`                          
: Active l'élection de leader. Définissez `DD_COLLECT_KUBERNETES_EVENTS` sur `true` pour activer cette fonction. Valeur par défaut : `false`.

`DD_LEADER_LEASE_DURATION`                    
: Utilisé seulement si l'élection de leader est activée. Valeur par défaut : 60 secondes.

`DD_KUBE_RESOURCES_NAMESPACE`                 
: Configure l'espace de nommage où l'Agent de cluster crée les ConfigMaps nécessaires pour l'élection de leader, la collecte d'événements (facultative) et l'autoscaling des pods horizontaux.

`DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`       
: Fréquence (en secondes) des interrogations du serveur d'API afin de resynchroniser le cache local. La valeur par défaut est de 5 minutes, soit `300` secondes.

`DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`  
: Délai d'expiration (en secondes) de la communication du client avec le serveur d'API. Valeur par défaut : 60 secondes.

`DD_METRICS_PORT`                   
: Port devant être utilisé pour exposer les métriques de l'Agent de cluster Datadog. Valeur par défaut : `5000`.

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

`DD_EXTRA_CONFIG_PROVIDERS`                   
: Fournisseurs de configuration Autodiscovery supplémentaires à utiliser.

`DD_EXTRA_LISTENERS`                          
: Écouteurs Autodiscovery supplémentaires à exécuter.

`DD_PROXY_HTTPS`                
: Définit un serveur proxy pour les requêtes HTTPS.

`DD_PROXY_HTTP`                
: Définit un serveur proxy pour les requêtes HTTP.

`DD_PROXY_NO_PROXY`                
: Définit une liste de hosts qui doivent ignorer le proxy. La liste est séparée par des espaces.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
: Configure la demande et la limite de CPU pour les conteneurs init.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`
: Configure la demande en mémoire et la limite de CPU pour les conteneurs init.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://golang.org/pkg/expvar