---
title: How do I install the agent on a server with limited internet connectivity?
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
- link: "/agent/proxy"
  tag: "Documentation"
  text: Learn more about Proxy
---

The setup script provided in the in app agent install instructions requires outbound https access to a number of different endpoints in order to function properly and might not work well with servers that have limited internet access.

For servers with no direct internet access, the agent can be configured to route through a proxy. Refer to the help article on this topic available [here](/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog)

For servers with limited outbound internet connectivity, the agent can be installed using the relevant package for the server's OS. The in app install instructions contain instructions for this approach which can be viewed by clicking the link shown on the instructions page.

{{< img src="agent/faq/install_agent.gif" alt="Install Agent" responsive="true" popup="true">}}

If the target system is blocked from accessing the package repo directly, you can download the package from the repo using another server then transfer it over to the target system for a local install.

The example below shows a user copying the [URL to the rpm package](https://yum.datadoghq.com/rpm/x86_64/) for the latest version of the agent :

{{< img src="agent/faq/rpm_package.gif" alt="RPM Package" responsive="true" popup="true">}}

**Note**: The package will bundle all resources necessary to run our agent and our checks (whether the integration is enabled or not). In terms of hard requirements, python 2.7+ and sysstat are required; other dependencies will be mandatory depending on what checks are enabled.

Once the package has been transferred to the target system, it can be installed locally by using the appropriate package manager command. 

For yum, using agent 5.7.3 as an example, the command would be:
sudo yum localinstall datadog-agent-5.7.3-1.x86_64.rpm


Once installed, the datadog.conf file needs to be generated from the datadog.conf.example file and updated with the API key for your instance.

This can be done with a single command:
sudo sh -c "sed 's/api_key:.*/api_key: [API KEY]/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"


Simply run the command above after replacing [API KEY] with the API KEY for your Org found [here](https://app.datadoghq.com/account/settings#api)


Next, start the agent: 

```
sudo service datadog-agent start 
```

... and you should be good to go!

{{< partial name="whats-next/whats-next.html" >}}