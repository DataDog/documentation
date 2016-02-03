---
title: Get Started with Datadog
kind: documentation
sidebar:
  nav:
    - header: Guides
    - text: Getting Started with the Agent
      href: "/guides/basic_agent_usage/"
    - text: Datadog Overview
      href: "/overview/"
    - text: Sending App Metrics
      href: "/guides/metrics/"
    - text: Log Parsing in the Agent
      href: "/guides/logs/"
    - text: Writing an Agent Check
      href: "/guides/agent_checks/"
    - text: Setting up Service Checks
      href: "/guides/services_checks/"
    - text: Deploying the Agent with Chef
      href: "/guides/chef/"
    - text: Guide to Monitoring
      href: "/guides/monitoring/"
    - text: Single Sign On With SAML
      href: "/guides/saml/"
    - text: Billing FAQ
      href: "/guides/billing/"
    - header: References
    - text: API
      href: "/api/"
    - text: Libraries
      href: "/libraries/"
    - text: Graphing
      href: "/graphing/"
    - text: Host Names
      href: "/hostnames/"
    - text: Integrations
      href: "/integrations/"
    - text: DogStatsD
      href: "/guides/dogstatsd/"
---
Welcome to Datadog's integration documentation.

The pages below walk through how to integrate, what to expect, and how to troubleshoot.

Each page is organized as follows:

1.  **Overview** - This section provides an overview of the integration.
2.  **Installation** - This section explains what you need to do on the host to prepare for the integration. Examples include creating users or permissions, opening ports, and more. If there is nothing you need to do, this section might be omitted.
3.  **Configuration** - This section covers everything you need to do in the Datadog platform. This may include clicking install on the tile, editing the yaml file, and entering API keys.
4.  **Validation** - This section shows you how to validate that the integration is in fact working correctly.
5.  **Usage** - With some integrations, there are additional steps required to take full advantage of the integration. This could include creating dashboards, monitors, or using an API. This section is sometimes omitted.
6.  **Metrics** - This is a list of all the metrics provided by the integration
7.  **Compatibility** - This section will include which versions the integration has been tested and validated on.

*We are in the process of moving all the integration docs to this newer format so there will continue to be some integrations written in the older style.*

-----

<ul class="intlist list-group row">
  <% $integration_items.each do |i| %>
    <li class="list-group-item col-lg-2 col-md-3 col-sm-4 col-xs-6"><%= link_to i[:integration_title], i.path %></li>
<% end %>
</ul>



