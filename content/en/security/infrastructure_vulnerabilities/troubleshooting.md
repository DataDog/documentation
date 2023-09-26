---
title: Troubleshooting Cloud Security Management Vulnerabilities
kind: documentation
further_reading:
- link: "/security/infrastructure_vulnerabilities/"
  tag: "Documentation"
  text: "CSM Vulnerabilities"
- link: "/security/infrastructure_vulnerabilities/setup"
  tag: "Documentation"
  text: "Setting up CSM Vulnerabilities"
aliases:
  - /security/infrastructure_vulnerability/setup/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
CSM Vulnerabilities is not available on the US1-FED Datadog site.
</div>
{{< /site-region >}}

<div class="alert alert-info">CSM Vulnerabilities is in beta.</div>

If you experience issues using Infrastructure Vulnerabilities, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][1].

## Monitoring Agent performance

### Enable Agent telemetry

The Agent exposes internal telemetry through a Prometheus endpoint, including the Software Bill of Materials (SBOM) metrics collection. 

1. Add the following environment variable in your Datadog Agent manifest to expose the Agent telemetry on `localhost:6000/telemetry` (default):
 
```yaml
 DD_TELEMETRY_ENABLED="true"
 ```

2. Configure an [OpenMetrics][2] check to scrape the metrics using [Autodiscovery][3].
   
   - Add the following to the pod annotations in your `values.yaml` file:

   ```yaml
     agents:
       podAnnotations:
         ad.datadoghq.com/agent.check_names: '["openmetrics"]'
         ad.datadoghq.com/agent.init_configs: '[{}]'
         ad.datadoghq.com/agent.instances: |
           [
             {
               "prometheus_url":"http://localhost:6000/telemetry",
               "namespace":"datadog_agent",
               "metrics":["sbom_*"],
               "send_distribution_buckets": true
             }
           ]
   ```

3. Configure the SBOM check to use the cache implementation.

   - Add the following environment variable in your Datadog Agent manifest (this generates the metric `datadog.agent.sbom_cache_disk_size`):
   ```yaml
    DD_SBOM_CACHE_ENABLED="true"
   ```

4. Monitor available metrics for performance and resource usage:
  
   | Description             | Metric                                          |
   | --------------------------| ------------------------------------------------|     
   | CPU utilization           | `avg:container.cpu.usage{app:datadog-agent}`    | 
   | Memory usage              | `avg:container.memory.usage{app:datadog-agent}` | 
   | Containers                | `datadog.agent.sbom.container_images.running`   | 
   | Hosts                     | `datadog.agent.sbom.hosts.running`              |
   | Disk space used by cache  | `datadog.agent.sbom_cache_disk_size`            |
   | Disk space                | `sum:datadog.agent.sbom_export_size{*}.as_count()` </br></br> **Note**: Generating an SBOM requires copying an image. This metric monitors how much data was copied during the SBOM generation process.       |


[1]: /help
[2]: https://docs.datadoghq.com/integrations/openmetrics/
[3]: /containers/kubernetes/prometheus/?tab=kubernetesadv2

## Further reading

{{< partial name="whats-next/whats-next.html" >}}