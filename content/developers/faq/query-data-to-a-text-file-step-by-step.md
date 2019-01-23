---
title: Query data to a text file, step by step
kind: faq
---

This article explains how to set up an environment to make the most of the Datadog API. At the end you should be able to understand how to pull or push events, metrics and monitors from [our public API][1] to a local file.

Prerequisite: Python and PIP installed on your localhost. If you are on Windows, see the [Python documentation][2].

1. Open a Terminal on your Mac (CMD prompt on Windows).
2. Verify the directory: `pwd` (`dir` on Windows).
3. Create a new folder: `mkdir <NAME_OF_THE_FOLDER>`.
4. Enter the folder: `cd <NAME_OF_THE_FOLDER>`.
5. Download the script [api_query_data.py][3] to the folder created in step 3 and edit it:
    
    a. Replace `<YOUR_DD_API_KEY>` and `<YOUR_DD_APP_KEY>` with your [Datadog API and APP keys][4].

    b. Replace `system.cpu.idle` with a metric you want to fetch. A list of your metrics are displayed in the [Metric Summary][5].

    c. Optionally, replace `*` with a host to filter the data. A list of your hosts are displayed in the [Infrastructure List][6].

    d. Optionally, change the time period to collect the data. The current setting is 3600 seconds (one hour). **Note**: If you run this too aggressively, you may hit the API limit.

    e. Save your file and confirm its location.

Once the above is complete:

1. It is best practice to create a virtual environment to install Python packages into. One virtual environment manager is [virtualenv][7].
2. Create a new virtual environment in the directory you created earlier by running `virtualenv venv`.
3. Activate the environment by running `source venv/bin/activate` (Mac/Linux) or `> \path\to\env\Scripts\activate` (Windows).
4. Run `pip install datadog` to install the [Datadog API package][8]. This enables the Python file to interact with our API.
5. In the terminal, run the script: `python api_query_data.py`.

If successful, you should see data in the terminal and a file created in your folder named `out.txt`.

To see additional examples, refer to our [API documentation][1].

[1]: /api
[2]: http://docs.python-guide.org/en/latest/starting/install/win
[3]: /python/api_query_data.py
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.com/metric/summary
[6]: https://app.datadoghq.com/infrastructure
[7]: https://virtualenv.pypa.io/en/stable
[8]: https://pypi.org/project/datadog
