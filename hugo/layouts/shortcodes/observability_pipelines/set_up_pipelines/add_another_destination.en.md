If you want to add an additional destination to a processor group, click the plus sign (**+**) to the right of the processor group.

To delete a destination, click on the trash icon to the top right of the destination.
- If you delete a destination from a processor group that has multiple destinations, only the deleted destination is removed.
- If you delete a destination from a processor group that only has one destination, both the destination and the processor group are removed.

**Notes**:

- A pipeline must have at least one destination. If a processor group only has one destination, that destination cannot be deleted.
- You can add a total of 20 destinations for a pipeline.
- If you add multiple destinations of the same type to a pipeline, you must use [Secrets Management][101]. For example, if you add two HTTP Client destinations for two different HTTP clients, you must use secret identifiers for the HTTP client URIs. You cannot use the default `DESTINATION_HTTP_CLIENT_URI` to store the two different HTTP client URIs.

[101]: /observability_pipelines/configuration/secrets_management/