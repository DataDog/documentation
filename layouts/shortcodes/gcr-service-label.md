**Add a service label in Google Cloud**. In your Cloud Run service's info panel, add a label with the following key and value:

   | Key      | Value                                                       |
   |-----------|-------------------------------------------------------------|
   | `service` | The name of your service. Matches the value provided as the `DD_SERVICE` environment variable. |

   See [Configure labels for services][2001] in the Cloud Run documentation for instructions.

[2001]: https://cloud.google.com/run/docs/configuring/services/labels
