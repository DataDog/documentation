import glob
import re

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


def inline_code(doc_page,pattern_array):
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

def content_parkour(path,pattern_array):
    for doc_page in glob.iglob(path + "**/*.md", recursive=True):
        inline_code(doc_page, pattern_array)

if __name__ == "__main__":
    content_parkour(PATH,PATTERN_ARRAY)