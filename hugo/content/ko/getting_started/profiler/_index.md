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
  text: 프로파일러 활성화
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: 학습 센터
  text: 애플리케이션 성능 모니터링 소개
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: 블로그
  text: Datadog의 연속 프로파일러를 사용해 Akka 애플리케이션을 최적화하는 방법
- link: https://www.datadoghq.com/blog/request-latency-profiling/
  tag: 블로그
  text: 프로파일링을 통한 요청 지연 시간 이해
title: 연속 프로파일러 시작하기
---

프로파일링을 사용하면 서비스를 더 빠르고 저렴하며 안정적으로 제공할 수 있지만 프로파일러를 사용해 보지 않았다면 어렵게 느껴질 수 있습니다.

이 가이드에서는 프로파일링에 대해 설명하고, 성능 문제가 있는 샘플 서비스를 제공하며, Datadog Continuous Profiler를 사용하여 문제를 이해하고 해결합니다.

## 개요

프로파일러는 실행 중인 프로그램에 대한 데이터를 수집하여 각 기능이 수행하는 "작업"의 양을 보여줍니다. 예를 들어 인프라스트럭처 모니터링에서 앱 서버가 CPU의 80%를 사용하고 있는데 그 원인을 파악하기 어려울 수 있습니다. 이때 프로파일링은 작업을 세부적으로 보여줍니다. 예를 들면 다음과 같습니다.

| 함수      | CPU 사용량 |
|---------------|-----------|
| `doSomeWork`  | 48%       |
| `renderGraph` | 19%       |
| 기타         | 13%       |

성능 문제 해결 시 많은 프로그램이 몇 군데에서 많은 시간을 소비하기 때문에 이러한 정보가 유용합니다. 프로그램의 어느 부분을 최적화할지 엔지니어가 추측해야 한다면 소비 시간 대비 별다른 성과를 거두지 못할 수 있습니다. 하지만 프로파일러를 사용하면 코드의 어느 부분을 최적화할지 정확히 찾을 수 있습니다.

APM 도구를 사용해 본 적이 있다면, 프로파일링을 계측 없이도 코드를 세밀하게 볼 수 있는 "심층" 추적기처럼 생각할 수 있습니다.

Datadog Continuous Profiler는 CPU 사용량, 메모리에 할당되는 객체의 양과 유형, 잠금 획득 대기 시간, 네트워크 또는 파일 I/O 양 등 다양한 유형의 '작업'을 추적할 수 있습니다. 사용 가능한 프로파일 유형은 프로파일링 중인 언어에 따라 다릅니다.

## 설정

### 사전 필수 조건

시작하기 전에 다음의 전제 조건을 충족하는지 확인하세요.

1. [docker-compose][1]
2. Datadog 계정과 [API 키][2]. Datadog 계정이 필요한 경우 [무료 평가판에 등록][3]하세요.

### 설치

[dd-continuous-profiler-example][4] 리포지토리는 실험을 위해 성능 문제가 있는 예제 서비스를 제공합니다. 5,000편의 영화에 대한 "데이터베이스" 검색을 위해 API가 포함되어 있습니다.

예제 서비스를 설치하고 실행합니다.

