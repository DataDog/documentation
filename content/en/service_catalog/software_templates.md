---
title: Software Templates
kind: documentation
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


## Automate common workflows
Use [Workflow Automation][14] and [App Builder][24] to automate end-to-end processes. Integrate them with Datadog's Service Catalog to enable dynamic and self-service workflows.

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Software Templates are in private beta. Complete the form to request access.
{{< /callout >}} 

### Create software template workflows using Cookiecutter
To use software templates in Datadog, create a git repository with the desired template. Then, navigate to the [Workflow Automation][26] page to configure the template in Datadog. A common choice for templating is [Cookiecutter][25], an open source project for project templates and auto-generating new projects. Check out [this gist](https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md) for a quick-start guide, or complete the following steps.

1. [Create a workflow][27] for your template:
   - From the [Workflow Automation][26] page, click **New Workflow**. 
   - Enter a name, add relevant tags, and define the input parameters you want to collect from users.
  
2. Configure the templating workflow:
   - Use GitHub, Gitlab, or HTTP [workflow actions][28] to retrieve your template files.
   - Use Cookiecutter to generate the project files from the template.
     - Tip: Create and invoke an [AWS lambda function][29] to generate the project with Cookiecutter.
   - Use GitHub, Gitlab, or HTTP [workflow actions][28] to upload the project files to the repository.
   - Save the workflow.

  {{< img src="tracing/service_catalog/templating-workflow.png" alt="Workflow for building software template automation" style="width:100%;" >}}

3. Create your templating app:
   - Navigate to **Service Mgmt** > **App Builder** and select **New App**.
   - Enter a name and description, and use the drag-and-drop editor to create a form that collects the required parameters for your template.
   - Select **New Query**, and use the **Trigger workflow** action to call your templating workflow and pass in the relevant parameters.
   - Create a **Buttom** that submits the form, triggers your workflow, and passes in the parameters for the template.
   - Save and publish the app.

4. Run your application and workflow:
   - Click **View App** to view the app on a standalone page, or **Add to a Dashboard** to place the app in a dashboard.
   - Navigate to **Service Mgmt** > **App Builder**, and select your app. Fill out the template form, and click the submit button.
   - Track the success of the workflow templating process in [Workflow Automation][26].

  {{< img src="tracing/service_catalog/templating-app.png" alt="Application for managing software templates through App Builder" style="width:100%;" >}}

### Find Service Catalog actions
To explore the complete set of actions specifically related to Service Catalog, navigate to the [Datadog Action Catalog][23]. Filter for the actions you need:

1. **Access the Action Catalog**: Look for the Action Catalog within your Datadog Workflow Automation environment.
2. **Search Functionality**: Use the search bar to search for keywords like "Service Catalog" or more specific terms related to desired actions (for example, "get service dependencies").

### Available Service Catalog Actions

Below is a comprehensive list of actions available for Service Catalog in Datadog Workflow Automation. Note that this list may evolve as new actions are added. 

- **Retrieve Service Information**
  - "Get service definition" for a single service
  - "List service definitions" to get all definitions from Datadog Service Catalog
  - "Get service dependencies" to get a service's immediate upstream and downstream services
- **Incident Triage**
  - "Get service PagerDuty on call"
  - When integrated with other actions, you can trigger workflows based on critical events (for example, execute runbooks). 
