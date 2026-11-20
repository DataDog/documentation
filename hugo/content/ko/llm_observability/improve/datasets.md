---
aliases:
- /ko/llm_observability/experiments/datasets/
description: 데이터세트 생성, 검색, 관리 방법 및 버전 관리에 대한 정보 등 Agent Observability 실험에서의 데이터세트
  사용을 다룹니다.
further_reading:
- link: /llm_observability/configure/automation_rules
  tag: 설명서
  text: 자동화 규칙을 사용하여 데이터세트로 트레이스 자동 라우팅하기
title: 데이터세트
---
Agent Observability 실험에서 _데이터세트_는 에이전트를 테스트하려는 시나리오를 나타내는 _입력_, _예상 출력_ 및 _메타데이터_의 모음입니다. 각 데이터세트는 _프로젝트_와 연결됩니다.  

데이터세트의 각 레코드에는 다음이 포함됩니다.
- **input**(필수): 에이전트가 작업에서 액세스할 수 있는 모든 정보를 나타냅니다.
- **expected output**(선택 사항): _정답(ground truth)_이라고도 하며, 에이전트가 출력해야 하는 이상적인 답변을 나타냅니다. _expected output_을 사용하여 앱의 실제 출력과 평가하려는 중간 결과를 저장할 수 있습니다. 
- **metadata**(선택 사항): 레코드를 분류하고 추가 분석에 사용할 수 있는 유용한 정보가 포함됩니다. 예: 주제, 태그, 설명, 메모.
- **id**(선택 사항): 레코드에 대해 사용자가 정의한 식별자입니다. 128자 이하여야 하며 문자, 숫자, `_`, `-` 또는 `.`만 포함할 수 있습니다. 제공되지 않으면 SDK가 자동으로 생성합니다.

데이터세트는 실험 전반에 걸쳐 일관된 평가 시나리오를 제공함으로써 체계적인 테스트와 회귀 탐지를 가능하게 합니다.

### 데이터세트 생성하기 {#creating-a-dataset}

프로덕션 데이터나 CSV 파일로 데이터세트를 생성하거나 프로그래밍 방식으로 직접 구성할 수 있습니다.

{{< tabs >}}

{{% tab "CSV 파일로 생성" %}}

CSV 파일로 데이터세트를 생성하려면 `LLMObs.create_dataset_from_csv()`를 사용하세요.

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    id_column="record_id",                        # Optional: Column to use as record IDs
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# record_id,question,category,answer,difficulty
# japan-capital,What is the capital of Japan?,geography,Tokyo,medium
# brazil-capital,What is the capital of Brazil?,geography,Brasília,medium

```

**참고**:
- CSV 파일에는 헤더 행이 있어야 합니다
- 최대 필드 크기는 10MB입니다
- `input_data_columns`, `expected_output_columns` 또는 `id_column`에 지정되지 않은 모든 열은 자동으로 메타데이터로 처리됩니다.
- 데이터세트는 생성 후 자동으로 Datadog으로 푸시됩니다.

{{% /tab %}}

{{% tab "수동 생성" %}}

데이터세트를 수동으로 생성하려면 `LLMObs.create_dataset()`를 사용하세요.

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "id": "china-capital",                                             # optional, user-defined record ID
            "input_data": {"question": "What is the capital of China?"},       # required, JSON or string
            "expected_output": "Beijing",                                      # optional, JSON or string
            "metadata": {"difficulty": "easy"}                                 # optional, JSON
        },
        {
            "input_data": {"question": "Which city serves as the capital of South Africa?"},
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"}
        }
    ]
)
# View dataset in Datadog UI
print(f"View dataset: {dataset.url}")
```
{{% /tab %}}

{{% tab "프로덕션 트레이스로 생성" %}}
데이터세트에 프로덕션 트레이스를 UI를 통해 수동으로 추가하거나, 자동화를 사용하여 자동으로 추가할 수 있습니다.

**수동 선택(UI)**:
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][2]로 이동합니다. [Settings > Automations][3]에서 새로운 자동화를 추가할 수도 있습니다.
2. 데이터세트에 포함할 트레이스를 찾습니다.
3. {{< ui >}}Add to Dataset{{< /ui >}}를 클릭합니다.
4. 기존 데이터세트를 선택하거나 데이터세트를 생성합니다.
5. 트레이스의 입력, 출력 및 메타데이터가 자동으로 추출됩니다.

