---
title: Create user
type: apicontent
order: 36.1
external_redirect: /api/#create-user
---

## Create user

Create a user for your organization.

**ARGUMENTS**:

A user is a JSON object with `"type":"users"` that takes the following elements:

* **`roles`** [*optional*]: An array of roles to assign to the user. Each role is an object with `"type": "roles"` and an `id` that is the role ID to assign to the user.
* **`attributes.email`** [*required*]: The email of the new user.
* **`attributes.name`** [*optional*]: The name of the new user.
* **`attributes.title`** [*optional*]: The title of the new user.