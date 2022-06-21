---
title: FAQ Integrations
kind: faq
cascade: 
  - private: true
aliases:
    - /integrations/faq/how-can-i-gather-metrics-from-the-unix-shell
    - /integrations/faq/what-is-a-custom-metric-and-what-is-the-limit-on-the-number-of-custom-metrics-i-can-have
    - /integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors
    - /integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags
    - /integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
    - /integrations/faq/extra-hosts-with-name-n-a-reporting-data
---

## Amazon Web Services

* [AWS Integration and CloudWatch FAQ][1]
* [How do I pull my EC2 tags without using the AWS integration ?][2]
* [How do I monitor my AWS billing details?][3]
* [Cloud Metric Delay][4]
* [Why is there a delay in receiving my data?][5]
* [Integration Setup for ECS Fargate][6]
* [Error: Datadog is not authorized to perform sts:AssumeRole][7]

## Apache

* [Issues with Apache Integration][8]
* [Apache SSL certificate issues][9]

## Azure

* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][10]
* [Azure VMs are showing up in the App but not reporting metrics][11]
* [Azure Status and Count Metrics][12]
* [Azure Troubleshooting][13]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][14]
* [Agent can't connect][15]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][16]

## Hadoop

* [Hadoop Distributed File System (HDFS) Integration Error][17]

## HAProxy

* [HAProxy in multi-process mode][18]

## Jira

* [I've set up the JIRA integration, now how do I get events and tickets created?][19]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][20]
* [Collecting Composite type JMX attributes][21]
* [How to run JMX commands in Windows?][22]
* [jmx.yaml error: Include Section][23]
* [Troubleshooting JMX Integrations][24]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][25]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][26]
* [JBoss EAP 7 & Datadog monitoring via JMX][27]

## Kafka


* [Troubleshooting and Deep Dive for Kafka][28]

## Kubernetes

* [Client Authentication against the apiserver and kubelet][29]

## MySQL & SQL

* [MySQL Localhost Error - Localhost VS 127.0.0.1][30]
* [Can I use a named instance in the SQL Server integration?][31]
* [MySQL Custom Queries][32]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][33]
* [Database user lacks privileges][34]

## Network

* [How to send TCP/UDP host metrics via the Datadog API ?][35]

## Postgres

* [Postgres custom metric collection explained][36]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][37]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][38]

## Unix

* [How can I gather metrics from the UNIX shell?][39]

## Vertica

* [How to collect metrics from custom Vertica queries][40]

## VSphere

* [Troubleshooting duplicated hosts with vSphere][41]

## Webhooks

* [How to make a Trello Card using Webhooks][42]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][43]
* [Collect Custom Windows Performance Counters over WMI][44]
* [Windows Status Based Check][45]
* [How to retrieve WMI metrics][46]

[1]: /integrations/faq/aws-integration-and-cloudwatch-faq/
[2]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration/
[3]: /integrations/faq/how-do-i-monitor-my-aws-billing-details/
[4]: /integrations/faq/cloud-metric-delay/
[5]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data/
[6]: /integrations/faq/integration-setup-ecs-fargate/
[7]: /integrations/faq/error-datadog-not-authorized-sts-assume-role/
[8]: /integrations/faq/issues-with-apache-integration/
[9]: /integrations/faq/apache-ssl-certificate-issues/
[10]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list/
[11]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics/
[12]: /integrations/faq/azure-status-metric/
[13]: /integrations/faq/azure-troubleshooting/
[14]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[15]: /integrations/faq/elastic-agent-can-t-connect/
[16]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration/
[17]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error/
[18]: /integrations/faq/haproxy-multi-process/
[19]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[20]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[21]: /integrations/faq/collecting-composite-type-jmx-attributes/
[22]: /integrations/faq/how-to-run-jmx-commands-in-windows/
[23]: /integrations/faq/jmx-yaml-error-include-section/
[24]: /integrations/faq/troubleshooting-jmx-integrations/
[25]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[26]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[27]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx/
[28]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[29]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[30]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[31]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[32]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/
[33]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
[34]: /integrations/faq/database-user-lacks-privileges/
[35]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api/
[36]: /integrations/faq/postgres-custom-metric-collection-explained/
[37]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[38]: /integrations/faq/redis-integration-error-unknown-command-config/
[39]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[40]: /integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[41]: /integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[42]: /integrations/faq/how-to-make-trello-card-using-webhooks/
[43]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class/
[44]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[45]: /integrations/faq/windows-status-based-check/
[46]: /integrations/faq/how-to-retrieve-wmi-metrics/
