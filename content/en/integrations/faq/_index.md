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
* [Get your AutoScaling Group events and metrics][8]
* [How do I pull my EC2 tags without using the AWS integration ?][9]
* [How do I monitor my AWS billing details?][10]
* [Extra hosts with name "N/A" reporting data][11]
* [Wrong count of aws.elb.healthy_host_count?][12]
* [Why is my AWS error count metric orders of magnitude lower in Datadog than Cloudwatch?][13]
* [Cloud Metric Delay][14]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][15]
* [Why is there a delay in receiving my data?][16]
* [Integration Setup for ECS Fargate][17]
* [Error: Datadog is not authorized to perform sts:AssumeRole][18]
* [The AWS Integration with Terraform][19]

## Apache

* [Issues with Apache Integration][20]
* [Apache SSL certificate issues][21]

## Azure
* [My Azure VM is powered down. Why is it still listed in my infrastructure list?][22]
* [Azure VMs are showing up in the App but not reporting metrics][23]
* [Azure VM status is not reporting][24]
* [Azure Troubleshooting][25]

## Docker

* [Compose and the Datadog Agent][26]
* [DogStatsD and Docker][27]
* [Container Integration Events][28]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][29]
* [Agent can't connect][30]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][31]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][32]

## HAProxy

* [HAProxy in multi-process mode][33]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][34]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][35]
* [Collecting Composite type JMX attributes][36]
* [How to run JMX commands in Windows?][37]
* [jmx.yaml error: Include Section][38]
* [Troubleshooting JMX Integrations][39]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][40]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][41]
* [JBoss EAP 7 & Datadog monitoring via JMX][42]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][43]

* [Agent failed to retrieve RMIServer stub][44]
* [Producer and Consumer metrics don't appear in my Datadog application][45]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][46]
* [Client Authentication against the apiserver and kubelet][47]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][48]
* [Using RBAC permission with your Kubernetes integration][49]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][50]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][51]
* [Can I use a named instance in the SQL Server integration?][52]
* [Can I set up the dd-agent MySQL check on my Google CloudSQL?][53]
* [How to collect metrics from custom MySQL queries][54]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table? Try WMI][55]
* [How can I collect more metrics from my SQL Server integration?][56]
* [Database user lacks privileges][57]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][58]

## Postgres
* [Postgres custom metric collection explained][59]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][60]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][61]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][62]

## Unix
* [How can I gather metrics from the UNIX shell?][63]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][64]

## Webhooks
* [How to make a Trello Card using Webhooks][65]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][66]
* [Collect Custom Windows Performance Counters over WMI][67]
* [Windows Status Based Check][68]
* [How to monitor events from the Windows Event Logs][69]
* [How to retrieve WMI metrics][70]

[1]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[2]: /integrations/faq/issues-getting-integrations-working
[3]: /integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances
[4]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[5]: /integrations/faq/aws-integration-and-cloudwatch-faq
[6]: /integrations/faq/where-are-my-elb-latency-metrics
[7]: /integrations/faq/does-datadog-support-aws-alb-application-load-balancer
[8]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[9]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[10]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[11]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[12]: /integrations/faq/wrong-count-of-aws-elb-healthy-host-count
[13]: /integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch
[14]: /integrations/faq/cloud-metric-delay
[15]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[16]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[17]: /integrations/faq/integration-setup-ecs-fargate
[18]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[19]: /integrations/faq/aws-integration-with-terraform
[20]: /integrations/faq/issues-with-apache-integration
[21]: /integrations/faq/apache-ssl-certificate-issues
[22]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[23]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[24]: /integrations/faq/azure-vm-status-is-not-reporting
[25]: /integrations/faq/azure-troubleshooting
[26]: /integrations/faq/compose-and-the-datadog-agent
[27]: /integrations/faq/dogstatsd-and-docker
[28]: /integrations/faq/container-integration-event
[29]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[30]: /integrations/faq/elastic-agent-can-t-connect
[31]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[32]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[33]: /integrations/faq/haproxy-multi-process
[34]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[35]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[36]: /integrations/faq/collecting-composite-type-jmx-attributes
[37]: /integrations/faq/how-to-run-jmx-commands-in-windows
[38]: /integrations/faq/jmx-yaml-error-include-section
[39]: /integrations/faq/troubleshooting-jmx-integrations
[40]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[41]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[42]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[43]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[44]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[45]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[46]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[47]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[48]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[49]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[50]: /integrations/faq/connection-issues-with-the-sql-server-integration
[51]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[52]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[53]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[54]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[55]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[56]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[57]: /integrations/faq/database-user-lacks-privileges
[58]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[59]: /integrations/faq/postgres-custom-metric-collection-explained
[60]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[61]: /integrations/faq/redis-integration-error-unknown-command-config
[62]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[63]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[64]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[65]: /integrations/faq/how-to-make-trello-card-using-webhooks
[66]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[67]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[68]: /integrations/faq/windows-status-based-check
[69]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[70]: /integrations/faq/how-to-retrieve-wmi-metrics
