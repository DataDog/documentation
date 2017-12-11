---
title: Testing the Log Management Beta - Suggested Questions for Feedback
kind: faq
customnav: lognav
---

Datadog's Log Management product is currently in private beta. If you are among the private beta testers, these are some questions you may want to consider so as to help you give really great feedback.

If you can submit your feedback in [this survey form](https://goo.gl/forms/pKr772ZzYVkctxpJ3), we'd really appreciate it!

 
## Sending Logs

1. Is there anything difficult about the setup process of the dd-logs-agent?
2. Were you able to easily apply sufficient metadata and tags to your logs?
3. If you used any agent-side processing features (redaction, dropping, multi-line logging), were they easy to set up? Were they effective?
4. Are there any agent-side processing features that are currently lacking?
5. Are all three of the methods of collecting logs via the dd-agent (file tailing, TCP, and UDP) sufficient for your needs, and were they easy to set up?
6. Are there any libraries that would make it easier for you to send logs to datadog if they existed?

## Processing Logs

1. If you created your own processing pipeline, were the instructions in the app and the documentation clear?
2. Were you able to structure your logs the way you wanted? If not, what was missing?
3. What, if anything, could make the process of setting up custom log processing easier?

## Integrations

1. Were the integrations easy to set up? Were the instructions straight-forward?
2. For each integration you used, was there anything missing in the way the logs were structured? Were there any fields you would have liked to see?
3. Were the OOTB dashboards useful? What kinds of modificaitons might you recommmend there? (Generally, or for specific integrations)

## Searching logs

### General

1. Do you find the design of the log explorer intuitive and appealing? If not, can you explain why?

### Search bar

1. Is it easy and intuitive to use?

### Facets (Scope-navigation)

1. Facets make it faster and easier to search your logs. Do you find yourself using facets rather than relying on raw text searches?
2. Do you find the facets useful? Do they effectively narrow down your log searches and help you identify the specific logs you need to find in an investigation?
3. Does the facet-bar give you a good user experience? Could it be better in some way?
4. Is way to add facets easy and intuitive?
5. What more do you wish you can do with facets?

### Time-navigation

1. Are you able to zoom in/out of log-search time-frames easily?
2. Were there any cases where you think it could have been easier to transition to a different time-range that you wanted?

### Log Stream

1. Is the log stream easy to read? Would anything specific make it easier to read?
2. Are the default column values appropriate? Are there any additions you'd encourage us to make a default?

### Expanded Log View

1. Is all the data provided sufficiently clear / explained? Is anything ambiguous?
2. Is there sufficient metadata? What else would you like to see in this view that isn't already there?
3. Does the "View in Context" button help? Would you prefer that it do something else, or that other similar buttons existed?

### Calls-to-action

1. In the expanded view of a log, if you select a hostname, a tag, or an attribute, you are given some dropdown options ("calls-to-action"). Are the existing options useful for them all?
2. Are there other options that would be helpful to add?
3. What other things in the log explorer page would you like to have a "calls-to-action" dropdown list added to?

### Transitions between logs and metrics

1. When viewing logs in the log explorer, what other pages in Datadog would you like to be able to jump to?
2. When viewing logs in the log explorer, what other pages outside of Datadog would you like to be able to jump to?
3. Today you can jump from any Datadog graph to a log explorer view that scopes to the same tags and time period as what was selected. From what other pages or objects in Datadog would you like to be able to jump to logs? Can you describe your ideal workflow there?
4. Today when you jump from somewhere else in Datadog to a log explorer view, it opens a fresh log explorer in a new tab. Is this sufficient for your needs? Are there other ways of making that transition that you would prefer?

### Screen board logstream widget

1. Is the log stream widget easy to set up?
2. When you add dashboard template variables to your log stream queries, is that intuitive?
3. Screen board logstream widgets can link you to log explorer views. Are these links relevant? Are there additional links you would add?

### Log Views in Host Map

1. Are the log views in the hostmap useful? What could make them more useful?
2. The log views are currently nested under specific integrations (log sources). Would other ways of exposing logs in the hostmap be better?

### Notebooks

1. Is it easy to find the logs you need in your notebooks? What could make that easier?