---
title: Tags
type: apicontent
order: 13
---
## Tags
The tag end point allows you to tag hosts with keywords meaningful to you - like role:database. All metrics sent from a host will have its tags applied. When fetching and applying tags to a particular host, you can refer to hosts by name (yourhost.example.com).

The component of your infrastructure responsible for a tag is identified by a source. Valid sources are: nagios, hudson, jenkins, users, feed, chef, puppet, git, bitbucket, fabric, capistrano.
