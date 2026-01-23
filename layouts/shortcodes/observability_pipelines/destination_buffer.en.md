Toggle the switch to enable **Buffering Options**. Enable a configurable buffer on your sink to prevent intermittent latency or outages at your destination from propagating back to your source. See [Configurable buffers for destinations][100] for more information.
- If disabled, the maximum size for buffering is 500 events.
- If enabled:
    1. Select the buffer type you want to set (**Memory** or **Disk**).
    1. Enter the buffer size and select the unit.
        1. Maximum memory buffer size is 128 GB.
        1. Maximum disk buffer size is 500 GB.

[100]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/?tab=logs#configurable-buffers-for-destinations