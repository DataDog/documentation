---
title: APM (Tracing) special meaning tags
kind: faq
---

When [submitting your traces](/api/#tracing) you may add attributes in the `meta` parameter.  
Some of them have a special meaning which lead to a dedicated display and behavior in Datadog:

* **`sql.query`**:  
    Allows specific SQL stats, formating, and display in Datadog UI: 
{{< img src="tracing/faq/trace_sql_query.png" alt="SQL query" responsive="true" popup="true">}}

* **`error.msg`**:  
    Allows dedicated display for error message.

* **`error.type`**:  
    Allows dedicated display for error types. Types available are for instance for python `ValueError` or `Exception` and for Java `ClassNotFoundException` or `NullPointerException`..

* **`error.stack`**:  
    Allows a better display of the Stacktrace of an exception in Datadog UI (red boxes etc....)

{{< img src="tracing/faq/trace_error_formating.png" alt="Error Formating" responsive="true" popup="true" >}}
