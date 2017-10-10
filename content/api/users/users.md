---
title: Users
type: apicontent
order: 15
---
## Users
You can create, edit, and disable users.

## Create User
ARGUMENTS

handle [required]
The user handle, must be a valid email.
name [optional, default=None]
The name of the user.
access_role [optional, default=st]
The access role of the user. Choose from 'st' (standard user), 'adm' (admin user), or 'ro' (read-only user). Note: users can be created with admin access role only with application keys belonging to administrators.

## Get User
ARGUMENTS

[required]
The handle of the user.

## Get All Users
ARGUMENTS

This end point takes no JSON arguments.'

## Update User
Can only be used with application keys belonging to administrators.

ARGUMENTS

handle [required]
The handle of the user.
name [optional, default=None]
The new name of the user.
email [optional, default=None]
The new email of the user.
disabled [optional, default=None]
The new disabled status of the user.
access_role [optional, default=st]
The new access role of the user. Choose from 'st' (standard user), 'adm' (admin user), or 'ro' (read-only user).

## Disable User
Can only be used with application keys belonging to administrators.

ARGUMENTS

handle [required]
The handle of the user.