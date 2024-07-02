---
title: Laying the groundwork
description: "How to get started and which key decisions you should make at the very beginning."
private: true
---

This part of the guide covers the key decisions you should make at the very beginning of your journey as a Datadog Managed Service Provider.

## Key considerations for managed service providers

The way you as a service provider get started with Datadog depends on your business model and your operational model:

- **Business model**: A key question to answer is whether you are planning on giving your clients their own access to Datadog or not. If you do choose to give clients access to Datadog, set up a multi-organization account to keep client data separate and private.
- **Operational model**: Another key consideration is whether your client base consists of many homogeneous clients, where programmatic management of many similar-looking Datadog organizations is more important, or whether your clients are fewer or more heterogeneous.

Having considered the above, you are ready to lay the groundwork for your MSP setup with Datadog.

## Prerequisites

Before working on implementing Datadog as a service provider, it is recommended that you complete the [Datadog Technical Specialist training][16] in the DPN portal.

The training and certification familiarize you with many of the topics covered in the next chapters, enabling you to get started immediately.

## Organization setup

One of the key decisions for a service provider to make is how to set up client Datadog accounts, called "organizations" (or "orgs" for short). While users can be associated with more than one organization, monitored resources are tied to a single organization. Choosing the right organization structure from the beginning helps to quickly create value for you and your clients.

### Single-organization or multiple-organization

Datadog offers the possibility of managing multiple child organizations from one parent organization. This is the typical deployment model used by MSPs to prevent clients from having access to each others' data. In a multi-org setup, one child organization is created for each client, and the client is restricted to their own child organization. See [Client org provisioning options](#client-org-provisioning-options) for more information.

Use a single-org setup if you have no plans to give your clients access to Datadog and do not have a strict requirement to separate client data.

For more information about organization management, see the [Managing Multiple Organization Accounts][1] documentation.

### Separate orgs for dev, test and production?

A common question from MSP partners is whether separate Datadog orgs should be set up to manage development, test, and production resources in environments.

Datadog does not recommend separating development, test, and production resources. The recommended approach is to manage all resources in the same Datadog organization and delineate the environments through tags. For more information, see [Tagging strategy][20].

## Client org provisioning options

If you are managing your clients' Datadog org(s), you may want to control the org provisioning process and carry out administrative functions in the org such as provisioning new users, setting up access methods, defining role-based access, and managing client usage.

To do so:

