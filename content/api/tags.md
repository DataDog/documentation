## Tags
The tag end point allows you to tag hosts with keywords meaningful to you - like role:database. All metrics sent from a host will have its tags applied. When fetching and applying tags to a particular host, you can refer to hosts by name (yourhost.example.com).

The component of your infrastructure responsible for a tag is identified by a source. Valid sources are: nagios, hudson, jenkins, users, feed, chef, puppet, git, bitbucket, fabric, capistrano.

## Get Tags
Return a mapping of tags to hosts for your whole infrastructure.

ARGUMENTS

source [optional, default=None]
Only show tags from a particular source. Otherwise shows all tags.

## Get Host Tags
Return the list of tags that apply to a given host.

ARGUMENTS

source [optional, default=None]
Only show tags from a particular source. Otherwise shows all tags.
by_source [optional, default=False]
Return tags grouped by source.

## Add Tags To A Host
This end point allows you to add tags to a host.

ARGUMENTS

tags [required]
A list of tags to apply to the host
source [optional, default=users]
The source of the tags (e.g. chef, puppet).

## Update Host Tags
This end point allows you to update all tags for a given host.

ARGUMENTS

tags [required]
A list of tags
source [optional, default=users]
The source of the tags (e.g. chef, puppet).

## Remove Host Tags
This end point allows you to remove all tags for a given host.

ARGUMENTS

source [optional, default=users]
The source of the tags (e.g. chef, puppet).