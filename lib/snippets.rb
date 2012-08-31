#
# Code to manage our code snippets. Each code snippet will return the value
# of it's last line (pretty printed if possible)
#

CODE_SNIPPET_DIR = "code_snippets"

EXT_TO_LANG = {
  ".php" => "php",
  ".py"  => "python",
  ".rb"  => "ruby",
  ".json" => "json",
  ".sh" => "console",
}

# PUBLIC ======================


# Return a code block containing the given file's code and highlighted for it's
# language.
def snippet_code_block(filename)
  code = IO.read(File.join(CODE_SNIPPET_DIR, filename))
  code_block(code, language(filename))
end

# Return a code block containing the result of the given snippet.
def snippet_result_code_block(filename)
  result = eval_snippet(filename)
  code_block(result, language(filename))
end


# PRIVATE ======================

# Return a code block highlighted for the it's language.
def code_block(code, language)
  return "<pre class=\"code-block code-block-#{language}\" lang=\"#{language}\">" +
         "<code class=\"language-#{language}\">#{code}</code></pre>"
end

# Return the language of the given code snippet.
def language(filename)
  extension = File.extname(filename)
  EXT_TO_LANG[extension]
end

# Return the result of the given snippet.
def eval_snippet(filename)
  path = "#{CODE_SNIPPET_DIR}/#{filename}"
  if path.end_with? '.rb'
    result = eval_ruby_snippet path
  elsif path.end_with? '.py'
    result = eval_python_snippet path
  elsif path.end_with? '.sh'
    result = eval_shell_snippet path
  else
    raise "dont know how to execute #{filename}"
  end
  if $?.exitstatus != 0
    raise "error executing #{filename}"
  end
  result
end

def eval_shell_snippet(filename)
  %x{sh #{filename} | python -m json.tool}
end

def eval_ruby_snippet(filename)
  contents = IO.read(filename)
  code = <<-EOF
    def wrapper
      #{contents}
    end
    require 'pp'
    pp wrapper()
  EOF

  file = Tempfile.new('foo')
  file.write code
  file.close
  return %x{ruby #{file.path}}
end

def eval_python_snippet(filename)
  contents = IO.read(filename)
  lines = contents.split("\n")
  last_line = lines.pop()
  lines.push("return #{last_line}")
  # Can I just 'eval' here instead?
  indentation = "       "
  formatted = lines.map do |l|
    indentation + l
  end
  code = <<-EOF
def wrapper():
#{formatted.join("\n")}

from pprint import pprint
pprint(wrapper())
  EOF
  file = Tempfile.new('foo')
  file.write code
  file.close
  %x{python #{file.path}}
end
