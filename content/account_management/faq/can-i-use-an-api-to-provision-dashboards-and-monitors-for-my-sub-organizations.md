---
title: Can I use an API to provision dashboards and monitors for my sub-organizations?
kind: faq
customnav: accountmanagementnav
---

Yes. Onboarding a new sub-organization with a set of baseline dashboards and monitors can be done programmatically via our [API](/api) with tools such as Terraform (see our [blog](https://www.datadoghq.com/blog/managing-datadog-with-terraform/) for details) or via [scripts](https://help.datadoghq.com/hc/en-us/articles/206315975) to backup existing dashboards and monitors as code.

This enables version control within a sub-organization as well as streamlines provisioning of new Datadog sub-organizations. Each integration (such as AWS, GCP & Azure) comes with multiple out of the box templated dashboards that can be cloned and edited as well.