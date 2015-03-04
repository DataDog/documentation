---
title: Datadog-CouchDB Integration
kind: documentation
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/integrations/"
---

<div id="int-overview">
<h3>Overview</h3>

Capture CouchDB data in Datadog to:
<ul>
<li> Visualize key CouchDB metrics.</li>
<li> Correlate CouchDB performance with the rest of your applications.</li>
</ul>
</div>


From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/couchdb.yaml.example">
CouchDB YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/couchdb.py">
CouchDB checks.d</a>

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


