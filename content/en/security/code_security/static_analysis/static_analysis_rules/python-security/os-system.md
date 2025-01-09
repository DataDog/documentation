---
aliases:
- /continuous_integration/static_analysis/rules/python-security/os-system
- /static_analysis/rules/python-security/os-system
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/os-system
  language: Python
  severity: Error
  severity_rank: 1
title: Command execution without sanitization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/os-system`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
Detect unsafe shell execution with the `os` module. We should ensure the command is safe before execution. Use `shlex` to sanitize user inputs.

#### Learn More

 - [Python `os.system()` documentation](https://docs.python.org/3/library/os.html#os.system)
 - [`Python shlex() module`](https://docs.python.org/3/library/shlex.html)
 - [CWE 78 - Improper Neutralization of Special Elements used in an OS Command](https://cwe.mitre.org/data/definitions/78.html)

## Non-Compliant Code Examples
```python
os.system(f'mv {saved_file_path} {public_upload_file_path}')
```

```python
command = f'convert "{temp_upload_file_path}" -resize 50% "{resized_image_path}"'
os.system(command)


command2 = f'convert "{temp_upload_file_path}" -resize 50% "{resized_image_path}"'
os.system(command4)
```

```python
import os

directory = "/tmp"

# Use of unsanitized data to execute a process
os.system("/bin/ls")
os.system("/bin/ls " + directory)


os.system(f'mv {saved_file_path} {public_upload_file_path}')


def file_upload_api(request, app):
    file = request.files['file']

    if not _validate_file(file.filename):
        return {
            'message': 'Invalid file extension',
            'allowed_ext': ALLOWED_EXTENSIONS,
            'filename': file.filename
        }, 422

    saved_file_result = _save_temp_file(file, app)
    saved_file_path = saved_file_result['saved_path']

    file_name = Path(saved_file_path).name

    public_upload_file_path = os.path.join(app.config['PUBLIC_UPLOAD_FOLDER'], file_name)

    os.system(f'mv {saved_file_path} {public_upload_file_path}')

    return render_template('file_upload.html', file_url=f'{get_uploads_folder_url()}/{file_name}')
```

## Compliant Code Examples
```python
import os
import shlex

# Use of shlex() to sanitize data
os.system(shlex.escape("/bin/ls"))


```
