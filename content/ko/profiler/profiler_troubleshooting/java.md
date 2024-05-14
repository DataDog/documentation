---
code_lang: java
code_lang_weight: 10
further_reading:
- link: /tracing/troubleshooting
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM) 트러블슈팅
kind: 설명서
title: 자바(Java) 프로파일러 트러블슈팅
type: multi-code-lang
---

## 프로필 검색 페이지에서 누락된 프로필

프로파일러를 설정하였고 프로파일 검색 페이지에서 프로필을 볼 수 없는 경우 [디버그 모드][1]를 켜고 디버그 파일과 다음 정보를 포함해 [지원 티켓을 엽니다][2].

- 운영 체제 유형 및 버전(예: Linux Ubuntu 20.04)
- 런타임 유형, 버전 및 벤더(예: 자바(Java) OpenJDK 11 AdoptOpenJDK)


## 기본 설정에서 오버헤드 절감

기본 설정 오버헤드가 허용되지 않는 경우 최소 설정 구성으로 프로파일러를 사용할 수 있습니다. 최소 설정은 기본값에 비해 다음이 변경되었습니다.

- 기본값 100ms 대비 `ThreadSleep`, `ThreadPark` 및 `JavaMonitorWait`에 대해 500ms로 샘플링 임계값 상승
- `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount` 이벤트 비활성화

최소 설정을 사용하려면, `dd-java-agent` 버전 `0.70.0`가 있는지 확인한 다음 서비스 호출을 다음으로 변경합니다.

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=minimal -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## 프로파일러 정보 입도 향상

프로파일링 데이터에서 더 높은 입도를 원하는 경우, `comprehensive` 설정을 지정할 수 있습니다. 이러한 접근 방식은 추가 입도 비용으로 프로파일러 오버헤드를 향상합니다. 종합적인 설정은 기본값과 비교해 다음이 변경되었습니다.

- 기본값 100ms 대비 `ThreadSleep`, `ThreadPark` 및 `JavaMonitorWait` 이벤트에 대해 10ms로 샘플링 임계값 하락
- `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount` 이벤트 활성화

 종합적인 설정을 사용하려면 `dd-trace-java` 버전 `0.70.0`가 있는지 확인한 다음 서비스 호출을 다음으로 변경합니다.

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=comprehensive -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## 할당 프로파일러 활성화

자바(Java) 15 이하에서 할당 프로파일러는 기본적으로 꺼져 있습니다. 할당량이 많은 애플리케이션에서 프로파일러에 과부하가 발생할 수 있습니다.

할당 프로파일러를 활성화하려면 `-Ddd.profiling.allocation.enabled=true` JVM setting or the `DD_PROFILING_ALLOCATION_ENABLED=true` 환경 변수를 사용해 애플리케이션을 시작합니다.

