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

* [How do I pull my EC2 tags without using the AWS integration ?][1]
* [How do I monitor my AWS billing details?][2]
* [Why is there a delay in receiving my data?][3]
* [Integration Setup for ECS Fargate][4]

## Apache

* [Issues with Apache Integration][5]
* [Apache SSL certificate issues][6]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][7]
* [Agent can't connect][8]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][9]

## HAProxy

* [HAProxy in multi-process mode][10]

## Jira

* [I've set up the JIRA integration, now how do I get events and tickets created?][11]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][12]
* [jmx.yaml error: Include Section][13]
* [Troubleshooting JMX Integrations][14]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][15]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][16]
* [JBoss EAP 7 & Datadog monitoring via JMX][17]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][18]

## Kubernetes

* [Client Authentication against the apiserver and kubelet][19]

## MySQL & SQL

* [MySQL Localhost Error - Localhost VS 127.0.0.1][20]
* [Can I use a named instance in the SQL Server integration?][21]
* [Database user lacks privileges][22]

## Postgres

* [Postgres custom metric collection explained][23]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][24]

## Unix

* [How can I gather metrics from the UNIX shell?][25]

## Vertica

* [How to collect metrics from custom Vertica queries][26]

## VMware Tanzu Application Service

* [VMware Tanzu Application Service architecture][31]

## VSphere

* [Troubleshooting duplicated hosts with vSphere][27]

## Webhooks

* [How to make a Trello Card using Webhooks][28]

## Windows

* [Collect Custom Windows Performance Counters over WMI][29]
* [Windows Status Based Check][30]

[1]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration/
[2]: /integrations/faq/how-do-i-monitor-my-aws-billing-details/
[3]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data/
[4]: /integrations/faq/integration-setup-ecs-fargate/
[5]: /integrations/faq/issues-with-apache-integration/
[6]: /integrations/faq/apache-ssl-certificate-issues/
[7]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[8]: /integrations/faq/elastic-agent-can-t-connect/
[9]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration/
[10]: /integrations/faq/haproxy-multi-process/
[11]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[12]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[13]: /integrations/faq/jmx-yaml-error-include-section/
[14]: /integrations/faq/troubleshooting-jmx-integrations/
[15]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[16]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[17]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx/
[18]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[19]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[20]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[21]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[22]: /integrations/faq/database-user-lacks-privileges/
[23]: /integrations/faq/postgres-custom-metric-collection-explained/
[24]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[25]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[26]: /integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[27]: /integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[28]: /integrations/faq/how-to-make-trello-card-using-webhooks/
[29]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[30]: /integrations/faq/windows-status-based-check/
[31]: /integrations/faq/pivotal_architecture/
