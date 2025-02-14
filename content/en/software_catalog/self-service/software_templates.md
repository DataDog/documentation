---
title: Software Templates
aliases:
  - /service_catalog/software_templates
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

## Automate provisioning infrastructure or scaffolding new microservices
Create standardized Software Templates to help developers spin up new microservices or infrastructure from your best practices. Use [App Builder][2] to create dynamic, user-friendly forms to collect inputs from developers. Orchestrate software template workflows using [Workflow Automation][1]. Integrate them with Datadog's Software Catalog to enable dynamic and self-service workflows.

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Software Templates are in Preview. Complete the form to request access.
{{< /callout >}} 

### Create software templates
To use software templates in Datadog, create a Git repository with the desired template. You can start from scratch or use our quickstart blueprints to learn from an example.

#### Start from an example
Navigate to [App Builder Blueprints][9] and select one of the following blueprints. These are examples of how to configure an App or Workflow to help you get started. You can make updates to the examples to fit your needs, such as configuring inputs, setting up integrations with source code management or cloud providers, and configuring permissions.

##### Scaffold New Service

The [Scaffold New Service blueprint][11] shows an example of scaffolding a new lambda function from a template. The form captures inputs from a developer that will be passed into the corresponding Git repo.

1. From the app, customize the form to include the parameters you want to capture from your developers.
2. Click **Save as New App** to save the app. This will also create a corresponding templating workflow.

##### Create S3 bucket with Terraform

The [Create S3 Bucket blueprint][10] shows an example of how to generate Terraform code for an S3 bucket using a form in GitHub.

##### Provision Kubernetes cluster

The [Provision EKS Cluster blueprint][12] shows an example of how to generate Terraform code for a Kubernetes cluster in GitHub.

##### Provision RDS instance

The [Provision RDS Instance blueprint][13] shows an example of how to provision an RDS instance through direct integration with AWS. In this example, the RDS instance is directly created in AWS via an API call.


#### Start from scratch
Navigate to the [Workflow Automation][3] page to configure the template in Datadog.

1. Create a form for the developer-facing frontend using App Builder:
   - Navigate to **Actions** > **App Builder** and select **New App**.
   - Enter a name and description, and use the drag-and-drop editor to create a form that collects the required parameters for your template.
   - You can leverage the `Form` component or build a custom UI.
   - After your UI is done, select **New Query**, and use the **Trigger workflow** action to call your templating workflow and pass in the relevant parameters. You can also explore the available integrations in the [Actions Catalog][7] or leverage the `HTTP` action to interact with any integrations not provided out of the box.
   - Create a **Button** that submits the form, triggers your workflow, and passes in the parameters for the template.
   - Save and publish the app.

2. [Create a workflow][6] for your template:
   - From the [Workflow Automation][3] page, click **New Workflow**. 
   - Enter a name, add relevant tags, and define the input parameters you want to collect from users.
  
3. Configure the templating workflow:
   - Use GitHub, Gitlab, or HTTP [actions][7] to retrieve your template files.
   - Use the Apply Template [action][7] to manipulate your template repository and pass in your input parameters.
   - Use GitHub, Gitlab, or HTTP [actions][7] to upload the project files to the repository.
   - Save the workflow.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Workflow for building software template automation" style="width:100%;" >}}

4. Test your App and Workflow:
   - Click **View App** to view the app on a standalone page in a preview.
   - Track the success of the workflow templating process in [Workflow Automation][3].

### Publishing your App 
When you have finished setting up and testing up your Template, you can publish it for your team members to use. The publishing flow prompts you to define permissions and then allows you to add your App to a Dashboard or to the Self-Service portal. 

  {{< img src="tracing/service_catalog/self-service-publish.png" alt="Publish to Self-Service" style="width:100%;" >}}

### Available Templating Actions

Below is a list of actions available for Software Catalog in Datadog App Builder and Workflow Automation. You can see a full list of in the [Action Catalog][7].

- **Templating**
  - "Apply template" to pass in parameters to a set of files
- **Github**
  - "Create or update file" to create new files
  - "Edit configuration file" to manipulate YAML or JSON files
  - "Trigger GitHub Actions workflow run" to initiate a GitHub Action
  - "Search repositories" to return a list of repositories
  - "Create pull request" to open a pull request
- **Gitlab**
  - "Create file" to create new files
  - "Create project" to create new projects
- **Azure DevOps**
  - "Run pipeline" to trigger a pipeline run
- **Retrieve Service Information**
  - "List entity definitions" to get all definitions from Datadog Software Catalog (v3.0 and prior)
  - "Get service dependencies" to get a service's immediate upstream and downstream services
- **Approvals**
  - "Make a decision" with Slack or MS Teams to solicit an approval through a message
  - Use integrations with ServiceNow, Jira, or HTTP calls if you have an existing change management process.
- **HTTP**
  - Call any external API, regardless of whether or not Datadog has a pre-defined action
- **Transform Data**
  - Call "Function" or "Expression" to perform data transformations with Javascript
  - Bits AI can help with writing any custom Javascript code
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
