To add another source to your pipeline:

1. Click **Add another source** at the bottom of the Sources box.
1. Select a source from the dropdown menu and set it up.

**Notes**:

- You can add a total of 10 sources for a pipeline.
- If you add multiple sources of the same type to a pipeline, you must use [Secrets Management][101]. For example, if you add two HTTP Client sources for two different HTTP clients, you must use secret identifiers for the HTTP client endpoint URL. You cannot use the default `SOURCE_HTTP_CLIENT_ENDPOINT_URL` to store two different HTTP client URIs.

[101]: /observability_pipelines/configuration/secrets_management/
