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
* [How do I pull my EC2 tags without using the AWS integration ?][3]
* [How do I monitor my AWS billing details?][4]
* [Extra hosts with name "N/A" reporting data][5]
* [Cloud Metric Delay][6]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][7]
* [Why is there a delay in receiving my data?][8]
* [Integration Setup for ECS Fargate][9]
* [Error: Datadog is not authorized to perform sts:AssumeRole][10]
* [The AWS Integration with Terraform][11]

## Apache

* [Issues with Apache Integration][12]
* [Apache SSL certificate issues][13]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][14]
* [Azure VMs are showing up in the App but not reporting metrics][15]
* [Azure VM status is not reporting][16]
* [Azure Troubleshooting][17]

## Docker

* [Compose and the Datadog Agent][18]
* [DogStatsD and Docker][19]
* [Container Integration Events][20]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][21]
* [Agent can't connect][22]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][23]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][24]

## HAProxy

* [HAProxy in multi-process mode][25]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][26]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][27]
* [Collecting Composite type JMX attributes][28]
* [How to run JMX commands in Windows?][29]
* [jmx.yaml error: Include Section][30]
* [Troubleshooting JMX Integrations][31]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][32]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][33]
* [JBoss EAP 7 & Datadog monitoring via JMX][34]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][35]

* [Agent failed to retrieve RMIServer stub][36]
* [Producer and Consumer metrics don't appear in my Datadog application][37]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][38]
* [Client Authentication against the apiserver and kubelet][39]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][40]
* [Using RBAC permission with your Kubernetes integration][41]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][42]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][43]
* [Can I use a named instance in the SQL Server integration?][44]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][45]
* [How to collect metrics from custom MySQL queries][46]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][47]
* [How can I collect more metrics from my SQL Server integration?][48]
* [Database user lacks privileges][49]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][50]

## Postgres
* [Postgres custom metric collection explained][51]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][52]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][53]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][54]

## Unix
* [How can I gather metrics from the UNIX shell?][55]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][56]

## Webhooks
* [How to make a Trello Card using Webhooks][57]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][58]
* [Collect Custom Windows Performance Counters over WMI][59]
* [Windows Status Based Check][60]
* [How to monitor events from the Windows Event Logs][61]
* [How to retrieve WMI metrics][62]

[1]: /integrations/faq/aws-integration-and-cloudwatch-faq
[2]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[3]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[4]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[5]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[6]: /integrations/faq/cloud-metric-delay
[7]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[8]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[9]: /integrations/faq/integration-setup-ecs-fargate
[10]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[11]: /integrations/faq/aws-integration-with-terraform
[12]: /integrations/faq/issues-with-apache-integration
[13]: /integrations/faq/apache-ssl-certificate-issues
[14]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[15]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[16]: /integrations/faq/azure-vm-status-is-not-reporting
[17]: /integrations/faq/azure-troubleshooting
[18]: /integrations/faq/compose-and-the-datadog-agent
[19]: /integrations/faq/dogstatsd-and-docker
[20]: /integrations/faq/container-integration-event
[21]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[22]: /integrations/faq/elastic-agent-can-t-connect
[23]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[24]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[25]: /integrations/faq/haproxy-multi-process
[26]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[27]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[28]: /integrations/faq/collecting-composite-type-jmx-attributes
[29]: /integrations/faq/how-to-run-jmx-commands-in-windows
[30]: /integrations/faq/jmx-yaml-error-include-section
[31]: /integrations/faq/troubleshooting-jmx-integrations
[32]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[33]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[34]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[35]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[36]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[37]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[38]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[39]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[40]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[41]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[42]: /integrations/faq/connection-issues-with-the-sql-server-integration
[43]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[44]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[45]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[46]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[47]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[48]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[49]: /integrations/faq/database-user-lacks-privileges
[50]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[51]: /integrations/faq/postgres-custom-metric-collection-explained
[52]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[53]: /integrations/faq/redis-integration-error-unknown-command-config
[54]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[55]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[56]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[57]: /integrations/faq/how-to-make-trello-card-using-webhooks
[58]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[59]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[60]: /integrations/faq/windows-status-based-check
[61]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[62]: /integrations/faq/how-to-retrieve-wmi-metrics