```shell
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

### 검증

컨테이너가 빌드되고 실행되면 "도구 상자" 컨테이너를 탐색할 수 있습니다.

```
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
```

다음과 함께 API를 사용하세요.
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

원하는 경우 `movies-api-py` 이라는 Python 버전의 예제 서비스가 있습니다. 튜토리얼 전반에 걸쳐 명령을 적절하게 조정하세요.

### 데이터 생성

ApacheBench 도구, [ab][5]를 사용하여 트래픽을 생성합니다. 20초 동안 요청을 보내는 10개의 동시 HTTP 클라이언트에 대해 실행합니다. 도구 상자 컨테이너 내에서 다음을 실행합니다.

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

[Profile Search][6]를 사용하여 트래픽이 발생한 기간에 해당하는 프로필을 찾습니다. 로드하는 데 1분 정도 걸릴 수 있습니다. 로드 테스트를 포함하는 프로필의 CPU 사용량이 더 높습니다.

{{< img src="profiler/intro_to_profiling/list.png" alt="프로필 목록" style="width:80%;">}}

프로필을 열면 프로필 시각화가 다음과 유사하게 나타납니다.

{{< img src="profiler/intro_to_profiling/flame_graph.png" alt="플레임 그래프">}}

플레임 그래프입니다. 표시되는 가장 중요한 사항은 각 메서드가 사용된 CPU 양(CPU 프로필이므로)과 각 메서드가 호출된 방식입니다. 예를 들어 위에서 두 번째 행을 읽으면 `Thread.run()`가 `QueuedThreadPool$2.run()`(다른 것들 중에서)을 호출하고, `QueuedThreadPool.runjob(Runnable)`을 호출하고, `ReservedTheadExecutor$ReservedThread.run()`등을 호출합니다.

플레임 그래프 하단의 한 영역을 확대하면 툴팁을 통해 `parse()`함수 내에서 대략 309ms(0.90%)의 CPU 시간이 소비되었음을 알 수 있습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_parse.png" alt="Flame 그래프 parse() 프레임">}}

`String.length()`는 `parse()` 함수 바로 아래에 있습니다. 즉, `parse()`가 이를 호출한다는 의미입니다. `String.length()` 위로 마우스를 가져가면 약 112ms의 CPU 시간이 소요된 것을 확인할 수 있습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_length.png" alt="플레임 그래프 String.length() 프레임">}}

이는 309ms - 112ms에서 197ms가 `parse()`에 직접적으로 소비된 것입니다. `parse()` 박스 아래의 아무것도 표시되어 있지 않은 부분이 이를 시각적으로 나타내고 있습니다. 

플레임 그래프는 시간의 진행을 _나타내지 않는다_는 점을 알아둘 필요가 있습니다. 프로필에서 이 부분을 보면 `TypeAdapters$16.write()` 이전에 `Gson$1.write()`이 실행되지 않았지만 이후에도 실행되지 않았을 수 있습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_write.png" alt="write() 프레임이 나란히 있는 플레임 그래프 섹션">}}

동시에 실행될 수도 있고, 프로그램이 한 호출을 여러 번 실행한 다음 다른 호출을 여러 번 실행하고 앞뒤로 계속 전환할 수도 있습니다. 플레임 그래프는 프로그램이 동일한 일련의 함수를 실행할 때마다 함께 병합됩니다. 따라서 함수가 호출될 때마다 표시하는 수많은 작은 상자 없이 코드의 어느 부분이 CPU를 가장 많이 사용했는지 한눈에 알 수 있습니다.

다시 축소하여 CPU 사용량의 약 87%가 `replyJSON()` 메서드 내에 있는지 확인합니다. 그 아래에는 그래프가 `replyJSON()`을 표시하며 그래프가 호출하는 메서드는 결국 정렬 및 날짜 구문 분석과 관련된 함수를 실행하는 4개의 주요 코드 경로("스택 트레이스")로 분기됩니다.

{{< img src="profiler/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="replyJSON() 아래 스택 트레이스를 가리키는 화살표가 있는 플레임 그래프">}}

또한 다음과 같은 CPU 프로필의 일부를 볼 수 있습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_gc.png" alt="GC(가비지 수집)를 보여주는 플레임 그래프" style="width:80%;">}}

### 프로파일 유형

CPU 시간의 거의 6%가 가비지 수집에 사용되었으며 이는 많은 가비지를 생성할 수 있음을 의미합니다. 따라서 **Allocated Memory** 프로필 유형을 검토하세요.

{{< img src="profiler/intro_to_profiling/types.png" alt="프로필 유형 선택기" style="width:60%;">}}

Allocated Memory 프로필에서 상자의 크기는 각 함수에 할당된 메모리 양과 할당을 수행하는 함수로 이어진 호출 스택을 보여줍니다. 여기서는 이 1분 프로필 동안 호출된 `replyJSON()` 메서드 및 기타 메서드가 17.47GiB를 할당했음을 확인할 수 있습니다. 이는 대부분 위의 CPU 프로필에 표시된 동일한 날짜 구문 분석 코드와 관련이 있습니다.

{{< img src="profiler/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="replyJSON() 아래 스택 트레이스를 가리키는 화살표가 있는 할당 프로필의 플레임 그래프">}}

## 복구

### 코드 수정

코드를 검토하고 진행 상황을 확인합니다. CPU 플레임 그래프를 보면 비용이 많이 드는 코드 경로가 `LocalDate.parse()`을 호출하는 66번 라인의 Lambda를 통과하는 것을 볼 수 있습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_sort_lambda.png" alt="sort lambda 위에 마우스를 올려 놓은 플레임 그래프">}}

이는 [`dd-continuous-profiler-example`][7]의 이 코드 부분에 해당하며, 여기서는 `LocalDate.parse()`을 호출합니다.

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

이는 출시 날짜를 기준으로 내림차순으로 결과를 반환하는 API의 정렬 논리입니다. 이는 정렬 키로 `LocalDate`로 변환된 출시 날짜를 사용하여 수행됩니다. 시간을 절약하기 위해 모든 요청이 아닌 각 영화의 출시 날짜에 대해서만 구문 분석되도록 `LocalDate`를 캐시할 수 있지만 더 나은 방법이 있습니다. 날짜는 ISO 8601 형식(yyyy-mm-dd)으로 구문 분석됩니다. 즉, 구문 분석 대신 문자열로 정렬할 수 있습니다.

다음과 같이 `try` 및 `catch`를 `return m.releaseDate;`로 대체합니다. 

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    return m.releaseDate;
  }).reversed());
}
```

그런 다음 서비스를 다시 구축하고 재시작합니다.
```
docker-compose build movies-api-java
docker-compose up -d
```

### 재테스트

결과를 테스트하려면 트래픽을 다시 생성합니다.

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

p99는 795ms에서 218ms로 증가했고, 전체적으로 기존보다 4배에서 6배 정도 빠릅니다.

새 로드 테스트가 포함된 [프로필](#read-the-profile)을 찾아 CPU 프로필을 확인합니다. 플레임 그래프의  `replyJSON` 일부는 이전 로드 테스트보다 총 CPU 사용량의 비율이 훨씬 적습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="최적화된 replyJSON() 스택 트레이스가 포함된 플레임 그래프">}}

### 정리

탐색이 끝나면 다음을 실행하여 정리하세요.

```shell
docker-compose down
```

## 권장 사항

### 비용 절감

이렇게 CPU 사용량을 개선하면 비용 절감으로 이어질 수 있습니다. 실제 서비스였다면 이 작은 개선으로 서버를 절반으로 축소하여 연간 수천 달러를 절약할 수 있었을 것입니다. 10분 정도 작업한 것에 비하면 나쁘지 않은 성과입니다.

### 서비스 개선

이 가이드에서는 프로파일링의 개요와 시작하는 방법에 대해 다룹니다. **[서비스에 대해 프로파일러를 활성화하세요][8]**.

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