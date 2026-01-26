Toggle the switch to enable **Buffering Options**. Enable a configurable buffer on your destination to ensure intermittent latency or an outage at the destination doesn't create immediate backpressure, and allows events to continue to be ingested from your source. Disk buffers can also increase pipeline durability by writing logs to disk, ensuring buffered logs persist through a Worker restart. See [Configurable buffers for destinations][100] for more information.
- If left unconfigured, your destination uses a memory buffer with a capacity of 500 events.
- To configure a buffer on your destination:
    1. Select the buffer type you want to set (**Memory** or **Disk**).
    1. Enter the buffer size and select the unit.
        1. Maximum memory buffer size is 128 GB.
        1. Maximum disk buffer size is 500 GB.

[100]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#destination-buffer-behavior