대신, `jfp`[템플릿 파일 재정의](#creating-and-using-a-jfr-template-override-file)에서 다음 이벤트를 활성화할 수 있습니다.

```
jdk.ObjectAllocationInNewTLAB#enabled=true
jdk.ObjectAllocationOutsideTLAB#enabled=true
```

[템플릿 재정의를 사용한 방법을 알아보세요.](#creating-and-using-a-jfr-template-override-file)

## 힙 프로파일러 활성화
<div class="alert alert-info">자바 힙 프로파일러 기능은 베타 버전입니다.</div>
<div class="aler alert-info">이 기능은 최소 자바 11.0.12, 15.0.4, 16.0.2, 17.0.3 또는 18 이상을 필요로 합니다.</div>
힙 프로파일러를 활성화하려면 `-Ddd.profiling.heap.enabled=true` JVM setting or the `DD_PROFILING_HEAP_ENABLED=true` 환경 변수로 애플리케이션을 시작합니다.

대신, `jfp`[템플릿 파일 덮어쓰기](#creating-and-using-a-jfr-template-override-file)에서 다음 이벤트를 활성화할 수 있습니다.

```
jdk.OldObjectSample#enabled=true
```

[템플릿 덮어쓰기를 사용한 방법을 알아보세요.](#creating-and-using-a-jfr-template-override-file)

## 프로파일에서 민감한 정보 제거

시스템 속성이 사용자 이름 또는 비밀번호 등 민감한 정보를 포함하는 경우 `jdk.InitialSystemProperty`를 비활성화한 채로 `jfp`[재정의 템플릿 파일]#creating-and-using-a-jfr-template-override-file)을 생성하여 시스템 속성 이벤트를 끕니다.

```
jdk.InitialSystemProperty#enabled=false
```

[템플릿 덮어쓰기를 사용한 방법을 알아보세요.](#creating-and-using-a-jfr-template-override-file)

## 프로파일러 과부하를 유도하는 대규모 할당 이벤트

할당 프로파일링을 끄려면, `jfp`[템플릿 재정의 파일](#creating-and-using-a-jfr-template-override-file)에서 다음 이벤트를 비활성화합니다.

```
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
```

[템플릿 덮어쓰기를 사용한 방법을 알아보세요.](#creating-and-using-a-jfr-template-override-file)

## 쓰레기 수집기를 저하하는 메모리 유출 감지

메모리 유출 감지를 끄려면 `jfp`[템플릿 재정의 파일](#creating-and-using-a-jfr-template-override-file)에서 다음 이벤트를 비활성화합니다.

```
jdk.OldObjectSample#enabled=false
```

[템플릿 덮어쓰기를 사용한 방법을 알아보세요.](#creating-and-using-a-jfr-template-override-file)

## 프로파일러 과부하를 유도하는 예외

Datadog 예외 프로파일러는 경량으로 보통의 조건에서 오버헤드가 적습니다. 많은 예외가 생성되는 경우 해당 프로파일러에 상당한 과부하가 발생할 수 있습니다. 제어 흐름에 대한 예외를 사용하는 경우 발생할 수 있습니다. 이상하게 높은 예외율이 발생한 경우 원인을 해결할 때까지 일시적으로 예외를 끕니다.

예외 프로파일링을 비활성화하려면, -Ddd.integration.throwables.enabled=false` JVM 설정으로 트레이서를 시작합니다.

예외율이 보통 수준으로 돌아온 후 이 설정을 원상 복귀하는 것을 기억하세요.

## 자바 8 지원

다음 OpenJDK 8 벤더는 최신 버전에 JDK Flight Recorder를 포함화여 지속적인 프로파일링에 대해 지원됩니다.

| 벤더                      | Flight Recorder를 포함하는 JDK 버전 |
| --------------------------- | ----------------------------------------- |
| Azul                        | u212(u262 권장)                |
| AdoptOpenJDK                | u262                                      |
| 레드햇(RedHat)                      | u262                                      |
| Amazon(Corretto)           | u262                                      |
| Bell-Soft(Liberica)        | u262                                      |
| 모든 벤더 업스트림 빌드 | u272                                      |

벤더가 목록에 없는 경우 [지원 티켓을 엽니다][2]. 다른 벤더가 개발 중이거나 베타 지원을 제공할 수 있습니다.

## JFR 템플릿 재정의 파일 생성 및 사용

재정의 템플릿을 통해 재정의할 프로파일링 속성을 지정할 수 있습니다. 하지만 기본 설정은 대부분의 사용 사례를 포함하는 오버헤드 및 데이터 밀도 간 균형을 제공합니다. 재정의 파일을 사용하려면 다음 단계를 따릅니다.

1. 서비스 호출에서 `dd-java-agent`로 액세스할 수 있는 디렉터리에 재정의 파일을 생성합니다.
    ```
    touch dd-profiler-overrides.jfp
    ```

2. jfp 파일에 원하는 재정의를 추가합니다. 예를 들어 할당 프로파일링과 JVM 시스템 속성을 비활성화하려면 `dd-profiler-overrides.jfp` 파일이 다음과 같아야 합니다.

    ```
    jdk.ObjectAllocationInNewTLAB#enabled=false
    jdk.ObjectAllocationOutsideTLAB#enabled=false
    jdk.InitialSystemProperty#enabled=false
    ```

3. `dd-java-agent`를 사용해 애플리케이션을 실행하면 서비스 호출이 `-Ddd.profiling.jfr-template-override-file=</path/to/override.jfp>`를 포함하는 재정의 파일을 불러와야 합니다. 예시는 다음과 같습니다.

    ```
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/troubleshooting/#tracer-debug-logs
[2]: /ko/help/