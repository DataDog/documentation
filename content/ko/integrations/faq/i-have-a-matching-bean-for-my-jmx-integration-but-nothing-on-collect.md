---
kind: faq
title: JMX 통합과 일치하는 Bean이 있는데 수집에 아무것도 보이지 않습니다.
---

JMX 통합을 설정하는 데 문제가 있나요? 다음 설명서를 읽고 문제를 해결해 보세요.

* [JMX 통합 트러블슈팅][1]
* [jConsole에서 내 jmx 데이터를 보고 jmx.yaml을 설정해 데이터 수집하기][2]
* [jmx.yaml error: 섹션 포함][3]
* [복합 유형 JMX 속성 수집하기][4]
* [Windows에서 JMX 명령을 실행하는 방법][5]

위 설명서에 안내된 대로 바르게 설정했고, *또* 내 메트릭이 ([상태 명령][1]이 *아닌*) [에이전트 로그 파일][6]에 나타난다면, 사용 중인 `metric_type`에 문제가 있을 가능성이 큽니다. 

다음은 `list_matching_attributes.log` 파일 출력입니다. 

```text
Matching: 0/350. Bean name: Hadoop:service=HBase,name=Master,sub=Server - Attribute name: tag.isActiveMaster  - Attribute type: java.lang.String
```

## 이 문제 해결 방법

[에이전트 로그 파일][6]로 이동해 다음과 유사한 오류가 있는지 검색합니다.

```text
2016-12-05 03:08:33,261 | WARN | JMXAttribute | Unable to get metrics from Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster
java.lang.NumberFormatException: For input string: "false"
 [...]
```

이 오류는 `Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster`이 문자열 값을 반환한다는 뜻입니다.

`jmx.yaml` 파일을 확인하세요. 다음 예시와 같이 나타납니다.

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: java.lang.String
```

로그 내 `java.lang.String` metric_type 에서 문제를 확인할 수 있습니다.

이 문제를 해결하려면 연결된 metric_type을 변경하고 `jmx.yaml` 파일에 다음 구성이 있도록 하세요(마지막 네 줄에서 변경된 사항 확인).

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: gauge
              values:
                true: 1
                false: 0
              # Note: If using Agent 6, boolean keys must be in quotes values: {"true": 1, "false": 0, default: 0}
```

그러면 Jmxfetch에서 문자열인 것을 확인하고 이 규칙을 사용해 숫자 메트릭으로 변환합니다.

그래도 문제가 해결되지 않을 경우 [Datadog 고객 지원팀][7]에 문의하세요.

[1]: /ko/integrations/faq/troubleshooting-jmx-integrations/
[2]: /ko/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[3]: /ko/integrations/faq/jmx-yaml-error-include-section/
[4]: /ko/integrations/guide/collecting-composite-type-jmx-attributes/
[5]: /ko/integrations/faq/how-to-run-jmx-commands-in-windows/
[6]: /ko/agent/guide/agent-log-files/
[7]: /ko/help/