**자동 라우팅(자동화)**:

<div class="alert alert-info">자동화는 향후 적용됩니다. 규칙과 일치하는 새 트레이스는 도착하는 즉시 데이터세트로 라우팅됩니다. 필터와 일치하는 기존 트레이스는 소급하여 추가되지 않습니다.</div>

자동화를 사용하면 구성 가능한 규칙에 따라 프로덕션 트레이스를 데이터세트로 지속적으로 라우팅하여 수동 개입 없이도 프로덕션 동작에 맞춰 데이터세트를 최신 상태로 유지할 수 있습니다.

자동 데이터세트 업데이트를 설정하려면 다음 단계를 따르세요.
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][2]로 이동합니다.
2. 필터를 적용하여 라우팅할 트레이스(평가 실패, 지연 시간 임계값, 특정 애플리케이션)를 식별합니다. 허용되는 항목은 [Automation Rules > Supported filter fields][5]를 참조하세요.
3. {{< ui >}}Automate Query{{< /ui >}}를 클릭합니다.
4. 샘플링 비율을 구성합니다(예: 일치하는 트레이스의 10%).
5. {{< ui >}}Add to Dataset{{< /ui >}}를 액션으로 선택합니다.
6. 기존 데이터세트를 선택하거나 데이터세트를 생성합니다.

자동화를 생성한 후 [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][3]에서 관리합니다.
- {{< ui >}}Enable/disable{{< /ui >}}: 새로운 트레이스가 데이터세트에 추가되는지 여부를 제어합니다.
- {{< ui >}}Edit{{< /ui >}}: 필요에 따라 필터, 샘플링 비율 또는 대상 데이터세트를 수정합니다.
- {{< ui >}}Delete{{< /ui >}}: 더 이상 필요하지 않은 자동화를 제거합니다.

**데이터세트 제한:**
- 자동화로 채워진 데이터세트는 최대 20,000개 레코드로 제한됩니다.
- 이러한 데이터세트는 자동화된 데이터의 우발적인 수정을 방지하기 위해 읽기 전용으로 설정됩니다.
- 레코드를 수정하려면 먼저 데이터세트를 복제하세요.

**자동화 사용 사례 예시:**
- 실패한 평가가 포함된 트레이스의 10%를 샘플링하여 실패 데이터세트를 구축합니다.
- 지연 시간이 임계값을 초과하는 특수 케이스를 수집합니다.
- 사용자 세그먼트 전반에 걸쳐 계층적 샘플링을 사용하여 다양한 데이터세트를 유지합니다.
- 프로덕션 환경에서 새로운 실패 패턴이 나타나면 자동으로 캡처합니다.

[2]: https://app.datadoghq.com/llm/traces
[3]: https://app.datadoghq.com/llm/settings/automations
[5]: /ko/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}

### 데이터세트 검색 중 {#retrieving-a-dataset}

Datadog에서 프로젝트의 기존 데이터세트를 검색하려면 다음 단계를 따르세요.

```python
dataset = LLMObs.pull_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to the project name from LLMObs.enable
    version=1 # optional, defaults to the latest version
)

# Get dataset length
print(len(dataset))
```

#### 데이터세트를 pandas로 내보내기 {#exporting-a-dataset-to-pandas}

Dataset 클래스는 [pandas DataFrame][1]으로 데이터세트를 변환할 수 있는 `as_dataframe()` 메서드도 제공합니다.

<div class="alert alert-info">이 작업을 수행하려면 <a href="https://pandas.pydata.org/docs/index.html">Pandas</a>가 필요합니다. pandas를 설치하려면 <code>pip install pandas</code>를 실행하세요.</div>

```python
# Convert dataset to pandas DataFrame
df = dataset.as_dataframe()
print(df.head())

# DataFrame output with MultiIndex columns:
#                                   input_data     expected_output  metadata
#    question                       category       answer           difficulty
# 0  What is the capital of Japan?  geography      Tokyo            medium
# 1  What is the capital of Brazil? geography      Brasília         medium
```

