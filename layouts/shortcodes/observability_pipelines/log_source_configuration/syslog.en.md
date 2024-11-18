### rsyslog

To send rsyslog logs to the Observability Pipelines Worker, update your rsyslog config file:

```
ruleset(name="infiles") {
action(type="omfwd" protocol="tcp" target="<OPW_HOST>" port="<OPW_PORT>")
}
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. 
- For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use. 
- For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used, for example `opw-observability-pipelines-worker.default.svc.cluster.local`.

### syslog-ng

To send syslog-ng logs to the Observability Pipelines Worker, update your syslog-ng config file:

```
destination obs_pipelines {
  http(
      url("<OPW_HOST>")
      method("POST")
      body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
  );
};
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. 
- For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use. 
- For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used, for example `opw-observability-pipelines-worker.default.svc.cluster.local`.