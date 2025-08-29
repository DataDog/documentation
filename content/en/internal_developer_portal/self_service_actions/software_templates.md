---
title: Software Templates
aliases:
  - /service_catalog/software_templates
  - /software_catalog/software_templates
  - /software_catalog/self-service/software_templates
  - /software_catalog/self_service_actions/software_templates
  - /software_catalog/self-service_actions/software_templates
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

Create Software Templates within Software Catalog to help developers quickly provision infrastructure and create microservices that align with your best practices. 

## Create a Software Template

A Software Template is stored in a Git repository and serves as a reusable framework. [Build apps][2] to collect inputs and pass them into the template repository to generate customized configurations.

To create a Software Template, you can:
- Start from an example using pre-built blueprints.
- Start from scratch by defining your own template and workflows.

### Start from an example

Use [App Builder Blueprints][9] to quickly configure an app or workflow. These blueprints provide working examples that you can customize by modifying inputs, integrating with source control or cloud providers, and adjusting permissions.

Example blueprints:

- **[Scaffold New Service blueprint][11]**: Create a form that collects developer inputs, integrates with GitHub, and generates a new repository or pull request.
- **[Create S3 Bucket blueprint][10]**: Generate Terraform code for an S3 bucket using a form in GitHub.
- **[Provision EKS Cluster blueprint][13]**: Generate Terraform code for a Kubernetes cluster in GitHub.
- **[Provision RDS Instance blueprint][14]**: Provision an RDS instance in AWS through an API call.

To use a blueprint:

1. Select a blueprint in [**App Builder Blueprints**][9].
1. Customize the form fields to capture required inputs.
1. Click **Save as New App** to create an app linked to a templating workflow.

### Start from scratch

To build a Software Template from scratch:

1. Create a form using App Builder:

    1. Navigate to **Actions** > **App Builder** from the left-hand menu, and select **New App**.
    1. Enter a name and description, and use the drag-and-drop editor to create a form that collects the required parameters.
       - You can use the `Form` component or build a custom UI.
    1. Select **New Query**, and use the **Trigger workflow** action to call your workflow and pass in parameters. 
       - Explore [Action Catalog][7] for built-in integrations, or use the `HTTP` action to interact with any integrations not available.
    1. Create a **Button** that submits the form and triggers your workflow.
    1. Save and publish the app.

2. [Create a workflow][6] for your template:
   
   1. Navigate to [Workflow Automation][3] and click **New Workflow**. 
   1. Enter a name, add relevant tags, and define the input parameters you want to collect from users.
  
3. Configure the templating workflow:

   1. Use GitHub, Gitlab, or HTTP [actions][7] to retrieve your template files.
   1. Use the Apply Template [action][7] to manipulate your template repository and pass in your input parameters.
   1. Use GitHub, Gitlab, or HTTP [actions][7] to upload the project files to the repository.
   1. Save the workflow.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Workflow for building Software Template automations" style="width:100%;" >}}

4. Test your app and workflow:

   1. Click **View App** to preview the app as a standalone page.
   1. Monitor the templating process in [Workflow Automation][3].

## Publish your app 

Once your Software Template is configured and tested, publish it so your team can use it. The publishing flow lets you:

- Define permissions to control access.
- Add the app to a Dashboard or to Self-Service Actions for easy discovery.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publish to Self-Service" style="width:100%;" >}}

## Available templating actions

The following actions are available for Software Catalog in Datadog App Builder and Workflow Automation. For a complete list, see [Action Catalog][7].

- **Templating**
  - "Apply template": Pass input parameters into a set of files.
- **GitHub**
  - "Create or update file": Create or modify files in a GitHub repository.
  - "Edit configuration file": Modify YAML or JSON configuration files.
  - "Trigger GitHub Actions workflow": Initiate a GitHub Action.
  - "Search repositories": Retrieve a list of repositories.
  - "Create pull request": Open a pull request.
- **GitLab**
  - "Create file": Create a file in a GitLab repository.
  - "Create project": Create a GitLab project.
- **Azure DevOps**
  - "Run pipeline": Trigger a pipeline run in Azure DevOps.
- **Retrieve Service Information**
  - "List entity definitions": Retrieve all service definitions from Datadog Software Catalog (v3.0 and prior).
  - "Get service dependencies": Retrieve a service's upstream and downstream dependencies.
- **Approvals**
  - "Make a decision": Use Slack or Microsoft Teams to solicit an approval.
    - Use integrations with ServiceNow, Jira, or HTTP calls if you have an existing change management process.
- **HTTP**
  - "Make request": Make an HTTP request to interact with any external API.
- **Data Transformation**
  - "Expression", "Function": Perform data transformations with JavaScript.
    - Use Bits AI to assist with writing custom JavaScript code.
- **Private Actions**
  - To interact with private resources, use the [Private Action Runner][12].
    

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
