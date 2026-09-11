Data Streams Monitoring can automatically discover your [Confluent Cloud][101] connectors and visualize them within the context of your end-to-end streaming data pipeline.

##### Setup

1. Install and configure the [Datadog-Confluent Cloud integration][102].
1. In Datadog, open the [Confluent Cloud integration tile][102].

   <figure class="text-center">
   <img src="{{ .Site.Params.img_url}}images/data_streams/confluent_cloud_connectors.png" alt="The Confluent Cloud integration tile in Datadog, on the Configure tab. Under an Actions heading, a table titled '13 Resources autodiscovered' containing a list of resources and checkboxes for each resource. " width="80%">
   </figure>

   Under **Actions**, a list of resources populates with detected clusters and connectors. Datadog attempts to discover new connectors every time you view this integration tile.
1. Select the resources you want to add.
1. Click **Add Resources**.
1. Navigate to [Data Streams Monitoring][103] to visualize the connectors and track connector status and throughput.



[101]: https://www.confluent.io/confluent-cloud/
[102]: https://app.datadoghq.com/integrations/confluent-cloud
[103]: https://app.datadoghq.com/data-streams/