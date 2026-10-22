---
disable_sidebar: true
further_reading:
- link: /profiler/enabling
  tag: 문서
  text: Profiler 활성화하기
title: Profiler 기능별 언어 및 라이브러리 버전
---
다음 표는 각 언어 런타임에서 사용할 수 있는 기능을 요약한 것입니다.
하나 이상의 기능을 사용하려면 - **최소 버전**이 필요합니다. 이전 버전을 사용하는 경우 프로파일링을 사용할 수 없습니다.
- **모든 기능을 지원하는 버전**에서는 **모든** 지원 기능을 사용할 수 있습니다. 일반적으로 모든 SDK를 최신 버전으로 업데이트하는 것이 가장 좋습니다.

<div class="alert alert-info">자세한 내용은 표에서 언어 제목을 클릭하여 해당 언어의 설정 페이지로 이동하세요.</div>

## 런타임 및 SDK 버전 {#runtime-and-sdk-versions}

Datadog Profiler를 사용하려면 다음 표에 요약된 최소 버전 이상을 사용하세요. 버전별 프로필 유형의 지원 여부는 [프로필 유형](#profile-types)을 참조하세요.

|                                   |  [Java][1]   |   [Python][2]    |    [Go][3]    |   [Ruby][4]    | [Node.js][5]  |  [.NET][6]  |   [PHP][7]    | [Rust/C/C++][8] |
|-----------------------------------|:------------:|:----------------:|:-------------:|:--------------:|:-------------:|:-----------------------------------------------------------------------:|:-------------:|:---------------:|
| <strong>최소&nbsp;런타임&nbsp;버전</strong> | [JDK&nbsp;8+][17]  | Python&nbsp;2.7+ | [이전 주요 Go 릴리스][21] | Ruby&nbsp;2.5+ | Node.js&nbsp;18+ | .NET&nbsp;Core&nbsp;2.1+, .NET&nbsp;5+, .NET&nbsp;Framework&nbsp;4.6.1+ | PHP&nbsp;7.1+ |                 |
| <strong>모든 기능을 지원하는 런타임 버전</strong>       | [JDK&nbsp;11+][17] | Python&nbsp;3.6+ | [최신 주요 Go 릴리스][21] | Ruby&nbsp;3.2+ | Node.js&nbsp;18+ |                              .NET&nbsp;7+                               | PHP&nbsp;8.0+ |                 |
| <strong>모든 기능을 지원하는 SDK 버전</strong>        | [최신][9]  |   [최신][10]   | [최신][11]  |  [최신][12]  | [최신][13]  |                              [최신][14]                               | [최신][15]  |  [최신][16]   |

## 프로필 유형 {#profile-types}

다음 표는 언어별 프로필 유형의 지원 여부를 보여줍니다. 최적의 성능과 모든 기능을 사용하려면 Datadog은 해당 언어의 최신 SDK 버전을 사용할 것을 권장합니다. 특정 런타임 버전이 표시되지 않은 경우 해당 프로필 유형은 [런타임 및 SDK 버전](#runtime-and-sdk-versions)에 나열된 최소 런타임 버전에서 사용할 수 있습니다.


| <div style="width:150px"><div>    |                     [Java][1]                     | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------------------------------------------------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="CPU" >}}각 함수/메서드가 CPU에서 실행되는 데 소요된 시간입니다.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}  | {{< tooltip glossary="보기" case="title" >}} |
| {{< ci-details title="예외" >}}포착된 예외를 포함하여 발생한 예외의 수입니다.{{< /ci-details >}}   |                 {{< X >}}                 | | | | | {{< X >}} | {{< X >}}  | |
| {{< ci-details title="할당" >}}이후에 해제된 항목을 포함하여 각 함수/메서드에서 수행된 메모리 할당의 수와 크기입니다.{{< /ci-details >}}   |                [JDK 11+][17]                 | Python 3.6+ | {{< X >}} | {{< X >}} | {{< tooltip glossary="보기" case="title" >}}<br>Node.js 26+ | {{< tooltip glossary="보기" case="title" >}}<br>.NET 6+ <br>(.NET 10 권장)| {{< X >}} | {{< tooltip glossary="보기" case="title" >}} |
| {{< ci-details title="힙" >}}할당된 힙 메모리 중 현재 사용 중인 양입니다.{{< /ci-details >}}   | [JDK 11+][17] | Python 3.6+ | {{< X >}} | {{< tooltip glossary="보기" case="title" >}}<br>Ruby 3.1+<br>힙 라이브 크기는 현재 Ruby 4와 호환되지 않음 | {{< X >}} | {{< tooltip glossary="보기" case="title" >}}<br>.NET 7+ <br>(.NET 10 권장) | | {{< tooltip glossary="보기" case="title" >}} |
| {{< ci-details title="경과 시간" >}}각 함수/메서드에서 소요된 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 함수/메서드가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="잠금" >}}각 함수/메서드가 잠금을 기다리거나 유지하는 데 소요된 시간과 각 함수가 잠금을 획득한 횟수입니다.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | | | .NET 5+ | | |
| {{< ci-details title="I/O" >}}각 메서드가 파일 및 소켓을 읽거나 쓰는 데 소요된 시간입니다.{{< /ci-details >}}   |                 {{< X >}}                 | | | | | | {{< tooltip glossary="보기" case="title" >}} | |

## 기타 기능 {#other-features}

다음 표는 언어별 추가 프로파일링 기능을 보여줍니다. 모든 기능을 사용하고 최상의 성능을 얻으려면 Datadog은 해당 언어의 최신 SDK 버전을 사용할 것을 권장합니다. 특정 런타임 버전이 표시되지 않은 경우 해당 기능은 [런타임 및 SDK 버전](#runtime-and-sdk-versions)에 나열된 최소 런타임 버전에서 사용할 수 있습니다.

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="트레이스와 프로파일링 통합" >}}성능 문제와 관련된 특정 코드 라인을 찾습니다. <a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">자세히 알아보기</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="엔드포인트 프로파일링" >}}병목 현상을 일으키거나 많은 리소스를 소비하는 엔드포인트를 식별합니다. <a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">자세히 알아보기</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="타임라인 보기" >}}스팬 기간 동안의 시간 기반 패턴과 작업 분포를 보여줍니다. <a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">자세히 알아보기</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="메모리 누수" >}}메모리 누수 조사를 지원하는 가이드 워크플로입니다. <a href="/profiler/guide/solve-memory-leaks/">자세히 알아보기</a>{{< /ci-details >}}   | {{< X >}} | | {{< X >}} | | {{< X >}} | {{< X >}} | | |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/profiler/enabling/?prog_lang=java
[2]: /ko/profiler/enabling/?prog_lang=python
[3]: /ko/profiler/enabling/?prog_lang=go
[4]: /ko/profiler/enabling/?prog_lang=ruby
[5]: /ko/profiler/enabling/?prog_lang=node_js
[6]: /ko/profiler/enabling/?prog_lang=dot_net
[7]: /ko/profiler/enabling/?prog_lang=php
[8]: /ko/profiler/enabling/?prog_lang=rust
[9]: https://github.com/DataDog/dd-trace-java/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-go/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-js/releases
[14]: https://github.com/DataDog/dd-trace-dotnet/releases
[15]: https://github.com/DataDog/dd-trace-php/releases
[16]: https://github.com/DataDog/ddprof/releases
[17]: /ko/profiler/enabling/?prog_lang=java#requirements
[18]: /ko/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[19]: /ko/profiler/connect_traces_and_profiles/#endpoint-profiling
[20]: /ko/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[21]: https://go.dev/doc/devel/release