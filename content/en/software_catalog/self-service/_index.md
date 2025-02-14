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

## Automate developer workflows
Use [App Builder][2] to create dynamic, user-friendly forms to collect inputs from developers. Call Datadog's [Actions][7] from your app to initiate API calls to external services, perform custom logic, or data transformations. Orchestrate end-to-end processes of multiple actions using [Workflow Automation][1]. Integrate them with Datadog's Software Catalog to enable dynamic and self-service workflows.

{{< img src="tracing/service_catalog/self-service-ui.png" alt="Publish to Self-Service" style="width:100%;" >}}

### Start from an example
Navigate to [App Builder Blueprints][9] or [Workflow Automation Blueprints][15]. These are examples of how to configure an App or Workflow to help you get started. You can make updates to the examples to fit your needs, such as configuring inputs, setting up integrations with other tools, and configuring permissions. See some examples below:

#### Software Templating
Configure an form to collect inputs from a developer, integrate with a template in source code management (e.g. Github), and generate a new repository or PR for a developer. Learn more in our [documentation][] on Software Templates.

#### Remediaton
Consolidate data from cloud infrastructure or Kubernetes and enable developers to take simple, safe remediation actions. Trigger actions manually, in response to a monitor, or from an external API call.

#### Change Management
Manage deployments, feature flag changes, and more. Initiate changes directly from Datadog or track the current status and approval.

#### Provisioning Infrastructure
Enable developers to spin up new infrastructure (e.g. S3 bucket) with a few inputs and one click. Collect approvals from an SRE/platform engineering team through source control or Approval actions within Workflow Automation.

#### Developer Environments
Spin up ephemeral environments for developers on-demand. Use Workflow Automation to automatically deprovision any unused infrastructure to control costs.

### Start from scratch
1. Create a form for the developer-facing frontend using App Builder:
   - Navigate to **Actions** > **App Builder** and select **New App**.
   - Enter a name and description, and use the drag-and-drop editor to create a form that collects the required parameters for your template.
   - You can leverage the `Form` component or build a custom UI.
   - After your UI is done, select **New Query**, and use the **Trigger workflow** action to call your templating workflow and pass in the relevant parameters. You can also explore the available integrations in the [Actions Catalog][7] or leverage the `HTTP` action to interact with any integrations not provided out of the box.
   - Create a **Button** that submits the form, triggers your workflow, and passes in the parameters for the template.
   - Save and publish the app.

2. Pair your App with [Actions][7] or a [Workflow][6] to automate processes:

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Workflow for building software template automation" style="width:100%;" >}}

4. Test your App and Workflow:
   - Click **View App** to view the app on a standalone page in a preview.
   - Track the success of the workflow templating process in [Workflow Automation][3].

### Publishing your App 
When you have finished setting up and testing up your App, you can publish it for your team members to use. The publishing flow prompts you to define permissions and then allows you to add your App to a Dashboard or to the Self-Service portal. 

  {{< img src="tracing/service_catalog/self-service-publish.png" alt="Publish to Self-Service" style="width:100%;" >}}
    

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
