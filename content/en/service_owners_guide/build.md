---
title: Build your Datadog implementation
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/getting_started/integrations/"
  tag: "Documentation"
  text: "Getting Started with Integrations"
---

After emphasizing design and best practices, the next phase should focus on constructing Datadog, determining the necessary installations, and identifying the optimal methods to achieve them.

As your IT footprint grows, establishing standards, methods, and practices for software installation and usage becomes crucial. Engineering efforts focus on creating precise, repeatable steps for installing and configuring software, while maintaining flexibility. Without these standards, service reliability can suffer. This section outlines how Datadog can efficiently integrate with these standards, methods, and practices.

## Iterating on your environment

In the plan section, we spent time deeply exploring a broad range of topics that should be considered within a Datadog service design specification. In a perfect world, every one of those questions would be fully researched and answered before executing a large rollout. In this regard, enterprise IT engineering is far from a perfect world, and sometimes we need to pause and adapt as we build out our implementations.

### Prioritizing features
It is possible to stagger the installation of Datadog, and build up the complexity gradually. Some things must be done early, and others can wait. The following describes a breakdown of how you can apply primary (needs) versus secondary (wants) as you build out Datadog.  

**Primary**:
1. Unified Service Tags - `service:test` `env:prod` `version:1.x` 
2. Product profiles (Infra, APM, Synthetics, RUM, logging, etc)
3. Primary integration specifics (ports, logins, URLs)

**Secondary**:
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

## Create objects

Datadog is a RESTful API Platform that is [fully documented][1] and open. Anything you see in the UI, can be built out programmatically. Datadog welcomes, and fully supports the use of the API, even as a data source for your own custom applications.  

All the objects you create in Datadog, such as the dashboards, alerts, notebooks, parsed logs, and configurations for cloud integrations are stored in the platform as JSON. They are exportable and importable. This opens a host of administration capabilities, including Full IaC compliance, configuration backup, account migration, and reusability. Datadog also supports a [Terraform Provider][2], and a [CLI Tool][3] for these purposes.

## Provisioning

In every enterprise IT environment, a provisioning process is essential for managing software titles and instances within the IT architecture. To effectively manage Datadog at scale, it should be integrated into this provisioning process. The straightforward installation model of the [Datadog host Agent][5] offers multiple ways to achieve this.   

### Modular architecture

Like most enterprise software products, Datadog installations can be broken into three separate operations, each a part of the [modular architecture][6] referred to as the file/package/service model.

**File(s)**: Contains configurations  
**Package**: Holds binaries and controls their deployment  
**Service**: Manages the runtime instance via the OS service system.  

These things are the basic operations that must be completed in order to install Datadog. There is tremendous variance on what file/package/service administration means in any context, but here are some practical examples applied to Datadog:

**File**: Source code control can be used to store and control the edits of configuration files.  Templating and IaC solutions like Jinja2 and ansible are also highly effective.  

**Package**: Utilize internal package repositories such as Artifactory or Nexus to host Datadog Agent .rpm, .msi, and containerized Agent packages.  

**Service**: Use of IaC, or shell scripting

**IaC:** Infrastructure-As-Code has matured in sophistication and robustness. Though it is nearly ubiquitous in cloud infrastructures, it is usually a retrofit to long-standing on-premise infrastructures. Its simple file/package/service structure has been leveraged to deploy significant Datadog footprints with IaC "tools" as rudimentary as a bash script. While this is not recommended, it stands as encouragement to begin the IaC adoption of Datadog as soon as possible, and when you do, you will find Datadog at the ready with sample code and integrations for Ansible, Puppet, Chef, Powershell, Bash, CloudFormations, Terraform, and more.  

**Recommendation:**   
When it comes to deploying Datadog Agent software, it is advisable to re-use as much of your existing provisioning systems as possible. Datadog software design is flat and compliant to industry standard methods.  

## Conclusion

Datadog's Agent design is straightforward and adaptable, making it easy to integrate into any existing system. Leverage your current file, package, and service capabilities to incorporate Datadog. While the platform provides helpful mechanisms, the best method will depend on your specific local conditions.  

## Next steps

Review the Service Owners Guide [run][4] documentation to outline a maintenance schedule, perform Datadog Agent upgrades, build out Dashboards, and ensure your Datadog implementation remains healthy.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/latest/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: /service_owners_guide/run
[5]: /agent/basic_agent_usage/
[6]: /agent/architecture/
