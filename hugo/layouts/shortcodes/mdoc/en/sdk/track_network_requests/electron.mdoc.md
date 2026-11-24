## Main process requests

The Electron SDK uses and configures `dd-trace-js`, so it requires no additional setup. Network requests made by the main process are collected as RUM resources and generate traces. Main process resources are not attached to a view.

To control how many main process traces are kept, see [Track Frontend-to-Backend Traces][1].

## Renderer process requests

The Browser SDK collects network requests made by renderer processes. See [Track Network Requests for the Browser SDK][2].

[1]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=electron
[2]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=browser
