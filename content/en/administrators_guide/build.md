---
title: Build your Datadog installation
description: Build your Datadog installation and prioritize features.
further_reading:
- link: "/getting_started/integrations/"
  tag: "Documentation"
  text: "Getting Started with Integrations"
---

After you plan your Datadog installation design and best practices, concentrate on the construction of Datadog itself, understanding what needs to be installed, and the best way to achieve that.

As your IT footprint grows, you need to establish standards for software installation and usage. To do this, it's important to develop precise, repeatable steps for reliably configuring software while maintaining the flexibility you need. This section explains how Datadog can efficiently integrate with these standards.

## Iterating on your environment

In the [plan][7] section, you explored a range of topics within a Datadog design specification. Ideally, every one of those questions would be fully researched and answered before executing a large rollout. However, enterprise IT engineering often requires you to pause and adapt as you build out your installation.

### Prioritizing features

It is possible to stagger the installation of Datadog, and build up the complexity gradually. Some things must be done early, and others can wait. The following describes a breakdown of how you can apply primary (needs) versus secondary (wants) as you scale your Datadog installation.  

**Primary**:
1. Unified Service Tags - `service:test` `env:prod` `version:1.x` 
2. Product profiles (Infrastructure, APM, Synthetic Monitoring, RUM, Logs Management, and so on)
3. Primary integration specifics (ports, logins, URLs)

**Secondary**:
1. Secondary integrations
2. Advanced/case-specific options

## Internal support

As the owner of your Datadog platform, you will likely need to create a way for your users to consume your installation. There might be a wiki, ServiceNow integration, or Jira board that will publish Datadog, and provide a way to request them. This is the guide that your internal customers will use to deploy Datadog on the apps and infrastructure they manage. 

The shape of this system will be different depending on your environment, but there are a few fundamental things that can accelerate this creation:
 
1. Build a list of Datadog installation tasks such as:

    - Onboard a new application, including all its software and infrastructure. 
    - Add a cloud account
    - Create a new vSphere cluster node
    - Create a new database instance
    - Monitor new 3rd-party software product
    - Add Synthetic Monitoring tests
    - Create an alert/monitor
    - Create/Update a dashboard

2. Gathering the minimum information sets can include things such as:

    - Internal cost center code
    - App Name, owner, operations team
    - Things that are specific to local conditions 

These definitions build upon the foundations of the architectural plan completed in the plan phase. However, if you are struggling with any of these definitions, Datadog has developed mechanisms to assist this management, outlined below.

## Create content

Datadog is a RESTful API Platform that is [fully documented][1] and open. Most things you see in the UI can be built out programmatically. Datadog welcomes and fully supports the use of the API, even as a data source for your own custom applications.  

All the objects you create in Datadog, such as the dashboards, alerts, notebooks, parsed logs, and configurations for cloud integrations are stored in the platform as JSON. They are exportable and importable. This opens a host of administration capabilities, including Full Infrastructure as Code (IaC) compliance, configuration backup, account migration, and reusability. Datadog also supports a [Terraform Provider][2], and a [CLI Tool][3] for these purposes.

## Provisioning

Provisioning is central to any enterprise IT environment. To manage Datadog at scale, integrate it into your provisioning process. The Datadog Agent's simple installation model offers various ways to achieve this.

### Modular architecture

Like most enterprise software products, Datadog installations can be broken into three separate operations, each a part of the [modular architecture][6] referred to as the file/package/service model.

**File(s)**: Contains configurations  
**Package**: Holds binaries and controls their deployment  
**Service**: Manages the runtime instance via the OS service system

The basic operations you must complete in order to install Datadog are the following:

**File**: Source code control can be used to store and control the edits of configuration files. Templating and IaC solutions like Jinja2 and Ansible are also highly effective.

**Package**: Use internal package repositories such as Artifactory or Nexus to host .rpm, .msi, and containerized Agent packages.   

**Service**: Use of IaC, or shell scripting.

**IaC:** Infrastructure-As-Code has advanced in both sophistication and robustness. While it is almost universally used in cloud infrastructures, it is often retrofitted to long-established on-premise infrastructures. Its simple file/package/service structure has been leveraged to deploy significant Datadog footprints with IaC "tools" as rudimentary as a bash script. While this is not recommended, it stands as encouragement to begin the IaC adoption of Datadog as soon as possible, and when you do, you will find Datadog at the ready with sample code and integrations for Ansible, Puppet, Chef, Powershell, Bash, CloudFormations, Terraform, and more.  

**Recommendations:**   
When it comes to deploying Datadog Agent software, it is advisable to reuse as much of your existing provisioning systems as possible. Datadog software design is flat and compliant to industry standard methods.  

## Summary

Datadog's Agent design is flat so that it can easily fit into any existing provisioning system. Use your existing capabilities for file/package/service, and incorporate Datadog into them. While the platform offers helpful mechanisms, your local conditions determine the best method for any given situation.

## Next steps

Review the Datadog administrator's [run][4] documentation to outline a maintenance schedule, perform Datadog Agent upgrades, build out Dashboards, and ensure your Datadog installation remains healthy.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: /administrators_guide/run
[5]: /agent/basic_agent_usage/
[6]: /agent/architecture/
[7]: /administrators_guide/plan
