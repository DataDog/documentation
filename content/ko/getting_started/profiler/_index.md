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
  text: Datadog의 연속 프로파일러를 사용해 Akka 애플리케이션을 최적화하는 방법
- link: https://www.datadoghq.com/blog/request-latency-profiling/
  tag: 블로그
  text: 프로파일링을 통한 요청 지연 시간 이해
kind: 설명서
title: 연속 프로파일러 시작하기
---

프로파일링을 사용하면 서비스를 더 빠르고 저렴하게 안정적으로 제공할 수 있지만, 이전에 사용해 본 적이 없다면 혼동이 올 수 있습니다.

이 가이드에서는 프로파일링에 대한 설명과 함께 성능 문제가 있는 샘플 서비스를 제공하며, Datadog 연속 프로파일러를 사용하여 문제를 파악하고 해결합니다.

## 개요

프로파일러는 실행 중인 프로그램에 대한 데이터를 수집하여 각 기능이 얼마나 많은 "작업"을 수행하고 있는지 보여줍니다. 예를 들어 인프라스트럭처 모니터링에서 앱 서버가 CPU의 80%를 사용하고 있는 것으로 나타났는데 그 이유를 모를 수 있습니다. 프로파일링은 다음과 같이 작업 분석 내용을 보여줍니다.

| 함수      | CPU 사용량 |
|---------------|-----------|
| `doSomeWork`  | 48%       |
| `renderGraph` | 19%       |
| 기타         | 13%       |

성능 문제를 해결할 때 이 정보가 중요한 이유는 많은 프로그램이 몇 군데에서 많은 시간을 소비하고 있지만 명확하게 파악되지 않을 수 있기 때문입니다. 프로그램의 어느 부분을 최적화할지 추측하는 것만으로는 엔지니어가 많은 시간을 소비하고도 별다른 성과를 거두지 못할 수 있습니다. 이때, 프로파일러를 사용하면 코드의 어떤 부분을 최적화할지 정확히 찾을 수 있습니다.

애플리케이션 성능 모니터링(APM) 도구를 사용해 본 적이 있다면, 프로파일링을 계측 없이도 코드를 세밀하게 볼 수 있는 "심층" 트레이서처럼 생각할 수 있습니다.

Datadog 연속 프로파일러는 CPU 사용량, 메모리에 할당되는 개체의 양 및 유형, 잠금을 획득하기 위해 대기하는 시간, 네트워크 또는 파일 I/O의 양 등 다양한 유형의 "작업"을 추적할 수 있습니다. 사용 가능한 프로필 유형은 프로파일링하는 언어에 따라 다릅니다.

## 설정

### 전제 조건

시작하기 전에 다음의 전제 조건을 충족하는지 확인하세요.

1. [docker-compose][1]
2. Datadog 계정과 [API키][2]입니다. Datadog 계정이 필요하다면 [무료 평가판에 가입해 보세요][3].

### 설치

[d-continuous-profiler-example][4] 리포지토리는 실험을 위해 성능 문제가 있는 예제 서비스를 제공하며, 5000개의 영화 "데이터베이스"를 검색하기 위한 API를 포함합니다.

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

원할 경우 Python 버전의 예제 서비스인 `movies-api-py`가 있습니다. 사용하게 된다면 튜토리얼 전체에서 명령어를 적절히 조정하세요.

### 데이터 생성

ApacheBench 도구, [ab][5]를 사용하여 트래픽을 생성합니다. 20초 동안 요청을 전송하는 10개의 동시 HTTP 클라이언트에 대해 실행합니다. 도구 상자 컨테이너에서 다음을 실행하세요:

```shell
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

출력 예시:

```text
...
ab별로 보고된 지연 시간:
특정 시간 내에 처리된 요청의 백분율(ms)
  50%    464
  66%    503
  75%    533
  80%    553
  90%    614
  95%    683
  98%    767
  99%    795
 100%    867 (가장 긴 요청)
