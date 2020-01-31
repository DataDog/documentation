---
title: Create user
type: apicontent
order: 36.1
external_redirect: /api/#create-user
---

## Create user

Create a new user within Datadog.

**ARGUMENTS**:

* **`handle`** [*required*]: The user handle, must be a valid email.
* **`name`** [*optional*, *default*=**None**]: The name of the user.
* **`title`** [*optional*, *default*=**st**]: The title the user
* **`roles`** [*optional*, *default*=**None**]: Array of Datadog roles assigned to the user. **Note**: If no role is assigned to a user, this user won't be able to log in Datadog.
