---
title: Service Level Objectives
---
[Service Level Objectives](https://docs.datadoghq.com/monitors/service_level_objectives/#configuration)
(or SLOs) are a key part of the site reliability engineering toolkit.
SLOs provide a framework for defining clear targets around application performance,
which ultimately help teams provide a consistent customer experience,
balance feature development with platform stability,
and improve communication with internal and external users.

## Get all SLOs

Get a list of service level objective objects for your organization.

## Create an SLO object

Create a service level objective object.

## Bulk Delete SLO Timeframes

Delete (or partially delete) multiple service level objective objects.

This endpoint facilitates deletion of one or more thresholds for one or more
service level objective objects. If all thresholds are deleted, the service level
objective object is deleted as well.

## Check if SLOs can be safely deleted

Check if an SLO can be safely deleted. For example,
assure an SLO can be deleted without disrupting a dashboard.

## Search for SLOs

Get a list of service level objective objects for your organization.

## Delete an SLO

Permanently delete the specified service level objective object.

If an SLO is used in a dashboard, the `DELETE /v1/slo/` endpoint returns
a 409 conflict error because the SLO is referenced in a dashboard.

## Get an SLO's details

Get a service level objective object.

## Update an SLO

Update the specified service level objective object.

## Get Corrections For an SLO

Get corrections applied to an SLO

## Get an SLO's history

Get a specific SLO’s history, regardless of its SLO type.

The detailed history data is structured according to the source data type.
For example, metric data is included for event SLOs that use
the metric source, and monitor SLO types include the monitor transition history.

**Note:** There are different response formats for event based and time based SLOs.
Examples of both are shown.

