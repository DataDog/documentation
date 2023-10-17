---
aliases:
- /ko/tracing/profiling/intro_to_profiling
- /ko/tracing/profiler/intro_to_profiling
- /ko/tracing/profiler/getting_started
further_reading:
- link: /profiler/
  tag: 설명서
  text: Continuous Profiler
- link: /profiler/enabling/
  tag: 설명서
  text: 프로파일러 사용
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: 학습 센터
  text: 애플리케이션 성능 모니터링 소개
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: 블로그
  text: Datadog의 지속적 프로파일러를 사용해 Akka 애플리케이션을 최적화하는 방법
kind: 설명서
title: 연속적인 프로파일러 시작하기
---

프로파일링을 사용하면 서비스가 빠르고 저렴하며 안정적으로 제공될 수 있지만, 프로파일러를 사용해 본 적이 없다면 혼동될 수 있습니다.

이 가이드에서는 프로파일링에 대해 설명하고 성능 문제가 있는 샘플 서비스를 제공하며, Datadog 연속적인 프로파일러를 사용하여 문제를 이해하고 해결합니다.

## 개요

프로파일러는 실행 중인 프로그램에 대한 데이터를 수집함으로써 각 기능이 얼마나 "작업"을 하고 있는지 보여줍니다. 예를 들어 인프라스트럭처 모니터링을 통해 앱 서버가 CPU의 80%를 사용하는 것으로 나타났다면 그 이유를 모를 수도 있습니다. 프로파일링은 작업 내역을 보여줍니다:

| 함수      | CPU 사용량 |
|---------------|-----------|
| `doSomeWork`  | 48%       |
| `renderGraph` | 19%       |
| 기타         | 13%       |

성능 문제를 연구할 때 많은 프로그램이 몇 군데에서 많은 시간을 보내므로 이 정보는 중요합니다. 프로그램의 어느 부분을 최적화할지 추측하는 것은 엔지니어가 결과없이 많은 시간을 할애할 수 있습니다. 프로파일러를 사용하면 코드의 어떤 부분을 최적화할지 정확하게 찾을 수 있습니다.

애플리케이션 성능 모니터링(APM) 도구를 사용해 본 적이 있다면, 아무런 계측을 사용할 필요 없이 코드를 세밀하게 볼 수 있는 "자세한" 트래이서와 같은 프로파일링을 고려할 수 있습니다.

Datadog 연속적인 프로파일러는 CPU 사용량, 메모리에 할당되는 개체의 양 및 유형, 잠금을 획득하기 위해 대기하는 시간, 네트워크 또는 파일 I/O의 양 등 다양한 유형의 "작업"을 추적할 수 있습니다. 프로파일 유형은 프로파일되는 언어에 따라 다릅니다.

## 설정

### 전제 조건

시작하기 전에 다음의 전제 조건을 충족하는지 확인하세요.

1. [docker-compose][1]
2. Datadog 계정과 [API키][2]입니다. Datadog 계정이 필요한 경우 [무료 트라이얼에 가입하세요][3].

### 설치

[d-continuous-profiler-example][4] repo는 실험을 위한 성능 문제가 있는 예제 서비스를 제공하며, 5000편의 영화의 "데이터베이스"를 검색하기 위한 API를 포함합니다.

예시 서비스를 설치하고 실행합니다:

```shell
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

### 검증

컨테이너가 제작되고 실행되면 "툴박스" 컨테이너는 다음을 탐색할 수 있습니다:

```
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
```

API를 다음과 함께 사용합니다:
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

원할 경우 `movies-api-py`라고 불리는 파이썬(Python) 버전의 예시 서비스가 있습니다. 만약 활용한다면 튜토리얼 전체에 걸쳐 명령어를 조정하세요.

### 데이터생성

[ab][5]인 ApacheBench 도구를 사용하여 트래픽을 생성합니다. 요청을 보내는 동시 HTTP 클라이언트 10개에 대해 20초 동안 실행합니다. 도구 상자 컨테이너 안에서 다음을 실행합니다:

```shell
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

출력 예시:

```text
...
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%    464
  66%    503
  75%    533
  80%    553
  90%    614
  95%    683
  98%    767
  99%    795
 100%    867 (longest request)
```

