---
title: Tags
type: apicontent
order: 31
external_redirect: /api/#tags
---

## Tags
The tag endpoint allows you to tag hosts with keywords meaningful to you - like `role:database`.
All metrics sent from a host have its tags applied. When fetching and applying tags to a particular host, refer to hosts by name (yourhost.example.com).

The component of your infrastructure responsible for a tag is identified by a source. Valid sources are: nagios, hudson, jenkins, users, feed, chef, puppet, git, bitbucket, fabric, capistrano... [Complete list of source attribute values][1]

[Read more about tags on the dedicated documentation page][2].

[1]: /integrations/faq/list-of-api-source-attribute-value
[2]: /tagging
