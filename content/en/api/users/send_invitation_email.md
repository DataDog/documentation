---
title: Send invitation email to a user
type: apicontent
order: 36.8
external_redirect: /api/#send-invitation-email-to-a-user
---

## Send invitation email to a user

Sends emails to one or more users inviting them to join the organization.

**ARGUMENTS**:

* **`type`** [*required*]: The type of the USER request, use `user_invitations`.
* **`attributes.login_method`** [*optional*]: The login method included in the user invitation.

**Note**: `data.relationships.user.data` can be an array of objects to invite multiple users in a single request.
