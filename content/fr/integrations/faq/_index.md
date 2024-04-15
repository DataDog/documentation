---
aliases:
- /fr/integrations/faq/how-can-i-gather-metrics-from-the-unix-shell
- /fr/integrations/faq/what-is-a-custom-metric-and-what-is-the-limit-on-the-number-of-custom-metrics-i-can-have
- /fr/integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors
- /fr/integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags
- /fr/integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
- /fr/integrations/faq/extra-hosts-with-name-n-a-reporting-data
- /fr/integrations/faq/redis-integration-error-unknown-command-config
- /fr/integrations/faq/snmp
cascade:
- private: true

title: FAQ sur les intégrations
---

## Amazon Web Services

* [Comment extraire mes tags EC2 sans utiliser l'intégration AWS ?][1]
* [Comment surveiller ma facture AWS ?][2]
* [Pourquoi mes données arrivent-elles en retard ?][3]
* [Configuration d'intégration pour ECS Fargate][4]

## Apache

* [Problèmes liés à l'intégration Apache][5]
* [Problèmes liés au certificat SSL Apache][6]

## Elasticsearch

* [Pourquoi Elasticsearch n'envoie-t-il pas toutes mes métriques ?][7]
* [Connexion de l'Agent impossible][8]

## Git et GitHub

* [Pourquoi les événements n'apparaissent-ils pas dans le flux d'événements avec l'intégration GitHub ?][9]

## HAProxy

* [HAProxy en mode multi-processus][10]

## Jira

* [J'ai configuré l'intégration JIRA. Comment récupérer les événements et les tickets créés ?][11]

## JMX

* [J'ai un bean correspondant pour mon intégration JMX, mais aucune donnée n'est collectée.][12]
* [Erreur jmx.yaml : section Include][13]
* [Dépannage des intégrations JMX][14]
* [Afficher les données JMX dans jConsole et configurer votre jmx.yaml pour les recueillir][15]
* [Mes intégrations JMX et AWS utilisent toutes les deux des tags "name". Comment régler le problème ?][16]
* [Surveillance de JBoss EAP 7 et Datadog via JMX][17]

## Kafka

* [Dépannage et analyse approfondie pour Kafka][18]

## Kubernetes

* [Authentification client auprès de l'apiserver et de kubelet][19]

## MySQL et SQL

* [Erreur de connexion à MySQL sur localhost – Localhost et 127.0.0.1][20]
* [Est-il possible d'utiliser une instance nommée au sein de l'intégration SQL Server ?][21]
* [L'utilisateur de la base de données n'a pas les droits d'accès nécessaires][22]

## Postgres

* [Comment recueillir des métriques custom avec Postgres][23]

## RabbitMQ

* [Taguer des files d'attente RabbitMQ par famille de tags][24]

## Unix

* [Comment récupérer des métriques depuis le shell UNIX ?][25]

## Vertica

* [Comment recueillir des métriques à partir de requêtes Vertica personnalisées][26]

## VMware Tanzu Application Service

* [Architecture VMware Tanzu Application Service][31]

## VSphere

* [Dépanner des hosts dupliqués avec vSphere][27]

## Webhooks

* [Comment créer une carte Trello à l'aide de Webhooks][28]

## Windows

* [Recueillir des compteurs de performances Windows personnalisés via WMI][29]
* [Check basé sur le statut Windows][30]

[1]: /fr/integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration/
[2]: /fr/integrations/faq/how-do-i-monitor-my-aws-billing-details/
[3]: /fr/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
[4]: /fr/integrations/faq/integration-setup-ecs-fargate/
[5]: /fr/integrations/faq/issues-with-apache-integration/
[6]: /fr/integrations/faq/apache-ssl-certificate-issues/
[7]: /fr/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[8]: /fr/integrations/faq/elastic-agent-can-t-connect/
[9]: /fr/integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration/
[10]: /fr/integrations/faq/haproxy-multi-process/
[11]: /fr/integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[12]: /fr/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[13]: /fr/integrations/faq/jmx-yaml-error-include-section/
[14]: /fr/integrations/faq/troubleshooting-jmx-integrations/
[15]: /fr/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[16]: /fr/integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[17]: /fr/integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx/
[18]: /fr/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[19]: /fr/integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[20]: /fr/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[21]: /fr/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[22]: /fr/integrations/faq/database-user-lacks-privileges/
[23]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
[24]: /fr/integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[25]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[26]: /fr/integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[27]: /fr/integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[28]: /fr/integrations/faq/how-to-make-trello-card-using-webhooks/
[29]: /fr/integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[30]: /fr/integrations/faq/windows-status-based-check/
[31]: /fr/integrations/faq/pivotal_architecture/