## 조사

### 프로필 읽기

[프로필 검색][6]을 사용하여 트래픽을 생성한 기간을 포함하는 프로파일을 찾습니다. 로드 테스트를 포함하는 프로파일은 CPU 사용량이 더 높습니다:

{{< img src="profiler/intro_to_profiling/list.png" alt="List of profiles" style="width:80%;">}}

프로필을 열면 프로파일의 시각화가 다음과 유사하게 나타납니다:

{{< img src="profiler/intro_to_profiling/flame_graph.png" alt="Flame graph">}}

이것은 flame 그래프입니다. 이것이 보여주는 가장 중요한 것은 각 방법이 얼마나 많은 CPU를 사용했는지(CPU프로필이기 때문에)와 각 방법이 어떻게 호출되었는지입니다. 예를 들어, 위에서 두 번째 행을 읽어보면 (다른 것들 중에서), `QueuedThreadPool$2.run()`라고 불리는`Thread.run()`, `ReservedTheadExecutor$ReservedThread.run()`라고 불리는`QueuedThreadPool.runjob(Runnable)`을 볼 수 있습니다.

flame 그래프 하단의 한 영역을 확대하면 툴팁을 통해 CPU 시간의 약 309ms(0.90%)가 `parse()` 기능 내에서 사용되었음을 알 수 있습니다:

{{< img src="profiler/intro_to_profiling/flame_graph_parse.png" alt="Flame graph parse() frame">}}

`String.length()`는 `parse()`기능/함수 바로 아래에 있습니다. 즉, `parse()`가 호출합니다. `String.length()`위로 이동하여 약 112ms의 CPU 시간이 걸렸는지 확인합니다:

{{< img src="profiler/intro_to_profiling/flame_graph_length.png" alt="Flame graph String.length() frame">}}

197밀리초가 `parse()`에서 309밀리초 - 112밀리초 동안 직접 소비되었다는 것을 의미합니다. 그것은 `parse()`상자의 아래에 아무것도 없는 부분으로 시각적으로 표현됩니다.

flame 그래프는 시간의 진행을 나타내는 것이 아닙니다. 프로필의 이 부분을 보면 `Gson$1.write()`가 `TypeAdapters$16.write()` 전에는 실행되지 않았으며 실행되지 않았을 수도 있습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_write.png" alt="Flame graph section with write() frames next to each other">}}

 동시에 실행되거나, 프로그램이 하나의 호출을 여러 번 실행하고, 다른 하나의 호출을 여러 번 실행하고, 계속 앞뒤로 전환할 수 있습니다. flame 그래프는 프로그램이 동일한 일련의 기능/함수를 실행하고 있을 때 항상 함께 합쳐져서, 기능/함수가 호출될 때마다 수많은 작은 상자가 나타나지 않고도 코드의 어떤 부분이 가장 많이 CPU를 사용하고 있는지 한눈에 알 수 있습니다.

축소하면 CPU 사용량의 약 87%가 `replyJSON()` 방법 내에 있었다는 것을 알 수 있습니다. 그 아래에서 그래프는 보여주고 `replyJSON()`와 방법은 정렬 및 날짜 파싱과 관련된 기능/함수를 실행하는 네 가지 주요 코드 경로("스택 트레이스(stack trace)")로 분기됩니다:

