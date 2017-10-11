---
title: Users
type: apicontent
order: 15.1
---

## Create User
ARGUMENTS

handle [required]
The user handle, must be a valid email.
name [optional, default=None]
The name of the user.
access_role [optional, default=st]
The access role of the user. Choose from 'st' (standard user), 'adm' (admin user), or 'ro' (read-only user). Note: users can be created with admin access role only with application keys belonging to administrators.