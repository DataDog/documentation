---
title: Basic Agent Usage for OS X
kind: documentation
servicename: /usr/local/bin/datadog-agent
serviceinfoname: /usr/local/bin/datadog-agent info
configdirectory: ~/.datadog-agent/
logdirectory: /var/log/datadog/
supervisorlog: /var/log/datadog/supervisord.log
os: osx

---

<!--
======================================================
Overview
======================================================
-->

### Overview
{: #overview}

This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found 
<a href='https://app.datadoghq.com/account/settings#agent/mac'>here</a>.<br/>

By default, your Agent will be installed in its own sandbox located at <code> '/opt/datadog-agent'</code>.
You’re free to move this folder wherever you like.
However, this guide will assume that the Agent is installed in its default location, so be sure to modify the
instructions accordingly if you decide to move it to another location.


<%= render 'partials/BasicAgentUsage-nix' %>

<br/>

If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways:

<%= render '_contact_info', :heading_size => 5, :hide_datadog => false %>

