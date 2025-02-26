---
title: Self-Service
aliases:
  - /service_catalog/self-service
further_reading:
- link: "https://www.datadoghq.com/blog/app-builder-remediation/"
  tag: "Blog"
  text: "Remediate incidents faster with App Builder"
- link: "/service_management/app_builder/"
  tag: "Documentation"
  text: "Learn about App Builder"
- link: "/service_management/workflows/"
  tag: "Documentation"
  text: "Learn about Workflows"
---

[Self-Service][17] is a centralized interface where developers can take action directly within Datadog. Platform teams can define and share golden paths to streamline tasks across the software development lifecycle. For example, you can:
— build microservices and infrastructure with the proper configurations
- initialize development environments
- manage deployments across environments
- actively monitor and optimize running services

Each tile in Self-Service represents an App, which provides a structured interface for executing predefined actions. Apps are created through [App Builder][2], powered by [Actions Catalog][7] and [Workflow Automation][1], and surfaced in Self-Service to streamline developer workflows.

## Automate developer workflows

To create a new App in Self-Service, you can start with an example or build from scratch. At a high level, creating a new app involves the following steps:

1. Use [App Builder][2] to create dynamic, user-friendly forms to collect inputs from developers.
1. Call Datadog's [Actions][7] from your app to initiate API calls to external services, perform custom logic, or data transformations. 
1. Use [Workflow Automation][1] to orchestrate end-to-end processes of multiple actions.
1. Integrate your app with Datadog's Software Catalog to enable dynamic and self-service workflows.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Publish to Self-Service" style="width:100%;" >}}

### Start from an example

To get started quickly, explore [App Builder Blueprints][9] and [Workflow Automation Blueprints][15] for examples of how to configure an App or Workflow, respectively. You can configure inputs, set up integrations with other tools, configure permissions, and make other adjustments to the blueprints to satisfy your needs. 

For example, you can use Blueprints to:

- **Scaffold new services from templates:** Configure a form to collect inputs from a developer, integrate with a template in source code management (for example, Github), and generate a new repository or PR for a developer. Read the [Software Templates documentation][16] to learn more.
- **Remediate issues:** Consolidate data from cloud infrastructure or Kubernetes and enable developers to take simple, safe remediation actions. Trigger actions manually, in response to a monitor, or from an external API call.
- **Manage code changes and deployments:** Manage deployments, feature flag changes, and more. Initiate changes directly from Datadog or track the current status and approval.
- **Provision infrastructure:** Enable developers to spin up new infrastructure (for example, an S3 bucket) with a few inputs and one click. Collect approvals from an SRE or platform engineering team through source control or Approval actions within Workflow Automation.
- **Provision developer environments:** Spin up ephemeral environments for developers on-demand. Use Workflow Automation to automatically deprovision any unused infrastructure to control costs.

### Start from scratch

If you prefer to build an app from the ground up:

1. Create a form for the developer-facing frontend using App Builder.

    1. Navigate to **Actions** > **App Builder** and select **New App**.
    1. Enter a name and description, and use the drag-and-drop editor to create a form that collects the required parameters for your template.
       - You can leverage the `Form` component or build a custom UI.
    1. Select **New Query**, and use the **Trigger workflow** action to call your templating workflow and pass in the relevant parameters. You can also explore the available integrations in the [Actions Catalog][7] or leverage the `HTTP` action to interact with any integrations not provided out of the box.
    1. Create a **Button** that submits the form, triggers your workflow, and passes in the parameters for the template.
    1. Save and publish the app.

1. Pair your App with [Actions][7] or a [Workflow][6] to automate processes.

   {{< img src="tracing/software_catalog/templating-workflow.png" alt="Workflow for building software template automation" style="width:100%;" >}}

1. Test your App and Workflow.
   
   1. Click **View App** to view the app on a standalone page in a preview.
   1. Track the success of the workflow templating process in [Workflow Automation][3].

### Publish your App 

When you have finished setting up and testing your App, publish it for your team members to use. The publishing flow prompts you to define permissions and allows you to add your App to a Dashboard or the Self-Service portal. 

  {{< img src="tracing/software_catalog/self-service-publish.png" alt="Publish to Self-Service" style="width:100%;" >}}
    

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/
[2]: /service_management/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /service_management/workflows/build/#create-a-custom-workflow
[7]: /actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action
[15]: https://app.datadoghq.com/workflow/blueprints
[16]: /software_catalog/self-service/software_templates
[17]: https://app.datadoghq.com/software/self-service
