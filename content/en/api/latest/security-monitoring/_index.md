---
title: Security Monitoring
---
Detection rules for generating signals and listing of generated
signals.

## Get all security filters

Get the list of configured security filters with their definitions.

## Create a security filter

Create a security filter.

See the [security filter guide](https://docs.datadoghq.com/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/)
for more examples.

## Delete a security filter

Delete a specific security filter.

## Get a security filter

Get the details of a specific security filter.

See the [security filter guide](https://docs.datadoghq.com/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/)
for more examples.

## Update a security filter

Update a specific security filter.
Returns the security filter object when the request is successful.

## List rules

List rules.

## Create a detection rule

Create a detection rule.

## Delete an existing rule

Delete an existing rule. Default rules cannot be deleted.

## Get a rule's details

Get a rule's details.

## Update an existing rule

Update an existing rule. When updating `cases`, `queries` or `options`, the whole field
must be included. For example, when modifying a query all queries must be included.
Default rules can only be updated to be enabled and to change notifications.

## Get a quick list of security signals

The list endpoint returns security signals that match a search query.
Both this endpoint and the POST endpoint can be used interchangeably when listing
security signals.

## Get a list of security signals

Returns security signals that match a search query.
Both this endpoint and the GET endpoint can be used interchangeably for listing
security signals.

## Get a signal's details

Get a signal's details.

## Modify the triage assignee of a security signal

Modify the triage assignee of a security signal.

## Change the related incidents of a security signal

Change the related incidents for a security signal.

## Change the triage state of a security signal

Change the triage state of a security signal.

