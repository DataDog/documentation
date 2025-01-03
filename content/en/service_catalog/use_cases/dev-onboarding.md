---
title: Accelerate Developer Onboarding
aliases:
  - /tracing/service_catalog/guides/dev-onboarding
  - /service_catalog/guides/dev-onboarding
further_reading:
  - link: "/security/application_security/"
    tag: "Documentation"
    text: "Datadog Application Security Management"
---

Datadog’s Service Catalog helps new developers quickly find what they need—-docs, runbooks, [scorecards][1] and [templates][2]--so they can commit their first PR faster. By centralizing resources and automating key tasks, organizations can improve time-to-first-commit, reduce time spent locating relevant information and resources, and enhance overall developer experience.

{{< img src="tracing/service_catalog/dev-onboarding-use-case-overview.png" alt="A service's home page, showing information like documentation and repository links, service owners, and on-call details." >}}

## Quick Access to Documentation and Standards

Service Catalog acts as a single source of truth for your engineering environment. Newly onboarded developers can:

- Quickly locate relevant [APIs][3], services, repositories, and dependencies.
- Access up-to-date documentation, code snippets, and runbooks, and start to make meaningful contributions.
- Rely on [organized metadata and organizational inventory][4] to understand the team's structure, communication channels, and best practices.

{{< img src="tracing/service_catalog/dev-onboarding-use-case-workflows.png" alt="The side panel view of an API in the service catalog, showing a flow chart of services that consume the API, an OpenAPI Preview, and API metadata." >}}


## Automate Onboarding Workflows

[Software Templates][2] reduces the manual toil involved in onboarding by standardizing and streamlining common tasks:

- Kick off onboarding workflows that automatically provision Git repos [link to scaffolder docs], assign PagerDuty schedules, or notify relevant Slack channels.
- Integrate with third-party tools and systems to ensure every new developer starts with the right permissions, environments, and resources.
- Scale onboarding processes effortlessly as your team grows, maintaining consistency and quality across new hires.

[Explore blueprints][5] to automate developer onboarding tasks.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/scorecards/
[2]: /service_catalog/software_templates/
[3]: /api/latest/api-management/
[4]: /account_management/teams/
[5]: /service_management/app_builder/