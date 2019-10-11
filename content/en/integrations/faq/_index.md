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
* [Extra hosts with name "N/A" reporting data][4]
* [Cloud Metric Delay][5]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][6]
* [Why is there a delay in receiving my data?][7]
* [Integration Setup for ECS Fargate][8]
* [Error: Datadog is not authorized to perform sts:AssumeRole][9]
* [The AWS Integration with Terraform][10]

## Apache

* [Issues with Apache Integration][11]
* [Apache SSL certificate issues][12]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][13]
* [Azure VMs are showing up in the App but not reporting metrics][14]
* [Azure Status Metric][15]
* [Azure Troubleshooting][16]

## Docker

* [Compose and the Datadog Agent][17]
* [DogStatsD and Docker][18]
* [Container Integration Events][19]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][20]
* [Agent can't connect][21]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][22]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][23]

## HAProxy

* [HAProxy in multi-process mode][24]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][25]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][26]
* [Collecting Composite type JMX attributes][27]
* [How to run JMX commands in Windows?][28]
* [jmx.yaml error: Include Section][29]
* [Troubleshooting JMX Integrations][30]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][31]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][32]
* [JBoss EAP 7 & Datadog monitoring via JMX][33]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][34]
* [Agent failed to retrieve RMIServer stub][35]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][36]
* [Client Authentication against the apiserver and kubelet][37]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][38]
* [Using RBAC permission with your Kubernetes integration][39]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][40]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][41]
* [Can I use a named instance in the SQL Server integration?][42]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][43]
* [How to collect metrics from custom MySQL queries][44]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][45]
* [How can I collect more metrics from my SQL Server integration?][46]
* [Database user lacks privileges][47]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][48]

## Postgres
* [Postgres custom metric collection explained][49]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][50]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][51]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][52]

## Unix
* [How can I gather metrics from the UNIX shell?][53]

## Vertica
* [How to collect metrics from custom Vertica queries](/integrations/faq/how-to-collect-metrics-from-custom-vertica-queries)

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][54]

## Webhooks
* [How to make a Trello Card using Webhooks][55]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][56]
* [Collect Custom Windows Performance Counters over WMI][57]
* [Windows Status Based Check][58]
* [How to monitor events from the Windows Event Logs][59]
* [How to retrieve WMI metrics][60]

[1]: /integrations/faq/aws-integration-and-cloudwatch-faq
[2]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[3]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[4]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[5]: /integrations/faq/cloud-metric-delay
[6]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[7]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[8]: /integrations/faq/integration-setup-ecs-fargate
[9]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[10]: /integrations/faq/aws-integration-with-terraform
[11]: /integrations/faq/issues-with-apache-integration
[12]: /integrations/faq/apache-ssl-certificate-issues
[13]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[14]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[15]: /integrations/faq/azure-status-metric
[16]: /integrations/faq/azure-troubleshooting
[17]: /integrations/faq/compose-and-the-datadog-agent
[18]: /integrations/faq/dogstatsd-and-docker
[19]: /integrations/faq/container-integration-event
[20]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[21]: /integrations/faq/elastic-agent-can-t-connect
[22]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[23]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[24]: /integrations/faq/haproxy-multi-process
[25]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[26]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[27]: /integrations/faq/collecting-composite-type-jmx-attributes
[28]: /integrations/faq/how-to-run-jmx-commands-in-windows
[29]: /integrations/faq/jmx-yaml-error-include-section
[30]: /integrations/faq/troubleshooting-jmx-integrations
[31]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[32]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[33]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[34]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[35]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[36]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[37]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[38]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[39]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[40]: /integrations/faq/connection-issues-with-the-sql-server-integration
[41]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[42]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[43]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[44]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[45]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[46]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[47]: /integrations/faq/database-user-lacks-privileges
[48]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[49]: /integrations/faq/postgres-custom-metric-collection-explained
[50]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[51]: /integrations/faq/redis-integration-error-unknown-command-config
[52]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[53]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[54]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[55]: /integrations/faq/how-to-make-trello-card-using-webhooks
[56]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[57]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[58]: /integrations/faq/windows-status-based-check
[59]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[60]: /integrations/faq/how-to-retrieve-wmi-metrics
