---
title: Is it possible to manage the Datadog agent and integrations using configuration management tools?
kind: faq
customnav: agentnav
---

Yes! We offer the following "official" solutions today:

### Chef
* https://github.com/DataDog/chef-datadog
* https://app.datadoghq.com/account/settings#integrations/chef

### Puppet
* https://github.com/DataDog/puppet-datadog-agent
* https://app.datadoghq.com/account/settings#integrations/puppet

### Ansible
* https://github.com/DataDog/ansible-datadog
* http://docs.datadoghq.com/integrations/ansible/

Chef, Puppet and Ansible integrations were written using our public APIs so if you're interested in using another automation tool, the above could be leveraged as examples to get you started.

There is also community support for Saltstack:

* Saltstack Formula - https://github.com/DataDog/datadog-formula
