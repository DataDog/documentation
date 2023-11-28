---
title: Query data to a text file, step by step
kind: guide
aliases:
  - /developers/faq/query-data-to-a-text-file-step-by-step
---

This article explains how to set up an environment to make the most of the Datadog API and includes how to pull or push events, metrics, and monitors from [Datadog's public API][1] to a local file.

Prerequisite: Python and `pip` installed on your localhost. Windows users see [Installing Python 2 on Windows][2].

1. Open a terminal.
2. Verify the directory: `pwd` on macOS, `dir` on Windows.
3. Create a new folder: `mkdir <NAME_OF_THE_FOLDER>`.
4. Enter the folder: `cd <NAME_OF_THE_FOLDER>`.
5. Download the script [api_query_data.py][3] to the folder created in step 3 and edit it:

    a. Replace `<YOUR_DD_API_KEY>` and `<YOUR_DD_APP_KEY>` with your [Datadog API and app keys][4].

    b. Replace `system.cpu.idle` with a metric you want to fetch. A list of your metrics is displayed in the [Datadog Metric Summary][5].

    c. Optionally, replace `*` with a host to filter the data. A list of your hosts is displayed in the [Datadog Infrastructure List][6].

    d. Optionally, change the time period to collect the data. The current setting is 3600 seconds (one hour). **Note**: If you run this too aggressively, you may reach the [Datadog API limits][7].

    e. Save your file and confirm its location.

Once the above is complete:

1. It is best practice to create a virtual environment to install Python packages into. One virtual environment manager is [virtualenv][8].
2. Create a new virtual environment in the directory you created earlier by running `virtualenv venv`.
3. Activate the environment by running `source venv/bin/activate` (Mac/Linux) or `> \path\to\env\Scripts\activate` (Windows).
4. Run `pip install datadog` to install the [Datadog API package][9]. This enables the Python file to interact with the Datadog API.
5. In the terminal, run the script: `python api_query_data.py`.

If successful, your data displays in the terminal and a file is created in your folder named `out.txt`.

See additional examples in the [Datadog API documentation][1].

[1]: /api/
[2]: http://docs.python-guide.org/en/latest/starting/install/win
[3]: /resources/python/api_query_data.py
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/metric/summary
[6]: https://app.datadoghq.com/infrastructure
[7]: /api/latest/rate-limits/
[8]: https://virtualenv.pypa.io/en/stable
[9]: https://pypi.org/project/datadog
