---
title: Guide to Dashboard Templating
kind: guide
listorder: 13
sidebar:
  nav:
    - header: Guide to Templating
    - text: Enabling dashboard templating
      href: "#new"
    - text: Defining template variables
      href: "#def"
    - text: Using template variables in graph editors
      href: "#graph"
---

Dashboard templating allows you to create dashboards that use variables like `$scope` or `$redis` in place of specific tags or hosts. You can then dynamically explore the metrics across different sets of tags. Simply select a new variable value in the dropdown menu, and that value will apply across the dashboard.

### Editing template variables
{:#def}

To create, edit, and delete template variables click the gear icon at the upper right-hand side of the screen, then select 'Edit Template Variables' from the actions menu.

![][1]
{:style="width:70%;"}

This will open the template variable editing panel.

![][2]
{:style="width:80%;"}

A template variable is defined by a name and optional parameters for 'Tag Group' and 'Default Tag.' A tag group is a prefix shared among several tags, like `redis_port` for the tags `redis_port:6379` and `redis_port:6380`. Setting a tag group eliminates irrelevant tags from the variable's scope selector, and removes the prefix from the listed values for clarity - so you'll see `6379` and `6380` in the 'Default Tag' dropdown instead. The 'Default Tag' option determines the initial value for the variable on dashboard load.

### Using template variables in graph editors
{:#graph}

![][3]
{:style="width:80%;"}

Once defined, template variables appear alongside normal tag and host options in graph editors. If you set `6379` as the value of `$redis`, all graphs defined with `$redis` will be scoped to `redis_port:6379`.

![][4]
{:style="width:85%;"}

   [1]: /static/images/edit-template-variables.png
   [2]: /static/images/redis-template-var.png
   [3]: /static/images/redis-tpl-graph-editor.png
   [4]: /static/images/redis-tpl-selected.png


