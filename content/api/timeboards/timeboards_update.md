---
title: Update a Timeboard
type: apicontent
order: 10.2
---

#### Update a Timeboard

##### Arguments

<ul class="arguments">
    <li>
        <strong>title [required]</strong>
        <div>The name of the dashboard.</div>
    </li>
    <li>
        <strong>description [required]</strong>
        <div>A description of the dashboard's contents.</div>
    </li>
    <li>
        <strong>graphs [required]</strong>
        <div>A list of graph definitions. Graph definitions follow this form:</div>
    </li>
    <ul class="arguments">
        <li>
            <strong>title [required]</strong>
            <div>The name of the graph.</div>
        </li>
        <li>
            <strong>definition [required]</strong>
            <div>
                The graph definition. Read the <a href="/graphing/">Graph Guide</a> for more on graphs. Example:
                <div>
                    <code>{"requests": [{"q": "system.cpu.idle{*} by {host}"}</code>
                </div>
            </div>
        </li>
    </ul>
    {{< argument name="template_variables" description="A list of template variables for using Dashboard templating. Template variable definitions follow this form:" default="None" >}}
    <ul class="arguments">
    <li>
        <strong>name [required]</strong>
        <div>The name of the variable.</div>
    </li>
    <li>
        <strong>prefix [optional, default=None]</strong>
        <div>
            The tag prefix associated with the variable.  Only tags with this prefix will appear in the variable dropdown.
        </div>
    </li>
    <li>
        <strong>default [optional, default=None]</strong>
        <div>The default value for the template variable on dashboard load</div>
    </li>
</ul>