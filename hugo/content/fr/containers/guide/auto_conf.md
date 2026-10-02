---
algolia:
  tags:
  - auto conf
  - ignore auto conf
  - autoconf
  - ignore autoconf
aliases:
- /fr/agent/autodiscovery/auto_conf
- /fr/agent/faq/auto_conf
- /fr/agent/guide/auto_conf
description: Gérer la configuration automatique des services conteneurisés populaires
  à l'aide des modèles d'autoconfiguration Autodiscovery
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configurez les intégrations avec Autodiscovery sur Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configurez les intégrations avec Autodiscovery sur Docker
- link: /containers/guide/container-discovery-management/
  tag: Documentation
  text: Gestion de la découverte de conteneurs
title: Configuration automatique d'Autodiscovery
---
Lorsque l'Agent s'exécute en tant que conteneur, [Autodiscovery][44] tente de découvrir d'autres conteneurs en se basant sur des fichiers de configuration par défaut nommés `auto_conf.yaml`. Vous pouvez trouver ces fichiers dans les dossiers `conf.d/<INTEGRATION>.d/` correspondants pour les intégrations suivantes :

| Intégration                    | Fichier de configuration automatique |
| ------                         | --------                |
| [Apache][1]                    | [auto_conf.yaml][2]     |
| [Cilium][3]                    | [auto_conf.yaml][4]     |
| [Consul][5]                    | [auto_conf.yaml][6]     |
| [Coredns][7]                   | [auto_conf.yaml][8]     |
| [Couch][9]                     | [auto_conf.yaml][10]    |
| [Couchbase][11]                | [auto_conf.yaml][12]    |
| [Elastic][13]                  | [auto_conf.yaml][14]    |
| [Etcd][15]                     | [auto_conf.yaml][16]    |
| [DNS externe][17]             | [auto_conf.yaml][18]    |
| [Istio][19]                    | [auto_conf.yaml][20]    |
| [Serveur d'API Kube][21]           | [auto_conf.yaml][22]    |
| [Kube Controller Manager][23]  | [auto_conf.yaml][24]    |
| [KubeDNS][21]                  | [auto_conf.yaml][25]    |
| [Planificateur Kube][26]           | [auto_conf.yaml][27]    |
| [État de Kubernetes][21]         | [auto_conf.yaml][28]    |
| [Kyototycoon][29]              | [auto_conf.yaml][30]    |
| [MemCached][31]                | [auto_conf.yaml][32]    |
| [Presto][33]                   | [auto_conf.yaml][34]    |
| [RabbitMQ][42]                 | [auto_conf.yaml][43]    |
| [Redis][35]                    | [auto_conf.yaml][36]    |
| [Riak][37]                     | [auto_conf.yaml][38]    |
| [Tomcat][39]                   | [auto_conf.yaml][40]    |

Les `auto_conf.yaml` fichiers de configuration couvrent tous les paramètres requis pour configurer une intégration spécifique, avec leurs [variables de modèles Autodiscovery][41] correspondantes en place pour prendre en compte l'environnement conteneurisé.

## Remplacer l'auto-configuration {#override-auto-configuration}
Chaque `auto_conf.yaml` fichier fournit une configuration par défaut. Pour remplacer cela sur Kubernetes, vous pouvez ajouter une configuration personnalisée dans les [annotations Kubernetes][45] ou utiliser la [`DatadogInstrumentation` ressource personnalisée][47]. Pour Docker, utilisez les [étiquettes Docker][46].

Les annotations Kubernetes prévalent sur les ressources `DatadogInstrumentation` et les fichiers `auto_conf.yaml`. Les ressources `DatadogInstrumentation` prévalent sur les fichiers `auto_conf.yaml`, et les fichiers `auto_conf.yaml` prévalent sur la configuration Autodiscovery définie dans Datadog Operator et les Helm charts. Pour utiliser Datadog Operator ou Helm afin de configurer Autodiscovery pour une intégration dans le tableau de cette page, vous devez [désactiver l'auto-configuration](#disable-auto-configuration).

## Désactiver l'auto-configuration {#disable-auto-configuration}

Les exemples suivants désactivent l'auto-configuration pour les intégrations Redis et Istio.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Dans votre `datadog-agent.yaml`, utilisez `override.nodeAgent.containers.agent.env` pour définir la variable d'environnement `DD_IGNORE_AUTOCONF` dans le conteneur `agent`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  override:
    nodeAgent:
      containers: 
        agent:
          env:
            - name: DD_IGNORE_AUTOCONF
              value: "redisdb istio"
```

Ensuite, appliquez la nouvelle configuration.

{{% /tab %}}
{{% tab "Helm" %}}

Ajoutez `datadog.ignoreAutoconfig` à votre `datadog-values.yaml` :

```yaml
datadog:
  #List of integration(s) to ignore auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}
Pour désactiver l'intégration de la configuration automatique avec votre agent conteneurisé (DaemonSet manuel, Docker, ECS), ajoutez la variable d'environnement `DD_IGNORE_AUTOCONF` :

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/apache/
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data/auto_conf.yaml
[3]: /fr/integrations/cilium
[4]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/auto_conf.yaml
[5]: /fr/integrations/consul/
[6]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[7]: /fr/integrations/coredns/
[8]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[9]: /fr/integrations/couch/
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: /fr/integrations/couchbase/
[12]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[13]: /fr/integrations/elastic/
[14]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[15]: /fr/integrations/etcd/
[16]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[17]: /fr/integrations/external_dns
[18]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/auto_conf.yaml
[19]: /fr/integrations/istio
[20]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[21]: /fr/agent/kubernetes/
[22]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[23]: /fr/integrations/kube_controller_manager
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[26]: /fr/integrations/kube_scheduler
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[28]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[29]: /fr/integrations/kyototycoon/
[30]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[31]: /fr/integrations/mcache/
[32]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[33]: /fr/integrations/presto/
[34]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[35]: /fr/integrations/redisdb/
[36]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[37]: /fr/integrations/riak/
[38]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[39]: /fr/integrations/tomcat/
[40]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[41]: /fr/agent/guide/template_variables/
[42]: /fr/integrations/rabbitmq/
[43]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[44]: /fr/getting_started/containers/autodiscovery
[45]: /fr/containers/kubernetes/integrations/?tab=annotations#configuration
[46]: /fr/containers/docker/integrations/
[47]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/