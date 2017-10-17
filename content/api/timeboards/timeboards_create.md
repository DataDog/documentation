---
title: Create a Timeboard
type: apicontent
order: 10.1
---
#### Create a Timeboard

##### Arguments
<ul class="arguments">
    {{< argument name="title" description="The name of the dashboard." >}}
    {{< argument name="description" description="A description of the dashboard's content." >}}
    {{< argument name="graphs" description="A list of graph definitions. Graph definitions follow this form:" >}}
    <ul class="arguments">
        <li>
            <strong>title [required]</strong>
            <div>The name of the graph.</div>
        </li>
        <li>
            <strong>definition [required]</strong>
            <div>
                The graph definition. Example:
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
            <div>The tag prefix associated with the variable.  Only tags with this prefix will appear in the variable dropdown.</div>
        </li>
        <li>
            <strong>default [optional, default=None]</strong>
            <div>The default value for the template variable on dashboard load</div>
        </li>
    </ul>
</ul>