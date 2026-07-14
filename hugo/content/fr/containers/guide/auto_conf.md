---
algolia:
  tags:
  - configuration automatique
  - ignorer la configuration automatique
  - configuration automatique
  - ignorer la configuration automatique
aliases:
- /fr/agent/autodiscovery/auto_conf
- /fr/agent/faq/auto_conf
- /fr/agent/guide/auto_conf
description: Gérer la configuration automatique pour les services conteneurisés populaires
  à l'aide de modèles de configuration automatique Autodiscovery
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configurer des intégrations avec Autodiscovery sur Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configurer des intégrations avec Autodiscovery sur Docker
- link: /containers/guide/container-discovery-management/
  tag: Documentation
  text: Gestion de la découverte de conteneurs
title: Configuration automatique d'Autodiscovery
---

Lorsque l'Agent s'exécute en tant que conteneur, [Autodiscovery][49] tente de découvrir d'autres conteneurs en fonction de fichiers de configuration par défaut nommés `auto_conf.yaml`. Vous pouvez trouver ces fichiers dans les dossiers `conf.d/<INTEGRATION>.d/` correspondants pour les intégrations suivantes :

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
| [External DNS][17]             | [auto_conf.yaml][18]    |
| [Harbor][19]                   | [auto_conf.yaml][20]    |
| [Istio][21]                    | [auto_conf.yaml][22]    |
| [Kube APIserver][23]           | [auto_conf.yaml][24]    |
| [Kube Controller Manager][25]  | [auto_conf.yaml][26]    |
| [KubeDNS][23]                  | [auto_conf.yaml][27]    |
| [Kube Scheduler][28]           | [auto_conf.yaml][29]    |
| [Kubernetes State][23]         | [auto_conf.yaml][30]    |
| [Kyoto Tycoon][31]              | [auto_conf.yaml][32]    |
| [Memcache][33]                | [auto_conf.yaml][34]    |
| [Presto][35]                   | [auto_conf.yaml][36]    |
| [RabbitMQ][47]                 | [auto_conf.yaml][48]    |
| [Redis][37]                    | [auto_conf.yaml][38]    |
| [Riak][39]                     | [auto_conf.yaml][40]    |
| [Tomcat][41]                   | [auto_conf.yaml][42]    |

Les fichiers de configuration `auto_conf.yaml` rassemblent tous les paramètres requis pour configurer une intégration spécifique. Les [template variables Autodiscovery][43] correspondantes qui sont fournies prennent en compte l'environnement conteneurisé.

## Remplacer la configuration automatique
Chaque fichier `auto_conf.yaml` fournit une configuration par défaut. Pour la remplacer, vous pouvez ajouter une configuration personnalisée dans les [annotations Kubernetes][50] ou les [étiquettes Docker][51].

Les annotations Kubernetes et les étiquettes Docker ont la priorité sur les fichiers `auto_conf.yaml`, mais les fichiers `auto_conf.yaml` ont la priorité sur la configuration Autodiscovery définie dans le Datadog Operator et les charts Helm. Pour utiliser le Datadog Operator ou Helm afin de configurer Autodiscovery pour une intégration du tableau de cette page, vous devez [désactiver la configuration automatique](#desactiver-la-configuration-automatique).

## Désactiver la configuration automatique

Les exemples suivants désactivent la configuration automatique pour les intégrations Redis et Istio.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

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
Pour désactiver la configuration automatique d'intégration(s) avec votre Agent conteneurisé (DaemonSet manuel, Docker, ECS), ajoutez la variable d'environnement `DD_IGNORE_AUTOCONF` :

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

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
[19]: /fr/integrations/harbor/
[20]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[21]: /fr/integrations/istio
[22]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[23]: /fr/agent/kubernetes/
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[25]: /fr/integrations/kube_controller_manager
[26]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[28]: /fr/integrations/kube_scheduler
[29]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[30]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[31]: /fr/integrations/kyototycoon/
[32]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[33]: /fr/integrations/mcache/
[34]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[35]: /fr/integrations/presto/
[36]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[37]: /fr/integrations/redisdb/
[38]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[39]: /fr/integrations/riak/
[40]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[41]: /fr/integrations/tomcat/
[42]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[43]: /fr/agent/guide/template_variables/
[44]: /fr/agent/kubernetes/integrations/?tab=keyvaluestore#configuration
[45]: /fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[46]: /fr/agent/docker/integrations/#configuration
[47]: /fr/integrations/rabbitmq/
[48]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[49]: /fr/getting_started/containers/autodiscovery
[50]: /fr/containers/kubernetes/integrations/?tab=annotations#configuration
[51]: /fr/containers/docker/integrations/