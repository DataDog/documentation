# response.body will contain the string "OK"
# if the traces were successfully delvered
# to the agent or an error message if not.
# Note that successful delivery does not
# mean the traces were accepted. Please
# refer to the agent log for more
# information.
puts response.body
