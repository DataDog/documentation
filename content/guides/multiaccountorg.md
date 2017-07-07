---
title: Configuring Teams & Organizations with Multiple Accounts
kind: guide
listorder: 18
---

There are two ways to have multiple accounts have access to the same data. First, you can simply add multiple users to the same team from the [Team Page](https://app.datadoghq.com/account/team). The second is through the use of organizations. Organizations are typically used by Managed Service Providers which have multiple large scale customers which should not have access to each others' data. When a user is added to multiple organizations, they will be able to quickly switch between orgs from the avatar menu in the main menu.

![Switch Accounts](/static/images/guides-multacct-switchaccts.png)
{:style="width:200px;"}

## Teams

### Add New Members

1. To add members to a team, start by visiting the [Team Page][Teampage].
2. Enter the email address of the person you want to add to your team. Click **Invite Users**
  ![Add Member To Team](/static/images/guides-multacct-addtoteam.png)

The new user will receive an email with a link to login.

### Disable Existing Members
***NOTE:** You must be an Admin of the team to disable members*

1. Go to the [Team Page][TeamPage].
2. Hover over the avatar for the user you wish to disable. Choose **Disable** from the menu.

    ![Disable Member](/static/images/guides-multacct-disable.png)
    {: style="width:200px;"}

### Promote Existing Members to Admin
***NOTE:** You must be an Admin of the team to promote members*

1. Go to the [Team Page][TeamPage].
2. Hover over the avatar for the user you wish to promote. Choose **Make Admin** from the menu.

## Organizations

The Multi-Account Organizations feature must be enabled by support. If this is a feature you need, please contact support at [support@datadoghq.com](mailto:support@datadoghq.com).

### Create a New Organization

1. After the feature has been enabled, visit the [New Account Page](https://app.datadoghq.com/account/new_org).
2. Enter the name of the organization you wish to create and click the **Create** button.

    ![Create Org](/static/images/guides-multacct-createorg.png)

A new trial account will be created. If you wish to add this account to your existing billing settings, please contact your sales representative.

### Leave an Organization

1. Go to your [Account Profile page](https://app.datadoghq.com/account/profile).
2. Scroll down to Organizations and click **Leave** next to the org you want to leave.

    ![Leave Org](/static/images/guides-multacct-leaveorg.png)


To add, disable, and promote members, see the instructions above for Teams.




[TeamPage]: https://app.datadoghq.com/account/team
