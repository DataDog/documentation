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
    - /integrations/faq/redis-integration-error-unknown-command-config
    - /integrations/faq/snmp
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

* [Why events don't appear to be showing up in the event explorer with my github integration ?][16]

## Hadoop

* [Hadoop Distributed File System (HDFS) Integration Error][17]

## HAProxy

* [HAProxy in multi-process mode][16]

## Jira

* [I've set up the JIRA integration, now how do I get events and tickets created?][17]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][18]
* [jmx.yaml error: Include Section][19]
* [Troubleshooting JMX Integrations][20]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][21]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][22]
* [JBoss EAP 7 & Datadog monitoring via JMX][23]

## Kafka


* [Troubleshooting and Deep Dive for Kafka][24]

## Kubernetes

* [Client Authentication against the apiserver and kubelet][25]

## MySQL & SQL

* [MySQL Localhost Error - Localhost VS 127.0.0.1][26]
* [Can I use a named instance in the SQL Server integration?][27]
* [Database user lacks privileges][28]

## Postgres

* [Postgres custom metric collection explained][29]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][30]

## Unix

* [How can I gather metrics from the UNIX shell?][31]

## Vertica

* [How to collect metrics from custom Vertica queries][32]

## VSphere

* [Troubleshooting duplicated hosts with vSphere][33]

## Webhooks

* [How to make a Trello Card using Webhooks][34]

## Windows

* [Collect Custom Windows Performance Counters over WMI][35]
* [Windows Status Based Check][36]

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
[16]: /integrations/faq/haproxy-multi-process/
[17]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[18]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[19]: /integrations/faq/jmx-yaml-error-include-section/
[20]: /integrations/faq/troubleshooting-jmx-integrations/
[21]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[22]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[23]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx/
[24]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[25]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[26]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[27]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[28]: /integrations/faq/database-user-lacks-privileges/
[29]: /integrations/faq/postgres-custom-metric-collection-explained/
[30]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[31]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[32]: /integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[33]: /integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[34]: /integrations/faq/how-to-make-trello-card-using-webhooks/
[35]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[36]: /integrations/faq/windows-status-based-check/