1. [Create a child organization under your parent account.](#create-a-child-organization-under-your-parent-account)
2. [Retrieve the new child organization's Org ID.](#retrieve-the-new-client-orgs-org-id)
3. [Separate the new child organization from your parent account.](#separate-the-new-child-organization-from-your-parent-account)
4. [Register the new client details in the DPN portal.](#register-the-new-client-details-in-the-dpn-portal)
5. [Create a child organization under the organization created in Step 1 above.](#create-a-new-child-organization-under-the-organization-created-in-step-1-above)

As a result:

- A new parent organization is created for the purpose of managing one or more child organizations for your new client.
- The new parent organization and client child organization is registered and attached to a billing contract.
- You can provision new users, configure their access methods, define role-based access, and manage the usage for your new client child organization.

### Create a child organization under your parent account

There are two options for this step:

- Use the UI: Click "New Organization" as described in [Managing Multiple Organization Accounts][1].
- Use the API: Use the [Create a child organization][18] endpoint.

### Retrieve the new client org's org ID

You can retrieve the ID of the Datadog org you are logged into by opening the browser's JavaScript console and typing the following:

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

You can also create a bookmark named `Get Datadog OrgId` which contains the following JavaScript function:

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog OrgId is " + orgId);})();
```

Then, when you are on a Datadog page, click on the bookmark to display the current org ID in a browser alert box.

### Separate the new child organization from your parent account

There are two options for this step:
    - Self-service: Use the [Spin-off Child Organization][19] API endpoint to make the new organization a standalone parent org.
    - Assisted: Contact your Partner Sales Manager to remove the new organization from your parent account.

### Register the new client details in the DPN portal

- Log in to the [DPN portal][16] and click `+Register Deal` on the Deal Dashboard.

- Enter the new client details including the new client organization's Org ID to register the new client org.

### Create a new child organization under the organization created in Step 1 above

1. Switch to the org created in [Step 1 above](#create-a-child-organization-under-your-parent-account).
2. Create a client child organization following the instructions in [Step 1 above](#create-a-child-organization-under-your-parent-account).

## Custom subdomains

To improve your Datadog experience when handling a large number of organizations, use the custom subdomain feature.

By default, any Datadog organization is accessed through Datadog's access pages, [https://app.datadoghq.com][2] and [https://app.datadoghq.eu][3]. However, custom subdomains can provide a unique URL for each sub-organization. For example, `https://account-a.datadoghq.com`.

For more information, see [Custom sub-domains][4].

## User roles and custom role-based access control (RBAC)

Experience shows that both MSP-internal and client users often do not fall clearly into one of the three [Datadog default roles][5]. It's a good practice to create custom roles to limit user permissions in certain areas.

For more information, see:

- [Custom roles][6]
- [Role Based Access Control][7]

## Single sign-on (SSO) considerations

In a service provider context, you have two considerations for single sign-on (SSO):

- Single sign-on for your organization
- Single sign-on for your clients

Besides the obvious advantage of a unified authentication mechanism, using SAML Single Sign-On also vastly simplifies the user provisioning process. Using SAML allows you to use just-in-time (JiT) user provisioning, eliminating the need to manually or programmatically create users.

SAML authentication is enabled on a Datadog organization or sub-org, meaning you can have different SAML providers for different sub-orgs. However, this also means that if you have two groups of users with different SAML providers, those users have to be in separate orgs. Make sure you think about SAML authentication when planning your multi-organization setup.

For more information, see:

- [Set up SAML][8] for multiple-organization accounts
- [Single sign-on with SAML][9]

## Managing users

### User creation

Datadog offers multiple ways to quickly provision users for their respective organizations:

- [Add batches of users through the UI][10]
- [Create users through the API][11]
- Use an authentication service like SAML together with [Just-in-Time (JiT) provisioning][12]

### User training

Datadog's goal is to provide a service that is easy and intuitive to use. Experience shows that most users feel comfortable working with the product, and learning as they go along.

Here are some useful resources for users that prefer to have training on the most important aspects of the product:

- [Datadog's YouTube channel][13]: With introduction videos posted whenever new features are released as well as videos on Tips & Tricks and Best Practices, Datadog's YouTube channel is a great source for high-level training.
- [Datadog Learning Center][14]: The Datadog Learning Center is a great way for users to get to know the platform in-depth. When signing up for the Learning Center, a Datadog sandbox environment is automatically provisioned free of charge, allowing users to play around with the product without fear of breaking anything.
- [The Datadog Blog][15]: With over 700 entries, the blog is a key source of information on how to use Datadog to monitor key services, tools, and technologies in your client environments, as well as information on the latest product releases.
- [Datadog Partner Network (DPN) Enablement Center][16]: Through the DPN, Datadog partners have access to a series of video courses for service provider salespeople and technical professionals.

Reach out to your Datadog partner representative if you plan on building your own training material for your clients and have any recommendations on what content would be helpful.

## What's next?

The next part of the guide, [Data Intake][17], focuses on feeding data into Datadog.

[1]: /account_management/multi_organization/
[2]: https://app.datadoghq.com
[3]: https://app.datadoghq.eu
[4]: /account_management/multi_organization/#custom-sub-domains
[5]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: /account_management/rbac/?tab=datadogapplication#custom-roles
[7]: /account_management/rbac/
[8]: /account_management/multi_organization/#set-up-saml
[9]: /account_management/saml/
[10]: /account_management/users/#add-new-members-and-manage-invites
[11]: /api/latest/users/#create-a-user
[12]: /account_management/saml/#just-in-time-jit-provisioning
[13]: https://www.youtube.com/user/DatadogHQ
[14]: https://learn.datadoghq.com/
[15]: https://www.datadoghq.com/blog/
[16]: https://partners.datadoghq.com/
[17]: /partners/data-intake/
[18]: /api/latest/organizations/#create-a-child-organization
[19]: /api/latest/organizations/#spin-off-child-organization
[20]: /partners/data-intake/#tagging-strategy
