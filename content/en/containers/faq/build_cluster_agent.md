---
title: Build the Datadog Cluster Agent
aliases:
- /agent/cluster_agent/build
- /containers/cluster_agent/build
---

The Datadog Cluster Agent should be used in a containerized ecosystem. To build it:

1. Clone the [DataDog/datadog-agent GitHub repository][1]
2. In the `datadog-agent/` folder downloaded, create the binary by running `inv -e cluster-agent.build`. This adds a binary in `./bin/datadog-cluster-agent/`
3. Then from the same folder, run `inv -e cluster-agent.image-build`.

[1]: https://github.com/DataDog/datadog-agent/
