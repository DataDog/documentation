from mako.template import Template

mytemplate = Template(filename='local/bin/py/build/actions/pretty_config.html.mako')

with open('pretty_config.html', 'w') as f:
    f.write(mytemplate.render())