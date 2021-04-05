#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pytest
from format_link import format_link_file
import os

regex_skip_sections_end = r"(```|\{\{< \/code-block >\}\})"
regex_skip_sections_start = r"(```|\{\{< code-block)"

data_to_test = """
---
title: This is a title
kind: documentation
---

This is an [inlined link](/inlined_link). This is a [broken link]

This is a reference [link][1]

{{< tabs >}}
{{% tab "<TAB_NAME_1>" %}}

This is an [inlined link](/inlined_link). This is a [broken link]

This is a reference [link][1]

[1]: /reference_link_1
[3]: /reference_without_text

{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us" >}}
This is a [link][1] inside of a site-region shortcode.
[1]: /site-region-link
{{< /site-region >}}

[1]: /reference_link_1
[3]: /reference_without_text
"""

expected_data = """
---
title: This is a title
kind: documentation
---

This is an [inlined link][1]. This is a [broken link]

This is a reference [link][2]

{{< tabs >}}
{{% tab "<TAB_NAME_1>" %}}

This is an [inlined link][1]. This is a [broken link]

This is a reference [link][2]


[1]: /inlined_link
[2]: /reference_link_1
{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us" >}}
This is a [link][1] inside of a site-region shortcode.
[1]: /site-region-link
{{< /site-region >}}

[1]: /inlined_link
[2]: /reference_link_1
"""


def test_format_link(tmp_path):
    tmp_directory = tmp_path / "tests"
    tmp_directory.mkdir()

    bad_file = tmp_directory / "bad_file.md"

    bad_file.write_text(data_to_test)

    assert expected_data == format_link_file(
        bad_file, regex_skip_sections_start, regex_skip_sections_end)
