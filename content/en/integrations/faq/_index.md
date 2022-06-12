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

## Docker

* [Compose and the Datadog Agent][14]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][15]
* [Agent can't connect][16]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][17]

## Hadoop

* [Hadoop Distributed File System (HDFS) Integration Error][18]

## HAProxy

* [HAProxy in multi-process mode][19]

## Jira

* [I've set up the JIRA integration, now how do I get events and tickets created?][20]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][21]
* [Collecting Composite type JMX attributes][22]
* [How to run JMX commands in Windows?][23]
* [jmx.yaml error: Include Section][24]
* [Troubleshooting JMX Integrations][25]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][26]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][27]
* [JBoss EAP 7 & Datadog monitoring via JMX][28]

## Kafka


* [Troubleshooting and Deep Dive for Kafka][29]

## Kubernetes

* [Client Authentication against the apiserver and kubelet][30]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][31]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][32]
* [Can I use a named instance in the SQL Server integration?][33]
* [MySQL Custom Queries][34]
* [How can I collect more metrics from my SQL Server integration?][35]
* [Database user lacks privileges][36]

## Network

* [How to send TCP/UDP host metrics via the Datadog API ?][37]

## Postgres

* [Postgres custom metric collection explained][38]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][39]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][40]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][41]

## Unix

* [How can I gather metrics from the UNIX shell?][42]

## Vertica

* [How to collect metrics from custom Vertica queries][43]

## VSphere

* [Troubleshooting duplicated hosts with vSphere][44]

## Webhooks

* [How to make a Trello Card using Webhooks][45]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][46]
* [Collect Custom Windows Performance Counters over WMI][47]
* [Windows Status Based Check][48]
* [How to retrieve WMI metrics][49]

[1]: /integrations/faq/aws-integration-and-cloudwatch-faq/
[2]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration/
[3]: /integrations/faq/how-do-i-monitor-my-aws-billing-details/
[4]: /integrations/faq/cloud-metric-delay/
[5]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data/
[6]: /integrations/faq/integration-setup-ecs-fargate/
[7]: /integrations/faq/error-datadog-not-authorized-sts-assume-role/
[8]: /integrations/faq/aws-integration-with-terraform/
[9]: /integrations/faq/issues-with-apache-integration/
[10]: /integrations/faq/apache-ssl-certificate-issues/
[11]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list/
[12]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics/
[13]: /integrations/faq/azure-status-metric/
[14]: /integrations/faq/azure-troubleshooting/
[15]: /integrations/faq/compose-and-the-datadog-agent/
[16]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[17]: /integrations/faq/elastic-agent-can-t-connect/
[18]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration/
[19]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error/
[20]: /integrations/faq/haproxy-multi-process/
[21]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[22]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[23]: /integrations/faq/collecting-composite-type-jmx-attributes/
[24]: /integrations/faq/how-to-run-jmx-commands-in-windows/
[25]: /integrations/faq/jmx-yaml-error-include-section/
[26]: /integrations/faq/troubleshooting-jmx-integrations/
[27]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[28]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[29]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[30]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[31]: /integrations/faq/connection-issues-with-the-sql-server-integration/
[32]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[33]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[34]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/
[35]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/
[36]: /integrations/faq/database-user-lacks-privileges/
[37]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api/
[38]: /integrations/faq/postgres-custom-metric-collection-explained/
[39]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[40]: /integrations/faq/redis-integration-error-unknown-command-config/
[41]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids/
[42]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[43]: /integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[44]: /integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[45]: /integrations/faq/how-to-make-trello-card-using-webhooks/
[46]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class/
[47]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[48]: /integrations/faq/windows-status-based-check/
[49]: /integrations/faq/how-to-retrieve-wmi-metrics/
