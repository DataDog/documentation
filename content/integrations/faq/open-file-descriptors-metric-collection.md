---
title: Process open file descriptors metric collection
kind: faq
further_reading:
- link: "/integrations/process"
  tag: "Documentation"
  text: Learn more about the Datadog Process integrations
---

For the [Datadog - process integration](/integrations/process/) `system.processes.open_file_descriptors` metric is only available for processes running as the same user as the agent (dd-agent).

If you wish to collect this metric, a workaround may be to run a small Python script as root that uses psutil to read this metric and sends it to the Datadog Agent using [DogStatsD](/developers/dogstatsd).

```python
#!/opt/datadog-agent/embedded/bin/python

import psutil
import socket
import sys

process_filter = sys.argv[1]

for proc in psutil.process_iter():
    if process_filter in proc.name():
        payload = "open_file_descriptors:{0}|g|#process_name:{1},pid:{2}".format(
            proc.num_fds(), proc.name(), proc.pid)
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
        sock.sendto(payload, ("localhost", 8125))
```

This script takes a single argument which is a string that's used to filter processes, e.g.:  

```
sample_num_fd.py trace-agent
```