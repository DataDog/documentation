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

## Amazon Web Services

* [Using Datadog's AWS Billing Integration to monitor your CloudWatch usage][1]
* [AWS Integration and CloudWatch FAQ][2]
* [Get your AutoScaling Group events and metrics][3]
* [How do I pull my EC2 tags without using the AWS integration ?][4]
* [How do I monitor my AWS billing details?][5]
* [Extra hosts with name "N/A" reporting data][6]
* [Cloud Metric Delay][7]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][8]
* [Why is there a delay in receiving my data?][9]
* [Integration Setup for ECS Fargate][10]
* [Error: Datadog is not authorized to perform sts:AssumeRole][11]
* [The AWS Integration with Terraform][12]

## Apache

* [Issues with Apache Integration][13]
* [Apache SSL certificate issues][14]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][15]
* [Azure VMs are showing up in the App but not reporting metrics][16]
* [Azure VM status is not reporting][17]
* [Azure Troubleshooting][18]

## Docker

* [Compose and the Datadog Agent][19]
* [DogStatsD and Docker][20]
* [Container Integration Events][21]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][22]
* [Agent can't connect][23]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][24]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][25]

## HAProxy

* [HAProxy in multi-process mode][26]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][27]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][28]
* [Collecting Composite type JMX attributes][29]
* [How to run JMX commands in Windows?][30]
* [jmx.yaml error: Include Section][31]
* [Troubleshooting JMX Integrations][32]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][33]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][34]
* [JBoss EAP 7 & Datadog monitoring via JMX][35]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][36]

* [Agent failed to retrieve RMIServer stub][37]
* [Producer and Consumer metrics don't appear in my Datadog application][38]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][39]
* [Client Authentication against the apiserver and kubelet][40]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][41]
* [Using RBAC permission with your Kubernetes integration][42]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][43]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][44]
* [Can I use a named instance in the SQL Server integration?][45]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][46]
* [How to collect metrics from custom MySQL queries][47]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][48]
* [How can I collect more metrics from my SQL Server integration?][49]
* [Database user lacks privileges][50]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][51]

## Postgres
* [Postgres custom metric collection explained][52]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][53]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][54]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][55]

## Unix
* [How can I gather metrics from the UNIX shell?][56]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][57]

## Webhooks
* [How to make a Trello Card using Webhooks][58]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][59]
* [Collect Custom Windows Performance Counters over WMI][60]
* [Windows Status Based Check][61]
* [How to monitor events from the Windows Event Logs][62]
* [How to retrieve WMI metrics][63]

[1]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[2]: /integrations/faq/aws-integration-and-cloudwatch-faq
[3]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[4]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[5]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[6]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[7]: /integrations/faq/cloud-metric-delay
[8]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[9]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[10]: /integrations/faq/integration-setup-ecs-fargate
[11]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[12]: /integrations/faq/aws-integration-with-terraform
[13]: /integrations/faq/issues-with-apache-integration
[14]: /integrations/faq/apache-ssl-certificate-issues
[15]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[16]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[17]: /integrations/faq/azure-vm-status-is-not-reporting
[18]: /integrations/faq/azure-troubleshooting
[19]: /integrations/faq/compose-and-the-datadog-agent
[20]: /integrations/faq/dogstatsd-and-docker
[21]: /integrations/faq/container-integration-event
[22]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[23]: /integrations/faq/elastic-agent-can-t-connect
[24]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[25]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[26]: /integrations/faq/haproxy-multi-process
[27]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[28]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[29]: /integrations/faq/collecting-composite-type-jmx-attributes
[30]: /integrations/faq/how-to-run-jmx-commands-in-windows
[31]: /integrations/faq/jmx-yaml-error-include-section
[32]: /integrations/faq/troubleshooting-jmx-integrations
[33]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[34]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[35]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[36]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[37]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[38]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[39]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[40]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[41]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[42]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[43]: /integrations/faq/connection-issues-with-the-sql-server-integration
[44]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[45]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[46]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[47]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[48]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[49]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[50]: /integrations/faq/database-user-lacks-privileges
[51]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[52]: /integrations/faq/postgres-custom-metric-collection-explained
[53]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[54]: /integrations/faq/redis-integration-error-unknown-command-config
[55]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[56]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[57]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[58]: /integrations/faq/how-to-make-trello-card-using-webhooks
[59]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[60]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[61]: /integrations/faq/windows-status-based-check
[62]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[63]: /integrations/faq/how-to-retrieve-wmi-metrics
