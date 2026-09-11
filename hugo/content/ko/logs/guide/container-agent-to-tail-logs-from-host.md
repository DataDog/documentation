---
aliases:
- /ko/logs/faq/how-to-tail-logs-from-host-using-a-container-agent
further_reading:
- link: /agent/docker/log
  tag: 설명서
  text: 도커(Docker)를 사용해 로깅하기
- link: /agent/docker/log/?tab=containerinstallation
  tag: 설명서
  text: 쿠버네티스(Kubernetes)를 사용해 로깅하기
- link: https://www.datadoghq.com/blog/docker-logging/
  tag: 블로그
  text: 도커(Docker) 로깅 모범 사례
- link: /glossary/#tail
  tag: 용어
  text: '"tail"에 대한 용어 항목'
title: 컨테이너 에이전트를 사용해 호스트에서 로그 테일링
---

<div class="alert alert-info">Datadog는 <b>STDOUT/STDERR</b>를 사용해 컨테이너 로그를 수집할 것을 권장합니다.</div>

## 개요

포드/컨테이너는 기본적으로 호스트 파일에 액세스할 수 있는 권한이 없습니다. 이는 또한 에이전트에도 적용됩니다. 컨테이너 에이전트가 호스트 파일에서 로그를 수집하도록 하려면, 아래와 유사한 오류 메시지가 나타납니다.

```
  syslog
  ------
    Type: file
    Path: /var/log/messages
    Status: Error: file /var/log/messages does not exist

```

컨테이너 에이전트가 호스트 파일에 액세스할 수 있도록 권한을 부여하려면 파일이나 디렉터리를 컨테이너 에이전트에 마운트합니다. OS에 따라 마운트할 파일과 디렉터리를 호스팅하는 [에이전트 파일 및 디렉터리][1] 목록을 검토하세요.

쿠버네티스(Kubernetes) 및 도커(Docker)에 대한 몇몇 예시를 소개합니다.

{{< tabs >}}
{{% tab "쿠버네티스" %}}

호스트에 있는 로그 파일을 에이전트 컨테이너로 마운트하려면, 에이전트 매니페스트의 볼륨 섹션에 있는 호스트 로그 디렉터리와 `volumeMounts` 섹션에 있는 컨테이너 로그 디렉터리를 설정합니다.

```
        volumeMounts:
          - name: customlogs
            ## The desired log directory inside the agent container:
            mountPath: /container/var/test-dir/logs/

      volumes:
        - name: customlogs
          hostPath:
            ## The directory in your host containing the log files.
            path: /var/test-dir/logs/
```

다음으로, 에이전트를 설정하여 로그 수집을 위해 파일을 테일링하세요. 이를 위해 커스텀 로그 설정을 `/conf.d/`에 마운트할 수 있습니다. 파일 이름은 `.yaml` 확장을 포함하기만 하면 됩니다.

호스트 파일을 직접 마운트하기 보다는 ConfigMap을 사용해 설정을 저장하는 것이 좋습니다. `logs.yaml` 파일을 포함하는 샘플 ConfigMap 매니페스트는 다음과 같습니다.

```
kind: ConfigMap
apiVersion: v1
metadata:
     name: ddagent-logs-configmap
     namespace: default
data:
     logs.yaml: |-
           logs:
             - type: file
               service: syslog
               source: os
               ## Use the container log directory you set in the agent manifest
               path: /container/var/test-dir/logs/*.log
```

명령을 사용해 ConfigMap 개체를 생성합니다.

```bash
kubectl create -f <configmap manifest>
```

그런 다음 `/conf.d/`에 마운트합니다.

```
        volumeMounts:
          - name: cm-logs
            mountPath: /conf.d/

      volumes:
        - name: cm-logs
          configMap:
            name: ddagent-logs-configmap
```

{{% /tab %}}
{{% tab "도커(Docker)" %}}

호스트 로그 파일을 마운트하려면 에이전트의 `docker run` 명령에 볼륨 파라미터를 추가합니다.

```
-v /<host log directory>/:<container log directory>/
```

그런 다음 로컬에서 커스텀 로그 설정을 생성합니다.

```
logs:
  - type: file
    service: syslog
    source: os
    path: <container log path>/*.log
```

`/conf.d/`에 마운트합니다. 파일 이름은 원하는 대로 정할 수 있습니다.

```
-v <absolute path>/logs.yaml:/conf.d/logs.yaml
```

에이전트의 도커(Docker) 설치 명령은 다음과 유사합니다.

```
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -v /<host log directory>/:<container log directory>/ \
           -v /<config location>/logs.yaml:/conf.d/logs.yaml \
           gcr.io/datadoghq/agent:latest
```
{{% /tab %}}
{{< /tabs >}}

## 확인

이를 모두 설정한 후, 에이전트를 배포할 수 있습니다. `docker exec -it datadog-agent agent status`를 실행하면 아래와 같은 내용을 확인할 수 있습니다.

```
==========
Logs Agent
==========

    Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 10605
    EncodedBytesSent: 2144
    LogsProcessed: 32
    LogsSent: 31

  logs
  ----
    Type: file
    Path: /container/var/test-dir/logs/*.log
    Status: OK
      1 files tailed out of 1 files matching
    Inputs: /container/var/test-dir/logs/722bfb2cb35cc627-json.log

```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7