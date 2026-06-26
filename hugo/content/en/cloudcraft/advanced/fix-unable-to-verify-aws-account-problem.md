---
title: Fix "unable to verify AWS account" problem
---

If you're getting an "unable to verify AWS account" error when trying to add your AWS account to Cloudcraft, it may be because your organization has attached a service control policy to the account. This prevents Cloudcraft's servers from validating the created IAM role.

To resolve this error, you have the following options:

## Enable access to `us-east-1` region

You can ask your IT team to temporarily enable access to the `us-east-1` region in their policies. This is the region Cloudcraft uses to verify the IAM role. After you add the account, you can then disable the region again, and Cloudcraft will be limited to only scanning components in the regions that aren't blocked.

To help make a stronger case about opening an exception in the policy, you can offer your organization's administrators the option of attaching a minimal IAM policy to the role, limiting what Cloudcraft can and can't read from the AWS account added to the application. For more information, see [Create a minimal IAM policy to use with Cloudcraft][1].

## Use the API to add your account

As an alternative to using the web interface, you can use Cloudcraft's API to add your account and specify which region the account should be checked from. For more information, see [Add AWS accounts via the Cloudcraft API][2].

[1]: /cloudcraft/advanced/minimal-iam-policy/
[2]: /cloudcraft/advanced/add-aws-account-via-api/
