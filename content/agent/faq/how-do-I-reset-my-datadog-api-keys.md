---
title: How do I reset my Datadog API keys?
kind: faq
customnav: agentnav
---

To reset your Datadog API keys do the following:
 
1. It isn't possible to have zero API keys so before revoking your key(s) you'll first need to create a new one. Simply go to the Integration -> APIs page and select "Create API key" (located at the bottom of the page):
    *  https://app.datadoghq.com/account/settings#api
2. Once a new key has been added simply select "Revoke" to remove each of your old keys.
{{< img src="agent/faq/Reset_Datadog_API_Keys.jpg" alt="Reset Datadog API Keys" responsive="true" >}}

Once you've revoked your keys you'll need to update the datadog.conf file on each of your agents with this new key. To do so:
 
1. On the Integration -> APIs page, create and copy a new API key.
 
2. You'll need to navigate to your host's Datadog agent conf file:
    * Linux: /etc/dd-agent/datadog.conf
    * Windows: C:\ProgramData\Datadog\datadog.conf
    * Other OS's [reference this link](/agent/faq/where-is-the-configuration-file-for-the-agent)

3. In your conf file, replace the API key. It should look like this (leave a single space after the ":" character. Do NOT surround your key with quotations):
    * https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example#L22

4. Once done, restart the agent:
    * Linux: sudo /etc/init.d/datadog-agent restart
    * Windows: Restart the Datadog Service
    * Other OS's [reference this link](/agent/faq/start-stop-restart-the-datadog-agent)
If you're using a configuration management tool such as Chef, Puppet or Ansible we suggest following the instructions [found here](https://app.datadoghq.com/account/settings#agent) for setting the API keys.
 
If you need additional assistance please reach out to support@datadoghq.com.
 