---
title: Build your Datadog implementation
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/service_owners_guide/run/"
  tag: "Documentation"
  text: "Maintaining and running your Datadog Implementation"
---

# Build

After focusing on design and best practices, the next phase should concentrate on the construction of Datadog itself, understanding what needs to be installed, and the best way to achieve that.

As you scale your IT footprint, it's important to develop standards, methods, and practices for how software is installed and used. Engineering effort is dedicated to developing precise steps for installing and configuring software in a repeatable, standardized manner, while still allowing for a significant level of flexibility. Without these standards, service reliability can be severely impacted. In this section, we describe how Datadog would most efficiently interact with those standards, methods, and practices.

### Iterating on your environment

In the plan section, we spent time deeply exploring a broad range of topics that should be considered within a Datadog service design specification. In a perfect world, every one of those questions would be fully researched and answered before executing a large roll-out. In this regard, enterprise IT engineering is far from a perfect world, and sometimes we need to pause and adapt as we build out our implementations.

### Prioritizing features
It is possible to stagger the installation of Datadog, and build up the complexity gradually. Some things must be done early, and others can wait. The following describes a breakdown of how you can apply primary (needs) versus secondary (wants) as you build out Datadog.  

* Primary:
1. Unified Service Tags - `service:test` `env:prod` `version:1.x` 
2. Product profiles (Infra, APM, Synthetics, RUM, logging, etc)
3. Primary integration specifics (ports, logins, URLs)

* Secondary:
1. Secondary integrations
2. Advanced/case-specific options

## Internal support

As the owner of the Datadog service, you will likely need to create a way for your users to consume your service.  There might be a wiki, ServiceNow integration, or Jira board that will publish the Datadog services, and provide a way to request them. This is the guide that your internal customers will use to deploy Datadog on the apps and infrastructure they manage. 

The shape of this system will be different depending on your environment, but there are a few fundamental things that can accelerate this creation:
 
1. Build a list of Datadog service tasks such as:

- Onboard a new application, including all its software and infrastructure. 
- Add a cloud account
- Create a new vSphere cluster node
- Create a new database instance
- Monitor new 3rd-party software product
- Add synthetic tests
- Create an alert/monitor
- Create/Update a dashboard

2. Gathering the minimum information sets can include things such as:

- Internal cost center code
- App Name, owner, operations team
- Things that are specific to local conditions 

These definitions should build upon the foundations of the architectural plan completed in the first phase. However, if you are struggling with any of these definitions, Datadog has developed mechanisms to assist this management, outlined below.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}