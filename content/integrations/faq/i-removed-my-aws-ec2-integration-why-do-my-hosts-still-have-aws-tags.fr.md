---
title: J'ai supprimé mon intégration AWS EC2. Pourquoi mes hôtes ont-ils toujours des tags AWS?
kind: faq
---

## Comment cela peut arriver:

You can use the EC2 flavor of the [Amazon Web Services integration][1] to collect performance data from CloudWatch pertaining to your EC2 instances. You can also collect performance data from EC2 instances by [installing a Datadog Agent][2] on them. For several reasons, many users prefer to collect performance data from their EC2 instances using [both of these methods][3]. In this case, datadog's backend merges the data from both these sources to the same "host" object in your Datadog account (this merging can take a little time but [completes within a few hours](/integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts)).

Si, à un moment donné, vous décidez de supprimer l'intégration AWS pour l'un de vos EC2 mais que vous continuez à exécuter un agent Datadog sur cet host, l'host de votre compte Datadog continuera de recevoir les anciens tags d'hosts collectés auprès d'AWS. Ce comportement est prévu et n'indique pas que l'intégration AWS EC2 est toujours activée pour cet host. (Pour vérifier cela, à partir de votre page metric explorer, vous pouvez vous assurer que vos métriques EC2 ne sont pas taggées avec ce nom d'host ou ne sont pas collectées du tout.)

## What can be done to remove these tags:

Continuing to have these AWS host-tags associated with these hosts is often not considered problematic by our users, and is sometimes even preferred (some users even like to [collect AWS host tags](/integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration) from Datadog Agents while not running the AWS EC2 integration). But if you prefer to have these AWS host-tags removed from these hosts, you can do this by using our ["Tags" API endpoint][4].

For added convenience, one of our engineers has made available a python script that can be easily used to remove all AWS host-tags from either some or all of the hosts in your account. You can find [this python script here][5]. (Do note that you have to edit certain variables in this script for it to work, such as api_key and application_key)

[1]: /integrations/amazon_web_services
[2]: /agent
[3]: /agent/#why-should-i-install-the-agent-on-my-aws-instances
[4]: /api/#tags-remove
[5]: https://github.com/DataDog/Miscellany/blob/master/remove_lingering_aws_host_tags.py
