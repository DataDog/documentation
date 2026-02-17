### rsyslog

rsyslog 로그를 Observability Pipelines Worker로 보내려면 rsyslog 구성 파일을 업데이트하세요.

```
ruleset(name="infiles") {
action(type="omfwd" protocol="tcp" target="<OPW_HOST>" port="<OPW_PORT>")
}
```

`<OPW_HOST>`는 Observability Pipelines Worker와 연결된 호스트(또는 로드 밸런서)의 IP/URL입니다.
- CloudFormation 설치의 경우,`LoadBalancerDNS` CloudFormation 출력 값에 사용해야 할 올바른 URL이 포함되어 있습니다.
- Kubernetes 설치의 경우 Observability Pipelines Worker 서비스의 내부 DNS 레코드를 사용할 수 있습니다(예: `opw-observability-pipelines-worker.default.svc.cluster.local`).

### syslog-ng

Observability Pipelines Worker에 syslog-ng 로그를 보내려면 syslog-ng 구성 파일을 업데이트하세요.

```
destination obs_pipelines {
  http(
      url("<OPW_HOST>")
      method("POST")
      body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
  );
};
```

`<OPW_HOST>`는 Observability Pipelines Worker와 연결된 호스트(또는 로드 밸런서)의 IP/URL입니다.
- CloudFormation 설치의 경우,`LoadBalancerDNS` CloudFormation 출력 값에 사용해야 할 올바른 URL이 포함되어 있습니다.
- Kubernetes 설치의 경우 Observability Pipelines Worker 서비스의 내부 DNS 레코드를 사용할 수 있습니다(예: `opw-observability-pipelines-worker.default.svc.cluster.local`).