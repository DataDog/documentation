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
* [Cloud Metric Delay][11]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][12]
* [Why is there a delay in receiving my data?][13]
* [Integration Setup for ECS Fargate][14]
* [Error: Datadog is not authorized to perform sts:AssumeRole][15]
* [The AWS Integration with Terraform][16]

## Apache

* [Issues with Apache Integration][17]
* [Apache SSL certificate issues][18]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][19]
* [Azure VMs are showing up in the App but not reporting metrics][20]
* [Azure VM status is not reporting][21]
* [Azure Troubleshooting][22]

## Docker

* [Compose and the Datadog Agent][23]
* [DogStatsD and Docker][24]
* [Container Integration Events][25]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][26]
* [Agent can't connect][27]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][28]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][29]

## HAProxy

* [HAProxy in multi-process mode][30]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][31]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][32]
* [Collecting Composite type JMX attributes][33]
* [How to run JMX commands in Windows?][34]
* [jmx.yaml error: Include Section][35]
* [Troubleshooting JMX Integrations][36]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][37]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][38]
* [JBoss EAP 7 & Datadog monitoring via JMX][39]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][40]

* [Agent failed to retrieve RMIServer stub][41]
* [Producer and Consumer metrics don't appear in my Datadog application][42]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][43]
* [Client Authentication against the apiserver and kubelet][44]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][45]
* [Using RBAC permission with your Kubernetes integration][46]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][47]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][48]
* [Can I use a named instance in the SQL Server integration?][49]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][50]
* [How to collect metrics from custom MySQL queries][51]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][52]
* [How can I collect more metrics from my SQL Server integration?][53]
* [Database user lacks privileges][54]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][55]

## Postgres
* [Postgres custom metric collection explained][56]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][57]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][58]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][59]

## Unix
* [How can I gather metrics from the UNIX shell?][60]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][61]

## Webhooks
* [How to make a Trello Card using Webhooks][62]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][63]
* [Collect Custom Windows Performance Counters over WMI][64]
* [Windows Status Based Check][65]
* [How to monitor events from the Windows Event Logs][66]
* [How to retrieve WMI metrics][67]

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
[11]: /integrations/faq/cloud-metric-delay
[12]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[13]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[14]: /integrations/faq/integration-setup-ecs-fargate
[15]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[16]: /integrations/faq/aws-integration-with-terraform
[17]: /integrations/faq/issues-with-apache-integration
[18]: /integrations/faq/apache-ssl-certificate-issues
[19]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[20]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[21]: /integrations/faq/azure-vm-status-is-not-reporting
[22]: /integrations/faq/azure-troubleshooting
[23]: /integrations/faq/compose-and-the-datadog-agent
[24]: /integrations/faq/dogstatsd-and-docker
[25]: /integrations/faq/container-integration-event
[26]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[27]: /integrations/faq/elastic-agent-can-t-connect
[28]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[29]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[30]: /integrations/faq/haproxy-multi-process
[31]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[32]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[33]: /integrations/faq/collecting-composite-type-jmx-attributes
[34]: /integrations/faq/how-to-run-jmx-commands-in-windows
[35]: /integrations/faq/jmx-yaml-error-include-section
[36]: /integrations/faq/troubleshooting-jmx-integrations
[37]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[38]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[39]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[40]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[41]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[42]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[43]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[44]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[45]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[46]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[47]: /integrations/faq/connection-issues-with-the-sql-server-integration
[48]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[49]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[50]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[51]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[52]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[53]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[54]: /integrations/faq/database-user-lacks-privileges
[55]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[56]: /integrations/faq/postgres-custom-metric-collection-explained
[57]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[58]: /integrations/faq/redis-integration-error-unknown-command-config
[59]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[60]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[61]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[62]: /integrations/faq/how-to-make-trello-card-using-webhooks
[63]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[64]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[65]: /integrations/faq/windows-status-based-check
[66]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[67]: /integrations/faq/how-to-retrieve-wmi-metrics
