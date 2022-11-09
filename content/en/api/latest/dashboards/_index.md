---
title: Dashboards
---
Interact with your dashboard lists through the API to make it easier to organize,
find, and share all of your dashboards with your team and organization.

## Delete dashboards

Delete dashboards using the specified IDs. If there are any failures, no dashboards will be deleted (partial success is not allowed).

## Get all dashboards

Get all dashboards.

**Note**: This query will only return custom created or cloned dashboards.
This query will not return preset dashboards.

## Restore deleted dashboards

Restore dashboards using the specified IDs. If there are any failures, no dashboards will be restored (partial success is not allowed).

## Create a new dashboard

Create a dashboard using the specified options. When defining queries in your widgets, take note of which queries should have the `as_count()` or `as_rate()` modifiers appended.
Refer to the following [documentation](https://docs.datadoghq.com/developers/metrics/type_modifiers/?tab=count#in-application-modifiers) for more information on these modifiers.

## Create a shared dashboard

Share a specified private dashboard, generating a URL at which it can be publicly viewed.

## Revoke a shared dashboard URL

Revoke the public URL for a dashboard (rendering it private) associated with the specified token.

## Get a shared dashboard

Fetch an existing shared dashboard's sharing metadata associated with the specified token.

## Update a shared dashboard

Update a shared dashboard associated with the specified token.

## Revoke shared dashboard invitations

Revoke previously sent invitation emails and active sessions used to access a given shared dashboard for specific email addresses.

## Get all invitations for a shared dashboard

Describe the invitations that exist for the given shared dashboard (paginated).

## Send shared dashboard invitation email

Send emails to specified email addresses containing links to access a given authenticated shared dashboard. Email addresses must already belong to the authenticated shared dashboard's share_list.

## Delete a dashboard

Delete a dashboard using the specified ID.

## Get a dashboard

Get a dashboard using the specified ID.

## Update a dashboard

Update a dashboard using the specified ID.

