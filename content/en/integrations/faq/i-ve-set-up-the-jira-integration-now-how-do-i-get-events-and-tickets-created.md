---
title: I've set up the JIRA integration, now how do I get events and tickets created?
kind: faq
---

## Configuration

Once the Datadog integration has been set up with JIRA, our integration will determine which issues to pull and push from JIRA based upon the 'Ticket Type' defined within the JIRA tile.
{{< img src="integrations/faq/create_ticket.png" alt="create_ticket"  >}}

In the image above, you can see that there is a 'jira-test2-task' ticket type that has been created. Expand this section and you will see this:
{{< img src="integrations/faq/jira_ticket_type.png" alt="jira_ticket_type"  >}}

The fields set here define how our integration will interact with JIRA. The 'Project Key' field determines which JIRA project this tile references, while the 'Issue Type' field designates the JIRA issue type that will be posted and pulled from the given project board. The 'Tags' field is optional, but here is where you can assign Datadog tags if you would like them attached to events as they are pulled in from JIRA.

The 'Required Fields' field is actually somewhat different in that it only appears after inputting the 'Project Key' and 'Issue Type' and saving the ticket once. This 'Required Fields' section is the area you can add in the values listed at the top of the JIRA tile (the dollar-sign prepended values).

For a more concrete explanation, the ticket type defined above would post/pull JIRA 'Task' issue types from a JIRA project with a project key 'TEST2' and would always include an event message.

## Datadog to JIRA

In DataDog, you can use the @-style notification to reference and push a ticket type to JIRA. In other words, if I define a monitor and reference @jira-test2-task in the monitor's message, every time that monitor alerts it will create a 'Task' issue in the JIRA project with the project key 'TEST2'.

## JIRA to Datadog

All 'Task' issues created in JIRA for the project designated by the key 'TEST2' will be pulled into the Datadog event stream and tagged with the tags defined on the integration tile.

## Important notes

* Our integration scrapes JIRA about every five minutes, but issue types can vary in the amount of time they take to appear in Datadog. Generally, larger issue types like 'Stories' take longer to pull in than smaller ones like 'Tasks'.
* You can pull in multiple issue types from one project, or one issue type from multiple projects.
* The only tags available are those that you define for the Ticket Types on the integration tile.

