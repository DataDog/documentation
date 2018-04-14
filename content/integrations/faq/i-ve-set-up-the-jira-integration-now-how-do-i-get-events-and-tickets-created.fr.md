---
title: J'ai mis en place l'intégration JIRA, comment puis-je créer des événements et des tickets?
kind: faq
---

## Configuration

Une fois que l'intégration de Datadog a été configurée avec JIRA, notre intégration déterminera quels problèmes il faut récupérer et envoyer à JIRA en fonction du 'Ticket Type' défini dans la tuile JIRA.
{{< img src="integrations/faq/create_ticket.png" alt="create_ticket" responsive="true" popup="true">}}

Dans l'image ci-dessus, vous pouvez voir qu'il existe un type de ticket 'jira-test2-task' qui a été créé. Développez cette section et vous verrez ceci:
{{< img src="integrations/faq/jira_ticket_type.png" alt="jira_ticket_type" responsive="true" popup="true">}}

The fields set here define how our integration will interact with JIRA. The 'Project Key' field determines which JIRA project this tile references, while the 'Issue Type' field designates the JIRA issue type that will be posted and pulled from the given project board. The 'Tags' field is optional, but here is where you can assign Datadog tags if you would like them attached to events as they are pulled in from JIRA.

The 'Required Fields' field is actually somewhat different in that it only appears after inputting the 'Project Key' and 'Issue Type' and saving the ticket once. This 'Required Fields' section is the area you can add in the values listed at the top of the JIRA tile (the dollar-sign prepended values).

For a more concrete explanation, the ticket type defined above would post/pull JIRA 'Task' issue types from a JIRA project with a project key 'TEST2' and would always include an event message.

## Datadog to JIRA

In DataDog, you can use the @-style notification to reference and push a ticket type to JIRA. In other words, if I define a monitor and reference @jira-test2-task in the monitor's message, every time that monitor alerts it will create a 'Task' issue in the JIRA project with the project key 'TEST2'.

## JIRA to Datadog

All 'Task' issues created in JIRA for the project designated by the key 'TEST2' will be pulled into the Datadog event stream and tagged with the tags defined on the integration tile.

## Important Notes:

* Our integration scrapes JIRA about every five minutes, but issue types can vary in the amount of time they take to appear in Datadog. Generally, larger issue types like 'Stories' take longer to pull in than smaller ones like 'Tasks'.
* You can pull in multiple issue types from one project, or one issue type from multiple projects.
* Currently, the only tags available are those that you define for the Ticket Types on our integration tile.

