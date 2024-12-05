---
title: Datadog Integration
---

## Overview

The integration between Datadog and Cloudcraft provides users with a streamlined workflow for monitoring and visualizing their cloud infrastructure.

By leveraging Datadog’s powerful monitoring platform, users can log in to Cloudcraft with their Datadog account, move seamlessly from any resource in Cloudcraft to the relevant views in Datadog, and automatically pull cloud accounts that have already been configured in Datadog for use in Cloudcraft.

## Datadog Single Sign-On (SSO)

Cloudcraft allows users to sign up and log in using their Datadog account. This integration offers a unified experience, linking your Datadog monitoring data with your Cloudcraft architecture diagrams.

### Sign up with Datadog SSO

To get started, choose the **Sign up with Datadog** option during the Cloudcraft sign-up process. After signing up, you can log in to Cloudcraft using your Datadog credentials. This simplifies the login process and enables integration between the two platforms.

By using Datadog SSO, you automatically gain access to:

- **Cross-platform functionality**: Move effortlessly between Cloudcraft and Datadog to analyze your cloud infrastructure and its performance.
- **Automated cloud account integration**: Cloud accounts configured in Datadog are automatically added to Cloudcraft, giving you a complete view of your infrastructure in both platforms.

### Enable Datadog SSO for existing accounts

If you originally signed up with a different login method, for example, Google SSO or a standard username and password, you won’t have access to the full set of Datadog integration features. To switch to Datadog SSO, [contact the Cloudcraft support team][1] and they will assist you in converting your account.

## Cloud account integration

<div class="alert alert-info">This feature supports only Amazon Web Services (AWS) accounts. Syncing with Azure or other cloud providers is not available at this time.</div>

The integration between Cloudcraft and Datadog streamlines cloud account management, allowing accounts already configured in Datadog to be automatically added to Cloudcraft. No additional setup is required in Cloudcraft.

By default, these accounts are shared with all members of your Cloudcraft team, ensuring easy access for everyone.

{{< img src="cloudcraft/getting-started/datadog-integration/manage-aws-accounts.png" alt="Manage AWS accounts interface in Cloudcraft with Datadog integration." responsive="true" style="width:100%;">}}

To visualize and diagram resources in Cloudcraft, [ensure resource collection is enabled in Datadog][2]. When resource collection is enabled, Datadog collects information about your AWS resources by making read-only API calls to your AWS account. Cloudcraft relies on this information for visualizing your infrastructure. Without this feature, your AWS accounts will be added to Cloudcraft, but no resources will be available for diagramming.

If you don't have any AWS accounts added in Datadog, you'll need to add them first. Follow the instructions in the [AWS integration guide][3].

### Manage pulled AWS accounts in Cloudcraft

AWS accounts pulled from Datadog are marked with the Bits icon in the account selector under the **Live** tab in Cloudcraft.

{{< img src="cloudcraft/getting-started/datadog-integration/bits-icon.png" alt="Cloud account selector displaying AWS accounts managed in Cloudcraft and Datadog integration." responsive="true" style="width:100%;">}}

If you have many accounts but only need to focus on a few, you can use the visibility settings to hide specific accounts from the account selector in the **Live** tab.

To manage the visibility settings of these accounts:

1. Go to **User > AWS Accounts**.
2. Select the **Edit** icon (the pencil icon next to the account name).
3. Toggle the **Visibility on Live** tab option to control whether the account is visible to the team.

To manage the name of the account:

1. Go to **User > AWS Accounts**.
2. Select the **Edit** icon (the pencil icon next to the account name).
3. Update the account name in the **Name** field.

<div class="alert alert-info">Changes to name or visibility settings will not impact the account in Datadog.</div>

### Performance benefits

AWS accounts pulled from Datadog offer improved performance when creating diagrams in Cloudcraft compared to accounts added directly in Cloudcraft, as Cloudcraft uses data already collected by Datadog instead of AWS APIs.

## The Bits menu

The Bits menu in Cloudcraft is your gateway to accessing relevant Datadog insights from any resource in your architecture diagram. Whether you need to look at logs, view APM traces, or analyze metrics, the Bits menu offers seamless, context-driven navigation from Cloudcraft to Datadog with just a click.

For more detailed information on how to use the Bits menu, refer to [the Bits menu documentation][4].

[1]: https://app.cloudcraft.co/app/support
[2]: /integrations/amazon_web_services/#resource-collection
[3]: /integrations/amazon_web_services/
[4]: /cloudcraft/getting-started/using-bits-menu/
