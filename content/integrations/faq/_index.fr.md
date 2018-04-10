---
title: Intégrations FAQ
kind: faq
---

## Général

* [Quelles intégrations standard émettent des métriques custom?](/integrations/faq/what-standard-integrations-emit-custom-metrics)

* [Les check de service sont déconseillés en faveur des monitors](/integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors)
* [Problèmes de fonctionnement des intégrations](/integrations/faq/issues-getting-integrations-working)

## Amazon Web Services

* [Révocation des clés AWS et activation de la délégation de rôles pour l'intégration AWS Datadog.](/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration)
* [Comment puis-je monitorer la santé / le statut de mes instances RDS?](/integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances)
* [Utilisation de l'intégration AWS Billing de Datadog pour surveiller votre utilisation de CloudWatch](/integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage)
* [FAQ intégration AWS et CloudWatch](/integrations/faq/aws-integration-and-cloudwatch-faq)
* [Pourquoi ne vois-je que les valeurs moyennes de mes métriques custom AWS / Cloudwatch ?](/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics)
* [Où sont mes métriques de latence ELB?](/integrations/faq/where-are-my-elb-latency-metrics)
* [J'ai supprimé mon intégration AWS EC2. Pourquoi mes hôtes ont-ils toujours des tags AWS?](/integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags)
* [Est-ce que Datadog prend en charge AWS ALB (Application Load Balancer)?](/integrations/faq/does-datadog-support-aws-alb-application-load-balancer)
* [Obtenez vos événements et métriques de groupes AutoScaling](/integrations/faq/get-your-autoscaling-group-events-and-metrics)
* [Comment puis-je récupérer mes tags EC2 sans utiliser l'intégration AWS?](/integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration)
* [Métriques AWS additionnelles -  Min/Max/Sum](/integrations/faq/additional-aws-metrics-min-max-sum)
* [Comment puis-je surveiller mes informations de facturation AWS?](/integrations/faq/how-do-i-monitor-my-aws-billing-details)
* [Hôtes supplémentaires avec le nom "N/A" envoyant des données.](/integrations/faq/extra-hosts-with-name-n-a-reporting-data)
* [Mauvais compte de aws.elb.healthy_host_count?](/integrations/faq/wrong-count-of-aws-elb-healthy-host-count)
* [Pourquoi ma métrique de nombre d'erreurs AWS compte-t-elle des ordres de grandeur inférieurs à ceux de Cloudwatch dans Datadog?](/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch)
* [Mes statistiques AWS CloudWatch sont-elles retardées?](/integrations/faq/are-my-aws-cloudwatch-metrics-delayed)
* [Croyez-vous constater un écart entre vos données dans CloudWatch et Datadog?](/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog)
* [Je pense que certains de mes événements CloudTrail sont manquant?](/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events)
* [Pourquoi y a-t-il un retard dans la réception de mes données?](/integrations/faq/why-is-there-a-delay-in-receiving-my-data)
* [Je ne peux pas filtrer mes instances ELB - serai-je facturé pour elles?](/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them)
* [Je viens de configurer mon intégration AWS. Pourquoi est-ce que je vois des hosts en double?](/integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts)
* [Récupérer les tags EC2 au démarrage](/integrations/faq/capturing-ec2-tags-at-startup)

## Apache

* [Problèmes avec l'intégration Apache](/integrations/faq/issues-with-apache-integration)
* [Problèmes de certificat SSL Apache](/integrations/faq/apache-ssl-certificate-issues)

## Azure
* [Ma machine virtuelle Azure est down ... pourquoi est-elle toujours répertoriée dans ma page infrastructure list?](/integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list)
* [Les machines virtuelles Azure apparaissent dans l'application, mais pas dans les métriques rapportées. ](/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics)
* [Le statut de la machine virtuelle Azure n'est pas reporté.](/integrations/faq/azure-vm-status-is-not-reporting)

## Dyn
* [Pourquoi la métrique dyn.qps est-elle retardée?](/integrations/faq/why-is-my-dyn-qps-metric-delayed)

## Docker

* [Compose avec l'Agent Datadog](/integrations/faq/compose-and-the-datadog-agent)
* [DogStatsD et Docker](/integrations/faq/dogstatsd-and-docker)
* [Événements Docker, ECS et Kubernetes](/integrations/faq/docker-ecs-kubernetes-events)

## Elasticsearch 

* [Pourquoi Elasticsearch n'envoie pas toutes mes métriques?](/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics)
* [L'agent ne peut pas se connecter](/integrations/faq/elastic-agent-can-t-connect)

## Git & Github

* [Pourquoi les événements n'apparaissent pas dans le flux d'événements avec mon intégration github?](/integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration)

## Hadoop
* [Erreur d'intégration Hadoop Distributed File System (HDFS)](/integrations/faq/hadoop-distributed-file-system-hdfs-integration-error)

## HAProxy

* [HAProxy en mode multi-process](/integrations/faq/haproxy-multi-process)

## Jira
* [J'ai mis en place l'intégration JIRA, comment puis-je créer des événements et des tickets?](/integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created)

## JMX

* [J'ai un Matching Bean pour mon intégration JMX mais rien sur Collect!](/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect)
* [Collecte des attributs JMX de type composite](/integrations/faq/collecting-composite-type-jmx-attributes)
* [Comment exécuter les commandes JMX dans Windows?](/integrations/faq/how-to-run-jmx-commands-in-windows)
* [jmx.yaml error: Include Section](/integrations/faq/jmx-yaml-error-include-section)
* [Troubleshooting - les intégrations JMX](/integrations/faq/troubleshooting-jmx-integrations)
* [Afficher les données jmx dans jConsole et configurer votre jmx.yaml pour les collecter](/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them)
* [Les deux intégrations JMX et AWS utilisent des tags "name". Que dois-je faire ?](/integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do)
* [Limites de métriques dans les intégrations JMX](/integrations/faq/metric-limits-in-jmw-integrations)

## Kafka

* [Troubleshooting et Deep Dive for Kafka](/integrations/faq/troubleshooting-and-deep-dive-for-kafka)

* [L'agent n'a pas pu récupérer le talon de RMIServer](/integrations/faq/agent-failed-to-retrieve-rmierver-stub)
* [Les métriques Producer et Consumer n'apparaissent pas dans mon application Datadog.](/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application)

## Kubernetes 

* [Puis-je installer l'agent sur mon ou mes nœuds master Kubernetes?](/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s)
* [Authentification du client contre l'apiserver et le kubelet](/integrations/faq/client-authentication-against-the-apiserver-and-kubelet)
* [Rassembler les événements Kubernetes](/integrations/faq/gathering-kubernetes-events)
* [Pourquoi la vérification de Kubernetes échoue-t-elle avec une erreur ConnectTimeout sur le port 10250?](/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250)
* [Utilisation de l'autorisation RBAC avec votre intégration Kubernetes](/integrations/faq/using-rbac-permission-with-your-kubernetes-integration)

## MySQL & SQL 
* [Problème de connection avec l'intégration SQL Server](/integrations/faq/connection-issues-with-the-sql-server-integration)
* [Erreur Localhost MySQL - Localhost VS 127.0.0.1](/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1)
* [Puis-je utiliser une instance nommée dans l'intégration SQL Server?](/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration)
* [Puis-je configurer le check dd-agent mysql sur mon Google CloudSQL?](/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql)
* [Comment collecter des métriques à partir de requêtes MySQL personnalisées](/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries)
* [Puis-je collecter des métriques de performance SQL Server au-delà de ce qui est disponible dans la table sys.dm_os_performance_counters? Essayez WMI](/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi)
* [Comment puis-je collecter plus de métriques à partir de mon intégration SQL Server?](/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration)
* [L'utilisateur de la base de données manque de privilèges](/integrations/faq/database-user-lacks-privileges)

## Network
* [Comment envoyer des métriques d'hôte TCP / UDP via l'API Datadog?](/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api)


## Postgres
* [Collection de métriques custom Postgres](/integrations/faq/postgres-custom-metric-collection-explained)

## RabbitMQ

* [Tagger les files d'attente RabbitMQ par famille de tag](/integrations/faq/tagging-rabbitmq-queues-by-tag-family)

## Redis

* [Erreur d'intégration Redis: "unknown command 'CONFIG'"](/integrations/faq/redis-integration-error-unknown-command-config)

## SNMP

* [Datadog possède-t-il une liste d'OID couramment utilisés / compatibles pour SNMP ?](/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids)

## Unix
* [Comment puis-je collecter des métriques à partir du shell UNIX?](/integrations/faq/how-can-i-gather-metrics-from-the-unix-shell)

## VMWare
* [Puis-je limiter le nombre de VM surveillées via l'intégration de VMWare?](/integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration)

## Webhooks
* [Comment faire une carte Trello en utilisant des Webhooks?](/integrations/faq/how-to-make-trello-card-using-webhooks)

## Windows

* [Comment ajouter des logs à la classe WMI `Win32_NTLogEvent`](/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class)
* [Collecte des compteurs de performance Windows custom sur WMI](/integrations/faq/collect-custom-windows-performance-counters-over-wmi)
* [Check basé sur le Windows Status ](/integrations/faq/windows-status-based-check)
* [Comment monitorer des événements issus du Windows Event Logs ?](/integrations/faq/how-to-monitor-events-from-the-windows-event-logs)
* [Comment récupérer les métriques WMI](/integrations/faq/how-to-retrieve-wmi-metrics)
