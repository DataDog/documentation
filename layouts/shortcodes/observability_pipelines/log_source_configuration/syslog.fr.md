### rsyslog

Pour envoyer les logs rsyslog vers le worker Observability Pipelines, mettez à jour votre fichier de configuration rsyslog :

```
ruleset(name="infiles") {
action(type="omfwd" protocol="tcp" target="<OPW_HOST>" port="<OPW_PORT>")
}
```

`<OPW_HOST>` correspond à l'IP ou à l'URL du host (ou du répartiteur de charge) associé au worker Observability Pipelines. 
- Pour les installations via CloudFormation, la sortie `LoadBalancerDNS` de CloudFormation contient l'URL correcte à utiliser. 
- Pour les installations sur Kubernetes, l'enregistrement DNS interne du service de worker Observability Pipelines peut être utilisé, par exemple `opw-observability-pipelines-worker.default.svc.cluster.local`.

### syslog-ng

Pour envoyer les logs syslog-ng vers le worker Observability Pipelines, mettez à jour votre fichier de configuration syslog-ng :

```
destination obs_pipelines {
  http(
      url("<OPW_HOST>")
      method("POST")
      body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
  );
};
```

`<OPW_HOST>` correspond à l'IP ou à l'URL du host (ou du répartiteur de charge) associé au worker Observability Pipelines. 
- Pour les installations via CloudFormation, la sortie `LoadBalancerDNS` de CloudFormation contient l'URL correcte à utiliser. 
- Pour les installations sur Kubernetes, l'enregistrement DNS interne du service de worker Observability Pipelines peut être utilisé, par exemple `opw-observability-pipelines-worker.default.svc.cluster.local`.