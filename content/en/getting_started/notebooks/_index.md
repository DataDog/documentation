---
further_reading:
    - link: 'https://learn.datadoghq.com/courses/create-share-first-notebook'
      tag: 'Learning Center'
      text: 'Create Your First Notebook Course'
    - link: 'https://docs.datadoghq.com/notebooks/advanced_analysis/getting_started/'
      tag: 'Guide'
      text: 'Getting Started with Notebooks Analysis Features'
---

# Getting Started With Datadog Notebooks

This guide introduces Datadog Notebooks and demonstrates how notebook types enhance team collaboration and investigation workflows. You'll learn:
- When to create notebooks
- How to choose the right notebook type
- How teams isolate issues and collaborate through an investigation
  
## Overview

Datadog Notebooks combines live graphs, metrics, logs, monitors, and powerful [Analysis Features](https://docs.datadoghq.com/notebooks/advanced_analysis/getting_started/) to create a collaborative environment using your data in real-time. Teams use notebooks to isolate and investigate issues, document incident details, create interactive guides, and build special reports to enhance their proactive workflows.

### Key Benefits

Notebooks provide:
- **Direct data access**: Query and visualize your Datadog metrics, logs, and traces without leaving the document
- **Real-time collaboration**: Multiple team members can edit simultaneously, leave comments, and track changes
- **Workflow integration**: Create notebooks from alerts, dashboards, logs, or Datadog Case Management to start investigations where issues appear

## Choosing the Right Notebook Type

Selecting the appropriate notebook type helps your team understand the document's purpose and expected outcome. Each type serves a specific workflow need:

**Investigation** notebooks capture real-time troubleshooting efforts. Use this type when exploring unknown issues, unexpected behavior, or system anomalies. Document your discovery process, team collaboration, and successful resolutions.

**Runbook** notebooks provide step-by-step procedures for common tasks. Use this type for deployment processes, incident response workflows, or any repeatable operation your team performs regularly.

**Documentation** notebooks serve as living reference materials. Use this type for system architecture overviews, team onboarding guides, or configuration standards that evolve over time.

**Report** notebooks synthesize findings for stakeholders. Use these to summarize quarterly incidents, present important planning data, or communicate technical decisions to leadership.

**Postmortem** notebooks analyze completed incidents. Create these after service disruptions to document timelines, identify root causes, and track improvement actions.

Every notebook type offers collaboration with others and connects to your Datadog data in real-time.

## Example Case Study: Investigating Log Errors with Notebooks

When error logs appear in your system, creating a Notebook is one click away. Here’s a walkthrough of how your team can use a collaborative notebook to investigate and uncover the root cause of recent check failures. This process allows the team to make the necessary adjustments to prevent similar issues in the future.

### 1. You notice Error spikes in your application Logs:
<br>
{{< img src="/getting_started/notebooks/log-explorer-errors.png" alt="Your image description" style="width:100%;" >}}
</br>

### 2. From the Log Explorer, click "Open in Notebooks" and select "New notebook" on the next screen:
<br>
{{< img src="/getting_started/notebooks/notebooks-button.png" alt="Your image description" style="width:100%;" >}}
<br>

### 3. Select the Investigation notebook type in the upper left corner of the Notebook:
<br>
{{< img src="/getting_started/notebooks/notebook-type.png" alt="Your image description" style="width:100%;" >}}
<br>

The notebook automatically preserves your relevant log data, query, and time range from the Log Explorer:

<br>
{{< img src="/getting_started/notebooks/log-errors-preserved-in-notebooks.png" alt="Your image description" style="width:100%;" >}}
<br>

### 4. Tag Teammates and Investigate Together:

Tag your teammate using @mentions to bring them into the investigation. They can see the same error patterns and add their analysis directly in the notebook. Using Notebooks collaboration features, teammates can communicate and work together in real-time.

In this example, using the _transform_ Analysis Notebook feature, your teammate is able to filter the Log Error messages and see that a specific check is failing:

{{< img src="/getting_started/notebooks/transform-analysis-feature.png" alt="Your image description" style="width:100%;" >}}

### 5. Add a Monitor to your Notebook

You add a Monitor Summary to the notebook using `/monitor` to visualize the status of your host monitor:

{{< img src="/getting_started/notebooks/monitor.png" alt="Your image description" style="width:100%;" >}}

Your teammate leaves a message in the notebook saying that since the Minikube Monitor check shows an OK status, they will need to continue their investigation.

Throughout this investigation, the notebook becomes a living record of your troubleshooting journey—preserving queries, discoveries, and analytical insights for future reference. This example demonstrates the core value of notebooks: they transform the debugging process into documented team knowledge. Your team now has everything captured in a shareable, searchable format that prevents knowledge loss and accelerates future investigations.

## Next Steps With Notebooks

The investigation is only the beginning. Notebooks continue to gain value over time by transforming from reactive documents into proactive resources. An investigation notebook created during an incident can become the foundation for multiple assets:

- Convert your investigation into a **Runbook** by extracting the successful troubleshooting steps. Future responders can follow your proven path rather than starting from scratch. 
- Transform complex investigations into **Documentation** that explains system behavior and known issues. 
- Create quarterly **Reports** by aggregating multiple investigations to identify patterns and systemic improvements.

This evolution creates a centralized knowledge repository that benefits the entire organization. New team members can reference these notebooks during onboarding, on-call engineers can consult them as runbooks during incidents, and leadership can review reports for capacity planning. 

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}