```

## 조사

### 프로필 읽기

[Profile Search][6]를 사용하여 트래픽을 생성한 기간을 포함하는 프로필을 찾습니다. 로드하는 데 1분 정도 걸릴 수 있습니다. 로드 테스트가 포함된 프로필은 CPU 사용량이 더 높습니다:

{{< img src="profiler/intro_to_profiling/list.png" alt="프로필 목록" style="width:80%;">}}

프로필을 열면 프로필 시각화가 다음과 유사하게 표시됩니다.

{{< img src="profiler/intro_to_profiling/flame_graph.png" alt="플레임 그래프">}}

이것은 플레임 그래프입니다. 그래프에서 가장 중요한 부분은 각 메서드가 얼마나 많은 CPU를 사용했는지(CPU프로필이기 때문에)와 각 메서드가 어떻게 호출되었는지입니다. 예를 들어, 위에서 두 번째 행을 보면 (다른 것들 중에서), `QueuedThreadPool$2.run()`라고 불리는`Thread.run()`, `QueuedThreadPool.runjob(Runnable)`, `ReservedTheadExecutor$ReservedThread.run()` 등을 볼 수 있습니다.

플레임 그래프 하단의 한 영역을 확대하면 툴팁을 통해 CPU 시간의 약 309ms(0.90%)가 `parse()`함수 내에서 소비되었음을 알 수 있습니다:

{{< img src="profiler/intro_to_profiling/flame_graph_parse.png" alt="플레임 그래프 parse() 프레임">}}

`String.length()`는 `parse()` 함수 바로 아래에 있으며, 이는 `parse()`가 호출함을 의미합니다. `String.length()` 위로 마우스를 가져가면 약 112ms의 CPU 시간이 소요된 것을 확인할 수 있습니다:

{{< img src="profiler/intro_to_profiling/flame_graph_length.png" alt="플레임 그래프 String.length() 프레임">}}

197밀리초가 `parse()`: 309밀리초 - 112밀리초에서 직접 소비되었습니다. 그것은 `parse()` 상자의 아래에 아무것도 없는 부분으로 시각적으로 표현됩니다.

플레임 그래프는 시간의 진행을 나타내는 것이 _아닙니다_. 프로필의 이 부분을 보면 `Gson$1.write()`가 `TypeAdapters$16.write()` 전에 실행되지 않았으며 이후에도 실행되지 않았을 수 있습니다.

{{< img src="profiler/intro_to_profiling/flame_graph_write.png" alt="write() 프레임이 나란히 있는 플레임 그래프 섹션">}}

두 함수가 동시에 실행되고 있었을 수도 있고, 프로그램이 한 함수를 여러 번 호출한 다음 다른 함수를 여러 번 호출하고 계속 전환했을 수도 있습니다. 플레임 그래프는 프로그램이 동일한 일련의 함수를 실행한 모든 시간을 합쳐서 표시하므로 함수가 호출될 때마다 수많은 작은 상자를 표시하지 않고도 코드의 어느 부분에서 가장 많은 CPU를 사용했는지 한눈에 파악할 수 있습니다.


축소하면 CPU 사용량의 약 87%가 `replyJSON()` 메서드 내에 있었다는 것을 알 수 있습니다. 그 아래 표시된 그래프는 `replyJSON()`와 이를 호출하는 메서드는 결국 정렬 및 날짜 구문 분석과 관련된 함수를 실행하는 네 가지 주요 코드 경로("스택 트레이스")로 분기됨을 보여줍니다:

{{< img src="profiler/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="replyJSON() 아래의 스택 추적을 가리키는 화살표가 있는 플레임 그래프">}}

또한 CPU 프로필에서 다음과 같은 부분을 볼 수 있습니다:

{{< img src="profiler/intro_to_profiling/flame_graph_gc.png" alt="GC (garbage collection)를 나타내는 플레임 그래프" style="width:80%;">}}

### 프로필 유형

CPU 시간의 거의 6%가 휴지통 수집에 사용되었으며, 이는 휴지통 수집이 많은 휴지통을 생성하고 있음을 의미합니다. 따라서 **Allocated Memory** 프로필 유형을 검토하세요:

{{< img src="profiler/intro_to_profiling/types.png" alt="프로필 유형 선택기" style="width:60%;">}}

Allocated Memory 프로필에서 상자의 크기는 각 함수가 할당한 메모리의 양과 해당 함수가 할당 작업을 수행하도록 유도한 호출 스택을 보여줍니다. 이 1분 프로필에서 `replyJSON()` 메서드와 이 메서드가 호출한 다른 메서드에 17.47기가바이트가 할당된 것을 볼 수 있으며, 대부분 위의 CPU 프로필에서 볼 수 있는 것과 동일한 날짜 구문 분석 코드와 관련이 있습니다:

{{< img src="profiler/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="replyJSON() 아래의 스택 추적을 가리키는 화살표가 있는 할당 프로필의 플레임 그래프">}}

## 복구

### 코드 수정

코드를 검토하고 어떻게 진행되고 있는지 파악해 보세요. CPU 플레임 그래프를 보면 비용이 많이 드는 코드 경로가 66번 줄에 있는 Lambda를 통과하고 있으며 이는 `LocalDate.parse()`를 호출합니다:

{{< img src="profiler/intro_to_profiling/flame_graph_sort_lambda.png" alt="sort lambda 위에 마우스를 올려놓은 플레임 그래프">}}

이것은 [`dd-continuous-profiler-example`][7]의 코드 부분에 해당하며, 여기에서 `LocalDate.parse()`를 호출합니다:

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

이것은 API의 정렬 로직으로, 릴리스 날짜별로 내림차순으로 결과를 반환합니다. 이 로직은 `LocalDate`로 변환된 릴리스 날짜를 정렬 키로 사용하여 수행합니다. 시간을 절약하기 위해 모든 요청이 아닌 각 영화의 개봉일에 대해서만 파싱되도록 `LocalDate`를 캐시할 수 있지만, 더 나은 방법이 있습니다. 날짜는 ISO 8601 형식(yyyy-mm-dd)으로 구문 분석되고 있으므로 구문 분석 대신 문자열로 정렬할 수 있습니다.

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

### 다시 테스트

결과를 테스트하려면 트래픽을 다시 생성합니다:

```shell
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

