---
title: Tags
---
The tag endpoint allows you to assign tags to hosts,
for example: `role:database`. Those tags are applied to
all metrics sent by the host. Refer to hosts by name
(`yourhost.example.com`) when fetching and applying
tags to a particular host.

The component of your infrastructure responsible for a tag is identified
by a source. For example, some valid sources include nagios, hudson, jenkins,
users, feed, chef, puppet, git, bitbucket, fabric, capistrano, etc.

Read more about tags on the dedicated
[documentation page](https://docs.datadoghq.com/tagging).

## Get Tags

Return a mapping of tags to hosts for your whole infrastructure.

## Remove host tags

This endpoint allows you to remove all user-assigned tags
for a single host.

## Get host tags

Return the list of tags that apply to a given host.

## Add tags to a host

This endpoint allows you to add new tags to a host,
optionally specifying where these tags come from.

## Update host tags

This endpoint allows you to update/replace all tags in
an integration source with those supplied in the request.

