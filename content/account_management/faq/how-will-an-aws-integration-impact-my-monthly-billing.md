---
title: How will an AWS integration impact my monthly billing?
kind: faq
customnav: accountmanagementnav
---

We bill for all hosts running the Agent as well as for all EC2 instances picked up by the AWS integration. You will not get billed twice if you are running the Agent on an EC2 instance picked up by the AWS integration.

Other AWS resources (e.g. ELB, EBS, RDS, Dynamo) are not currently part of monthly billing. Note that this may change in the future.

If you would like to control which AWS metrics you are collecting, select ‘limit metric collection for all accounts’ in the [AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services) and customize accordingly.