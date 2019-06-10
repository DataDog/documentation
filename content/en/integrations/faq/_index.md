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
* [Does Datadog support AWS ALB (Application Load Balancer)?][6]
* [Get your AutoScaling Group events and metrics][7]
* [How do I pull my EC2 tags without using the AWS integration ?][8]
* [How do I monitor my AWS billing details?][9]
* [Extra hosts with name "N/A" reporting data][10]
* [Why is my AWS error count metric orders of magnitude lower in Datadog than Cloudwatch?][11]
* [Cloud Metric Delay][12]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][13]
* [Why is there a delay in receiving my data?][14]
* [Integration Setup for ECS Fargate][15]
* [Error: Datadog is not authorized to perform sts:AssumeRole][16]
* [The AWS Integration with Terraform][17]

## Apache

* [Issues with Apache Integration][18]
* [Apache SSL certificate issues][19]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][20]
* [Azure VMs are showing up in the App but not reporting metrics][21]
* [Azure VM status is not reporting][22]
* [Azure Troubleshooting][23]

## Docker

* [Compose and the Datadog Agent][24]
* [DogStatsD and Docker][25]
* [Container Integration Events][26]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][27]
* [Agent can't connect][28]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][29]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][30]

## HAProxy

* [HAProxy in multi-process mode][31]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][32]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][33]
* [Collecting Composite type JMX attributes][34]
* [How to run JMX commands in Windows?][35]
* [jmx.yaml error: Include Section][36]
* [Troubleshooting JMX Integrations][37]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][38]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][39]
* [JBoss EAP 7 & Datadog monitoring via JMX][40]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][41]

* [Agent failed to retrieve RMIServer stub][42]
* [Producer and Consumer metrics don't appear in my Datadog application][43]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][44]
* [Client Authentication against the apiserver and kubelet][45]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][46]
* [Using RBAC permission with your Kubernetes integration][47]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][48]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][49]
* [Can I use a named instance in the SQL Server integration?][50]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][51]
* [How to collect metrics from custom MySQL queries][52]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][53]
* [How can I collect more metrics from my SQL Server integration?][54]
* [Database user lacks privileges][55]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][56]

## Postgres
* [Postgres custom metric collection explained][57]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][58]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][59]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][60]

## Unix
* [How can I gather metrics from the UNIX shell?][61]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][62]

## Webhooks
* [How to make a Trello Card using Webhooks][63]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][64]
* [Collect Custom Windows Performance Counters over WMI][65]
* [Windows Status Based Check][66]
* [How to monitor events from the Windows Event Logs][67]
* [How to retrieve WMI metrics][68]

[1]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[2]: /integrations/faq/issues-getting-integrations-working
[3]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[4]: /integrations/faq/aws-integration-and-cloudwatch-faq
[5]: /integrations/faq/where-are-my-elb-latency-metrics
[6]: /integrations/faq/does-datadog-support-aws-alb-application-load-balancer
[7]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[8]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[9]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[10]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[11]: /integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch
[12]: /integrations/faq/cloud-metric-delay
[13]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[14]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[15]: /integrations/faq/integration-setup-ecs-fargate
[16]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[17]: /integrations/faq/aws-integration-with-terraform
[18]: /integrations/faq/issues-with-apache-integration
[19]: /integrations/faq/apache-ssl-certificate-issues
[20]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[21]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[22]: /integrations/faq/azure-vm-status-is-not-reporting
[23]: /integrations/faq/azure-troubleshooting
[24]: /integrations/faq/compose-and-the-datadog-agent
[25]: /integrations/faq/dogstatsd-and-docker
[26]: /integrations/faq/container-integration-event
[27]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[28]: /integrations/faq/elastic-agent-can-t-connect
[29]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[30]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[31]: /integrations/faq/haproxy-multi-process
[32]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[33]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[34]: /integrations/faq/collecting-composite-type-jmx-attributes
[35]: /integrations/faq/how-to-run-jmx-commands-in-windows
[36]: /integrations/faq/jmx-yaml-error-include-section
[37]: /integrations/faq/troubleshooting-jmx-integrations
[38]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[39]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[40]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[41]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[42]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[43]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[44]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[45]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[46]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[47]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[48]: /integrations/faq/connection-issues-with-the-sql-server-integration
[49]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[50]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[51]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[52]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[53]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[54]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[55]: /integrations/faq/database-user-lacks-privileges
[56]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[57]: /integrations/faq/postgres-custom-metric-collection-explained
[58]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[59]: /integrations/faq/redis-integration-error-unknown-command-config
[60]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[61]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[62]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[63]: /integrations/faq/how-to-make-trello-card-using-webhooks
[64]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[65]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[66]: /integrations/faq/windows-status-based-check
[67]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[68]: /integrations/faq/how-to-retrieve-wmi-metrics
