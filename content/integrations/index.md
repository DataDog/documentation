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
Welcome to Datadog's integration documentation (note: this space is currently under construction).
For step-by-step instructions for an integration, <a href="https://app.datadoghq.com/account/settings">please see here</a>.
The pages below walk through how to integrate, what to expect, and how to troubleshoot.

<ul>
  <% $integration_items.each do |i| %>
    <li><%= link_to i[:integration_title], i.path %></li>
<% end %>
</ul>



