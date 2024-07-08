To authenticate the Worker for Google Chronicle:

1. Create a Google Cloud Storage [service account][10001].
1. Follow these [instructions][10002] to create a service account key and download the JSON service account key file. This is the credentials JSON file and must be placed under `DD_OP_DATA_DIR/config`.

To set up the Worker's Google Chronicle destination:

1. Enter the customer ID for your Google Chronicle instance.
1. Enter the path to the credentials JSON file you downloaded earlier.
1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Select the appropriate **Log Type** in the dropdown menu.

[10001]: /logs/log_configuration/archives/?tab=awss3#advanced-settings
[10002]: /logs/log_configuration/archives
