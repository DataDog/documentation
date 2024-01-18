---
title: Service Remapper
kind: Documentation

---

The service remapper processor assigns one or more attributes to your logs as the official service.

**Note**: If multiple service remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline's order) is taken into account.

Define the log service remapper processor on the 
{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Service remapper processor" style="width:80%;" >}}
