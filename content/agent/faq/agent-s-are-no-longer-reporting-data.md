---
title: Agent(s) are no longer reporting data
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: Agent
  text: Learn more about the Datadog Agent
---

If your Datadog account was disabled and then re-enabled your API key was likely reset, to confirm/reset this please do the following:
 
1. Go to the [Integration->API's page](https://app.datadoghq.com/account/settings#api) and copy the key listed at the top.
 
2. Log into your host(s) and navigate to the Datadog agent's conf:
    * Linux: `/etc/dd-agent/datadog.conf`
    * Windows: `C:\ProgramData\Datadog\datadog.conf`
    * Other OS's reference [this link](/agent/faq/where-is-the-configuration-file-for-the-agent)

3. In your config, replace/update the API key, it should [look like this](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example#L22).

4. Once done, restart the agent:
    * Linux: `sudo /etc/init.d/datadog-agent start`
    * Windows: `Recycle the Datadog Service`
    * Other OS's reference [this link](/agent/faq/start-stop-restart-the-datadog-agent)

If this doesn't help or appear to be applicable, please reach out to [us](/help)

{{< partial name="whats-next/whats-next.html" >}}
