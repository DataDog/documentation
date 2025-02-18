| Destination                                | Maximum Events | Maximum Bytes   | Timeout (seconds)   |
|--------------------------------------------|----------------|-----------------|---------------------|
| Amazon OpenSearch                          | None           | 10,000,000      | 1                   |
| Amazon S3 (Datadog Log Archives)           | None           | 100,000,000     | 900                 |
| Amazon Security Lake                       | None           | 256,000,000     | 300                 |
| Azure Storage (Datadog Log Archives)       | None           | 100,000,000     | 900                 |
| Datadog Logs                               | 1,000          | 4,250,000       | 5                   |
| Elasticsearch                              | None           | 10,000,000      | 1                   |
| Google Chronicle                           | None           | 1,000,000       | 15                  |
| Google Cloud Storage (Datadog Log Archives)| None           | 100,000,000     | 900                 |
| New Relic                                  | 100            | 1,000,000       | 1                   |
| OpenSearch                                 | None           | 10,000,000      | 1                   |
| Splunk HTTP Event Collector (HEC)          | None           | 1,000,000       | 1                   |
| Sumo Logic Hosted Collecter                | None           | 10,000,000      | 1                   |

**Note**: The rsyslog and syslog-ng destinations do not batch events.