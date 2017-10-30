---
title: How to export your infrastructure list and Agent versions
kind: faq
customnav: agentnav
---

If you need to print or export the list of hosts reporting to Datadog, use the "JSON API permalink" at the bottom of the [Infrastructure List](https://app.datadoghq.com/infrastructure). 

{{< img src="agent/faq/inf-lis.png" alt="Infrastructure List" responsive="true" >}}

Clicking this link will provide you with a JSON formatted list of all your hosts.

At times it may also be prove useful to audit your current Agent version numbers to ensure you are running the latest version of the Agent or to update them following a new release.

An easy way to accomplish this would be to use the following script that leverages the JSON permalink:

https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion

This script will output all the current running Agents and their version numbers to a separate document.  Additionally, you can edit the script to input a desired Version number if you would also like all the running Agents that are under a particular version number.  There is also a separate file if you would like to convert the JSON output into a CSV file for your review.

Once you determine which hosts you would like to update you can either manually install the Agent from the install page:

https://app.datadoghq.com/account/settings#agent

Or you can make use of one our automation integrations like Chef, Puppet, or Ansible.