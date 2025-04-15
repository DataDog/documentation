1. Enter the name of the Azure container you created earlier.
2. Optionally, enter a prefix.
    - Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
    - See [template syntax][10051] if you want to route logs to different object keys based on specific fields in your logs.

[10051]: /observability_pipelines/destinations/#template-syntax