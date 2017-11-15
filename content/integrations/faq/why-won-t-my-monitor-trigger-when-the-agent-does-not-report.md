---
title: Why won't my monitor trigger when the Agent does not report ? 
kind: faq
customnav: integrationsnav
---

In some cases, [Host Monitor](/monitors/monitor_types/host) will get muted if the Host is manually stopped. 

## How can I see that ?

Without explicitly muting a monitor, stopping the Agent / a Host will look something similar to this :
{{< img src="integrations/faq/monitor_host_muted.png" alt="monitor_host_muted" responsive="true" >}}

## Why is this Happening ? 

* The servers are hosted in AWS
* They have the Agent installed on them 
* The AWS integration is set up, even if that specific host is part of the excluded hosts from the Optionally Limit Metrics Collection scope
* The EC2 automuting box is checked 
{{< img src="integrations/faq/aws_ec2_automuting.png" alt="aws_ec2_automuting" responsive="true" >}}


## What if I want to be alerted when the Agent stops reporting on such hosts ? 

For the servers that are out of the AWS scope but are still hosted in AWS, we can cancel that EC2 automuting upon request to support@datadoghq.com . 
