기존 설치의 경우 설정이 `conf.d/oracle-dbm.d/` 디렉토리에 있는지 확인하세요. `conf.d/oracle.d/` 디렉토리에서 레거시 설정을 마이그레이션해야 할 수도 있습니다.

Oracle 통합을 레거시 통합에서 새 통합으로 마이그레이션하려면 다음 명령을 사용하세요.

```shell
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

레거시 통합을 비활성화합니다.

```shell
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml.bak
```

레거시 통합을 비활성화하면 시스템 메트릭을 두 번 보내는 것을 방지할 수 있습니다.

 Agent에는 외부 Oracle 클라이언트가 필요하지 않으므로 새 파라미터 파일 `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`에서 `jdbc_driver_path` 설정 파라미터를 제거합니다 .