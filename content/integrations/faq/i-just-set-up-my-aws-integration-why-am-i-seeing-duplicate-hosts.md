---
title: I just set up my AWS integration. Why am I seeing duplicate hosts?
kind: faq
---

There are three scenarios you may be encountering:

* **Scenario A**: A single host running in EC2 might have an instance ID (i-abcd1234), a generic hostname provided by EC2 based on the host's IP address (ip-192-0-0-1), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (myhost.mydomain).

Datadog creates aliases for hostnames when there are multiple uniquely identifiable names for a single host. It takes about 10-20 minutes for the single host's duplicate names to be aliased, this does not impact your billing. [Read more about how Datadog determine the Agent host name][1].

* **Scenario B**: When installing the Agent on an AWS EC2 instance, you might see duplicated hosts on the Infrastructure page or Host Map for a few hours if you manually set the hostname in the Agent's configuration. This second host disappears a few hours later, and won't affect your billing.

* **Scenario C**: In some rare cases the AWS endpoint that provides the instance-id information that Datadog uses to reconcile agent-based host records with the matching AWS-based host record. Restarting the Agent causes the Agent to attempt to re-sync with the instance-id endpoint. You can confirm the availability of this endpoint by running the following command from the host in question - `curl http://169.254.169.254/latest/meta-data/instance-id`

[1]: /agent/basic_agent_usage
