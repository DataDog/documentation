---
title: FAQ Integrations
kind: faq
private: true
disable_toc: true
aliases:
    - /integrations/faq/how-can-i-gather-metrics-from-the-unix-shell
    - /integrations/faq/what-is-a-custom-metric-and-what-is-the-limit-on-the-number-of-custom-metrics-i-can-have
---

## General

* [What standard integrations emit custom metrics?][1]

* [Service checks is deprecated in favor of monitors][2]
* [Issues getting integrations working][3]

## Amazon Web Services

* [How can I monitor the health/status of my RDS instances?][4]
* [Using Datadog's AWS Billing Integration to monitor your CloudWatch usage][5]
* [AWS Integration and CloudWatch FAQ][6]
* [Why am I only seeing the average values of my custom AWS/Cloudwatch metrics?][7]
* [Where are my ELB latency metrics?][8]
* [I removed my AWS EC2 integration. Why do my hosts still have AWS tags?s][9]
* [Does Datadog support AWS ALB (Application Load Balancer)?][10]
* [Get your AutoScaling Group events and metrics][11]
* [How do I pull my EC2 tags without using the AWS integration ?][12]
* [Additional AWS Metrics - Min/Max/Sum][13]
* [How do I monitor my AWS billing details?][14]
* [Extra hosts with name "N/A" reporting data][15]
* [Wrong count of aws.elb.healthy_host_count?][16]
* [Why is my AWS error count metric orders of magnitude lower in Datadog than Cloudwatch?][17]
* [Cloud Metric Delay][18]
* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][19]
* [I think I'm missing some of my CloudTrail events?][20]
* [Why is there a delay in receiving my data?][21]
* [I can't filter out my ELB instances - will I be charged for them?][22]
* [I just set up my AWS integration. Why am I seeing duplicate hosts?][23]
* [Integration Setup for ECS Fargate][24]
* [Error: Datadog is not authorized to perform sts:AssumeRole][25]
* [The AWS Integration with Terraform][26]

## Apache

* [Issues with Apache Integration][27]
* [Apache SSL certificate issues][28]

## Azure
* [My Azure VM is powered down... why is it still listed in my infrastructure list?][29]
* [Azure VMs are showing up in the App but not reporting metrics][30]
* [Azure VM status is not reporting][31]
* [Azure Troubleshooting][32]

## Docker

* [Compose and the Datadog Agent][33]
* [DogStatsD and Docker][34]
* [Docker, ECS, & Kubernetes Events][35]

## Elasticsearch

* [Why isn't Elasticsearch sending all my metrics?][36]
* [Agent can't connect][37]

## Git & GitHub

* [Why events don't appear to be showing up in the event stream with my github integration ?][38]

## Hadoop
* [Hadoop Distributed File System (HDFS) Integration Error][39]

## HAProxy

* [HAProxy in multi-process mode][40]

## Jira
* [I've set up the JIRA integration, now how do I get events and tickets created?][41]

## JMX

* [I Have a Matching Bean for my JMX integration but nothing on Collect !][42]
* [Collecting Composite type JMX attributes][43]
* [How to run JMX commands in Windows?][44]
* [jmx.yaml error: Include Section][45]
* [Troubleshooting JMX Integrations][46]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][47]
* [Both my JMX and AWS integrations use "name" tags. What do I do?][48]
* [JBoss EAP 7 & Datadog monitoring via JMX][49]

## Kafka

* [Troubleshooting and Deep Dive for Kafka][50]

* [Agent failed to retrieve RMIServer stub][51]
* [Producer and Consumer metrics don't appear in my Datadog application][52]

## Kubernetes

* [Can I install the Agent on my Kubernetes master node(s)][53]
* [Client Authentication against the apiserver and kubelet][54]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][55]
* [Using RBAC permission with your Kubernetes integration][56]

## MySQL & SQL

* [Connection Issues with the SQL Server Integration][57]
* [MySQL Localhost Error - Localhost VS 127.0.0.1][58]
* [Can I use a named instance in the SQL Server integration?][59]
* [Can I set up the `dd-agent` mysql check on my Google CloudSQL?][60]
* [How to collect metrics from custom MySQL queries][61]
* [Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table? Try WMI][62]
* [How can I collect more metrics from my SQL Server integration?][63]
* [Database user lacks privileges][64]

## Network
* [How to send TCP/UDP host metrics via the Datadog API ?][65]

## Postgres
* [Postgres custom metric collection explained][66]

## RabbitMQ

* [Tagging RabbitMQ queues by tag family][67]

## Redis

* [Redis Integration Error: "unknown command 'CONFIG'"][68]

## SNMP

* [For SNMP, does Datadog have a list of commonly used/compatible OIDs?  ][69]

## Unix
* [How can I gather metrics from the UNIX shell?][70]

## VMWare
* [Can I limit the number of VMs that are pulled in via the VMWare integration?][71]

## Webhooks
* [How to make a Trello Card using Webhooks][72]

## Windows

* [How to add event log files to the `Win32_NTLogEvent` WMI class][73]
* [Collect Custom Windows Performance Counters over WMI][74]
* [Windows Status Based Check][75]
* [How to monitor events from the Windows Event Logs][76]
* [How to retrieve WMI metrics][77]

[1]: /integrations/faq/what-standard-integrations-emit-custom-metrics
[2]: /integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors
[3]: /integrations/faq/issues-getting-integrations-working
[4]: /integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances
[5]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[6]: /integrations/faq/aws-integration-and-cloudwatch-faq
[7]: /integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics
[8]: /integrations/faq/where-are-my-elb-latency-metrics
[9]: /integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags
[10]: /integrations/faq/does-datadog-support-aws-alb-application-load-balancer
[11]: /integrations/faq/get-your-autoscaling-group-events-and-metrics
[12]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[13]: /integrations/faq/additional-aws-metrics-min-max-sum
[14]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
[15]: /integrations/faq/extra-hosts-with-name-n-a-reporting-data
[16]: /integrations/faq/wrong-count-of-aws-elb-healthy-host-count
[17]: /integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch
[18]: /integrations/faq/cloud-metric-delay
[19]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[20]: /integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events
[21]: /integrations/faq/why-is-there-a-delay-in-receiving-my-data
[22]: /integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them
[23]: /integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
[24]: /integrations/faq/integration-setup-ecs-fargate
[25]: /integrations/faq/error-datadog-not-authorized-sts-assume-role
[26]: /integrations/faq/aws-integration-with-terraform
[27]: /integrations/faq/issues-with-apache-integration
[28]: /integrations/faq/apache-ssl-certificate-issues
[29]: /integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
[30]: /integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
[31]: /integrations/faq/azure-vm-status-is-not-reporting
[32]: /integrations/faq/azure-troubleshooting
[33]: /integrations/faq/compose-and-the-datadog-agent
[34]: /integrations/faq/dogstatsd-and-docker
[35]: /integrations/faq/docker-ecs-kubernetes-events
[36]: /integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[37]: /integrations/faq/elastic-agent-can-t-connect
[38]: /integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration
[39]: /integrations/faq/hadoop-distributed-file-system-hdfs-integration-error
[40]: /integrations/faq/haproxy-multi-process
[41]: /integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created
[42]: /integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
[43]: /integrations/faq/collecting-composite-type-jmx-attributes
[44]: /integrations/faq/how-to-run-jmx-commands-in-windows
[45]: /integrations/faq/jmx-yaml-error-include-section
[46]: /integrations/faq/troubleshooting-jmx-integrations
[47]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[48]: /integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do
[49]: /integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx
[50]: /integrations/faq/troubleshooting-and-deep-dive-for-kafka
[51]: /integrations/faq/agent-failed-to-retrieve-rmierver-stub
[52]: /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[53]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[54]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[55]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[56]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[57]: /integrations/faq/connection-issues-with-the-sql-server-integration
[58]: /integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[59]: /integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[60]: /integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[61]: /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[62]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[63]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[64]: /integrations/faq/database-user-lacks-privileges
[65]: /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[66]: /integrations/faq/postgres-custom-metric-collection-explained
[67]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family
[68]: /integrations/faq/redis-integration-error-unknown-command-config
[69]: /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[70]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[71]: /integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[72]: /integrations/faq/how-to-make-trello-card-using-webhooks
[73]: /integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[74]: /integrations/faq/collect-custom-windows-performance-counters-over-wmi
[75]: /integrations/faq/windows-status-based-check
[76]: /integrations/faq/how-to-monitor-events-from-the-windows-event-logs
[77]: /integrations/faq/how-to-retrieve-wmi-metrics
