## Timeboards
This endpoint allows you to programmatically create, update delete and query timeboards.

## Create A Timeboard
ARGUMENTS

title [required]
The name of the dashboard.
description [required]
A description of the dashboard's content.
graphs [required]
A list of graph definitions. Graph definitions follow this form:
title [required]
The name of the graph.
definition [required]
The graph definition. Example:
{"requests": [{"q": "system.cpu.idle{*} by {host}"}
template_variables [optional, default=None]
A list of template variables for using Dashboard templating. Template variable definitions follow this form:
name [required]
The name of the variable.
prefix [optional, default=None]
The tag prefix associated with the variable. Only tags with this prefix will appear in the variable dropdown.
default [optional, default=None]
The default value for the template variable on dashboard load

## Update A Timeboard
ARGUMENTS

title [required]
The name of the dashboard.
description [required]
A description of the dashboard's contents.
graphs [required]
A list of graph definitions. Graph definitions follow this form:
title [required]
The name of the graph.
definition [required]
The graph definition. Read the Graph Guide for more on graphs. Example:
{"requests": [{"q": "system.cpu.idle{*} by {host}"}
template_variables [optional, default=None]
A list of template variables for using Dashboard templating. Template variable definitions follow this form:
name [required]
The name of the variable.
prefix [optional, default=None]
The tag prefix associated with the variable. Only tags with this prefix will appear in the variable dropdown.
default [optional, default=None]
The default value for the template variable on dashboard load

## Delete A Timeboard
Delete an existing timeboard.

This end point takes no JSON arguments.'

## Get All Timeboards
Fetch all of your timeboards' definitions.

ARGUMENTS

This end point takes no JSON arguments.'

## Get A Timeboard
Fetch an existing dashboard's definition.

ARGUMENTS

This end point takes no JSON arguments.'