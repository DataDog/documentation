---
title: Database Monitoring Data Collected
kind: documentation
description: Information about the data that Database Monitoring collects.
further_reading:
- link: "/tk/tk/"
  tag: "Documentation"
  text: "tktk"

---
{{< site-region region="us3,gov" >}} 
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Sensitive information

The Database Monitoring Agent obfuscates all query bind parameters sent to the Datadog intake. Thus passwords, PII (Personally identifiable information), and other potentially sensitive information stored in your database will not be viewable in Query Metrics, Query Samples, or Explain Plans.

However, there are some common sources of data leaks:

### Database schema

If table names, column names, indexes, database names, or any other schema contain sensitive information, these data are not obfuscated. It is very uncommon that database schema are considered sensitive, but please be advised that obfuscation is not applied to these data types.

### Database logs

If you are sending logs to Datadog from your database, please be aware that some logs can contain the full SQL query text including query bind parameters. We recommend reviewing and applying [log security rules][1] consistent with your organization's requirements.


## Which queries are tracked

Datadog Database Monitoring collects per-query metrics for the top 200 normalized queries measured by their total time spent executing on the host. This limit is applied only to each collection interval (10 seconds by default), so the total number of tracked queries can exceed the configured limit over longer periods of time.

Query samples have no limits on the number of unique normalized queries tracked, but the sampling is biased towards queries which are slow or frequent. It is possible for a query sample to be selected, but have no associated query metrics. This is the case when the query was slow or frequent for a brief period of time, but was not sustained enough to become a top query.

## Other queries

_Other Queries_ represent the metrics of all queries which do not appear in the top 200. Because a query may be a top query for some time frames but not others, the metrics for a particular query may sometimes be tracked as a distinct normalized query and other times counted in Other Queries.


[1]: /security/logs/
