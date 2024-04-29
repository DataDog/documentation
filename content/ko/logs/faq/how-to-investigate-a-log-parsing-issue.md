---
further_reading:
- link: /logs/faq/log-parsing-best-practice/
  tag: FAQ
  text: 로그 파싱 - 모범 사례
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
kind: faq
title: 로그 파싱 문제 조사하는 방법
---

통합 파이프라인에서는 기술에 따라 기본 로그 형식을 지원합니다. 따라서 로그 형식을 사용자 지정했거나 작동하지 않는 커스텀 파서를 쓴 경우에는 로그가 제대로 파싱되지 않을 수 있습니다.
이 가이드라인에서는 이 문제의 근본 원인을 찾고 파서를 수정하는 방법을 설명합니다.

파서에 트러블슈팅을 하기 전에 먼저 Datadog 로그 [프로세서][1]와 [파싱][2] 설명서, [파싱 모범 사례 게시물][3]을 먼저 읽으세요.

1. **로그 파이프라인 확인**:
   파이프라인 필터가 있기 때문에 로그가 통과한 프로세싱 파이프라인을 찾을 수 있습니다. 통합 파이프라인에서는 소스를 필터로 사용하므로 로그 소스가 제대로 설정되어 있는지 확인하세요.

    {{< img src="logs/faq/integrationpipeline.png" alt="integrationpipeline" >}}

   통합 파이프라인을 복제한 후 복제본에서 트러블슈팅하세요.

2. **차이점이 있는지 확인**:
   대부분의 파서에는 예시나 로그 샘플이 있습니다. 내 로그를 샘플과 비교해보고 누락된 요소, 바뀐 순서, 또는 추가된 요소와 같은 차이점이 있는지 살펴보세요.
   또 타임스탬프 형식에 차이가 있는지도 살펴보세요. 이 때문에 문제가 자주 발생합니다.

   Apache 로그를 예시로 들어보겠습니다. 통합 파서에 다음과 같은 예시가 있다고 합시다.
    ```
    127.0.0.1 - frank [13/Jul/2016:10:55:36 +0000] "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

   로그가 다음과 같다고 가정해보겠습니다.
    ```
    [13/Jul/2016:10:55:36 +0000] 127.0.0.1 - frank "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

   타임스탬프 위치가 다릅니다. 따라서 이 차이점을 반영해 파싱 규칙을 변경해야 합니다.

3. **근본 원인 속성 찾기**:
   형식에 차이점이 없나요? 파싱 규칙에 실제로 트러블슈팅을 해보세요. 짧은 ELB 로그의 실제 사례로 살펴보겠습니다.

   파싱 규칙이 다음과 같다고 합시다.
    ```
    elb.http %{date("yyyy-MM-dd'T'HH:mm:ss.SSSSSSZ"):date_access} %{notSpace:elb.name} "(?>%{word:http.method} |- )%{notSpace:http.url:nullIf("-")}(?> HTTP\/%{regex("\\d+\\.\\d+"):http.version}| - )" "%{notSpace:http.useragent:nullIf("-")}" %{notSpace:elb.ssl.cipher} %{notSpace:elb.ssl.protocol}
    ```

   다음 로그를 포함하고 있습니다.
    ```
    2015-05-13T23:39:43.945958Z my-loadbalancer "GET http://www.example.com:80/ HTTP/1.1" "Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0" - -
    ```

   이 샘플에서 큰 차이점이 없고 파서가 샘플에 잘 작동하는 것을 알 수 있습니다.
    {{< img src="logs/faq/sampleparsing.png" alt="sampleparsing" >}}

   그러나 로그에 테스트했을 때는 작동하지 않습니다. 이때 다음으로 할 작업은 끝에서부터 속성을 하나씩 제거해 보고 근본 원인을 찾는 것입니다. 이 작업을 할 때 규칙 끝에 `.*`를 추가한 후 속성을 제거하세요. 

   다음 그림에서는 user Agent까지 속성을 하나씩 제거했더니 테스트가 작동하는 것을 볼 수 있습니다.
    {{< img src="logs/faq/Troubleshootparsing.png" alt="Troubleshootparsing" >}}

   이를 통해 user Agent 속성이 문제를 일으키는 원인이었음을 알 수 있습니다.

4. **문제 해결**:
   문제의 원인이 되는 속성을 파악한 후에는 더 자세히 조사해봐야 합니다.

   로그의 user Agent는 다음과 같다고 합시다.

    * Mozilla/5.0(Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0.

    그리고 사용 중인 파싱 규칙은 다음과 같다고 합시다.

    * `%{notSpace:http.useragent:nullIf("-")}`

    제일 먼저 확인해야 할 사항은 매처를 찾는 것입니다(매처로 규칙에 integer, notSpace, regex 등과 같은 요소 중 어떤 것이 올지 예측할 수 있음). 이 예시에서는 `notSpace`가 올 것임을 알 수 있습니다. 그러나 useragent에는 띄어쓰기는 물론 특정 문자도 포함되어 있습니다. 따라서 `notSpace`가 와서는 안 됩니다.

    사용할 매처는 regex("[^\\\"]*")입니다.

    또 다른 경우, 규칙에 예상되는 요소가 "integer"인데 실제 값이 소수점인 경우에는 매처를 "number"로 바꿔야 합니다.

5. **도움 요청**:
   파싱 오류의 원인을 파악하는 데 어려움이 있나요? Datadog에서 도와드립니다. [지원팀에 문의하세요][4].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/processors
[2]: /ko/logs/log_configuration/parsing
[3]: /ko/logs/faq/log-parsing-best-practice/
[4]: /ko/help/