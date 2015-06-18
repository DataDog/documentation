---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-CouchDB Integration
integration_title: CouchDB
kind: integration
---

### Overview
{:#int-overview}

Capture CouchDB data in Datadog to:

-  Visualize key CouchDB metrics.
-  Correlate CouchDB performance with the rest of your applications.


From the open-source Agent:

* [CouchDB YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/couchdb.yaml.example)
* [CouchDB checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/couchdb.py)

The following metrics are collected by default with the CouchDB integration:

    couchdb.database_writes
    couchdb.database_reads
    couchdb.httpd.requests
    couchdb.httpd_request_methods
    couchdb.httpd_status_codes
    couchdb.httpd.temporary_view_reads
    couchdb.httpd.view_reads
    couchdb.open_databases
    couchdb.open_os_files
    couchdb.request_time
