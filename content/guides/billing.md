---
title: Billing FAQ
kind: documentation
sidebar:
  nav:
    - header: Guides
    - text: Getting Started with the Agent
      href: "/guides/basic_agent_usage/"
    - text: Datadog Overview
      href: "/overview/"
    - text: Sending App Metrics
      href: "/guides/metrics/"
    - text: Log Parsing in the Agent
      href: "/guides/logs/"
    - text: Writing an Agent Check
      href: "/guides/agent_checks/"
    - text: Setting up Service Checks
      href: "/guides/services_checks/"
    - text: Deploying the Agent with Chef
      href: "/guides/chef/"
    - text: Guide to Monitoring
      href: "/guides/monitoring/"
    - text: Billing FAQ
      href: "/guides/billing/"
    - header: References
    - text: API
      href: "/api/"
    - text: Libraries
      href: "/libraries/"
    - text: Graphing
      href: "/graphing/"
    - text: Host Names
      href: "/hostnames/"
    - text: Integrations
      href: "/integrations/"
    - text: DogStatsD
      href: "/guides/dogstatsd/"
---
#### Welcome to Datadog! We occasionally receive questions regarding the specifics
of our pricing; the basic plans and the most frequently seen questions can be
found below.

#### <u>Basic Plan</u>

There are three plans within Datadog:


1. **Free** is only for 5 hosts or less. Free has a single day of data retention. The
    good news is that switching from the Free plan to Pro will not affect your
    setup, so anything you've begun monitoring would not be affected by that status
    change.
1. **Pro** is for 6-499 hosts and comes with 13 months of data retention.
    Pro includes metric alerts and email support.
1. **Enterprise** is for
    500+ hosts or any number of hosts but needing custom adjustments to what is
    offered in the Pro plan. Enterprise includes phone support and pricing is based on three factors:
    1. Data retention requirements and number of custom metrics (base plan includes 13 months retention,
and 100 custom metrics)
    1. Size of your environment in servers
    1. Payment terms (month to month or annual prepaid)
  


For all plans, custom metrics and events are supported but limited to 100
metrics per host. Custom metrics refer to any metrics that are not part of our
regular integration suite, for example using custom checks or API-level metrics
in your application stack. To clarify, integrations that can potentially emit
an unlimited number of metrics to us can also count as custom metrics (e.g:
JMX / WMI / Nagios / Cacti).

For all plans, Docker Containers are supported and 10 free containers per host per hour will be provided.  Additional containers will be billed at $0.002 per container per hour.  In addition, Enterprise customers can purchase prepaid containers at $1 per container per month.

Pro and Enterprise data retention is for 13 months at full resolution (maximum
is one point per second). For greater data retention needs, please reach out to <a href="mailto:sales@datadoghq.com">
sales@datadoghq.com</a>.

##### Each invoice is determined by the high watermark of concurrently running hosts for that month.

This is per active host in Datadog, whether or not it's running the agent.

####<u>Frequently Asked Questions</u>

#####Do you support hourly pricing?

We do support hourly pricing at $0.03 per hour per host or a hybrid
of monthly and hourly. Here is how that hybrid works:

> You tell us how many hosts you will run each month and we will bill you for that baseline number of
> hosts at $15 per host (you can change this number at the beginning of each
> month if you like). Then for any hosts beyond the committed number previously
> determined, our billing system will charge you $0.03 per host per hour. This
> works out to be much less expensive for extra hosts that may come up for a
> short period, but a little bit more than monthly rates if you ran on an hourly
> rate all the time (~$23/host/month).  The metering samples how many hosts are
> reporting data once every hour, thus the minimum increment for an hourly server
> is one hour. If that number exceeds your monthly commit, we just charge overage
> for the excess hosts.

##### Do non-reporting or inactive hosts count?

Non-reporting hosts (status '???') do not count towards billing. It might take
some time (up to 24 hours) for the hosts with the inactive status '???' to drop
out of the infrastructure view.

A transient server that you monitored in Datadog for a short period of time
will clear out of the infrastructure view after 24 hours of not reporting any
data. We will still however retain the historical data (for a paid account),
and you can graph it on a dashboard if you know the specific host by name (or
by its tags).


##### How will an AWS integration impact my monthly billing?

We bill for all hosts running the **Agent** as well as for all **EC2 instances**
picked up by the AWS integration. You will not get billed twice if
you are running the Agent on an EC2 instance picked up by the AWS
integration.

Other AWS resources (e.g. ELB, EBS, RDS, Dynamo) are not currently
part of monthly billing. Note that this may change in the future.

If you would like to control which AWS metrics you are collecting,
select 'limit metric collection for all accounts' in the <a href="https://app.datadoghq.com/account/settings#integrations/amazon_web_services"> AWS Integration tile</a> and customize accordingly.

##### How will a VMware integration impact my monthly billing?


The base pricing is $15 per virtual machine per month. See above for more general information.


##### How will Docker and other container integrations impact my monthly billing?

The base pricing of $15 per host includes 10 containers. Additional containers cost $1 per container.


##### How do I see what I'll get charged for this current month?

There is not currently a way to see what the upcoming bill looks like; as an
admin you can check out past invoices
<a href="https://app.datadoghq.com/account/billing_history">here</a>.


##### Can I set a specific email address to receive invoices at?


You can set a specific email address to receive invoices, even if that address
is not a team member within Datadog (invoices@yourcompany.com)
<a href="https://app.datadoghq.com/account/billing">here</a>.

