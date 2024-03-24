## Set up the Splunk index

<div class="alert alert-info">Observability Pipelines supports acknowledgments when you enable the <strong>Enable Indexer Acknowledgments</strong> setting on the input.</div>

To receive logs from the Observability Pipelines Worker, you must provision a HEC input and HEC token on the index.

1. In Splunk, navigate to **Settings** > **Data Inputs**.
2. Add a new HTTP Event Collector input and assign it a name.
3. Select the indexes where you want the logs to be sent.

After you add the input, Splunk creates a token for you. The token is typically in a UUID format. Add this token to the sample configuration provided later so that the Observability Pipelines Worker can authenticate itself.