1. Navigate to [Observability Pipelines][10011].
1. Select the HTTP Server source:
    1. Select **None** in the dropdown menu for **Authorization strategy**.
    1. Select **JSON** in the dropdown menu for **Decoding**.
1. After you set up your [destinations][10012] and [processors][10013], click **Next: Install**.
1. On the **Install** page, enter the HTTP/S Server listener address, such as `0.0.0.0:9997`.
1. Follow the rest of the instructions on the page to install the Worker based on your platform.

[10011]: https://app.datadoghq.com/observability-pipelines
[10012]: /observability_pipelines/destinations/
[10013]: /observability_pipelines/processors/