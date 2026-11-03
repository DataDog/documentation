<!-- schema-depth-cap: /api/latest/rendering-shapes/get-a-specific-pipeline/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Top-level schema representing a pipeline.

| Parent field     | Field                   | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                  | data [*required*]       | object    | Contains the pipeline’s ID, type, and configuration attributes.                                                                                                                                                                                                                                                                                                                                                                                                    |
| data             | attributes [*required*] | object    | Defines the pipeline’s name and its components (sources, processors, and destinations).                                                                                                                                                                                                                                                                                                                                                                            |
| attributes       | config [*required*]     | object    | Specifies the pipeline's configuration, including its sources, processors, and destinations.                                                                                                                                                                                                                                                                                                                                                                       |
| config           | processor_groups        | [object]  | A list of processor groups that transform or enrich log data.                                                                                                                                                                                                                                                                                                                                                                                                      |
| processor_groups | processors [*required*] | [<oneOf>] | Processors applied sequentially within this group. Events flow through each processor in order.                                                                                                                                                                                                                                                                                                                                                                    |
| processors       | Object 1                | object    | The `ocsf_mapper` processor transforms logs into the OCSF schema using a predefined mapping configuration. **Supported pipeline types:** logs                                                                                                                                                                                                                                                                                                                      |
| Object 1         | mappings [*required*]   | [object]  | A list of mapping rules to convert events to the OCSF format.                                                                                                                                                                                                                                                                                                                                                                                                      |
| mappings         | mapping [*required*]    | <oneOf>   | Defines a single mapping rule for transforming logs into the OCSF schema.                                                                                                                                                                                                                                                                                                                                                                                          |
| mapping          | Object 1                | enum      | Predefined library mappings for common log formats. Allowed enum values: `CloudTrail Account Change`, `GCP Cloud Audit CreateBucket`, `GCP Cloud Audit CreateSink`, `GCP Cloud Audit SetIamPolicy`, `GCP Cloud Audit UpdateSink`, `Github Audit Log API Activity`, `Google Workspace Admin Audit addPrivilege`, `Microsoft 365 Defender Incident`, `Microsoft 365 Defender UserLoggedIn`, `Okta System Log Authentication`, `Palo Alto Networks Firewall Traffic`. |
| mapping          | Object 2                | object    | Custom OCSF mapping configuration for transforming logs.                                                                                                                                                                                                                                                                                                                                                                                                           |
| Object 2         | mapping [*required*]    | [object]  | A list of field mapping rules for transforming log fields to OCSF schema fields.                                                                                                                                                                                                                                                                                                                                                                                   |
| mapping          | lookup                  | object    | Lookup table configuration for mapping source values to destination values.                                                                                                                                                                                                                                                                                                                                                                                        |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "config": {
        "processor_groups": [
          {
            "processors": [
              []
            ]
          }
        ]
      }
    }
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
