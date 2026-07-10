### Rsyslog

Para enviar logs rsyslog al worker de Observability Pipelines, actualiza tu archivo de configuración rsyslog:

```
ruleset(name="infiles") {
action(type="omfwd" protocol="tcp" target="<OPW_HOST>" port="<OPW_PORT>")
}
```

`<OPW_HOST>` es la IP/URL del host (o balanceador de carga) asociada al worker de Observability Pipelines.
- Para instalaciones CloudFormation, el resultado `LoadBalancerDNS` CloudFormation tiene la URL correcta para utilizar.
- Para instalaciones Kubernetes, puede utilizarse el registro DNS interno del servicio del worker de Observability Pipelines, por ejemplo `opw-observability-pipelines-worker.default.svc.cluster.local`.

### syslog-ng

Para enviar logs syslog-ng al worker de Observability Pipelines, actualiza tu archivo de configuración de syslog-ng:

```
destination obs_pipelines {
  http(
      url("<OPW_HOST>")
      method("POST")
      body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
  );
};
```

`<OPW_HOST>` es la IP/URL del host (o balanceador de carga) asociada al worker de Observability Pipelines.
- Para instalaciones CloudFormation, el resultado `LoadBalancerDNS` CloudFormation tiene la URL correcta para utilizar.
- Para instalaciones Kubernetes, puede utilizarse el registro DNS interno del servicio del worker de Observability Pipelines, por ejemplo `opw-observability-pipelines-worker.default.svc.cluster.local`.