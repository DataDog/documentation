module RuleHelper
  def basename(fname)
    File.basename(fname, File.extname(fname))
  end
end

module Nanoc
  class RuleContext
    include RuleHelper
  end
end