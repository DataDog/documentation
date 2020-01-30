---
title: Build the Datadog Cluster Agent
kind: documentation
---

The Datadog Cluster Agent is designed to be used in a containerized ecosystem. To build it:

1. Clone the [DataDog/datadog-agent github repository][1]
2. In the `datadog-agent/` folder downloaded, Create the binary by running `inv -e cluster-agent.build`. This adds a binary in `./bin/datadog-cluster-agent/`
3. Then from the same folder, run `inv -e cluster-agent.image-build`.

[1]: https://github.com/DataDog/datadog-agent/
