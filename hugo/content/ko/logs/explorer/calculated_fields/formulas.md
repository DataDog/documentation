---
aliases:
- /ko/logs/explorer/calculated_fields/expression_language
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: 설명서
  text: 계산된 필드
title: 수식
---
## 개요 {#overview}

수식 또는 표현식은 각 로그 이벤트에 대한 계산된 필드의 값을 정의합니다. 로그 속성, 다른 계산된 필드, 지원되는 함수 및 연산자를 참조할 수 있습니다. 수식을 작성하거나 편집할 때 편집기는 관련 필드, 함수 및 연산자를 자동으로 제안합니다.

## 기본 구문 및 언어 구조 {#basic-syntax-and-language-constructs}

| 구조                                                                 | 구문 및 표기법                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| 예약된 속성 또는 태그 `tag`                                     | `tag`(접두사 필요 없음)<br>대시가 포함된 태그의 경우 백슬래시로 이스케이프합니다.<br>예: `ci\-job\-id`                    |
| 속성 `attr`                                                    | `@attr`(`@` 접두사 사용)                                                                                                          |
| 계산된 필드 `field`                                            | `#field`(`#` 접두사 사용)                                                                                                          |
| 문자열 리터럴(따옴표)<br>예: `text` 또는 `Quoted "text"`         | `"text"`<br> `"Quoted \"text\""`<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">로그 검색 구문</a> 적용)|
| 숫자 리터럴(숫자)<br>예: `ten`                           | `10`                                                                                                                                 |
| 함수 `func`, 포함 파라미터: `x` 및 `y`                         | `func(x, y)`                                                                                                                         |
| 연산자<br>예: 피연산자 `x` 및 `y`를 사용하는 이항 연산자 `*` | `x*y`                                                                                                                                |

## 연산자 {#operators}

사용 가능한 연산자는 다음과 같습니다(우선 순위순).

| 연산자 | 설명 |
|----------|-------------|
| `()` | 그룹화 또는 함수 호출 |
| `!`, `NOT`, `-` | 논리 또는 산술 부정 |
| `^`, `%` | 거듭제곱, 모듈로|
| `*`, `/` | 곱셈, 나눗셈|
| `+`, `-` | 덧셈, 뺄셈 |
| `<`, `<=`, `>`, `>=` | 보다 작음, 보다 작거나 같음, 보다 큼, 보다 크거나 같음 |
| `==`, `!=` | 일치함, 일치하지 않음 |
| `&&`, `AND` | 논리 AND |
| `\|\|`, `OR` | 논리 OR |

## 함수 {#functions}