출력 예시:

```
ab별로 보고된 지연 시간:
특정 시간 내에 처리된 요청의 백분율(ms)
  50%     82
  66%    103
  75%    115
  80%    124
  90%    145
  95%    171
  98%    202
  99%    218
 100%    315 (가장 긴 요청)
```

p99는 795ms에서 218ms로 증가했고, 전체적으로 기존보다 4배에서 6배 정도 빠릅니다.

새 로드 테스트가 들어 있는 [프로필](#read-the-profile)을 찾아 CPU 프로필을 확인합니다. 플레임 그래프의 `replyJSON` 부분은 이전 로드 테스트보다 전체 CPU 사용량에서 훨씬 적은 비율을 차지합니다:

{{< img src="profiler/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="최적화된 replyJSON() 스택 트레이스가 포함된 플레임 그래프">}}

### 정리

탐색이 끝나면 다음을 실행하여 정리합니다:

```shell
docker-compose down
```

## 권장 사항

### 비용 절감

이처럼 CPU 사용량을 개선하면 비용을 절감할 수 있습니다. 이것이 실제 서비스였다면 이 작은 개선으로 서버를 절반으로 줄일 수 있고, 연간 수천 달러를 절약할 수 있습니다. 10분 정도의 작업으로 얻을 수 있는 좋은 성과입니다.

### 서비스 향상

이 가이드는 프로파일링에 대해 간략하게 다루고 있으나 시작하는 방법에 대한 유용한 정보를 제공합니다. **[귀하의 서비스에 대해 프로파일러를 활성화하세요][8]**.

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