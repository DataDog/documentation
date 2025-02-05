---
title: Software Templates
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

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Software Templates are in Preview. Complete the form to request access.
{{< /callout >}} 

### Create software template workflows
To use software templates in Datadog, create a Git repository with the desired template. You can start from scratch or use our quickstart blueprints to learn from an example.

#### Start from a blueprint
Navigate to [App Builder Blueprints][9] and select one of the following blueprints:

##### Scaffold New Service

The [Scaffold New Service blueprint][11] shows an example of scaffolding a new lambda function from a template. The form captures inputs from a developer that will be passed into the corresponding Git repo.

1. From the app, customize the form to include the parameters you want to capture from your developers.
2. Click **Save as New App** to save the app. This will also create a corresponding templating workflow.

##### Create S3 bucket with Terraform

The [Create S3 Bucket blueprint][10] shows an example of how to generate Terraform code for an S3 bucket using a form in GitHub.

##### Provision Kubernetes cluster

The [Provision EKS Cluster blueprint][12] shows an example of how to generate Terraform code for a Kubernetes cluster in GitHub.

##### Provision RDS instance

The [Provision RDS Instance blueprint][13] shows an example of how to provision an RDS instance through direct integration with AWS.


#### Start from scratch
Navigate to the [Workflow Automation][3] page to configure the template in Datadog.

1. Create the form for your template:
   - Navigate to **Actions** > **App Builder** and select **New App**.
   - Enter a name and description, and use the drag-and-drop editor to create a form that collects the required parameters for your template.
   - Select **New Query**, and use the **Trigger workflow** action to call your templating workflow and pass in the relevant parameters.
   - Create a **Button** that submits the form, triggers your workflow, and passes in the parameters for the template.
   - Save and publish the app.

2. [Create a workflow][6] for your template:
   - From the [Workflow Automation][3] page, click **New Workflow**. 
   - Enter a name, add relevant tags, and define the input parameters you want to collect from users.
  
3. Configure the templating workflow:
   - Use GitHub, Gitlab, or HTTP [actions][7] to retrieve your template files.
   - Use Cookiecutter to generate the project files from the template.
   - Use the Apply Template [action][7] to manipulate your template repository and pass in your input parameters.
   - Use GitHub, Gitlab, or HTTP [actions][7] to upload the project files to the repository.
   - Save the workflow.

  {{< img src="tracing/service_catalog/templating-workflow.png" alt="Workflow for building software template automation" style="width:100%;" >}}

4. Test your application and workflow:
   - Click **View App** to view the app on a standalone page, or **Add to a Dashboard** to place the app in a dashboard.
   - Navigate to **Service Mgmt** > **App Builder**, and select your app. Fill out the template form, and click the submit button.
   - Track the success of the workflow templating process in [Workflow Automation][3].

  {{< img src="tracing/service_catalog/templating-app.png" alt="Application for managing software templates through App Builder" style="width:100%;" >}}

### Available Software Catalog Actions

Below is a comprehensive list of actions available for Software Catalog in Datadog Workflow Automation. Note that this list may evolve as new actions are added. 

- **Templating**
  - "Apply template" to pass in parameters to a set of files
- **Github**
  - "Create or update file" to create new files
  - "Edit configuration file" to manipulate YAML or JSON files
  - "Trigger GitHub Actions workflow run" to initiate a GitHub Action
  - "Search repositories" to return a list of repositories
  - "Create pull request" to open a pull request
- **Retrieve Service Information**
  - "Get service definition" for a single service
  - "List service definitions" to get all definitions from Datadog Software Catalog
  - "Get service dependencies" to get a service's immediate upstream and downstream services
- **Incident Triage**
  - "Get service PagerDuty on call"
  - When integrated with other actions, you can trigger workflows based on critical events (for example, execute runbooks).
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
