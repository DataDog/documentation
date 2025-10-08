---
title: Accelerate Developer Onboarding
aliases:
  - /tracing/software_catalog/guides/dev_onboarding
  - /software_catalog/guides/dev_onboarding
  - /tracing/software_catalog/use_cases/dev_onboarding
  - /tracing/service_catalog/guides/dev_onboarding
  - /service_catalog/guides/dev_onboarding
  - /service_catalog/use_cases/dev_onboarding
  - /tracing/service_catalog/use_cases/dev_onboarding
  - /software_catalog/use_cases/dev_onboarding
further_reading:
  - link: "/software_catalog/scorecards/"
    tag: "Documentation"
    text: "Datadog Scorecards"
  - link: "/software_catalog/software_templates/"
    tag: "Documentation"
    text: "Datadog Software Templates"
  - link: "https://www.datadoghq.com/blog/software-catalog/"
    tag: "Blog"
    text: "Improve developer experience and collaboration with Software Catalog"
---

Datadog's Software Catalog automates key tasks and centralizes essential resources (such as docs, runbooks, [scorecards][1], and [templates][2]) to reduce time-to-first-commit and optimize the overall developer experience.

{{< img src="tracing/software_catalog/dev-onboarding-use-case-overview.png" alt="A service's home page, showing information like documentation and repository links, service owners, and on-call details." >}}

## Quick access to documentation and standards

Software Catalog acts as a single source of truth for your engineering environment. Newly onboarded developers can:

- Quickly locate relevant [APIs][3], entities, repositories, and dependencies.
- Access up-to-date documentation, code snippets, and runbooks, enabling them to start making meaningful contributions.
- Navigate [organized metadata and organizational inventory][4] to understand the team's structure, communication channels, and best practices.

{{< img src="tracing/software_catalog/dev-onboarding-use-case-workflows.png" alt="The side panel view of an API in the Software Catalog, showing a flow chart of services that consume the API, an OpenAPI Preview, and API metadata." >}}


## Automate onboarding workflows

[Software Templates][2] reduces the manual toil of onboarding by standardizing and streamlining common tasks. With Software Templates, you can:

- Kick off onboarding workflows that automatically provision Git repos, assign PagerDuty schedules, or notify relevant Slack channels.
- Integrate with third-party tools and systems to ensure every new developer starts with the correct permissions, environments, and resources.
- Scale onboarding processes as your team grows while maintaining consistency and quality across new hires.

[Explore App Builder blueprints][5] to automate developer onboarding tasks.

{{< img src="tracing/software_catalog/dev-onboarding-use-case-app-builder.png" alt="The App Builder landing page, which shows pre-configured blueprints for common dev workflows." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /software_catalog/scorecards/
[2]: /software_catalog/software_templates/
[3]: /api/latest/api-management/
[4]: /account_management/teams/
[5]: /service_management/app_builder/
