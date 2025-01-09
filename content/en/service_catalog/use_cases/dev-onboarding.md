---
title: Accelerate Developer Onboarding
aliases:
  - /tracing/service_catalog/guides/dev_onboarding
  - /service_catalog/guides/dev_onboarding
  - /service_catalog/use_cases/dev_onboarding
  - /tracing/service_catalog/use_cases/dev_onboarding
further_reading:
  - link: "/service_catalog/scorecards/"
    tag: "Documentation"
    text: "Datadog Scorecards"
  - link: "/service_catalog/software_templates/"
    tag: "Documentation"
    text: "Datadog Scorecards"
---

Datadog's Service Catalog automates key tasks and centralizes essential resources-such as docs, runbooks, [scorecards][1], and [templates][2]-to reduce time-to-first-commit and optimize the overall developer experience.

{{< img src="tracing/service_catalog/dev-onboarding-use-case-overview.png" alt="A service's home page, showing information like documentation and repository links, service owners, and on-call details." >}}

## Quick access to documentation and standards

Service Catalog acts as a single source of truth for your engineering environment. Newly onboarded developers can:

- Quickly locate relevant [APIs][3], services, repositories, and dependencies.
- Access up-to-date documentation, code snippets, and runbooks, and start to make meaningful contributions.
- Navigate [organized metadata and organizational inventory][4] to understand the team's structure, communication channels, and best practices.

{{< img src="tracing/service_catalog/dev-onboarding-use-case-workflows.png" alt="The side panel view of an API in the service catalog, showing a flow chart of services that consume the API, an OpenAPI Preview, and API metadata." >}}


## Automate onboarding workflows

[Software Templates][2] reduces the manual toil of onboarding by standardizing and streamlining common tasks. With Software Templates, you can:

- Kick off [onboarding workflows][2] that automatically provision Git repos, assign PagerDuty schedules, or notify relevant Slack channels.
- Integrate with third-party tools and systems to ensure every new developer starts with the correct permissions, environments, and resources.
- Scale onboarding processes as your team grows while maintaining consistency and quality across new hires.

[Explore blueprints][5] to automate developer onboarding tasks.

{{< img src="tracing/service_catalog/dev-onboarding-use-case-app-builder.png" alt="The app builder landing page, which shows pre-configured blueprints for commom dev workflows." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/scorecards/
[2]: /service_catalog/software_templates/
[3]: /api/latest/api-management/
[4]: /account_management/teams/
[5]: /service_management/app_builder/