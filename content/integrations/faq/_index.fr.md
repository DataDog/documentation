---
title: Intégrations FAQ
kind: faq
---

## Général

* [Quelles intégrations standard émettent des métriques custom?][1]

* [Les check de service sont déconseillés en faveur des monitors][2]
* [Problèmes de fonctionnement des intégrations][3]

## Amazon Web Services

* [Révocation des clés AWS et activation de la délégation de rôles pour l'intégration AWS Datadog.][4]
* [Comment puis-je monitorer la santé / le statut de mes instances RDS?][5]
* [Utilisation de l'intégration AWS Billing de Datadog pour surveiller votre utilisation de CloudWatch][6]
* [FAQ intégration AWS et CloudWatch][7]
* [Pourquoi ne vois-je que les valeurs moyennes de mes métriques custom AWS / Cloudwatch ?][8]
* [Où sont mes métriques de latence ELB?][9]
* [J'ai supprimé mon intégration AWS EC2. Pourquoi mes hôtes ont-ils toujours des tags AWS?][10]
* [Est-ce que Datadog prend en charge AWS ALB (Application Load Balancer)?][11]
* [Obtenez vos événements et métriques de groupes AutoScaling][12]
* [Comment puis-je récupérer mes tags EC2 sans utiliser l'intégration AWS?][13]
* [Métriques AWS additionnelles -  Min/Max/Sum][14]
* [Comment puis-je surveiller mes informations de facturation AWS?][15]
* [Hôtes supplémentaires avec le nom "N/A" envoyant des données.][16]
* [Mauvais compte de aws.elb.healthy_host_count?][17]
* [Pourquoi ma métrique de nombre d'erreurs AWS compte-t-elle des ordres de grandeur inférieurs à ceux de Cloudwatch dans Datadog?][18]
* [Mes statistiques AWS CloudWatch sont-elles retardées?][19]
* [Croyez-vous constater un écart entre vos données dans CloudWatch et Datadog?][20]
* [Je pense que certains de mes événements CloudTrail sont manquant?][21]
* [Pourquoi y a-t-il un retard dans la réception de mes données?][22]
* [Je ne peux pas filtrer mes instances ELB - serai-je facturé pour elles?][23]
* [Je viens de configurer mon intégration AWS. Pourquoi est-ce que je vois des hosts en double?][24]
* [Récupérer les tags EC2 au démarrage][25]

## Apache

* [Problèmes avec l'intégration Apache][26]
* [Problèmes de certificat SSL Apache][27]

## Azure
* [Ma machine virtuelle Azure est down ... pourquoi est-elle toujours répertoriée dans ma page infrastructure list?][28]
* [Les machines virtuelles Azure apparaissent dans l'application, mais pas dans les métriques rapportées. ][29]
* [Le statut de la machine virtuelle Azure n'est pas reporté.][30]

## Dyn
* [Pourquoi la métrique dyn.qps est-elle retardée?][31]

## Docker

* [Compose avec l'Agent Datadog][32]
* [DogStatsD et Docker][33]
* [Événements Docker, ECS et Kubernetes][34]

## Elasticsearch 

* [Pourquoi Elasticsearch n'envoie pas toutes mes métriques?][35]
* [L'agent ne peut pas se connecter][36]

## Git & Github

* [Pourquoi les événements n'apparaissent pas dans le flux d'événements avec mon intégration github?][37]

## Hadoop
* [Erreur d'intégration Hadoop Distributed File System (HDFS)][38]

## HAProxy

* [HAProxy en mode multi-process][39]

## Jira
* [J'ai mis en place l'intégration JIRA, comment puis-je créer des événements et des tickets?][40]

## JMX

* [J'ai un Matching Bean pour mon intégration JMX mais rien sur Collect!][41]
* [Collecte des attributs JMX de type composite][42]
* [Comment exécuter les commandes JMX dans Windows?][43]
* [jmx.yaml error: Include Section][44]
* [Troubleshooting - les intégrations JMX][45]
* [Afficher les données jmx dans jConsole et configurer votre jmx.yaml pour les collecter][46]
* [Les deux intégrations JMX et AWS utilisent des tags "name". Que dois-je faire ?][47]
* [Limites de métriques dans les intégrations JMX][48]

## Kafka

* [Troubleshooting et Deep Dive for Kafka][49]

* [L'agent n'a pas pu récupérer le talon de RMIServer][50]
* [Les métriques Producer et Consumer n'apparaissent pas dans mon application Datadog.][51]

## Kubernetes 

* [Puis-je installer l'agent sur mon ou mes nœuds master Kubernetes?][52]
* [Authentification du client contre l'apiserver et le kubelet][53]
* [Rassembler les événements Kubernetes][54]
* [Pourquoi la vérification de Kubernetes échoue-t-elle avec une erreur ConnectTimeout sur le port 10250?][55]
* [Utilisation de l'autorisation RBAC avec votre intégration Kubernetes][56]

## MySQL & SQL 
* [Problème de connection avec l'intégration SQL Server][57]
* [Erreur Localhost MySQL - Localhost VS 127.0.0.1][58]
* [Puis-je utiliser une instance nommée dans l'intégration SQL Server?][59]
* [Puis-je configurer le check dd-agent mysql sur mon Google CloudSQL?][60]
* [Comment collecter des métriques à partir de requêtes MySQL personnalisées][61]
* [Puis-je collecter des métriques de performance SQL Server au-delà de ce qui est disponible dans la table sys.dm_os_performance_counters? Essayez WMI][62]
* [Comment puis-je collecter plus de métriques à partir de mon intégration SQL Server?][63]
* [L'utilisateur de la base de données manque de privilèges][64]

## Network
* [Comment envoyer des métriques d'hôte TCP / UDP via l'API Datadog?][65]

## Postgres
* [Collection de métriques custom Postgres][66]

## RabbitMQ

* [Tagger les files d'attente RabbitMQ par famille de tag][67]

## Redis

* [Erreur d'intégration Redis: "unknown command 'CONFIG'"][68]

## SNMP

* [Datadog possède-t-il une liste d'OID couramment utilisés / compatibles pour SNMP ?][69]

## Unix
* [Comment puis-je collecter des métriques à partir du shell UNIX?][70]

## VMWare
* [Puis-je limiter le nombre de VM surveillées via l'intégration de VMWare?][71]

## Webhooks
* [Comment faire une carte Trello en utilisant des Webhooks?][72]

## Windows

* [Comment ajouter des logs à la classe WMI `Win32_NTLogEvent`][73]
* [Collecte des compteurs de performance Windows custom sur WMI][74]
* [Check basé sur le Windows Status ][75]
* [Comment monitorer des événements issus du Windows Event Logs ?][76]
* [Comment récupérer les métriques WMI][77]

[1]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[2]: /integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors
[3]: /integrations/faq/issues-getting-integrations-working
[4]: /integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration
[5]: /integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances
[6]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[7]: /integrations/faq/aws-integration-and-cloudwatch-faq
[8]: /integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics
[9]: /integrations/faq/where-are-my-elb-latency-metrics
[10]: /integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags
[11]: /integrations/faq/does-datadog-support-aws-alb-application-load-balancer
[12]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[13]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[14]: /integrations/faq/additional-aws-metrics-min-max-sum
[15]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[16]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[17]: /integrations/faq/wrong-count-of-aws-elb-healthy-host-count
[18]: /integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch
[19]: /integrations/faq/are-my-aws-cloudwatch-metrics-delayed
[20]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[21]: /integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events
[22]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[23]: /integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them
[24]: /integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
[25]: /integrations/faq/capturing-ec2-tags-at-startup
[26]: /integrations/faq/issues-with-apache-integration
[27]: /integrations/faq/apache-ssl-certificate-issues
[28]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[29]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[30]: /integrations/faq/azure-vm-status-is-not-reporting
[31]: /integrations/faq/why-is-my-dyn-qps-metric-delayed
[32]: /integrations/faq/compose-and-the-datadog-agent
[33]: /integrations/faq/dogstatsd-and-docker
[34]: /integrations/faq/docker-ecs-kubernetes-events
[35]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[36]: /integrations/faq/elastic-agent-can-t-connect
[37]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[38]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[39]: /integrations/faq/haproxy-multi-process
[40]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[41]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[42]: /integrations/faq/collecting-composite-type-jmx-attributes
[43]: /integrations/faq/how-to-run-jmx-commands-in-windows
[44]: /integrations/faq/jmx-yaml-error-include-section
[45]: /integrations/faq/troubleshooting-jmx-integrations
[46]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[47]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[48]: /integrations/faq/metric-limits-in-jmw-integrations
[49]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[50]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[51]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[52]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[53]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[54]: /integrations/faq/gathering-kubernetes-events
[55]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[56]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[57]: /integrations/faq/connection-issues-with-the-sql-server-integration
[58]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[59]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[60]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[61]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[62]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[63]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[64]: /integrations/faq/database-user-lacks-privileges
[65]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[66]: /integrations/faq/postgres-custom-metric-collection-explained
[67]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[68]: /integrations/faq/redis-integration-error-unknown-command-config
[69]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[70]: /integrations/faq/how-can-i-gather-metrics-from-the-unix-shell
[71]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[72]: /integrations/faq/how-to-make-trello-card-using-webhooks
[73]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[74]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[75]: /integrations/faq/windows-status-based-check
[76]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[77]: /integrations/faq/how-to-retrieve-wmi-metrics
