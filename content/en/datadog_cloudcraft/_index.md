---
title: Cloudcraft in Datadog
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloudcraft in Datadog is not supported on this site.</div>
{{< /site-region >}}

## Overview

Cloudcraft offers a powerful, live read-only visualization tool for cloud architecture, enabling you to explore, analyze, and manage your infrastructure with ease. Not to be confused with the [Standalone Cloudcraft documentation][1], this guide outlines the functionality, setup, and use cases of Cloudcraft *in Datadog*, detailing its benefits for various user personas, and highlighting key features and capabilities.

Cloudcraft's core functionality is its ability to generate detailed architecture diagrams. These diagrams visually represent AWS cloud resources, allowing you to explore and analyze your environments. Cloudcraft's diagrams are optimized for clarity and performance, providing an intuitive interface for navigating large-scale infrastructures. This helps teams to:

- Trace incidents back to their root causes through infrastructure dependencies.  
- Determine if infrastructure is the cause of an incident, such as cross-region traffic causing latency or increased costs.  
- Analyze and address the most relevant security misconfigurations.  
- Onboard new team members.  
- Accelerate incident MTTR and proactive governance tasks by simplifying infrastructure navigation.

{{< img src="datadog_cloudcraft/cloudcraft_datadog.mp4" alt="Cloudcraft in Datadog video" video=true >}}

## Onboarding 

To get started with Cloudcraft, users must add one or more AWS account integrations with sufficient permissions, and enable Resource Collection for them.

<div class="alert alert-info">Cloudcraft in Datadog is currently only available for AWS accounts.</a></div>

### Prerequisites

- [Resource collection][2] must be enabled for your AWS accounts.   
- For the best experience, Datadog strongly recommends to use the AWS-managed [`SecurityAudit`][5] policy, or the more permissive [`ReadOnlyAccess`][6] policy. If you have advanced security requirements, it is possible to create a [custom IAM role with more limited permissions][4], however, this may not be compatible with other Datadog products.
- To view security misconfigurations, [CSM][3] must be enabled.

**Note**: Cloudcraft adapts to restrictive permissions by excluding inaccessible resources. For example, if you opt to not grant permission to list S3 buckets, the diagram will simply exclude those buckets. If permissions block certain resources, an alert is displayed in the UI.

## Saved views

Saved views offer a convenient way to apply predefined sets of group-bys and filters, allowing you to view your resources from different perspectives. This feature simplifies the process of applying groupings and filters to your diagrams, allowing you to focus on specific aspects of your architecture.

Cloudcraft provides three built-in saved views: [Infrastructure](), [Network](), and [Security](). These presets are designed to address different operational needs.

[1]: /cloudcraft
[2]: /security/cloud_security_management/setup/cloud_integrations?tab=aws
[3]: /security/cloud_security_management
[4]: https://docs.datadoghq.com/cloudcraft/advanced/minimal-iam-policy/
[5]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html
[6]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html
