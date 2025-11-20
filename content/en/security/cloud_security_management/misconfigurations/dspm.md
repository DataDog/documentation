---
title: Data Security Posture Management
further_reading:
- link: "/security/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
---

## Overview

Data Security Posture Management (DSPM) for Cloud Security helps you proactively scan your S3 buckets for sensitive data, such as personally identifiable information (PII) and protected health information (PHI), stored in your cloud environments. By layering sensitive data context into your security findings, you can better prioritize remediation and understand potential attack paths across your cloud assets.

By default, organizations setting up Cloud Security for the first time have [Sensitive Data Scanner][1] enabled for S3 buckets. For more information, see [Set up Sensitive Data Scanner for cloud storage][7].

However, this default configuration has cross-region scanning turned off, so you can avoid unexpected cloud service provider costs. For more information, see [Recommended configuration][2].

## Setup

If your organization doesn't have DSPM for cloud storage enabled, you can set it up. Depending on your organization's settings, you may need to [enable Agentless scanning][3] first.
1. On the [**Cloud Security Setup** page][4], click **Cloud Integrations** to expand it.
1. Expand the **AWS** section and click the account you want to enable DSPM for.
1. Under **Features**, in the **Sensitive Data Scanning** section, enable the feature.
   - If your organization has Agentless scanning configured, turn the **Enable** toggle on.
   - If your organization doesn't have Agentless scanning configured, click **Configure Agentless Scanning**. Follow the prompts to set it up, and under **Enable Features**, turn the **Enable Sensitive Data Scanning for Cloud Storage** toggle on.

## View sensitive data findings for s3 buckets

In the Misconfigurations explorer, you can view sensitive data findings alongside other context associated with your s3 buckets, so you can holistically reduce your data attack surface.

To view sensitive data, you need the [Data Scanner Read][5] permission.

1. In Datadog, on the **Findings** page, go to the [Misconfigurations explorer][6]. This link has a query built in to filter for s3 buckets that have sensitive data findings.
1. Click a misconfiguration to expand it, then click an affected resource to open the side panel.
1. Scroll to the **Sensitive Data** tab to view a list of sensitive data matches found for the selected bucket.
   {{< img src="security/csm/misconfigurations_dspm.png" alt="Your image description" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/
[2]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[3]: /security/cloud_security_management/setup/agentless_scanning/enable
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /account_management/rbac/permissions/#compliance
[6]: https://app.datadoghq.com/security/compliance?query=-dd_rule_type%3A%2A%20-vulnerability_type%3A%28application_code_vulnerability%20OR%20application_library_vulnerability%20OR%20container_image_vulnerability%20OR%20iac_misconfiguration%29%20evaluation%3Afail%20%40workflow.triage.status%3A%28open%20OR%20in-progress%29%20%40resource_type%3Aaws_s3_bucket%20%40dd_computed_attributes.sensitive_data%3Atrue&security__aggregation=workflow.rule.name&security__live=true&security__nested-sort=%40evaluation_changed_at-desc&security__sort=severity-desc&security__timestamp=1763599822766&security__view-all=N4XyA&sort=severity-desc#sensitive-data
[7]: /security/sensitive_data_scanner/setup/cloud_storage/