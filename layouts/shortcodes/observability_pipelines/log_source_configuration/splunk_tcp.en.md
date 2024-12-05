## Connect Splunk Forwarder to the Observability Pipelines Worker

To forward your logs to the Worker, add the following configuration to your Splunk Heavy/Universal Forwarder's `etc/system/local/outputs.conf` and replace `<OPW_HOST>` with the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker:

```
[tcpout]
compressed=false
sendCookedData=false
defaultGroup=opw

[tcpout:opw]
server=<OPW_HOST>:8099
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use. For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used. For example: `opw-observability-pipelines-worker.default.svc.cluster.local`.

At this point, your logs should be going to the Worker, processed by the pipeline, and delivered to the configured destination.