---
title: Fix "unable to verify AWS account" problem
kind: guide
---

If you're getting the "unable to verify AWS account" error when trying to add your AWS account to Cloudcraft, this guide will walk you through how to fix it.

## The problem

This error happens when an organization attaches a service control policy to an account, which prevents Cloudcraft's servers from validating the created IAM role.

## The solution

Suppose a service control policy is attached to your account. In that case, you could ask your IT team to temporarily enable access to the `us-east-1` region in their policies, which is the region Cloudcraft uses to verify the IAM role. Once you successfully add the account, you can then disable the region again, and Cloudcraft will be limited to only scanning components in the regions that aren't blocked.

To help make a stronger case about opening an exception in the policy, you can offer your organization's administrators the option of attaching a minimal IAM policy to the role, limiting what Cloudcraft can and can't read from the AWS account added to the application.

- [Create a minimal IAM policy to use with Cloudcraft][1]

As an alternative, you can also add your account using Cloudcraft's API instead of the web interface, as the API allows you to specify which region the account should be checked from.

- [Add AWS accounts via the Cloudcraft API][2]

If you have any questions or issues with this process, [contact Cloudcraft's support team][3]; they will be happy to help.

[1]: https://help.cloudcraft.co/article/64-minimal-iam-policy
[2]: https://help.cloudcraft.co/article/225-add-aws-account-via-api
[3]: https://app.cloudcraft.co/support
