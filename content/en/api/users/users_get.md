---
title: Get user
type: apicontent
order: 35.2
external_redirect: /api/#get-user
---

## Get user

Get a user in the organization specified by the user's handle.

**ARGUMENTS**:

* **`id`** [*required*]:
    The handle of the user.

**RESPONSE**:

- `user`: A user object.

Properties of a user object:

- `handle`: The string the user uses to log in.
- `name`: The name of the user.
- `access_role`: The access role of the user:
  - **st** (standard user)
  - **adm** (admin user)
  - **ro** (read-only user)
- `verified`: A boolean set to `true` if the user has accepted an invitation to join the organization.
- `disabled`: A boolean set to `true` if the user has been disabled for this organization.
- `role`: A description of the user's role in the organization.
- `is_admin`: A boolean set to `true` is the user is an admin.
- `email`: The email address for the user.
- `icon`: URL for the user's profile icon.
