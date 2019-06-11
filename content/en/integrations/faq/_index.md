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
---

## General

* [What standard integrations emit custom metrics?][1]
* [Issues getting integrations working][2]

## Amazon Web Services

* [Using Datadog's AWS Billing Integration to monitor your CloudWatch usage][3]
* [AWS Integration and CloudWatch FAQ][4]
* [Get your AutoScaling Group events and metrics][5]
* [How do I pull my EC2 tags without using the AWS integration ?][6]
* [How do I monitor my AWS billing details?][7]
* [Extra hosts with name "N/A" reporting data][8]
* [Cloud Metric Delay][9]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][10]
* [Why is there a delay in receiving my data?][11]
* [Integration Setup for ECS Fargate][12]
* [Error: Datadog is not authorized to perform sts:AssumeRole][13]
* [The AWS Integration with Terraform][14]

## Apache

* [Issues with Apache Integration][15]
* [Apache SSL certificate issues][16]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][17]
* [Azure VMs are showing up in the App but not reporting metrics][18]
* [Azure VM status is not reporting][19]
* [Azure Troubleshooting][20]

## Docker

* [Compose and the Datadog Agent][21]
* [DogStatsD and Docker][22]
* [Container Integration Events][23]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][24]
* [Agent can't connect][25]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][26]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][27]

## HAProxy

* [HAProxy in multi-process mode][28]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][29]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][30]
* [Collecting Composite type JMX attributes][31]
* [How to run JMX commands in Windows?][32]
* [jmx.yaml error: Include Section][33]
* [Troubleshooting JMX Integrations][34]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][35]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][36]
* [JBoss EAP 7 & Datadog monitoring via JMX][37]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][38]

* [Agent failed to retrieve RMIServer stub][39]
* [Producer and Consumer metrics don't appear in my Datadog application][40]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][41]
* [Client Authentication against the apiserver and kubelet][42]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][43]
* [Using RBAC permission with your Kubernetes integration][44]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][45]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][46]
* [Can I use a named instance in the SQL Server integration?][47]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][48]
* [How to collect metrics from custom MySQL queries][49]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][50]
* [How can I collect more metrics from my SQL Server integration?][51]
* [Database user lacks privileges][52]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][53]

## Postgres
* [Postgres custom metric collection explained][54]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][55]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][56]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][57]

## Unix
* [How can I gather metrics from the UNIX shell?][58]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][59]

## Webhooks
* [How to make a Trello Card using Webhooks][60]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][61]
* [Collect Custom Windows Performance Counters over WMI][62]
* [Windows Status Based Check][63]
* [How to monitor events from the Windows Event Logs][64]
* [How to retrieve WMI metrics][65]

[1]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[2]: /integrations/faq/issues-getting-integrations-working
[3]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[4]: /integrations/faq/aws-integration-and-cloudwatch-faq
[5]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[6]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[7]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[8]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[9]: /integrations/faq/cloud-metric-delay
[10]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[11]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[12]: /integrations/faq/integration-setup-ecs-fargate
[13]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[14]: /integrations/faq/aws-integration-with-terraform
[15]: /integrations/faq/issues-with-apache-integration
[16]: /integrations/faq/apache-ssl-certificate-issues
[17]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[18]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[19]: /integrations/faq/azure-vm-status-is-not-reporting
[20]: /integrations/faq/azure-troubleshooting
[21]: /integrations/faq/compose-and-the-datadog-agent
[22]: /integrations/faq/dogstatsd-and-docker
[23]: /integrations/faq/container-integration-event
[24]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[25]: /integrations/faq/elastic-agent-can-t-connect
[26]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[27]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[28]: /integrations/faq/haproxy-multi-process
[29]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[30]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[31]: /integrations/faq/collecting-composite-type-jmx-attributes
[32]: /integrations/faq/how-to-run-jmx-commands-in-windows
[33]: /integrations/faq/jmx-yaml-error-include-section
[34]: /integrations/faq/troubleshooting-jmx-integrations
[35]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[36]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[37]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[38]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[39]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[40]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[41]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[42]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[43]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[44]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[45]: /integrations/faq/connection-issues-with-the-sql-server-integration
[46]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[47]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[48]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[49]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[50]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[51]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[52]: /integrations/faq/database-user-lacks-privileges
[53]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[54]: /integrations/faq/postgres-custom-metric-collection-explained
[55]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[56]: /integrations/faq/redis-integration-error-unknown-command-config
[57]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[58]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[59]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[60]: /integrations/faq/how-to-make-trello-card-using-webhooks
[61]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[62]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[63]: /integrations/faq/windows-status-based-check
[64]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[65]: /integrations/faq/how-to-retrieve-wmi-metrics
