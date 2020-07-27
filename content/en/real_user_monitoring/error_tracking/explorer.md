---
title: RUM Error Tracking Explorer
kind: documentation
beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/dashboards/"
  tag: "Documentation"
  text: "Visualize your RUM data in out of the box Dashboards"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

{{< img src="real_user_monitoring/etracking_explorer.png" alt="Error Tracking Explorer"  >}}

## Explore your issues

The Error Tracking Explorer allows you to explore all your different issues: an issue is a __group of similar errors related to the same bug__. We compute a fingerprint for each error using some of its attributes such as the __error type__, the __error message__ or the __stack trace__. __Errors with the same fingerprint are grouped together within the same issue.__ 

Each item listed in the explorer is an issue and contains high-level information about it:

- The error type and the error message
- The path to the file in which underlying errors are fired
- Important information about issue’s lifetime:
  - When it was first and last seen
  - Graph of occurrences over time
  - Number of occurrences in the selected time period

### Time range

{{< img src="real_user_monitoring/etracking_time_range.png" alt="Error Tracking Time Range"  >}}

The time range appears on the very top right of the Explorer as a timeline. This feature allows you to __display issues having error occurrences within the selected time period__. Quickly change the time range by selecting a preset range from the dropdown.

### Facets

{{< img src="real_user_monitoring/etracking_facet.png" alt="Error Tracking Facets"  >}}

Error Tracking automatically indexes a predefined list of attributes from your issues and creates facets out of it. A facet displays all the distinct members of an attribute for the selected time period and provides some basic analytics, such as the number of issues represented. __They allow you to pivot or filter your issues based on a given attribute__.

## Inspect an issue

Click on any issue to open the Issue Panel and see more information about it.

{{< img src="real_user_monitoring/etracking_issue_panel_upper_part.png" alt="Upper Part of the Error Tracking Issue Panel"  >}}

The __high-level details__ you need when troubleshooting an issue can be found in the upper part of the panel. From here, __you can understand its lifecycle__: first and last occurence dates, total count as well as the count over time for the given issue.

{{< img src="real_user_monitoring/etracking_issue_panel_lower_part.png" alt="Lower Part of the Error Tracking Issue Panel"  >}}

The lower part of the Issue Panel gives you the ability to __navigate error samples from the related issue__. Each error sample gives you important information while troubleshooting, some important examples:

- The stack trace where each stack frame provides a code snippet centered on the line of code that fired the error.
- Information about the RUM session in which the error occurred if actually collected by the RUM SDK.
- Information about the user such as the browser or the OS with the related versions that were used when the error occurred.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


