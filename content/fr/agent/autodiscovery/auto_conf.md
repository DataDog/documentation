---
title: Configuration automatique
kind: documentation
disable_toc: true
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: Documentation
    text: Créer et charger un modèle d'intégration Autodiscovery
  - link: /agent/autodiscovery/management
    tag: Documentation
    text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
---
Lorsque l'Agent s'exécute en tant que conteneur, il tente de découvrir les autres conteneurs environnants à l'aide des fichiers de configuration Autodiscovery par défaut intitulés `auto_conf.yaml`. Ces fichiers se trouvent dans les dossiers `conf.d/<INTÉGRATION>.d/` des intégrations suivantes :

| Intégration            | Fichier de configuration automatique |
| ------                 | --------                |
| [Apache][1]            | [auto_conf.yaml][2]     |
| [Consul][3]            | [auto_conf.yaml][4]     |
| [Coredns][5]           | [auto_conf.yaml][6]     |
| [Couch][7]             | [auto_conf.yaml][8]     |
| [Couchbase][9]         | [auto_conf.yaml][10]    |
| [Elastic][11]          | [auto_conf.yaml][12]    |
| [Etcd][13]             | [auto_conf.yaml][14]    |
| [Harbor][15]           | [auto_conf.yaml][16]    |
| [Kube APIserver][17]   | [auto_conf.yaml][18]    |
| [KubeDNS][17]          | [auto_conf.yaml][19]    |
| [Kubernetes State][17] | [auto_conf.yaml][20]    |
| [Kyototycoon][21]      | [auto_conf.yaml][22]    |
| [MemCached][23]        | [auto_conf.yaml][24]    |
| [Presto][25]           | [auto_conf.yaml][26]    |
| [Redis][27]            | [auto_conf.yaml][28]    |
| [Riak][29]             | [auto_conf.yaml][30]    |
| [Tomcat][31]           | [auto_conf.yaml][32]    |

Les fichiers de configuration `auto_conf.yaml` couvrent tous les paramètres requis pour configurer une intégration spécifique, avec leurs [template variables Autodiscovery][33] correspondantes en place pour prendre en compte l'environnement conteneurisé.

**Remarque** : la logique de configuration automatique prend uniquement en charge la configuration par défaut de chacune des intégrations ci-dessus. Si vous souhaitez personnaliser la configuration de votre intégration Datadog, consultez la documentation Modèles d'intégration pour apprendre à configurer la fonctionnalité Autodiscovery de votre Agent :

* [Utiliser un fichier de configuration monté dans l'Agent][34]
* [Utiliser une base de données clé/valeur][35]
* [Utiliser les annotations Kubernetes][36]
* [Utiliser les étiquettes Docker][37]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/apache
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data
[3]: /fr/integrations/consul
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[5]: /fr/integrations/coredns
[6]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[7]: /fr/integrations/couch
[8]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[9]: /fr/integrations/couchbase
[10]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[11]: /fr/integrations/elastic
[12]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[13]: /fr/integrations/etcd
[14]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[15]: /fr/integrations/harbor
[16]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[17]: /fr/integrations/kubernetes
[18]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[20]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[21]: /fr/integrations/kyototycoon
[22]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[23]: /fr/integrations/mcache
[24]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[25]: /fr/integrations/presto
[26]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[27]: /fr/integrations/redisdb
[28]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[29]: /fr/integrations/riak
[30]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[31]: /fr/integrations/tomcat
[32]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[33]: /fr/agent/autodiscovery/template_variables
[34]: /fr/agent/autodiscovery/integrations/?tab=file#configuration
[35]: /fr/agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[36]: /fr/agent/autodiscovery/integrations/?tab=kubernetes#configuration
[37]: /fr/agent/autodiscovery/integrations/?tab=docker#configuration