{{< img src="profiler/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="Flame graph with arrows pointing at stack traces below replyJSON()">}}

또한 CPU 프로필에서 다음과 같은 부분을 볼 수 있습니다:

{{< img src="profiler/intro_to_profiling/flame_graph_gc.png" alt="Flame graph showing GC (garbage collection)" style="width:80%;">}}

### 프로파일 유형

CPU 시간의 거의 6%가 휴지통 수집에 사용되었으며, 이는 휴지통 수집이 많은 휴지통을 생성하고 있음을 의미합니다. 따라서 **할당된 메모리** 프로필 유형을 검토하세요:

{{< img src="profiler/intro_to_profiling/types.png" alt="Profile type selector" style="width:60%;">}}

할당된 메모리 프로필에서 상자의 크기는 각 기능/함수가 할당한 메모리의 양과 해당 기능/함수가 할당을 수행하도록 이끈 호출 스택을 보여줍니다. 여기서 1분 프로필에서 호출한 `replyJSON()`방식과 기타 방식은 17.47 GiB를 할당했으며 대부분 위의 CPU 프로파일에서 볼 수 있는 동일한 날짜 파싱 코드와 관련이 있습니다:

{{< img src="profiler/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="Flame graph of allocation profile with arrows pointing at stack traces below replyJSON()">}}

## 복구

### 코드 수정

코드를 검토하고 무슨 일이 발생했는지 알아보세요. CPU flame 그래프를 보면 값비싼 코드 경로가 `LocalDate.parse()`를 호출하는 66번 라인의 Lambda 를 통과한다는 것을 알 수 있습니다:

{{< img src="profiler/intro_to_profiling/flame_graph_sort_lambda.png" alt="Flame graph with mouse over sort lambda">}}

이것은 [`dd-continuous-profiler-example`][7]의 코드 부분에 해당하며, 여기서 `LocalDate.parse()`를 호출합니다:

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    // 문제: 정렬할 각 항목의 날짜 시간을 파싱합니다.
    // 예시 해결책:
    //   날짜가 이미 iso 형식(yyyy-mm-dd)이므로 일반 문자열 정렬로 정렬됨
    //   `return m.releaseDate`
    try {
      return LocalDate.parse(m.releaseDate);
    } catch (Exception e) {
      return LocalDate.MIN;
    }
  }).reversed());
}
```

이것은 API의 정렬 로직으로, 결과를 개봉일별로 내림차순으로 반환합니다. 이것은 `LocalDate`로 변환된 개봉일을 정렬 키로 사용하여 수행합니다. 시간을 절약하기 위해 모든 요청이 아닌 각 영화의 개봉일별로만 파싱되도록 `LocalDate`를 캐시할 수 있지만, ISO 8601 형식(yyy-mm-dd)으로 날짜를 파싱하는 대신 문자열로 정렬할 수 있습니다.

`try`와 `catch`를 다음과 같이 `return m.releaseDate;`로 바꿉니다:

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    return m.releaseDate;
  }).reversed());
}
```

서비스를 재구성하고 다시 시작합니다:
```
docker-compose build movies-api-java
docker-compose up -d
```

### 재 테스트

결과를 테스트하려면 트래픽을 다시 생성합니다:

```shell
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

출력 예시:

```
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%     82
  66%    103
  75%    115
  80%    124
  90%    145
  95%    171
  98%    202
  99%    218
 100%    315 (longest request)
```

p99는 795ms에서 218ms로 증가했고, 이는 전체적으로 기존보다 4배에서 6배 정도 빠른 속도입니다.

새 로드 테스트가 들어 있는 [프로필](#read-the-profile)을 찾아 CPU 프로필을 확인합니다. flame 그래프의 `replyJSON`부분은 전체 CPU 사용량에서 이전 로드 테스트보다 훨씬 적은 비율입니다:

{{< img src="profiler/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="Flame graph with the optimized replyJSON() stack traces">}}

### 정리

탐색이 끝나면 다음을 실행하여 정리합니다:

```shell
docker-compose down
```

## 권장

### 저축

이처럼 CPU 사용량을 개선하면 비용을 절감할 수 있습니다. 이것이 실제 서비스였다면 이 작은 개선으로 서버를 절반으로 줄일 수 있고, 연간 수천 달러를 절약할 수 있습니다. 약 10분 동안 작업해도 됩니다.

### 서비스 향상

본 안내서는 프로파일링의 내용을 간략하게 알고 시작하는 방법을 제공합니다. **[서비스를 위해 프로파일러 사용합니다][8]**.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.docker.com/compose/install/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/signup
[4]: https://github.com/DataDog/dd-continuous-profiler-example
[5]: https://httpd.apache.org/docs/2.4/programs/ab.html
[6]: https://app.datadoghq.com/profiling?query=env%3Aexample%20service%3Amovies-api-java
[7]: https://github.com/DataDog/dd-continuous-profiler-example/blob/25819b58c46227ce9a3722fa971702fd5589984f/java/src/main/java/movies/Server.java#L66
[8]: /ko/profiler/enabling/