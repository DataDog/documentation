---
title: I removed my AWS EC2 integration. Why do my hosts still have AWS tags?
kind: faq
---

## How this can happen:

You can use the EC2 flavor of the [Amazon Web Services integration][1] to collect performance data from CloudWatch pertaining to your EC2 instances. You can also collect performance data from EC2 instances by [installing a Datadog Agent][2] on them. For several reasons, many users prefer to collect performance data from their EC2 instances using [both of these methods][3]. In this case, datadog's backend merges the data from both these sources to the same "host" object in your Datadog account (this merging can take a little time but [completes within a few hours][4]).

If at some point you decide to remove the AWS integration for one of your EC2s but continue to run a Datadog Agent on that host, the host in your Datadog account continues to have the old host-tags associated with it that were collected from AWS. This is intended behavior, and it does not indicate that the AWS EC2 integration is still enabled for that host. (To verify that, from your metric explorer you can make sure that your EC2 metrics are not being tagged with that hostname, or not being collected at all.)

## What can be done to remove these tags:

Continuing to have these AWS host-tags associated with these hosts is often not considered problematic by our users, and is sometimes even preferred (some users even like to [collect AWS host tags][5] from Datadog Agents while not running the AWS EC2 integration). But if you prefer to have these AWS host-tags removed from these hosts, you can do this by using our ["Tags" API endpoint][6].

For added convenience, one of our engineers has made available a python script that can be easily used to remove all AWS host-tags from either some or all of the hosts in your account. You can find [this python script here][7]. (Do note that you have to edit certain variables in this script for it to work, such as api_key and application_key)

[1]: /integrations/amazon_web_services
[2]: /agent
[3]: /agent/#why-should-i-install-the-agent-on-my-aws-instances
[4]: /integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
[5]: /integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration
[6]: /api/#tags-remove
[7]: https://github.com/DataDog/Miscellany/blob/master/remove_lingering_aws_host_tags.py
