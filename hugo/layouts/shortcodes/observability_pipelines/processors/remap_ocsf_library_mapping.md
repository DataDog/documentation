#### Add a mapping

1. Select the log type in the dropdown menu.
1. Define a [filter query](#filter-query-syntax). Only logs that match the specified filter query are remapped. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Review the sample source log and the resulting OCSF output.
1. Click **Save Mapping**.

#### Library mappings

These are the library mappings available:

| Log Source             | Log Type                                      | OCSF Category                 | Supported OCSF versions|
|------------------------|-----------------------------------------------|-------------------------------| -----------------------|
| AWS CloudTrail         | Type: Management<br>EventName: ChangePassword | Account Change (3001)         | 1.3.0<br>1.1.0         |
| AWS GuardDuty          | All finding types                             | Detection Finding (2004)      | 1.3.0                  |
| AWS WAF                | WebACL                                        | HTTP Activity (4002)          | 1.3.0                  |
| GitHub                 | Create User                                   | Account Change (3001)         | 1.1.0                  |
| Google Cloud Audit     | SetIamPolicy                                  | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | CreateSink                                    | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | UpdateSync                                    | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | CreateBucket                                  | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Workspace Admin | addPrivilege                                  | User Account Management (3005)| 1.1.0                  |
| Infoblox               | DNS Query                                     | DNS Activity (4003)           | 1.3.0                  |
| Infoblox               | DHCP                                          | DHCP Activity (4004)          | 1.3.0                  |
| Infoblox               | Audit Authentication                          | Authentication (3002)         | 1.3.0                  |
| Infoblox               | Audit API                                     | API Activity (6003)           | 1.3.0                  |
| Infoblox               | Port                                          | Base Event (0)                | 1.3.0                  |
| Microsoft 365 Defender | Incident                                      | Incident Finding (2005)       | 1.3.0<br>1.1.0         |
| Okta                   | User session start                            | Authentication (3002)         | 1.1.0                  |
| Palo Alto Networks     | Traffic                                       | Network Activity (4001)       | 1.1.0                  |
| Palo Alto Networks     | Threat                                        | Network Activity (4001)       | 1.3.0                  |
| Zscaler ZPA            | User Activity                                 | Network Activity (4001)       | 1.3.0                  |
| Zscaler ZPA            | User Status                                   | Authentication (3002)         | 1.3.0                  |