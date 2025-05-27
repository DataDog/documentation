1. In the OCI console search bar, search for `DatadogROAuthUser` and click on the User resource that appears.
2. Copy the user's OCID value.
3. Paste the value into the **User OCID** field in the [Datadog OCI integration tile][401].
4. Returning to the OCI console, generate an API key with these steps:<br />
   a. In the bottom left corner of the screen, under **Resources**, click **API keys**.<br />
   b. Click **Add API key**.<br />
   c. Click **Download private key**.<br />
   d. Click **Add**.<br />
   e. A **Configuration file preview** popup appears, but no action is needed; close the popup.

![The Add API Key page in the OCI console](images/add_api_key.png)

5. Copy the fingerprint value, and paste it into the **Fingerprint** field on the [Datadog OCI integration tile][401].
6. Copy the private key value with these steps:
   a. Open the downloaded private key `.pem` file in a text editor, or use a terminal command such as `cat` to display the file's contents.
   b. Copy the entire contents, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`.
7. Paste the private key value into the **Private Key** field on the Datadog OCI integration tile.

[401]: /integrations/oracle-cloud-infrastructure