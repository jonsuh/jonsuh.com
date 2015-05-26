# Round a float to a given precision in decimal digits
#
# Github: https://github.com/freshmango/jekyll-round-filter
#
# input - The number to round
# precision - Precision in decimal digits (default 0 digits)
#
# Returns the rounded number.
#
# Usage:
#
# {{ float | round: precision }}
#
# Examples:
#
# {{ 512.4562 | round }}      => 512
# {{ 512.4562 | round: 2 }}   => 512.46
#
# Reference:
#
# http://ruby-doc.org/core-1.9.3/Float.html#method-i-round

module Jekyll
  module RoundFilter
    def round(input, precision = 0)
      input.round(precision)
    end
  end
end

Liquid::Template.register_filter(Jekyll::RoundFilter)