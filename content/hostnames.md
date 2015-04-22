---
title: Host Naming
kind: documentation
sidebar:
  nav:
    - header: Host Naming
    - text: Agent Host Names
      href: "#agent"
    - text: Host Aliases
      href: "#aliases"
---

<div class="alert alert-info">
  An overview of how we uniquely identify hosts and how they are displayed in
  Datadog. If you have more questions, stop by <a href="irc://irc.freenode.net/datadog">#datadog on freenode</a>,
where we'll be happy to answer any questions you might have. (There's a 
<a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
web chat client, too</a>.)
</div>

<h2 id="agent">Agent Host Names</h2>

<div class="alert alert-warn">
  This applies to version 3.6 of the Agent and later. If you're having issues
  with host names, we recommend updating to the latest version of the Agent.
</div>

The Datadog Agent collects potential hostnames from a number of different
sources. To see all the names the Agent is detecting, run the Agent info
command:

    $ sudo /etc/init.d/datadog-agent info

    ...

    Hostnames
    =========

      hostname: my.special.hostname
      agent-hostname: my.special.hostname
      ec2-hostname: ip-192-0-0-1.internal
      instance-id: i-deadbeef
      socket-hostname: myhost
      socket-fqdn: myhost.mydomain

    ...

From these names, a canonical name is picked for the host. This is the name the
Agent will primarily use to identify itself to Datadog. The other names are
submitted as well, but only as candidates for <a href="#aliases">aliasing</a>.

The canonical host name is picked according to the following rules. The first
match is selected.

 1. `agent-hostname`: If a host name is explicitly set in the Agent configuration file.
 2. `hostname`: If the DNS host name is not an EC2 default (e.g. `ip-192-0-0-1`).
 3. `instance-id`: If the Agent can reach the EC2 metadata endpoint from the host.
 4. `hostname`: Fall back on the DNS host name even if it is an EC2 default.

If name is recognized as obviously non-unique (e.g. `localhost.localdomain`),
the current rule fails and passes through to the next.

<h2 id="aliases">Host Aliases</h2>

A single host running in EC2 might have an
instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the
host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an
internal DNS server or a config-managed hosts file (`myhost.mydomain`). Datadog
creates aliases for host names when there are multiple uniquely identifiable
names for a single host.

The names collected by the Agent (detailed <a href="#agent">above</a>) are
added as aliases for the chosen canonical name.

You can see a list of all the hosts in your account from the Infrastructure tab
in Datadog. From the Inspect panel, you can see (among other things) the list of
aliases associated with each host.

<img src="/static/images/host_aliases.png" style="width:100%; border:1px solid #777777"/>
