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

* [How can I monitor the health/status of my RDS instances?][3]
* [Using Datadog's AWS Billing Integration to monitor your CloudWatch usage][4]
* [AWS Integration and CloudWatch FAQ][5]
* [Where are my ELB latency metrics?][6]
* [Does Datadog support AWS ALB (Application Load Balancer)?][7]
* [How do I pull my EC2 tags without using the AWS integration ?][8]
* [How do I monitor my AWS billing details?][9]
* [Extra hosts with name "N/A" reporting data][10]
* [Wrong count of aws.elb.healthy_host_count?][11]
* [Why is my AWS error count metric orders of magnitude lower in Datadog than Cloudwatch?][12]
* [Cloud Metric Delay][13]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][14]
* [Why is there a delay in receiving my data?][15]
* [Integration Setup for ECS Fargate][16]
* [Error: Datadog is not authorized to perform sts:AssumeRole][17]
* [The AWS Integration with Terraform][18]

## Apache

* [Issues with Apache Integration][19]
* [Apache SSL certificate issues][20]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][21]
* [Azure VMs are showing up in the App but not reporting metrics][22]
* [Azure VM status is not reporting][23]
* [Azure Troubleshooting][24]

## Docker

* [Compose and the Datadog Agent][25]
* [DogStatsD and Docker][26]
* [Container Integration Events][27]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][28]
* [Agent can't connect][29]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][30]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][31]

## HAProxy

* [HAProxy in multi-process mode][32]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][33]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][34]
* [Collecting Composite type JMX attributes][35]
* [How to run JMX commands in Windows?][36]
* [jmx.yaml error: Include Section][37]
* [Troubleshooting JMX Integrations][38]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][39]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][40]
* [JBoss EAP 7 & Datadog monitoring via JMX][41]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][42]

* [Agent failed to retrieve RMIServer stub][43]
* [Producer and Consumer metrics don't appear in my Datadog application][44]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][45]
* [Client Authentication against the apiserver and kubelet][46]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][47]
* [Using RBAC permission with your Kubernetes integration][48]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][49]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][50]
* [Can I use a named instance in the SQL Server integration?][51]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][52]
* [How to collect metrics from custom MySQL queries][53]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table?][54]
* [How can I collect more metrics from my SQL Server integration?][55]
* [Database user lacks privileges][56]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][57]

## Postgres
* [Postgres custom metric collection explained][58]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][59]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][60]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][61]

## Unix
* [How can I gather metrics from the UNIX shell?][62]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][63]

## Webhooks
* [How to make a Trello Card using Webhooks][64]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][65]
* [Collect Custom Windows Performance Counters over WMI][66]
* [Windows Status Based Check][67]
* [How to monitor events from the Windows Event Logs][68]
* [How to retrieve WMI metrics][69]

[1]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[2]: /integrations/faq/issues-getting-integrations-working
[3]: /integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances
[4]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[5]: /integrations/faq/aws-integration-and-cloudwatch-faq
[6]: /integrations/faq/where-are-my-elb-latency-metrics
[7]: /integrations/faq/does-datadog-support-aws-alb-application-load-balancer
[8]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[9]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[10]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[11]: /integrations/faq/wrong-count-of-aws-elb-healthy-host-count
[12]: /integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch
[13]: /integrations/faq/cloud-metric-delay
[14]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[15]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[16]: /integrations/faq/integration-setup-ecs-fargate
[17]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[18]: /integrations/faq/aws-integration-with-terraform
[19]: /integrations/faq/issues-with-apache-integration
[20]: /integrations/faq/apache-ssl-certificate-issues
[21]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[22]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[23]: /integrations/faq/azure-vm-status-is-not-reporting
[24]: /integrations/faq/azure-troubleshooting
[25]: /integrations/faq/compose-and-the-datadog-agent
[26]: /integrations/faq/dogstatsd-and-docker
[27]: /integrations/faq/container-integration-event
[28]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[29]: /integrations/faq/elastic-agent-can-t-connect
[30]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[31]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[32]: /integrations/faq/haproxy-multi-process
[33]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[34]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[35]: /integrations/faq/collecting-composite-type-jmx-attributes
[36]: /integrations/faq/how-to-run-jmx-commands-in-windows
[37]: /integrations/faq/jmx-yaml-error-include-section
[38]: /integrations/faq/troubleshooting-jmx-integrations
[39]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[40]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[41]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[42]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[43]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[44]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[45]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[46]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[47]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[48]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[49]: /integrations/faq/connection-issues-with-the-sql-server-integration
[50]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[51]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[52]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[53]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[54]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[55]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[56]: /integrations/faq/database-user-lacks-privileges
[57]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[58]: /integrations/faq/postgres-custom-metric-collection-explained
[59]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[60]: /integrations/faq/redis-integration-error-unknown-command-config
[61]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[62]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[63]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[64]: /integrations/faq/how-to-make-trello-card-using-webhooks
[65]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[66]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[67]: /integrations/faq/windows-status-based-check
[68]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[69]: /integrations/faq/how-to-retrieve-wmi-metrics
