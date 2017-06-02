---
title: Billing FAQ
kind: documentation
external_redirect: https://help.datadoghq.com/hc/en-us/sections/200705969-Billing/
---
We occasionally receive questions regarding the specifics of our pricing; the basic plans and the most frequently seen questions can be found below.

## Plan Overview

There are three plans within Datadog:


1. **Free** is only for 5 hosts or less. Free has a single day of data retention. The
    good news is that switching from the Free plan to Pro will not affect your
    setup, so anything you've begun monitoring would not be affected by that status
    change.
1. **Pro** is for 6-999 hosts and comes with 13 months of data retention.
    Pro includes metric alerts and email support.
1. **Enterprise** is for 1,000+ hosts or any number of hosts but needing custom adjustments to what is
    offered in the Pro plan. Enterprise includes phone support and pricing is based on three factors:
    1. Data retention requirements and number of custom metrics (base plan includes 13 months retention,
and 100 custom metrics)
    1. Size of your environment in servers
    1. Payment terms (month to month or annual prepaid)


Custom metrics are supported in every plan. A custom metric is any metric that is not automatically collected by any of [Datadog’s integrations](https://www.datadoghq.com/product/integrations/)—for example custom checks or API-level metrics from your application. Each host may submit up to 100 custom metrics at no additional cost.

Docker Containers are also supported in every plan. Each host may submit metrics from 10 containers an hour at no additional cost. Additional containers will be billed at $0.002 per container per hour. In addition, Enterprise customers can purchase prepaid containers at $1 per container per month.

Pro and Enterprise data retention is for 13 months at full resolution (maximum is one point per second). For greater data retention needs, please reach out to [sales@datadoghq.com](mailto:sales@datadoghq.com).

**Each invoice is determined by the high watermark of concurrently running hosts for that month.**

This is per active host in Datadog, whether or not it's running the agent.

## Frequently Asked Questions

**Do you support hourly pricing?**
{:#do-you-support-hourly-pricing}

Yes. Our standard hourly rate for Datadog Pro is $0.03 per host per hour. You
can choose to pay for all of your monitored hosts hourly, or commit to a subset
of hosts upfront on a monthly or annual plan and pay any additional hosts on an
hourly basis, billed at the end of each month. This works out to be much less
expensive for extra hosts that may come up for a short period, but a bit more
than monthly/annual rates if you ran on an hourly rate all the time.


**Do non-reporting or inactive hosts count?**
{:#do-non-reporting-or-inactive-hosts-count}

Non-reporting hosts (status '???') do not count towards billing. It might take
some time (up to 24 hours) for the hosts with the inactive status '???' to drop
out of the infrastructure view.

A transient server that you monitored in Datadog for a short period of time
will clear out of the infrastructure view after 24 hours of not reporting any
data. We will still however retain the historical data (for a paid account),
and you can graph it on a dashboard if you know the specific host by name (or
by its tags).


**How will an AWS integration impact my monthly billing?**
{:#how-will-an-aws-integration-impact-my-monthly-billing}

We bill for all hosts running the **Agent** as well as for all **EC2 instances**
picked up by the AWS integration. You will not get billed twice if
you are running the Agent on an EC2 instance picked up by the AWS
integration.

Other AWS resources (e.g. ELB, EBS, RDS, Dynamo) are not currently
part of monthly billing. Note that this may change in the future.

If you would like to control which AWS metrics you are collecting,
select 'limit metric collection for all accounts' in the
[AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services) and customize accordingly.

**How will a VMware integration impact my monthly billing?**
{:#how-will-a-vmware-integration-impact-my-monthly-billing}

The base pricing is $15 per virtual machine per month. See above for more general information.


**How do I see what I'll get charged for this current month?**
{:#how-do-i-see-what-ill-get-charged-for-this-current-month}

There is not currently a way to see what the upcoming bill looks like; as an
admin you can [review past invoices here](https://app.datadoghq.com/account/billing_history).


**Can I set a specific email address to receive invoices at?**
{:#can-i-set-a-specific-email-address-to-receive-invoices-at}

You can [set a specific email address to receive invoices here](https://app.datadoghq.com/account/billing), even if that address
is not a team member within Datadog (eg. `invoices@yourcompany.com`).

