---
title: FAQ Integrations
kind: faq
private: true
disable_toc: true
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
* [The AWS Integration with Terraform][8]

## Apache

* [Issues with Apache Integration][9]
* [Apache SSL certificate issues][10]

## Azure

* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][11]
* [Azure VMs are showing up in the App but not reporting metrics][12]
* [Azure Status Metric][13]
* [Azure Troubleshooting][14]

## Docker

* [Compose and the Datadog Agent][15]
* [DogStatsD and Docker][16]
* [Container Integration Events][17]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][18]
* [Agent can't connect][19]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][20]

## Hadoop

* [Hadoop Distributed File System (HDFS) Integration Error][21]

## HAProxy

* [HAProxy in multi-process mode][22]

## Jira

* [I've set up the JIRA integration, now how do I get events and tickets created?][23]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][24]
* [Collecting Composite type JMX attributes][25]
* [How to run JMX commands in Windows?][26]
* [jmx.yaml error: Include Section][27]
* [Troubleshooting JMX Integrations][28]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][29]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][30]
* [JBoss EAP 7 & Datadog monitoring via JMX][31]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][32]
* [Agent failed to retrieve RMIServer stub][33]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][34]
* [Client Authentication against the apiserver and kubelet][35]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][36]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][37]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][38]
* [Can I use a named instance in the SQL Server integration?][39]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][40]
* [How to collect metrics from custom MySQL queries][41]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][42]
* [How can I collect more metrics from my SQL Server integration?][43]
* [Database user lacks privileges][44]

## Network

* [How to send TCP/UDP host metrics via the Datadog API ?][45]

## Postgres

* [Postgres custom metric collection explained][46]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][47]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][48]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][49]

## Unix

* [How can I gather metrics from the UNIX shell?][50]

## Vertica

* [How to collect metrics from custom Vertica queries][51]

## VMWare

* [Can I limit the number of VMs that are pulled in via the VMWare integration?][52]

## Webhooks

* [How to make a Trello Card using Webhooks][53]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][54]
* [Collect Custom Windows Performance Counters over WMI][55]
* [Windows Status Based Check][56]
* [How to monitor events from the Windows Event Logs][57]
* [How to retrieve WMI metrics][58]

[1]: /integrations/faq/aws-integration-and-cloudwatch-faq
[2]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[3]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[4]: /integrations/faq/cloud-metric-delay
[5]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[6]: /integrations/faq/integration-setup-ecs-fargate
[7]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[8]: /integrations/faq/aws-integration-with-terraform
[9]: /integrations/faq/issues-with-apache-integration
[10]: /integrations/faq/apache-ssl-certificate-issues
[11]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[12]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[13]: /integrations/faq/azure-status-metric
[14]: /integrations/faq/azure-troubleshooting
[15]: /integrations/faq/compose-and-the-datadog-agent
[16]: /integrations/faq/dogstatsd-and-docker
[17]: /integrations/faq/container-integration-event
[18]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[19]: /integrations/faq/elastic-agent-can-t-connect
[20]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[21]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[22]: /integrations/faq/haproxy-multi-process
[23]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[24]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[25]: /integrations/faq/collecting-composite-type-jmx-attributes
[26]: /integrations/faq/how-to-run-jmx-commands-in-windows
[27]: /integrations/faq/jmx-yaml-error-include-section
[28]: /integrations/faq/troubleshooting-jmx-integrations
[29]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[30]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[31]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[32]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[33]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[34]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[35]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[36]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[37]: /integrations/faq/connection-issues-with-the-sql-server-integration
[38]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[39]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[40]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[41]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[42]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[43]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[44]: /integrations/faq/database-user-lacks-privileges
[45]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[46]: /integrations/faq/postgres-custom-metric-collection-explained
[47]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[48]: /integrations/faq/redis-integration-error-unknown-command-config
[49]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[50]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[51]: /integrations/faq/how-to-collect-metrics-from-custom-vertica-queries
[52]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[53]: /integrations/faq/how-to-make-trello-card-using-webhooks
[54]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[55]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[56]: /integrations/faq/windows-status-based-check
[57]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[58]: /integrations/faq/how-to-retrieve-wmi-metrics
