---
title: Datadog-CouchDB Integration
integration_title: CouchDB
kind: integration
---

### Overview

Capture CouchDB data in Datadog to:

* Visualize key CouchDB metrics.
* Correlate CouchDB performance with the rest of your applications.

From the open-source Agent:

* [ CouchDB YAML example][1]
* [ CouchDB checks.d][2]

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

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/couchdb.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/couchdb.py


