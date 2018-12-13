---
title: Query data to a text file, step by step
kind: faq
---

This article explains how to set up the environment to make the most of the API. At the end you should be able to understand how to pull or push events, metrics and monitors from [our public API's][1] to a local file.

In addition to the explanations here, the file attached is commented so you have redundant pieces of information that may help to understand better.

Prerequisite: Python and PIP installed on your localhost, if you're on Windows [get it on the python dedicated documentation page][2]:

1. Open a Terminal on your Mac or the CMD prompt on Windows.
2. Verify where you are by typing pwd (or dir on windows) and press Enter
3. Create a new folder by typing mkdir NAME_OF_THE_FOLDER, name it as you wish.
4. Go into the folder by typing cd NAME_OF_THE_FOLDER. (if you type ls (or dir on windows) the folder should be empty).
5. Download the attached script (dataFetching.py) in your folder. Open in an editor and make the following changes:
    
    a. Replace the sample API and APP key fields with your own, you'll find these here. You may need to create an APP Key, if so it's on the same page, the name of the app key doesn't matter, it's just a reminder for you.

    b. Enter the name of the metric you want to fetch, you can find the names here. In the example script we've used system.cpu.system, replace this with your own metric name.

    c. Enter the host from which you want to fetch data, in the example script you need to update the {host} field to the name of your target host, all the host names are here.

    d. You can change the time period over which you want to collect the data, it is set at 3600 which is one hour right now. Note that if you run this too aggressively you may hit the API limit

    e. Save your file and confirm its location

Once the above is complete:

1. From the terminal run `pip install datadog` this will enable the python file to easily interact with our API

2. In the terminal you may now run the script by typing python dataFetching.py

At this point, if everything went fine, you should see data in your terminal, additionally, a file has been created in the folder, named out.txt. You can then select your data and start exploiting them.

Now, if you want to interact in different ways with your API, you only need to proceed in an analog way with the examples in [our documentation][1].

[1]: /api
[2]: http://docs.python-guide.org/en/latest/starting/install/win