사용 가능한 함수는 다음과 같이 분류됩니다.
- [산술](#arithmetic)
- [문자열](#string)
- [논리](#logical)


### 산술 {#arithmetic}

<h4>abs(<i>num</i> value)</h4>

숫자의 절대값을 반환합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다. <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | `#discrepancy = abs(@client_latency - @server_latency)` | `#discrepancy` = 1 |

{{% /collapse-content %}}


<h4>ceil(<i>num</i> value)</h4>

숫자를 가장 가까운 정수로 반올림합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@value` = 2.2 | `#rounded_up = ceil(@value)` | `#rounded_up` = 3 |

{{% /collapse-content %}}


<h4>floor(<i>num</i> value)</h4>

숫자를 가장 가까운 정수로 반내림합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@value` = 9.99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

{{% /collapse-content %}}


<h4>max(<i>num</i> value, [ <i>num</i> value, …])</h4>

숫자 집합 중에서 최댓값을 찾습니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

{{% /collapse-content %}}


<h4>min(<i>num</i> value, [<i>num</i> value, …])</h4>

숫자 집합 중에서 최솟값을 찾습니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

{{% /collapse-content %}}


<h4>round(<i>num</i> value, <i>int</i> precision)</h4>

숫자를 반올림합니다. 필요시 유지할 소수점 자릿수를 정의합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@value` = -1234.01 | `#rounded_to_tens = round(@value, -1)` | `#rounded_to_tens` = -1230 |

{{% /collapse-content %}}

---

### 문자열 {#string}

<h4>concat(<i>str</i> string [<i>str</i> string, <i>expr</i> value, …])</h4>

여러 값을 하나의 문자열로 결합합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다. <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = concat(@city, ", ", @country)` | `#region` = "Paris, France" |

{{% /collapse-content %}}


<h4>lower(<i>str</i> string)</h4>

문자열을 소문자로 변환합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@first_name` = "Bob" | `#lower_name = lower(@first_name)` | `#lower_name` = "bob" |

{{% /collapse-content %}}


<h4>left(<i>str</i> string, <i>int</i> num_chars)</h4>

문자열의 시작 부분에서 텍스트 일부를 추출합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@price` = "USD10.50" | `#currency = left(@price, 3)` | `#currency` = "USD" |

{{% /collapse-content %}}


<h4>proper(<i>str</i> string)</h4>

문자열을 적절한 대소문자로 변환합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@address` = "123 main st" | `#formatted_address = proper(@address)` | `#formatted_address` = "123 Main St" |

{{% /collapse-content %}}


<h4>split_before(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

문자열에서 특정 패턴 앞에 오는 텍스트 일부를 추출합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

<table>
  <tr>
    <th>예시</th>
    <th>수식</th>
    <th>결과</th>
  </tr>
  <tr>
    <td rowspan ="2">로그 이벤트에 다음과 같은 속성이 있습니다.<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_before(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_before(@url, "/", 2)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path/to"</td>
  </tr>
</table>

{{% /collapse-content %}}


<h4>split_after(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

문자열에서 특정 패턴 뒤에 오는 텍스트 일부를 추출합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

<table>
  <tr>
    <th>예시</th>
    <th>수식</th>
    <th>결과</th>
  </tr>
  <tr>
    <td rowspan ="2">로그 이벤트에 다음과 같은 속성이 있습니다.<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_after(@url, "/", 0)</code></td>
    <td><code>#url_extraction</code> = "path/to/split"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_after(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "to/split"
</table>

{{% /collapse-content %}}


<h4>substring(<i>str</i> string, <i>int</i> start, <i>int</i> length)</h4>

문자열의 중간 부분에서 텍스트 일부를 추출합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@price` = "USD10.50" | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = "10" |

{{% /collapse-content %}}


<h4>right(<i>str</i> string, <i>int</i> num_chars)</h4>

문자열의 끝 부분에서 텍스트 일부를 추출합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다.<br>`@price` = "USD10.50" | `#cent_value = right(@price, 2)` | `#cent_value` = "50" |

{{% /collapse-content %}}


<h4>textjoin(<i>str</i> delimiter, <i>bool</i> ignore_empty, <i>str</i> string [<i>str</i> string, <i>expr</i> value, …])</h4>

구분 기호를 사용하여 여러 값을 하나의 문자열로 결합합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다. <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = textjoin(", ", "false", @city, @country)` | `#region` = "Paris, France" |

{{% /collapse-content %}}


<h4>upper(<i>str</i> string)</h4>

문자열을 대문자로 변환합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다. `@first_name` = "Bob" | `#upper_name = upper(@first_name)` | `#upper_name` = "BOB" |

{{% /collapse-content %}}

---

### 논리 {#logical}

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

조건을 평가하고 그에 따라 값을 반환합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다. <br> - `@location` = "Paris, France" <br> - `@home` = "New York, USA" | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = "true" |

{{% /collapse-content %}}


<h4>is_null(<i>expr</i> value)</h4>

속성이나 표현식이 null인지 여부를 확인합니다.

{{% collapse-content title="예시" level="h5" expanded=false %}}

| 예시  | 수식 | 결과 |
|----------|-------------|---------|
| 로그 이벤트에 다음과 같은 속성이 있습니다. <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | "true" |

{{% /collapse-content %}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}