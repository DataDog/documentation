#!/usr/bin/env python3
import re
import glob

"""
Variables
"""
PATH = "content/"
PATTERN_ARRAY=[ [r"(```python)(\n.*?\n)(```)",r"{{< highlight python >}}\g<2>{{< /highlight>}}"], \
                [r"(```json)(\n.*?\n)(```)","{{< highlight json >}}\g<2>{{< /highlight>}}"], \
                [r"(```ruby)(\n.*?\n)(```)","{{< highlight ruby >}}\g<2>{{< /highlight>}}"], \
                [r"(```shell)(\n.*?\n)(```)","{{< highlight shell >}}\g<2>{{< /highlight>}}"], \
                [r"(```xml)(\n.*?\n)(```)","{{< highlight xml >}}\g<2>{{< /highlight>}}"], \
                [r"(```go)(\n.*?\n)(```)","{{< highlight go >}}\g<2>{{< /highlight>}}"], \
                [r"(```java)(\n.*?\n)(```)","{{< highlight java >}}\g<2>{{< /highlight>}}"], \
                [r"(```js)(\n.*?\n)(```)","{{< highlight js >}}\g<2>{{< /highlight>}}"], \
                [r"(```c#)(\n.*?\n)(```)","{{< highlight c# >}}\g<2>{{< /highlight>}}"], \
                [r"(```yaml)(\n.*?\n)(```)","{{< highlight yaml >}}\g<2>{{< /highlight>}}"], \
                [r"(```bash)(\n.*?\n)(```)","{{< highlight bash >}}\g<2>{{< /highlight>}}"]]

"""
Functions
"""
def inline_code(doc_page,pattern_array):
    """
    Using the pattern_array to extract all markdown codeblocks and transform them into Hugo code blocks

    :param doc_page: path of a documentation content file
    :param pattern_array: array of markdown/hugo code block patterns
    """
    try:
        # Read in the file
        with open(doc_page, "r") as file :
            filedata = file.read()

        #Replace code patterns
        for pattern in pattern_array:
            while re.search(pattern[0],filedata):
                filedata = re.sub(pattern[0], pattern[1], filedata)

        # Write the file out again
        with open(doc_page, "w") as file:
            file.write(filedata)

    except Exception as error: 
        print(error)
        pass

def content_parkour():
    print("Starting to inline highlights for code blocks in {}".format(PATH))
    for doc_page in glob.iglob(PATH + '**/*.md', recursive=True):
        inline_code(doc_page, PATTERN_ARRAY)

if __name__ == "__main__":
    content_parkour()