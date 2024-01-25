---
title: Roles and permissions
kind: guide
---

Members of a Cloudcraft team may be assigned one of three different user roles:

- Account Owner.
- Administrator.
- User.

This help article will help you understand what actions each role can perform.

## User roles and their default permissions

### Account owner

The Account Owner has access to everything in your Cloudcraft account and is the only one who can change subscription settings, or view and change billing information.

By default, the person who signed up for a paid Cloudcraft subscription is the Account Owner, but by [sending a message to our support team][1] you can have other members of your team with this role.

**Permissions:**

- Create, edit, and delete private and team-shared blueprints
- Manage subscription settings
- Manage SSO settings (Enterprise)
- Manage team settings
  - Create new teams (Enterprise)
  - Invite new administrators and users
  - Delete administrators and users
  - Revoke team invitations to join your Cloudcraft team
- Manage AWS accounts
  - Connect new AWS accounts
  - Remove AWS accounts
  - Manage team-shared AWS accounts
- Manage API keys
  - Create API keys
  - Delete API keys
  - Manage team-shared API keys

### Administrator

Administrators are the second most privileged role in Cloudcraft, and have access to everything but billing and subscription information.

This role was created for project leads who require permission to manage their team or sub-teams within Cloudcraft.

**Permissions:**

- Create, edit, and delete private and team-shared blueprints
- Manage team settings (for teams they are assigned)
  - Invite new administrators and users
  - Delete administrators and users
  - Revoke teammate invitations to join your Cloudcraft team
- Manage AWS accounts
  - Connect new AWS accounts
  - Remove AWS accounts
  - Manage team-shared AWS accounts
- Manage API keys
  - Create API keys
  - Delete API keys
  - Manage team-shared API keys

### User

Users are the least-privileged role type for Cloudcraft team members. Users should be members of teams with whom they will share blueprints, collaborate on AWS accounts, and generally work together.

**Permissions:**

- Create, edit, and delete private and team-shared blueprints
- View-only access to the team for which they are a member
- Live scan AWS accounts that an Account Owner or Administrator has shared with their team
- View-only access to the existence of API keys (unable to generate or view active API keys)

## Cross-organizational teams

For Enterprise customers, Cloudcraft also offers the ability to create cross-organizational teams. The members of a cross-organizational team are added to the list of members of every non-cross-organizational team, and inherit their cross-organizational roles — unless they are already a member of another team.

Here is an example to make this easier to understand:

- Example Company
  - Cross-org Team 1
    - User 1
  - Team 2
    - User 2
    - [User 1 from Cross-org Team 1]
  - Team 3
    - User 3
    - User 1
    - [User 1 from Cross-org Team 1, but explicit membership determines the team role]

In this example, if "Team 1" is an auditing team with read-only members, "User 1" will implicitly have read-only access to "Team 2", while the role explicitly assigned to the user in "Team 3" takes precedence.

## Common questions

**Who owns a Cloudcraft account?**

The person who signed up for a paid Cloudcraft subscription is the default Account Owner, but multiple owners can exist if you [reach out to our support team][2].

**What happens if the Account Owner leaves the company?**

If the Account Owner has left the company without transferring ownership, another person on the team can ask for ownership to be transfered to someone else.

**Who can update the credit card or change plans?**

Only the Account Owner can update the payment method or make changes to the subscription.

**Can I invite a user and give them read-only access to blueprints?**

Not at the moment, but you can create shareable blueprint links and embed them in internal wiki pages as a workaround.

[1]: https://app.cloudcraft.co/support
[2]: https://app.cloudcraft.co/app/support