DataFrame은 다음 열을 포함하는 MultiIndex 구조를 가집니다.
- `input_data`: `input_data_columns`의 모든 입력 필드 포함
- `expected_output`: `expected_output_columns`의 모든 출력 필드 포함
- `metadata`: `metadata_columns`의 모든 추가 필드 포함


### 데이터세트 버전 관리 {#dataset-versioning}

데이터세트는 시간이 지남에 따라 변경 사항을 추적하기 위해 자동으로 버전이 관리됩니다. 버전 관리 정보는 재현성을 가능하게 하며 실험에서 특정 데이터세트 버전을 참조할 수 있도록 합니다. 

`Dataset` 객체에는 최신 버전에 해당하는 `current_version` 필드가 있으며, 이전 버전에는 90일 보존 기간이 적용됩니다. 

데이터세트 버전은 `0`에서 시작하며, 새로운 버전이 생성될 때마다 버전이 1씩 증가합니다.

#### 새로운 데이터세트 버전이 생성되는 경우 {#when-new-dataset-versions-are-created}

다음과 같은 경우 새로운 데이터세트 버전이 생성됩니다.
- 레코드 추가
- 레코드 업데이트(`input`, `expected_output` 또는 `metadata` 필드 변경)
- 레코드 삭제

데이터세트 이름이나 설명을 업데이트할 때는 데이터세트 버전이 생성되지 **않습니다**.

#### 버전 보존 {#version-retention}

- 데이터세트의 활성 버전은 3년간 보관됩니다.
- 이전 버전(`current_version`의 콘텐츠가 **아님**)은 90일간 보존됩니다. 
- 90일 보존 기간은 이전 버전이 사용될 때(예: 실험에서 버전을 읽을 때) 재설정됩니다.
- 90일 동안 연속으로 사용하지 않으면 이전 버전은 영구 삭제 대상이 되며 더 이상 액세스할 수 없을 수 있습니다.

**버전 보존 동작 예시**

`12`를 게시하면 `11`은 90일 보관 기간이 적용되는 이전 버전이 됩니다. 25일 후 버전 `11`을 사용하여 실험을 실행하면 90일 기간이 **재시작**됩니다. 버전 `11`을 사용하지 않은 상태로 90일이 더 지나면 버전 `11`이 삭제될 수 있습니다.

### 데이터세트 레코드 액세스 및 관리하기 {#accessing-and-managing-dataset-records}

표준 Python 인덱싱을 사용하여 데이터세트 레코드에 액세스할 수 있습니다.

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])
```
  
Dataset 클래스는 레코드를 관리하는 메서드인 `append()`, `update()`, `delete()`를 제공합니다. 변경 사항을 Datadog에 저장하려면 변경 사항에 대해 `push()`를 실행해야 합니다.

```python
# Add a new record
dataset.append({
    "id": "switzerland-capital",
    "input_data": {"question": "What is the capital of Switzerland?"},
    "expected_output": "Bern",
    "metadata": {"difficulty": "easy"}
})

# Update an existing record
dataset.update(0, {
    "input_data": {"question": "What is the capital of China?"},
    "expected_output": "Beijing",
    "metadata": {"difficulty": "medium"}
})

# Delete a record
dataset.delete(1)  # Deletes the second record

# Save changes to Datadog
dataset.push()
```

### 데이터세트 표 사용자 지정하기 {#customizing-the-dataset-table}

데이터세트의 레코드를 조회할 때 표를 사용자 지정하여 각 레코드를 개별적으로 확장하지 않고도 빠르게 스캔하고 비교할 수 있습니다.

#### 열 선택기 {#column-picker}

열 선택기를 사용하여 열을 켜거나 끄고, 드래그하여 순서를 변경하세요.

#### 사용자 지정 열 {#custom-columns}

데이터세트 레코드에서 특정 필드를 추출하여 전용 표 열로 표시하세요. 사용자 지정 열을 추가하려면 표 상단의 {{< ui >}}Add Column{{< /ui >}} 입력란에 필드 경로를 입력하세요. 여러 개의 사용자 지정 열을 추가하고 열을 끌어다 놓아 순서를 변경할 수 있습니다. 열 구성은 프로젝트별로 브라우저의 로컬 스토리지에 저장됩니다.

[1]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html