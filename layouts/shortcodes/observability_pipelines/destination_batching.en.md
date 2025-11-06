| Destination                                | Maximum Events | Maximum Bytes   | Timeout (seconds)   |
|--------------------------------------------|----------------|-----------------|---------------------|
| Amazon OpenSearch                          | None           | 10,000,000      | 1                   |
| Amazon S3 (Datadog Log Archives)           | None           | 100,000,000     | 900                 |
| Amazon Security Lake                       | None           | 256,000,000     | 300                 |
| Azure Storage (Datadog Log Archives)       | None           | 100,000,000     | 900                 |
| CrowdStrike                                | None           | 1,000,000       | 1                   |
| Datadog Logs                               | 1,000          | 4,250,000       | 5                   |
| Elasticsearch                              | None           | 10,000,000      | 1                   |
| Google Chronicle                           | None           | 1,000,000       | 15                  |
| Google Cloud Storage (Datadog Log Archives)| None           | 100,000,000     | 900                 |
| HTTP Client                                | 1000           | 1,000,000       | 1                   |
| Microsoft Sentinel                         | None           | 10,000,000      | 1                   |
| New Relic                                  | 100            | 1,000,000       | 1                   |
| OpenSearch                                 | None           | 10,000,000      | 1                   |
| SentinelOne                                | None           | 1,000,000       | 1                   |
| Socket*                                    | N/A            | N/A             | N/A                 |
| Splunk HTTP Event Collector (HEC)          | None           | 1,000,000       | 1                   |
| Sumo Logic Hosted Collecter                | None           | 10,000,000      | 1                   |
| Syslog*                                    | N/A            | N/A             | N/A                 |

*Destination does not batch events.