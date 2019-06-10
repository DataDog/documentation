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
* [Where are my ELB latency metrics?][5]
* [Get your AutoScaling Group events and metrics][6]
* [How do I pull my EC2 tags without using the AWS integration ?][7]
* [How do I monitor my AWS billing details?][8]
* [Extra hosts with name "N/A" reporting data][9]
* [Cloud Metric Delay][10]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][11]
* [Why is there a delay in receiving my data?][12]
* [Integration Setup for ECS Fargate][13]
* [Error: Datadog is not authorized to perform sts:AssumeRole][14]
* [The AWS Integration with Terraform][15]

## Apache

* [Issues with Apache Integration][16]
* [Apache SSL certificate issues][17]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][18]
* [Azure VMs are showing up in the App but not reporting metrics][19]
* [Azure VM status is not reporting][20]
* [Azure Troubleshooting][21]

## Docker

* [Compose and the Datadog Agent][22]
* [DogStatsD and Docker][23]
* [Container Integration Events][24]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][25]
* [Agent can't connect][26]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][27]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][28]

## HAProxy

* [HAProxy in multi-process mode][29]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][30]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][31]
* [Collecting Composite type JMX attributes][32]
* [How to run JMX commands in Windows?][33]
* [jmx.yaml error: Include Section][34]
* [Troubleshooting JMX Integrations][35]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][36]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][37]
* [JBoss EAP 7 & Datadog monitoring via JMX][38]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][39]

* [Agent failed to retrieve RMIServer stub][40]
* [Producer and Consumer metrics don't appear in my Datadog application][41]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][42]
* [Client Authentication against the apiserver and kubelet][43]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][44]
* [Using RBAC permission with your Kubernetes integration][45]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][46]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][47]
* [Can I use a named instance in the SQL Server integration?][48]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][49]
* [How to collect metrics from custom MySQL queries][50]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][51]
* [How can I collect more metrics from my SQL Server integration?][52]
* [Database user lacks privileges][53]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][54]

## Postgres
* [Postgres custom metric collection explained][55]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][56]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][57]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][58]

## Unix
* [How can I gather metrics from the UNIX shell?][59]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][60]

## Webhooks
* [How to make a Trello Card using Webhooks][61]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][62]
* [Collect Custom Windows Performance Counters over WMI][63]
* [Windows Status Based Check][64]
* [How to monitor events from the Windows Event Logs][65]
* [How to retrieve WMI metrics][66]

[1]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[2]: /integrations/faq/issues-getting-integrations-working
[3]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[4]: /integrations/faq/aws-integration-and-cloudwatch-faq
[5]: /integrations/faq/where-are-my-elb-latency-metrics
[6]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[7]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[8]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[9]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[10]: /integrations/faq/cloud-metric-delay
[11]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[12]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[13]: /integrations/faq/integration-setup-ecs-fargate
[14]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[15]: /integrations/faq/aws-integration-with-terraform
[16]: /integrations/faq/issues-with-apache-integration
[17]: /integrations/faq/apache-ssl-certificate-issues
[18]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[19]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[20]: /integrations/faq/azure-vm-status-is-not-reporting
[21]: /integrations/faq/azure-troubleshooting
[22]: /integrations/faq/compose-and-the-datadog-agent
[23]: /integrations/faq/dogstatsd-and-docker
[24]: /integrations/faq/container-integration-event
[25]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[26]: /integrations/faq/elastic-agent-can-t-connect
[27]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[28]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[29]: /integrations/faq/haproxy-multi-process
[30]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[31]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[32]: /integrations/faq/collecting-composite-type-jmx-attributes
[33]: /integrations/faq/how-to-run-jmx-commands-in-windows
[34]: /integrations/faq/jmx-yaml-error-include-section
[35]: /integrations/faq/troubleshooting-jmx-integrations
[36]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[37]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[38]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[39]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[40]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[41]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[42]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[43]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[44]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[45]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[46]: /integrations/faq/connection-issues-with-the-sql-server-integration
[47]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[48]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[49]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[50]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[51]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[52]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[53]: /integrations/faq/database-user-lacks-privileges
[54]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[55]: /integrations/faq/postgres-custom-metric-collection-explained
[56]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[57]: /integrations/faq/redis-integration-error-unknown-command-config
[58]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[59]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[60]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[61]: /integrations/faq/how-to-make-trello-card-using-webhooks
[62]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[63]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[64]: /integrations/faq/windows-status-based-check
[65]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[66]: /integrations/faq/how-to-retrieve-wmi-metrics
