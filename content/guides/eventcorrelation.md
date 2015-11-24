---
title: Correlating Events with Metrics
kind: guide
listorder: 4
---

## Overview
{: .overview}

Event Correlation refers to overlaying events on top of a dashboard graph and is an important feature of the Datadog platform. You can setup correlation at two different times: either when you setup the dashboard or adhoc at the time you view the dashboard.

## Event Correlation at Design Time
{: #designtime}

![Search Box](/static/images/guides-eventcorrelation-screenboard.png)
Setup event correlation at design time by editing any graph on both Time Boards and Screen Boards and adding events to the graph. To learn more about this, visit the [Graphing Primer](/graphing/). You can find details about adding events [using the UI](/graphing/#overlay-events-for-additional-context) or via the JSON interface further down the page.

## Event Correlation at View Time
{: #viewtime}


![Search Box](/static/images/guides-eventcorrelation-searchbox.png)
Setup event correlation at view time by adding a query in the Search box at the top left of any Time Board dashboard window. This will replace any events added at design time, but will apply the events to all graphs on that particular dashboard.

## Event Query Language
{: #eql}

You can narrow down your search by filtering on certain event properties. See the list of filters below for more details. Please note that filters perform an exact match search and will not work with partial strings.


| Filter | Description |
|--------|-------------|
|user:pup@datadoghq.com|Find all events with comments by pup@datadoghq.com.|
|sources:github,chef|Show events from Github OR Chef.|
|tags:env-prod OR db|Show events tagged with #env-prod OR #db.|
|tags:security-group:sg-123 AND role:common-node|Show events tagged with #security-group:sg-123 AND #role:common-node.|
|hosts:i-0ade23e6,db.myapp.com|Show events from i-0ade23e6 OR db.myapp.com.|
|status:error|Show events with error status. (supports: 'error', 'warning', 'success')|
|priority:low|Show only low-priority events. (supports: 'low' or 'normal'. defaults to 'all')|
|incident:claimed|Show only claimed incidents. (supports: 'open', 'claimed', 'resolved', or 'all')|
{:.table}

Full text search works on all keywords provided in the search query after applying any filters. Full text search will look inside the event text, title, tags, users who commented on the event and host names and devices tied to the event for any related information.

You can use full text search to find all events with the same key tags. For example, to show all events with the #service key you would search #service.

In the example below, a full text search is performed to find all open chef or nagios errors that mention one or more redis instances that are currently down.

```sources:nagios,chef status:error redis_* AND down```


