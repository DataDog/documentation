import re

regex_tabs_open = re.compile(r"<!-- xxx tabs xxx -->", re.MULTILINE)
regex_tabs_close = re.compile(r"<!-- xxz tabs xxx -->", re.MULTILINE)
regex_tab_open = re.compile(r"<!-- xxx tab", re.MULTILINE)
regex_tab_close = re.compile(r"<!-- xxz tab xxx -->", re.MULTILINE)
regex_tab_end = re.compile(r" xxx -->", re.MULTILINE)
regex_partial_open = re.compile(r"<!-- partial", re.MULTILINE)
regex_partial_close = re.compile(r"partial -->", re.MULTILINE)


def replace_comments(text):
    output = text
    output = re.sub(regex_tabs_open, "{{< tabs >}}", output, 0)
    output = re.sub(regex_tabs_close, "{{< /tabs >}}", output, 0)
    output = re.sub(regex_tab_open, "{{% tab", output, 0)
    output = re.sub(regex_tab_close, "{{% /tab %}}", output, 0)
    output = re.sub(regex_tab_end, " %}}", output, 0)
    output = re.sub(regex_partial_open, "", output, 0)
    output = re.sub(regex_partial_close, "", output, 0)
    return output
