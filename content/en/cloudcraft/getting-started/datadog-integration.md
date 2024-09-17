---
title: Datadog Integration
---

## Overview

The integration between Datadog and Cloudcraft provides users with a streamlined workflow for monitoring and visualizing their cloud infrastructure.

By leveraging Datadog’s powerful monitoring platform, users can log in to Cloudcraft with their Datadog account, move seamlessly from any resource in Cloudcraft to the most relevant views in Datadog, and automatically synchronize cloud accounts that have already been configured in Datadog for use in Cloudcraft.

## Datadog Single Sign-On (SSO)

Cloudcraft allows users to sign up and log in using their Datadog account. This integration offers a unified experience, linking your Datadog monitoring data with your Cloudcraft architecture diagrams.

### Sign up with Datadog SSO

To get started, choose the **Sign up with Datadog** option during the Cloudcraft sign-up process. After signing up, you can log in to Cloudcraft using your Datadog credentials. This simplifies the login process and enables integration between the two platforms.

By using Datadog SSO, you automatically gain access to:

- **Cross-platform functionality**: Move effortlessly between Cloudcraft and Datadog to analyze your cloud infrastructure and its performance.
- **Automated cloud account synchronization**: Cloud accounts configured in Datadog sync automatically with Cloudcraft, giving you a complete view of your infrastructure in both platforms.

### Enable Datadog SSO for existing accounts

If you originally signed up with a different login method, for example, Google SSO or a standard username and password, you won’t have access to the full set of Datadog integration features. To switch to Datadog SSO, [contact the Cloudcraft support team][1] and they will assist you in converting your account.

## Sync cloud accounts

<div class="alert alert-info">This feature supports only Amazon Web Services (AWS) accounts. Syncing with Azure or other cloud providers is not available at this time.</div>

The integration between Cloudcraft and Datadog streamlines cloud account management, allowing your cloud accounts to sync between the two platforms. When you add your cloud account to Datadog, the cloud account is automatically added to and synced with Cloudcraft, so there's no need to add the account separately in Cloudcraft.

### How it works

1. **Add your cloud account to Datadog**: Once you integrate your AWS account with Datadog, Cloudcraft automatically recognizes the account without further action on your part.
2. **Resource Collection**: Ensure that **Resource Collection** is enabled in Datadog for this feature to function properly. Without this setting, the sync between Datadog and Cloudcraft does not work.

For detailed instructions on how to add your AWS account to Datadog and enable Resource collection, please refer to the [AWS integration documentation][2].

## The Bits menu

The Bits menu in Cloudcraft is your gateway to accessing relevant Datadog insights from any resource in your architecture diagram. Whether you need to look at logs, view APM traces, or analyze metrics, the Bits menu offers seamless, context-driven navigation from Cloudcraft to Datadog with just a click.

For more detailed information on how to use the Bits menu, please refer to [the full documentation][3].

[1]: https://app.cloudcraft.co/app/support
[2]: /integrations/amazon_web_services/
[3]: /cloudcraft/getting-started/using-bits-menu/
