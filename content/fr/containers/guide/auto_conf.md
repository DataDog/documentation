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
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Créer et charger un modèle d'intégration Autodiscovery
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
title: Configuration automatique d'Autodiscovery
---

Lorsque l'Agent s'exécute en tant que conteneur, il tente de découvrir les autres conteneurs environnants à l'aide des fichiers de configuration Autodiscovery par défaut intitulés `auto_conf.yaml`. Ces fichiers se trouvent dans les dossiers `conf.d/<INTÉGRATION>.d/` des intégrations suivantes :

## Fichiers de configuration automatique

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

## Configuration personanalisée
La logique de configuration automatique prend uniquement en charge la configuration par défaut de chacune des intégrations ci-dessus. Si vous souhaitez personnaliser la configuration de votre intégration Datadog, consultez la section Modèles d'intégration pour découvrir comment configurer la fonctionnalité Autodiscovery de votre Agent. Toute configuration découverte par l'intermédiaire des annotations Kubernetes ou des étiquettes Docker d'un conteneur donné est prioritaire sur le fichier `auto_conf.yaml`.

* [Utiliser le stockage key/value][44]
* [Utiliser les annotations Kubernetes][45]
* [Utiliser les étiquettes Docker][46]

## Désactiver la configuration automatique

Pour empêcher lʼAgent d'utiliser la configuration `auto_conf.yaml`, vous pouvez ajouter lʼenvironnement de variable `DD_IGNORE_AUTOCONF` pour la ou les intégrations à désactiver. Dans les exemples suivants, lʼAgent ignorerait les fichiers [`redisdb.d/auto_conf.yaml`][38] et [`istio.d/auto_conf.yaml`][22] et éviterait de configurer automatiquement ces intégrations.

{{< tabs >}}
{{% tab "Helm" %}}

Pour désactiver lʼintégration de configurations automatiques avec Helm, ajoutez `datadog.ignoreAutoconfig` à votre fichier `values.yaml` :

```yaml
datadog:
 #Liste des intégrations à ignorer auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "DaemonSet" %}}
Pour désactiver lʼintégration de configurations automatiques avec votre DaemonSet, ajoutez la variable `DD_IGNORE_AUTOCONF` à votre manifeste de lʼAgent :

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