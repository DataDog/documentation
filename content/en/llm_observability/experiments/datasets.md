---
title: Datasets
description: Using datasets in LLM Observability Experiments, including how to create, retrieve, and manage datasets, as well as information about versioning.
---

In LLM Observability Experiments, a _dataset_ is a collection of _inputs_, and _expected outputs_ and _metadata_ that represent scenarios you want to tests your agent on. Each dataset is associated with a _project_.  

- **input** (required): Represents all the information that the agent can access in a task.
- **expected output** (optional): Also called _ground truth_, represents the ideal answer that the agent should output. You can use _expected output_ to store the actual output of the app, as well as any intermediary results you want to assesss. 
- **metadata** (optional): Contains any useful information to categorize the record and use for further analysis. For example: topics, tags, descriptions, notes.

### Creating a dataset

You can construct datasets from production data in the Datadog UI by selecting **Add to Dataset** in any span page, or programmatically by using the SDK:

{{< tabs >}}

{{% tab "CSV" %}}

To create a dataset from a CSV file, use `LLMObs.create_dataset_from_csv()`:

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
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium

```

**Notes**:
- CSV files must have a header row
- Maximum field size is 10MB
- All columns not specified in `input_data_columns` or `expected_output_columns` are automatically treated as metadata
- The dataset is automatically pushed to Datadog after creation

{{% /tab %}}

{{% tab "Manual" %}}

To manually create a dataset, use `LLMObs.create_dataset()`:

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
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
{{< /tabs >}}

### Retrieving a dataset

To retrieve a project's existing dataset from Datadog:

```python
dataset = LLMObs.pull_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to the project name from LLMObs.enable
    version=1 # optional, defaults to the latest version
)

# Get dataset length
print(len(dataset))
```

#### Exporting a dataset to pandas

The Dataset class also provides the method `as_dataframe()`, which allows you to transform a dataset as a [pandas DataFrame][1].

<div class="alert alert-info"><a href="https://pandas.pydata.org/docs/index.html">Pandas</a> is required for this operation. To install pandas, <code>pip install pandas</code>.</div>

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

The DataFrame has a MultiIndex structure with the following columns:
- `input_data`: Contains all input fields from `input_data_columns`
- `expected_output`: Contains all output fields from `expected_output_columns`
- `metadata`: Contains any additional fields from `metadata_columns`


### Dataset versioning

Datasets are automatically versioned to track changes over time. Versioning information enables reproducibility and allows experiments to reference specific dataset versions. 

The `Dataset` object has a field, `current_version`, which corresponds to the latest version; previous versions are subject to a 90-day retention window. 

Dataset versions start at `0`, and each new version increments the version by 1.

#### When new dataset versions are created

A new dataset version is created when:
- Adding records
- Updating records (changes to `input` or `expected_output` fields)
- Deleting records

Dataset versions are **NOT** created for changes to `metadata` fields, or when updating the dataset name or description.

#### Version retention

- The active version of a Dataset is retained for 3 years.
- Previous versions (**NOT** the content of `current_version`) are retained for 90 days. 
- The 90-day retention period resets when a previous version is used — for example, when an experiment reads a version.
- After 90 consecutive days without use, a previous version is eligible for permanent deletion and may no longer be accessible.

**Example of version retention behavior**

After you publish `12`, `11` becomes a previous version with a 90-day window. After 25 days, you run an experiment with version `11`, which causes the 90-day window to **restart**. After another 90 days, during which you have not used version `11`, version `11` may be deleted.

### Accessing and managing dataset records

You can access dataset records using standard Python indexing:

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])
```
  
The Dataset class provides methods to manage records: `append()`, `update()`, `delete()`. You need to `push()` changes to save the changes in Datadog.

```python
# Add a new record
dataset.append({
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

[1]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html