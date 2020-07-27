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
  - Graph of occurrences over time
  - When it was first and last seen
  - Number of occurrences in the selected time period

### Time range

{{< img src="real_user_monitoring/etracking_time_range.png" alt="Error Tracking Time Range"  >}}

The time range appears on the very top right of the Explorer as a timeline. This feature allows you to __display issues having error occurrences within the selected time period__. Quickly change the time range by selecting a preset range from the dropdown.

### Facets

{{< img src="real_user_monitoring/etracking_facet.png" alt="Error Tracking Facets"  >}}

Error Tracking automatically indexes a predefined list of attributes from your issues and creates facets out of it. A facet displays all the distinct members of an attribute for the selected time period and provides some basic analytics, such as the number of issues represented. __They allow you to pivot or filter your issues based on a given attribute__.

## Inspect an issue

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


