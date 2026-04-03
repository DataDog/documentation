| Destination                                | Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|--------------------------------------------|----------------|-------------------|---------------------|
| Amazon OpenSearch                          | None           | 10                | 1                   |
| Amazon S3 (Datadog Log Archives)           | None           | 100               | 900                 |
| Amazon Security Lake                       | None           | 256               | 300                 |
| Azure Storage (Datadog Log Archives)       | None           | 100               | 900                 |
| CrowdStrike                                | None           | 1                 | 1                   |
| Datadog CloudPrem                          | 1,000          | 4.25              | 5                   |
| Datadog Logs                               | 1,000          | 4.25              | 5                   |
| Datadog Metrics                            | 100,000        | None              | 2                   |
| Elasticsearch                              | None           | 10                | 1                   |
| Google Chronicle                           | None           | 1                 | 15                  |
| Google Cloud Storage (Datadog Log Archives)| None           | 100               | 900                 |
| Google Pub/Sub                             | 1,000          | 10                | 1                   |
| HTTP Client                                | 1000           | 1                 | 1                   |
| Kafka                                      | 10,000         | 1                 | 1                   |
| Microsoft Sentinel                         | None           | 10                | 1                   |
| New Relic                                  | 100            | 1                 | 1                   |
| OpenSearch                                 | None           | 10                | 1                   |
| SentinelOne                                | None           | 1                 | 1                   |
| Socket*                                    | N/A            | N/A               | N/A                 |
| Splunk HTTP Event Collector (HEC)          | None           | 1                 | 1                   |
| Sumo Logic Hosted Collector                | None           | 10                | 1                   |
| Syslog*                                    | N/A            | N/A               | N/A                 |

*Destination does not batch events.